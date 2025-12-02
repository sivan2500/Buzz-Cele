
import React, { useState } from 'react';
import { 
  DollarSign, 
  Layout, 
  ShoppingBag, 
  TrendingUp, 
  MoreVertical, 
  Plus, 
  ToggleLeft, 
  ToggleRight, 
  Calendar, 
  Edit2, 
  Trash2, 
  X, 
  Save, 
  CheckCircle, 
  Clock, 
  AlertCircle 
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const revenueData = [
  { name: 'Mon', ads: 400, aff: 240, spon: 150 },
  { name: 'Tue', ads: 300, aff: 139, spon: 150 },
  { name: 'Wed', ads: 200, aff: 980, spon: 300 },
  { name: 'Thu', ads: 278, aff: 390, spon: 200 },
  { name: 'Fri', ads: 189, aff: 480, spon: 250 },
  { name: 'Sat', ads: 239, aff: 380, spon: 300 },
  { name: 'Sun', ads: 349, aff: 430, spon: 350 },
];

const mockAffiliates = [
  { id: 1, name: 'Nordstrom Dress', brand: 'Nordstrom', clicks: 1240, revenue: '$450.00', status: 'Active' },
  { id: 2, name: 'Sephora Lipstick', brand: 'Sephora', clicks: 890, revenue: '$120.50', status: 'Active' },
  { id: 3, name: 'Skims Bodysuit', brand: 'Skims', clicks: 3400, revenue: '$980.00', status: 'Trending' },
];

const initialCampaigns = [
  { id: 1, client: 'Coca-Cola', campaign: 'Summer Vibes', type: 'Article', status: 'Live', startDate: '2024-03-01', ends: '2024-04-01', views: '45k', clicks: '1.2k', ctr: '2.6%' },
  { id: 2, client: 'Samsung', campaign: 'Galaxy S24', type: 'Video', status: 'Scheduled', startDate: '2024-04-15', ends: '2024-05-15', views: '-', clicks: '-', ctr: '-' },
  { id: 3, client: 'FashionNova', campaign: 'Spring Haul', type: 'Article', status: 'Expired', startDate: '2024-02-01', ends: '2024-02-28', views: '120k', clicks: '5.4k', ctr: '4.5%' },
];

const AdZone = ({ title, size, status, onToggle }: any) => (
  <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-brand-200 transition-colors">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded text-gray-500 dark:text-gray-300">
        <Layout size={20} />
      </div>
      <div>
        <h4 className="text-sm font-bold text-gray-900 dark:text-white">{title}</h4>
        <p className="text-xs text-gray-500 dark:text-gray-400">{size}</p>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <span className={`text-xs font-bold ${status ? 'text-green-600' : 'text-gray-400'}`}>
        {status ? 'Active' : 'Disabled'}
      </span>
      <button onClick={onToggle} className={`${status ? 'text-green-500' : 'text-gray-300 dark:text-gray-600'}`}>
        {status ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
      </button>
    </div>
  </div>
);

const MarketingManager = () => {
  const [activeTab, setActiveTab] = useState('ads');
  const [adZones, setAdZones] = useState({
    header: true,
    sidebar: true,
    inFeed: true,
    footer: false,
    popup: false
  });

  // Sponsored Content State
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<any>(null);
  
  // Form State
  const [campaignForm, setCampaignForm] = useState({
    client: '',
    campaign: '',
    type: 'Article',
    startDate: '',
    ends: '',
    status: 'Scheduled'
  });

  const toggleZone = (key: keyof typeof adZones) => {
    setAdZones(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleEditCampaign = (campaign: any) => {
    setEditingCampaign(campaign);
    setCampaignForm({
      client: campaign.client,
      campaign: campaign.campaign,
      type: campaign.type,
      startDate: campaign.startDate,
      ends: campaign.ends,
      status: campaign.status
    });
    setIsCampaignModalOpen(true);
  };

  const handleNewCampaign = () => {
    setEditingCampaign(null);
    setCampaignForm({
      client: '',
      campaign: '',
      type: 'Article',
      startDate: '',
      ends: '',
      status: 'Scheduled'
    });
    setIsCampaignModalOpen(true);
  };

  const handleSaveCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCampaign) {
      setCampaigns(prev => prev.map(c => c.id === editingCampaign.id ? { ...c, ...campaignForm } : c));
    } else {
      const newCampaign = {
        id: Date.now(),
        ...campaignForm,
        views: '0',
        clicks: '0',
        ctr: '0%'
      };
      setCampaigns(prev => [newCampaign, ...prev]);
    }
    setIsCampaignModalOpen(false);
  };

  const handleDeleteCampaign = (id: number) => {
    if (window.confirm('Are you sure you want to delete this campaign?')) {
      setCampaigns(prev => prev.filter(c => c.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <DollarSign className="text-brand-600" /> Monetization
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Manage ads, affiliates, and partnerships.</p>
        </div>
        <div className="flex bg-white dark:bg-gray-800 rounded-lg p-1 border border-gray-200 dark:border-gray-700 shadow-sm">
          <button onClick={() => setActiveTab('ads')} className={`px-4 py-2 rounded-md text-sm font-bold ${activeTab === 'ads' ? 'bg-gray-900 text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}>Ads Control</button>
          <button onClick={() => setActiveTab('affiliate')} className={`px-4 py-2 rounded-md text-sm font-bold ${activeTab === 'affiliate' ? 'bg-gray-900 text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}>Affiliates</button>
          <button onClick={() => setActiveTab('sponsored')} className={`px-4 py-2 rounded-md text-sm font-bold ${activeTab === 'sponsored' ? 'bg-gray-900 text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}>Sponsored</button>
        </div>
      </div>

      {activeTab === 'ads' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-2">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Ad Revenue Performance</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{backgroundColor: '#1f2937', borderColor: '#374151', color: '#f3f4f6'}} />
                    <Bar dataKey="ads" fill="#16a34a" name="Display Ads" stackId="a" radius={[0, 0, 4, 4]} />
                    <Bar dataKey="aff" fill="#9333ea" name="Affiliate" stackId="a" />
                    <Bar dataKey="spon" fill="#db2777" name="Sponsored" stackId="a" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AdZone title="Header Banner" size="728x90 • Desktop" status={adZones.header} onToggle={() => toggleZone('header')} />
              <AdZone title="Sticky Sidebar" size="300x600 • All Devices" status={adZones.sidebar} onToggle={() => toggleZone('sidebar')} />
              <AdZone title="In-Feed Native" size="Responsive • Mobile" status={adZones.inFeed} onToggle={() => toggleZone('inFeed')} />
              <AdZone title="Sticky Footer" size="320x50 • Mobile" status={adZones.footer} onToggle={() => toggleZone('footer')} />
              <AdZone title="Exit Intent Popup" size="Modal" status={adZones.popup} onToggle={() => toggleZone('popup')} />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-brand-900 text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
               <h3 className="font-bold text-lg mb-2 relative z-10">Total Revenue</h3>
               <p className="text-3xl font-black mb-1 relative z-10">$14,250.00</p>
               <p className="text-xs text-brand-200 relative z-10">+12% this month</p>
               <div className="absolute right-0 bottom-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mb-10"></div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
               <h3 className="font-bold text-gray-900 dark:text-white mb-4">Ad Providers</h3>
               <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                     <span className="font-medium text-gray-900 dark:text-gray-200">Google AdSense</span>
                     <span className="text-green-600 font-bold text-xs bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded">Connected</span>
                  </div>
                  <div className="flex justify-between items-center text-sm p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                     <span className="font-medium text-gray-900 dark:text-gray-200">Ezoic</span>
                     <span className="text-gray-500 dark:text-gray-400 font-bold text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">Disabled</span>
                  </div>
                  <div className="flex justify-between items-center text-sm p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                     <span className="font-medium text-gray-900 dark:text-gray-200">Taboola</span>
                     <span className="text-green-600 font-bold text-xs bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded">Connected</span>
                  </div>
               </div>
               <button className="w-full mt-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                  Manage Codes
               </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'affiliate' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden animate-in fade-in slide-in-from-bottom-2">
           <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-bold text-gray-900 dark:text-white">Product Links</h3>
              <button className="flex items-center gap-2 bg-brand-600 text-white px-3 py-1.5 rounded-lg text-sm font-bold hover:bg-brand-700">
                 <Plus size={16} /> Add Product
              </button>
           </div>
           <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 font-bold uppercase text-xs">
                 <tr>
                    <th className="px-6 py-3">Product Name</th>
                    <th className="px-6 py-3">Brand</th>
                    <th className="px-6 py-3">Clicks</th>
                    <th className="px-6 py-3">Est. Revenue</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3 text-right">Action</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                 {mockAffiliates.map(item => (
                    <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                       <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{item.name}</td>
                       <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{item.brand}</td>
                       <td className="px-6 py-4 dark:text-gray-300">{item.clicks}</td>
                       <td className="px-6 py-4 font-bold text-green-600 dark:text-green-400">{item.revenue}</td>
                       <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-xs font-bold ${item.status === 'Trending' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400' : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'}`}>
                             {item.status}
                          </span>
                       </td>
                       <td className="px-6 py-4 text-right text-gray-400 cursor-pointer hover:text-gray-600 dark:hover:text-gray-200"><MoreVertical size={16} /></td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>
      )}

      {activeTab === 'sponsored' && (
         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden animate-in fade-in slide-in-from-bottom-2">
            <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
               <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Sponsored Content Manager</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Track paid posts and badge expirations.</p>
               </div>
               <button 
                  onClick={handleNewCampaign}
                  className="flex items-center gap-2 bg-brand-600 text-white px-3 py-1.5 rounded-lg text-sm font-bold hover:bg-brand-700"
               >
                  <Plus size={16} /> New Campaign
               </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                 <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 font-bold uppercase text-xs">
                    <tr>
                       <th className="px-6 py-3">Client</th>
                       <th className="px-6 py-3">Campaign</th>
                       <th className="px-6 py-3">Type</th>
                       <th className="px-6 py-3">Duration</th>
                       <th className="px-6 py-3">Metrics (V/C/CTR)</th>
                       <th className="px-6 py-3">Status</th>
                       <th className="px-6 py-3 text-right">Action</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {campaigns.map(item => (
                       <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 group">
                          <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">{item.client}</td>
                          <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{item.campaign}</td>
                          <td className="px-6 py-4">
                             <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs">{item.type}</span>
                          </td>
                          <td className="px-6 py-4 text-xs text-gray-500 dark:text-gray-400">
                             <div className="flex flex-col">
                                <span>Start: {item.startDate}</span>
                                <span className="font-bold text-gray-700 dark:text-gray-300">End: {item.ends}</span>
                             </div>
                          </td>
                          <td className="px-6 py-4 text-xs dark:text-gray-300">
                             <div className="flex gap-2">
                                <span title="Views">👁 {item.views}</span>
                                <span title="Clicks">👆 {item.clicks}</span>
                                <span title="CTR" className="text-green-600 dark:text-green-400 font-bold">{item.ctr}</span>
                             </div>
                          </td>
                          <td className="px-6 py-4">
                             <span className={`px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-fit ${
                                item.status === 'Live' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 
                                item.status === 'Scheduled' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' : 
                                'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                             }`}>
                                {item.status === 'Live' && <CheckCircle size={10} />}
                                {item.status === 'Scheduled' && <Clock size={10} />}
                                {item.status === 'Expired' && <AlertCircle size={10} />}
                                {item.status}
                             </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                             <div className="flex justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => handleEditCampaign(item)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-blue-600 dark:text-blue-400"><Edit2 size={16} /></button>
                                <button onClick={() => handleDeleteCampaign(item.id)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-red-600 dark:text-red-400"><Trash2 size={16} /></button>
                             </div>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
            </div>
         </div>
      )}

      {/* Campaign Add/Edit Modal */}
      {isCampaignModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-700/50">
                 <h2 className="text-xl font-bold text-gray-900 dark:text-white">{editingCampaign ? 'Edit Campaign' : 'New Sponsored Campaign'}</h2>
                 <button onClick={() => setIsCampaignModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"><X size={20} /></button>
              </div>
              
              <form onSubmit={handleSaveCampaign} className="p-6 space-y-4">
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                       <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Client Name</label>
                       <input 
                         required
                         type="text" 
                         className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none bg-white dark:bg-gray-700 dark:text-white"
                         value={campaignForm.client}
                         onChange={(e) => setCampaignForm({...campaignForm, client: e.target.value})}
                         placeholder="e.g. Nike"
                       />
                    </div>
                    <div>
                       <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Content Type</label>
                       <select 
                         className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none bg-white dark:bg-gray-700 dark:text-white"
                         value={campaignForm.type}
                         onChange={(e) => setCampaignForm({...campaignForm, type: e.target.value})}
                       >
                          <option>Article</option>
                          <option>Video</option>
                          <option>Social Post</option>
                          <option>Banner</option>
                       </select>
                    </div>
                 </div>

                 <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Campaign Title</label>
                    <input 
                      required
                      type="text" 
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none bg-white dark:bg-gray-700 dark:text-white"
                      value={campaignForm.campaign}
                      onChange={(e) => setCampaignForm({...campaignForm, campaign: e.target.value})}
                      placeholder="e.g. Summer Collection Launch"
                    />
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <div>
                       <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
                       <div className="relative">
                          <input 
                            required
                            type="date" 
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none pl-9 bg-white dark:bg-gray-700 dark:text-white"
                            value={campaignForm.startDate}
                            onChange={(e) => setCampaignForm({...campaignForm, startDate: e.target.value})}
                          />
                          <Calendar className="absolute left-2.5 top-2.5 text-gray-400" size={16} />
                       </div>
                    </div>
                    <div>
                       <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Expiration Date</label>
                       <div className="relative">
                          <input 
                            required
                            type="date" 
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none pl-9 bg-white dark:bg-gray-700 dark:text-white"
                            value={campaignForm.ends}
                            onChange={(e) => setCampaignForm({...campaignForm, ends: e.target.value})}
                          />
                          <Calendar className="absolute left-2.5 top-2.5 text-gray-400" size={16} />
                       </div>
                       <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">Badge auto-removes after this date.</p>
                    </div>
                 </div>

                 <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Status</label>
                    <select 
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none bg-white dark:bg-gray-700 dark:text-white"
                      value={campaignForm.status}
                      onChange={(e) => setCampaignForm({...campaignForm, status: e.target.value})}
                    >
                       <option>Scheduled</option>
                       <option>Live</option>
                       <option>Paused</option>
                       <option>Expired</option>
                    </select>
                 </div>

                 <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-gray-700 mt-2">
                    <button type="button" onClick={() => setIsCampaignModalOpen(false)} className="flex-1 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-50 dark:hover:bg-gray-700">Cancel</button>
                    <button type="submit" className="flex-1 py-2 bg-brand-600 text-white rounded-lg font-bold hover:bg-brand-700 flex items-center justify-center gap-2">
                       <Save size={18} /> Save Campaign
                    </button>
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default MarketingManager;
