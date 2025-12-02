import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  Check, 
  X, 
  Zap, 
  FileText, 
  Video, 
  Mail, 
  BarChart, 
  AlertCircle,
  Copy,
  DollarSign
} from 'lucide-react';

const LeadDetail = () => {
  const { id } = useParams();
  const [isGenerating, setIsGenerating] = useState(false);
  const [contentGenerated, setContentGenerated] = useState(false);

  // Mock data - in real app, fetch by ID
  const lead = {
    title: "Zendaya Vintage Versace Moment",
    score: 98,
    type: "story",
    evidence: [
      { source: "Twitter", snippet: "Trending #1 Worldwide: Zendaya stuns in archive Versace at Challengers premiere.", url: "#" },
      { source: "Google Trends", snippet: "Search volume spiked +500% in last hour.", url: "#" }
    ],
    metrics: { impressions: "1.5M", velocity: "High", cpc: "$1.20" }
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
        setIsGenerating(false);
        setContentGenerated(true);
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
         <div className="flex items-center gap-4">
            <Link to="/leads" className="p-2 hover:bg-gray-100 rounded-full transition-colors"><ChevronLeft size={24} /></Link>
            <div>
               <div className="flex items-center gap-2 mb-1">
                  <span className="bg-purple-100 text-purple-700 border border-purple-200 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide">Story Lead</span>
                  <span className="bg-red-100 text-red-700 border border-red-200 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide flex items-center gap-1"><Zap size={10} /> Viral Score: 98</span>
               </div>
               <h1 className="text-2xl font-black text-gray-900">{lead.title}</h1>
            </div>
         </div>
         <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 flex items-center gap-2">
               <X size={16} /> Reject
            </button>
            <button className="px-4 py-2 bg-brand-600 text-white rounded-lg text-sm font-bold hover:bg-brand-700 flex items-center gap-2 shadow-sm">
               <Check size={16} /> Claim & Assign
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         
         {/* Left Column: Evidence & Metrics */}
         <div className="space-y-6">
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
               <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><BarChart size={18} /> Performance Metrics</h3>
               <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                     <p className="text-xs text-gray-500 uppercase">Impressions</p>
                     <p className="text-xl font-bold text-gray-900">{lead.metrics.impressions}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                     <p className="text-xs text-gray-500 uppercase">Velocity</p>
                     <p className="text-xl font-bold text-green-600">{lead.metrics.velocity}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                     <p className="text-xs text-gray-500 uppercase">Est. CPC</p>
                     <p className="text-xl font-bold text-gray-900">{lead.metrics.cpc}</p>
                  </div>
               </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
               <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><AlertCircle size={18} /> Evidence Locker</h3>
               <div className="space-y-3">
                  {lead.evidence.map((item, idx) => (
                     <div key={idx} className="p-3 border border-gray-100 rounded-lg bg-gray-50/50">
                        <div className="flex justify-between mb-1">
                           <span className="text-xs font-bold text-brand-600">{item.source}</span>
                           <a href={item.url} className="text-xs text-gray-400 hover:text-brand-600 hover:underline">Source Link</a>
                        </div>
                        <p className="text-sm text-gray-700 italic">"{item.snippet}"</p>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Right Column: AI Content Factory */}
         <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm min-h-[500px]">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                     <Zap className="text-yellow-500 fill-yellow-500" /> Content Recipe
                  </h3>
                  {!contentGenerated && (
                     <button 
                        onClick={handleGenerate}
                        disabled={isGenerating}
                        className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-black transition-all disabled:opacity-70"
                     >
                        {isGenerating ? 'Cooking...' : 'Generate with Gemini'}
                     </button>
                  )}
               </div>

               {contentGenerated ? (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                     
                     {/* Article Draft */}
                     <div className="border border-gray-200 rounded-xl overflow-hidden">
                        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                           <h4 className="font-bold text-sm text-gray-800 flex items-center gap-2"><FileText size={16} /> Article Draft</h4>
                           <button className="text-brand-600 text-xs font-bold hover:underline">Push to WordPress</button>
                        </div>
                        <div className="p-4 space-y-3">
                           <div>
                              <p className="text-xs font-bold text-gray-500 uppercase">Suggested Title</p>
                              <p className="text-lg font-serif font-bold text-gray-900">Zendaya's Vintage Versace Just Broke the Internet</p>
                           </div>
                           <div>
                              <p className="text-xs font-bold text-gray-500 uppercase">Outline</p>
                              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mt-1">
                                 <li>The moment she stepped on the carpet</li>
                                 <li>History of the archival dress (1992 collection)</li>
                                 <li>Social media reaction breakdown</li>
                                 <li>Stylist Law Roach's comments</li>
                              </ul>
                           </div>
                        </div>
                     </div>

                     {/* Video Script */}
                     <div className="border border-gray-200 rounded-xl overflow-hidden">
                        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                           <h4 className="font-bold text-sm text-gray-800 flex items-center gap-2"><Video size={16} /> Veo Script</h4>
                           <button className="text-brand-600 text-xs font-bold hover:underline">Send to Render</button>
                        </div>
                        <div className="p-4 bg-gray-900 text-gray-300 font-mono text-xs rounded-b-xl">
                           <p>[Scene: Fast montage of red carpet flashes]</p>
                           <p className="text-yellow-400">Voiceover: "Did you see this? Zendaya just redefined vintage fashion..."</p>
                           <p>[Scene: Split screen of 1992 runway vs 2025 premiere]</p>
                           <p className="text-yellow-400">Voiceover: "Wearing archival Versace from '92, she proves style is timeless..."</p>
                        </div>
                     </div>

                     {/* Sponsor Match */}
                     <div className="border border-green-200 bg-green-50 rounded-xl p-4 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                           <div className="bg-green-200 p-2 rounded-full text-green-800"><DollarSign size={20} /></div>
                           <div>
                              <h4 className="font-bold text-green-900 text-sm">Sponsor Match: LuxuryResale</h4>
                              <p className="text-xs text-green-700">Relevance: High (Vintage Fashion)</p>
                           </div>
                        </div>
                        <button className="flex items-center gap-2 bg-white border border-green-200 text-green-700 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-green-100">
                           <Mail size={14} /> Draft Email
                        </button>
                     </div>

                  </div>
               ) : (
                  <div className="h-64 flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
                     <Zap size={48} className="mb-4 opacity-20" />
                     <p className="text-sm">Ready to generate content recipe</p>
                  </div>
               )}
            </div>
         </div>

      </div>
    </div>
  );
};

export default LeadDetail;