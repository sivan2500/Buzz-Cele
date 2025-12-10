const express = require('express');
const router = express.Router();
const { createCheckoutSession, mockSuccess } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

router.post('/create-checkout-session', protect, createCheckoutSession);
router.post('/mock-success', protect, mockSuccess);

module.exports = router;