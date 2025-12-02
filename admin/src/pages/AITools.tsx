
import React, { useState } from 'react';
import { Bot, RefreshCw, Type, Image, FileText, Wand2, Search, Link as LinkIcon, FileSearch, Video, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ToolCard = ({ icon: Icon, title, desc, active, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`p-4 rounded-xl border text-left transition-all h-full ${
      active 
        ? 'bg-brand-50 dark:bg-brand-900/20 border-brand-500 ring-1 ring-brand-500' 
        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-brand-200 dark:hover:border-gray-600 hover:shadow-sm'
    }`}
  >
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${active ? 'bg-brand-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300'}`}>
      <Icon size={20} />
    </div>
    <h3 className={`font-bold text-sm mb-1 ${active ? 'text-brand-900 dark:text-brand-100' : 'text-gray-900 dark:text-white'}`}>{title}</h3>
    <p className="text-xs text-gray-500 dark:text-gray-400">{desc}</p>
  </button>
);

const AITools = () => {
  const [activeTool, setActiveTool] = useState('rewrite');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('');
  const navigate = useNavigate();

  const handleGenerate = () => {
    setLoading(true);
    // Simulate AI delay and logic
    setTimeout(() => {
        let response = "AI Output...";
        
        if (activeTool === 'rewrite') {
            response = "UPDATED: " + input + "\n\n(Rewritten in BuzzCelebDaily style with enhanced engagement hooks.)";
        } else if (activeTool === 'summary') {
            response = "Short, punchy summary perfect for meta descriptions and social shares based on your input.";
        } else if (activeTool === 'keywords') {
            response = "Keywords: #Celebrity #Viral #News #Trending #Hollywood #Exclusive";
        } else if (activeTool === 'links') {
            response = "Suggested Internal Links:\n- /article/related-story (Relevance: 90%)\n- /category/fashion (Relevance: 85%)";
        } else if (activeTool === 'title') {
            response = "1. 10 Shocking Moments You Missed!\n2. You Won't Believe What Just Happened\n3. EXCLUSIVE: The Truth Revealed";
        } else if (activeTool === 'thumb') {
            response = "[Image Generation Prompt Created]: High resolution, cinematic lighting, red carpet event background, celebrity focus.";
        } else if (activeTool === 'script') {
            response = `**VIDEO SCRIPT: ${input.substring(0, 20)}...**\n\n` +
            `**SCENE 1 (0:00-0:05)**\n` +
            `VISUAL: Fast-paced montage of the subject. Camera flashes popping.\n` +
            `AUDIO (Voiceover): "Stop scrolling! You need to see this immediately." (Upbeat, urgent tone)\n\n` +
            `**SCENE 2 (0:05-0:12)**\n` +
            `VISUAL: Split screen comparing the current look/event with a past reference.\n` +
            `AUDIO (Voiceover): "Sources are confirming the rumors are true, and the internet is losing it."\n\n` +
            `**SCENE 3 (0:12-0:15)**\n` +
            `VISUAL: Final reaction shot or BuzzCeleb logo sting.\n` +
            `AUDIO (Voiceover): "Stay tuned for more updates."`;
        }
        
        setOutput(response);
        setLoading(false);
    }, 1500);
  };

  const handleSendToVeo = () => {
      navigate('/video-manager', { state: { importedScript: output } });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Bot className="text-brand-600" /> AI Creator Suite
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Powerful generative tools to speed up your workflow.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
        <ToolCard 
          icon={RefreshCw} 
          title="Content Rewriter" 
          desc="Rewrite URLs/text to news style." 
          active={activeTool === 'rewrite'}
          onClick={() => setActiveTool('rewrite')}
        />
        <ToolCard 
          icon={Type} 
          title="Viral Title Gen" 
          desc="Click-worthy headlines instantly." 
          active={activeTool === 'title'}
          onClick={() => setActiveTool('title')}
        />
        <ToolCard 
          icon={FileSearch} 
          title="Summary Generator" 
          desc="Create concise snippets for SEO." 
          active={activeTool === 'summary'}
          onClick={() => setActiveTool('summary')}
        />
        <ToolCard 
          icon={Search} 
          title="Keyword Extractor" 
          desc="Pull high-value SEO tags." 
          active={activeTool === 'keywords'}
          onClick={() => setActiveTool('keywords')}
        />
        <ToolCard 
          icon={LinkIcon} 
          title="Internal Linker" 
          desc="Suggest cross-links for SEO." 
          active={activeTool === 'links'}
          onClick={() => setActiveTool('links')}
        />
        <ToolCard 
          icon={Image} 
          title="Thumbnail Magic" 
          desc="Generate celeb style images." 
          active={activeTool === 'thumb'}
          onClick={() => setActiveTool('thumb')}
        />
        <ToolCard 
          icon={FileText} 
          title="Video Script Builder" 
          desc="Article to Veo video script." 
          active={activeTool === 'script'}
          onClick={() => setActiveTool('script')}
        />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex flex-col md:flex-row gap-6 min-h-[500px]">
         <div className="flex-1 flex flex-col gap-4">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Input</label>
            <textarea 
              className="flex-1 w-full border border-gray-200 dark:border-gray-600 rounded-lg p-4 focus:ring-2 focus:ring-brand-500 focus:outline-none resize-none bg-gray-50 dark:bg-gray-700 dark:text-white"
              placeholder={activeTool === 'rewrite' ? "Paste a URL or text to rewrite..." : activeTool === 'script' ? "Paste article content to convert to script..." : "Describe what you need..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button 
              onClick={handleGenerate}
              disabled={loading || !input}
              className="w-full py-3 bg-brand-600 text-white rounded-lg font-bold hover:bg-brand-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                 <>Generating...</>
              ) : (
                 <><Wand2 size={18} /> Generate Output</>
              )}
            </button>
         </div>

         <div className="w-px bg-gray-100 dark:bg-gray-700 hidden md:block"></div>

         <div className="flex-1 flex flex-col gap-4">
            <div className="flex justify-between items-center">
               <label className="text-sm font-bold text-gray-700 dark:text-gray-300">AI Result</label>
               <button className="text-xs text-brand-600 dark:text-brand-400 hover:underline" onClick={() => navigator.clipboard.writeText(output)}>Copy</button>
            </div>
            <div className="flex-1 w-full border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-white dark:bg-gray-800 relative flex flex-col">
               {output ? (
                 <>
                    <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap flex-1 overflow-y-auto">{output}</p>
                    
                    {/* Send to Veo Button - Only for Script Tool */}
                    {activeTool === 'script' && (
                        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                            <button 
                                onClick={handleSendToVeo}
                                className="w-full py-2 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
                            >
                                <Video size={16} /> Send to Veo Studio <ArrowRight size={16} />
                            </button>
                        </div>
                    )}
                 </>
               ) : (
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 opacity-50">
                    <Bot size={48} className="mb-2" />
                    <p className="text-sm">Ready to generate</p>
                 </div>
               )}
            </div>
         </div>
      </div>
    </div>
  );
};

export default AITools;
