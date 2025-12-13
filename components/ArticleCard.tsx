
// ... [Retain existing imports and setup code]
import React, { useState, useEffect } from 'react';
import { Article, User, Poll, SponsoredContent } from '../types';
import { Clock, User as UserIcon, Facebook, Twitter, Linkedin, MessageCircle, Mail, ChevronDown, ChevronUp, Flame, Bookmark, Layers, Lock, Link as LinkIcon, Check, Sparkles, BarChart2, ShoppingBag, ExternalLink, Eye, Loader2, Send } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import Button from './Button';
import { MOCK_SERIES, MOCK_SPONSORED_CONTENT, NAVIGATION_ITEMS } from '../constants'; // Added NAVIGATION_ITEMS
import { generateArticlePoll } from '../services/geminiService';

// ... [Retain helper functions getApiUrl, interface CommentType, SocialShare, ReactionButton, SponsoredCarousel]
// Safe Environment variable access
const getApiUrl = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const meta = import.meta as any;
  if (typeof meta !== 'undefined' && meta.env && meta.env.VITE_API_URL) {
    return meta.env.VITE_API_URL;
  }
  return 'http://localhost:5000';
};

const API_URL = getApiUrl();

interface CommentType {
    _id: string;
    text: string;
    user: {
        name: string;
        avatarUrl?: string;
    };
    createdAt: string;
}

const formatNumber = (num?: number) => {
    if (!num) return '0';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
};

const updateOpenGraphTags = (article: Article) => {
  if (!document) return;
  // OG tags update logic (placeholder)
};

