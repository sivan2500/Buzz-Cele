const mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    articleId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Article',
    },
    text: {
      type: String,
      required: true,
    },
    likes: {
        type: Number,
        default: 0
    }
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;