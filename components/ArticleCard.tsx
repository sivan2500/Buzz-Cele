
import React, { useState, useEffect } from 'react';
import { Article, User, Poll, SponsoredContent } from '../types';
import { Clock, User as UserIcon, Facebook, Twitter, Linkedin, MessageCircle, Mail, ChevronDown, ChevronUp, Flame, Bookmark, Layers, Lock, Link as LinkIcon, Check, Sparkles, BarChart2, ShoppingBag, ExternalLink, Eye, Loader2, Send } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import Button from './Button';
import { MOCK_SERIES, MOCK_SPONSORED_CONTENT } from '../constants';
import { generateArticlePoll } from '../services/geminiService';

// Safe Environment variable access
const getApiUrl = () => {
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  return 'http://localhost:5000';
};

const API_URL = getApiUrl();

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
}

// Define Comment Interface locally for display
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

  const setMetaTag = (property: string, content: string) => {
    let meta = document.querySelector(`meta[property="${property}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('property', property);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  };

  setMetaTag('og:title', article.title);
  setMetaTag('og:description', article.excerpt);
  setMetaTag('og:image', article.imageUrl);
  setMetaTag('og:url', `${window.location.origin}/#article-${article.id}`);
  setMetaTag('og:type', 'article');
  
  const setNameTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
  };
  setNameTag('twitter:card', 'summary_large_image');
  setNameTag('twitter:title', article.title);
  setNameTag('twitter:description', article.excerpt);
  setNameTag('twitter:image', article.imageUrl);
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
      
      <button onClick={(e) => handleShare(e, 'facebook')} className="text-gray-400 hover:text-[#1877F2] transition-colors p-1.5 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-full group/icon focus:outline-none focus:ring-2 focus:ring-[#1877F2]" aria-label="Share on Facebook">
        <Facebook size={16} aria-hidden="true" />
      </button>
      
      <button onClick={(e) => handleShare(e, 'twitter')} className="text-gray-400 hover:text-[#1DA1F2] transition-colors p-1.5 hover:bg-sky-50 dark:hover:bg-sky-900/30 rounded-full group/icon focus:outline-none focus:ring-2 focus:ring-[#1DA1F2]" aria-label="Share on Twitter">
        <Twitter size={16} aria-hidden="true" />
      </button>
      
      <button onClick={(e) => handleShare(e, 'linkedin')} className="text-gray-400 hover:text-[#0A66C2] transition-colors p-1.5 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-full group/icon focus:outline-none focus:ring-2 focus:ring-[#0A66C2]" aria-label="Share on LinkedIn">
        <Linkedin size={16} aria-hidden="true" />
      </button>
      
      <button onClick={(e) => handleShare(e, 'whatsapp')} className="text-gray-400 hover:text-[#25D366] transition-colors p-1.5 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-full group/icon focus:outline-none focus:ring-2 focus:ring-[#25D366]" aria-label="Share on WhatsApp">
        <MessageCircle size={16} aria-hidden="true" />
      </button>
      
      <button onClick={(e) => handleShare(e, 'email')} className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full group/icon focus:outline-none focus:ring-2 focus:ring-gray-700" aria-label="Share via Email">
        <Mail size={16} aria-hidden="true" />
      </button>

      <div className="w-px h-4 bg-gray-200 dark:bg-gray-700 mx-1"></div>

      <button 
        onClick={handleCopy} 
        className={`text-gray-400 transition-colors p-1.5 rounded-full group/icon focus:outline-none focus:ring-2 focus:ring-gray-700 ${copied ? 'text-green-500 bg-green-50 dark:bg-green-900/20' : 'hover:text-gray-900 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
        aria-label="Copy Link"
        title="Copy Link"
      >
        {copied ? <Check size={16} aria-hidden="true" /> : <LinkIcon size={16} aria-hidden="true" />}
      </button>
    </div>
  );
};

const ReactionButton = ({ emoji, count, label }: { emoji: string, count: number, label: string }) => {
  const [active, setActive] = useState(false);
  const [currentCount, setCurrentCount] = useState(count);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);

    if (!active) {
      setCurrentCount(c => c + 1);
      setActive(true);
    } else {
      setCurrentCount(c => c - 1);
      setActive(false);
    }
  };

  return (
    <button 
      onClick={handleClick}
      className={`group flex items-center gap-1.5 px-2 py-1.5 rounded-full transition-all duration-200 border focus:outline-none focus:ring-2 focus:ring-brand-500 select-none ${
        active 
          ? 'bg-brand-50 border-brand-100 ring-1 ring-brand-100 dark:bg-brand-900/30 dark:border-brand-800 dark:ring-brand-900' 
          : 'bg-transparent border-transparent hover:bg-white dark:hover:bg-gray-800 hover:shadow-sm'
      } ${isAnimating ? 'scale-95 bg-brand-50/50' : 'scale-100'}`}
      aria-label={`React with ${label} (${currentCount})`}
      aria-pressed={active}
      title={label}
    >
      <span className={`text-base leading-none transform transition-transform duration-300 ease-out ${isAnimating ? 'scale-[1.6] -rotate-12' : 'scale-100 rotate-0'} ${active ? '' : 'grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100'}`}>
        {emoji}
      </span>
      <span className={`text-xs font-bold transition-colors ${active ? 'text-brand-600 dark:text-brand-400' : 'text-gray-500 dark:text-gray-400'}`}>{currentCount}</span>
    </button>
  );
}

const SponsoredCarousel = ({ items }: { items: SponsoredContent[] }) => {
  return (
    <div className="mt-4 pt-4 border-t border-dashed border-gray-200 dark:border-gray-700" onClick={e => e.stopPropagation()}>
      <div className="flex items-center justify-between mb-3 px-1">
        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Sponsored Content</span>
        <span className="text-[9px] text-gray-300 border border-gray-200 dark:border-gray-700 px-1 rounded">Ad</span>
      </div>
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 snap-x">
          {items.map(item => (
              <a 
                key={item.id} 
                href={item.url} 
                className="shrink-0 w-36 sm:w-44 group/ad block snap-start"
                onClick={e => e.stopPropagation()}
              >
                  <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden mb-2 relative">
                      <img 
                        src={item.imageUrl} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover/ad:scale-105 transition-transform" 
                        loading="lazy"
                        decoding="async"
                      />
                  </div>
                  <h5 className="text-xs font-bold text-gray-800 dark:text-gray-200 leading-tight group-hover/ad:text-brand-600 dark:group-hover/ad:text-brand-400 line-clamp-2 mb-0.5">
                      {item.title}
                  </h5>
                  <span className="text-[10px] text-gray-400 truncate block">{item.advertiser}</span>
              </a>
          ))}
      </div>
    </div>
  );
};

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
  onTagClick
}) => {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [poll, setPoll] = useState<Poll | null>(article.aiPoll || null);
  const [isPollLoading, setIsPollLoading] = useState(false);
  const [hasVotedPoll, setHasVotedPoll] = useState(false);
  
  // Real Comment System State
  const [comments, setComments] = useState<CommentType[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isPostingComment, setIsPostingComment] = useState(false);

  const commentsId = `comments-${article.id}`;
  const series = article.seriesId ? MOCK_SERIES.find(s => s.id === article.seriesId) : null;
  const isPremium = currentUser?.isPremium;

  const getReactionCount = (seedStr: string, base: number) => {
      let hash = 0;
      for (let i = 0; i < seedStr.length; i++) {
        hash = seedStr.charCodeAt(i) + ((hash << 5) - hash);
      }
      return Math.abs(hash % base) + 1;
  };

  useEffect(() => {
    if (featured) {
      updateOpenGraphTags(article);
    }
  }, [featured, article]);

  // Fetch Comments on Expand
  useEffect(() => {
      if (isCommentsOpen && comments.length === 0) {
          fetchComments();
      }
  }, [isCommentsOpen]);

  const fetchComments = async () => {
      setLoadingComments(true);
      try {
          const res = await fetch(`${API_URL}/api/articles/${article.id}/comments`);
          if (res.ok) {
              const data = await res.json();
              setComments(data);
          }
      } catch (err) {
          console.error("Failed to load comments", err);
      } finally {
          setLoadingComments(false);
      }
  };

  const handlePostComment = async () => {
      if (!commentText.trim() || !currentUser) return;
      setIsPostingComment(true);
      
      try {
          // Get token from storage manually since it's not in user object
          // Note: In a real app, use a Context or better storage retrieval
          const storedUser = localStorage.getItem('buzzCelebUser');
          let token = '';
          if (storedUser) {
              const parsed = JSON.parse(storedUser);
              token = parsed.token;
          }

          const res = await fetch(`${API_URL}/api/articles/${article.id}/comments`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({ text: commentText })
          });

          if (res.ok) {
              const newComment = await res.json();
              setComments([newComment, ...comments]);
              setCommentText('');
          }
      } catch (err) {
          console.error("Failed to post comment", err);
      } finally {
          setIsPostingComment(false);
      }
  };

  useEffect(() => {
    if (poll) {
      try {
        const votedPolls = JSON.parse(localStorage.getItem('buzzCelebPollVotes') || '[]');
        if (votedPolls.includes(poll.id)) {
          setHasVotedPoll(true);
        } else {
          setHasVotedPoll(false);
        }
      } catch (e) {
        console.error("Error reading poll votes from localStorage", e);
      }
    }
  }, [poll]);

  const handleAuthorClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAuthorClick) {
      onAuthorClick(article.author);
    }
  };

  const handleSeriesClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSeriesClick && article.seriesId) {
      onSeriesClick(article.seriesId);
    }
  }

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleBookmark) {
      onToggleBookmark(article.id);
    }
  };

  const handleCommentFocus = (e: React.FocusEvent | React.MouseEvent) => {
    if (!currentUser && onOpenAuthModal) {
      e.preventDefault();
      if (e.target instanceof HTMLInputElement) {
        e.target.blur();
      }
      onOpenAuthModal();
    }
  };

  const handleGeneratePoll = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPollLoading(true);
    const generatedPoll = await generateArticlePoll(article);
    if (generatedPoll) {
      setPoll(generatedPoll);
    }
    setIsPollLoading(false);
  }

  const handleVotePoll = (e: React.MouseEvent) => {
      e.stopPropagation();
      setHasVotedPoll(true);
      if (poll) {
        try {
          const votedPolls = JSON.parse(localStorage.getItem('buzzCelebPollVotes') || '[]');
          if (!votedPolls.includes(poll.id)) {
            votedPolls.push(poll.id);
            localStorage.setItem('buzzCelebPollVotes', JSON.stringify(votedPolls));
          }
        } catch (e) {
          console.error("Error saving poll vote to localStorage", e);
        }
      }
  }

  const BookmarkButton = ({ className = "" }) => (
    <button
      onClick={handleBookmark}
      className={`p-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 ${
        featured 
          ? 'bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm' 
          : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 shadow-sm border border-gray-100 dark:border-gray-700'
      } ${className}`}
      aria-label={isBookmarked ? "Remove from bookmarks" : "Bookmark this article"}
      title={isBookmarked ? "Remove bookmark" : "Bookmark"}
    >
      <Bookmark 
        size={featured ? 20 : 18} 
        className={`${isBookmarked ? 'fill-current text-brand-500' : ''} transition-colors`} 
        aria-hidden="true"
      />
    </button>
  );

  // Generate JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": article.title,
    "image": [article.imageUrl],
    "datePublished": article.publishedAt,
    "dateModified": article.publishedAt,
    "author": [{
        "@type": "Person",
        "name": article.author,
    }],
    "description": article.excerpt,
    "publisher": {
        "@type": "Organization",
        "name": "BuzzCelebDaily",
        "logo": {
            "@type": "ImageObject",
            "url": "https://buzzcelebdaily.com/logo.png" // Placeholder, in a real app this would be a real URL
        }
    }
  };

  const AuthorComponent = onAuthorClick ? 'button' : 'span';

  const PollSection = () => {
    if (layout === 'horizontal') return null;

    if (isPollLoading) {
        return (
            <div className="mb-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center gap-3">
                <Sparkles className="animate-spin text-brand-500" size={18} />
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 animate-pulse">Consulting the oracle...</span>
            </div>
        )
    }

    if (!poll) {
        return (
            <div className="mb-4">
                <button 
                    onClick={handleGeneratePoll}
                    className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-brand-50 dark:bg-brand-900/20 hover:bg-brand-100 dark:hover:bg-brand-900/30 border border-brand-100 dark:border-brand-800/50 text-brand-700 dark:text-brand-400 text-xs font-bold uppercase tracking-wide transition-colors group/pollbtn"
                >
                    <Sparkles size={14} className="group-hover/pollbtn:scale-110 transition-transform" />
                    AI: Ask the Public Verdict
                </button>
            </div>
        )
    }

    return (
        <div className="mb-5 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-2 mb-3">
                <span className="bg-brand-100 dark:bg-brand-900 text-brand-600 dark:text-brand-400 p-1 rounded-md">
                    <BarChart2 size={14} aria-hidden="true" />
                </span>
                <h4 className="font-serif font-bold text-gray-900 dark:text-gray-100 text-sm">Public Verdict</h4>
                <span className="ml-auto text-[10px] font-medium text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">AI Generated</span>
            </div>
            
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-3">{poll.question}</p>
            
            <div className="space-y-2">
                {poll.options.map((option) => {
                    const percentage = Math.round((option.votes / poll.totalVotes) * 100);
                    return (
                        <div key={option.id} className="relative group/opt">
                            {!hasVotedPoll ? (
                                <button
                                    onClick={handleVotePoll}
                                    className="w-full text-left px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-md hover:border-brand-400 dark:hover:border-brand-500 hover:bg-white dark:hover:bg-gray-800 bg-white/50 dark:bg-gray-800/50 transition-all text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-brand-700 dark:hover:text-brand-400 hover:shadow-sm"
                                >
                                    {option.label}
                                </button>
                            ) : (
                                <div className="w-full h-8 bg-gray-100 dark:bg-gray-800 rounded-md relative overflow-hidden flex items-center px-3 border border-gray-100 dark:border-gray-700">
                                    <div 
                                        className="absolute top-0 left-0 h-full bg-brand-100 dark:bg-brand-900 transition-all duration-700 ease-out"
                                        style={{ width: `${percentage}%` }}
                                    />
                                    <span className="relative z-10 text-xs font-medium text-gray-800 dark:text-gray-200 flex-1 truncate">{option.label}</span>
                                    <span className="relative z-10 text-xs font-bold text-brand-700 dark:text-brand-400">{percentage}%</span>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
            <div className="mt-2 text-center text-[10px] text-gray-400">
                {hasVotedPoll ? `${poll.totalVotes + 1} votes recorded` : "Cast your vote to see results"}
            </div>
        </div>
    );
  };

  const AffiliateSection = () => {
    // Hide for premium users
    if (isPremium) return null;
    if (layout === 'horizontal' || !article.affiliateProducts || article.affiliateProducts.length === 0) return null;

    return (
      <div className="mb-5 border-t border-b border-gray-100 dark:border-gray-800 py-4 bg-gray-50/30 dark:bg-gray-900/30">
        <div className="flex items-center gap-2 mb-3 px-2">
           <ShoppingBag size={14} className="text-gray-500 dark:text-gray-400" />
           <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Shop The Look</span>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar px-2 pb-2 snap-x">
           {article.affiliateProducts.map(product => (
             <a 
               key={product.id} 
               href={product.link}
               target="_blank"
               rel="noopener noreferrer"
               className="shrink-0 w-28 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden group/prod snap-start hover:shadow-md transition-shadow"
               onClick={e => e.stopPropagation()}
             >
                <div className="h-32 overflow-hidden relative">
                   <img 
                     src={product.imageUrl} 
                     alt={product.name} 
                     className="w-full h-full object-cover group-hover/prod:scale-105 transition-transform" 
                     loading="lazy"
                     decoding="async"
                   />
                   <div className="absolute top-1 right-1 bg-black/50 text-white text-[10px] px-1.5 py-0.5 rounded backdrop-blur-sm">
                     {product.price}
                   </div>
                </div>
                <div className="p-2">
                   <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate mb-0.5">{product.brand}</p>
                   <p className="text-xs font-bold text-gray-900 dark:text-white truncate leading-tight mb-2">{product.name}</p>
                   <div className="text-[10px] font-bold text-brand-600 dark:text-brand-400 flex items-center gap-1">
                      Buy Now <ExternalLink size={10} />
                   </div>
                </div>
             </a>
           ))}
        </div>
      </div>
    );
  }

  const SponsoredSection = () => {
      // Hide for premium users
      if (isPremium) return null;
      if (layout === 'horizontal') return null;

      return <SponsoredCarousel items={MOCK_SPONSORED_CONTENT} />;
  }

  if (featured) {
    return (
      <div className="group relative overflow-hidden rounded-xl bg-gray-900 text-white h-full min-h-[400px] flex flex-col justify-end shadow-xl cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
        {/* Inject JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        
        <div className="absolute inset-0">
          <img 
            src={article.imageUrl} 
            alt={article.title} 
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-60"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>
        
        <div className="absolute top-4 right-4 z-20">
          <BookmarkButton />
        </div>

        <div className="relative z-10 p-6 md:p-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider uppercase bg-brand-600 rounded-full shadow-lg">
              {article.category}
            </span>
            {series && (
               <button 
                onClick={handleSeriesClick}
                className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold tracking-wider uppercase bg-gray-800/80 hover:bg-gray-700 backdrop-blur-md rounded-full shadow-lg border border-gray-600 text-brand-100 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500"
               >
                 <Layers size={12} />
                 Series: {series.title}
               </button>
            )}
          </div>
          
          {article.tags && article.tags.length > 0 && (
             <div className="flex flex-wrap gap-2 mb-4">
               {article.tags.map(tag => (
                 <button
                   key={tag}
                   onClick={(e) => { e.stopPropagation(); onTagClick && onTagClick(tag); }}
                   className="text-[10px] font-bold bg-white/20 backdrop-blur-md text-white px-2 py-0.5 rounded hover:bg-white/30 transition-colors border border-white/10"
                 >
                   #{tag}
                 </button>
               ))}
             </div>
          )}

          <h2 className="mb-4 text-2xl md:text-4xl font-serif font-bold leading-tight group-hover:text-brand-100 transition-colors">
            {article.title}
          </h2>
          <p className="mb-6 text-gray-300 line-clamp-2 md:text-lg max-w-2xl">
            {article.excerpt}
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
             <div className="flex items-center text-sm text-gray-300 gap-4">
               <AuthorComponent 
                  onClick={onAuthorClick ? handleAuthorClick : undefined}
                  className={`flex items-center gap-1 ${onAuthorClick ? 'hover:text-brand-400 hover:underline cursor-pointer focus:outline-none focus:text-brand-400' : ''}`}
                  aria-label={`Written by ${article.author}`}
               >
                 <UserIcon size={14} aria-hidden="true" /> {article.author}
               </AuthorComponent>
               <span className="flex items-center gap-1" aria-label={`Published ${formatDistanceToNow(new Date(article.publishedAt))} ago`}>
                 <Clock size={14} aria-hidden="true" /> {formatDistanceToNow(new Date(article.publishedAt))} ago
               </span>
               <span className="flex items-center gap-1 text-gray-400">
                 <Eye size={14} aria-hidden="true" /> {formatNumber(article.views)}
               </span>
             </div>
             
             <div onClick={(e) => e.stopPropagation()}>
               <div className="flex items-center gap-3">
                  <button onClick={(e) => { e.stopPropagation(); window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin + '/#article-' + article.id)}`, '_blank') }} className="text-white/70 hover:text-[#1877F2] transition-colors bg-white/10 p-2 rounded-full hover:bg-white/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white" aria-label="Share on Facebook">
                      <Facebook size={16} aria-hidden="true" />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.origin + '/#article-' + article.id)}`, '_blank') }} className="text-white/70 hover:text-[#1DA1F2] transition-colors bg-white/10 p-2 rounded-full hover:bg-white/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white" aria-label="Share on Twitter">
                      <Twitter size={16} aria-hidden="true" />
                  </button>
                   <button onClick={(e) => { e.stopPropagation(); window.open(`https://wa.me/?text=${encodeURIComponent(article.title + ' ' + window.location.origin + '/#article-' + article.id)}`, '_blank') }} className="text-white/70 hover:text-[#25D366] transition-colors bg-white/10 p-2 rounded-full hover:bg-white/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white" aria-label="Share on WhatsApp">
                      <MessageCircle size={16} aria-hidden="true" />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(window.location.origin + '/#article-' + article.id); }} className="text-white/70 hover:text-green-400 transition-colors bg-white/10 p-2 rounded-full hover:bg-white/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white" aria-label="Copy Link">
                      <LinkIcon size={16} aria-hidden="true" />
                  </button>
               </div>
             </div>
          </div>
        </div>
      </div>
    );
  }

  if (layout === 'horizontal') {
    return (
      <div className="flex gap-4 group cursor-pointer border-b border-gray-50 dark:border-gray-800 pb-4 last:border-0 last:pb-0 relative hover:bg-gray-50/50 dark:hover:bg-gray-800/50 p-2 -mx-2 rounded-lg transition-colors duration-200">
        {/* Inject JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        <div className="w-1/3 shrink-0 relative overflow-hidden rounded-lg aspect-[4/3]">
           <img 
            src={article.imageUrl} 
            alt={article.title} 
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
           <div className="absolute top-1 right-1">
             <BookmarkButton className="!p-1.5 !bg-white/90 dark:!bg-gray-900/90" />
          </div>
        </div>
        <div className="flex flex-col justify-center w-2/3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wide">
                {article.category}
            </span>
             {series && (
               <span 
                className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-bold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded border border-gray-200 dark:border-gray-700"
                title={`Part of series: ${series.title}`}
               >
                 <Layers size={10} />
                 Series
               </span>
            )}
          </div>
          
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-1">
              {article.tags.slice(0, 3).map(tag => (
                <button
                  key={tag}
                  onClick={(e) => { e.stopPropagation(); onTagClick && onTagClick(tag); }}
                  className="text-[9px] font-medium bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-1.5 py-0.5 rounded hover:bg-brand-50 dark:hover:bg-brand-900/30 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  #{tag}
                </button>
              ))}
            </div>
          )}

          <h3 className="font-serif font-bold text-lg leading-snug mb-2 text-gray-900 dark:text-gray-100 group-hover:text-brand-700 dark:group-hover:text-brand-400 transition-colors line-clamp-2">
            {article.title}
          </h3>
           <div className="flex items-center justify-between mt-auto">
             <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 gap-2">
               <span className="flex items-center gap-1" aria-label={`Published ${formatDistanceToNow(new Date(article.publishedAt))} ago`}>
                 <Clock size={12} aria-hidden="true" /> {formatDistanceToNow(new Date(article.publishedAt))} ago
               </span>
               <span className="flex items-center gap-1 text-gray-400">
                 <Eye size={12} aria-hidden="true" /> {formatNumber(article.views)}
               </span>
             </div>
          </div>
          <div className="mt-2 pt-2 border-t border-gray-50 dark:border-gray-800">
               <SocialShare article={article} visible={true} className="scale-90 origin-left" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <article className="group cursor-pointer flex flex-col h-full bg-white dark:bg-gray-900 rounded-lg relative hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-gray-100 dark:hover:border-gray-800">
      {/* Inject JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="relative overflow-hidden rounded-lg aspect-video mb-3 shadow-sm">
        <img 
          src={article.imageUrl} 
          alt={article.title} 
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {article.isBreaking && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow-sm animate-pulse z-10">
            BREAKING
          </div>
        )}
        <div className="absolute top-2 right-2 z-10">
          <BookmarkButton />
        </div>
        {series && (
          <div className="absolute bottom-2 left-2 right-2">
              <button 
                onClick={handleSeriesClick}
                className="w-full bg-black/60 backdrop-blur-sm text-white text-xs py-1.5 px-3 rounded flex items-center justify-center gap-2 hover:bg-black/70 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              >
                  <Layers size={14} className="text-brand-300" />
                  <span className="truncate font-medium">Series: {series.title}</span>
              </button>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3 mb-3">
         <SocialShare article={article} visible={true} showLabel={true} />
      </div>

      <div className="flex flex-col flex-grow px-2 pb-2">
        <div className="flex items-center justify-between mb-1">
           <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wide">
            {article.category}
          </span>
           <span className="text-xs text-gray-500 dark:text-gray-400 font-medium" aria-label={`Reading time: ${article.readTime}`}>
            {article.readTime}
          </span>
        </div>

        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-1 mb-2">
            {article.tags.map(tag => (
              <button
                key={tag}
                onClick={(e) => { e.stopPropagation(); onTagClick && onTagClick(tag); }}
                className="text-[10px] font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full hover:bg-brand-50 dark:hover:bg-brand-900/30 hover:text-brand-600 dark:hover:text-brand-400 transition-colors border border-transparent hover:border-brand-100 dark:hover:border-brand-800"
              >
                #{tag}
              </button>
            ))}
          </div>
        )}

        <h3 className="font-serif font-bold text-xl leading-snug mb-3 text-gray-900 dark:text-gray-100 group-hover:text-brand-700 dark:group-hover:text-brand-400 transition-colors">
          {article.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-4 flex-grow">
          {article.excerpt}
        </p>

        <AffiliateSection />

        <PollSection />

        <div className="mb-4 flex flex-wrap items-center justify-between gap-y-3 gap-x-2">
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" className="w-auto dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700" aria-label={`Read full article: ${article.title}`}>
              Read More
            </Button>
            
            {currentUser && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleBookmark}
                className={`transition-colors ${isBookmarked ? 'bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-400 border-brand-200 dark:border-brand-800' : 'text-gray-600 dark:text-gray-400 dark:border-gray-700'}`}
                aria-label={isBookmarked ? "Remove from saved" : "Save article"}
              >
                <Bookmark size={14} className={`mr-1.5 ${isBookmarked ? 'fill-current' : ''}`} />
                {isBookmarked ? 'Saved' : 'Save'}
              </Button>
            )}
          </div>
          
          <div className="flex items-center gap-1 bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-1 py-0.5 border border-gray-100 dark:border-gray-700 shadow-sm" role="group" aria-label="Quick Reactions">
             <ReactionButton emoji="👍" count={getReactionCount(article.id + 'like', 80)} label="Like" />
             <ReactionButton emoji="❤️" count={getReactionCount(article.id + 'love', 120)} label="Love" />
             <ReactionButton emoji="😂" count={getReactionCount(article.id + 'funny', 40)} label="Funny" />
             <ReactionButton emoji="🤯" count={getReactionCount(article.id + 'shock', 25)} label="Shocked" />
          </div>
        </div>

        <div className="mb-4">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsCommentsOpen(!isCommentsOpen);
            }}
            className="flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors w-full group/comments focus:outline-none focus:text-brand-600"
            aria-expanded={isCommentsOpen}
            aria-controls={commentsId}
            aria-label={`${comments.length} Comments. Click to ${isCommentsOpen ? 'collapse' : 'expand'}.`}
          >
            <MessageCircle size={14} className="text-gray-400 group-hover/comments:text-brand-600 dark:group-hover/comments:text-brand-400" aria-hidden="true" />
            <span>{comments.length > 0 ? comments.length : 'No'} Comments</span>
            {isCommentsOpen ? <ChevronUp size={14} className="ml-auto" aria-hidden="true" /> : <ChevronDown size={14} className="ml-auto" aria-hidden="true" />}
          </button>
          
          {isCommentsOpen && (
            <div id={commentsId} className="mt-3 animate-in fade-in slide-in-from-top-1 duration-200 cursor-auto" onClick={(e) => e.stopPropagation()}>
              
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-md p-3 mb-3 space-y-3 max-h-40 overflow-y-auto custom-scrollbar border border-gray-100 dark:border-gray-800">
                {loadingComments ? (
                    <div className="flex justify-center p-4">
                        <Loader2 className="animate-spin text-brand-500" size={18} />
                    </div>
                ) : comments.length > 0 ? (
                    comments.map(comment => (
                        <div key={comment._id} className="border-b border-gray-200 dark:border-gray-700 pb-2 last:border-0 last:pb-0">
                           <div className="flex items-center gap-2 mb-1">
                              <img src={comment.user.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.user.name}`} alt="" className="w-4 h-4 rounded-full" loading="lazy" />
                              <span className="font-bold text-xs text-gray-900 dark:text-gray-200">{comment.user.name}</span>
                              <span className="text-[10px] text-gray-500 dark:text-gray-400 ml-auto">{formatDistanceToNow(new Date(comment.createdAt))} ago</span>
                           </div>
                           <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed pl-6">{comment.text}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-xs text-gray-500 text-center py-2">No comments yet. Be the first!</p>
                )}
              </div>
              
              <div className="sticky bottom-0 z-20 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 py-3 -mx-4 px-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                 <div className="relative">
                    {!currentUser && (
                        <div className="absolute inset-0 bg-white/50 dark:bg-gray-900/50 backdrop-blur-[1px] z-10 flex items-center justify-center rounded-lg border border-gray-100 dark:border-gray-700 cursor-pointer" onClick={handleCommentFocus}>
                          <div className="flex items-center gap-1.5 text-xs font-bold text-brand-600 dark:text-brand-400 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-full shadow-sm border border-gray-200 dark:border-gray-700">
                              <Lock size={12} />
                              Sign in to comment
                          </div>
                        </div>
                    )}
                    
                    <div className="flex gap-2">
                        {currentUser && (
                          <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-8 h-8 rounded-full object-cover border border-gray-200 dark:border-gray-700" loading="lazy" />
                        )}
                        <input 
                          type="text" 
                          placeholder={currentUser ? "Share your thoughts..." : "Sign in to join the conversation..."}
                          className="w-full text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-3 py-2 focus:outline-none focus:border-brand-300 focus:ring-1 focus:ring-brand-200 dark:text-white dark:focus:ring-brand-900 transition-all placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                          aria-label="Write a comment"
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handlePostComment()}
                          onClick={handleCommentFocus}
                          readOnly={!currentUser}
                        />
                        {currentUser && (
                            <button 
                                onClick={handlePostComment}
                                disabled={isPostingComment || !commentText.trim()}
                                className="p-2 bg-brand-600 text-white rounded-md hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isPostingComment ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                            </button>
                        )}
                    </div>
                 </div>
              </div>

            </div>
          )}
        </div>

        <SponsoredSection />

         <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 gap-3 pt-4 border-t border-gray-100 dark:border-gray-800 mt-auto">
             <AuthorComponent 
                onClick={onAuthorClick ? handleAuthorClick : undefined}
                className={`flex items-center gap-1 font-medium text-gray-700 dark:text-gray-300 ${onAuthorClick ? 'hover:text-brand-600 dark:hover:text-brand-400 cursor-pointer focus:outline-none focus:text-brand-600' : ''}`}
                aria-label={`By ${article.author}`}
             >
               <UserIcon size={14} aria-hidden="true" />
               {article.author}
             </AuthorComponent>
             <span className="text-gray-300 dark:text-gray-600" aria-hidden="true">•</span>
             <span aria-label={`Published ${formatDistanceToNow(new Date(article.publishedAt))} ago`}>
               {formatDistanceToNow(new Date(article.publishedAt))} ago
             </span>
             <span className="text-gray-300 dark:text-gray-600" aria-hidden="true">•</span>
             <span className="flex items-center gap-1 font-medium text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/20 px-1.5 py-0.5 rounded">
               <Eye size={12} aria-hidden="true" /> {formatNumber(article.views)}
             </span>
          </div>
      </div>
    </article>
  );
};

export default ArticleCard;
