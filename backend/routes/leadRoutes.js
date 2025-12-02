const express = require('express');
const router = express.Router();
const { 
    getLeads, 
    getLeadById, 
    harvestLeads, 
    generateContentRecipe,
    updateLeadStatus
} = require('../controllers/leadController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(protect, getLeads);
router.route('/harvest').post(protect, admin, harvestLeads);
router.route('/:id').get(protect, getLeadById);
router.route('/:id/generate').post(protect, generateContentRecipe);
router.route('/:id/status').put(protect, updateLeadStatus);

module.exports = router;