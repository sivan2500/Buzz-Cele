const RSSParser = require('rss-parser');
const googleTrends = require('google-trends-api');
// const axios = require('axios'); // For X API if key available

const parser = new RSSParser();

// Configuration for RSS Feeds
const RSS_SOURCES = [
    { name: 'TMZ', url: 'https://www.tmz.com/rss.xml', type: 'story' },
    { name: 'People', url: 'https://people.com/feed/', type: 'story' },
    { name: 'E! News', url: 'https://www.eonline.com/syndication/feeds/rssfeeds/topstories.xml', type: 'story' },
    { name: 'Variety', url: 'https://variety.com/feed/', type: 'story' },
    { name: 'Google News (Entertainment)', url: 'https://news.google.com/rss/headlines/section/topic/ENTERTAINMENT?hl=en-US&gl=US&ceid=US:en', type: 'seo' }
];

// Helper: Calculate a mock viral score based on source and timing
const calculateScore = (pubDate, sourceName) => {
    const hoursAgo = (new Date() - new Date(pubDate)) / (1000 * 60 * 60);
    let baseScore = 60;
    
    // Fresher content gets higher score
    if (hoursAgo < 2) baseScore += 30;
    else if (hoursAgo < 6) baseScore += 20;
    else if (hoursAgo < 12) baseScore += 10;

    // Source weighting
    if (sourceName === 'TMZ' || sourceName === 'Google News (Entertainment)') baseScore += 10; // High viral potential

    // Cap at 100
    return Math.min(Math.floor(baseScore + (Math.random() * 10)), 100);
};

const fetchRSS = async () => {
    console.log('Fetching RSS Feeds...');
    let leads = [];

    const promises = RSS_SOURCES.map(async (source) => {
        try {
            const feed = await parser.parseURL(source.url);
            // Get top 2 items from each feed to keep it focused
            feed.items.slice(0, 2).forEach(item => {
                leads.push({
                    title: item.title,
                    type: source.type,
                    source: source.name,
                    score: calculateScore(item.pubDate, source.name),
                    estimatedTraffic: 'Medium', // Placeholder
                    metrics: { 
                        impressions: Math.floor(Math.random() * 50000) + 10000, 
                        clicks: 0, 
                        trendVelocity: 'Medium' 
                    },
                    evidence: [{
                        source: source.name,
                        url: item.link,
                        snippet: item.contentSnippet || item.content || 'No snippet available',
                        timestamp: new Date()
                    }],
                    status: 'new'
                });
            });
        } catch (error) {
            console.error(`Failed to fetch RSS from ${source.name}:`, error.message);
        }
    });

    await Promise.all(promises);
    return leads;
};

const fetchGoogleTrendsData = async () => {
    console.log('Fetching Google Trends...');
    try {
        // Fetch daily trends for US, Category 'e' (Entertainment)
        const results = await googleTrends.dailyTrends({
            geo: 'US',
            category: 'e', 
        });

        const parsed = JSON.parse(results);
        const trendingDays = parsed.default.trendingSearchesDays || [];
        
        // Flatten the first day's trends
        if (trendingDays.length > 0) {
            const topTrends = trendingDays[0].trendingSearches.slice(0, 3); // Top 3
            
            return topTrends.map(trend => ({
                title: trend.title.query,
                type: 'seo',
                source: 'Google Trends',
                score: 90 + Math.floor(Math.random() * 10), // Usually high value
                estimatedTraffic: trend.formattedTraffic || '50k+',
                metrics: { 
                    impressions: parseInt((trend.formattedTraffic || '50000').replace(/\D/g, '')) * 10,
                    clicks: 0,
                    trendVelocity: 'High'
                },
                evidence: trend.articles.slice(0, 1).map(art => ({
                    source: art.source,
                    url: art.url,
                    snippet: art.snippet,
                    timestamp: new Date()
                })),
                status: 'new'
            }));
        }
        return [];
    } catch (error) {
        console.error('Failed to fetch Google Trends:', error.message);
        return []; // Fallback to empty if API fails/blocks
    }
};

const fetchSocialTrends = async () => {
    console.log('Fetching Social Trends (Simulated)...');
    // NOTE: Real X API requires paid access. This simulates what a connected service would return.
    // In production, integrate with Twitter API v2 using 'axios' and Bearer token.
    
    // Simulating delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const mockSocials = [
        {
            title: "#MetGala2025 Predictions",
            type: 'story',
            source: 'X (Twitter)',
            score: 88,
            estimatedTraffic: 'Viral',
            metrics: { impressions: 250000, clicks: 0, trendVelocity: 'High' },
            evidence: [{ source: 'X', url: 'https://twitter.com/explore', snippet: 'Trending in Fashion', timestamp: new Date() }],
            status: 'new'
        },
        {
            title: "Taylor Swift's Cat",
            type: 'story',
            source: 'TikTok',
            score: 75,
            estimatedTraffic: 'High',
            metrics: { impressions: 120000, clicks: 0, trendVelocity: 'Medium' },
            evidence: [{ source: 'TikTok', url: 'https://tiktok.com', snippet: '1M+ views on hashtag', timestamp: new Date() }],
            status: 'new'
        }
    ];

    return mockSocials;
};

const aggregateTrends = async () => {
    const rssLeads = await fetchRSS();
    const googleLeads = await fetchGoogleTrendsData();
    const socialLeads = await fetchSocialTrends();

    // Combine all
    const allLeads = [...googleLeads, ...socialLeads, ...rssLeads];

    // Deduplicate based on title similarity (simple includes check)
    const uniqueLeads = [];
    const seenTitles = new Set();

    allLeads.forEach(lead => {
        // Basic normalization
        const normalizedTitle = lead.title.toLowerCase().replace(/[^a-z0-9]/g, '');
        
        // Check if a similar title exists (very basic check)
        const isDuplicate = Array.from(seenTitles).some(seen => normalizedTitle.includes(seen) || seen.includes(normalizedTitle));
        
        if (!isDuplicate) {
            seenTitles.add(normalizedTitle);
            uniqueLeads.push(lead);
        }
    });

    // Sort by score descending
    return uniqueLeads.sort((a, b) => b.score - a.score);
};

module.exports = {
    aggregateTrends
};