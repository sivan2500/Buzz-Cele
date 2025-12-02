
import React, { useState } from 'react';
import Button from './Button';
import { Megaphone, BarChart, Users, Target, CheckCircle, Mail } from 'lucide-react';

const Advertise: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-black text-gray-900 dark:text-white mb-6">
            Advertise With <span className="text-brand-600">BuzzCelebDaily</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Connect your brand with millions of engaged entertainment enthusiasts, fashion lovers, and trendsetters.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
           <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl text-center border border-gray-100 dark:border-gray-800">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                 <Users size={24} />
              </div>
              <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-2">5M+</h3>
              <p className="text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide text-sm">Monthly Unique Visitors</p>
           </div>
           <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl text-center border border-gray-100 dark:border-gray-800">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                 <BarChart size={24} />
              </div>
              <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-2">15M+</h3>
              <p className="text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide text-sm">Monthly Pageviews</p>
           </div>
           <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl text-center border border-gray-100 dark:border-gray-800">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                 <Target size={24} />
              </div>
              <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-2">18-34</h3>
              <p className="text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide text-sm">Core Demographic</p>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
           
           {/* Ad Options */}
           <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Partnership Opportunities</h2>
              <div className="space-y-6">
                 <div className="flex gap-4">
                    <CheckCircle className="text-brand-600 shrink-0 mt-1" size={20} />
                    <div>
                       <h4 className="font-bold text-gray-900 dark:text-white">Display Advertising</h4>
                       <p className="text-gray-600 dark:text-gray-400 text-sm">High-impact IAB standard units including billboards, skins, and sticky footers.</p>
                    </div>
                 </div>
                 <div className="flex gap-4">
                    <CheckCircle className="text-brand-600 shrink-0 mt-1" size={20} />
                    <div>
                       <h4 className="font-bold text-gray-900 dark:text-white">Video Pre-Roll</h4>
                       <p className="text-gray-600 dark:text-gray-400 text-sm">Engage users with 15s/30s spots on our exclusive Live TV and video content.</p>
                    </div>
                 </div>
                 <div className="flex gap-4">
                    <CheckCircle className="text-brand-600 shrink-0 mt-1" size={20} />
                    <div>
                       <h4 className="font-bold text-gray-900 dark:text-white">Sponsored Content</h4>
                       <p className="text-gray-600 dark:text-gray-400 text-sm">Custom articles written by our editors that integrate your brand seamlessly.</p>
                    </div>
                 </div>
                 <div className="flex gap-4">
                    <CheckCircle className="text-brand-600 shrink-0 mt-1" size={20} />
                    <div>
                       <h4 className="font-bold text-gray-900 dark:text-white">Newsletter Sponsorships</h4>
                       <p className="text-gray-600 dark:text-gray-400 text-sm">Direct inbox access to our 50k+ daily subscribers.</p>
                    </div>
                 </div>
              </div>

              <div className="mt-8 p-6 bg-brand-50 dark:bg-brand-900/20 rounded-xl border border-brand-100 dark:border-brand-900/50">
                 <h4 className="font-bold text-brand-900 dark:text-brand-100 mb-2">Download Media Kit</h4>
                 <p className="text-sm text-brand-700 dark:text-brand-300 mb-4">Get the full breakdown of our audience, ad specs, and rate card.</p>
                 <Button variant="outline" size="sm" className="bg-white dark:bg-transparent dark:text-white dark:border-brand-700">
                    Download PDF
                 </Button>
              </div>
           </div>

           {/* Inquiry Form */}
           <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3 mb-6">
                 <Megaphone className="text-brand-600" size={24} />
                 <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Start a Campaign</h2>
              </div>
              
              {submitted ? (
                 <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                       <Mail size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Request Received!</h3>
                    <p className="text-gray-600 dark:text-gray-400">Our sales team will be in touch within 24 hours.</p>
                 </div>
              ) : (
                 <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-1">
                          <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Name</label>
                          <input required type="text" className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:text-white" placeholder="John Doe" />
                       </div>
                       <div className="space-y-1">
                          <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Company</label>
                          <input required type="text" className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:text-white" placeholder="Brand Inc." />
                       </div>
                    </div>
                    <div className="space-y-1">
                       <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Work Email</label>
                       <input required type="email" className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:text-white" placeholder="john@company.com" />
                    </div>
                    <div className="space-y-1">
                       <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Budget Range (Monthly)</label>
                       <select className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:text-white">
                          <option>Under $5,000</option>
                          <option>$5,000 - $10,000</option>
                          <option>$10,000 - $50,000</option>
                          <option>$50,000+</option>
                       </select>
                    </div>
                    <div className="space-y-1">
                       <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Message</label>
                       <textarea rows={4} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:text-white" placeholder="Tell us about your campaign goals..."></textarea>
                    </div>
                    <Button type="submit" size="lg" className="w-full">Submit Request</Button>
                 </form>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Advertise;
