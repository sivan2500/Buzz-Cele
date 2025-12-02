
import React, { useState } from 'react';
import { X, Check, CreditCard, Shield, Star, Zap } from 'lucide-react';
import Button from './Button';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ isOpen, onClose, onUpgrade }) => {
  const [step, setStep] = useState<'plans' | 'payment' | 'success'>('plans');
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handlePayment = () => {
    setIsLoading(true);
    // Simulate Stripe processing
    setTimeout(() => {
      setIsLoading(false);
      setStep('success');
    }, 2000);
  };

  const handleClose = () => {
    onClose();
    // Reset state after closing
    setTimeout(() => {
      setStep('plans');
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={handleClose}
      />

      <div className="relative bg-white dark:bg-gray-900 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 dark:hover:text-white z-10 p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
        >
          <X size={20} />
        </button>

        {step === 'plans' && (
          <div className="flex flex-col md:flex-row h-full">
            <div className="p-8 md:w-1/2 bg-brand-900 text-white flex flex-col justify-between relative overflow-hidden">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
               <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500 rounded-full blur-3xl opacity-20 -mr-16 -mt-16"></div>
               
               <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-6">
                     <span className="bg-white/20 p-1.5 rounded-lg"><Star size={16} fill="currentColor" /></span>
                     <span className="font-bold tracking-wider text-sm uppercase">Insider Access</span>
                  </div>
                  <h2 className="text-3xl font-serif font-bold mb-4 leading-tight">Unlock the Full Experience</h2>
                  <ul className="space-y-4 mb-8">
                     <li className="flex items-center gap-3">
                        <div className="bg-green-500/20 p-1 rounded-full"><Check size={14} className="text-green-400" /></div>
                        <span className="text-brand-100 font-medium">Ad-Free Browsing</span>
                     </li>
                     <li className="flex items-center gap-3">
                        <div className="bg-green-500/20 p-1 rounded-full"><Check size={14} className="text-green-400" /></div>
                        <span className="text-brand-100 font-medium">Exclusive AI Scoops</span>
                     </li>
                     <li className="flex items-center gap-3">
                        <div className="bg-green-500/20 p-1 rounded-full"><Check size={14} className="text-green-400" /></div>
                        <span className="text-brand-100 font-medium">Verified Commenter Badge</span>
                     </li>
                     <li className="flex items-center gap-3">
                        <div className="bg-green-500/20 p-1 rounded-full"><Check size={14} className="text-green-400" /></div>
                        <span className="text-brand-100 font-medium">Early Access to Videos</span>
                     </li>
                  </ul>
               </div>
               
               <div className="relative z-10 flex items-center gap-2 text-xs text-brand-200">
                  <Shield size={12} /> Secure payment via Stripe
               </div>
            </div>

            <div className="p-8 md:w-1/2 bg-white dark:bg-gray-900 flex flex-col justify-center">
               <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Choose Your Plan</h3>
               
               <div className="space-y-4 mb-8">
                  <label className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all ${selectedPlan === 'monthly' ? 'border-brand-600 bg-brand-50 dark:bg-brand-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-brand-200'}`}>
                     <div className="flex items-center gap-3">
                        <input type="radio" name="plan" checked={selectedPlan === 'monthly'} onChange={() => setSelectedPlan('monthly')} className="text-brand-600 focus:ring-brand-500" />
                        <div>
                           <span className="block font-bold text-gray-900 dark:text-white">Monthly</span>
                           <span className="text-xs text-gray-500 dark:text-gray-400">Cancel anytime</span>
                        </div>
                     </div>
                     <span className="font-bold text-xl text-brand-600 dark:text-brand-400">$4.99<span className="text-sm font-normal text-gray-500">/mo</span></span>
                  </label>

                  <label className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all ${selectedPlan === 'yearly' ? 'border-brand-600 bg-brand-50 dark:bg-brand-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-brand-200'}`}>
                     <div className="flex items-center gap-3">
                        <input type="radio" name="plan" checked={selectedPlan === 'yearly'} onChange={() => setSelectedPlan('yearly')} className="text-brand-600 focus:ring-brand-500" />
                        <div>
                           <span className="block font-bold text-gray-900 dark:text-white">Yearly <span className="bg-green-100 text-green-700 text-[10px] px-1.5 py-0.5 rounded ml-1">SAVE 20%</span></span>
                           <span className="text-xs text-gray-500 dark:text-gray-400">$3.99/mo billed yearly</span>
                        </div>
                     </div>
                     <span className="font-bold text-xl text-brand-600 dark:text-brand-400">$47.99<span className="text-sm font-normal text-gray-500">/yr</span></span>
                  </label>
               </div>

               <Button onClick={() => setStep('payment')} size="lg" className="w-full">
                  Continue to Checkout
               </Button>
            </div>
          </div>
        )}

        {step === 'payment' && (
           <div className="p-8 max-w-md mx-auto w-full">
              <div className="text-center mb-6">
                 <div className="w-12 h-12 bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CreditCard size={24} />
                 </div>
                 <h3 className="text-xl font-bold text-gray-900 dark:text-white">Secure Checkout</h3>
                 <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {selectedPlan === 'monthly' ? 'Total due: $4.99' : 'Total due: $47.99'}
                 </p>
              </div>

              <form className="space-y-4">
                 <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-1">Card Number</label>
                    <input type="text" placeholder="0000 0000 0000 0000" className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 dark:bg-gray-800 dark:text-white" />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-1">Expiry</label>
                        <input type="text" placeholder="MM/YY" className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 dark:bg-gray-800 dark:text-white" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-1">CVC</label>
                        <input type="text" placeholder="123" className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 dark:bg-gray-800 dark:text-white" />
                    </div>
                 </div>
                 
                 <Button onClick={handlePayment} isLoading={isLoading} className="w-full mt-4">
                    Pay Now
                 </Button>
                 <button onClick={() => setStep('plans')} className="w-full text-center text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mt-2">Back to Plans</button>
              </form>
           </div>
        )}

        {step === 'success' && (
           <div className="p-12 text-center flex flex-col items-center justify-center h-full animate-in zoom-in">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                 <Zap size={40} fill="currentColor" />
              </div>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Welcome to Insider+</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-md mb-8">
                 Your subscription is active! Enjoy ad-free reading, exclusive content, and your new verified status.
              </p>
              <Button onClick={() => { onUpgrade(); handleClose(); }} size="lg" className="px-8">
                 Start Exploring
              </Button>
           </div>
        )}

      </div>
    </div>
  );
};

export default SubscriptionModal;
