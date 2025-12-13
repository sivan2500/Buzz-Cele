
import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Loader2, ArrowRight } from 'lucide-react';
import Button from './Button';

// Safe Environment variable access
const getApiUrl = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const meta = import.meta as any;
  if (typeof meta !== 'undefined' && meta.env && meta.env.VITE_API_URL) {
    return meta.env.VITE_API_URL;
  }
  return 'http://localhost:5000';
};

const API_URL = getApiUrl();

const VerifyEmail: React.FC = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Verifying your email...');

  useEffect(() => {
    const verify = async () => {
      const hash = window.location.hash;
      // Expected format: #verify/TOKEN
      const parts = hash.split('/');
      const token = parts[1];

      if (!token) {
        setStatus('error');
        setMessage('Invalid verification link.');
        return;
      }

      try {
        // Attempt to call backend
        const response = await fetch(`${API_URL}/api/auth/verify/${token}`);
        const data = await response.json();

        if (response.ok) {
            setStatus('success');
            setMessage(data.message || 'Email verified successfully!');
        } else {
            setStatus('error');
            setMessage(data.message || 'Verification failed.');
        }
      } catch (error) {
        console.error("Verification error", error);
        // Fallback for demo/offline logic or specific tokens
        if (token === 'demo') {
            setStatus('success');
            setMessage('Demo email verified!');
        } else {
            setStatus('error');
            setMessage('Could not connect to verification server. Please try again later.');
        }
      }
    };

    // Small delay for UX so the loading spinner is visible
    setTimeout(verify, 1500);
  }, []);

  const handleContinue = () => {
      window.location.hash = '';
      window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-8 max-w-md w-full text-center">
        
        {status === 'loading' && (
          <div className="flex flex-col items-center animate-in fade-in">
            <Loader2 size={48} className="text-brand-600 animate-spin mb-4" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Verifying...</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Just a moment while we confirm your email.</p>
          </div>
        )}

        {status === 'success' && (
          <div className="flex flex-col items-center animate-in zoom-in">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mb-4">
              <CheckCircle size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Verified!</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{message}</p>
            <Button onClick={handleContinue} className="w-full justify-center">
                Continue to BuzzCeleb <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        )}

        {status === 'error' && (
          <div className="flex flex-col items-center animate-in zoom-in">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-full flex items-center justify-center mb-4">
              <XCircle size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Verification Failed</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{message}</p>
            <Button variant="outline" onClick={handleContinue} className="w-full justify-center">
                Return to Home
            </Button>
          </div>
        )}

      </div>
    </div>
  );
};

export default VerifyEmail;
