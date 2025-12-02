const express = require('express');
const router = express.Router();
const { 
    getArticles, 
    getArticleById, 
    createArticleComment,
    getArticleComments,
    createArticle
} = require('../controllers/articleController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(getArticles)
    .post(protect, admin, createArticle);

router.route('/:id')
    .get(getArticleById);

router.route('/:id/comments')
    .get(getArticleComments)
    .post(protect, createArticleComment);

module.exports = router;