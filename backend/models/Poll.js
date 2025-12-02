const mongoose = require('mongoose');

const pollSchema = mongoose.Schema(
  {
    question: { type: String, required: true },
    options: [
      {
        label: String,
        votes: { type: Number, default: 0 }
      }
    ],
    articleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' }, // Optional: Link to article
    isActive: { type: Boolean, default: true } // For the main sidebar poll
  },
  {
    timestamps: true,
  }
);

const Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;