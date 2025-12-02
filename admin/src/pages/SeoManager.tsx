
import React, { useState } from 'react';
import { 
  Search, 
  BarChart, 
  AlertTriangle, 
  CheckCircle, 
  RefreshCw, 
  Globe, 
  Code, 
  Image as ImageIcon, 
  Zap, 
  Split, 
  Link as LinkIcon,
  Bot,
  Settings,
  Key,
  FileCode
} from 'lucide-react';

const SeoManager = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'tools' | 'tech'>('dashboard');
  const [loading, setLoading] = useState(false);
  const [generatedMeta, setGeneratedMeta] = useState<any>(null);
  const [keywordAnalysis, setKeywordAnalysis] = useState<any>(null);

  // Mock Health Data
  const healthScore = 88;
  const issues = [
    { id: 1, type: 'error', msg: 'Missing Alt Text on 12 images', action: 'Auto-Fix' },
    { id: 2, type: 'warning', msg: 'Duplicate content detected in "Royal Fashion"', action: 'Review' },
    { id: 3, type: 'info', msg: 'Sitemap needs refresh (24 new articles)', action: 'Refresh' },
  ];

  const generateSeoData = () => {
    setLoading(true);
    setTimeout(() => {
      setGeneratedMeta({
        title: "Met Gala 2025: All the Must-See Red Carpet Looks | BuzzCelebDaily",
        desc: "See every stunning outfit from the 2025 Met Gala. From Zendaya to Timothée Chalamet, exclusive photos and fashion breakdowns inside.",
        keywords: ["Met Gala 2025", "Red Carpet Fashion", "Zendaya Met Gala", "Celebrity Style"],
        readability: 92,
        ogImage: "https://example.com/og-met-gala.jpg",
        schema: `{
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": "Met Gala 2025: Must-See Looks",
  "image": ["https://example.com/og-met-gala.jpg"],
  "datePublished": "2025-05-05T08:00:00+08:00",
  "author": [{ "@type": "Person", "name": "Elena Fisher" }]
}`
      });
      setKeywordAnalysis({
          primary: "Met Gala 2025",
          density: "2.4%",
          status: "Optimal",
          lsi: ["Costume Institute", "Anna Wintour", "Best Dressed List"]
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Search className="text-brand-600" /> SEO Engine
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Audit, Optimize, and Rank higher with AI.</p>
        </div>
        <div className="flex bg-white dark:bg-gray-800 rounded-lg p-1 border border-gray-200 dark:border-gray-700 shadow-sm">
          <button onClick={() => setActiveTab('dashboard')} className={`px-4 py-2 rounded-md text-sm font-bold ${activeTab === 'dashboard' ? 'bg-gray-900 text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}>Dashboard</button>
          <button onClick={() => setActiveTab('tools')} className={`px-4 py-2 rounded-md text-sm font-bold ${activeTab === 'tools' ? 'bg-gray-900 text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}>AI Generators</button>
          <button onClick={() => setActiveTab('tech')} className={`px-4 py-2 rounded-md text-sm font-bold ${activeTab === 'tech' ? 'bg-gray-900 text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}>Technical</button>
        </div>
      </div>

      {activeTab === 'dashboard' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-2">
          {/* Health Score */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col items-center justify-center">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="80" cy="80" r="70" stroke="#f3f4f6" strokeWidth="12" fill="transparent" className="dark:stroke-gray-700" />
                <circle cx="80" cy="80" r="70" stroke="#10b981" strokeWidth="12" fill="transparent" strokeDasharray="440" strokeDashoffset={440 - (440 * healthScore) / 100} className="transition-all duration-1000 ease-out" />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-4xl font-black text-gray-900 dark:text-white">{healthScore}</span>
                <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Health Score</span>
              </div>
            </div>
            <div className="mt-6 w-full space-y-2">
               <div className="flex justify-between text-sm"><span className="text-gray-600 dark:text-gray-400">Crawlability</span> <span className="font-bold text-green-600">100%</span></div>
               <div className="flex justify-between text-sm"><span className="text-gray-600 dark:text-gray-400">Performance</span> <span className="font-bold text-yellow-600">85%</span></div>
               <div className="flex justify-between text-sm"><span className="text-gray-600 dark:text-gray-400">Internal Linking</span> <span className="font-bold text-green-600">92%</span></div>
            </div>
          </div>

          {/* Issues List */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <AlertTriangle className="text-orange-500" size={18} /> Critical Issues
            </h3>
            <div className="space-y-4">
              {issues.map(issue => (
                <div key={issue.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-100 dark:border-gray-600">
                  <div className="flex items-center gap-3">
                    {issue.type === 'error' && <div className="w-2 h-2 rounded-full bg-red-500" />}
                    {issue.type === 'warning' && <div className="w-2 h-2 rounded-full bg-yellow-500" />}
                    {issue.type === 'info' && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{issue.msg}</span>
                  </div>
                  <button className="text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 px-3 py-1.5 rounded-md font-bold text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 hover:border-brand-200 transition-colors shadow-sm">
                    {issue.action}
                  </button>
                </div>
              ))}
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-900/30 flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <CheckCircle size={16} className="text-green-600 dark:text-green-400" />
                    <span className="text-sm font-medium text-green-800 dark:text-green-300">Robots.txt is valid</span>
                 </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-4">
             <button className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-brand-300 dark:hover:border-brand-500 hover:shadow-md transition-all text-left group">
                <ImageIcon className="text-purple-500 mb-2 group-hover:scale-110 transition-transform" size={24} />
                <h4 className="font-bold text-sm text-gray-900 dark:text-white">Fix Missing Alt Text</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">AI scans images & adds tags.</p>
             </button>
             <button className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-brand-300 dark:hover:border-brand-500 hover:shadow-md transition-all text-left group">
                <RefreshCw className="text-blue-500 mb-2 group-hover:scale-110 transition-transform" size={24} />
                <h4 className="font-bold text-sm text-gray-900 dark:text-white">Scan Duplicates</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Find & canonicalize copies.</p>
             </button>
             <button className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-brand-300 dark:hover:border-brand-500 hover:shadow-md transition-all text-left group">
                <LinkIcon className="text-green-500 mb-2 group-hover:scale-110 transition-transform" size={24} />
                <h4 className="font-bold text-sm text-gray-900 dark:text-white">Internal Linker</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Suggest relevant cross-links.</p>
             </button>
             <button className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-brand-300 dark:hover:border-brand-500 hover:shadow-md transition-all text-left group">
                <Split className="text-orange-500 mb-2 group-hover:scale-110 transition-transform" size={24} />
                <h4 className="font-bold text-sm text-gray-900 dark:text-white">A/B Headline Test</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Setup variant experiments.</p>
             </button>
          </div>
        </div>
      )}

      {activeTab === 'tools' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-2">
           <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                 <Bot className="text-brand-600" size={20} /> Content Optimizer
              </h3>
              <div className="space-y-4">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Article Content / Topic</label>
                    <textarea 
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none h-32 bg-white dark:bg-gray-700 dark:text-white"
                      placeholder="Paste your article or topic here..."
                      defaultValue="The 2025 Met Gala was a night to remember. Zendaya stunned in a vintage archival piece..."
                    />
                 </div>
                 <div className="flex gap-2">
                    <button 
                      onClick={generateSeoData}
                      disabled={loading}
                      className="flex-1 bg-brand-600 text-white font-bold py-2 rounded-lg hover:bg-brand-700 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {loading ? <RefreshCw className="animate-spin" size={18} /> : <Zap size={18} />}
                        Analyze & Generate
                    </button>
                 </div>
              </div>
           </div>

           <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700 overflow-y-auto max-h-[600px] custom-scrollbar">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Optimization Report</h3>
              {generatedMeta ? (
                 <div className="space-y-6">
                    {/* Google Preview */}
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                       <p className="text-xs text-gray-500 mb-1">Search Snippet Preview</p>
                       <div className="text-[#1a0dab] text-lg font-medium hover:underline cursor-pointer truncate">
                          {generatedMeta.title}
                       </div>
                       <div className="text-[#006621] text-xs mb-1">buzzcelebdaily.com › entertainment › met-gala</div>
                       <div className="text-[#545454] text-sm leading-snug">
                          {generatedMeta.desc}
                       </div>
                    </div>

                    {/* Keyword Analysis */}
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                        <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-3 flex items-center gap-2">
                            <Key size={16} /> Keyword Analysis
                        </h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-gray-500 dark:text-gray-400 block text-xs">Primary Keyword</span>
                                <span className="font-bold text-brand-600 dark:text-brand-400">{keywordAnalysis?.primary}</span>
                            </div>
                            <div>
                                <span className="text-gray-500 dark:text-gray-400 block text-xs">Density</span>
                                <span className="font-bold text-green-600">{keywordAnalysis?.density}</span>
                            </div>
                        </div>
                        <div className="mt-3">
                            <span className="text-gray-500 dark:text-gray-400 block text-xs mb-1">LSI Keywords Suggested</span>
                            <div className="flex flex-wrap gap-1">
                                {keywordAnalysis?.lsi.map((k: string, i: number) => (
                                    <span key={i} className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-700 dark:text-gray-300">{k}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Internal Linking */}
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                        <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-3 flex items-center gap-2">
                            <LinkIcon size={16} /> Internal Linking Suggestions
                        </h4>
                        <ul className="space-y-2 text-sm">
                            <li className="flex justify-between items-center text-gray-600 dark:text-gray-300">
                                <span>Link "Timothée Chalamet" to:</span>
                                <a href="#" className="text-brand-600 hover:underline truncate max-w-[150px]">/articles/timothee-bio</a>
                            </li>
                            <li className="flex justify-between items-center text-gray-600 dark:text-gray-300">
                                <span>Link "Best Dressed" to:</span>
                                <a href="#" className="text-brand-600 hover:underline truncate max-w-[150px]">/category/fashion</a>
                            </li>
                        </ul>
                    </div>

                    {/* Schema JSON-LD */}
                    <div className="bg-[#1e1e1e] p-4 rounded-lg overflow-x-auto relative group">
                       <div className="flex justify-between items-center mb-2">
                          <span className="text-xs text-gray-400 font-mono flex items-center gap-2">
                              <FileCode size={12} /> NewsArticle Schema
                          </span>
                          <button className="text-[10px] text-brand-400 hover:underline opacity-0 group-hover:opacity-100 transition-opacity">Copy JSON</button>
                       </div>
                       <pre className="text-[10px] text-green-400 font-mono leading-relaxed whitespace-pre-wrap">
                          {generatedMeta.schema}
                       </pre>
                    </div>
                 </div>
              ) : (
                 <div className="h-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-600 opacity-60 min-h-[300px]">
                    <Code size={48} className="mb-2" />
                    <p className="text-sm">Generated metadata and schema will appear here</p>
                 </div>
              )}
           </div>
        </div>
      )}

      {activeTab === 'tech' && (
         <div className="max-w-4xl space-y-6 animate-in fade-in slide-in-from-bottom-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
               <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                  <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                     <Globe size={18} /> Indexing & Sitemap
                  </h3>
               </div>
               <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                     <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Google Indexing API</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Auto-submit new articles to Google for instant indexing.</p>
                     </div>
                     <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-green-600 bg-green-50 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded">Active</span>
                        <button className="text-gray-400 hover:text-gray-600"><Settings size={18} /></button>
                     </div>
                  </div>
                  <div className="flex items-center justify-between">
                     <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Sitemap Auto-Refresh</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Regenerate sitemap.xml every hour.</p>
                     </div>
                     <button className="bg-gray-200 dark:bg-gray-600 w-10 h-5 rounded-full relative"><span className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></span></button>
                  </div>
                  <div className="p-4 bg-gray-900 text-gray-300 font-mono text-xs rounded-lg">
                     <div className="flex justify-between mb-2">
                        <span>Last Indexing Log</span>
                        <span className="text-gray-500">2 mins ago</span>
                     </div>
                     <p className="text-green-400">{`> Submitted: /article/met-gala-2025 [200 OK]`}</p>
                     <p>{`> Submitted: /article/royal-news-update [200 OK]`}</p>
                  </div>
               </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
               <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                  <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                     <ImageIcon size={18} /> Media Optimization
                  </h3>
               </div>
               <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                     <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Auto-Compress Images (WebP)</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Convert uploads to WebP format automatically.</p>
                     </div>
                     <button className="bg-brand-600 w-10 h-5 rounded-full relative"><span className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></span></button>
                  </div>
                  <div className="flex items-center justify-between">
                     <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Lazy Load Injection</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Ensure 'loading="lazy"' is on all in-content images.</p>
                     </div>
                     <button className="bg-brand-600 w-10 h-5 rounded-full relative"><span className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></span></button>
                  </div>
               </div>
            </div>
         </div>
      )}
    </div>
  );
};

export default SeoManager;
