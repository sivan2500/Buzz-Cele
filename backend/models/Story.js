const mongoose = require('mongoose');

const storySchema = mongoose.Schema(
  {
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true },
    mediaType: { type: String, enum: ['image', 'video'], default: 'image' },
    imageUrl: { type: String, required: true },
    videoUrl: { type: String },
    caption: { type: String },
    linkUrl: { type: String }, // "Swipe Up" link
    linkText: { type: String },
    expiresAt: { type: Date, default: () => Date.now() + 24*60*60*1000 } // 24 hours default
  },
  {
    timestamps: true,
  }
);

const Story = mongoose.model('Story', storySchema);

module.exports = Story;