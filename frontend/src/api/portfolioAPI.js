import axios from 'axios';

const API_BASE = "http://localhost:5000"; // Backend URL

export const getPortfolio = async (token) => {
  try {
    if (!token) {
      throw new Error('Authentication token is missing.');
    }

    const response = await axios.get(`${API_BASE}/Portfolio`, {
      headers: {
        Authorization: `Bearer ${token}`, // Send token for authentication
      },
    });

    return response.data; // Return portfolio data
  } catch (error) {
    if (error.response?.status === 401) {
      // Handle Unauthorized Error
      throw new Error('Unauthorized. Please check your login credentials or token.');
    }
    throw new Error(`Failed to fetch portfolio: ${error.response?.data?.message || error.message}`);
  }
};
