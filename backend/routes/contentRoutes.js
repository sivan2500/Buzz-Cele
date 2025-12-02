const express = require('express');
const router = express.Router();
const { 
    getAuthors, 
    getAuthorById, 
    getStories, 
    getSeries, 
    getSidebarData,
    getLiveMedia,
    getTrends,
    getAds
} = require('../controllers/contentController');

router.get('/authors', getAuthors);
router.get('/authors/:id', getAuthorById);
router.get('/stories', getStories);
router.get('/series', getSeries);
router.get('/sidebar', getSidebarData);
router.get('/media', getLiveMedia);
router.get('/trends', getTrends);
router.get('/ads', getAds);

module.exports = router;