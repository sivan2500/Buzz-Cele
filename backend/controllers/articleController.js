const Article = require('../models/Article');
const Comment = require('../models/Comment');

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

      await comment.save();
      res.status(201).json({ message: 'Comment added' });
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
            author: req.body.author,
            imageUrl: req.body.imageUrl,
            readTime: req.body.readTime,
            content: req.body.content || "Full content would go here..."
        });

        const createdArticle = await article.save();
        res.status(201).json(createdArticle);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { 
    getArticles, 
    getArticleById, 
    createArticleComment, 
    getArticleComments,
    createArticle
};