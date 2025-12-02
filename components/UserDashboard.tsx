
import React, { useState } from 'react';
import { User, Article, AppNotification } from '../types';
import ArticleCard from './ArticleCard';
import Button from './Button';
import { User as UserIcon, Bookmark, Bell, Settings, LogOut, ChevronLeft, CreditCard, Shield, Mail, CheckCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface UserDashboardProps {
  user: User;
  bookmarkedArticles: Article[];
  notifications: AppNotification[];
  onLogout: () => void;
  onBack: () => void;
  onAuthorClick: (name: string) => void;
  onToggleBookmark: (id: string) => void;
  onTagClick?: (tag: string) => void;
  onClearNotifications: () => void;
  onUpgrade?: () => void; // New prop for triggering upgrade modal
}

const UserDashboard: React.FC<UserDashboardProps> = ({ 
  user, 
  bookmarkedArticles, 
  notifications,
  onLogout,
  onBack,
  onAuthorClick,
  onToggleBookmark,
  onTagClick,
  onClearNotifications,
  onUpgrade
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'bookmarks' | 'notifications' | 'settings'>('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: UserIcon },
    { id: 'bookmarks', label: 'Saved Stories', icon: Bookmark },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: notifications.filter(n => !n.isRead).length },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-12 animate-in fade-in duration-300 transition-colors">
      
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <button onClick={onBack} className="p-2 -ml-2 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                   <ChevronLeft size={24} />
                </button>
                <h1 className="text-xl font-serif font-bold text-gray-900 dark:text-white">My Dashboard</h1>
              </div>
              <Button variant="outline" size="sm" onClick={onLogout} className="text-red-600 border-red-100 dark:border-red-900/30 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-200 dark:text-red-400">
                <LogOut size={16} className="mr-2" />
                Sign Out
              </Button>
           </div>
           
           {/* Tabs */}
           <div className="flex space-x-8 overflow-x-auto no-scrollbar">
             {tabs.map(tab => (
               <button
                 key={tab.id}
                 onClick={() => setActiveTab(tab.id as any)}
                 className={`flex items-center gap-2 py-4 border-b-2 text-sm font-medium whitespace-nowrap transition-colors ${
                    activeTab === tab.id 
                      ? 'border-brand-600 text-brand-600 dark:text-brand-400 dark:border-brand-400' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-700'
                 }`}
               >
                 <tab.icon size={18} />
                 {tab.label}
                 {tab.badge ? (
                   <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">{tab.badge}</span>
                 ) : null}
               </button>
             ))}
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="md:col-span-1">
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 text-center">
                   <div className="w-32 h-32 mx-auto rounded-full p-1 border-2 border-brand-100 dark:border-brand-900 mb-4 relative">
                      <img src={user.avatarUrl} alt={user.name} className="w-full h-full rounded-full object-cover" />
                      <div className="absolute bottom-2 right-2 bg-green-500 w-4 h-4 rounded-full border-2 border-white dark:border-gray-900"></div>
                   </div>
                   <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{user.name}</h2>
                   <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{user.email}</p>
                   <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${user.isPremium ? 'bg-purple-100 text-purple-700 border border-purple-200' : 'bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300'}`}>
                      {user.isPremium ? (
                          <>
                            <Shield size={12} fill="currentColor" />
                            Premium Insider
                          </>
                      ) : 'Free Member'}
                   </div>
                </div>
                
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 mt-6">
                   <h3 className="font-bold text-gray-900 dark:text-white mb-4">Community Stats</h3>
                   <div className="space-y-4">
                      <div className="flex justify-between items-center text-sm">
                         <span className="text-gray-500 dark:text-gray-400">Member Since</span>
                         <span className="font-medium dark:text-gray-200">March 2024</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                         <span className="text-gray-500 dark:text-gray-400">Comments Posted</span>
                         <span className="font-medium dark:text-gray-200">24</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                         <span className="text-gray-500 dark:text-gray-400">Articles Read</span>
                         <span className="font-medium dark:text-gray-200">142</span>
                      </div>
                   </div>
                </div>
             </div>
             
             <div className="md:col-span-2">
                {!user.isPremium ? (
                    <div className="bg-brand-900 dark:bg-gray-900 rounded-xl shadow-lg p-8 text-white mb-8 relative overflow-hidden border border-brand-800 dark:border-gray-700">
                       <div className="absolute top-0 right-0 -mr-8 -mt-8 w-48 h-48 bg-white opacity-5 rounded-full blur-3xl"></div>
                       <h3 className="text-2xl font-serif font-bold mb-2">Upgrade to Insider+</h3>
                       <p className="text-brand-100 mb-6 max-w-lg">Get ad-free browsing, exclusive scoops, and verified commenter status.</p>
                       <Button onClick={onUpgrade} variant="primary" className="bg-white text-brand-900 hover:bg-gray-100 font-bold border-none">
                          View Plans
                       </Button>
                    </div>
                ) : (
                    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-8 border border-purple-100 dark:border-purple-900/30 mb-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500 opacity-5 rounded-full blur-3xl"></div>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-purple-100 text-purple-600 rounded-full">
                                <Shield size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Insider+ Active</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Your premium benefits are enabled.</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                                <CheckCircle size={16} className="text-green-500" /> Ad-Free Experience
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                                <CheckCircle size={16} className="text-green-500" /> Verified Badge
                            </div>
                        </div>
                    </div>
                )}

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 divide-y divide-gray-50 dark:divide-gray-800">
                   {[1,2,3].map((_, i) => (
                      <div key={i} className="p-4 flex gap-4 items-start">
                         <div className="w-2 h-2 mt-2 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                         <div>
                            <p className="text-sm text-gray-900 dark:text-gray-200">You commented on <span className="font-bold">"The Royal Rift: Explained"</span></p>
                            <p className="text-xs text-gray-400 mt-1">{i * 2 + 1} hours ago</p>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          </div>
        )}

        {/* Bookmarks Tab */}
        {activeTab === 'bookmarks' && (
           <div>
              <div className="flex items-center justify-between mb-6">
                 <h2 className="text-xl font-bold text-gray-900 dark:text-white">Saved Stories ({bookmarkedArticles.length})</h2>
                 <div className="flex gap-2">
                   {/* Filter/Sort buttons could go here */}
                 </div>
              </div>
              
              {bookmarkedArticles.length > 0 ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bookmarkedArticles.map(article => (
                       <ArticleCard 
                          key={article.id}
                          article={article}
                          isBookmarked={true}
                          onToggleBookmark={onToggleBookmark}
                          onAuthorClick={onAuthorClick}
                          currentUser={user}
                          onTagClick={onTagClick}
                       />
                    ))}
                 </div>
              ) : (
                 <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-xl border border-dashed border-gray-200 dark:border-gray-800">
                    <Bookmark size={48} className="mx-auto text-gray-200 dark:text-gray-700 mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">You haven't saved any stories yet.</p>
                    <Button onClick={() => setActiveTab('profile')} variant="ghost" className="mt-4 text-brand-600 dark:text-brand-400">
                       Return to Profile
                    </Button>
                 </div>
              )}
           </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
           <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                 <h2 className="text-xl font-bold text-gray-900 dark:text-white">Notifications</h2>
                 {notifications.length > 0 && (
                    <button 
                       onClick={onClearNotifications} 
                       className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline"
                    >
                       Mark all as read
                    </button>
                 )}
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
                 {notifications.length > 0 ? (
                    <div className="divide-y divide-gray-50 dark:divide-gray-800">
                       {notifications.map((notif) => (
                          <div key={notif.id} className={`p-4 flex gap-4 ${!notif.isRead ? 'bg-blue-50/50 dark:bg-blue-900/10' : 'hover:bg-gray-50 dark:hover:bg-gray-800'} transition-colors`}>
                             <div className={`mt-1 p-2 rounded-full shrink-0 ${
                                notif.type === 'breaking' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' : 
                                notif.type === 'system' ? 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400' : 'bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400'
                             }`}>
                                <Bell size={16} />
                             </div>
                             <div className="flex-1">
                                <div className="flex justify-between items-start">
                                   <h4 className={`text-sm ${!notif.isRead ? 'font-bold text-gray-900 dark:text-gray-100' : 'font-medium text-gray-700 dark:text-gray-300'}`}>
                                      {notif.title}
                                   </h4>
                                   <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2">
                                      {formatDistanceToNow(new Date(notif.timestamp))} ago
                                   </span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{notif.message}</p>
                             </div>
                             {!notif.isRead && (
                                <div className="mt-2 w-2 h-2 bg-blue-500 rounded-full shrink-0"></div>
                             )}
                          </div>
                       ))}
                    </div>
                 ) : (
                    <div className="p-12 text-center text-gray-500">
                       <Bell size={32} className="mx-auto text-gray-200 dark:text-gray-700 mb-3" />
                       <p>You're all caught up!</p>
                    </div>
                 )}
              </div>
           </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
           <div className="max-w-2xl mx-auto">
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden divide-y divide-gray-100 dark:divide-gray-800">
                 
                 <div className="p-6">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                       <Mail size={18} /> Email Preferences
                    </h3>
                    <div className="space-y-4">
                       <label className="flex items-center justify-between cursor-pointer">
                          <span className="text-sm text-gray-700 dark:text-gray-300">Daily Digest</span>
                          <input type="checkbox" defaultChecked className="toggle-checkbox" />
                       </label>
                       <label className="flex items-center justify-between cursor-pointer">
                          <span className="text-sm text-gray-700 dark:text-gray-300">Breaking News Alerts</span>
                          <input type="checkbox" defaultChecked className="toggle-checkbox" />
                       </label>
                       <label className="flex items-center justify-between cursor-pointer">
                          <span className="text-sm text-gray-700 dark:text-gray-300">Partner Offers</span>
                          <input type="checkbox" className="toggle-checkbox" />
                       </label>
                    </div>
                 </div>

                 <div className="p-6">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                       <Shield size={18} /> Privacy
                    </h3>
                    <div className="space-y-4">
                       <label className="flex items-center justify-between cursor-pointer">
                          <span className="text-sm text-gray-700 dark:text-gray-300">Public Profile</span>
                          <input type="checkbox" defaultChecked className="toggle-checkbox" />
                       </label>
                       <label className="flex items-center justify-between cursor-pointer">
                          <span className="text-sm text-gray-700 dark:text-gray-300">Show Activity Status</span>
                          <input type="checkbox" defaultChecked className="toggle-checkbox" />
                       </label>
                    </div>
                 </div>
                 
                 <div className="p-6">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                       <CreditCard size={18} /> Subscription
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        You are currently on the <span className={`font-bold ${user.isPremium ? 'text-purple-600' : 'text-gray-900 dark:text-white'}`}>
                            {user.isPremium ? 'Insider+ Plan' : 'Free Plan'}
                        </span>.
                    </p>
                    <Button onClick={onUpgrade} variant="outline" size="sm" className="dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-800">
                        {user.isPremium ? 'Manage Billing' : 'Upgrade Plan'}
                    </Button>
                 </div>

              </div>
              
              <div className="mt-8 text-center">
                 <button className="text-xs text-red-500 hover:underline">Delete Account</button>
              </div>
           </div>
        )}

      </div>
    </div>
  );
};

export default UserDashboard;
