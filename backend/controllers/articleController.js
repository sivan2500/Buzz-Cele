
const Article = require('../models/Article');
const Comment = require('../models/Comment');
const SocialService = require('../services/socialService');

// @desc    Fetch all articles
// @route   GET /api/articles
// @access  Public
const getArticles = async (req, res) => {
  try {
    const pageSize = 12;
    const page = Number(req.query.pageNumber) || 1;

    // Build filter object
    const keyword = req.query.keyword
      ? {
          title: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {};
    
    const category = req.query.category 
        ? { category: req.query.category } 
        : {};

    const count = await Article.countDocuments({ ...keyword, ...category });
    const articles = await Article.find({ ...keyword, ...category })
      .sort({ createdAt: -1 }) // Newest first
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({ articles, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch single article
// @route   GET /api/articles/:id
// @access  Public
const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (article) {
      res.json(article);
    } else {
      res.status(404).json({ message: 'Article not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new comment
// @route   POST /api/articles/:id/comments
// @access  Private
const createArticleComment = async (req, res) => {
  try {
    const { text } = req.body;
    const article = await Article.findById(req.params.id);

    if (article) {
      const comment = new Comment({
        user: req.user._id,
        articleId: req.params.id,
        text,
      });

      const savedComment = await comment.save();
      // Populate user info for immediate frontend display if needed
      await savedComment.populate('user', 'name avatarUrl');

      res.status(201).json(savedComment);
    } else {
      res.status(404).json({ message: 'Article not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get comments for an article
// @route   GET /api/articles/:id/comments
// @access  Public
const getArticleComments = async (req, res) => {
    try {
        const comments = await Comment.find({ articleId: req.params.id })
            .populate('user', 'name avatarUrl')
            .sort({ createdAt: -1 });
        
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc    Create an article (Admin only)
// @route   POST /api/articles
// @access  Private/Admin
const createArticle = async (req, res) => {
    try {
        const article = new Article({
            title: req.body.title,
            excerpt: req.body.excerpt,
            category: req.body.category,
            author: req.body.author, // Assuming string name here for manual entry
            authorId: req.user._id,  // Link to admin user
            imageUrl: req.body.imageUrl,
            readTime: req.body.readTime,
            content: req.body.content || "Full content would go here...",
            views: 0,
            isBreaking: req.body.isBreaking || false
        });

        const createdArticle = await article.save();

        // Broadcast to Social Media (Async)
        SocialService.broadcast(createdArticle).catch(err => console.error("Social Broadcast Error:", err));

        res.status(201).json(createdArticle);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc    Increment Article Views
// @route   PUT /api/articles/:id/view
// @access  Public
const incrementArticleViews = async (req, res) => {
    try {
        const article = await Article.findByIdAndUpdate(
            req.params.id,
            { $inc: { views: 1 } },
            { new: true }
        );
        if (article) {
            res.json({ views: article.views });
        } else {
            res.status(404).json({ message: 'Article not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { 
    getArticles, 
    getArticleById, 
    createArticleComment, 
    getArticleComments,
    createArticle,
    incrementArticleViews
};
