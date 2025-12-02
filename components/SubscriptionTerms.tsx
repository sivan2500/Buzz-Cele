
import React from 'react';

const SubscriptionTerms: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-8">Subscription Terms</h1>
        
        <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
          <p className="text-sm text-gray-500 mb-6">Last Updated: May 15, 2025</p>

          <p>
            These Subscription Terms ("Terms") govern your use of the BuzzCelebDaily Insider premium service. By subscribing, you agree to these terms.
          </p>

          <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-2">1. Subscription Plans</h3>
          <p>
            We offer monthly and annual subscription plans. The specific features (e.g., ad-free browsing, exclusive content) and pricing are displayed at the time of purchase. Prices are subject to change with notice.
          </p>

          <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-2">2. Billing and Renewal</h3>
          <p>
            <strong>Automatic Renewal:</strong> Your subscription will automatically renew at the end of each billing cycle unless you cancel it at least 24 hours before the renewal date.
            <br/>
            <strong>Payment Method:</strong> You authorize us to charge your provided payment method for the subscription fee.
          </p>

          <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-2">3. Cancellation and Refunds</h3>
          <p>
            You may cancel your subscription at any time through your Account Settings. Cancellation will take effect at the end of the current billing period. We do not provide refunds for partial subscription periods.
          </p>

          <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-2">4. Access and Restrictions</h3>
          <p>
            Your subscription is personal to you and may not be shared. We reserve the right to terminate accounts that violate our Terms of Service or these Subscription Terms without refund.
          </p>

          <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-2">5. Changes to Service</h3>
          <p>
            We may modify, suspend, or discontinue any aspect of the Insider service at any time. If a material change negatively impacts your service, you may be eligible for a pro-rated refund upon request.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionTerms;
