
import React, { useState } from 'react';
import { 
  Link2, 
  Globe, 
  Search, 
  RefreshCw, 
  ShieldCheck, 
  AlertTriangle, 
  Mail, 
  Calendar, 
  Copy, 
  ExternalLink,
  Share2,
  GitMerge,
  Zap
} from 'lucide-react';

const BacklinkManager = () => {
  const [config, setConfig] = useState({
    url: 'buzzcelebdaily.com',
    niche: 'Celebrity Entertainment',
    competitors: 'TMZ, E! News, People',
    keywords: 'celebrity news, red carpet fashion, movie leaks'
  });
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'opportunities' | 'outreach' | 'syndication' | 'plan'>('opportunities');

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate AI processing
    setTimeout(() => {
        setIsGenerating(false);
    }, 2500);
  };

  // Mock Data for the Engine
  const guestPosts = [
      { site: 'Hollywood Life', da: 82, topic: 'Rising Stars of 2025', anchor: 'breakout actors' },
      { site: 'Variety (Contributor)', da: 91, topic: 'Indie Film Trends', anchor: 'film reviews' },
      { site: 'Cosmopolitan', da: 86, topic: 'Red Carpet Mistakes', anchor: 'celebrity fashion' },
      { site: 'BuzzFeed Community', da: 93, topic: '10 Moments You Missed', anchor: 'latest gossip' },
  ];

  const brokenLinks = [
      { source: 'Wikipedia: Met Gala', broken: 'fashion-archive.com/2020', replacement: '/articles/met-gala-history' },
      { source: 'FilmSchoolRejects', broken: 'deadsite.com/review', replacement: '/articles/film-reviews' },
      { source: 'IndieWire Forum', broken: 'old-news.com/scandal', replacement: '/articles/celebrity-scandals' },
  ];

  const unlinkedMentions = [
      { site: 'Medium', context: '...according to BuzzCelebDaily, the rumors are true...', action: 'Request Link' },
      { site: 'Reddit /r/popculture', context: 'BuzzCelebDaily broke the news first.', action: 'DM Mod' },
  ];

  const emailTemplates = [
      { type: 'Guest Post', subject: 'Exclusive Story Idea for [Site Name]', body: "Hi [Name],\n\nI've been following [Site Name] for years. I noticed you haven't covered [Topic] yet.\n\nI'd love to write a high-quality exclusive piece for you on this. I have unique data on [Key Point].\n\nLet me know if you'd like to see an outline.\n\nBest,\nBuzzCeleb Editor" },
      { type: 'Broken Link', subject: 'Fix for broken link on [Page Title]', body: "Hi [Name],\n\nI was researching [Topic] and found your great article: [URL].\n\nJust a heads up, one of the links in the second paragraph points to a 404 page. \n\nWe actually have an updated guide on that same topic here: [Your URL]. It might make a good replacement.\n\nThanks,\nBuzzCeleb Team" },
      { type: 'Brand Mention', subject: 'Thanks for the mention!', body: "Hi there,\n\nThanks so much for mentioning BuzzCelebDaily in your recent post! We really appreciate the shoutout.\n\nWould you mind adding a clickable link to our homepage so your readers can find the original source easily?\n\nCheers!" }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Link2 className="text-brand-600" /> SEO Backlink Engine
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Automated white-hat strategy generator.</p>
        </div>
        <div className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold">
            <ShieldCheck size={14} /> Safe Mode Active
        </div>
      </div>

      {/* Configuration Panel */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <SettingsIcon size={18} /> Engine Configuration
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Website URL</label>
                  <input type="text" value={config.url} onChange={e => setConfig({...config, url: e.target.value})} className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded p-2 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500" />
              </div>
              <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Niche</label>
                  <input type="text" value={config.niche} onChange={e => setConfig({...config, niche: e.target.value})} className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded p-2 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500" />
              </div>
              <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Competitors</label>
                  <input type="text" value={config.competitors} onChange={e => setConfig({...config, competitors: e.target.value})} className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded p-2 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500" />
              </div>
              <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Target Keywords</label>
                  <input type="text" value={config.keywords} onChange={e => setConfig({...config, keywords: e.target.value})} className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded p-2 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500" />
              </div>
          </div>
          <button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full bg-brand-900 hover:bg-brand-800 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all"
          >
             {isGenerating ? <RefreshCw className="animate-spin" /> : <Zap />}
             {isGenerating ? 'Analyzing 150+ Data Points...' : 'Generate Backlink Strategy'}
          </button>
      </div>

      {/* Main Workspace */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex overflow-x-auto">
             {['opportunities', 'outreach', 'syndication', 'plan'].map(tab => (
                 <button 
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`px-6 py-4 text-sm font-bold capitalize whitespace-nowrap border-b-2 transition-colors ${activeTab === tab ? 'border-brand-600 text-brand-600 dark:text-brand-400' : 'border-transparent text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'}`}
                 >
                    {tab}
                 </button>
             ))}
          </div>

          <div className="p-6">
              {activeTab === 'opportunities' && (
                  <div className="space-y-8">
                      <div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                             <Globe size={20} className="text-blue-500" /> Guest Post Opportunities (White-Hat)
                          </h3>
                          <div className="overflow-x-auto">
                             <table className="w-full text-left text-sm">
                                 <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 uppercase font-bold text-xs">
                                     <tr>
                                         <th className="p-3">Website</th>
                                         <th className="p-3">Auth (DA)</th>
                                         <th className="p-3">Suggested Topic</th>
                                         <th className="p-3">Anchor Text</th>
                                         <th className="p-3">Action</th>
                                     </tr>
                                 </thead>
                                 <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                     {guestPosts.map((post, i) => (
                                         <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                                             <td className="p-3 font-medium text-gray-900 dark:text-white">{post.site}</td>
                                             <td className="p-3 text-green-600 font-bold">{post.da}</td>
                                             <td className="p-3 text-gray-600 dark:text-gray-300">{post.topic}</td>
                                             <td className="p-3 text-gray-500 dark:text-gray-400 font-mono text-xs">{post.anchor}</td>
                                             <td className="p-3"><button className="text-brand-600 hover:underline text-xs font-bold">Draft Pitch</button></td>
                                         </tr>
                                     ))}
                                 </tbody>
                             </table>
                          </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                  <AlertTriangle size={20} className="text-orange-500" /> Broken Link Opportunities
                              </h3>
                              <div className="space-y-3">
                                  {brokenLinks.map((link, i) => (
                                      <div key={i} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/30">
                                          <p className="text-xs font-bold text-gray-500 uppercase">Source: {link.source}</p>
                                          <p className="text-sm text-red-500 line-through my-1">{link.broken}</p>
                                          <p className="text-xs text-green-600 font-bold flex items-center gap-1"><ExternalLink size={10} /> Replace with: {link.replacement}</p>
                                      </div>
                                  ))}
                              </div>
                          </div>

                          <div>
                              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                  <Search size={20} className="text-purple-500" /> Unlinked Brand Mentions
                              </h3>
                              <div className="space-y-3">
                                  {unlinkedMentions.map((mention, i) => (
                                      <div key={i} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/30">
                                          <div className="flex justify-between mb-1">
                                              <span className="font-bold text-sm text-gray-900 dark:text-white">{mention.site}</span>
                                              <button className="text-xs bg-brand-100 text-brand-700 px-2 py-0.5 rounded font-bold">{mention.action}</button>
                                          </div>
                                          <p className="text-sm text-gray-600 dark:text-gray-400 italic">"{mention.context}"</p>
                                      </div>
                                  ))}
                              </div>
                          </div>
                      </div>
                  </div>
              )}

              {activeTab === 'outreach' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {emailTemplates.map((template, i) => (
                          <div key={i} className="border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:shadow-md transition-shadow bg-gray-50 dark:bg-gray-900">
                              <h4 className="font-bold text-gray-900 dark:text-white mb-2">{template.type}</h4>
                              <div className="bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700 mb-3">
                                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-mono">Subject: {template.subject}</p>
                                  <p className="text-xs text-gray-600 dark:text-gray-300 whitespace-pre-wrap font-sans">{template.body}</p>
                              </div>
                              <button className="w-full flex items-center justify-center gap-2 text-xs font-bold text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                                  <Copy size={14} /> Copy Template
                              </button>
                          </div>
                      ))}
                  </div>
              )}

              {activeTab === 'syndication' && (
                  <div className="space-y-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {['Medium', 'LinkedIn', 'Reddit', 'Pinterest'].map(platform => (
                              <div key={platform} className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl text-center border border-gray-200 dark:border-gray-700">
                                  <Share2 className="mx-auto mb-2 text-gray-400" size={24} />
                                  <h4 className="font-bold text-gray-900 dark:text-white">{platform}</h4>
                                  <p className="text-xs text-gray-500 mt-1">2 posts / week</p>
                              </div>
                          ))}
                      </div>
                      
                      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                          <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                              <GitMerge size={20} /> Internal Linking Structure
                          </h3>
                          <div className="bg-black/90 rounded-xl p-6 font-mono text-xs text-green-400">
                              <p>{`> Analyzing site structure... Done.`}</p>
                              <p>{`> Recommendation: Create Topic Cluster "Fashion"`}</p>
                              <p className="text-white mt-2">{`  [Pillar Page] /category/fashion`}</p>
                              <p className="pl-4">{`├── Link to: /articles/met-gala-2025`}</p>
                              <p className="pl-4">{`├── Link to: /articles/zendaya-style`}</p>
                              <p className="pl-4">{`└── Link to: /articles/red-carpet-fails`}</p>
                              <p className="text-yellow-400 mt-2">{`> Action: Add 3 links to "Best Dressed" article.`}</p>
                          </div>
                      </div>
                  </div>
              )}

              {activeTab === 'plan' && (
                  <div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-6">30-Day Backlink Blueprint</h3>
                      <div className="relative border-l-2 border-brand-200 dark:border-brand-900 ml-3 space-y-8 pb-4">
                          {[
                              { day: 'Day 1-3', task: 'Fix 5 Broken Links', impact: '+2 DA', status: 'done' },
                              { day: 'Day 4-10', task: 'Outreach to 10 Guest Post Sites', impact: '+500 Traffic', status: 'current' },
                              { day: 'Day 11-20', task: 'Syndicate Top 5 Articles', impact: '+20 Backlinks', status: 'pending' },
                              { day: 'Day 21-30', task: 'Competitor Link Replication', impact: '+5 DA', status: 'pending' },
                          ].map((item, i) => (
                              <div key={i} className="relative pl-8">
                                  <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white dark:border-gray-800 ${item.status === 'done' ? 'bg-green-500' : item.status === 'current' ? 'bg-brand-600 animate-pulse' : 'bg-gray-300'}`}></div>
                                  <h4 className="font-bold text-sm text-gray-900 dark:text-white">{item.day}</h4>
                                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{item.task}</p>
                                  <span className="inline-block mt-2 text-xs font-bold text-brand-600 bg-brand-50 dark:bg-brand-900/20 px-2 py-0.5 rounded">
                                      Exp. Impact: {item.impact}
                                  </span>
                              </div>
                          ))}
                      </div>
                  </div>
              )}
          </div>
      </div>
    </div>
  );
};

const SettingsIcon = ({size}: {size: number}) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
);

export default BacklinkManager;
