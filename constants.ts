
import { Article, Category, TrendingTopic, NavItem, TrendingCategory, Poll, Author, Series, Story, Sighting, RadioStation, TVChannel, AffiliateProduct, SponsoredContent, FashionBattle, CalendarEvent } from './types';

export const SITE_NAME = "BuzzCelebDaily";

export const NAVIGATION_ITEMS: NavItem[] = [
  {
    label: 'LIVE',
    href: '#live',
    subItems: [
      { label: 'Live TV', href: '#live-tv' },
      { label: 'Live Radio', href: '#live-radio' }
    ]
  },
  {
    label: 'Entertainment',
    href: '#entertainment',
    subItems: [
      { label: 'Movies', href: '#movies' },
      { label: 'TV Shows', href: '#tv' },
      { label: 'Music', href: '#music' },
      { label: 'Awards Season', href: '#awards' },
      { label: 'Reality TV', href: '#reality-tv' }
    ]
  },
  {
    label: 'Sports',
    href: '#sports',
    subItems: [
        { label: 'NBA', href: '#nba' },
        { label: 'NFL', href: '#nfl' },
        { label: 'F1', href: '#f1' },
        { label: 'Tennis', href: '#tennis' },
        { label: 'WAGs', href: '#wags' }, // Wives and Girlfriends, fits gossip theme
    ]
  },
  {
    label: 'Celebrity',
    href: '#celebrity',
    subItems: [
      { label: 'Gossip', href: '#gossip' },
      { label: 'Relationships', href: '#relationships' },
      { label: 'Interviews', href: '#interviews' },
      { label: 'Paparazzi', href: '#paparazzi' },
    ]
  },
  {
    label: 'Wealth', // Condensed from Money & Power
    href: '#wealth',
    subItems: [
      { label: 'Net Worth', href: '#net-worth' },
      { label: 'Real Estate', href: '#real-estate' },
      { label: 'Business', href: '#business' },
      { label: 'Legal', href: '#legal' },
    ]
  },
  {
    label: 'Tech', // Condensed from Tech & Auto
    href: '#tech',
    subItems: [
      { label: 'Luxury Cars', href: '#cars' },
      { label: 'Investments', href: '#tech-inv' },
      { label: 'Gaming', href: '#gaming' },
      { label: 'Crypto', href: '#crypto' },
    ]
  },
  {
    label: 'Lifestyle',
    href: '#lifestyle',
    subItems: [
      { label: 'Fashion', href: '#fashion' },
      { label: 'Beauty', href: '#beauty' },
      { label: 'Wellness', href: '#wellness' },
      { label: 'Travel', href: '#travel' },
    ]
  },
  {
    label: 'Social',
    href: '#social',
    subItems: [
      { label: 'TikTok Trends', href: '#tiktok' },
      { label: 'Viral Moments', href: '#viral' },
      { label: 'Influencers', href: '#influencers' },
    ]
  },
  {
    label: 'Royals',
    href: '#royals',
    subItems: [
        { label: 'British Royals', href: '#british-royals'},
        { label: 'International', href: '#int-royals'}
    ]
  }
];

