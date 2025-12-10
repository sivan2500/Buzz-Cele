const PaymentService = require('../services/paymentService');

const createCheckoutSession = async (req, res) => {
    try {
        const { plan } = req.body; 
        const session = await PaymentService.createCheckoutSession(req.user, plan);
        res.json(session);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const handleWebhook = async (req, res) => {
    const signature = req.headers['stripe-signature'];
    try {
        await PaymentService.handleWebhook(signature, req.body);
        res.status(200).send();
    } catch (error) {
        res.status(400).send(`Webhook Error: ${error.message}`);
    }
};

const mockSuccess = async (req, res) => {
    try {
        await PaymentService.mockConfirmPayment(req.user._id);
        res.json({ success: true, message: 'Mock payment confirmed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createCheckoutSession, handleWebhook, mockSuccess };