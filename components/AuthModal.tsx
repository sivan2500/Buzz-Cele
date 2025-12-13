
import React, { useState } from 'react';
import { X, Mail, Lock, User, ArrowRight, Github, Camera, Upload, AlertCircle } from 'lucide-react';
import Button from './Button';
import { User as UserType } from '../types';

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

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: UserType) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [mode, setMode] = useState<'signin' | 'register'>('signin');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  // Avatar States
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const objectUrl = URL.createObjectURL(file);
      setAvatarPreview(objectUrl);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      let finalAvatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`;

      // If registering and user uploaded a file, convert to base64
      if (mode === 'register' && avatarFile) {
        finalAvatarUrl = await fileToBase64(avatarFile);
      }

      const endpoint = mode === 'signin' ? '/api/auth/login' : '/api/auth/register';
      const payload = mode === 'signin' 
        ? { email, password } 
        : { name, email, password, avatarUrl: finalAvatarUrl };

      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      if (mode === 'register') {
        // Registration successful
        alert(data.message || 'Registration successful! Please login.');
        setMode('signin');
        setIsLoading(false);
      } else {
        // Login successful
        const loggedInUser: UserType = {
          id: data._id || data.id,
          name: data.name,
          email: data.email,
          avatarUrl: data.avatarUrl,
          isPremium: data.isPremium,
          // Include token if needed for future authenticated requests
        };
        
        // Store token in localStorage for future requests
        if (data.token) {
            localStorage.setItem('buzzCelebToken', data.token);
        }

        onLogin(loggedInUser);
        setIsLoading(false);
        // Reset states
        setEmail('');
        setPassword('');
        setName('');
        setAvatarFile(null);
        setAvatarPreview(null);
        onClose();
      }

    } catch (err: any) {
      console.error("Auth Error", err);
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh] overflow-y-auto">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 dark:hover:text-white z-10 p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-8 pb-6 text-center border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-2xl font-serif font-black text-gray-900 dark:text-white mb-2">
            {mode === 'signin' ? 'Welcome Back' : 'Join the Inner Circle'}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {mode === 'signin' 
              ? 'Sign in to comment, react, and save stories.' 
              : 'Create an account to get the tea first.'}
          </p>
        </div>

        <div className="p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900 rounded-lg flex items-start gap-2">
              <AlertCircle className="text-red-600 dark:text-red-400 shrink-0 mt-0.5" size={16} />
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Avatar Upload for Register Mode */}
            {mode === 'register' && (
              <div className="flex flex-col items-center mb-6">
                 <div className="relative group cursor-pointer">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-100 dark:border-gray-800 shadow-inner bg-gray-50 dark:bg-gray-800">
                      {avatarPreview ? (
                        <img src={avatarPreview} alt="Avatar preview" className="w-full h-full object-cover" />
                      ) : (
                        <img 
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${email || 'placeholder'}`} 
                          alt="Default avatar" 
                          className="w-full h-full object-cover opacity-60" 
                        />
                      )}
                    </div>
                    
                    <label className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-200">
                       <Camera size={24} />
                       <input 
                         type="file" 
                         className="hidden" 
                         accept="image/*" 
                         onChange={handleAvatarChange}
                       />
                    </label>
                    
                    <div className="absolute bottom-0 right-0 bg-brand-600 text-white p-1.5 rounded-full border-2 border-white dark:border-gray-900 shadow-sm pointer-events-none">
                       <Upload size={12} />
                    </div>
                 </div>
                 <p className="text-xs text-gray-400 mt-2">Upload profile photo (optional)</p>
              </div>
            )}

            {mode === 'register' && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide">Full Name</label>
                <div className="relative">
                  <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    required={mode === 'register'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                    placeholder="Jane Doe"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide">Email Address</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                 <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide">Password</label>
                 {mode === 'signin' && <button type="button" className="text-xs text-brand-600 dark:text-brand-400 hover:underline">Forgot?</button>}
              </div>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              variant="primary" 
              className="w-full justify-center mt-2 bg-gray-900 hover:bg-black dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
              isLoading={isLoading}
            >
              {mode === 'signin' ? 'Sign In' : 'Create Account'}
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-gray-900 px-2 text-gray-500 font-medium">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
             <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors bg-white dark:bg-gray-900">
               <svg className="w-5 h-5" viewBox="0 0 24 24">
                 <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                 <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                 <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                 <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
               </svg>
               <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Google</span>
             </button>
             <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors bg-white dark:bg-gray-900">
               <Github size={20} className="text-gray-900 dark:text-white" />
               <span className="text-sm font-medium text-gray-700 dark:text-gray-300">GitHub</span>
             </button>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 p-4 text-center border-t border-gray-100 dark:border-gray-700">
           <p className="text-sm text-gray-600 dark:text-gray-400">
             {mode === 'signin' ? "Don't have an account? " : "Already have an account? "}
             <button 
               onClick={() => {
                   setMode(mode === 'signin' ? 'register' : 'signin');
                   setError(null);
               }}
               className="font-bold text-brand-600 dark:text-brand-400 hover:underline"
             >
               {mode === 'signin' ? 'Sign up' : 'Sign in'}
             </button>
           </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