export const MOCK_AUTHORS: Author[] = [
  {
    id: 'auth1',
    name: "Elena Fisher",
    role: "Senior Fashion Editor",
    bio: "Elena has covered every major red carpet since 2010. She lives for haute couture and lives in Milan during Fashion Week.",
    avatarUrl: "https://picsum.photos/id/64/200/200",
    articlesCount: 142,
    social: { twitter: "@elenafisher", instagram: "@elenastyle" }
  },
  {
    id: 'auth2',
    name: "Marc Johnson",
    role: "Music Correspondent",
    bio: "From backstage passes to tour bus confessions, Marc knows the beat of the industry better than anyone.",
    avatarUrl: "https://picsum.photos/id/91/200/200",
    articlesCount: 89,
    social: { twitter: "@marcmusic" }
  },
  {
    id: 'auth3',
    name: "Sarah Jenkins",
    role: "Chief Royal Watcher",
    bio: "Sarah has sources inside Buckingham Palace and isn't afraid to use them. The definitive voice on all things Windsor.",
    avatarUrl: "https://picsum.photos/id/832/200/200",
    articlesCount: 215,
    social: { twitter: "@royal_sarah", instagram: "@sarah.royals" }
  },
  {
    id: 'auth4',
    name: "David Chen",
    role: "Film Critic",
    bio: "David watches 500 movies a year so you don't have to. Brutally honest and always entertaining.",
    avatarUrl: "https://picsum.photos/id/237/200/200",
    articlesCount: 104,
    social: { twitter: "@chencinema" }
  },
  {
    id: 'auth5',
    name: "Jessica Williams",
    role: "Reality TV Expert",
    bio: "If it happened on Bravo or E!, Jessica is already tweeting about it. She speaks fluent reality drama.",
    avatarUrl: "https://picsum.photos/id/338/200/200",
    articlesCount: 312,
    social: { instagram: "@jess_realitycheck" }
  },
  {
    id: 'auth6',
    name: "Amanda Cole",
    role: "Wellness Guru",
    bio: "Testing the weirdest celebrity health trends so you know which ones actually work.",
    avatarUrl: "https://picsum.photos/id/447/200/200",
    articlesCount: 56,
    social: { instagram: "@amandawellness" }
  },
  {
    id: 'auth7',
    name: "Ryan Lee",
    role: "Social Media Analyst",
    bio: "Ryan decodes the algorithms and spots viral trends before they hit your For You Page.",
    avatarUrl: "https://picsum.photos/id/551/200/200",
    articlesCount: 128,
    social: { twitter: "@ryanlee_trends" }
  },
  {
    id: 'auth8',
    name: "Marcus Sterling",
    role: "Wealth & Luxury",
    bio: "Tracking the billionaires, the mansions, and the deals. If it costs more than your house, Marcus is writing about it.",
    avatarUrl: "https://picsum.photos/id/305/200/200",
    articlesCount: 74,
    social: { twitter: "@sterlinggold" }
  }
];

export const MOCK_SERIES: Series[] = [
  {
    id: 'series1',
    title: "The Royal Rift Diaries",
    description: "An exclusive deep dive into the tensions shaking the monarchy, featuring insider reports and historical context.",
    coverUrl: "https://picsum.photos/id/1040/800/400",
    articleCount: 3
  },
  {
    id: 'series2',
    title: "Fashion Week Front Row",
    description: "Your all-access pass to the most exclusive runways, and after-parties, and street style moments of the season.",
    coverUrl: "https://picsum.photos/id/326/800/400",
    articleCount: 5
  },
  {
    id: 'series3',
    title: "Billionaire Bunkers",
    description: "Inside the most secure and luxurious celebrity homes. See where the elite hide away from the world.",
    coverUrl: "https://picsum.photos/id/122/800/400",
    articleCount: 4
  }
];

export const MOCK_AFFILIATE_PRODUCTS: AffiliateProduct[] = [
  { id: 'aff1', name: 'Sequined Gown Dupe', price: '$89.00', brand: 'Nordstrom', imageUrl: 'https://picsum.photos/150/200?random=201', link: '#' },
  { id: 'aff2', name: 'Luxury Red Lipstick', price: '$35.00', brand: 'Sephora', imageUrl: 'https://picsum.photos/150/200?random=202', link: '#' },
  { id: 'aff3', name: 'Diamond Tennis Bracelet', price: '$125.00', brand: 'Mejuri', imageUrl: 'https://picsum.photos/150/200?random=203', link: '#' },
  { id: 'aff4', name: 'Designer Clutch Rental', price: '$50/mo', brand: 'Rent the Runway', imageUrl: 'https://picsum.photos/150/200?random=204', link: '#' },
];

export const MOCK_SPONSORED_CONTENT: SponsoredContent[] = [
  { id: 'sp1', title: "10 Stars Who Aged Backwards Without Surgery", advertiser: "BeautySecrets", imageUrl: "https://picsum.photos/300/200?random=301", url: "#" },
  { id: 'sp2', title: "This $5 Kitchen Gadget Went Viral on TikTok", advertiser: "HomeHacks", imageUrl: "https://picsum.photos/300/200?random=302", url: "#" },
  { id: 'sp3', title: "Forget Ozempic, Try This Natural Tea", advertiser: "WellnessDaily", imageUrl: "https://picsum.photos/300/200?random=303", url: "#" },
  { id: 'sp4', title: "Hailey Bieber's Skincare Routine Leaked", advertiser: "GlowUp", imageUrl: "https://picsum.photos/300/200?random=304", url: "#" },
];

