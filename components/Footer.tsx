
import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-1">
             <a href="#" className="flex items-center gap-2 mb-6 focus:outline-none focus:ring-2 focus:ring-brand-500 rounded p-1">
              <span className="text-2xl font-serif font-black tracking-tighter text-white">
                BUZZ<span className="text-brand-500">CELEB</span>
              </span>
            </a>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Your premiere destination for breaking celebrity news, red carpet fashion, and exclusive entertainment scoops.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors p-1 focus:outline-none focus:ring-2 focus:ring-white rounded" aria-label="Follow us on Facebook"><Facebook size={20} aria-hidden="true" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors p-1 focus:outline-none focus:ring-2 focus:ring-white rounded" aria-label="Follow us on Twitter"><Twitter size={20} aria-hidden="true" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors p-1 focus:outline-none focus:ring-2 focus:ring-white rounded" aria-label="Follow us on Instagram"><Instagram size={20} aria-hidden="true" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors p-1 focus:outline-none focus:ring-2 focus:ring-white rounded" aria-label="Follow us on YouTube"><Youtube size={20} aria-hidden="true" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-6">Sections</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-brand-400 text-sm focus:outline-none focus:text-brand-400 focus:underline">Celebrity News</a></li>
              <li><a href="#" className="text-gray-300 hover:text-brand-400 text-sm focus:outline-none focus:text-brand-400 focus:underline">Red Carpet</a></li>
              <li><a href="#" className="text-gray-300 hover:text-brand-400 text-sm focus:outline-none focus:text-brand-400 focus:underline">Movies & TV</a></li>
              <li><a href="#" className="text-gray-300 hover:text-brand-400 text-sm focus:outline-none focus:text-brand-400 focus:underline">Music</a></li>
              <li><a href="#" className="text-gray-300 hover:text-brand-400 text-sm focus:outline-none focus:text-brand-400 focus:underline">Royals</a></li>
            </ul>
          </div>

           <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-6">Company</h4>
            <ul className="space-y-3">
              <li><a href="#about" className="text-gray-300 hover:text-brand-400 text-sm focus:outline-none focus:text-brand-400 focus:underline">About Us</a></li>
              <li><a href="#advertise" className="text-gray-300 hover:text-brand-400 text-sm focus:outline-none focus:text-brand-400 focus:underline">Advertise with us</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-brand-400 text-sm focus:outline-none focus:text-brand-400 focus:underline">Contact</a></li>
              <li><a href="#privacy" className="text-gray-300 hover:text-brand-400 text-sm focus:outline-none focus:text-brand-400 focus:underline">Privacy Policy</a></li>
              <li><a href="#terms" className="text-gray-300 hover:text-brand-400 text-sm focus:outline-none focus:text-brand-400 focus:underline">Terms of Service</a></li>
              <li><a href="#sub-terms" className="text-gray-300 hover:text-brand-400 text-sm focus:outline-none focus:text-brand-400 focus:underline">Subscription Terms</a></li>
            </ul>
          </div>

           <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-6">Subscribe</h4>
            <p className="text-gray-400 text-sm mb-4">Subscribe to our newsletter for the latest updates.</p>
             <form className="flex flex-col gap-2">
               <label htmlFor="footer-email" className="sr-only">Email address</label>
               <input id="footer-email" type="email" placeholder="Email address" className="bg-gray-800 border-none rounded px-3 py-2 text-sm text-white focus:ring-1 focus:ring-brand-500 placeholder-gray-500" />
               <button type="submit" className="bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium py-2 px-4 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-gray-900">
                 Subscribe
               </button>
             </form>
          </div>

        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} BuzzCelebDaily. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0 flex-wrap justify-center">
             <a href="#do-not-sell" className="hover:text-gray-300 focus:outline-none focus:text-white">Do not sell my info</a>
             <a href="#privacy" className="hover:text-gray-300 focus:outline-none focus:text-white">Privacy</a>
             <a href="#terms" className="hover:text-gray-300 focus:outline-none focus:text-white">Cookies</a>
             <a href="#disclaimer" className="hover:text-gray-300 focus:outline-none focus:text-white">Disclaimer</a>
             <a href="/sitemap.xml" target="_blank" className="hover:text-gray-300 focus:outline-none focus:text-white">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
