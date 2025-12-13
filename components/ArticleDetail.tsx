
import React, { useEffect, useState } from 'react';
import { Article, User } from '../types';
import { Clock, User as UserIcon, Calendar, Share2, MessageCircle, Bookmark, ArrowLeft, Eye, Tag, Facebook, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import Button from './Button';
import Sidebar from './Sidebar';
import ArticleCard from './ArticleCard';
import { MOCK_ARTICLES, NAVIGATION_ITEMS } from '../constants'; // Import Nav Items

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

interface ArticleDetailProps {
  articleId: string;
  onBack: () => void;
  onAuthorClick: (authorName: string) => void;
  isBookmarked: (id: string) => boolean;
  onToggleBookmark: (id: string) => void;
  currentUser: User | null;
  onOpenAuthModal: () => void;
  onTagClick: (tag: string) => void;
  onArticleClick: (id: string) => void;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({
  articleId,
  onBack,
  onAuthorClick,
  isBookmarked,
  onToggleBookmark,
  currentUser,
  onOpenAuthModal,
  onTagClick,
  onArticleClick
}) => {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      try {
        // Try backend first
        const res = await fetch(`${API_URL}/api/articles/${articleId}`);
        if (res.ok) {
          const data = await res.json();
          // Map DB to Frontend Type
          const mapped: Article = {
             id: data._id,
             title: data.title,
             excerpt: data.excerpt,
             content: data.content, // HTML content
             category: data.category,
             author: data.author || data.authorName || 'BuzzCeleb Staff',
             imageUrl: data.imageUrl,
             readTime: data.readTime || '5 min read',
             publishedAt: data.createdAt,
             tags: data.tags || [],
             views: data.views || 0,
             isBreaking: data.isBreaking
          };
          setArticle(mapped);
        } else {
          // Fallback to Mock
          const mock = MOCK_ARTICLES.find(a => a.id === articleId);
          if (mock) {
             setArticle({
                 ...mock, 
                 content: mock.content || `
                    <p class="lead text-xl font-medium text-gray-900 dark:text-gray-100 mb-6 drop-cap">
                        ${mock.excerpt} This is just the beginning of the story that has everyone talking.
                    </p>
                    <h2 class="text-2xl font-serif font-bold mt-8 mb-4 text-gray-900 dark:text-white">The Inside Scoop</h2>
                    <p class="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                        Sources close to the situation tell BuzzCelebDaily exclusively that the events unfolded rapidly over the weekend. "It was chaotic," says one insider who was at the scene. "Nobody saw this coming, but looking back, the signs were there."
                    </p>
                    <p class="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                        Fans have been speculating on social media for weeks, dissecting every Instagram post and tweet. Now, it seems their theories might have been closer to the truth than anyone realized.
                    </p>
                    <blockquote class="border-l-4 border-brand-500 pl-4 py-2 my-8 italic text-lg text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800/50 rounded-r-lg">
                        "This is going to change everything we thought we knew about the situation. It's a game changer."
                    </blockquote>
                    <h2 class="text-2xl font-serif font-bold mt-8 mb-4 text-gray-900 dark:text-white">What's Next?</h2>
                    <p class="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                        As the dust settles, experts weigh in on the potential fallout. Brand deals could be at risk, and PR teams are undoubtedly working overtime. We reached out to reps for comment but have not heard back at press time.
                    </p>
                    <p class="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                        Stay tuned to BuzzCelebDaily for real-time updates on this developing story.
                    </p>
                 `
             });
          }
        }
      } catch (err) {
        console.error("Failed to load article", err);
      } finally {
        setLoading(false);
      }
    };

    // Find related articles (Mock logic)
    const related = MOCK_ARTICLES.filter(a => a.id !== articleId).slice(0, 3);
    setRelatedArticles(related);

    fetchArticle();
    window.scrollTo(0, 0);
  }, [articleId]);

  if (loading) {
      return (
          <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
          </div>
      );
  }

  if (!article) {
      return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-950">
              <h2 className="text-2xl font-bold mb-4 dark:text-white">Article Not Found</h2>
              <Button onClick={onBack}>Return to Home</Button>
          </div>
      );
  }

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen animate-in fade-in duration-300">
      
      {/* Sticky Header / Progress (Optional, simplified for now) */}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
         {/* Breadcrumbs & Back */}
         <div className="flex items-center justify-between mb-6">
            <button 
                onClick={onBack}
                className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-400 transition-colors group"
            >
                <div className="p-1 rounded-full bg-gray-100 dark:bg-gray-800 group-hover:bg-brand-100 dark:group-hover:bg-brand-900/30">
                    <ArrowLeft size={16} />
                </div>
                Back to News
            </button>
            <div className="flex gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400 self-center mr-2 hidden sm:block">Share</span>
                <button className="p-2 text-gray-500 hover:text-[#1877F2] hover:bg-blue-50 rounded-full transition-colors"><Facebook size={18} /></button>
                <button className="p-2 text-gray-500 hover:text-[#1DA1F2] hover:bg-sky-50 rounded-full transition-colors"><Twitter size={18} /></button>
                <button className="p-2 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-full transition-colors"><LinkIcon size={18} /></button>
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Main Content */}
            <article className="lg:col-span-8">
                {/* Header */}
                <header className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <button 
                            onClick={() => {
                                const link = getCategoryLink(article.category);
                                if(link !== '#') window.location.hash = link;
                            }}
                            className="bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-sm hover:bg-brand-700 transition-colors"
                        >
                            {article.category}
                        </button>
                        {article.isBreaking && (
                            <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide animate-pulse">
                                Breaking
                            </span>
                        )}
                        <span className="text-gray-500 dark:text-gray-400 text-xs font-medium flex items-center gap-1 ml-auto">
                            <Clock size={12} /> {formatDistanceToNow(new Date(article.publishedAt))} ago
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-serif font-black text-gray-900 dark:text-white leading-tight mb-6">
                        {article.title}
                    </h1>

                    <div className="flex items-center justify-between border-y border-gray-100 dark:border-gray-800 py-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                                <img src={`https://ui-avatars.com/api/?name=${article.author}&background=db2777&color=fff`} alt={article.author} />
                            </div>
                            <div>
                                <p 
                                    className="text-sm font-bold text-gray-900 dark:text-white cursor-pointer hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                                    onClick={() => onAuthorClick(article.author)}
                                >
                                    {article.author}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Senior Editor</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                             <div className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                                {article.readTime}
                             </div>
                             <button 
                                onClick={() => onToggleBookmark(article.id)}
                                className={`p-2 rounded-full border transition-all ${isBookmarked(article.id) ? 'bg-brand-50 border-brand-200 text-brand-600' : 'border-gray-200 text-gray-400 hover:border-gray-300'}`}
                             >
                                <Bookmark size={18} className={isBookmarked(article.id) ? 'fill-current' : ''} />
                             </button>
                        </div>
                    </div>
                </header>

                {/* Featured Image */}
                <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg mb-10 group">
                    <img 
                        src={article.imageUrl} 
                        alt={article.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                        <p className="text-white/80 text-xs text-right">Photo Credit: Getty Images</p>
                    </div>
                </div>

                {/* Content Body */}
                <div 
                    className="prose dark:prose-invert prose-lg max-w-none text-gray-800 dark:text-gray-200 prose-headings:font-serif prose-a:text-brand-600 hover:prose-a:text-brand-700 prose-img:rounded-xl mb-12"
                    dangerouslySetInnerHTML={{ __html: (article as any).content || '' }}
                />

                {/* Tags */}
                {article.tags && (
                    <div className="flex flex-wrap gap-2 mb-10 border-t border-gray-100 dark:border-gray-800 pt-6">
                        {article.tags.map(tag => (
                            <button 
                                key={tag}
                                onClick={() => onTagClick(tag)}
                                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-brand-50 hover:text-brand-600 transition-colors flex items-center gap-1"
                            >
                                <Tag size={12} /> {tag}
                            </button>
                        ))}
                    </div>
                )}

                {/* Comments Placeholer (Reusing logic from card but expanded) */}
                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6 border border-gray-100 dark:border-gray-800 mb-12">
                    <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                        <MessageCircle /> Conversation
                    </h3>
                    <div className="text-center py-8">
                        <p className="text-gray-500 dark:text-gray-400 mb-4">Join the discussion on this story.</p>
                        {!currentUser ? (
                            <Button onClick={onOpenAuthModal}>Sign in to Comment</Button>
                        ) : (
                            <textarea 
                                className="w-full p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none" 
                                placeholder="What do you think? Leave a comment..."
                                rows={3}
                            ></textarea>
                        )}
                    </div>
                </div>

                {/* Related Articles */}
                <div>
                    <h3 className="font-serif font-bold text-2xl text-gray-900 dark:text-white mb-6 border-l-4 border-brand-500 pl-3">
                        Read Next
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {relatedArticles.map(rel => (
                            <ArticleCard 
                                key={rel.id} 
                                article={rel} 
                                layout="vertical"
                                onAuthorClick={onAuthorClick}
                                isBookmarked={isBookmarked(rel.id)}
                                onToggleBookmark={onToggleBookmark}
                                currentUser={currentUser}
                                onOpenAuthModal={onOpenAuthModal}
                                onTagClick={onTagClick}
                                // Note: In a real app we'd pass onArticleClick here too, handling it in the prop drill
                            />
                        ))}
                    </div>
                </div>

            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-8">
                {/* Author Widget */}
                <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 text-center">
                    <div className="w-20 h-20 mx-auto rounded-full overflow-hidden mb-3">
                        <img src={`https://ui-avatars.com/api/?name=${article.author}&background=db2777&color=fff`} alt={article.author} className="w-full h-full object-cover" />
                    </div>
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Written By</p>
                    <h4 className="font-serif font-bold text-lg text-gray-900 dark:text-white mb-2 cursor-pointer hover:text-brand-600" onClick={() => onAuthorClick(article.author)}>{article.author}</h4>
                    <button className="text-sm text-brand-600 font-bold hover:underline" onClick={() => onAuthorClick(article.author)}>View Profile</button>
                </div>

                {/* Standard Sidebar */}
                <Sidebar 
                    followedCategories={[]} 
                    onToggleFollowCategory={() => {}} 
                />
            </aside>

         </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
