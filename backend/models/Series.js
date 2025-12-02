const mongoose = require('mongoose');

const seriesSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    coverUrl: { type: String },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

seriesSchema.virtual('articleCount', {
  ref: 'Article',
  localField: '_id',
  foreignField: 'seriesId',
  count: true
});

const Series = mongoose.model('Series', seriesSchema);

module.exports = Series;