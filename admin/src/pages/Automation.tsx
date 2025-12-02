
import React, { useState } from 'react';
import { ToggleLeft, ToggleRight, Activity, AlertCircle, CheckCircle, Clock, DollarSign, Calculator, Zap, Database } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const AutomationSwitch = ({ label, desc, active, onToggle }: any) => (
  <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-brand-200 transition-colors">
    <div>
      <h3 className="font-bold text-gray-900 dark:text-white">{label}</h3>
      <p className="text-xs text-gray-500 dark:text-gray-400">{desc}</p>
    </div>
    <button onClick={onToggle} className={`transition-colors ${active ? 'text-green-500' : 'text-gray-300 dark:text-gray-600'}`}>
      {active ? <ToggleRight size={40} /> : <ToggleLeft size={40} />}
    </button>
  </div>
);

const costData = [
  { name: 'Gemini (Text)', cost: 12.50, usage: '2.5M Tokens' },
  { name: 'Gemini (Image)', cost: 8.20, usage: '820 Images' },
  { name: 'Veo (Video)', cost: 45.00, usage: '150 Seconds' },
  { name: 'TTS (Audio)', cost: 4.30, usage: '43k Chars' },
];

const Automation = () => {
  const [toggles, setToggles] = useState({
    articleGen: true,
    thumbnailGen: true,
    veoVideo: true,
    autoPublish: false,
    socialPost: false,
    youtubeUpload: false,
    emailDigest: true
  });

  const toggle = (key: keyof typeof toggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const totalCost = costData.reduce((acc, item) => acc + item.cost, 0);

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-300">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Automation Control</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage background jobs, AI workflows, and monitor costs.</p>
        </div>
        <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-2">
          <Activity size={14} /> System Operational
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Controls */}
        <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                    <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <Zap size={18} className="text-brand-600" /> Active Workflows
                    </h3>
                </div>
                <div className="p-4 space-y-4">
                    <AutomationSwitch 
                        label="AI Article Generation (Gemini)" 
                        desc="Gemini generates drafts from trending topics every hour."
                        active={toggles.articleGen}
                        onToggle={() => toggle('articleGen')}
                    />
                    <AutomationSwitch 
                        label="Thumbnail Generation" 
                        desc="Create AI images for new articles automatically."
                        active={toggles.thumbnailGen}
                        onToggle={() => toggle('thumbnailGen')}
                    />
                    <AutomationSwitch 
                        label="Veo Video Rendering" 
                        desc="Automatically create short videos for top stories."
                        active={toggles.veoVideo}
                        onToggle={() => toggle('veoVideo')}
                    />
                    <AutomationSwitch 
                        label="Auto-Publishing" 
                        desc="Publish 'Green' score articles without review."
                        active={toggles.autoPublish}
                        onToggle={() => toggle('autoPublish')}
                    />
                    <AutomationSwitch 
                        label="Social Auto-Posting" 
                        desc="Post to Twitter/X and Facebook upon publishing."
                        active={toggles.socialPost}
                        onToggle={() => toggle('socialPost')}
                    />
                    <AutomationSwitch 
                        label="YouTube Auto-Upload" 
                        desc="Upload Veo videos to Shorts automatically."
                        active={toggles.youtubeUpload}
                        onToggle={() => toggle('youtubeUpload')}
                    />
                </div>
            </div>
        </div>

        {/* Cost Estimator */}
        <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Calculator size={18} className="text-brand-600" /> API Cost Estimator
                </h3>
                
                <div className="mb-6">
                    <div className="flex justify-between items-end mb-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Est. Monthly Cost</span>
                        <span className="text-2xl font-black text-gray-900 dark:text-white">${totalCost.toFixed(2)}</span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div className="bg-brand-500 h-full" style={{ width: '45%' }}></div>
                    </div>
                    <p className="text-xs text-right text-gray-400 mt-1">45% of $150 Budget</p>
                </div>

                <div className="h-48 mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={costData} layout="vertical" margin={{ left: 0, right: 30 }}>
                            <XAxis type="number" hide />
                            <YAxis dataKey="name" type="category" width={80} tick={{fontSize: 10, fill: '#9ca3af'}} />
                            <Tooltip 
                                cursor={{fill: 'transparent'}}
                                contentStyle={{ borderRadius: '8px', border: 'none', backgroundColor: '#1f2937', color: '#fff' }}
                            />
                            <Bar dataKey="cost" fill="#8884d8" radius={[0, 4, 4, 0]} barSize={20}>
                                {costData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={['#ec4899', '#8b5cf6', '#3b82f6', '#10b981'][index % 4]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="space-y-3">
                    {costData.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-sm border-b border-gray-100 dark:border-gray-700 pb-2 last:border-0">
                            <div>
                                <span className="font-bold text-gray-700 dark:text-gray-300 block">{item.name}</span>
                                <span className="text-xs text-gray-400">{item.usage}</span>
                            </div>
                            <span className="font-mono font-medium text-gray-900 dark:text-white">${item.cost.toFixed(2)}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-100 dark:border-blue-900/30">
                <div className="flex items-start gap-3">
                    <Database className="text-blue-600 dark:text-blue-400 mt-1" size={20} />
                    <div>
                        <h4 className="font-bold text-blue-900 dark:text-blue-300 text-sm">Optimization Tip</h4>
                        <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">
                            Veo video costs are high this week. Consider switching to "Preview" quality for drafts to save approx. $15/mo.
                        </p>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default Automation;
