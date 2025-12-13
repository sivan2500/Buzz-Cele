
import React, { useState, useMemo, useEffect, useRef } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ArticleCard from './components/ArticleCard';
import Sidebar from './components/Sidebar';
import Button from './components/Button';
import NewsletterModal from './components/NewsletterModal';
import AuthModal from './components/AuthModal';
import AuthorProfile from './components/AuthorProfile';
import SeriesView from './components/SeriesView';
import SearchOverlay from './components/SearchOverlay';
import StoryRail from './components/StoryRail';
import StoryViewer from './components/StoryViewer';
import GlobalPlayer from './components/GlobalPlayer';
import NotificationPrompt from './components/NotificationPrompt';
import UserDashboard from './components/UserDashboard';
import LiveView from './components/LiveView';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Advertise from './components/Advertise';
import DoNotSell from './components/DoNotSell';
import SubscriptionTerms from './components/SubscriptionTerms';
import Disclaimer from './components/Disclaimer';
import VerifyEmail from './components/VerifyEmail';
import SubscriptionModal from './components/SubscriptionModal';
import SeoHead from './components/SeoHead';
import { MOCK_ARTICLES, NAVIGATION_ITEMS, MOCK_AUTHORS, MOCK_SERIES, MOCK_STORIES, GOOGLE_TRENDING_DATA } from './constants';
import { Article, Author, Series, User, RadioStation, AppNotification } from './types';
import { generateGossipArticles } from './services/geminiService';
import { checkNotificationPermission, requestNotificationPermission, sendNotification, simulateIncomingPush } from './services/notificationService';
import { Sparkles, RefreshCw, Bookmark, ArrowLeft, X, TrendingUp, ArrowRight, Loader2 } from 'lucide-react';

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

