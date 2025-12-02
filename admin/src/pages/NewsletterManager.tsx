
import React, { useState } from 'react';
import { 
  Mail, 
  Users, 
  TrendingUp, 
  Send, 
  Bot, 
  DollarSign, 
  FileText, 
  Settings, 
  Plus, 
  Download, 
  Upload, 
  Eye, 
  MousePointer,
  Sparkles
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { day: 'Mon', opens: 45, clicks: 12 },
  { day: 'Tue', opens: 52, clicks: 15 },
  { day: 'Wed', opens: 49, clicks: 14 },
  { day: 'Thu', opens: 62, clicks: 22 },
  { day: 'Fri', opens: 58, clicks: 18 },
  { day: 'Sat', opens: 71, clicks: 28 },
  { day: 'Sun', opens: 65, clicks: 24 },
];

const mockSubscribers = [
  { id: 1, email: 'sarah@example.com', joined: '2024-03-01', status: 'Active', engagement: 'High' },
  { id: 2, email: 'mike@test.com', joined: '2024-03-02', status: 'Active', engagement: 'Medium' },
  { id: 3, email: 'jenny@mail.com', joined: '2024-03-05', status: 'Unsubscribed', engagement: 'Low' },
  { id: 4, email: 'david@corp.com', joined: '2024-03-08', status: 'Active', engagement: 'High' },
];

