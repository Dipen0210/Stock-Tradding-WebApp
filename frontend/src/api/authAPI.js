import axios from 'axios';

const API_BASE = "http://localhost:5000"; // Replace with your backend URL

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE}/auth/login`, { username, password });
    return response.data; // { token, user }
  } catch (error) {
    throw new Error(`Login failed: ${error.response?.status || error.message}`);
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE}/auth/register`, userData);
    console.log(userData);
    return response.data; // { token, user }
  } catch (error) {
    throw new Error(`Registration failed: ${error.response?.status || error.message}`);
  }
};
