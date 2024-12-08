import React, { useEffect, useState } from 'react';
import { fetchWatchlist, removeFromWatchlist } from '../api/watchlistAPI';
import { useNavigate } from 'react-router-dom';

const Watchlist = ({ token }) => {
  const [watchlist, setWatchlist] = useState([]); // Always start as an array
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchWatchlist(token);
        if (Array.isArray(response.data.watchlist)) {
          setWatchlist(response.data.watchlist); // Setting correct data
        } else {
          throw new Error('Invalid data format received');
        }
      } catch (err) {
        console.error('Error fetching watchlist:', err);
        setError('Could not fetch watchlist.');
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  const handleRemoveFromWatchlist = async (symbol) => {
    try {
      await removeFromWatchlist(symbol, token);
      setWatchlist((prev) => prev.filter((item) => item.symbol !== symbol));
    } catch (err) {
      console.error('Error removing from watchlist:', err);
    }
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-bold mb-4">Watchlist</h3>
      {error && <p className="text-red-500">{error}</p>}
      {watchlist.length > 0 ? (
        <table className="table-auto w-full border border-gray-300 text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border-b">Symbol</th>
              <th className="px-4 py-2 border-b">Company Name</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {watchlist.map((item) => (
              <tr key={item.symbol} className="hover:bg-gray-50">
                <td
                  className="px-4 py-2 border-b text-blue-500 cursor-pointer"
                  onClick={() => navigate(`/dashboard/${item.symbol}`)}
                >
                  {item.symbol}
                </td>
                <td className="px-4 py-2 border-b">{item.companyName}</td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => handleRemoveFromWatchlist(item.symbol)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">Your watchlist is empty.</p>
      )}
    </div>
  );
};

export default Watchlist;
