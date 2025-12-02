
import React from 'react';
import { Bell, X, Check } from 'lucide-react';
import Button from './Button';

interface NotificationPromptProps {
  isVisible: boolean;
  onAllow: () => void;
  onDeny: () => void;
}

const NotificationPrompt: React.FC<NotificationPromptProps> = ({ isVisible, onAllow, onDeny }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-[90] max-w-sm w-full animate-in slide-in-from-bottom-5 duration-500">
      <div className="bg-white rounded-lg shadow-xl border border-gray-100 p-4 flex gap-4 relative overflow-hidden">
        {/* Accent Bar */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-500"></div>

        <div className="bg-brand-50 rounded-full p-2 h-fit shrink-0">
          <Bell size={20} className="text-brand-600" />
        </div>

        <div className="flex-1">
          <h4 className="font-bold text-gray-900 text-sm mb-1">Stay in the loop?</h4>
          <p className="text-xs text-gray-500 mb-3">
            Get instant alerts for breaking news and updates on your favorite celebs.
          </p>
          <div className="flex gap-2">
            <Button 
              onClick={onAllow} 
              size="sm" 
              className="py-1 h-8 text-xs bg-brand-600 hover:bg-brand-700"
            >
              <Check size={14} className="mr-1" />
              Allow Alerts
            </Button>
            <Button 
              onClick={onDeny} 
              variant="ghost" 
              size="sm" 
              className="py-1 h-8 text-xs text-gray-500 hover:text-gray-900"
            >
              Later
            </Button>
          </div>
        </div>

        <button 
          onClick={onDeny}
          className="absolute top-2 right-2 text-gray-300 hover:text-gray-500 p-1"
          aria-label="Close"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};

export default NotificationPrompt;
