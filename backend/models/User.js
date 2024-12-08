const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  bankBalance: { type: Number, required: true}, // Default balance
  portfolio: [
    {
      ticker: { type: String, required: true },
      purchasePrice: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  watchlist: [
    {
      symbol: { type: String, required: true },
      companyName: { type: String, required: true }, // Optional: Add company name
    }
  ], // Array of objects for watchlist with symbol and companyName
});

module.exports = mongoose.model('User', userSchema);