export const CURRENT_FASHION_BATTLE: FashionBattle = {
  id: 'fb1',
  title: "Who Wore It Better?",
  contender1: { name: "Zendaya", imageUrl: "https://picsum.photos/200/300?random=401", votes: 1250 },
  contender2: { name: "Gigi Hadid", imageUrl: "https://picsum.photos/200/300?random=402", votes: 980 },
  totalVotes: 2230
};

export const UPCOMING_EVENTS: CalendarEvent[] = [
  { id: 'evt1', title: "The Met Gala", date: "May 5, 2025", type: 'Event' },
  { id: 'evt2', title: "Taylor Swift Album Drop", date: "May 9, 2025", type: 'Release' },
  { id: 'evt3', title: "Cannes Film Festival", date: "May 13, 2025", type: 'Event' },
  { id: 'evt4', title: "The Oscars", date: "Mar 10, 2026", type: 'Award' },
];

export const MOCK_ARTICLES: Article[] = [
  {
    id: '1',
    title: "The Midnight Gala: Who Wore What on the Red Carpet",
    excerpt: "From shimmering sequins to bold avant-garde statements, here is the definitive ranking of last night's best dressed stars.",
    category: Category.LIFESTYLE,
    subcategory: 'Fashion',
    author: "Elena Fisher",
    publishedAt: new Date().toISOString(),
    imageUrl: "https://picsum.photos/800/600?random=1",
    isBreaking: true,
    readTime: "5 min read",
    seriesId: 'series2',
    tags: ['Red Carpet', 'Best Dressed', 'Gala'],
    affiliateProducts: MOCK_AFFILIATE_PRODUCTS
  },
  {
    id: '2',
    title: "Pop Icon Teases New Album Dropping Next Friday",
    excerpt: "After a three-year hiatus, the chart-topping sensation posted a cryptic image that has fans analyzing every pixel.",
    category: Category.MUSIC, 
    subcategory: 'Music',
    author: "Marc Johnson",
    publishedAt: new Date(Date.now() - 3600000).toISOString(), 
    imageUrl: "https://picsum.photos/800/600?random=2",
    readTime: "3 min read",
    tags: ['New Album', 'Teaser', 'Comeback']
  },
  {
    id: '3',
    title: "Royal Protocol Broken? The Handshake That Shocked the World",
    excerpt: "Sources close to the palace say tensions are high following the unexpected departure from tradition during the garden party.",
    category: Category.ROYALS,
    subcategory: 'British Royals',
    author: "Sarah Jenkins",
    publishedAt: new Date(Date.now() - 7200000).toISOString(),
    imageUrl: "https://picsum.photos/800/600?random=3",
    readTime: "8 min read",
    seriesId: 'series1',
    tags: ['Royal Family', 'Protocol', 'Scandal']
  },
  {
    id: '4',
    title: "Summer Blockbuster Review: Is It Worth the Hype?",
    excerpt: "Action-packed sequences meet lackluster dialogue in this year's most anticipated superhero flick.",
    category: Category.MOVIES,
    subcategory: 'Movies',
    author: "David Chen",
    publishedAt: new Date(Date.now() - 18000000).toISOString(),
    imageUrl: "https://picsum.photos/800/600?random=4",
    readTime: "4 min read",
    tags: ['Review', 'Blockbuster', 'Cinema']
  },
  {
    id: '5',
    title: "Reality Star Launches Unexpected Tech Startup",
    excerpt: "Moving from drama to data, see how this TV personality plans to disrupt the social media landscape.",
    category: Category.REALITY_TV,
    subcategory: 'Reality TV',
    author: "Jessica Williams",
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    imageUrl: "https://picsum.photos/800/600?random=5",
    readTime: "6 min read",
    tags: ['Startup', 'Tech', 'Entrepreneur']
  },
  {
    id: '6',
    title: "Top 10 Wellness Retreats Celebrities Are Flocking To",
    excerpt: "Discover the secluded sanctuaries where Hollywood's elite go to recharge, detox, and find their zen.",
    category: Category.LIFESTYLE,
    subcategory: 'Wellness',
    author: "Amanda Cole",
    publishedAt: new Date(Date.now() - 90000000).toISOString(),
    imageUrl: "https://picsum.photos/800/600?random=6",
    readTime: "7 min read",
    tags: ['Wellness', 'Luxury Travel', 'Detox']
  },
  {
    id: '7',
    title: "Viral TikTok Dance Takes Over The Charts",
    excerpt: "How a 15-second clip propelled an indie artist to number one on the global streaming charts overnight.",
    category: Category.SOCIAL,
    subcategory: 'TikTok Trends',
    author: "Ryan Lee",
    publishedAt: new Date(Date.now() - 40000000).toISOString(),
    imageUrl: "https://picsum.photos/800/600?random=7",
    readTime: "4 min read",
    tags: ['TikTok', 'Viral', 'Music Trends']
  },
  {
    id: '8',
    title: "Inside the $150M Malibu Mansion Market",
    excerpt: "Exclusive look at the properties trading hands between tech moguls and movie stars. Who is buying, who is selling, and who is moving next door?",
    category: Category.MONEY, // Wealth
    subcategory: 'Real Estate',
    author: "Marcus Sterling",
    publishedAt: new Date(Date.now() - 12000000).toISOString(),
    imageUrl: "https://picsum.photos/800/600?random=8",
    readTime: "10 min read",
    seriesId: 'series3',
    tags: ['Real Estate', 'Luxury', 'Malibu']
  },
  {
    id: '9',
    title: "Celebrity Car Collections: Who owns the rarest Hypercars?",
    excerpt: "From Bugattis to vintage Ferraris, we rank the most expensive garages in Hollywood. You won't believe what's parked in number one.",
    category: Category.TECH, // Merged Auto into Tech
    subcategory: 'Luxury Cars',
    author: "Marcus Sterling",
    publishedAt: new Date(Date.now() - 25000000).toISOString(),
    imageUrl: "https://picsum.photos/800/600?random=9",
    readTime: "6 min read",
    tags: ['Supercars', 'Luxury', 'Collection']
  },
  {
    id: '10',
    title: "The Billionaire Club: Musicians Who Made More from Tech Investments",
    excerpt: "They top the charts, but their real wealth comes from Silicon Valley. See which artists are savvy angel investors.",
    category: Category.MONEY,
    subcategory: 'Net Worth',
    author: "Ryan Lee",
    publishedAt: new Date(Date.now() - 50000000).toISOString(),
    imageUrl: "https://picsum.photos/800/600?random=10",
    readTime: "8 min read",
    tags: ['Investing', 'Tech', 'Billionaires']
  },
  {
    id: '11',
    title: "High Stakes: The Most Expensive Celebrity Divorces in History",
    excerpt: "When love fades, the legal bills pile up. A breakdown of the settlements that shook the entertainment industry.",
    category: Category.MONEY,
    subcategory: 'Legal Drama',
    author: "Jessica Williams",
    publishedAt: new Date(Date.now() - 60000000).toISOString(),
    imageUrl: "https://picsum.photos/800/600?random=11",
    readTime: "12 min read",
    tags: ['Divorce', 'Legal', 'Scandal']
  },
  {
    id: '12',
    title: "Why A-Listers Are Launching Their Own Gaming Studios",
    excerpt: "It's not just about voice acting anymore. Stars are funding development teams to build the next metaverse hits.",
    category: Category.TECH,
    subcategory: 'Gaming',
    author: "David Chen",
    publishedAt: new Date(Date.now() - 95000000).toISOString(),
    imageUrl: "https://picsum.photos/800/600?random=12",
    readTime: "5 min read",
    tags: ['Gaming', 'Metaverse', 'Investment']
  },
  {
    id: '13',
    title: "Courtside Couture: The Best NBA Tunnel Looks of the Playoffs",
    excerpt: "The runway isn't in Milan, it's in the arena tunnel. Which athletes are scoring big points with their pre-game fits?",
    category: Category.SPORTS,
    subcategory: 'NBA',
    author: "Elena Fisher",
    publishedAt: new Date(Date.now() - 3000000).toISOString(),
    imageUrl: "https://picsum.photos/800/600?random=13",
    readTime: "4 min read",
    tags: ['NBA', 'Fashion', 'Sports']
  },
  {
    id: '14',
    title: "F1 Glamour: Inside the Exclusive Paddock Afterparties",
    excerpt: "Monaco GP weekend brought out the A-listers. From yacht parties to exclusive club nights, here's who was seen with whom.",
    category: Category.SPORTS,
    subcategory: 'F1',
    author: "Marcus Sterling",
    publishedAt: new Date(Date.now() - 8000000).toISOString(),
    imageUrl: "https://picsum.photos/800/600?random=14",
    readTime: "6 min read",
    tags: ['Formula 1', 'Luxury', 'Parties']
  },
  {
    id: '15',
    title: "Super Bowl Halftime Show Rumors: Who's performing next year?",
    excerpt: "Insiders are whispering about a potential collab between two pop queens. Is the NFL ready for this much star power?",
    category: Category.SPORTS,
    subcategory: 'NFL',
    author: "Marc Johnson",
    publishedAt: new Date(Date.now() - 15000000).toISOString(),
    imageUrl: "https://picsum.photos/800/600?random=15",
    readTime: "5 min read",
    tags: ['Super Bowl', 'Music', 'Rumors']
  },
  {
    id: '16',
    title: "The Ultimate WAGs Guide to Wimbledon Style",
    excerpt: "It's not just about the tennis. The royal box fashion and WAG styling game is stronger than ever this season.",
    category: Category.SPORTS,
    subcategory: 'Tennis',
    author: "Elena Fisher",
    publishedAt: new Date(Date.now() - 2000000).toISOString(),
    imageUrl: "https://picsum.photos/800/600?random=16",
    readTime: "6 min read",
    tags: ['Tennis', 'WAGs', 'Fashion']
  },
  {
    id: '17',
    title: "Dating Rumors: Which Soccer Superstar is seeing this Pop Diva?",
    excerpt: "They were spotted leaving the same restaurant in Madrid. We breakdown the timeline of this potential power couple.",
    category: Category.SPORTS,
    subcategory: 'Soccer',
    author: "Jessica Williams",
    publishedAt: new Date(Date.now() - 5000000).toISOString(),
    imageUrl: "https://picsum.photos/800/600?random=17",
    readTime: "4 min read",
    tags: ['Soccer', 'Dating', 'Rumor']
  }
];

