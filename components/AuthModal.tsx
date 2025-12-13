
import React, { useState } from 'react';
import { X, Mail, Lock, User, ArrowRight, Github, Camera, Upload, AlertCircle } from 'lucide-react';
import Button from './Button';
import { User as UserType } from '../types';
import { supabase } from '../supabaseClient';

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
      let result;
      const avatarUrl = avatarFile ? await fileToBase64(avatarFile) : `https://ui-avatars.com/api/?name=${name || 'User'}&background=random`;

      if (mode === 'register') {
        // Supabase SignUp
        // The trigger in SQL will automatically create the profile row using metadata
        result = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    name: name,
                    avatarUrl: avatarUrl
                }
            }
        });
      } else {
        // Supabase SignIn
        result = await supabase.auth.signInWithPassword({
            email,
            password
        });
      }

      if (result.error) throw result.error;

      if (result.data.user) {
          // Fetch additional profile info from the 'profiles' table we created
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', result.data.user.id)
            .single();

          const loggedInUser: UserType = {
              id: result.data.user.id,
              email: result.data.user.email || email,
              name: profile?.name || name || 'User',
              avatarUrl: profile?.avatar_url || avatarUrl,
              isPremium: profile?.is_premium || false,
          };

          onLogin(loggedInUser);
          onClose();
      }

    } catch (err: any) {
      console.error("Auth Error:", err);
      setError(err.message || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

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
            
            {mode === 'register' && (
              <div className="flex flex-col items-center mb-6">
                 <div className="relative group cursor-pointer">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-100 dark:border-gray-800 shadow-inner bg-gray-50 dark:bg-gray-800">
                      {avatarPreview ? (
                        <img src={avatarPreview} alt="Avatar preview" className="w-full h-full object-cover" />
                      ) : (
                        <img 
                          src={`https://ui-avatars.com/api/?name=${name || 'New+User'}&background=random`} 
                          alt="Default avatar" 
                          className="w-full h-full object-cover opacity-60" 
                        />
                      )}
                    </div>
                    <label className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-200">
                       <Camera size={24} />
                       <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
                    </label>
                 </div>
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
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
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
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                 <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide">Password</label>
              </div>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              variant="primary" 
              className="w-full justify-center mt-2 bg-gray-900 hover:bg-black dark:bg-white dark:text-gray-900"
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
