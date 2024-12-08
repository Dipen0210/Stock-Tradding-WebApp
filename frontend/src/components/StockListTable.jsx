import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchQuote } from '../api/stockAPI'; // Import fetchQuote function

const StockListTable = ({ portfolio }) => {
  const [currentPrices, setCurrentPrices] = useState({}); // To store current prices for stocks
  const [loading, setLoading] = useState(true); // To manage loading state

  useEffect(() => {
    const fetchPrices = async () => {
      const prices = {};
      // Fetch current price for each stock in the portfolio
      for (const stock of portfolio) {
        try {
          const data = await fetchQuote(stock.ticker); // Fetch price for each stock
          prices[stock.ticker] = data.c; // Assuming 'c' contains the current price
        } catch (error) {
          console.error(`Error fetching price for ${stock.ticker}:`, error);
        }
      }
      setCurrentPrices(prices); // Update state with fetched prices
      setLoading(false); // End loading once data is fetched
    };

    if (portfolio.length > 0) {
      fetchPrices(); // Fetch prices on portfolio change
    }
  }, [portfolio]);

  if (loading) {
    return <div className="text-center text-xl font-semibold">Loading stock prices...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse border border-gray-200 shadow-lg rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-left text-sm text-gray-700 font-semibold">
            <th className="px-4 py-2 border-b">Stock</th>
            <th className="px-4 py-2 border-b">Quantity</th>
            <th className="px-4 py-2 border-b">Gain/Loss</th>
            <th className="px-4 py-2 border-b">Percentage</th>
          </tr>
        </thead>
        <tbody>
          {portfolio.map((stock) => {
            const currentPrice = currentPrices[stock.ticker];
            if (!currentPrice) return null; // Skip if price is not available

            const gainLoss = (currentPrice - stock.purchasePrice) * stock.quantity;
            const gainLossPercent = ((gainLoss / (stock.purchasePrice * stock.quantity)) * 100).toFixed(2);

            return (
              <tr key={stock.ticker} className="hover:bg-gray-100 transition-colors">
                <td className="px-4 py-2 border-b text-blue-500 font-medium">
                  <Link to={`/dashboard/${stock.ticker}`}>{stock.ticker}</Link>
                </td>
                <td className="px-4 py-2 border-b text-gray-700">{stock.quantity}</td>
                <td className={`px-4 py-2 border-b font-semibold ${gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${gainLoss.toFixed(2)}
                </td>
                <td className={`px-4 py-2 border-b font-semibold ${gainLossPercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {gainLossPercent}%
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StockListTable;
