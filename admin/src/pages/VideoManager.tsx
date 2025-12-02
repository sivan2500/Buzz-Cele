
import React, { useState, useEffect } from 'react';
import { Video, Music, Type, RefreshCw, Play, Save, Download, Share2, FileText } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const VideoManager = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>('v1');
  const [overlayText, setOverlayText] = useState('Breaking News: Zendaya Stuns at Met Gala');
  const [bgMusic, setBgMusic] = useState('upbeat-pop');
  const [isProcessing, setIsProcessing] = useState(false);
  const [sourceArticleId, setSourceArticleId] = useState('');
  const [script, setScript] = useState('');
  
  const location = useLocation();

  useEffect(() => {
      if (location.state?.importedScript) {
          setScript(location.state.importedScript);
          setSourceArticleId('custom'); // Indicate custom script
      }
  }, [location]);

  const handleRegenerate = () => {
    setIsProcessing(true);
    setTimeout(() => setIsProcessing(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Video className="text-purple-600" /> Video Manager (Veo)
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Regenerate and edit AI videos.</p>
        </div>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 font-bold shadow-sm flex items-center gap-2">
           <RefreshCw size={18} /> Bulk Regenerate
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Editor Panel */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
           <div className="aspect-video bg-black relative group">
              <video 
                src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" 
                className="w-full h-full object-cover opacity-80"
                controls
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <h2 className="text-3xl font-black text-white text-center uppercase drop-shadow-lg px-8">
                    {overlayText}
                 </h2>
              </div>
           </div>
           
           <div className="p-6 space-y-6">
              
              {/* Article Source Selection */}
              <div>
                 <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                    <FileText size={16} /> Source Article / Script
                 </label>
                 <select 
                    value={sourceArticleId}
                    onChange={(e) => setSourceArticleId(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none mb-4"
                 >
                    <option value="">Select an article to regenerate from...</option>
                    <option value="custom">Custom / Imported Script</option>
                    <option value="1">The Midnight Gala: Who Wore What</option>
                    <option value="2">Pop Icon Teases New Album</option>
                    <option value="3">Royal Protocol Broken?</option>
                 </select>
                 
                 <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1 uppercase">Video Script Prompt</label>
                 <textarea 
                    value={script}
                    onChange={(e) => setScript(e.target.value)}
                    placeholder="Enter visual scene descriptions and voiceover text here..."
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none h-32 text-sm font-mono"
                 />
              </div>

              <div>
                 <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                    <Type size={16} /> Text Overlay
                 </label>
                 <input 
                   type="text" 
                   value={overlayText}
                   onChange={(e) => setOverlayText(e.target.value)}
                   className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                 />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                       <Music size={16} /> Background Music
                    </label>
                    <select 
                      value={bgMusic}
                      onChange={(e) => setBgMusic(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                    >
                       <option value="upbeat-pop">Upbeat Pop (Trending)</option>
                       <option value="dramatic-news">Dramatic News Intro</option>
                       <option value="lofi-chill">Lofi Chill</option>
                       <option value="electronic">Electronic Pulse</option>
                    </select>
                 </div>
                 
                 <div className="flex items-end">
                    <button 
                      onClick={handleRegenerate}
                      disabled={isProcessing}
                      className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                       {isProcessing ? <RefreshCw className="animate-spin" /> : <RefreshCw />}
                       {isProcessing ? 'Rendering...' : 'Regenerate Video'}
                    </button>
                 </div>
              </div>
           </div>
        </div>

        {/* Library & Actions */}
        <div className="space-y-6">
           <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Export Options</h3>
              <div className="space-y-3">
                 <button className="w-full flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-200">
                    <span className="flex items-center gap-2"><Share2 size={16} /> YouTube Shorts</span>
                    <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded">Auto-Upload</span>
                 </button>
                 <button className="w-full flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-200">
                    <span className="flex items-center gap-2"><Share2 size={16} /> TikTok</span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">Draft</span>
                 </button>
                 <button className="w-full flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-200">
                    <span className="flex items-center gap-2"><Download size={16} /> Download MP4</span>
                    <span className="text-xs text-gray-400">1080p</span>
                 </button>
              </div>
           </div>

           <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm h-full max-h-[400px] overflow-y-auto custom-scrollbar">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Recent Generations</h3>
              <div className="space-y-4">
                 {[1, 2, 3, 4].map(i => (
                    <div key={i} className="flex gap-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors">
                       <div className="w-20 h-12 bg-gray-200 dark:bg-gray-600 rounded overflow-hidden shrink-0 relative">
                          <img src={`https://picsum.photos/200/120?random=${i}`} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                             <Play size={12} className="text-white fill-white" />
                          </div>
                       </div>
                       <div>
                          <p className="text-sm font-bold text-gray-800 dark:text-gray-200 line-clamp-1">Viral Fashion Moments #{i}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{i} hours ago • Ready</p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default VideoManager;