const SocialShare = ({ article, className = "", visible = true, showLabel = false }: { article: Article, className?: string, visible?: boolean, showLabel?: boolean }) => {
  const [copied, setCopied] = useState(false);
  
  const shareUrl = `${window.location.origin}/#article-${article.id}`;
  const shareTitle = article.title;

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleShare = (e: React.MouseEvent, platform: string) => {
    e.stopPropagation();
    let url = '';
    const text = encodeURIComponent(shareTitle);
    const u = encodeURIComponent(shareUrl);

    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${u}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${text}&url=${u}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/shareArticle?mini=true&url=${u}&title=${text}`;
        break;
      case 'whatsapp':
        url = `https://wa.me/?text=${text}%20${u}`;
        break;
      case 'email':
        url = `mailto:?subject=${text}&body=Check%20out%20this%20article:%20${u}`;
        break;
    }

    if (url && platform !== 'email') {
      window.open(url, '_blank', 'width=600,height=400');
    } else if (url && platform === 'email') {
      window.location.href = url;
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className} ${visible ? 'opacity-100' : 'opacity-0'} transition-opacity`} onClick={(e) => e.stopPropagation()}>
      {showLabel && <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mr-2">Share</span>}
      <button onClick={(e) => handleShare(e, 'facebook')} className="text-gray-400 hover:text-[#1877F2] p-1.5 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-full"><Facebook size={16} /></button>
      <button onClick={(e) => handleShare(e, 'twitter')} className="text-gray-400 hover:text-[#1DA1F2] p-1.5 hover:bg-sky-50 dark:hover:bg-sky-900/30 rounded-full"><Twitter size={16} /></button>
      <div className="w-px h-4 bg-gray-200 dark:bg-gray-700 mx-1"></div>
      <button onClick={handleCopy} className={`text-gray-400 p-1.5 rounded-full ${copied ? 'text-green-500' : 'hover:text-gray-900'}`}>{copied ? <Check size={16} /> : <LinkIcon size={16} />}</button>
    </div>
  );
};

const ReactionButton = ({ emoji, count, label }: { emoji: string, count: number, label: string }) => {
  const [active, setActive] = useState(false);
  const [currentCount, setCurrentCount] = useState(count);
  
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!active) { setCurrentCount(c => c + 1); setActive(true); } 
    else { setCurrentCount(c => c - 1); setActive(false); }
  };

  return (
    <button onClick={handleClick} className={`group flex items-center gap-1.5 px-2 py-1.5 rounded-full border ${active ? 'bg-brand-50 border-brand-100 dark:bg-brand-900/30' : 'bg-transparent border-transparent hover:bg-white dark:hover:bg-gray-800'}`}>
      <span className={`text-base ${active ? '' : 'grayscale opacity-60 group-hover:grayscale-0'}`}>{emoji}</span>
      <span className={`text-xs font-bold ${active ? 'text-brand-600' : 'text-gray-500'}`}>{currentCount}</span>
    </button>
  );
};

const SponsoredCarousel = ({ items }: { items: SponsoredContent[] }) => (
    <div className="mt-4 pt-4 border-t border-dashed border-gray-200 dark:border-gray-700" onClick={e => e.stopPropagation()}>
      <div className="flex items-center justify-between mb-3 px-1">
        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Sponsored Content</span>
        <span className="text-[9px] text-gray-300 border border-gray-200 dark:border-gray-700 px-1 rounded">Ad</span>
      </div>
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {items.map(item => (
              <a key={item.id} href={item.url} className="shrink-0 w-36 sm:w-44 group/ad block" onClick={e => e.stopPropagation()}>
                  <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden mb-2 relative">
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover/ad:scale-105 transition-transform" />
                  </div>
                  <h5 className="text-xs font-bold text-gray-800 dark:text-gray-200 leading-tight group-hover/ad:text-brand-600 line-clamp-2 mb-0.5">{item.title}</h5>
              </a>
          ))}
      </div>
    </div>
);

// Helper to find URL for category (Enhanced to search sub-items)
const getCategoryLink = (category: string) => {
    // Check main items
    const mainItem = NAVIGATION_ITEMS.find(n => n.label === category);
    if (mainItem) return mainItem.href;
    
    // Check sub items
    for (const item of NAVIGATION_ITEMS) {
        if (item.subItems) {
            const sub = item.subItems.find(s => s.label === category);
            if (sub) return sub.href;
        }
    }
    return '#';
};

interface ArticleCardProps {
  article: Article;
  layout?: 'vertical' | 'horizontal';
  featured?: boolean;
  onAuthorClick?: (authorName: string) => void;
  isBookmarked?: boolean;
  onToggleBookmark?: (id: string) => void;
  onSeriesClick?: (seriesId: string) => void;
  currentUser?: User | null;
  onOpenAuthModal?: () => void;
  onTagClick?: (tag: string) => void;
  onArticleClick?: (id: string) => void; 
}

const ArticleCard: React.FC<ArticleCardProps> = ({ 
  article, 
  layout = 'vertical', 
  featured = false, 
  onAuthorClick,
  isBookmarked = false,
  onToggleBookmark,
  onSeriesClick,
  currentUser,
  onOpenAuthModal,
  onTagClick,
  onArticleClick 
}) => {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [poll, setPoll] = useState<Poll | null>(article.aiPoll || null);
  const [isPollLoading, setIsPollLoading] = useState(false);
  const [hasVotedPoll, setHasVotedPoll] = useState(false);
  
  // Comment System
  const [comments, setComments] = useState<CommentType[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  
  const series = article.seriesId ? MOCK_SERIES.find(s => s.id === article.seriesId) : null;
  const isPremium = currentUser?.isPremium;

  const handleCardClick = (e: React.MouseEvent) => {
      if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('a')) return;
      if (onArticleClick) {
          onArticleClick(article.id);
      } else {
          window.location.hash = `#article-${article.id}`;
      }
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleBookmark) onToggleBookmark(article.id);
  };

  const BookmarkButton = ({ className = "" }) => (
    <button
      onClick={handleBookmark}
      className={`p-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 ${
        featured 
          ? 'bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm' 
          : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 shadow-sm border border-gray-100 dark:border-gray-700'
      } ${className}`}
    >
      <Bookmark size={featured ? 20 : 18} className={isBookmarked ? 'fill-current text-brand-500' : ''} />
    </button>
  );

  const handleCategoryClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      const link = getCategoryLink(article.category);
      if (link !== '#') window.location.hash = link;
  };

  const handleGeneratePoll = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPollLoading(true);
    const newPoll = await generateArticlePoll(article);
    setPoll(newPoll);
    setIsPollLoading(false);
  };

  const handleVotePoll = (e: React.MouseEvent) => {
      e.stopPropagation();
      setHasVotedPoll(true);
  };

  const PollSection = () => {
    if (isPollLoading) return <div className="p-4 flex items-center justify-center"><Loader2 className="animate-spin text-brand-600" size={20} /></div>;
    
    if (poll) {
        return (
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700" onClick={e => e.stopPropagation()}>
                <h4 className="font-bold text-sm mb-3 flex items-center gap-2 text-gray-900 dark:text-gray-100">
                    <BarChart2 size={16} className="text-brand-600" />
                    {poll.question}
                </h4>
                <div className="space-y-2">
                    {poll.options.map(opt => {
                        const pct = Math.round((opt.votes / poll.totalVotes) * 100) || 0;
                        return (
                            <button key={opt.id} onClick={handleVotePoll} className="w-full text-left text-xs relative h-8 bg-white dark:bg-gray-700 rounded overflow-hidden border border-gray-200 dark:border-gray-600 hover:border-brand-300 transition-colors">
                                {hasVotedPoll && <div className="absolute top-0 left-0 h-full bg-brand-100 dark:bg-brand-900/50 transition-all duration-500" style={{ width: `${pct}%` }}></div>}
                                <div className="absolute inset-0 flex items-center justify-between px-3 z-10 text-gray-800 dark:text-gray-200">
                                    <span>{opt.label}</span>
                                    {hasVotedPoll && <span className="font-bold">{pct}%</span>}
                                </div>
                            </button>
                        )
                    })}
                </div>
            </div>
        );
    }

    return (
        <button 
            onClick={handleGeneratePoll}
            className="mt-4 w-full py-2 bg-gray-50 dark:bg-gray-800 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-xs font-bold text-gray-500 hover:text-brand-600 hover:border-brand-300 transition-colors flex items-center justify-center gap-2"
        >
            <Sparkles size={14} /> Generate AI Poll
        </button>
    );
  };

  if (featured) {
    return (
      <div onClick={handleCardClick} className="group relative overflow-hidden rounded-xl bg-gray-900 text-white h-full min-h-[400px] flex flex-col justify-end shadow-xl cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
        <div className="absolute inset-0">
          <img src={article.imageUrl} alt={article.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>
        
        <div className="absolute top-4 right-4 z-20">
          <BookmarkButton />
        </div>

        <div className="relative z-10 p-6 md:p-8">
          <div className="flex items-center gap-2 mb-2">
            <button onClick={handleCategoryClick} className="inline-block px-3 py-1 text-xs font-bold tracking-wider uppercase bg-brand-600 rounded-full shadow-lg hover:bg-brand-700 transition-colors">{article.category}</button>
            {series && (
               <button onClick={(e) => {e.stopPropagation(); onSeriesClick && onSeriesClick(article.seriesId!)}} className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold tracking-wider uppercase bg-gray-800/80 rounded-full border border-gray-600 text-brand-100">
                 <Layers size={12} /> Series: {series.title}
               </button>
            )}
          </div>
          
          <h2 className="mb-4 text-2xl md:text-4xl font-serif font-bold leading-tight group-hover:text-brand-100 transition-colors">{article.title}</h2>
          <p className="mb-6 text-gray-300 line-clamp-2 md:text-lg max-w-2xl">{article.excerpt}</p>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
             <div className="flex items-center text-sm text-gray-300 gap-4">
               <button onClick={(e) => { e.stopPropagation(); onAuthorClick && onAuthorClick(article.author)}} className="flex items-center gap-1 hover:text-brand-400 hover:underline"><UserIcon size={14} /> {article.author}</button>
               <span className="flex items-center gap-1"><Clock size={14} /> {formatDistanceToNow(new Date(article.publishedAt))} ago</span>
             </div>
          </div>
        </div>
      </div>
    );
  }

  if (layout === 'horizontal') {
    return (
      <div onClick={handleCardClick} className="flex gap-4 group cursor-pointer border-b border-gray-50 dark:border-gray-800 pb-4 last:border-0 last:pb-0 relative hover:bg-gray-50/50 dark:hover:bg-gray-800/50 p-2 -mx-2 rounded-lg transition-colors">
        <div className="w-1/3 shrink-0 relative overflow-hidden rounded-lg aspect-[4/3]">
           <img src={article.imageUrl} alt={article.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        </div>
        <div className="flex flex-col justify-center w-2/3">
          <div className="flex items-center gap-2 mb-1">
            <button onClick={handleCategoryClick} className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wide hover:underline">{article.category}</button>
          </div>
          <h3 className="font-serif font-bold text-lg leading-snug mb-2 text-gray-900 dark:text-gray-100 group-hover:text-brand-700 dark:group-hover:text-brand-400 transition-colors line-clamp-2">{article.title}</h3>
           <div className="flex items-center justify-between mt-auto">
             <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 gap-2">
               <span className="flex items-center gap-1"><Clock size={12} /> {formatDistanceToNow(new Date(article.publishedAt))} ago</span>
             </div>
          </div>
        </div>
      </div>
    );
  }

  // Standard Vertical Card
  return (
    <article onClick={handleCardClick} className="group cursor-pointer flex flex-col h-full bg-white dark:bg-gray-900 rounded-lg relative hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="relative overflow-hidden rounded-lg aspect-video mb-3 shadow-sm">
        <img src={article.imageUrl} alt={article.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        {article.isBreaking && <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow-sm animate-pulse z-10">BREAKING</div>}
        <div className="absolute top-2 right-2 z-10"><BookmarkButton /></div>
      </div>

      <div className="flex flex-col flex-grow px-2 pb-2">
        <div className="flex items-center justify-between mb-1">
           <button onClick={handleCategoryClick} className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wide hover:underline">{article.category}</button>
           <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{article.readTime}</span>
        </div>

        <h3 className="font-serif font-bold text-xl leading-snug mb-3 text-gray-900 dark:text-gray-100 group-hover:text-brand-700 dark:group-hover:text-brand-400 transition-colors">{article.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-4 flex-grow">{article.excerpt}</p>

        {/* Action Buttons */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-y-3 gap-x-2">
          <div className="flex items-center gap-2">
            <Button 
                onClick={handleCardClick} 
                variant="secondary" 
                size="sm" 
                className="w-auto dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
            >
              Read More
            </Button>
          </div>
          {/* Reactions */}
          <div className="flex items-center gap-1 bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-1 py-0.5 border border-gray-100 dark:border-gray-700">
             <ReactionButton emoji="❤️" count={12} label="Love" />
             <ReactionButton emoji="😂" count={5} label="Funny" />
          </div>
        </div>
        
        {/* Poll Section - Vertical Only */}
        <PollSection />

         <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 gap-3 pt-4 border-t border-gray-100 dark:border-gray-800 mt-auto">
             <button onClick={(e) => {e.stopPropagation(); onAuthorClick && onAuthorClick(article.author)}} className="flex items-center gap-1 font-medium text-gray-700 dark:text-gray-300 hover:text-brand-600"><UserIcon size={14} /> {article.author}</button>
             <span>{formatDistanceToNow(new Date(article.publishedAt))} ago</span>
          </div>
      </div>
    </article>
  );
};

export default ArticleCard;
