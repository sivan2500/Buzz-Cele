import React, { useState, useEffect } from 'react';
import { Menu, X, Search, Bell, ChevronDown, Bookmark, User as UserIcon, LogOut, LayoutDashboard, Sun, Moon } from 'lucide-react';
import { NAVIGATION_ITEMS } from '../constants';
import Button from './Button';
import { User } from '../types';

interface HeaderProps {
  onOpenBookmarks?: () => void;
  onSearchClick?: () => void;
  bookmarkCount?: number;
  currentUser: User | null;
  onLoginClick: () => void;
  onLogoutClick: () => void;
  unreadNotificationCount?: number;
  isDarkMode?: boolean;
  toggleTheme?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  onOpenBookmarks, 
  onSearchClick, 
  bookmarkCount = 0,
  currentUser,
  onLoginClick,
  onLogoutClick,
  unreadNotificationCount = 0,
  isDarkMode = false,
  toggleTheme
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger sticky state after scrolling down 50px
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 bg-white/95 dark:bg-gray-950/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 transition-all duration-300 ease-in-out ${
        isScrolled ? 'shadow-md' : 'shadow-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className={`flex justify-between items-center transition-all duration-300 ease-in-out ${
            isScrolled ? 'h-14 md:h-16' : 'h-16 md:h-20'
          }`}
        >
          
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline-none p-2 focus:ring-2 focus:ring-brand-500 rounded-md"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center justify-center flex-1 md:flex-none md:justify-start">
            <a href="/" className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-brand-500 rounded p-1">
              <span className={`font-serif font-black tracking-tighter text-brand-900 dark:text-brand-500 transition-all duration-300 ${
                isScrolled ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl'
              }`}>
                BUZZ<span className="text-brand-600 dark:text-brand-400">CELEB</span>
              </span>
            </a>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2 lg:gap-6" aria-label="Main Navigation">
            {NAVIGATION_ITEMS.map((link) => (
              <div 
                key={link.label}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a 
                  href={link.href}
                  className={`flex items-center gap-0.5 lg:gap-1 text-xs lg:text-sm font-bold uppercase tracking-wide py-2 px-1 lg:px-2 focus:outline-none whitespace-nowrap transition-colors ${
                      link.label === 'LIVE' 
                      ? 'text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400' 
                      : 'text-gray-700 hover:text-brand-600 focus:text-brand-600 dark:text-gray-300 dark:hover:text-brand-400 dark:focus:text-brand-400'
                  }`}
                  aria-haspopup={link.subItems ? "true" : undefined}
                  aria-expanded={activeDropdown === link.label}
                >
                  {link.label}
                  {link.label === 'LIVE' && (
                    <span className="ml-1 relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                  )}
                  {link.subItems && <ChevronDown size={12} className="lg:w-3.5 lg:h-3.5" aria-hidden="true" />}
                </a>

                {/* Dropdown */}
                {link.subItems && activeDropdown === link.label && (
                   <div 
                     className="absolute top-[90%] left-0 w-48 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-xl rounded-b-md py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-200"
                     role="menu"
                     aria-label={`${link.label} submenu`}
                   >
                      <div className={`absolute top-0 left-0 w-full h-1 ${link.label === 'LIVE' ? 'bg-red-500' : 'bg-brand-500'}`}></div>
                      {link.subItems.map(sub => (
                        <a 
                            key={sub.label} 
                            href={sub.href}
                            className="block px-4 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors focus:bg-gray-50 focus:outline-none"
                            role="menuitem"
                        >
                            {sub.label}
                        </a>
                      ))}
                   </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-1 md:gap-2">
             <button 
               onClick={onSearchClick}
               className="p-2 text-gray-500 hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-400 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 rounded-full" 
               aria-label="Search"
             >
               <Search size={20} className="w-5 h-5" aria-hidden="true" />
             </button>

             {/* Dark Mode Toggle */}
             {toggleTheme && (
                <button
                    onClick={toggleTheme}
                    className="p-2 text-gray-500 hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-400 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 rounded-full"
                    aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                >
                    {isDarkMode ? (
                        <Sun size={20} className="w-5 h-5" aria-hidden="true" />
                    ) : (
                        <Moon size={20} className="w-5 h-5" aria-hidden="true" />
                    )}
                </button>
             )}
             
             {/* Bookmarks Button - VISIBLE ONLY TO LOGGED IN USERS */}
             {currentUser && (
               <button 
                  onClick={onOpenBookmarks}
                  className="p-2 text-gray-500 hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-400 transition-colors relative focus:outline-none focus:ring-2 focus:ring-brand-500 rounded-full group" 
                  aria-label="View Bookmarks"
               >
                 <Bookmark size={20} className="w-5 h-5" aria-hidden="true" />
                 {bookmarkCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-500 rounded-full border border-white dark:border-gray-900"></span>
                 )}
               </button>
             )}

             {/* Notifications Button - VISIBLE ONLY TO LOGGED IN USERS */}
             {currentUser && (
               <button 
                 onClick={onOpenBookmarks} // Reusing dashboard link
                 className="p-2 text-gray-500 hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-400 transition-colors relative hidden sm:block focus:outline-none focus:ring-2 focus:ring-brand-500 rounded-full" 
                 aria-label="Notifications"
               >
                 <Bell size={20} className="w-5 h-5" aria-hidden="true" />
                 {unreadNotificationCount > 0 && (
                    <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-gray-900"></span>
                 )}
               </button>
             )}

             {/* User Menu or Sign In */}
             <div className="hidden sm:block relative ml-2">
               {currentUser ? (
                 <div className="relative">
                   <button 
                     onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                     className="flex items-center gap-2 focus:outline-none rounded-full ring-2 ring-transparent focus:ring-brand-500 relative"
                   >
                     <img 
                       src={currentUser.avatarUrl} 
                       alt={currentUser.name} 
                       className="w-8 h-8 md:w-9 md:h-9 rounded-full object-cover border border-gray-200 dark:border-gray-700"
                     />
                     {unreadNotificationCount > 0 && (
                       <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-white dark:border-gray-900 rounded-full"></span>
                     )}
                   </button>
                   
                   {isUserMenuOpen && (
                     <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-lg shadow-xl py-1 z-50 animate-in fade-in zoom-in-95 duration-200">
                        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                          <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{currentUser.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{currentUser.email}</p>
                        </div>
                        <button onClick={() => { onOpenBookmarks && onOpenBookmarks(); setIsUserMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                          Dashboard
                        </button>
                        <button onClick={() => { onOpenBookmarks && onOpenBookmarks(); setIsUserMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                          My Profile
                        </button>
                        <div className="border-t border-gray-100 dark:border-gray-800 mt-1">
                          <button 
                            onClick={() => {
                              onLogoutClick();
                              setIsUserMenuOpen(false);
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                          >
                            Sign out
                          </button>
                        </div>
                     </div>
                   )}

                   {/* Close menu when clicking outside - simple overlay */}
                   {isUserMenuOpen && (
                     <div 
                       className="fixed inset-0 z-40" 
                       onClick={() => setIsUserMenuOpen(false)} 
                       aria-hidden="true"
                     ></div>
                   )}
                 </div>
               ) : (
                 <Button 
                   variant="primary" 
                   size={isScrolled ? 'sm' : 'md'}
                   onClick={onLoginClick}
                   className="whitespace-nowrap"
                 >
                   Sign In
                 </Button>
               )}
             </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div id="mobile-menu" className="md:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 max-h-[80vh] overflow-y-auto shadow-xl">
          <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3" aria-label="Mobile Navigation">
             {NAVIGATION_ITEMS.map((link) => (
              <div key={link.label}>
                <a 
                  href={link.href}
                  className={`block px-3 py-2 rounded-md text-base font-bold uppercase focus:outline-none ${
                    link.label === 'LIVE' 
                      ? 'text-red-600 hover:bg-red-50 dark:text-red-500 dark:hover:bg-red-900/20' 
                      : 'text-gray-800 hover:text-brand-600 hover:bg-gray-50 dark:text-gray-200 dark:hover:text-brand-400 dark:hover:bg-gray-800'
                  }`}
                >
                  {link.label}
                  {link.label === 'LIVE' && <span className="ml-2 inline-block w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>}
                </a>
                {link.subItems && (
                  <div className="pl-6 space-y-1 bg-gray-50/50 dark:bg-gray-800/50 pb-2">
                    {link.subItems.map(sub => (
                       <a 
                          key={sub.label}
                          href={sub.href}
                          className="block px-3 py-2 text-sm font-medium text-gray-500 hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-400 focus:outline-none focus:text-brand-600"
                       >
                         {sub.label}
                       </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
             <div className="pt-4 px-3 border-t border-gray-100 dark:border-gray-800 mt-2">
                <button 
                  onClick={() => {
                    if(onSearchClick) onSearchClick();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-md text-base font-bold text-gray-800 dark:text-gray-200 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-gray-50 dark:hover:bg-gray-800 uppercase mb-2"
               >
                 <Search size={20} />
                 Search
               </button>
               
               {/* Saved Stories - VISIBLE ONLY TO LOGGED IN USERS */}
               {currentUser && (
                 <button 
                    onClick={() => {
                      if(onOpenBookmarks) onOpenBookmarks();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-md text-base font-bold text-gray-800 dark:text-gray-200 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-gray-50 dark:hover:bg-gray-800 uppercase mb-2"
                 >
                   <Bookmark size={20} />
                   Dashboard ({bookmarkCount})
                 </button>
               )}

               {currentUser ? (
                  <div className="mt-4 border-t border-gray-100 dark:border-gray-800 pt-4">
                     <div className="flex items-center gap-3 px-3 mb-3">
                        <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700" />
                        <div>
                           <p className="font-bold text-gray-900 dark:text-white">{currentUser.name}</p>
                           <p className="text-xs text-gray-500 dark:text-gray-400">{currentUser.email}</p>
                        </div>
                     </div>
                     <button 
                       onClick={() => {
                         if(onOpenBookmarks) onOpenBookmarks();
                         setIsMenuOpen(false);
                       }}
                       className="flex items-center gap-2 w-full px-3 py-2 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 rounded"
                     >
                       <LayoutDashboard size={18} />
                       My Dashboard
                     </button>
                     <button 
                       onClick={() => {
                         onLogoutClick();
                         setIsMenuOpen(false);
                       }}
                       className="flex items-center gap-2 w-full px-3 py-2 text-red-600 font-medium hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                     >
                       <LogOut size={18} />
                       Sign Out
                     </button>
                  </div>
               ) : (
                  <Button 
                    variant="primary" 
                    className="w-full justify-center mt-2"
                    onClick={() => {
                      onLoginClick();
                      setIsMenuOpen(false);
                    }}
                  >
                    Sign In / Register
                  </Button>
               )}
             </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;