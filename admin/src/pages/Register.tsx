
import React from 'react';
import { Mail, Lock, User, ArrowRight, Shield } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Register = ({ onLogin }: { onLogin: () => void }) => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-black text-brand-900 tracking-tighter">
          BUZZ<span className="text-brand-600">CMS</span>
        </h2>
        <h2 className="mt-2 text-center text-2xl font-bold text-gray-900">Request Access</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <div className="mt-1 relative">
                <input type="text" required className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-brand-500 focus:border-brand-500 sm:text-sm" />
                <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email address</label>
              <div className="mt-1 relative">
                <input type="email" required className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-brand-500 focus:border-brand-500 sm:text-sm" />
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Requested Role</label>
              <div className="mt-1 relative">
                <select className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:ring-brand-500 focus:border-brand-500 sm:text-sm">
                    <option>Writer (Draft only)</option>
                    <option>Editor (Publish access)</option>
                    <option>Admin (Full access)</option>
                </select>
                <Shield className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1 relative">
                <input type="password" required className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-brand-500 focus:border-brand-500 sm:text-sm" />
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </div>

            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 focus:ring-2 focus:ring-offset-2 focus:ring-brand-500">
              Create Account
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm">
             <span className="text-gray-500">Already have an account? </span>
             <Link to="/login" className="font-medium text-brand-600 hover:text-brand-500">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