export const GOOGLE_TRENDING_DATA: TrendingTopic[] = [
  { id: 'gt1', rank: 1, topic: "Met Gala 2025 Red Carpet", volume: "2M+", trend: 'up', category: "Fashion" },
  { id: 'gt2', rank: 2, topic: "Taylor Swift Tour Dates", volume: "1M+", trend: 'up', category: "Music" },
  { id: 'gt3', rank: 3, topic: "Royal Baby Name", volume: "500K+", trend: 'same', category: "Royals" },
  { id: 'gt4', rank: 4, topic: "Dune Part 3 Cast", volume: "200K+", trend: 'up', category: "Movies" },
  { id: 'gt5', rank: 5, topic: "Viral TikTok Pasta", volume: "100K+", trend: 'down', category: "Food" },
];

export const TRENDING_NEWS_CATEGORIES: TrendingCategory[] = [
  { 
    id: 'cat1', 
    name: "Celebrity Gossip", 
    count: "125k", 
    type: 'news', 
    subcategories: ["Scandals", "Breakups", "Sightings", "Rumors"] 
  },
  { 
    id: 'cat2', 
    name: "Movies & TV", 
    count: "98k", 
    type: 'news', 
    subcategories: ["Trailers", "Casting News", "Reviews", "Box Office"] 
  },
  { 
    id: 'cat3', 
    name: "Fashion Week", 
    count: "85k", 
    type: 'trends', 
    subcategories: ["Street Style", "Runway Reports", "Designers", "Trends"] 
  },
  { 
    id: 'cat4', 
    name: "Music Industry", 
    count: "72k", 
    type: 'news', 
    subcategories: ["New Releases", "Concert Tours", "Awards", "Charts"] 
  },
  { 
    id: 'cat5', 
    name: "Reality TV Drama", 
    count: "64k", 
    type: 'trends', 
    subcategories: ["Recaps", "Reunions", "Cast Feuds", "Spoilers"] 
  },
  {
      id: 'cat6',
      name: "Royal Family",
      count: "50k",
      type: 'news',
      subcategories: ["British Royals", "Events", "Charity", "Monarchy"]
  }
];

