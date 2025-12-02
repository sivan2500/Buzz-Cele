const mongoose = require('mongoose');

// The scrolling ticker at the top
const trendingTopicSchema = mongoose.Schema({
  rank: Number,
  topic: { type: String, required: true },
  volume: String, // e.g., "2M+"
  trend: { type: String, enum: ['up', 'down', 'same'], default: 'up' },
  category: String
});

// The Sidebar "Google News Categories"
const trendingCategorySchema = mongoose.Schema({
  name: String,
  count: String,
  type: { type: String, enum: ['news', 'trends'] },
  subcategories: [String]
});

const TrendingTopic = mongoose.model('TrendingTopic', trendingTopicSchema);
const TrendingCategory = mongoose.model('TrendingCategory', trendingCategorySchema);

module.exports = { TrendingTopic, TrendingCategory };