const NewsletterManager = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'campaigns' | 'subscribers' | 'settings'>('dashboard');
  const [monetizationEnabled, setMonetizationEnabled] = useState(true);

  // Campaign Builder State
  const [subjectLine, setSubjectLine] = useState("Today's Hottest Gossip: You won't believe this!");
  const [template, setTemplate] = useState<'viral' | 'minimal' | 'video'>('viral');

  const StatCard = ({ title, value, icon: Icon, color, sub }: any) => (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">{title}</p>
          <h3 className="text-2xl font-black text-gray-900 mt-1">{value}</h3>
          {sub && <p className="text-xs text-green-600 font-bold mt-1">{sub}</p>}
        </div>
        <div className={`p-2 rounded-lg ${color} text-white`}>
          <Icon size={20} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Mail className="text-brand-600" /> Newsletter System
          </h1>
          <p className="text-gray-500 text-sm">Automated email marketing & revenue engine.</p>
        </div>
        <div className="flex bg-white rounded-lg p-1 border border-gray-200 shadow-sm">
          {['dashboard', 'campaigns', 'subscribers', 'settings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 rounded-md text-sm font-bold capitalize transition-all ${
                activeTab === tab ? 'bg-gray-900 text-white shadow' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* DASHBOARD TAB */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatCard title="Total Subscribers" value="54,230" icon={Users} color="bg-blue-500" sub="+125 today" />
            <StatCard title="Avg. Open Rate" value="28.4%" icon={Eye} color="bg-purple-500" sub="+2.1% vs avg" />
            <StatCard title="Click Rate" value="4.2%" icon={MousePointer} color="bg-orange-500" sub="High engagement" />
            <StatCard title="Email Revenue" value="$4,850" icon={DollarSign} color="bg-green-500" sub="$18.50 CPM" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-900">Engagement Trends (7 Days)</h3>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-bold">Healthy</span>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorOpen" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Area type="monotone" dataKey="opens" stroke="#8884d8" strokeWidth={2} fillOpacity={1} fill="url(#colorOpen)" />
                    <Area type="monotone" dataKey="clicks" stroke="#82ca9d" strokeWidth={2} fillOpacity={0} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-brand-900 text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
               <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
               <h3 className="font-serif font-bold text-xl mb-2">Monetization Status</h3>
               <div className="space-y-4 relative z-10">
                  <div className="flex justify-between items-center border-b border-white/10 pb-2">
                     <span className="text-sm opacity-80">Header Banners</span>
                     <span className="text-green-400 font-bold text-sm">Active</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-2">
                     <span className="text-sm opacity-80">Native In-Feed Ads</span>
                     <span className="text-green-400 font-bold text-sm">Active</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-2">
                     <span className="text-sm opacity-80">Affiliate Links</span>
                     <span className="text-green-400 font-bold text-sm">Active</span>
                  </div>
                  <div className="pt-2">
                     <p className="text-xs opacity-60 mb-1">Est. Revenue per 1k sends</p>
                     <p className="text-2xl font-bold text-white">$15.00</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* CAMPAIGNS TAB */}
      {activeTab === 'campaigns' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-2">
           <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                 <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Sparkles className="text-brand-500" size={18} /> Daily Digest Generator
                 </h3>
                 <div className="space-y-4">
                    <div>
                       <label className="block text-sm font-bold text-gray-700 mb-1">Subject Line (A/B Test)</label>
                       <input 
                         type="text" 
                         value={subjectLine}
                         onChange={(e) => setSubjectLine(e.target.value)}
                         className="w-full border border-gray-300 rounded-md p-2 text-sm" 
                       />
                       <p className="text-xs text-gray-500 mt-1">AI Suggestion: "🔥 The Scandal That Just Broke..."</p>
                    </div>
                    
                    <div>
                       <label className="block text-sm font-bold text-gray-700 mb-1">Email Template</label>
                       <div className="grid grid-cols-3 gap-2">
                          {['viral', 'minimal', 'video'].map(t => (
                             <button 
                                key={t}
                                onClick={() => setTemplate(t as any)}
                                className={`py-2 text-xs font-bold rounded border ${
                                   template === t ? 'bg-brand-50 border-brand-500 text-brand-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                                }`}
                             >
                                {t.charAt(0).toUpperCase() + t.slice(1)}
                             </button>
                          ))}
                       </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                       <h4 className="font-bold text-sm text-gray-900 mb-2 flex items-center gap-2">
                          <DollarSign size={14} /> Monetization Settings
                       </h4>
                       <div className="space-y-2">
                          <label className="flex items-center gap-2 text-sm text-gray-600">
                             <input type="checkbox" checked={monetizationEnabled} onChange={() => setMonetizationEnabled(!monetizationEnabled)} className="rounded text-brand-600 focus:ring-brand-500" />
                             Insert Programmatic Ads (Header & Footer)
                          </label>
                          <label className="flex items-center gap-2 text-sm text-gray-600">
                             <input type="checkbox" defaultChecked className="rounded text-brand-600 focus:ring-brand-500" />
                             Highlight "Shop The Look" Products
                          </label>
                       </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                       <button className="flex-1 bg-brand-600 text-white font-bold py-2 rounded-lg hover:bg-brand-700 flex items-center justify-center gap-2">
                          <Bot size={18} /> Generate Content
                       </button>
                       <button className="px-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600">
                          Preview
                       </button>
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-gray-100 p-8 rounded-xl border border-gray-200 flex justify-center">
              {/* Mock Email Preview */}
              <div className="bg-white w-full max-w-sm shadow-xl rounded-lg overflow-hidden border border-gray-200">
                 <div className="bg-brand-900 text-white p-4 text-center">
                    <h3 className="font-serif font-bold text-xl tracking-tighter">BUZZ<span className="text-brand-500">CELEB</span></h3>
                    <p className="text-[10px] uppercase tracking-widest opacity-80 mt-1">Daily Digest</p>
                 </div>
                 {monetizationEnabled && (
                    <div className="bg-gray-100 p-2 text-center border-b border-gray-200">
                       <span className="text-[10px] text-gray-400 font-bold border border-dashed border-gray-400 px-2 py-0.5 rounded">AD BANNER 320x50</span>
                    </div>
                 )}
                 <div className="p-4 space-y-4">
                    <h2 className="font-bold text-lg text-gray-900 leading-tight">Trending: The Met Gala Guest List Leaked?</h2>
                    <div className="h-32 bg-gray-200 rounded-md"></div>
                    <p className="text-xs text-gray-600">Sources say the seating chart is causing major drama behind the scenes...</p>
                    <button className="w-full bg-brand-600 text-white text-xs font-bold py-2 rounded">Read Full Story</button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* SUBSCRIBERS TAB */}
      {activeTab === 'subscribers' && (
         <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
            <div className="flex justify-between">
               <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 bg-white">
                     <Upload size={14} /> Import CSV
                  </button>
                  <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 bg-white">
                     <Download size={14} /> Export
                  </button>
               </div>
               <button className="bg-brand-600 text-white px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-2">
                  <Plus size={16} /> Add Subscriber
               </button>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
               <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase text-xs">
                     <tr>
                        <th className="px-6 py-3">Email</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">Joined</th>
                        <th className="px-6 py-3">Engagement</th>
                        <th className="px-6 py-3 text-right">Actions</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                     {mockSubscribers.map(sub => (
                        <tr key={sub.id} className="hover:bg-gray-50 transition-colors">
                           <td className="px-6 py-3 font-medium text-gray-900">{sub.email}</td>
                           <td className="px-6 py-3">
                              <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                                 sub.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                              }`}>{sub.status}</span>
                           </td>
                           <td className="px-6 py-3 text-gray-500">{sub.joined}</td>
                           <td className="px-6 py-3">
                              <span className={`text-xs font-bold ${
                                 sub.engagement === 'High' ? 'text-green-600' : sub.engagement === 'Medium' ? 'text-yellow-600' : 'text-gray-400'
                              }`}>{sub.engagement}</span>
                           </td>
                           <td className="px-6 py-3 text-right text-brand-600 font-bold text-xs cursor-pointer hover:underline">Edit</td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      )}

      {/* SETTINGS TAB */}
      {activeTab === 'settings' && (
         <div className="max-w-2xl bg-white p-6 rounded-xl border border-gray-200 shadow-sm animate-in fade-in slide-in-from-bottom-2">
            <h3 className="font-bold text-gray-900 mb-6">Automation Rules</h3>
            
            <div className="space-y-6">
               <div className="flex items-center justify-between">
                  <div>
                     <h4 className="font-medium text-gray-900">Welcome Sequence</h4>
                     <p className="text-xs text-gray-500">Send 3-part email series to new signups.</p>
                  </div>
                  <div className="w-10 h-5 bg-green-500 rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div></div>
               </div>

               <div className="flex items-center justify-between">
                  <div>
                     <h4 className="font-medium text-gray-900">Breaking News Alerts</h4>
                     <p className="text-xs text-gray-500">Auto-send when a story hits "Viral" status (10k views/hour).</p>
                  </div>
                  <div className="w-10 h-5 bg-green-500 rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div></div>
               </div>

               <div className="flex items-center justify-between">
                  <div>
                     <h4 className="font-medium text-gray-900">Weekly Recap Video</h4>
                     <p className="text-xs text-gray-500">Generate Veo summary and email on Sundays.</p>
                  </div>
                  <div className="w-10 h-5 bg-gray-200 rounded-full relative cursor-pointer"><div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full"></div></div>
               </div>
            </div>
         </div>
      )}
    </div>
  );
};

export default NewsletterManager;
