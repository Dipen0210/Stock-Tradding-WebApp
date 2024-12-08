const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const portfolioRoutes = require('./routes/PortfolioRoutes');
const watchlistRoutes = require('./routes/watchlistRoutes');
const BuySellRoutes = require('./routes/BuySellRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use('/auth', authRoutes); // Auth routes (login, register)
app.use('/Portfolio', portfolioRoutes); // Portfolio routes
app.use('/watchlist', watchlistRoutes); // Watchlist routes
app.use('/api/user', BuySellRoutes); // Watchlist routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
