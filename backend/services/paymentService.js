let Stripe;
try {
    Stripe = require('stripe');
} catch (e) {
    console.warn("Stripe module not found. Payment service will run in simulation mode.");
}

const User = require('../models/User');

class PaymentService {
  constructor() {
    this.stripe = (Stripe && process.env.STRIPE_SECRET_KEY) ? Stripe(process.env.STRIPE_SECRET_KEY) : null;
    this.isSimulation = !this.stripe;
    
    this.prices = {
        monthly: 'price_monthly_id_placeholder',
        yearly: 'price_yearly_id_placeholder'
    };
  }

  async createCheckoutSession(user, priceType = 'monthly') {
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

    if (this.isSimulation) {
        console.log(`[PaymentService] ⚠️ Simulation Mode: Creating mock checkout for ${user.email}`);
        return { 
            url: `${frontendUrl}/#payment-success-mock?session_id=mock_session_${Date.now()}&price=${priceType}` 
        };
    }

    try {
        let customerId = user.stripeCustomerId;

        if (!customerId) {
            const customer = await this.stripe.customers.create({
                email: user.email,
                name: user.name,
                metadata: { userId: user._id.toString() }
            });
            customerId = customer.id;
            
            user.stripeCustomerId = customerId;
            await user.save();
        }

        const session = await this.stripe.checkout.sessions.create({
            customer: customerId,
            mode: 'subscription',
            payment_method_types: ['card'],
            line_items: [
                {
                    price: this.prices[priceType] || 'price_12345', 
                    quantity: 1,
                },
            ],
            success_url: `${frontendUrl}/#payment-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${frontendUrl}/#payment-cancelled`,
            metadata: {
                userId: user._id.toString(),
                priceType
            }
        });

        return { url: session.url };

    } catch (error) {
        console.error('[PaymentService] Error creating session:', error);
        throw new Error('Payment initialization failed');
    }
  }

  async handleWebhook(signature, payload) {
    if (this.isSimulation) return { received: true };

    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    let event;

    try {
        event = this.stripe.webhooks.constructEvent(payload, signature, endpointSecret);
    } catch (err) {
        console.error(`[PaymentService] Webhook Signature Verification Failed: ${err.message}`);
        throw new Error(`Webhook Error: ${err.message}`);
    }

    // Handle events
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const userId = session.metadata.userId;
        await User.findByIdAndUpdate(userId, { isPremium: true });
    }

    return { received: true };
  }
  
  async mockConfirmPayment(userId) {
      if (!this.isSimulation) return;
      await User.findByIdAndUpdate(userId, { isPremium: true });
  }
}

module.exports = new PaymentService();