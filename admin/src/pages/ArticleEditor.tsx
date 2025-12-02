
import React, { useState } from 'react';
import { Save, Send, Bot, Clock, ChevronLeft, Image as ImageIcon, Video, MessageSquare, History, CheckCircle, AlertCircle, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

const WORKFLOW_STAGES = [
  { id: 'draft', label: 'Draft' },
  { id: 'ai-gen', label: 'AI-Generated' },
  { id: 'review', label: 'In Review' },
  { id: 'revision', label: 'Revisions' },
  { id: 'scheduled', label: 'Scheduled' },
  { id: 'published', label: 'Published' },
  { id: 'archived', label: 'Archived' },
];

const WorkflowStep = ({ label, active, completed }: { label: string, active?: boolean, completed?: boolean }) => (
    <div className={`flex flex-col items-center gap-1 min-w-[80px] ${active ? 'text-brand-600 font-bold' : completed ? 'text-green-600' : 'text-gray-400'}`}>
        <div className={`w-3 h-3 rounded-full z-10 ${active ? 'bg-brand-600 ring-4 ring-brand-100' : completed ? 'bg-green-600' : 'bg-gray-300'}`} />
        <span className="text-[10px] uppercase tracking-wide text-center">{label}</span>
    </div>
);

const ArticleEditor = () => {
  const [activeSidebar, setActiveSidebar] = useState<'feedback' | 'history'>('feedback');
  const [currentStage, setCurrentStage] = useState('draft');

  // Mock History Data
  const history = [
    { id: 1, user: 'Elena Fisher', action: 'Edited content', time: '10 mins ago' },
    { id: 2, user: 'AI Bot', action: 'Generated draft', time: '1 hour ago' },
    { id: 3, user: 'Admin', action: 'Created file', time: '2 hours ago' },
  ];

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
      
      {/* Top Bar */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-3 flex justify-between items-center shrink-0">
         <div className="flex items-center gap-4">
            <Link to="/articles" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
               <ChevronLeft size={20} />
            </Link>
            <div>
               <h1 className="text-lg font-bold text-gray-900 dark:text-white">New Article</h1>
               <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <Clock size={12} /> Last saved: 2 mins ago
                  </span>
               </div>
            </div>
         </div>

         <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors">
               <Bot size={16} /> AI Assistant
            </button>
            <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-2"></div>
            <button className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg transition-colors flex items-center gap-2">
               <Save size={16} /> Save Draft
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 rounded-lg shadow-sm transition-colors flex items-center gap-2">
               <Send size={16} /> Update Status
            </button>
         </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
         {/* Main Editor */}
         <div className="flex-1 overflow-y-auto p-8 max-w-5xl mx-auto w-full">
            
            {/* Workflow Viz */}
            <div className="mb-10 relative">
               <div className="absolute top-[5px] left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-700 -z-0"></div>
               <div className="flex justify-between items-start relative z-10">
                  {WORKFLOW_STAGES.map((stage, idx) => {
                      const isActive = stage.id === currentStage;
                      const isCompleted = WORKFLOW_STAGES.findIndex(s => s.id === currentStage) > idx;
                      return (
                          <div key={stage.id} onClick={() => setCurrentStage(stage.id)} className="cursor-pointer">
                              <WorkflowStep label={stage.label} active={isActive} completed={isCompleted} />
                          </div>
                      );
                  })}
               </div>
            </div>

            <div className="space-y-6">
                {/* Title */}
                <input 
                   type="text" 
                   placeholder="Enter a catchy headline..." 
                   className="w-full text-4xl font-black text-gray-900 dark:text-white placeholder-gray-300 dark:placeholder-gray-600 border-none focus:ring-0 bg-transparent p-0"
                />

                {/* Meta Controls */}
                <div className="flex flex-wrap gap-4">
                   <select className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-sm rounded-md px-3 py-1.5 focus:ring-2 focus:ring-brand-500 focus:outline-none">
                      <option>Select Category</option>
                      <option>Celebrity</option>
                      <option>Fashion</option>
                      <option>Tech</option>
                   </select>
                   <button className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3 py-1.5 rounded-md transition-colors">
                      <ImageIcon size={16} /> Add Featured Image
                   </button>
                   <button className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3 py-1.5 rounded-md transition-colors">
                      <Video size={16} /> Generate Veo Video
                   </button>
                </div>

                {/* Content Area */}
                <textarea 
                   placeholder="Start writing your story..." 
                   className="w-full h-[600px] resize-none border-none focus:ring-0 text-lg text-gray-700 dark:text-gray-300 leading-relaxed bg-transparent p-0"
                />
            </div>
         </div>

         {/* Sidebar / Feedback / History */}
         <div className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col shrink-0">
            <div className="flex border-b border-gray-200 dark:border-gray-700">
               <button 
                 onClick={() => setActiveSidebar('feedback')}
                 className={`flex-1 py-3 text-sm font-bold text-center ${activeSidebar === 'feedback' ? 'text-brand-600 border-b-2 border-brand-600' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
               >
                 <span className="flex items-center justify-center gap-2"><MessageSquare size={16} /> Feedback</span>
               </button>
               <button 
                 onClick={() => setActiveSidebar('history')}
                 className={`flex-1 py-3 text-sm font-bold text-center ${activeSidebar === 'history' ? 'text-brand-600 border-b-2 border-brand-600' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
               >
                 <span className="flex items-center justify-center gap-2"><History size={16} /> History</span>
               </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 dark:bg-gray-900/50">
               {activeSidebar === 'feedback' ? (
                 <>
                   <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-800 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                         <div className="w-5 h-5 rounded-full bg-yellow-200 dark:bg-yellow-800 flex items-center justify-center text-[10px] font-bold text-yellow-800 dark:text-yellow-200">ED</div>
                         <span className="text-xs font-bold text-gray-900 dark:text-gray-100">Chief Editor</span>
                         <span className="text-[10px] text-gray-400 ml-auto">2h ago</span>
                      </div>
                      <p className="text-xs text-gray-700 dark:text-gray-300">Great hook! But the second paragraph needs more verified sources. Can we check the timeline?</p>
                   </div>

                   <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                         <Bot size={16} className="text-blue-500" />
                         <span className="text-xs font-bold text-gray-900 dark:text-gray-100">AI SEO Bot</span>
                      </div>
                      <p className="text-xs text-gray-700 dark:text-gray-300">Keyword density for "Royal Protocol" is low. Suggest adding it 2 more times.</p>
                      <button className="mt-2 text-[10px] bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-700 text-blue-600 dark:text-blue-400 px-2 py-1 rounded hover:bg-blue-50 dark:hover:bg-gray-700">Auto-Fix</button>
                   </div>
                 </>
               ) : (
                 <div className="space-y-4">
                    {history.map((item) => (
                       <div key={item.id} className="flex gap-3">
                          <div className="flex flex-col items-center">
                             <div className="w-2 h-2 rounded-full bg-gray-400 mt-1.5"></div>
                             <div className="w-px h-full bg-gray-200 dark:bg-gray-700 my-1"></div>
                          </div>
                          <div className="pb-4">
                             <p className="text-xs font-bold text-gray-900 dark:text-white">{item.action}</p>
                             <p className="text-[10px] text-gray-500 mb-1">by {item.user} • {item.time}</p>
                             <button className="text-[10px] flex items-center gap-1 text-brand-600 dark:text-brand-400 hover:underline">
                                <RotateCcw size={10} /> Restore
                             </button>
                          </div>
                       </div>
                    ))}
                 </div>
               )}
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
               <textarea 
                  placeholder={activeSidebar === 'feedback' ? "Add a comment..." : "Describe changes..."}
                  className="w-full border border-gray-200 dark:border-gray-600 rounded-md p-2 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none dark:bg-gray-700 dark:text-white"
                  rows={3}
               />
               <button className="w-full mt-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-bold py-2 rounded hover:bg-black dark:hover:bg-gray-200 transition-colors">
                  {activeSidebar === 'feedback' ? "Post Comment" : "Save Version"}
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default ArticleEditor;
