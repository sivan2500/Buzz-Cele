const mongoose = require('mongoose');

const authorSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true }, // e.g., Senior Editor
    bio: { type: String },
    avatarUrl: { type: String },
    social: {
      twitter: String,
      instagram: String
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual to count articles (would be populated in a real query)
authorSchema.virtual('articlesCount', {
  ref: 'Article',
  localField: '_id',
  foreignField: 'authorId',
  count: true
});

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;