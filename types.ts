
export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  subcategory?: string;
  author: string;
  publishedAt: string;
  imageUrl: string;
  isBreaking?: boolean;
  readTime: string;
  seriesId?: string;
  aiPoll?: Poll;
  tags?: string[];
  affiliateProducts?: AffiliateProduct[];
}

export enum Category {
  ENTERTAINMENT = 'Entertainment',
  MOVIES = 'Movies',
  MUSIC = 'Music',
  ROYALS = 'Royals',
  REALITY_TV = 'Reality TV',
  FASHION = 'Fashion',
  SOCIAL = 'Social',
  CELEBRITY = 'Celebrity',
  LIFESTYLE = 'Lifestyle',
  GOSSIP = 'Gossip',
  RELATIONSHIPS = 'Relationships',
  TRAVEL = 'Travel',
  WELLNESS = 'Wellness',
  MONEY = 'Wealth',
  REAL_ESTATE = 'Real Estate',
  TECH = 'Tech',
  SPORTS = 'Sports',
  // Auto merged into Tech for cleaner top-nav
}

export interface Series {
  id: string;
  title: string;
  description: string;
  coverUrl: string;
  articleCount: number;
}

export interface Author {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatarUrl: string;
  articlesCount: number;
  social: {
    twitter?: string;
    instagram?: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  isPremium?: boolean;
  followedCategories?: string[];
  notificationsEnabled?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
  subItems?: { label: string; href: string }[];
}

export interface TrendingTopic {
  id: string;
  rank: number;
  topic: string;
  volume: string;
  trend?: 'up' | 'down' | 'same';
  category?: string;
}

export interface TrendingCategory {
  id: string;
  name: string;
  count: string;
  subcategories?: string[];
  type: 'news' | 'trends';
}

export interface PollOption {
  id: string;
  label: string;
  votes: number;
  articleId?: string;
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  totalVotes: number;
}

export interface Story {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  imageUrl: string;
  videoUrl?: string;
  mediaType: 'image' | 'video';
  caption: string;
  timestamp: string;
  isSeen?: boolean;
  linkUrl?: string;
  linkText?: string;
}

export interface Sighting {
  id: string;
  celebName: string;
  locationName: string;
  coordinates: { x: number; y: number }; // Percentage for the mock map
  timestamp: string;
  description: string;
}

export interface RadioStation {
  id: string;
  name: string;
  genre: string;
  language: string;
  streamUrl: string; // Using sample MP3s for demo reliability
  logoColor: string;
}

export interface TVChannel {
  name: string;
  category: string;
  logo: string;
  description: string;
  stream: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  type: 'breaking' | 'alert' | 'system';
}

export interface AffiliateProduct {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  link: string;
  brand: string;
}

export interface SponsoredContent {
  id: string;
  title: string;
  imageUrl: string;
  advertiser: string;
  url: string;
}

export interface FashionBattle {
  id: string;
  title: string;
  contender1: { name: string; imageUrl: string; votes: number };
  contender2: { name: string; imageUrl: string; votes: number };
  totalVotes: number;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: 'Award' | 'Release' | 'Event';
}
