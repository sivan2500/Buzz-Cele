const Author = require('../models/Author');
const Series = require('../models/Series');
const Story = require('../models/Story');
const Poll = require('../models/Poll');
const { Sighting, CalendarEvent, FashionBattle } = require('../models/Widget');
const { RadioStation, TVChannel } = require('../models/Media');
const { TrendingTopic, TrendingCategory } = require('../models/Trend');
const SponsoredContent = require('../models/Ad');

// --- Authors ---
const getAuthors = async (req, res) => {
  try {
    const authors = await Author.find({}).populate('articlesCount');
    res.json(authors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAuthorById = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (author) res.json(author);
    else res.status(404).json({ message: 'Author not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- Stories (The Buzz) ---
const getStories = async (req, res) => {
  try {
    // Fetch stories that haven't expired
    const stories = await Story.find({ expiresAt: { $gt: new Date() } })
      .populate('authorId', 'name avatarUrl')
      .sort({ createdAt: -1 });
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- Series ---
const getSeries = async (req, res) => {
  try {
    const series = await Series.find({});
    res.json(series);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- Widgets (Sidebar Data) ---
const getSidebarData = async (req, res) => {
  try {
    const sightings = await Sighting.find({}).sort({ timestamp: -1 }).limit(5);
    const events = await CalendarEvent.find({}).sort({ date: 1 }).limit(5);
    const fashionBattle = await FashionBattle.findOne().sort({ createdAt: -1 }); // Get latest
    const activePoll = await Poll.findOne({ isActive: true }).sort({ createdAt: -1 });

    res.json({
      sightings,
      events,
      fashionBattle,
      poll: activePoll
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- Live Media (TV & Radio) ---
const getLiveMedia = async (req, res) => {
    try {
        const radio = await RadioStation.find({});
        const tv = await TVChannel.find({});
        res.json({ radio, tv });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// --- Trends (Ticker & Categories) ---
const getTrends = async (req, res) => {
    try {
        const topics = await TrendingTopic.find({}).sort({ rank: 1 });
        const categories = await TrendingCategory.find({});
        res.json({ topics, categories });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// --- Sponsored Ads ---
const getAds = async (req, res) => {
    try {
        // Return 4 random ads
        const count = await SponsoredContent.countDocuments();
        const random = Math.floor(Math.random() * (count - 4));
        const ads = await SponsoredContent.find({}).limit(4).skip(random < 0 ? 0 : random);
        res.json(ads);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// --- Creation Helpers (Admin) ---
// In a real app, these would be separate POST routes protected by admin middleware
const createMockData = async (req, res) => {
    // This endpoint is just a placeholder to show where seed logic would go
    res.json({ message: "Use a seeder script to populate initial data" });
};

module.exports = {
  getAuthors,
  getAuthorById,
  getStories,
  getSeries,
  getSidebarData,
  getLiveMedia,
  getTrends,
  getAds,
  createMockData
};