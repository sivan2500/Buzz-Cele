
import React, { useEffect, useState } from 'react';
import { Article, User, Poll } from '../types';
import { Clock, MessageCircle, Bookmark, ArrowLeft, Tag, Link as LinkIcon, BarChart2, Loader2, Sparkles, Send } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import Button from './Button';
import Sidebar from './Sidebar';
import ArticleCard from './ArticleCard';
import { MOCK_ARTICLES, NAVIGATION_ITEMS } from '../constants';
import { generateArticlePoll } from '../services/geminiService';
import { supabase } from '../supabaseClient';

// Helper to find URL for category
const getCategoryLink = (category: string) => {
    const mainItem = NAVIGATION_ITEMS.find(n => n.label === category);
    if (mainItem) return mainItem.href;
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

interface Comment {
    _id: string;
    text: string;
    createdAt: string;
    user: {
        name: string;
        avatarUrl?: string;
    };
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({
  articleId,
  onBack,
  onAuthorClick,
  isBookmarked,
  onToggleBookmark,
  currentUser,
  onOpenAuthModal,
  onTagClick
}) => {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  
  // Poll State
  const [poll, setPoll] = useState<Poll | null>(null);
  const [isPollLoading, setIsPollLoading] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  // Comment State
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState('');
  const [isPostingComment, setIsPostingComment] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);

  // Fetch Article Data
  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      setPoll(null);
      
      let foundArticle: Article | null = null;

      try {
        // 1. Try fetching from Supabase
        const { data, error } = await supabase
            .from('articles')
            .select('*')
            .eq('id', articleId)
            .single();

        if (data && !error) {
          foundArticle = {
             id: data.id,
             title: data.title,
             excerpt: data.excerpt,
             content: data.content,
             category: data.category,
             author: data.author_name || 'BuzzCeleb Staff',
             imageUrl: data.image_url,
             readTime: data.read_time || '5 min read',
             publishedAt: data.created_at,
             tags: data.tags || [],
             views: data.views || 0,
             isBreaking: data.is_breaking
          };
        } else {
            // 2. Fallback to Mock Data if not in DB (or valid UUID not found)
            const mock = MOCK_ARTICLES.find(a => a.id === articleId) || MOCK_ARTICLES[0];
            if (mock) {
                foundArticle = {
                    ...mock,
                    id: articleId, // Ensure ID consistency
                    content: mock.content || `
                        <p class="lead text-xl font-medium text-gray-900 dark:text-gray-100 mb-6 drop-cap">
                            ${mock.excerpt} This is just the beginning of the story that has everyone talking.
                        </p>
                        <h2 class="text-2xl font-serif font-bold mt-8 mb-4 text-gray-900 dark:text-white">The Inside Scoop</h2>
                        <p class="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                            Sources close to the situation tell BuzzCelebDaily exclusively...
                        </p>
                    `
                };
            }
        }
      } catch (err) {
        console.error("Error loading article", err);
      }

      setArticle(foundArticle);
      setLoading(false);
    };

    // Related articles (Mock for now, could be a Supabase query)
    setRelatedArticles(MOCK_ARTICLES.filter(a => a.id !== articleId).slice(0, 3));

    fetchArticle();
    window.scrollTo(0, 0);
  }, [articleId]);

  // Fetch Comments
  useEffect(() => {
      const fetchComments = async () => {
          setLoadingComments(true);
          try {
              const { data, error } = await supabase
                  .from('comments')
                  .select(`
                      id,
                      text,
                      created_at,
                      profiles (name, avatar_url)
                  `)
                  .eq('article_id', articleId)
                  .order('created_at', { ascending: false });

              if (error) throw error;

              if (data) {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const formattedComments = data.map((c: any) => ({
                      _id: c.id,
                      text: c.text,
                      createdAt: c.created_at,
                      user: {
                          name: c.profiles?.name || 'Anonymous',
                          avatarUrl: c.profiles?.avatar_url
                      }
                  }));
                  setComments(formattedComments);
              }
          } catch (err) {
              // Silent fail to local mock state if DB empty
              setComments([]);
          } finally {
              setLoadingComments(false);
          }
      };
      
      if (articleId) fetchComments();
  }, [articleId]);

  const handleGeneratePoll = async () => {
    if (!article) return;
    setIsPollLoading(true);
    const newPoll = await generateArticlePoll(article);
    setPoll(newPoll);
    setIsPollLoading(false);
  };

  const handleVote = () => setHasVoted(true);

  const handlePostComment = async () => {
      if (!commentText.trim() || !currentUser) return;
      
      setIsPostingComment(true);
      try {
          // Insert into Supabase
          const { data, error } = await supabase
              .from('comments')
              .insert([
                  {
                      article_id: articleId,
                      user_id: currentUser.id, // Auth User ID from profiles
                      text: commentText
                  }
              ])
              .select('*, profiles(name, avatar_url)')
              .single();

          if (error) throw error;

          if (data) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const newComment: Comment = {
                  _id: data.id,
                  text: data.text,
                  createdAt: data.created_at,
                  user: {
                      name: currentUser.name,
                      avatarUrl: currentUser.avatarUrl
                  }
              };
              setComments([newComment, ...comments]);
              setCommentText('');
          }
      } catch (err) {
          console.error("Error posting comment", err);
          alert('Failed to post comment. Ensure you are logged in.');
      } finally {
          setIsPostingComment(false);
      }
  };

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
                <button className="p-2 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-full transition-colors"><LinkIcon size={18} /></button>
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Main Content */}
            <article className="lg:col-span-8">
                <header className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <button 
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
                                <p className="text-sm font-bold text-gray-900 dark:text-white">{article.author}</p>
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

                <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg mb-10 group">
                    <img 
                        src={article.imageUrl} 
                        alt={article.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                </div>

                {/* Content Body */}
                <div 
                    className="prose dark:prose-invert prose-lg max-w-none text-gray-800 dark:text-gray-200 prose-headings:font-serif prose-a:text-brand-600 hover:prose-a:text-brand-700 prose-img:rounded-xl mb-12"
                    dangerouslySetInnerHTML={{ __html: (article as any).content || '' }}
                />

                {/* AI Poll */}
                <div className="mb-12">
                    {isPollLoading ? (
                        <div className="flex items-center justify-center p-8 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
                            <Loader2 className="animate-spin text-brand-600" size={24} />
                            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">Generating poll...</span>
                        </div>
                    ) : poll ? (
                        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                                <BarChart2 size={20} className="text-brand-600" />
                                {poll.question}
                            </h3>
                            <div className="space-y-3">
                                {poll.options.map(opt => {
                                    const pct = Math.round((opt.votes / poll.totalVotes) * 100) || 0;
                                    return (
                                        <button key={opt.id} onClick={handleVote} className="w-full text-left relative h-10 bg-white dark:bg-gray-700 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 hover:border-brand-300 transition-colors group">
                                            {hasVoted && (
                                                <div className="absolute top-0 left-0 h-full bg-brand-100 dark:bg-brand-900/50 transition-all duration-500 ease-out" style={{ width: `${pct}%` }}></div>
                                            )}
                                            <div className="absolute inset-0 flex items-center justify-between px-4 z-10 text-sm font-medium text-gray-800 dark:text-gray-200">
                                                <span>{opt.label}</span>
                                                {hasVoted && <span className="font-bold">{pct}%</span>}
                                            </div>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-center">
                            <button 
                                onClick={handleGeneratePoll}
                                className="flex items-center gap-2 px-6 py-3 bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300 rounded-full font-bold hover:bg-brand-100 dark:hover:bg-brand-900/40 transition-colors"
                            >
                                <Sparkles size={18} />
                                Create a Poll
                            </button>
                        </div>
                    )}
                </div>

                {/* Real-time Comments Section */}
                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6 border border-gray-100 dark:border-gray-800 mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-xl text-gray-900 dark:text-white flex items-center gap-2">
                            <MessageCircle /> Conversation ({comments.length})
                        </h3>
                    </div>
                    
                    <div className="mb-8">
                        {!currentUser ? (
                            <div className="text-center py-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                                <p className="text-gray-500 dark:text-gray-400 mb-3">Join the discussion on this story.</p>
                                <Button onClick={onOpenAuthModal}>Sign in to Comment</Button>
                            </div>
                        ) : (
                            <div className="flex gap-3">
                                <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700" />
                                <div className="flex-1">
                                    <textarea 
                                        value={commentText}
                                        onChange={(e) => setCommentText(e.target.value)}
                                        className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none text-sm min-h-[100px] resize-y" 
                                        placeholder="What do you think? Leave a comment..."
                                    ></textarea>
                                    <div className="flex justify-end mt-2">
                                        <Button 
                                            onClick={handlePostComment} 
                                            disabled={isPostingComment || !commentText.trim()}
                                            className="px-6"
                                        >
                                            {isPostingComment ? <Loader2 className="animate-spin" size={16} /> : <><Send size={16} className="mr-2" /> Post Comment</>}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Comments List */}
                    <div className="space-y-6">
                        {loadingComments ? (
                            <div className="flex justify-center py-4">
                                <Loader2 className="animate-spin text-gray-400" />
                            </div>
                        ) : comments.length > 0 ? (
                            comments.map((comment) => (
                                <div key={comment._id} className="flex gap-3 animate-in fade-in slide-in-from-bottom-2">
                                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden shrink-0">
                                        <img src={comment.user?.avatarUrl || `https://ui-avatars.com/api/?name=${comment.user?.name || 'User'}&background=random`} alt={comment.user?.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-bold text-gray-900 dark:text-white text-sm">{comment.user?.name || 'Anonymous'}</span>
                                            <span className="text-xs text-gray-500 dark:text-gray-400">{formatDistanceToNow(new Date(comment.createdAt))} ago</span>
                                        </div>
                                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed bg-white dark:bg-gray-800 p-3 rounded-r-lg rounded-bl-lg shadow-sm border border-gray-100 dark:border-gray-700 inline-block">
                                            {comment.text}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500 dark:text-gray-400 italic py-4">No comments yet. Be the first to start the gossip!</p>
                        )}
                    </div>
                </div>

            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-8">
                <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 text-center">
                    <div className="w-20 h-20 mx-auto rounded-full overflow-hidden mb-3">
                        <img src={`https://ui-avatars.com/api/?name=${article.author}&background=db2777&color=fff`} alt={article.author} className="w-full h-full object-cover" />
                    </div>
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Written By</p>
                    <h4 className="font-serif font-bold text-lg text-gray-900 dark:text-white mb-2">{article.author}</h4>
                    <button className="text-sm text-brand-600 font-bold hover:underline" onClick={() => onAuthorClick(article.author)}>View Profile</button>
                </div>
                <Sidebar followedCategories={[]} onToggleFollowCategory={() => {}} />
            </aside>
         </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
