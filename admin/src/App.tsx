
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import DashboardHome from './pages/DashboardHome';
import ArticleManager from './pages/ArticleManager';
import UserManager from './pages/UserManager';
import Login from './pages/Login';
import Register from './pages/Register';
import ArticleEditor from './pages/ArticleEditor';
import AITools from './pages/AITools';
import Automation from './pages/Automation';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import NewsletterManager from './pages/NewsletterManager';
import MarketingManager from './pages/MarketingManager';
import CommentManager from './pages/CommentManager';
import MediaManager from './pages/MediaManager';
import SeoManager from './pages/SeoManager';
import LeadGenerator from './pages/LeadGenerator';
import LeadDetail from './pages/LeadDetail';
import VideoManager from './pages/VideoManager';
import NotificationManager from './pages/NotificationManager';
import BacklinkManager from './pages/BacklinkManager';

interface ProtectedRouteProps {
  isAuthenticated: boolean;
}

const ProtectedRoute = ({ children, isAuthenticated }: React.PropsWithChildren<ProtectedRouteProps>) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <div className="flex h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden transition-colors">
    <Sidebar />
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-950 p-6 scroll-smooth text-gray-900 dark:text-gray-100">
      {children}
    </main>
  </div>;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check storage on mount
  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('adminAuth', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register onLogin={handleLogin} />} />

        {/* Protected Routes */}
        <Route path="/" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}><DashboardHome /></ProtectedRoute>
        } />
        <Route path="/articles" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}><ArticleManager /></ProtectedRoute>
        } />
        <Route path="/editor/new" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}><ArticleEditor /></ProtectedRoute>
        } />
        <Route path="/editor/:id" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}><ArticleEditor /></ProtectedRoute>
        } />
        <Route path="/users" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}><UserManager /></ProtectedRoute>
        } />
        <Route path="/ai-tools" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}><AITools /></ProtectedRoute>
        } />
        <Route path="/automation" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}><Automation /></ProtectedRoute>
        } />
        <Route path="/newsletter" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}><NewsletterManager /></ProtectedRoute>
        } />
        <Route path="/marketing" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}><MarketingManager /></ProtectedRoute>
        } />
        <Route path="/comments" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}><CommentManager /></ProtectedRoute>
        } />
        <Route path="/media" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}><MediaManager /></ProtectedRoute>
        } />
        <Route path="/video-manager" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}><VideoManager /></ProtectedRoute>
        } />
        <Route path="/notifications" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}><NotificationManager /></ProtectedRoute>
        } />
        <Route path="/seo" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}><SeoManager /></ProtectedRoute>
        } />
        
        {/* Lead Generation Routes */}
        <Route path="/leads" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}><LeadGenerator /></ProtectedRoute>
        } />
        <Route path="/leads/:id" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}><LeadDetail /></ProtectedRoute>
        } />
        
        <Route path="/backlinks" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}><BacklinkManager /></ProtectedRoute>
        } />

        <Route path="/analytics" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}><Analytics /></ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}><Settings /></ProtectedRoute>
        } />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
