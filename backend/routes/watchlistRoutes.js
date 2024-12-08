const express = require('express');
const { addToWatchlist, removeFromWatchlist, getWatchlist } = require('../controllers/watchlistController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Fetch watchlist
router.get('/', protect, getWatchlist);

// Add stock to watchlist
router.post('/add', protect, addToWatchlist);

// Remove stock from watchlist
router.post('/remove', protect, removeFromWatchlist);



module.exports = router;
