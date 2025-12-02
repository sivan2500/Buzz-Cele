
import React, { useEffect, useState } from 'react';
import { Search, Plus, Edit2, Trash2, Eye, Filter, Bot, Video, Loader2, Copy, TrendingUp, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const ArticleManager = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Advanced Filters State
  const [showFilters, setShowFilters] = useState(false);
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterAuthor, setFilterAuthor] = useState('All');
  const [filterAI, setFilterAI] = useState(false);
  const [filterVideo, setFilterVideo] = useState(false);
  const [filterHighTraffic, setFilterHighTraffic] = useState(false);

  // Fetch from backend
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch('/api/articles');
        const data = await res.json();
        if (data.articles) {
            // Add mock fields for demonstration if missing from backend schema yet
            const enriched = data.articles.map((a: any) => ({
                ...a,
                status: a.status || 'Published',
                views: a.views || Math.floor(Math.random() * 50000),
                isAI: a.title.includes('AI') || Math.random() > 0.7,
                hasVideo: Math.random() > 0.8
            }));
            setArticles(enriched);
        }
      } catch (error) {
        console.error("Failed to fetch articles", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const handleClone = async (articleId: string) => {
      const originalArticle = articles.find(a => a._id === articleId);
      if (!originalArticle) return;

      const clonedArticle = {
          ...originalArticle,
          _id: `temp-${Date.now()}`, 
          title: `${originalArticle.title} (Copy)`,
          status: 'Draft',
          createdAt: new Date().toISOString()
      };

      setArticles([clonedArticle, ...articles]);
  };

  // Unique Authors for Dropdown
  const authors = ['All', ...Array.from(new Set(articles.map(a => a.author || a.authorName))).filter(Boolean) as string[]];
  const categories = ['All', ...Array.from(new Set(articles.map(a => a.category))).filter(Boolean) as string[]];

  const filteredArticles = articles.filter(article => {
    // Text Search
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (article.authorName || article.author || '').toLowerCase().includes(searchTerm.toLowerCase());

    // Category Filter
    const matchesCategory = filterCategory === 'All' || article.category === filterCategory;

    // Status Filter
    const matchesStatus = filterStatus === 'All' || article.status === filterStatus;

    // Author Filter
    const matchesAuthor = filterAuthor === 'All' || (article.author || article.authorName) === filterAuthor;

    // AI Filter
    const matchesAI = !filterAI || article.isAI;

    // Video Filter
    const matchesVideo = !filterVideo || article.hasVideo;

    // High Traffic Filter (> 10k views)
    const matchesTraffic = !filterHighTraffic || article.views > 10000;

    return matchesSearch && matchesCategory && matchesStatus && matchesAuthor && matchesAI && matchesVideo && matchesTraffic;
  });

  const clearFilters = () => {
      setFilterCategory('All');
      setFilterStatus('All');
      setFilterAuthor('All');
      setFilterAI(false);
      setFilterVideo(false);
      setFilterHighTraffic(false);
      setSearchTerm('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
           <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Article Manager</h1>
           <p className="text-gray-500 dark:text-gray-400 text-sm">Manage, edit, and publish content.</p>
        </div>
        <Link to="/editor/new" className="flex items-center justify-center gap-2 bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition-colors shadow-sm font-bold">
          <Plus size={18} />
          Create New
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        
        {/* Main Toolbar */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex flex-col md:flex-row items-center gap-4 bg-white dark:bg-gray-800 relative z-20">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search articles..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
            />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${showFilters ? 'bg-brand-50 border-brand-200 text-brand-700 dark:bg-brand-900/20 dark:border-brand-800 dark:text-brand-400' : 'border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'}`}
          >
             <Filter size={16} /> Advanced Filters
          </button>
        </div>

        {/* Collapsible Filter Panel */}
        {showFilters && (
            <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 grid grid-cols-1 md:grid-cols-4 gap-4 animate-in slide-in-from-top-2 duration-200">
                <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Category</label>
                    <select 
                        value={filterCategory} 
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="w-full p-2 text-sm border border-gray-200 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
                    >
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Status</label>
                    <select 
                        value={filterStatus} 
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="w-full p-2 text-sm border border-gray-200 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
                    >
                        <option value="All">All Statuses</option>
                        <option value="Published">Published</option>
                        <option value="Draft">Draft</option>
                        <option value="Scheduled">Scheduled</option>
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Writer</label>
                    <select 
                        value={filterAuthor} 
                        onChange={(e) => setFilterAuthor(e.target.value)}
                        className="w-full p-2 text-sm border border-gray-200 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
                    >
                        {authors.map(a => <option key={a} value={a}>{a}</option>)}
                    </select>
                </div>
                <div className="flex flex-col justify-end">
                    <button onClick={clearFilters} className="text-xs text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1 self-end mb-2">
                        <X size={12} /> Clear All
                    </button>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => setFilterAI(!filterAI)}
                            className={`flex-1 py-1.5 px-2 rounded text-xs font-bold border transition-colors flex items-center justify-center gap-1 ${filterAI ? 'bg-purple-100 border-purple-200 text-purple-700' : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300'}`}
                        >
                            <Bot size={12} /> AI Gen
                        </button>
                        <button 
                            onClick={() => setFilterVideo(!filterVideo)}
                            className={`flex-1 py-1.5 px-2 rounded text-xs font-bold border transition-colors flex items-center justify-center gap-1 ${filterVideo ? 'bg-blue-100 border-blue-200 text-blue-700' : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300'}`}
                        >
                            <Video size={12} /> Video
                        </button>
                        <button 
                            onClick={() => setFilterHighTraffic(!filterHighTraffic)}
                            className={`flex-1 py-1.5 px-2 rounded text-xs font-bold border transition-colors flex items-center justify-center gap-1 ${filterHighTraffic ? 'bg-green-100 border-green-200 text-green-700' : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300'}`}
                        >
                            <TrendingUp size={12} /> Viral
                        </button>
                    </div>
                </div>
            </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 text-xs uppercase font-semibold">
              <tr>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Attributes</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Views</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {loading ? (
                 <tr>
                    <td colSpan={6} className="text-center py-12 text-gray-500">
                       <Loader2 className="animate-spin mx-auto mb-2" size={24} />
                       Loading articles...
                    </td>
                 </tr>
              ) : filteredArticles.length > 0 ? (
                filteredArticles.map((article) => (
                    <tr key={article._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                    <td className="px-6 py-4 max-w-xs">
                        <p className="font-medium text-gray-900 dark:text-white line-clamp-1" title={article.title}>{article.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">by {article.author || article.authorName}</p>
                    </td>
                    <td className="px-6 py-4">
                        <div className="flex gap-1.5">
                            {article.isAI && <span title="AI Generated" className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 p-1 rounded-md"><Bot size={14} /></span>}
                            {article.hasVideo && <span title="Video Attached" className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-1 rounded-md"><Video size={14} /></span>}
                            {article.views > 10000 && <span title="High Traffic" className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 p-1 rounded-md"><TrendingUp size={14} /></span>}
                        </div>
                    </td>
                    <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                        {article.category}
                        </span>
                    </td>
                    <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            article.status === 'Published' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                            article.status === 'Draft' ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' :
                            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                        }`}>
                            {article.status}
                        </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 font-mono">
                        {article.views.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                        <button className="p-1.5 text-gray-400 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-900/20 rounded transition-colors" title="View"><Eye size={18} /></button>
                        <button 
                            onClick={() => handleClone(article._id)}
                            className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded transition-colors"
                            title="Clone Article"
                        >
                            <Copy size={18} />
                        </button>
                        <Link to={`/editor/${article._id}`} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors" title="Edit"><Edit2 size={18} /></Link>
                        <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors" title="Delete"><Trash2 size={18} /></button>
                        </div>
                    </td>
                    </tr>
                ))
              ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/50">
                        <div className="flex flex-col items-center">
                            <Search size={32} className="mb-2 opacity-50" />
                            <p>No articles match your filters.</p>
                            <button onClick={clearFilters} className="text-brand-600 dark:text-brand-400 text-xs font-bold mt-2 hover:underline">Clear all filters</button>
                        </div>
                    </td>
                  </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ArticleManager;
    