
import React, { useState } from 'react';
import { 
  Zap, 
  Search, 
  Filter, 
  ArrowRight, 
  RefreshCw, 
  TrendingUp, 
  DollarSign, 
  Globe, 
  Twitter 
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock Data representing leads from the backend
const MOCK_LEADS = [
  { id: '1', title: 'Zendaya Vintage Versace Moment', type: 'story', source: 'Twitter', score: 98, traffic: 'High', status: 'new' },
  { id: '2', title: 'Crypto ETF Approval Rumors', type: 'seo', source: 'GSC', score: 92, traffic: 'Medium', status: 'new' },
  { id: '3', title: 'Summer Skincare Trends', type: 'sponsor', source: 'MarketWatch', score: 88, traffic: 'High', status: 'claimed' },
  { id: '4', title: 'Royal Family Easter Plans', type: 'story', source: 'Google Trends', score: 85, traffic: 'Medium', status: 'published' },
  { id: '5', title: 'iPhone 16 Leaks', type: 'seo', source: 'TechRadar', score: 72, traffic: 'Medium', status: 'rejected' },
];

const ScoreBadge = ({ score }: { score: number }) => {
  let color = 'bg-gray-100 text-gray-600';
  if (score >= 90) color = 'bg-red-100 text-red-700 animate-pulse';
  else if (score >= 75) color = 'bg-green-100 text-green-700';
  else if (score >= 50) color = 'bg-yellow-100 text-yellow-700';

  return (
    <span className={`px-2 py-1 rounded-md text-xs font-black ${color}`}>
      {score} / 100
    </span>
  );
};

const TypeBadge = ({ type }: { type: string }) => {
  const icons = {
    story: <TrendingUp size={12} />,
    seo: <Globe size={12} />,
    sponsor: <DollarSign size={12} />
  };
  const colors = {
    story: 'bg-purple-100 text-purple-700 border-purple-200',
    seo: 'bg-blue-100 text-blue-700 border-blue-200',
    sponsor: 'bg-green-100 text-green-700 border-green-200'
  };
  
  return (
    <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold border ${colors[type as keyof typeof colors]} uppercase tracking-wide`}>
      {icons[type as keyof typeof icons]} {type}
    </span>
  );
};

const LeadGenerator = () => {
  const [isHarvesting, setIsHarvesting] = useState(false);
  const [leads, setLeads] = useState(MOCK_LEADS);

  const handleHarvest = () => {
    setIsHarvesting(true);
    // Simulate API call
    setTimeout(() => {
      setIsHarvesting(false);
      // In a real app, this would fetch new leads from backend
      alert("Harvest complete! 3 new leads found.");
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Zap className="text-yellow-500 fill-yellow-500" /> AI Lead Generator
          </h1>
          <p className="text-gray-500 text-sm">Automated trend harvesting from Google, Socials, and GSC.</p>
        </div>
        <button 
          onClick={handleHarvest}
          disabled={isHarvesting}
          className="bg-brand-600 text-white px-6 py-2.5 rounded-lg font-bold shadow-md hover:bg-brand-700 transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isHarvesting ? <RefreshCw className="animate-spin" /> : <RefreshCw />}
          {isHarvesting ? 'Scanning Web...' : 'Harvest Now'}
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
           <div>
              <p className="text-xs font-bold text-gray-500 uppercase">High Score Leads</p>
              <h3 className="text-3xl font-black text-gray-900 mt-1">12</h3>
           </div>
           <div className="p-3 bg-red-50 text-red-600 rounded-lg"><TrendingUp size={24} /></div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
           <div>
              <p className="text-xs font-bold text-gray-500 uppercase">SEO Opportunities</p>
              <h3 className="text-3xl font-black text-gray-900 mt-1">45</h3>
           </div>
           <div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><Search size={24} /></div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
           <div>
              <p className="text-xs font-bold text-gray-500 uppercase">Est. Traffic Impact</p>
              <h3 className="text-3xl font-black text-gray-900 mt-1">1.2M</h3>
           </div>
           <div className="p-3 bg-green-50 text-green-600 rounded-lg"><Globe size={24} /></div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50">
           <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="text" placeholder="Search opportunities..." className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 outline-none" />
           </div>
           <div className="flex gap-2">
              <button className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                 <Filter size={16} /> Type
              </button>
              <button className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                 <Filter size={16} /> Status
              </button>
           </div>
        </div>

        <div className="overflow-x-auto">
           <table className="w-full text-left text-sm">
              <thead className="bg-white text-gray-500 font-bold uppercase text-xs border-b border-gray-200">
                 <tr>
                    <th className="px-6 py-3">Score</th>
                    <th className="px-6 py-3">Topic / Title</th>
                    <th className="px-6 py-3">Type</th>
                    <th className="px-6 py-3">Source</th>
                    <th className="px-6 py-3">Est. Traffic</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3 text-right">Action</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                 {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50 transition-colors group">
                       <td className="px-6 py-4"><ScoreBadge score={lead.score} /></td>
                       <td className="px-6 py-4 font-bold text-gray-900">{lead.title}</td>
                       <td className="px-6 py-4"><TypeBadge type={lead.type} /></td>
                       <td className="px-6 py-4 text-gray-500">{lead.source}</td>
                       <td className="px-6 py-4 font-medium text-gray-700">{lead.traffic}</td>
                       <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-xs font-bold capitalize ${
                             lead.status === 'new' ? 'bg-blue-50 text-blue-600' :
                             lead.status === 'published' ? 'bg-green-50 text-green-600' :
                             'bg-gray-100 text-gray-500'
                          }`}>{lead.status}</span>
                       </td>
                       <td className="px-6 py-4 text-right">
                          <Link to={`/leads/${lead.id}`} className="text-brand-600 hover:text-brand-800 font-bold text-xs flex items-center justify-end gap-1 group-hover:underline">
                             Details <ArrowRight size={14} />
                          </Link>
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>
      </div>
    </div>
  );
};

export default LeadGenerator;
