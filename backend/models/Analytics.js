const mongoose = require('mongoose');

const analyticsSchema = mongoose.Schema({
  date: { type: Date, required: true, unique: true },
  metrics: {
    pageViews: { type: Number, default: 0 },
    uniqueVisitors: { type: Number, default: 0 },
    pwaInstalls: { type: Number, default: 0 },
    revenue: { type: Number, default: 0 }
  },
  deviceBreakdown: {
    mobile: { type: Number, default: 0 },
    desktop: { type: Number, default: 0 },
    tablet: { type: Number, default: 0 }
  },
  pwaSource: {
    android: { type: Number, default: 0 },
    ios: { type: Number, default: 0 },
    desktop: { type: Number, default: 0 }
  }
});

const Analytics = mongoose.model('Analytics', analyticsSchema);

module.exports = Analytics;