
import React, { useState } from 'react';
import { MOCK_POLL, MOCK_SERIES, MOCK_ARTICLES, CURRENT_FASHION_BATTLE, UPCOMING_EVENTS, NAVIGATION_ITEMS } from '../constants';
import { Mail, Layers, Flame, Bell, Calendar, Award, Music, Ticket, BarChart2, Compass } from 'lucide-react';
import Button from './Button';
import { sendNotification } from '../services/notificationService';

interface SidebarProps {
  onSeriesClick?: (seriesId: string) => void;
  followedCategories?: string[];
  onToggleFollowCategory?: (categoryId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  onSeriesClick,
  followedCategories = [],
  onToggleFollowCategory
}) => {
  const [hasVoted, setHasVoted] = useState(false);
  const [fashionVote, setFashionVote] = useState<'contender1' | 'contender2' | null>(null);

  const handleVote = () => {
    setHasVoted(true);
  };

  const handleFashionVote = (contender: 'contender1' | 'contender2') => {
    setFashionVote(contender);
  };

  const handleEventReminder = (eventName: string) => {
    // In a real app, this would check permissions and set a scheduled notification
    sendNotification("Reminder Set", { body: `We'll remind you before ${eventName} starts!` });
  };

  return (
    <div className="space-y-8">

      {/* Discover Categories Widget */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-brand-600 dark:text-brand-400">
               <Compass size={18} aria-hidden="true" />
            </span>
            <h3 className="font-bold text-gray-900 dark:text-gray-100 font-sans">Discover</h3>
          </div>
        </div>
        <div className="p-4 grid grid-cols-2 gap-2">
           {NAVIGATION_ITEMS.filter(item => item.label !== 'LIVE').map((item) => (
              <a 
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded transition-colors"
              >
                 {item.label}
              </a>
           ))}
        </div>
      </div>

      {/* Must-Read Series / Collections Widget */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-brand-600 dark:text-brand-400">
               <Layers size={18} aria-hidden="true" />
            </span>
            <h3 className="font-bold text-gray-900 dark:text-gray-100 font-sans">Curated Collections</h3>
          </div>
        </div>
        <div className="p-0">
          {MOCK_SERIES.map((series) => (
            <button 
              key={series.id}
              onClick={() => onSeriesClick && onSeriesClick(series.id)}
              className="w-full text-left group border-b border-gray-50 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-inset focus:ring-2 focus:ring-brand-500"
            >
              <div className="relative h-24 w-full overflow-hidden">
                 <img src={series.coverUrl} alt="" className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                    <div>
                      <span className="text-[10px] font-bold text-brand-300 uppercase tracking-wider mb-1 block">Series</span>
                      <h4 className="text-white font-serif font-bold leading-tight group-hover:text-brand-100">{series.title}</h4>
                    </div>
                 </div>
              </div>
            </button>
          ))}
          <div className="p-3 bg-gray-50 dark:bg-gray-800/50 text-center border-t border-gray-100 dark:border-gray-800">
             <button className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wide hover:underline focus:outline-none focus:ring-2 focus:ring-brand-500 rounded p-1">View All Collections</button>
          </div>
        </div>
      </div>

      {/* Trending Now Widget */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-red-500">
               <Flame size={18} aria-hidden="true" />
            </span>
            <h3 className="font-bold text-gray-900 dark:text-gray-100 font-sans">Trending Now</h3>
          </div>
        </div>
        <div className="divide-y divide-gray-50 dark:divide-gray-800">
           {MOCK_ARTICLES.slice(0, 5).map((article, index) => (
             <a 
                key={article.id} 
                href={`#article-${article.id}`}
                className="w-full flex items-start gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left group focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-800 block"
             >
                 <span className="text-2xl font-black text-gray-200 dark:text-gray-700 group-hover:text-red-500 font-serif leading-none mt-1 w-6 text-center shrink-0 transition-colors">
                   {index + 1}
                 </span>
                 <div className="w-16 h-16 shrink-0 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800 relative shadow-sm">
                    <img src={article.imageUrl} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                 </div>
                 <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wide mb-1 block">{article.category}</span>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 leading-snug line-clamp-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                      {article.title}
                    </h4>
                 </div>
             </a>
           ))}
        </div>
      </div>

      {/* Fashion Face-Off Widget (Engagement) */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 flex items-center justify-between">
           <div className="flex items-center gap-2">
              <span className="text-pink-500">
                 <Award size={18} aria-hidden="true" />
              </span>
              <h3 className="font-bold text-gray-900 dark:text-gray-100 font-sans">Fashion Face-Off</h3>
           </div>
        </div>
        <div className="p-6">
           <h4 className="text-center font-serif font-bold text-lg mb-4 text-gray-900 dark:text-white">{CURRENT_FASHION_BATTLE.title}</h4>
           <div className="flex gap-4 relative">
               {/* Contender 1 */}
               <button 
                  onClick={() => handleFashionVote('contender1')}
                  className={`flex-1 relative group rounded-xl overflow-hidden aspect-[3/4] transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 ${fashionVote === 'contender2' ? 'opacity-50 grayscale' : ''}`}
               >
                   <img src={CURRENT_FASHION_BATTLE.contender1.imageUrl} alt={CURRENT_FASHION_BATTLE.contender1.name} className="w-full h-full object-cover" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-2 text-center">
                       <span className="text-white font-bold text-sm">{CURRENT_FASHION_BATTLE.contender1.name}</span>
                       {fashionVote && (
                          <span className="text-brand-300 font-bold text-xs animate-in zoom-in">
                             {Math.round((CURRENT_FASHION_BATTLE.contender1.votes / CURRENT_FASHION_BATTLE.totalVotes) * 100)}%
                          </span>
                       )}
                   </div>
                   {fashionVote === 'contender1' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-brand-500/20">
                         <div className="bg-white text-brand-600 rounded-full p-1"><Award size={20} /></div>
                      </div>
                   )}
               </button>

               {/* VS Badge */}
               <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center font-black text-xs shadow-md border-2 border-gray-100 dark:border-gray-700 z-10">VS</div>

               {/* Contender 2 */}
               <button 
                  onClick={() => handleFashionVote('contender2')}
                  className={`flex-1 relative group rounded-xl overflow-hidden aspect-[3/4] transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 ${fashionVote === 'contender1' ? 'opacity-50 grayscale' : ''}`}
               >
                   <img src={CURRENT_FASHION_BATTLE.contender2.imageUrl} alt={CURRENT_FASHION_BATTLE.contender2.name} className="w-full h-full object-cover" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-2 text-center">
                       <span className="text-white font-bold text-sm">{CURRENT_FASHION_BATTLE.contender2.name}</span>
                        {fashionVote && (
                          <span className="text-brand-300 font-bold text-xs animate-in zoom-in">
                             {Math.round((CURRENT_FASHION_BATTLE.contender2.votes / CURRENT_FASHION_BATTLE.totalVotes) * 100)}%
                          </span>
                       )}
                   </div>
                   {fashionVote === 'contender2' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-brand-500/20">
                         <div className="bg-white text-brand-600 rounded-full p-1"><Award size={20} /></div>
                      </div>
                   )}
               </button>
           </div>
           <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-3">
              {fashionVote ? `${CURRENT_FASHION_BATTLE.totalVotes + 1} votes` : 'Tap to vote'}
           </p>
        </div>
      </div>

      {/* Red Carpet Calendar Widget */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
         <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 flex items-center justify-between">
           <div className="flex items-center gap-2">
              <span className="text-brand-600 dark:text-brand-400">
                 <Calendar size={18} aria-hidden="true" />
              </span>
              <h3 className="font-bold text-gray-900 dark:text-gray-100 font-sans">Red Carpet Calendar</h3>
           </div>
        </div>
        <div className="divide-y divide-gray-50 dark:divide-gray-800">
           {UPCOMING_EVENTS.map((event) => (
              <div key={event.id} className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center shrink-0 border border-gray-200 dark:border-gray-700">
                       <span className="text-[10px] text-gray-500 font-bold uppercase">{event.date.split(' ')[0]}</span>
                       <span className="text-sm font-bold text-gray-900 dark:text-white">{event.date.split(' ')[1].replace(',','')}</span>
                    </div>
                    <div>
                       <h4 className="font-bold text-sm text-gray-900 dark:text-white leading-tight">{event.title}</h4>
                       <span className="text-xs text-brand-600 dark:text-brand-400 font-medium flex items-center gap-1">
                          {event.type === 'Award' && <Award size={10} />}
                          {event.type === 'Release' && <Music size={10} />}
                          {event.type === 'Event' && <Ticket size={10} />}
                          {event.type}
                       </span>
                    </div>
                 </div>
                 <button onClick={() => handleEventReminder(event.title)} className="text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors p-1" title="Set Reminder">
                    <Bell size={16} />
                 </button>
              </div>
           ))}
        </div>
        <div className="p-3 bg-gray-50 dark:bg-gray-800/50 text-center border-t border-gray-100 dark:border-gray-800">
           <button className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wide hover:underline focus:outline-none focus:ring-2 focus:ring-brand-500 rounded p-1">View Full Schedule</button>
        </div>
      </div>

      {/* Interactive Poll Widget */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-brand-50 dark:bg-brand-900/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-brand-600 dark:text-brand-400">
               <BarChart2 size={18} aria-hidden="true" />
            </span>
            <h3 className="font-bold text-brand-900 dark:text-brand-200 font-sans">Daily Poll</h3>
          </div>
        </div>
        <div className="p-6">
          <h4 className="font-serif font-bold text-lg leading-tight mb-4 text-gray-900 dark:text-gray-100">
            {MOCK_POLL.question}
          </h4>
          <div className="space-y-3" role="group" aria-label="Poll options">
             {MOCK_POLL.options.map((option) => {
               const percentage = Math.round((option.votes / MOCK_POLL.totalVotes) * 100);
               return (
                 <div key={option.id} className="relative group">
                    {!hasVoted ? (
                      <button 
                        onClick={handleVote}
                        className="w-full text-left px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-brand-500 dark:hover:border-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-all font-medium text-sm text-gray-700 dark:text-gray-300 hover:text-brand-700 dark:hover:text-brand-300 relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-brand-500"
                        aria-label={`Vote for ${option.label}`}
                      >
                         {option.label}
                      </button>
                    ) : (
                      <div className="w-full h-10 bg-gray-100 dark:bg-gray-800 rounded-lg relative overflow-hidden" aria-label={`${option.label}: ${percentage}%`}>
                         <div 
                          className="absolute top-0 left-0 h-full bg-brand-200 dark:bg-brand-900 transition-all duration-1000 ease-out"
                          style={{ width: `${percentage}%` }}
                         />
                         <div className="absolute inset-0 flex items-center justify-between px-4 z-10">
                           <span className="text-sm font-bold text-gray-900 dark:text-white">{option.label}</span>
                           <span className="text-sm font-bold text-brand-800 dark:text-brand-300">{percentage}%</span>
                         </div>
                      </div>
                    )}
                 </div>
               );
             })}
          </div>
          <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
             {hasVoted ? `${MOCK_POLL.totalVotes + 1} votes` : 'Join the conversation'}
          </p>
        </div>
      </div>
      
      {/* Newsletter Widget - Moved UP to avoid overlapping with sticky ad */}
      <div className="bg-brand-900 dark:bg-gray-900 rounded-xl p-6 text-white relative overflow-hidden shadow-lg border border-brand-800 dark:border-gray-700">
        <div className="absolute top-0 right-0 -mr-4 -mt-4 w-32 h-32 bg-brand-500 rounded-full opacity-20 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 -ml-4 -mb-4 w-24 h-24 bg-purple-500 rounded-full opacity-20 blur-2xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2 text-brand-100">
             <Mail size={18} aria-hidden="true" />
             <span className="text-sm font-bold uppercase tracking-wider">The Daily Scoop</span>
          </div>
          <h3 className="text-xl font-serif font-bold mb-3">Don't Miss a Moment</h3>
          <p className="text-brand-100 text-sm mb-4">
            Get the juiciest stories delivered straight to your inbox every morning.
          </p>
          <div className="space-y-3">
            <label htmlFor="sidebar-email" className="sr-only">Your email address</label>
            <input 
              id="sidebar-email"
              type="email" 
              placeholder="Your email address" 
              className="w-full px-3 py-2.5 bg-white/10 border border-white/20 rounded-md text-white placeholder-brand-200/50 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm transition-all"
            />
            <Button variant="primary" className="w-full bg-white text-brand-900 hover:bg-brand-50 font-bold border-none">
              Sign Up Now
            </Button>
          </div>
        </div>
      </div>

      {/* STICKY Ad Placeholder - Moved LAST so it sticks correctly without covering other content */}
      <div className="sticky top-24 z-10">
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 h-[600px] w-full rounded-xl flex flex-col items-center justify-center text-gray-400 dark:text-gray-600 border border-gray-300 dark:border-gray-700 border-dashed relative overflow-hidden group shadow-sm">
             <div className="absolute inset-0 bg-white/30 dark:bg-white/5 skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
             <span className="text-sm font-bold tracking-widest uppercase mb-2">Advertisement</span>
             <span className="text-xs opacity-60">300x600 (Sticky)</span>
          </div>
      </div>

    </div>
  );
};

export default Sidebar;
