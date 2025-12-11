
const supabase = require('../config/supabase');
const SocialService = require('../services/socialService');

// @desc    Fetch all articles
// @route   GET /api/articles
// @access  Public
const getArticles = async (req, res) => {
  try {
    const pageSize = 12;
    const page = Number(req.query.pageNumber) || 1;
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabase
      .from('articles')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, to);

    // Apply Filters
    if (req.query.category) {
        query = query.eq('category', req.query.category);
    }
    
    if (req.query.keyword) {
        query = query.ilike('title', `%${req.query.keyword}%`);
    }

    const { data: articles, count, error } = await query;

    if (error) throw error;

    // Map DB fields to Frontend expected format (camelCase)
    const formattedArticles = articles.map(a => ({
        _id: a.id,
        title: a.title,
        excerpt: a.excerpt,
        category: a.category,
        author: a.author_name,
        imageUrl: a.image_url,
        views: a.views,
        createdAt: a.created_at,
        isBreaking: a.is_breaking,
        readTime: a.read_time
    }));

    res.json({ 
        articles: formattedArticles, 
        page, 
        pages: Math.ceil(count / pageSize) 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch single article
// @route   GET /api/articles/:id
// @access  Public
const getArticleById = async (req, res) => {
  try {
    const { data: article, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', req.params.id)
        .single();

    if (article) {
      // Format for frontend
      res.json({
          ...article,
          _id: article.id,
          imageUrl: article.image_url,
          author: article.author_name,
          createdAt: article.created_at
      });
    } else {
      res.status(404).json({ message: 'Article not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new comment (Requires Comment Table in Supabase)
// @route   POST /api/articles/:id/comments
// @access  Private
const createArticleComment = async (req, res) => {
  try {
    const { text } = req.body;
    
    // Insert comment
    const { data: comment, error } = await supabase
        .from('comments')
        .insert([{
            user_id: req.user.id,
            article_id: req.params.id,
            text: text
        }])
        .select(`
            *,
            users (name, avatar_url)
        `)
        .single();

    if (error) throw error;

    // Format for frontend
    res.status(201).json({
        _id: comment.id,
        text: comment.text,
        createdAt: comment.created_at,
        user: {
            name: comment.users?.name,
            avatarUrl: comment.users?.avatar_url
        }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get comments for an article
// @route   GET /api/articles/:id/comments
// @access  Public
const getArticleComments = async (req, res) => {
    try {
        const { data: comments, error } = await supabase
            .from('comments')
            .select(`
                id,
                text,
                created_at,
                users (name, avatar_url)
            `)
            .eq('article_id', req.params.id)
            .order('created_at', { ascending: false });
        
        if (error) throw error;

        const formatted = comments.map(c => ({
            _id: c.id,
            text: c.text,
            createdAt: c.created_at,
            user: {
                name: c.users?.name,
                avatarUrl: c.users?.avatar_url
            }
        }));

        res.json(formatted);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc    Create an article (Admin only)
// @route   POST /api/articles
// @access  Private/Admin
const createArticle = async (req, res) => {
    try {
        const { data: article, error } = await supabase
            .from('articles')
            .insert([{
                title: req.body.title,
                excerpt: req.body.excerpt,
                category: req.body.category,
                author_name: req.body.author, 
                image_url: req.body.imageUrl,
                read_time: req.body.readTime,
                content: req.body.content || "Content...",
                is_breaking: req.body.isBreaking || false,
                views: 0
            }])
            .select()
            .single();

        if (error) throw error;

        // Broadcast (keeping existing service)
        const formattedArticle = { ...article, _id: article.id, imageUrl: article.image_url };
        SocialService.broadcast(formattedArticle).catch(err => console.error("Social Broadcast Error:", err));

        res.status(201).json(formattedArticle);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc    Increment Article Views
// @route   PUT /api/articles/:id/view
// @access  Public
const incrementArticleViews = async (req, res) => {
    try {
        // RPC call is better for atomicity, but standard update works for simple cases
        // Assuming you created a Postgres function `increment_views`
        // Or fetch, update, save pattern (less atomic)
        
        // Simple fetch-update for now
        const { data: article } = await supabase
            .from('articles')
            .select('views')
            .eq('id', req.params.id)
            .single();
            
        if (!article) return res.status(404).json({ message: 'Article not found' });

        const newViews = (article.views || 0) + 1;

        const { error } = await supabase
            .from('articles')
            .update({ views: newViews })
            .eq('id', req.params.id);

        if (error) throw error;

        res.json({ views: newViews });
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
