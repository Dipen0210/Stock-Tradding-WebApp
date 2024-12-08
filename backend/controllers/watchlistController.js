const User = require('../models/User');

// Add Stock to Watchlist
exports.addToWatchlist = async (req, res) => {
  const { symbol, companyName } = req.body; // Receive companyName along with symbol
  const userId = req.user.id; // Get user ID from JWT

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check if the stock is already in the watchlist
    if (user.watchlist.some(stock => stock.symbol === symbol)) {
      return res.status(400).json({ message: 'Stock already in watchlist' });
    }

    // Add stock with symbol and company name to watchlist
    user.watchlist.push({ symbol, companyName });
    await user.save();
    return res.status(200).json({ message: 'Stock added to watchlist', watchlist: user.watchlist });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add to watchlist' });
  }
};

// Remove Stock from Watchlist
exports.removeFromWatchlist = async (req, res) => {
  const { symbol } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Remove the stock symbol from the watchlist
    user.watchlist = user.watchlist.filter(stock => stock.symbol !== symbol);
    await user.save();
    res.status(200).json({ message: 'Stock removed from watchlist', watchlist: user.watchlist });
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove from watchlist' });
  }
};

// Fetch Watchlist (New)
exports.getWatchlist = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId).select('watchlist');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ watchlist: user.watchlist });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch watchlist' });
  }
};

