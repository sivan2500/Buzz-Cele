
import React from 'react';
import { Author, Article, User } from '../types';
import ArticleCard from './ArticleCard';
import { Twitter, Instagram, ChevronLeft, MapPin, Award, Users, BadgeCheck } from 'lucide-react';
import Button from './Button';

interface AuthorProfileProps {
  author: Author;
  articles: Article[];
  onBack: () => void;
  onAuthorClick: (authorName: string) => void;
  isBookmarked: (id: string) => boolean;
  onToggleBookmark: (id: string) => void;
  currentUser?: User | null;
  onOpenAuthModal?: () => void;
  onTagClick?: (tag: string) => void;
}

const AuthorProfile: React.FC<AuthorProfileProps> = ({ 
  author, 
  articles, 
  onBack, 
  onAuthorClick,
  isBookmarked,
  onToggleBookmark,
  currentUser,
  onOpenAuthModal,
  onTagClick
}) => {
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

      {/* Author Hero Section */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 mb-8">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Avatar */}
            <div className="relative shrink-0">
               <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden ring-4 ring-brand-100 dark:ring-brand-900 shadow-xl">
                 <img src={author.avatarUrl} alt={author.name} className="w-full h-full object-cover" />
               </div>
               <div className="absolute bottom-1 right-1 bg-blue-500 text-white p-1.5 rounded-full ring-2 ring-white dark:ring-gray-900" title="Verified Author">
                 <Award size={16} aria-hidden="true" />
                 <span className="sr-only">Verified Author</span>
               </div>
            </div>

            {/* Info */}
            <div className="text-center md:text-left flex-1">
              <div className="flex flex-col md:flex-row items-center md:items-baseline gap-2 md:gap-4 mb-2">
                <h1 className="text-3xl md:text-4xl font-serif font-black text-gray-900 dark:text-white flex items-center gap-2">
                  {author.name}
                  <BadgeCheck size={28} className="text-blue-500 fill-blue-50 dark:fill-blue-900/30" aria-label="Verified Account" />
                </h1>
                <span className="text-brand-600 dark:text-brand-400 font-bold uppercase tracking-wide text-xs md:text-sm bg-brand-50 dark:bg-brand-900/30 px-2 py-1 rounded-md">{author.role}</span>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 text-lg mb-6 max-w-2xl leading-relaxed">
                {author.bio}
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm text-gray-500 dark:text-gray-400 mb-6">
                 <div className="flex items-center gap-2">
                   <Users size={16} className="text-gray-400" aria-hidden="true" />
                   <span className="font-bold text-gray-900 dark:text-white">{author.articlesCount}</span>
                   <span>Articles Written</span>
                 </div>
                 <div className="flex items-center gap-2">
                   <MapPin size={16} className="text-gray-400" aria-hidden="true" />
                   <span>Los Angeles, CA</span>
                 </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center justify-center md:justify-start gap-3">
                {author.social.twitter && (
                  <a href="#" className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 hover:bg-[#1DA1F2] hover:text-white px-4 py-2 rounded-full transition-colors text-gray-600 dark:text-gray-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1DA1F2]" aria-label="Visit Twitter profile">
                    <Twitter size={16} aria-hidden="true" />
                    <span>{author.social.twitter}</span>
                  </a>
                )}
                {author.social.instagram && (
                  <a href="#" className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 hover:bg-[#C13584] hover:text-white px-4 py-2 rounded-full transition-colors text-gray-600 dark:text-gray-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#C13584]" aria-label="Visit Instagram profile">
                    <Instagram size={16} aria-hidden="true" />
                    <span>{author.social.instagram}</span>
                  </a>
                )}
                <Button size="sm" variant="outline" className="ml-2 rounded-full dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">Follow</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Author Articles */}
      <div className="container mx-auto px-4 pb-16">
        <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-800 pb-3">Latest Stories by {author.name}</h2>
        
        {articles.length > 0 ? (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map(article => (
              <ArticleCard 
                key={article.id} 
                article={article} 
                onAuthorClick={onAuthorClick} 
                isBookmarked={isBookmarked(article.id)}
                onToggleBookmark={onToggleBookmark}
                currentUser={currentUser}
                onOpenAuthModal={onOpenAuthModal}
                onTagClick={onTagClick}
              />
            ))}
           </div>
        ) : (
          <div className="py-12 text-center bg-gray-50 dark:bg-gray-900 rounded-lg border border-dashed border-gray-200 dark:border-gray-800">
            <p className="text-gray-500 dark:text-gray-400">This author hasn't published any articles yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthorProfile;
