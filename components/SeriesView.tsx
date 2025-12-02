
import React, { useState } from 'react';
import { Series, Article, User } from '../types';
import ArticleCard from './ArticleCard';
import Button from './Button';
import { Layers, ChevronLeft, Bell, Share2 } from 'lucide-react';

interface SeriesViewProps {
  series: Series;
  articles: Article[];
  onBack: () => void;
  onAuthorClick: (authorName: string) => void;
  isBookmarked: (id: string) => boolean;
  onToggleBookmark: (id: string) => void;
  currentUser?: User | null;
  onOpenAuthModal?: () => void;
  onTagClick?: (tag: string) => void;
}

const SeriesView: React.FC<SeriesViewProps> = ({ 
  series, 
  articles, 
  onBack, 
  onAuthorClick,
  isBookmarked,
  onToggleBookmark,
  currentUser,
  onOpenAuthModal,
  onTagClick
}) => {
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div className="animate-in fade-in duration-300 bg-white dark:bg-gray-950 min-h-screen">
      {/* Back Navigation */}
      <div className="container mx-auto px-4 py-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 rounded px-2 py-1"
          aria-label="Back to home"
        >
          <ChevronLeft size={16} aria-hidden="true" />
          Back to Feed
        </button>
      </div>

      {/* Series Hero Section */}
      <div className="bg-gray-900 text-white relative mb-12">
         {/* Background Image with Blur */}
         <div className="absolute inset-0 overflow-hidden">
            <img src={series.coverUrl} alt="" className="w-full h-full object-cover opacity-30 blur-sm scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />
         </div>

         <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8 items-center md:items-end">
               <div className="w-48 h-64 shrink-0 rounded-lg overflow-hidden shadow-2xl ring-4 ring-white/10 rotate-3 md:rotate-0 transition-transform">
                  <img src={series.coverUrl} alt={series.title} className="w-full h-full object-cover" />
               </div>
               
               <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-4 text-brand-300">
                     <Layers size={18} />
                     <span className="text-sm font-bold uppercase tracking-widest">Curated Collection</span>
                  </div>
                  <h1 className="text-3xl md:text-5xl font-serif font-black leading-tight mb-4">{series.title}</h1>
                  <p className="text-gray-300 text-lg mb-6 leading-relaxed max-w-2xl">{series.description}</p>
                  
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                     <Button 
                        onClick={() => setIsFollowing(!isFollowing)}
                        variant={isFollowing ? "secondary" : "primary"}
                        size="lg"
                        className={isFollowing ? "bg-white text-gray-900" : ""}
                     >
                        <Bell size={18} className="mr-2" />
                        {isFollowing ? "Following Series" : "Follow Series"}
                     </Button>
                     <Button variant="outline" className="text-white border-white/20 hover:bg-white/10">
                        <Share2 size={18} className="mr-2" />
                        Share
                     </Button>
                     <span className="text-gray-400 text-sm ml-2">{articles.length} Parts</span>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* Articles Grid */}
      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
               <div className="h-px bg-gray-200 dark:bg-gray-800 flex-1"></div>
               <span className="text-gray-400 dark:text-gray-500 font-serif italic text-lg">The Story So Far</span>
               <div className="h-px bg-gray-200 dark:bg-gray-800 flex-1"></div>
            </div>
            
            <div className="space-y-12">
               {articles.map((article, index) => (
                  <div key={article.id} className="relative">
                     {/* Connector Line */}
                     {index !== articles.length - 1 && (
                        <div className="absolute top-12 left-6 bottom-[-48px] w-0.5 bg-gray-200 dark:bg-gray-800 hidden md:block" aria-hidden="true"></div>
                     )}
                     
                     <div className="flex flex-col md:flex-row gap-8">
                        {/* Number Indicator */}
                        <div className="hidden md:flex flex-col items-center shrink-0">
                           <div className="w-12 h-12 rounded-full bg-brand-50 dark:bg-brand-900/30 border-2 border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-400 font-bold font-serif text-xl flex items-center justify-center z-10 shadow-sm">
                              {index + 1}
                           </div>
                        </div>

                        <div className="flex-1">
                           <ArticleCard 
                              article={article} 
                              layout="horizontal" // Use horizontal for list feel, or vertical for impact
                              onAuthorClick={onAuthorClick}
                              isBookmarked={isBookmarked(article.id)}
                              onToggleBookmark={onToggleBookmark}
                              currentUser={currentUser}
                              onOpenAuthModal={onOpenAuthModal}
                              onTagClick={onTagClick}
                           />
                        </div>
                     </div>
                  </div>
               ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default SeriesView;