export const MOCK_POLL: Poll = {
  id: 'poll-1',
  question: "Who is the Ultimate Style Icon of 2025?",
  totalVotes: 1423,
  options: [
    { id: 'opt1', label: "Zendaya", votes: 850 },
    { id: 'opt2', label: "Timothée Chalamet", votes: 320 },
    { id: 'opt3', label: "Rihanna", votes: 190 },
    { id: 'opt4', label: "Harry Styles", votes: 63 }
  ]
};

export const MOCK_STORIES: Story[] = [
  {
    id: 'st1',
    authorId: 'auth1',
    authorName: 'BuzzCeleb',
    authorAvatar: 'https://picsum.photos/id/64/200/200',
    imageUrl: 'https://picsum.photos/400/800?random=101',
    mediaType: 'image',
    caption: 'Backstage at the VMAs! 🎤✨',
    timestamp: '20m ago',
    isSeen: false
  },
  {
    id: 'st2',
    authorId: 'auth5',
    authorName: 'RealityCheck',
    authorAvatar: 'https://picsum.photos/id/338/200/200',
    imageUrl: 'https://picsum.photos/400/800?random=102',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    mediaType: 'video',
    caption: 'Sneak peek: The new season trailer dropped! 🎥',
    timestamp: '45m ago',
    isSeen: false
  },
  {
    id: 'st3',
    authorId: 'auth3',
    authorName: 'RoyalWatch',
    authorAvatar: 'https://picsum.photos/id/832/200/200',
    imageUrl: 'https://picsum.photos/400/800?random=103',
    mediaType: 'image',
    caption: 'The Duchess arriving in style 👑',
    timestamp: '2h ago',
    isSeen: true,
    linkUrl: '#',
    linkText: 'Shop the Look'
  },
  {
    id: 'st4',
    authorId: 'auth1',
    authorName: 'FashionWk',
    authorAvatar: 'https://picsum.photos/id/1027/200/200',
    imageUrl: 'https://picsum.photos/400/800?random=104',
    mediaType: 'image',
    caption: 'Top 5 Looks from Paris Day 1 🇫🇷',
    timestamp: '3h ago',
    isSeen: false
  },
  {
    id: 'st5',
    authorId: 'auth7',
    authorName: 'Trending',
    authorAvatar: 'https://picsum.photos/id/551/200/200',
    imageUrl: 'https://picsum.photos/400/800?random=105',
    mediaType: 'image',
    caption: 'The meme taking over Twitter right now 😂',
    timestamp: '5h ago',
    isSeen: true
  }
];

