import axios from 'axios';

const API_BASE = "http://localhost:5000"; // Replace with your backend URL

// Watchlist Functions
export const fetchWatchlist = async (token) => {
  return await axios.get(`${API_BASE}/watchlist`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const addToWatchlist = async (symbol, companyName, token) => {
  return await axios.post(
    `${API_BASE}/watchlist/add`, 
    { symbol, companyName }, 
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const removeFromWatchlist = async (symbol, token) => {
  return await axios.post(`${API_BASE}/watchlist/remove`, { symbol }, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Stock Data Functions
export const fetchStockData = async (symbol) => {
  return await axios.get(`${API_BASE}/stocks/${symbol}`);
};

export const fetchStockNews = async (symbol) => {
  return await axios.get(`${API_BASE}/stocks/${symbol}/news`);
};
