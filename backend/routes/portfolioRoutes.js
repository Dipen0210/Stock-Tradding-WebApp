const express = require('express');
const { getPortfolio } = require('../controllers/portfolioController');
const { protect } = require('../middleware/authMiddleware'); // Middleware to protect routes
const router = express.Router();

router.get('/', protect, getPortfolio); // Protect the portfolio route

module.exports = router;
