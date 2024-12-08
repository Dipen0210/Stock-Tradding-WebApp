import axios from "axios";
const API_BASE = "http://localhost:5000";
// Function to buy a stock
export const buyStock = async (data, token) => {
    try {
      const response = await axios.post(`${API_BASE}/api/user/buy`, data, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error('Error buying stock:', error.message);
      throw new Error(`Error buying stock: ${error.response?.status || error.message}`);
    }
  };
  
  // Function to sell a stock
  export const sellStock = async (data, token) => {
    try {
      const response = await axios.post(`${API_BASE}/api/user/sell`, data, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error('Error selling stock:', error.message);
      throw new Error(`Error selling stock: ${error.response?.status || error.message}`);
    }
  };