export const MOCK_SIGHTINGS: Sighting[] = [
  {
    id: 'sight1',
    celebName: 'Kim Kardashian',
    locationName: 'Nobu Malibu',
    coordinates: { x: 30, y: 40 },
    timestamp: '1h ago',
    description: 'Having dinner with family.'
  },
  {
    id: 'sight2',
    celebName: 'Leonardo DiCaprio',
    locationName: 'JFK Airport',
    coordinates: { x: 80, y: 25 },
    timestamp: '3h ago',
    description: 'Arriving for the film festival.'
  },
  {
    id: 'sight3',
    celebName: 'Beyoncé',
    locationName: 'Crypto.com Arena',
    coordinates: { x: 25, y: 45 },
    timestamp: '5h ago',
    description: 'Courtside at the Lakers game.'
  },
  {
    id: 'sight4',
    celebName: 'Dua Lipa',
    locationName: 'Soho House NYC',
    coordinates: { x: 82, y: 28 },
    timestamp: '6h ago',
    description: 'Spotted leaving with friends.'
  },
];

// Function to generate many radio stations
const generateRadioStations = (): RadioStation[] => {
  const genres = ['Top 40', 'News', 'Jazz', 'Rock', 'K-Pop', 'Latin', 'Hip Hop', 'Country', 'Classical', 'EDM', 'R&B', 'Reggae'];
  const languages = ['EN', 'ES', 'KR', 'FR', 'JP', 'BR', 'DE', 'IN', 'IT', 'CN', 'RU', 'AR'];
  const colors = ['bg-brand-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-yellow-500', 'bg-red-500', 'bg-pink-500', 'bg-indigo-500', 'bg-orange-500', 'bg-teal-500'];
  const stations: RadioStation[] = [];

  // Add high quality curated stations first
  stations.push(
    { id: 'radio-1', name: 'Buzz FM Global', genre: 'Top 40 & Gossip', language: 'EN', streamUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', logoColor: 'bg-brand-500' },
    { id: 'radio-2', name: 'Seoul Beats', genre: 'K-Pop Hits', language: 'KR', streamUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', logoColor: 'bg-blue-500' },
    { id: 'radio-3', name: 'Ritmo Caliente', genre: 'Latin & Reggaeton', language: 'ES', streamUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', logoColor: 'bg-orange-500' },
    { id: 'radio-4', name: 'Chic Paris', genre: 'Lounge & Pop', language: 'FR', streamUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3', logoColor: 'bg-purple-500' },
    { id: 'radio-5', name: 'Tokyo City Pop', genre: 'J-Pop & City Pop', language: 'JP', streamUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', logoColor: 'bg-pink-500' },
    { id: 'radio-6', name: 'Rio Carnival', genre: 'Samba & Funk', language: 'BR', streamUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', logoColor: 'bg-green-500' },
    { id: 'radio-7', name: 'Berlin Techno', genre: 'Deep House', language: 'DE', streamUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', logoColor: 'bg-gray-800' },
    { id: 'radio-8', name: 'Bollywood Hits', genre: 'Desi Pop', language: 'IN', streamUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', logoColor: 'bg-yellow-500' },
    { id: 'radio-9', name: 'Ibiza Global', genre: 'House & Chill', language: 'EN', streamUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3', logoColor: 'bg-teal-500' }
  );

  // Generate fillers
  for (let i = 10; i <= 200; i++) {
    const genre = genres[Math.floor(Math.random() * genres.length)];
    const lang = languages[Math.floor(Math.random() * languages.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];
    stations.push({
      id: `radio-${i}`,
      name: `Station ${i} ${genre}`,
      genre: genre,
      language: lang,
      streamUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Fallback stream
      logoColor: color
    });
  }

  return stations;
};

export const RADIO_STATIONS: RadioStation[] = generateRadioStations();

export const TV_CHANNELS: TVChannel[] = [
  {
    "name": "BBC News",
    "category": "News",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/b/b1/BBC_News_2022_%28Alt%29.svg",
    "description": "24/7 UK and global breaking news.",
    "stream": "https://news-streams.bbc.co.uk/news/live/stream.m3u8"
  },
  {
    "name": "Sky News",
    "category": "News",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/5/5e/Sky_News_2021_Logo.svg",
    "description": "Leading UK breaking news and live updates.",
    "stream": "https://siloh.pluto.tv/lilo/production/SkyNews/master.m3u8"
  },
  {
    "name": "ABC News",
    "category": "News",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/3/3f/ABC_News_logo_2021.svg",
    "description": "US news, politics, and major live events.",
    "stream": "https://abcnews-streams.akamaized.net/hls/live/2021460/abcnews/playlist.m3u8"
  },
  {
    "name": "CBS News",
    "category": "News",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/3/30/CBS_News_logo_%282020%29.svg",
    "description": "Breaking U.S. news and special reports.",
    "stream": "https://cbsn-us.cbsnstreaming.cbsnews.com/out/v1/playlist.m3u8"
  },
  {
    "name": "Euronews",
    "category": "News",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/4/4e/Euronews_Logo_2016.svg",
    "description": "European and international coverage.",
    "stream": "https://euronews-en-pb-aws-eu-frankfurt-1a.medialaancdn.com/out/v1/playlist.m3u8"
  },
  {
    "name": "Al Jazeera English",
    "category": "News",
    "logo": "https://upload.wikimedia.org/wikipedia/en/1/11/Aljazeera_eng.svg",
    "description": "Global perspective on world events.",
    "stream": "https://live-hls-web-aje.getaj.net/AJE/01.m3u8"
  },
  {
    "name": "Bloomberg TV",
    "category": "Business",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/8/88/Bloomberg_Television_Logo.svg",
    "description": "Global finance and market coverage.",
    "stream": "https://bloomberg.com/media-manifest.m3u8"
  },
  {
    "name": "TMZ TV",
    "category": "Celebrity Gossip",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/5/5f/TMZ_Logo.svg",
    "description": "Hollywood celebrity gossip and breaking entertainment news.",
    "stream": "https://dai2.xumo.com/amagi_hls_data_xumo1212A-tmzcdnbucket-pabt5/hls/master.m3u8"
  },
  {
    "name": "E! Entertainment",
    "category": "Celebrity Gossip",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/8/88/E%21_Logo.svg",
    "description": "Celebrity gossip, fashion, and entertainment.",
    "stream": "https://dai2.xumo.com/amagi_hls_data_xumo1212A-eentertainment-pablv/hls/master.m3u8"
  },
  {
    "name": "Fashion TV",
    "category": "Lifestyle",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/b/b2/Fashion_TV_logo.svg",
    "description": "International fashion, style, and beauty trends 24/7.",
    "stream": "https://fash1043.cloudycdn.services/slive/_definst_/ftv_paris_adaptive.smil/playlist.m3u8"
  },
  {
    "name": "France 24",
    "category": "News",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/f/f1/France_24_logo.svg",
    "description": "International news from a French perspective.",
    "stream": "https://static.france24.com/live/F24_EN_HI_HLS/live_web.m3u8"
  },
  {
    "name": "Deutsche Welle",
    "category": "News",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/6/62/DW-TV_Logo_2012.svg",
    "description": "Germany's international broadcaster.",
    "stream": "https://dwamdstream102.akamaized.net/hls/live/2015525/dwstream102/index.m3u8"
  },
  {
    "name": "Red Bull TV",
    "category": "Sports",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/4/43/Red_Bull_TV_logo.svg",
    "description": "Live events, action sports, music and entertainment.",
    "stream": "https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master.m3u8"
  },
  {
    "name": "NASA TV",
    "category": "Science",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/e/e5/NASA_logo.svg",
    "description": "Live coverage of launches and space missions.",
    "stream": "https://ntv1.akamaized.net/hls/live/2013975/NASA-NTV1-HLS/master.m3u8"
  },
  {
    "name": "FailArmy",
    "category": "Entertainment",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/c/c2/FailArmy_logo.svg",
    "description": "The world's number one source for epic fail videos.",
    "stream": "https://dai2.xumo.com/amagi_hls_data_xumo1212A-failarmy-pab5c/hls/master.m3u8"
  },
  {
    "name": "ESPN",
    "category": "Sports",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/a/a2/ESPN_logo.svg",
    "description": "Live sports coverage, highlights, and commentary.",
    "stream": "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
  },
  {
    "name": "Fox Sports",
    "category": "Sports",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/5/5f/Fox_Sports_logo_2017.svg",
    "description": "Major league sports news and live events.",
    "stream": "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8"
  },
  {
    "name": "People TV",
    "category": "Celebrity Gossip",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/8/86/People_Magazine_logo.svg",
    "description": "Celebrity interviews, red carpet news, and royal coverage.",
    "stream": "https://rakuten-people-1-eu.rakuten.wurl.tv/playlist.m3u8"
  },
  {
    "name": "Entertainment Tonight",
    "category": "Celebrity Gossip",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/0/0c/Entertainment_Tonight.svg",
    "description": "The latest happenings in Hollywood and beyond.",
    "stream": "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
  }
];
