
import React, { useState } from 'react';
import Button from './Button';
import { Shield, Check } from 'lucide-react';

const DoNotSell: React.FC = () => {
  const [optedOut, setOptedOut] = useState(false);

  const handleOptOut = () => {
    // In a real app, this would set a cookie/local storage flag and maybe call an API
    localStorage.setItem('ccpa_opt_out', 'true');
    setOptedOut(true);
  };

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-6">
          Do Not Sell or Share My Personal Information
        </h1>
        
        <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 mb-8">
          <p>
            Under the California Consumer Privacy Act (CCPA) and other applicable privacy laws, you have the right to opt-out of the "sale" or "sharing" of your personal information.
          </p>
          <p>
            BuzzCelebDaily may share certain data with advertising partners to show you relevant ads. This may be considered a "sale" or "sharing" under California law. You can opt-out of this by clicking the button below.
          </p>
          <p>
            <strong>Note:</strong> This opt-out is specific to the browser and device you are currently using. If you clear your cookies or use a different device, you may need to opt-out again.
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-xl border border-gray-200 dark:border-gray-800 flex flex-col items-center text-center">
           <Shield size={48} className="text-brand-600 mb-4" />
           <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Manage Your Privacy Preferences</h3>
           <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
              Click below to exercise your right to opt-out of the sale/sharing of your personal information.
           </p>
           
           {optedOut ? (
              <div className="bg-green-100 text-green-800 px-6 py-3 rounded-lg flex items-center gap-2 font-bold animate-in zoom-in">
                 <Check size={20} />
                 Opt-Out Request Recorded
              </div>
           ) : (
              <Button onClick={handleOptOut} size="lg" className="bg-gray-900 dark:bg-white dark:text-gray-900">
                 Do Not Sell My Info
              </Button>
           )}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-sm text-gray-500 dark:text-gray-400">
           <p>
              For more information about how we handle your data, please read our <a href="#privacy" className="text-brand-600 hover:underline">Privacy Policy</a>.
              If you have additional questions, you can contact our Data Protection Officer at privacy@buzzcelebdaily.com.
           </p>
        </div>
      </div>
    </div>
  );
};

export default DoNotSell;
