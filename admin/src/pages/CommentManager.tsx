
import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, ThumbsDown, Trash2, Check, ShieldAlert, Search } from 'lucide-react';

const mockComments = [
  { id: 1, user: 'GossipGirl99', avatar: 'https://i.pravatar.cc/150?u=1', text: 'This is the best article ever! Totally agree.', article: 'Taylor Swift Eras Tour', date: '2m ago', status: 'pending' },
  { id: 2, user: 'CryptoBot_X', avatar: 'https://i.pravatar.cc/150?u=2', text: 'Buy BTC now! Guaranteed 1000% returns link in bio.', article: 'Market Crash Update', date: '15m ago', status: 'spam' },
  { id: 3, user: 'RoyalFan', avatar: 'https://i.pravatar.cc/150?u=3', text: 'I think the dress was awful honestly.', article: 'Met Gala Highlights', date: '1h ago', status: 'pending' },
  { id: 4, user: 'Hater123', avatar: 'https://i.pravatar.cc/150?u=4', text: 'You guys are fake news. Unsubscribing.', article: 'Tech Feud', date: '3h ago', status: 'flagged' },
];

const CommentManager = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [comments, setComments] = useState(mockComments);

  const handleAction = (id: number, action: 'approve' | 'delete' | 'spam') => {
    setComments(prev => prev.filter(c => c.id !== id));
    // In real app, call API
  };

  const filteredComments = comments.filter(c => {
    if (activeTab === 'pending') return c.status === 'pending' || c.status === 'flagged';
    if (activeTab === 'spam') return c.status === 'spam';
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <MessageSquare className="text-brand-600" /> Comments
          </h1>
          <p className="text-gray-500 text-sm">Moderate community discussions.</p>
        </div>
        <div className="flex bg-white rounded-lg p-1 border border-gray-200 shadow-sm">
          <button onClick={() => setActiveTab('pending')} className={`px-4 py-2 rounded-md text-sm font-bold ${activeTab === 'pending' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:text-gray-900'}`}>Pending</button>
          <button onClick={() => setActiveTab('approved')} className={`px-4 py-2 rounded-md text-sm font-bold ${activeTab === 'approved' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:text-gray-900'}`}>Approved</button>
          <button onClick={() => setActiveTab('spam')} className={`px-4 py-2 rounded-md text-sm font-bold ${activeTab === 'spam' ? 'bg-red-600 text-white' : 'text-gray-500 hover:text-gray-900'}`}>Spam ({comments.filter(c => c.status === 'spam').length})</button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
           <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input type="text" placeholder="Search comments or users..." className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm" />
           </div>
        </div>

        <div className="divide-y divide-gray-100">
           {filteredComments.length > 0 ? (
             filteredComments.map(comment => (
                <div key={comment.id} className="p-6 hover:bg-gray-50 transition-colors flex gap-4">
                   <img src={comment.avatar} alt={comment.user} className="w-10 h-10 rounded-full bg-gray-200" />
                   <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                         <div>
                            <span className="font-bold text-gray-900 text-sm">{comment.user}</span>
                            <span className="text-xs text-gray-500 ml-2">on {comment.article}</span>
                         </div>
                         <span className="text-xs text-gray-400">{comment.date}</span>
                      </div>
                      <p className="text-sm text-gray-800 bg-gray-50 p-3 rounded-lg border border-gray-100 mb-3">
                         {comment.text}
                      </p>
                      
                      <div className="flex gap-2">
                         <button 
                           onClick={() => handleAction(comment.id, 'approve')}
                           className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-xs font-bold hover:bg-green-100 transition-colors"
                         >
                            <Check size={14} /> Approve
                         </button>
                         <button 
                           onClick={() => handleAction(comment.id, 'delete')}
                           className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-xs font-bold hover:bg-gray-200 transition-colors"
                         >
                            <Trash2 size={14} /> Delete
                         </button>
                         <button 
                           onClick={() => handleAction(comment.id, 'spam')}
                           className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 rounded-lg text-xs font-bold hover:bg-red-100 transition-colors ml-auto"
                         >
                            <ShieldAlert size={14} /> Mark Spam
                         </button>
                      </div>
                   </div>
                </div>
             ))
           ) : (
             <div className="p-12 text-center text-gray-500">
                <Check size={48} className="mx-auto text-green-200 mb-4" />
                <p>All caught up! No comments to moderate.</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default CommentManager;
