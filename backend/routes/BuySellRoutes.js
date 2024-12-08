const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { buyStock, sellStock } = require('../controllers/BuySellController');
const router = express.Router();


// Buy stock
router.post('/buy', protect, buyStock);

// Sell stock
router.post('/sell', protect, sellStock);

module.exports = router;
