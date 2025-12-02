
import React from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, DollarSign, Smartphone } from 'lucide-react';

const data = [
  { name: 'Mon', revenue: 400, traffic: 2400 },
  { name: 'Tue', revenue: 300, traffic: 1398 },
  { name: 'Wed', revenue: 200, traffic: 9800 },
  { name: 'Thu', revenue: 278, traffic: 3908 },
  { name: 'Fri', revenue: 189, traffic: 4800 },
  { name: 'Sat', revenue: 239, traffic: 3800 },
  { name: 'Sun', revenue: 349, traffic: 4300 },
];

const Stat = ({ label, val, sub }: any) => (
  <div className="bg-white p-6 rounded-xl border border-gray-200">
    <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">{label}</p>
    <h3 className="text-3xl font-black text-gray-900 mt-2">{val}</h3>
    <p className="text-xs text-green-600 font-bold mt-2 flex items-center gap-1">
      <TrendingUp size={12} /> {sub}
    </p>
  </div>
);

const Analytics = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Advanced Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Stat label="Total Revenue" val="$12,840" sub="+14% vs last month" />
        <Stat label="Page Views" val="1.2M" sub="+5% vs last week" />
        <Stat label="Avg. RPM" val="$12.40" sub="+2% optimization" />
        <Stat label="Active Users" val="4,203" sub="Live right now" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-6">Traffic Trend (7 Days)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="traffic" stroke="#ec4899" fillOpacity={1} fill="url(#colorTraffic)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-6">Revenue Estimate</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: '#f0fdf4'}} />
                <Bar dataKey="revenue" fill="#16a34a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><DollarSign size={18} /> Top Revenue Sources</h3>
            <div className="space-y-4">
               <div className="flex justify-between text-sm"><span className="text-gray-600">Video Ads (Pre-roll)</span> <span className="font-bold">$5,400</span></div>
               <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden"><div className="bg-green-500 h-full w-[60%]"></div></div>
               
               <div className="flex justify-between text-sm"><span className="text-gray-600">Display Banners</span> <span className="font-bold">$3,200</span></div>
               <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden"><div className="bg-blue-500 h-full w-[35%]"></div></div>

               <div className="flex justify-between text-sm"><span className="text-gray-600">Affiliate Links</span> <span className="font-bold">$1,800</span></div>
               <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden"><div className="bg-purple-500 h-full w-[20%]"></div></div>
            </div>
         </div>

         <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Smartphone size={18} /> Device Breakdown</h3>
            <div className="flex items-center justify-center h-48">
               <div className="text-center">
                  <span className="text-4xl font-black text-brand-600">78%</span>
                  <p className="text-gray-500 text-sm">Mobile Traffic</p>
               </div>
            </div>
            <p className="text-center text-xs text-gray-400">Desktop: 18% • Tablet: 4%</p>
         </div>

         <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Users size={18} /> Top Countries</h3>
            <div className="space-y-3">
               <div className="flex justify-between items-center text-sm border-b border-gray-50 pb-2"><span>🇺🇸 United States</span> <span className="font-bold">45%</span></div>
               <div className="flex justify-between items-center text-sm border-b border-gray-50 pb-2"><span>🇬🇧 United Kingdom</span> <span className="font-bold">22%</span></div>
               <div className="flex justify-between items-center text-sm border-b border-gray-50 pb-2"><span>🇨🇦 Canada</span> <span className="font-bold">12%</span></div>
               <div className="flex justify-between items-center text-sm border-b border-gray-50 pb-2"><span>🇦🇺 Australia</span> <span className="font-bold">8%</span></div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Analytics;