export default function App() {
  const [articles, setArticles] = useState<Article[]>(MOCK_ARTICLES);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [gossipTopic, setGossipTopic] = useState('');
  
  const [currentView, setCurrentView] = useState<'home' | 'author' | 'dashboard' | 'series' | 'live' | 'privacy' | 'terms' | 'about' | 'contact' | 'advertise' | 'do-not-sell' | 'sub-terms' | 'disclaimer' | 'verify'>('home');
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);
  const [selectedSeries, setSelectedSeries] = useState<Series | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [followedCategories, setFollowedCategories] = useState<string[]>([]);
  
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);

  const [showNotificationPrompt, setShowNotificationPrompt] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [viewingStoryId, setViewingStoryId] = useState<string | null>(null);
  
  const [currentStation, setCurrentStation] = useState<RadioStation | null>(null);
  const [isRadioPlaying, setIsRadioPlaying] = useState(false);

  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loadingRef = useRef<HTMLDivElement>(null);

  const [isDarkMode, setIsDarkMode] = useState(false);

  const TABS = ['All', ...NAVIGATION_ITEMS.filter(item => item.label !== 'LIVE').map(item => item.label)];
  const [activeTab, setActiveTab] = useState('All');
  const [activeSubTab, setActiveSubTab] = useState<string | null>(null);

  // --- FETCH REAL ARTICLES FROM BACKEND ---
  useEffect(() => {
    const fetchArticles = async () => {
        try {
            const res = await fetch(`${API_URL}/api/articles`); 
            if (!res.ok) return; 
            const data = await res.json();
            
            if (data.articles && Array.isArray(data.articles)) {
                const dbArticles = data.articles.map((a: any) => ({
                    id: a._id, 
                    title: a.title,
                    excerpt: a.excerpt,
                    category: a.category,
                    subcategory: a.subcategory,
                    author: a.author || a.authorName || 'BuzzCeleb Staff',
                    publishedAt: a.createdAt,
                    imageUrl: a.imageUrl,
                    isBreaking: a.isBreaking,
                    readTime: a.readTime || '3 min read',
                    tags: a.tags || [],
                    aiPoll: a.aiPoll
                }));
                setArticles([...dbArticles, ...MOCK_ARTICLES]);
            }
        } catch (e) {
            console.log("Backend offline, using mock data.");
        }
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    const savedBookmarks = localStorage.getItem('buzzCelebBookmarks');
    if (savedBookmarks) {
      try {
        setBookmarkedIds(JSON.parse(savedBookmarks));
      } catch (e) {
        console.error("Failed to parse bookmarks", e);
      }
    }

    const savedFollowedCats = localStorage.getItem('buzzCelebFollowedCategories');
    if (savedFollowedCats) {
      try {
        setFollowedCategories(JSON.parse(savedFollowedCats));
      } catch (e) {
        console.error("Failed to parse followed categories", e);
      }
    }
    
    const savedUser = localStorage.getItem('buzzCelebUser');
    if (savedUser) {
        try {
            setCurrentUser(JSON.parse(savedUser));
        } catch (e) {
            console.error("Failed to parse user", e);
        }
    }

    const savedTheme = localStorage.getItem('buzzCelebTheme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        setIsDarkMode(true);
    }

    const perm = checkNotificationPermission();
    setNotificationPermission(perm);
    if (perm === 'default') {
      const timer = setTimeout(() => setShowNotificationPrompt(true), 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('buzzCelebTheme', 'dark');
    } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('buzzCelebTheme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#verify/')) {
          setCurrentView('verify');
          window.scrollTo(0, 0);
          return;
      }
      if (hash === '#live' || hash === '#live-tv' || hash === '#live-radio') {
        setCurrentView('live');
        window.scrollTo(0, 0);
      } else if (hash === '#privacy') {
        setCurrentView('privacy');
        window.scrollTo(0, 0);
      } else if (hash === '#terms') {
        setCurrentView('terms');
        window.scrollTo(0, 0);
      } else if (hash === '#about') {
        setCurrentView('about');
        window.scrollTo(0, 0);
      } else if (hash === '#contact') {
        setCurrentView('contact');
        window.scrollTo(0, 0);
      } else if (hash === '#advertise') {
        setCurrentView('advertise');
        window.scrollTo(0, 0);
      } else if (hash === '#do-not-sell') {
        setCurrentView('do-not-sell');
        window.scrollTo(0, 0);
      } else if (hash === '#sub-terms') {
        setCurrentView('sub-terms');
        window.scrollTo(0, 0);
      } else if (hash === '#disclaimer') {
        setCurrentView('disclaimer');
        window.scrollTo(0, 0);
      } else if (hash === '' || hash === '#') {
        setCurrentView('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    localStorage.setItem('buzzCelebFollowedCategories', JSON.stringify(followedCategories));
  }, [followedCategories]);

  useEffect(() => {
    localStorage.setItem('buzzCelebBookmarks', JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  useEffect(() => {
    if (notificationPermission === 'granted') {
      const cleanup = simulateIncomingPush((title, body, category) => {
        sendNotification(title, { body });
        const newNotif: AppNotification = {
           id: Date.now().toString(),
           title: title,
           message: body,
           timestamp: new Date().toISOString(),
           isRead: false,
           type: title.includes('BREAKING') ? 'breaking' : 'alert'
        };
        setNotifications(prev => [newNotif, ...prev]);
      });
      return cleanup;
    }
  }, [notificationPermission, followedCategories]);

  useEffect(() => {
    const observer = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting && !isLoadingMore && currentView === 'home') {
                loadMoreArticles();
            }
        },
        { threshold: 0.1 }
    );

    if (loadingRef.current) {
        observer.observe(loadingRef.current);
    }

    return () => observer.disconnect();
  }, [isLoadingMore, currentView, articles]);

  const loadMoreArticles = () => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);

    setTimeout(() => {
        const newBatch = MOCK_ARTICLES.map((article, index) => ({
            ...article,
            id: `scroll-${Date.now()}-${index}`,
            title: article.title,
            publishedAt: new Date(Date.now() - 100000000 * (index + 20)).toISOString(),
            isBreaking: false
        }));
        
        const shuffled = newBatch.sort(() => 0.5 - Math.random()).slice(0, 6);
        setArticles(prev => [...prev, ...shuffled]);
        setIsLoadingMore(false);
    }, 1500);
  };
  
  const handleLogin = (user: User) => {
      setCurrentUser(user);
      localStorage.setItem('buzzCelebUser', JSON.stringify(user));
  };
  
  const handleLogout = () => {
      setCurrentUser(null);
      localStorage.removeItem('buzzCelebUser');
      setCurrentView('home');
      window.location.hash = '';
  };

  const handleUpgradeToPremium = () => {
      if (currentUser) {
          const updatedUser = { ...currentUser, isPremium: true };
          setCurrentUser(updatedUser);
          localStorage.setItem('buzzCelebUser', JSON.stringify(updatedUser));
          sendNotification("Welcome to Premium!", { body: "You are now an Insider+ member." });
      }
  };

  const toggleBookmark = (id: string) => {
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(bId => bId !== id) : [...prev, id]
    );
  };

  const toggleFollowCategory = (id: string) => {
    setFollowedCategories(prev => 
      prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
    );
    if (!followedCategories.includes(id) && notificationPermission === 'default') {
      setShowNotificationPrompt(true);
    }
  };

  const isBookmarked = (id: string) => bookmarkedIds.includes(id);

  const handleAllowNotifications = async () => {
    const granted = await requestNotificationPermission();
    setNotificationPermission(granted ? 'granted' : 'denied');
    setShowNotificationPrompt(false);
    if (granted) {
      sendNotification("Notifications Enabled", { body: "You'll now get breaking gossip alerts!" });
    }
  };

  const handleDenyNotifications = () => {
    setShowNotificationPrompt(false);
  };

  const handleSelectStation = (station: RadioStation) => {
    setCurrentStation(station);
    setIsRadioPlaying(true);
  };

  const handleToggleRadioPlay = () => {
    setIsRadioPlaying(!isRadioPlaying);
  };

  const handleCloseRadio = () => {
    setCurrentStation(null);
    setIsRadioPlaying(false);
  };

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
    setCurrentView('home');
    setActiveTab('All'); 
    window.location.hash = '';
    window.scrollTo(0, 0);
  };

  const filteredArticles = useMemo(() => {
    let filtered = articles;

    if (selectedTag) {
      filtered = filtered.filter(article => article.tags?.includes(selectedTag));
      return filtered;
    }

    if (activeSubTab) {
        return filtered.filter(article => article.subcategory === activeSubTab);
    }

    if (activeTab === 'All') return filtered;

    const activeNavItem = NAVIGATION_ITEMS.find(item => item.label === activeTab);
    const allowedCategories = new Set<string>();
    allowedCategories.add(activeTab);
    
    if (activeNavItem && activeNavItem.subItems) {
      activeNavItem.subItems.forEach(sub => allowedCategories.add(sub.label));
    }

    return filtered.filter(article => {
        if (activeTab === 'Wealth' && article.category === 'Wealth') return true;
        if (activeTab === 'Tech' && article.category === 'Tech') return true;
        
        if (allowedCategories.has(article.category)) return true;
        if (article.subcategory && allowedCategories.has(article.subcategory)) return true;
        if (article.category.toLowerCase().includes(activeTab.toLowerCase())) return true;
        return false;
    });
  }, [articles, activeTab, activeSubTab, selectedTag]);

  const featuredArticle = filteredArticles.length > 0 ? filteredArticles[0] : null;
  const mainFeed = filteredArticles.length > 0 ? filteredArticles.slice(1) : [];

  const handleGenerateContent = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const newArticles = await generateGossipArticles(gossipTopic);
      if (newArticles.length > 0) {
        setArticles(prev => [...newArticles, ...prev]);
        setGossipTopic('');
      } else {
        setError("AI is taking a coffee break. Try again in a moment.");
      }
    } catch (err) {
      setError("Failed to fetch fresh gossip.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAuthorClick = (authorName: string) => {
    const author = MOCK_AUTHORS.find(a => a.name === authorName);
    if (author) {
      setSelectedAuthor(author);
      setCurrentView('author');
      window.scrollTo(0, 0);
    } else {
      console.warn(`Author profile not found for: ${authorName}`);
    }
  };

  const handleSeriesClick = (seriesId: string) => {
    const series = MOCK_SERIES.find(s => s.id === seriesId);
    if (series) {
      setSelectedSeries(series);
      setCurrentView('series');
      window.scrollTo(0, 0);
    }
  }

  const handleBackToFeed = () => {
    setCurrentView('home');
    setSelectedAuthor(null);
    setSelectedSeries(null);
    setSelectedTag(null);
    window.location.hash = '';
    window.scrollTo(0, 0);
  };

  const handleOpenDashboard = () => {
    if (currentUser) {
        setCurrentView('dashboard');
        window.scrollTo(0, 0);
    } else {
        setIsAuthModalOpen(true);
    }
  };

  const handleClearNotifications = () => {
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const activeStory = viewingStoryId ? MOCK_STORIES.find(s => s.id === viewingStoryId) : null;
  
  const handleNextStory = () => {
    const currentIndex = MOCK_STORIES.findIndex(s => s.id === viewingStoryId);
    if (currentIndex < MOCK_STORIES.length - 1) {
      setViewingStoryId(MOCK_STORIES[currentIndex + 1].id);
    } else {
      setViewingStoryId(null);
    }
  };

  const handlePrevStory = () => {
    const currentIndex = MOCK_STORIES.findIndex(s => s.id === viewingStoryId);
    if (currentIndex > 0) {
      setViewingStoryId(MOCK_STORIES[currentIndex - 1].id);
    }
  };

  const activeNavItem = NAVIGATION_ITEMS.find(item => item.label === activeTab);

  const renderCurrentView = () => {
    if (currentView === 'verify') return <VerifyEmail />;
    if (currentView === 'privacy') return <PrivacyPolicy />;
    if (currentView === 'terms') return <TermsOfService />;
    if (currentView === 'about') return <AboutUs />;
    if (currentView === 'contact') return <ContactUs />;
    if (currentView === 'advertise') return <Advertise />;
    if (currentView === 'do-not-sell') return <DoNotSell />;
    if (currentView === 'sub-terms') return <SubscriptionTerms />;
    if (currentView === 'disclaimer') return <Disclaimer />;

    if (currentView === 'live') {
      return (
        <>
          <SeoHead 
            title="Live TV & Radio" 
            description="Watch 24/7 celebrity news streams and listen to global music stations live on BuzzCelebDaily."
            url={`${window.location.origin}/#live`}
          />
          <LiveView 
            onSelectStation={handleSelectStation}
            currentStation={currentStation}
            isPlaying={isRadioPlaying}
            onTogglePlay={handleToggleRadioPlay}
          />
        </>
      );
    }

    if (currentView === 'series' && selectedSeries) {
      return (
        <SeriesView 
          series={selectedSeries}
          articles={articles.filter(a => a.seriesId === selectedSeries.id)}
          onBack={handleBackToFeed}
          onAuthorClick={handleAuthorClick}
          isBookmarked={isBookmarked}
          onToggleBookmark={toggleBookmark}
          currentUser={currentUser}
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
          onTagClick={handleTagClick}
        />
      );
    }

    if (currentView === 'author' && selectedAuthor) {
      return (
        <AuthorProfile 
          author={selectedAuthor} 
          articles={articles.filter(a => a.author === selectedAuthor.name)} 
          onBack={handleBackToFeed}
          onAuthorClick={handleAuthorClick}
          isBookmarked={isBookmarked}
          onToggleBookmark={toggleBookmark}
          currentUser={currentUser}
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
          onTagClick={handleTagClick}
        />
      );
    }

    if (currentView === 'dashboard' && currentUser) {
       return (
           <UserDashboard 
             user={currentUser}
             bookmarkedArticles={articles.filter(a => bookmarkedIds.includes(a.id))}
             notifications={notifications}
             onLogout={handleLogout}
             onBack={handleBackToFeed}
             onAuthorClick={handleAuthorClick}
             onToggleBookmark={toggleBookmark}
             onTagClick={handleTagClick}
             onClearNotifications={handleClearNotifications}
             onUpgrade={() => setIsSubscriptionModalOpen(true)}
           />
       );
    }

    // Default Home View
    const displayArticles = selectedTag ? filteredArticles : (featuredArticle ? mainFeed : filteredArticles);

    // Dynamic SEO for Home
    const pageTitle = selectedTag ? `#${selectedTag} News` : activeTab !== 'All' ? `${activeTab} News` : 'The Source for Celebrity News';
    const pageDesc = `Latest ${activeTab} gossip, breaking news, and red carpet coverage. ${selectedTag ? `Explore posts about ${selectedTag}.` : ''}`;

    return (
      <>
        <SeoHead 
            title={pageTitle}
            description={pageDesc}
            schema={{
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "BuzzCelebDaily",
                "url": window.location.origin,
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": `${window.location.origin}/#search?q={search_term_string}`,
                    "query-input": "required name=search_term_string"
                }
            }}
        />

        <StoryRail stories={MOCK_STORIES} onStoryClick={setViewingStoryId} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {featuredArticle && !selectedTag && !activeSubTab && (
            <section aria-label="Featured Story" className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                <div className="lg:col-span-2 h-full">
                <ArticleCard 
                  article={featuredArticle} 
                  featured={true} 
                  onAuthorClick={handleAuthorClick}
                  isBookmarked={isBookmarked(featuredArticle.id)}
                  onToggleBookmark={toggleBookmark}
                  onSeriesClick={handleSeriesClick}
                  currentUser={currentUser}
                  onOpenAuthModal={() => setIsAuthModalOpen(true)}
                  onTagClick={handleTagClick}
                />
                </div>
                <div className="lg:col-span-1 flex flex-col gap-6">
                <div className="border-b border-gray-200 dark:border-gray-800 pb-2 mb-2 flex justify-between items-center">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 font-serif">Top Stories</h3>
                    <button className="text-xs text-brand-600 dark:text-brand-400 font-semibold uppercase hover:underline focus:outline-none focus:ring-2 focus:ring-brand-500 rounded">View All</button>
                </div>
                <div className="flex flex-col gap-6 overflow-y-auto max-h-[500px] pr-2 custom-scrollbar">
                    {mainFeed.slice(0, 3).map(article => (
                        <ArticleCard 
                          key={article.id} 
                          article={article} 
                          layout="horizontal" 
                          onAuthorClick={handleAuthorClick}
                          isBookmarked={isBookmarked(article.id)}
                          onToggleBookmark={toggleBookmark}
                          onSeriesClick={handleSeriesClick}
                          currentUser={currentUser}
                          onOpenAuthModal={() => setIsAuthModalOpen(true)}
                          onTagClick={handleTagClick}
                        />
                    ))}
                    {mainFeed.length === 0 && <p className="text-gray-500 italic text-sm">No more stories in this category.</p>}
                </div>
                </div>
            </section>
          )}

          <section aria-labelledby="ai-banner-title" className="mb-16 bg-gradient-to-r from-gray-900 via-brand-900 to-gray-900 rounded-2xl p-8 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-brand-300">
                    <Sparkles size={20} aria-hidden="true" />
                    <span className="text-sm font-bold uppercase tracking-wider">AI Powered Gossip</span>
                  </div>
                  <h2 id="ai-banner-title" className="text-3xl md:text-4xl font-serif font-bold mb-2">Need fresher tea?</h2>
                  <p className="text-gray-300 max-w-xl mb-4 md:mb-0">
                    Our AI insiders are scouring the digital world. Type a topic below to generate brand new, exclusive (and completely fictional) celebrity stories instantly.
                  </p>
                  {error && <p className="text-red-400 text-sm mt-2" role="alert">{error}</p>}
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-1 rounded-lg flex items-center w-full md:w-auto min-w-[320px] shadow-lg shrink-0">
                    <input 
                        type="text" 
                        value={gossipTopic}
                        onChange={(e) => setGossipTopic(e.target.value)}
                        placeholder="e.g. Taylor Swift, Royal Drama..."
                        className="bg-transparent border-none text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:ring-0 flex-1 px-4 py-2 text-sm md:text-base outline-none w-full"
                        onKeyDown={(e) => e.key === 'Enter' && handleGenerateContent()}
                        aria-label="Enter gossip topic"
                    />
                    <button 
                        onClick={handleGenerateContent}
                        disabled={isGenerating}
                        className="bg-brand-600 hover:bg-brand-700 text-white rounded-md p-2.5 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-brand-500"
                        title="Generate Stories"
                    >
                        {isGenerating ? <RefreshCw className="animate-spin" size={20} /> : <ArrowRight size={20} />}
                    </button>
                </div>
              </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            <div className="lg:col-span-8">
                <div className="flex flex-col mb-8 border-b border-gray-100 dark:border-gray-800 pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0 mb-4">
                    <div className="flex items-center gap-4">
                       <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-gray-100">Latest News</h2>
                       {selectedTag && (
                         <button 
                           onClick={() => setSelectedTag(null)}
                           className="flex items-center gap-1.5 bg-brand-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide hover:bg-brand-700 transition-colors"
                         >
                           #{selectedTag} <X size={14} />
                         </button>
                       )}
                    </div>
                    
                    <div role="tablist" aria-label="News Categories" className="flex flex-wrap gap-2">
                      {TABS.map(tab => (
                        <button 
                          key={tab}
                          role="tab"
                          aria-selected={activeTab === tab && !selectedTag}
                          aria-controls="news-feed-content"
                          id={`tab-${tab}`}
                          onClick={() => {
                            setActiveTab(tab);
                            setActiveSubTab(null);
                            setSelectedTag(null);
                          }}
                          className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dark:focus:ring-gray-100 ${
                            activeTab === tab && !selectedTag
                              ? 'bg-gray-900 text-white shadow-md dark:bg-gray-100 dark:text-gray-900' 
                              : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-900 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200'
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                  </div>

                  {activeNavItem?.subItems && (
                      <div className="flex flex-wrap gap-2 animate-in slide-in-from-top-1 duration-200">
                          {activeNavItem.subItems.map(sub => (
                              <button
                                  key={sub.label}
                                  onClick={() => setActiveSubTab(activeSubTab === sub.label ? null : sub.label)}
                                  className={`px-3 py-1 text-[10px] font-bold rounded-full border transition-colors ${
                                      activeSubTab === sub.label
                                      ? 'bg-brand-50 border-brand-200 text-brand-700 dark:bg-brand-900/30 dark:border-brand-800 dark:text-brand-400'
                                      : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                                  }`}
                              >
                                  {sub.label}
                              </button>
                          ))}
                      </div>
                  )}
                </div>

                <div id="news-feed-content" role="tabpanel" aria-labelledby={`tab-${activeTab}`} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                  {displayArticles.length > 0 ? (
                    displayArticles.map((article, index) => (
                        <React.Fragment key={article.id}>
                          <div className="col-span-1">
                            <ArticleCard 
                                article={article} 
                                onAuthorClick={handleAuthorClick}
                                isBookmarked={isBookmarked(article.id)}
                                onToggleBookmark={toggleBookmark}
                                onSeriesClick={handleSeriesClick}
                                currentUser={currentUser}
                                onOpenAuthModal={() => setIsAuthModalOpen(true)}
                                onTagClick={handleTagClick}
                            />
                          </div>
                          
                          {/* IN-FEED AD BANNER (Hide for Premium) */}
                          {(index + 1) % 4 === 0 && !currentUser?.isPremium && (
                            <div className="col-span-1 md:col-span-2 my-4">
                               <div className="w-full h-32 bg-gray-100 dark:bg-gray-800 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg flex items-center justify-center text-gray-400 dark:text-gray-500">
                                  <div className="text-center">
                                      <p className="text-xs font-bold uppercase tracking-widest mb-1">Advertisement</p>
                                      <p className="text-[10px]">Support our journalism</p>
                                  </div>
                               </div>
                            </div>
                          )}
                        </React.Fragment>
                    ))
                  ) : (
                    <div className="col-span-1 md:col-span-2 text-center py-12 bg-gray-50 dark:bg-gray-900 rounded-lg border border-dashed border-gray-200 dark:border-gray-800">
                        <p className="text-gray-500 dark:text-gray-400">
                            No articles found
                            {selectedTag ? ` for #${selectedTag}` : ''}
                            {activeSubTab ? ` in ${activeSubTab}` : ' in this category'}
                            . Try generating more!
                        </p>
                        {(selectedTag || activeSubTab) && (
                           <Button variant="outline" size="sm" onClick={() => { setSelectedTag(null); setActiveSubTab(null); }} className="mt-4">
                              Clear Filter
                           </Button>
                        )}
                    </div>
                  )}
                </div>
                
                {displayArticles.length > 0 && (
                    <div ref={loadingRef} className="mt-12 py-8 text-center flex flex-col items-center justify-center text-gray-400">
                        {isLoadingMore ? (
                             <>
                                <Loader2 className="animate-spin mb-2 text-brand-500" size={24} />
                                <span className="text-xs font-bold uppercase tracking-wide text-gray-500">Loading more gossip...</span>
                             </>
                        ) : (
                            <span className="text-xs opacity-50">Scroll for more</span>
                        )}
                    </div>
                )}
            </div>

            <aside className="lg:col-span-4 relative" aria-label="Sidebar">
              <div>
                <Sidebar 
                  onSeriesClick={handleSeriesClick} 
                  followedCategories={followedCategories}
                  onToggleFollowCategory={toggleFollowCategory}
                />
              </div>
            </aside>

          </div>
        </div>
      </>
    );
  };

  return (
      <>
        <SearchOverlay 
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          articles={articles}
          onAuthorClick={handleAuthorClick}
          isBookmarked={isBookmarked}
          onToggleBookmark={toggleBookmark}
          currentUser={currentUser}
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
          onTagClick={handleTagClick}
        />

        <NewsletterModal />
        
        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)} 
          onLogin={(user) => {
            handleLogin(user);
            setIsAuthModalOpen(false);
          }} 
        />

        <SubscriptionModal
            isOpen={isSubscriptionModalOpen}
            onClose={() => setIsSubscriptionModalOpen(false)}
            onUpgrade={handleUpgradeToPremium}
        />

        {currentStation && (
          <GlobalPlayer 
            station={currentStation} 
            isPlaying={isRadioPlaying} 
            onTogglePlay={handleToggleRadioPlay}
            onClose={handleCloseRadio}
          />
        )}

        <NotificationPrompt 
          isVisible={showNotificationPrompt} 
          onAllow={handleAllowNotifications} 
          onDeny={handleDenyNotifications} 
        />

        {viewingStoryId && activeStory && (
          <StoryViewer 
            story={activeStory} 
            onClose={() => setViewingStoryId(null)} 
            onNext={handleNextStory} 
            onPrev={handlePrevStory}
          />
        )}

        <Header 
          onOpenBookmarks={handleOpenDashboard}
          onSearchClick={() => setIsSearchOpen(true)}
          bookmarkCount={bookmarkedIds.length}
          currentUser={currentUser}
          onLoginClick={() => setIsAuthModalOpen(true)}
          onLogoutClick={handleLogout}
          unreadNotificationCount={notifications.filter(n => !n.isRead).length}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
        />
        
        <main className="min-h-screen pt-4">
          {renderCurrentView()}
        </main>

        <Footer />
      </>
  );
};
