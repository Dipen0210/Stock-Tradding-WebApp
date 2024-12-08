import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import { getPortfolio } from '../api/portfolioAPI'; // Stock API for portfolio-related data
import StockListTable from './StockListTable'; // Component to show purchased stocks
import Watchlist from './Watchlist'; // Component to show the watchlist
import PfHeader from './PfHeader';
import LogoutButton from './Logout'; // Import the LogoutButton component

const Portfolio = ({ token }) => {
  const [portfolio, setPortfolio] = useState(null); // Initialized as null for loading state
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // To handle loading state
  const navigate = useNavigate(); // Navigation hook

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setLoading(true); // Start loading
        const data = await getPortfolio(token); // Get portfolio details
        setPortfolio(data); // Set portfolio data
      } catch (err) {
        setError('Error fetching portfolio'); // Set error if fetching fails
      } finally {
        setLoading(false); // End loading
      }
    };

    if (token) {
      fetchPortfolio();
    } else {
      setError('User not authenticated. Please log in.');
    }
  }, [token]); // Re-run when token changes

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-sky-200">
        <div className="text-xl font-semibold">Loading portfolio...</div>
      </div>
    ); // Show loading message while fetching
  }

  return (
    <div className="bg-sky-200 min-h-screen p-6 font-quicksand">
      {/* Grey background container with wider padding */}
      <div className="max-w-7xl mx-auto bg-gray-200 shadow-md rounded-lg p-6">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <PfHeader />
          <LogoutButton /> {/* Implement LogoutButton here */}
        </div>

        {/* Title Section */}
        <h1 className="text-2xl font-bold text-center mb-6">Portfolio</h1>

        {error && <p className="text-red-500 text-center">{error}</p>} {/* Show error message */}

        {portfolio && (
          <>
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-700">
                Available Balance:
                <span className="text-green-500"> ${portfolio.bankBalance}</span>
              </h3>
            </div>

            {/* Portfolio Table Section with grey background */}
            <div className="bg-gray-300 shadow-lg rounded-lg p-4 mb-8">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Your Portfolio:</h3>
              <StockListTable portfolio={portfolio.portfolio} /> {/* List of purchased stocks */}
            </div>

            {/* Watchlist Section with grey background */}
            <div className="bg-gray-300 shadow-lg rounded-lg p-4 mb-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Your Watchlist:</h3>
              <Watchlist token={token} />
            </div>

            {/* News Button */}
            <div className="flex justify-center">
              <button
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
                onClick={() => navigate('/news')} // Redirect to the News page
              >
                View Latest News
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
