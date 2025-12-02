import React, { useState, useEffect } from 'react';
import { X, Mail, Sparkles } from 'lucide-react';
import Button from './Button';

const NewsletterModal: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenDismissed, setHasBeenDismissed] = useState(false);

  useEffect(() => {
    // Show modal after 8 seconds if not previously dismissed
    const timer = setTimeout(() => {
        if (!hasBeenDismissed) {
            setIsVisible(true);
        }
    }, 8000);

    return () => clearTimeout(timer);
  }, [hasBeenDismissed]);

  const handleClose = () => {
    setIsVisible(false);
    setHasBeenDismissed(true);
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="newsletter-modal-title"
      aria-describedby="newsletter-modal-desc"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <button 
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 z-10 focus:outline-none focus:ring-2 focus:ring-brand-500 rounded p-1"
            aria-label="Close modal"
        >
            <X size={20} aria-hidden="true" />
        </button>

        <div className="relative">
             <div className="h-32 bg-brand-900 flex items-center justify-center overflow-hidden relative">
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                 <div className="w-64 h-64 bg-brand-500 rounded-full absolute -top-12 -left-12 opacity-30 blur-3xl"></div>
                 <div className="w-64 h-64 bg-purple-500 rounded-full absolute -bottom-12 -right-12 opacity-30 blur-3xl"></div>
                 <Mail size={48} className="text-white relative z-10" aria-hidden="true" />
             </div>
             
             <div className="p-8 text-center">
                 <div className="flex items-center justify-center gap-2 mb-2">
                    <Sparkles size={16} className="text-brand-500" aria-hidden="true" />
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-600">VIP Access</span>
                 </div>
                 <h2 id="newsletter-modal-title" className="text-2xl font-serif font-bold text-gray-900 mb-2">Get the Gossip First</h2>
                 <p id="newsletter-modal-desc" className="text-gray-600 mb-6">
                     Don't be the last to know. Join 50,000+ subscribers getting the hottest scoops delivered daily.
                 </p>
                 
                 <div className="space-y-4">
                     <label htmlFor="modal-email" className="sr-only">Email address</label>
                     <input 
                        id="modal-email"
                        type="email" 
                        placeholder="Enter your email" 
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 bg-gray-50"
                     />
                     <Button variant="primary" size="lg" className="w-full shadow-lg hover:shadow-xl transition-all">
                         Subscribe Free
                     </Button>
                     <p className="text-xs text-gray-400">No spam, just glam. Unsubscribe anytime.</p>
                 </div>
             </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterModal;