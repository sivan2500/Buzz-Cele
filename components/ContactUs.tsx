
import React, { useState } from 'react';
import Button from './Button';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

const ContactUs: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
  };

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">Get in Touch</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Have a scoop? Want to advertise? Or just want to say hi? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
           
           {/* Contact Info */}
           <div className="space-y-8">
              <div>
                 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h3>
                 <div className="space-y-6">
                    <div className="flex items-start gap-4">
                       <div className="w-10 h-10 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 shrink-0">
                          <Mail size={20} />
                       </div>
                       <div>
                          <p className="font-bold text-gray-900 dark:text-white">Email Us</p>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">General Inquiries</p>
                          <a href="mailto:hello@buzzcelebdaily.com" className="text-brand-600 hover:underline">hello@buzzcelebdaily.com</a>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2 mb-1">Tips & Scoops</p>
                          <a href="mailto:tips@buzzcelebdaily.com" className="text-brand-600 hover:underline">tips@buzzcelebdaily.com</a>
                       </div>
                    </div>

                    <div className="flex items-start gap-4">
                       <div className="w-10 h-10 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 shrink-0">
                          <MapPin size={20} />
                       </div>
                       <div>
                          <p className="font-bold text-gray-900 dark:text-white">Headquarters</p>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                             123 Sunset Boulevard, Suite 400<br/>
                             Los Angeles, CA 90028<br/>
                             United States
                          </p>
                       </div>
                    </div>

                    <div className="flex items-start gap-4">
                       <div className="w-10 h-10 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 shrink-0">
                          <Phone size={20} />
                       </div>
                       <div>
                          <p className="font-bold text-gray-900 dark:text-white">Advertising</p>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                             For ad placements and partnerships:
                          </p>
                          <a href="tel:+13105550123" className="text-brand-600 hover:underline">+1 (310) 555-0123</a>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl border border-gray-100 dark:border-gray-800">
                 <h4 className="font-bold text-gray-900 dark:text-white mb-2">Editorial Policy</h4>
                 <p className="text-sm text-gray-600 dark:text-gray-400">
                    We are committed to accuracy. If you spot an error, please reach out to our corrections team at <a href="mailto:corrections@buzzcelebdaily.com" className="text-brand-600 hover:underline">corrections@buzzcelebdaily.com</a>.
                 </p>
              </div>
           </div>

           {/* Contact Form */}
           <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800">
              {submitted ? (
                 <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                       <Send size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Message Sent!</h3>
                    <p className="text-gray-600 dark:text-gray-400">Thank you for reaching out. We'll get back to you shortly.</p>
                    <Button onClick={() => setSubmitted(false)} variant="outline" className="mt-6">Send Another</Button>
                 </div>
              ) : (
                 <form onSubmit={handleSubmit} className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Send a Message</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-bold text-gray-700 dark:text-gray-300">Name</label>
                          <input type="text" id="name" required className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none dark:bg-gray-800 dark:text-white" placeholder="Your name" />
                       </div>
                       <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-bold text-gray-700 dark:text-gray-300">Email</label>
                          <input type="email" id="email" required className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none dark:bg-gray-800 dark:text-white" placeholder="you@example.com" />
                       </div>
                    </div>

                    <div className="space-y-2">
                       <label htmlFor="subject" className="text-sm font-bold text-gray-700 dark:text-gray-300">Subject</label>
                       <select id="subject" className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none dark:bg-gray-800 dark:text-white">
                          <option>General Inquiry</option>
                          <option>News Tip / Scoop</option>
                          <option>Advertising / Sponsorship</option>
                          <option>Report a Technical Issue</option>
                          <option>Correction Request</option>
                       </select>
                    </div>

                    <div className="space-y-2">
                       <label htmlFor="message" className="text-sm font-bold text-gray-700 dark:text-gray-300">Message</label>
                       <textarea id="message" required rows={5} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none dark:bg-gray-800 dark:text-white resize-none" placeholder="How can we help?"></textarea>
                    </div>

                    <Button type="submit" size="lg" className="w-full">Send Message</Button>
                 </form>
              )}
           </div>

        </div>
      </div>
    </div>
  );
};

export default ContactUs;
