
import React, { useState } from 'react';
import { Bell, Send, Users, CheckCircle, Smartphone, Mail, MessageCircle } from 'lucide-react';

const NotificationManager = () => {
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [channels, setChannels] = useState({
    browser: true,
    email: false,
    telegram: false,
    whatsapp: false
  });
  const [isSending, setIsSending] = useState(false);
  const [lastSent, setLastSent] = useState<any>(null);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setLastSent({ title, message, time: new Date().toLocaleTimeString() });
      setTitle('');
      setMessage('');
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Bell className="text-brand-600" /> Push Notification System
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Send alerts to subscribers across all platforms.</p>
        </div>
        <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-lg text-sm font-bold">
           <Users size={16} /> 54,230 Subscribers
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="md:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
               <form onSubmit={handleSend} className="space-y-6">
                  <div>
                     <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Notification Title</label>
                     <input 
                       type="text" 
                       value={title}
                       onChange={(e) => setTitle(e.target.value)}
                       placeholder="e.g. BREAKING: Royal Baby Name Revealed!"
                       className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
                       required
                     />
                  </div>
                  <div>
                     <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Message Body</label>
                     <textarea 
                       rows={3}
                       value={message}
                       onChange={(e) => setMessage(e.target.value)}
                       placeholder="Short summary of the alert..."
                       className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none resize-none"
                       required
                     />
                  </div>

                  <div>
                     <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">Delivery Channels</label>
                     <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <label className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-all ${channels.browser ? 'bg-brand-50 border-brand-500 text-brand-700 dark:bg-brand-900/20 dark:border-brand-500 dark:text-brand-300' : 'border-gray-200 dark:border-gray-700 text-gray-500'}`}>
                           <Smartphone size={24} className="mb-2" />
                           <span className="text-xs font-bold">Browser</span>
                           <input type="checkbox" className="hidden" checked={channels.browser} onChange={() => setChannels({...channels, browser: !channels.browser})} />
                        </label>
                        <label className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-all ${channels.email ? 'bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900/20 dark:border-blue-500 dark:text-blue-300' : 'border-gray-200 dark:border-gray-700 text-gray-500'}`}>
                           <Mail size={24} className="mb-2" />
                           <span className="text-xs font-bold">Email</span>
                           <input type="checkbox" className="hidden" checked={channels.email} onChange={() => setChannels({...channels, email: !channels.email})} />
                        </label>
                        <label className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-all ${channels.telegram ? 'bg-sky-50 border-sky-500 text-sky-700 dark:bg-sky-900/20 dark:border-sky-500 dark:text-sky-300' : 'border-gray-200 dark:border-gray-700 text-gray-500'}`}>
                           <Send size={24} className="mb-2" />
                           <span className="text-xs font-bold">Telegram</span>
                           <input type="checkbox" className="hidden" checked={channels.telegram} onChange={() => setChannels({...channels, telegram: !channels.telegram})} />
                        </label>
                        <label className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-all ${channels.whatsapp ? 'bg-green-50 border-green-500 text-green-700 dark:bg-green-900/20 dark:border-green-500 dark:text-green-300' : 'border-gray-200 dark:border-gray-700 text-gray-500'}`}>
                           <MessageCircle size={24} className="mb-2" />
                           <span className="text-xs font-bold">WhatsApp</span>
                           <input type="checkbox" className="hidden" checked={channels.whatsapp} onChange={() => setChannels({...channels, whatsapp: !channels.whatsapp})} />
                        </label>
                     </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={isSending}
                    className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-lg shadow-md transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                     {isSending ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <Send size={18} />}
                     {isSending ? 'Broadcasting...' : 'Send Notification'}
                  </button>
               </form>
            </div>
         </div>

         <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
               <h3 className="font-bold text-gray-900 dark:text-white mb-4">Recent Alerts</h3>
               <div className="space-y-4">
                  {lastSent && (
                     <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-lg animate-in slide-in-from-top-2">
                        <div className="flex items-center gap-2 text-green-700 dark:text-green-400 font-bold text-xs mb-1">
                           <CheckCircle size={12} /> Sent {lastSent.time}
                        </div>
                        <p className="font-bold text-sm text-gray-900 dark:text-white">{lastSent.title}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{lastSent.message}</p>
                     </div>
                  )}
                  <div className="p-3 border border-gray-100 dark:border-gray-700 rounded-lg">
                     <div className="flex justify-between items-start mb-1">
                        <span className="text-xs font-bold text-gray-500">2 hours ago</span>
                        <span className="text-[10px] bg-brand-100 text-brand-600 px-1.5 py-0.5 rounded">Browser</span>
                     </div>
                     <p className="font-bold text-sm text-gray-900 dark:text-white">Taylor Swift Tour Update</p>
                     <div className="flex gap-2 mt-2 text-[10px] text-gray-400">
                        <span>Clicks: 4.2k</span>
                        <span>CTR: 3.8%</span>
                     </div>
                  </div>
                  <div className="p-3 border border-gray-100 dark:border-gray-700 rounded-lg">
                     <div className="flex justify-between items-start mb-1">
                        <span className="text-xs font-bold text-gray-500">Yesterday</span>
                        <span className="text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded">Email</span>
                     </div>
                     <p className="font-bold text-sm text-gray-900 dark:text-white">Daily Gossip Digest</p>
                     <div className="flex gap-2 mt-2 text-[10px] text-gray-400">
                        <span>Opens: 28%</span>
                        <span>Clicks: 1.2k</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default NotificationManager;
