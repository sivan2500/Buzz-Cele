
import React, { useState, useEffect, useRef } from 'react';
import { Search, X, TrendingUp, ChevronRight } from 'lucide-react';
import { Article, User } from '../types';
import ArticleCard from './ArticleCard';
import { GOOGLE_TRENDING_DATA } from '../constants';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  onArticleClick?: (articleId: string) => void;
  onAuthorClick: (authorName: string) => void;
  isBookmarked: (id: string) => boolean;
  onToggleBookmark: (id: string) => void;
  currentUser?: User | null;
  onOpenAuthModal?: () => void;
  onTagClick?: (tag: string) => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ 
  isOpen, 
  onClose, 
  articles, 
  onAuthorClick,
  isBookmarked,
  onToggleBookmark,
  currentUser,
  onOpenAuthModal,
  onTagClick
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Article[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Slight delay to allow animation to start before focusing
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchTerm = query.toLowerCase();
    const filtered = articles.filter(article => 
      article.title.toLowerCase().includes(searchTerm) ||
      article.excerpt.toLowerCase().includes(searchTerm) ||
      article.author.toLowerCase().includes(searchTerm) ||
      article.category.toLowerCase().includes(searchTerm) ||
      (article.tags && article.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
    );
    setResults(filtered);
  }, [query, articles]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl animate-in fade-in duration-200"
      onKeyDown={handleKeyDown}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-full flex flex-col">
        
        {/* Header */}
        <div className="h-20 flex items-center gap-4 border-b border-gray-100 dark:border-gray-800 shrink-0">
          <Search className="text-gray-400" size={24} />
          <input
            ref={inputRef}
            type="text"
            inputMode="search"
            autoComplete="off"
            placeholder="Search for celebs, trends, or news..."
            className="flex-1 bg-transparent text-2xl font-serif font-bold text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-600 focus:outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            aria-label="Close search"
          >
            <X size={24} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto py-8 custom-scrollbar">
          {query.trim() === '' ? (
            <div className="animate-in slide-in-from-bottom-2 duration-300">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-6">Trending Searches</h3>
              <div className="flex flex-wrap gap-3">
                {GOOGLE_TRENDING_DATA.slice(0, 5).map(trend => (
                  <button 
                    key={trend.id}
                    onClick={() => setQuery(trend.topic)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-800 hover:bg-brand-50 dark:hover:bg-brand-900/20 text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 rounded-full transition-colors text-sm font-medium border border-gray-100 dark:border-gray-700 hover:border-brand-200 dark:hover:border-brand-800"
                  >
                    <TrendingUp size={14} />
                    {trend.topic}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Found {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
                </span>
              </div>
              
              {results.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                  {results.map(article => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      layout="horizontal"
                      onAuthorClick={(name) => {
                        onClose();
                        onAuthorClick(name);
                      }}
                      isBookmarked={isBookmarked(article.id)}
                      onToggleBookmark={onToggleBookmark}
                      currentUser={currentUser}
                      onOpenAuthModal={onOpenAuthModal}
                      onTagClick={(tag) => {
                        onClose();
                        onTagClick && onTagClick(tag);
                      }}
                    />
                  ))}
                </div>
              ) : (
                 <div className="text-center py-20">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 dark:bg-gray-800 mb-4 text-gray-300 dark:text-gray-600">
                        <Search size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">No matches found</h3>
                    <p className="text-gray-500 dark:text-gray-400">Try checking your spelling or using different keywords.</p>
                 </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Hint */}
        <div className="h-12 border-t border-gray-100 dark:border-gray-800 flex items-center justify-center text-xs text-gray-400 shrink-0">
          Press <span className="mx-1 px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 font-mono text-gray-500 dark:text-gray-400">ESC</span> to close
        </div>

      </div>
    </div>
  );
};

export default SearchOverlay;
