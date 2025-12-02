
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  LogOut, 
  Radio, 
  Bot, 
  Workflow, 
  BarChart3, 
  Megaphone,
  PenTool,
  Mail,
  MessageSquare,
  Image,
  DollarSign,
  Search,
  Zap,
  Video,
  Bell,
  Sun,
  Moon,
  Link2
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const isActive = (path: string) => {
    return location.pathname === path 
      ? 'bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-400 border-r-4 border-brand-600' 
      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200';
  };

  const NavItem = ({ to, icon: Icon, label }: { to: string, icon: any, label: string }) => (
    <Link to={to} className={`flex items-center px-6 py-2.5 text-sm font-medium transition-colors ${isActive(to)}`}>
      <Icon size={18} className="mr-3" />
      {label}
    </Link>
  );

  return (
    <div className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col h-full shrink-0 overflow-y-auto custom-scrollbar transition-colors">
      <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-800 shrink-0 sticky top-0 bg-white dark:bg-gray-900 z-10">
        <span className="text-2xl font-black tracking-tighter text-brand-900 dark:text-brand-500">
          BUZZ<span className="text-brand-600 dark:text-brand-400">CMS</span>
        </span>
      </div>

      <nav className="flex-1 py-6 space-y-8">
        
        {/* Core */}
        <div className="space-y-1">
          <p className="px-6 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Core</p>
          <NavItem to="/" icon={LayoutDashboard} label="Dashboard" />
          <NavItem to="/analytics" icon={BarChart3} label="Analytics" />
        </div>

        {/* Content */}
        <div className="space-y-1">
          <p className="px-6 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Content</p>
          <NavItem to="/articles" icon={FileText} label="Articles" />
          <NavItem to="/editor/new" icon={PenTool} label="New Story" />
          <NavItem to="/media" icon={Image} label="Media Library" />
          <NavItem to="/video-manager" icon={Video} label="Video Manager (Veo)" />
          <NavItem to="/comments" icon={MessageSquare} label="Comments" />
          <NavItem to="/media-live" icon={Radio} label="Live Media" />
        </div>

        {/* Automation & AI */}
        <div className="space-y-1">
          <p className="px-6 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Growth</p>
          <NavItem to="/leads" icon={Zap} label="AI Lead Gen" />
          <NavItem to="/seo" icon={Search} label="SEO Engine" />
          <NavItem to="/backlinks" icon={Link2} label="Backlink Engine" />
          <NavItem to="/newsletter" icon={Mail} label="Newsletter" />
          <NavItem to="/notifications" icon={Bell} label="Push Notifications" />
          <NavItem to="/marketing" icon={DollarSign} label="Monetization" />
          <NavItem to="/automation" icon={Workflow} label="Workflows" />
          <NavItem to="/ai-tools" icon={Bot} label="AI Suite" />
        </div>

        {/* System */}
        <div className="space-y-1">
          <p className="px-6 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">System</p>
          <NavItem to="/users" icon={Users} label="Team & Users" />
          <NavItem to="/settings" icon={Settings} label="Settings" />
        </div>

      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-800 shrink-0 space-y-4">
        {/* Dark Mode Toggle */}
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <span className="flex items-center gap-2">
            {darkMode ? <Moon size={16} /> : <Sun size={16} />}
            {darkMode ? 'Dark Mode' : 'Light Mode'}
          </span>
        </button>

        <button className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors">
          <LogOut size={18} className="mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
