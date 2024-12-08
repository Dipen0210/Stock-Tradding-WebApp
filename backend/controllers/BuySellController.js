const User = require('../models/User');

// Buy Stock
exports.buyStock = async (req, res) => {
    const { ticker, purchasePrice, quantity } = req.body;
  
    try {
      const user = await User.findById(req.user.id);
  
      const totalCost = purchasePrice * quantity;
      if (user.bankBalance < totalCost) return res.status(400).json({ message: 'Insufficient funds' });
  
      const stock = user.portfolio.find((item) => item.ticker === ticker);
      if (stock) {
        stock.quantity += quantity;
      } else {
        user.portfolio.push({ ticker, purchasePrice, quantity });
      }
  
      user.bankBalance -= totalCost;
      await user.save();
      res.json({
        message: 'Stock purchased successfully',
        bankBalance: user.bankBalance,
        portfolio: user.portfolio,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  // Sell Stock
  exports.sellStock = async (req, res) => {
    const { ticker, quantity, sellPrice } = req.body;
  
    try {
      const user = await User.findById(req.user.id);
  
      const stock = user.portfolio.find((item) => item.ticker === ticker);
      if (!stock || stock.quantity < quantity) {
        return res.status(400).json({ message: 'Insufficient stock quantity' });
      }
  
      const totalSale = sellPrice * quantity;
      stock.quantity -= quantity;
      if (stock.quantity === 0) {
        user.portfolio = user.portfolio.filter((item) => item.ticker !== ticker);
      }
  
      user.bankBalance += totalSale;
      await user.save();
      res.json({
        message: 'Stock sold successfully',
        bankBalance: user.bankBalance,
        portfolio: user.portfolio,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  