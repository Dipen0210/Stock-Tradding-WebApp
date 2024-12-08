const User = require('../models/User');

// Get Portfolio
exports.getPortfolio = async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from authenticated token
    const user = await User.findById(userId).select('-password'); // Exclude password

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      bankBalance: user.bankBalance,
      portfolio: user.portfolio,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching portfolio' });
  }
};
