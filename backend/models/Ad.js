const mongoose = require('mongoose');

const sponsoredContentSchema = mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  advertiser: String, // e.g., "BeautySecrets"
  url: { type: String, required: true }, // Outbound link
  clicks: { type: Number, default: 0 }
}, {
  timestamps: true
});

const SponsoredContent = mongoose.model('SponsoredContent', sponsoredContentSchema);

module.exports = SponsoredContent;