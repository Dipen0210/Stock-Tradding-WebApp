import React, { useState } from 'react';
import { loginUser } from '../api/authAPI';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token } = await loginUser(username, password); // Retrieve token
      localStorage.setItem('token', token); // Store token in localStorage
      navigate('/portfolio'); // Redirect to Portfolio page
    } catch (error) {
      console.error(error.message);
      alert('Login failed!');
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-700 to-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-8">Login</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium mb-2 text-gray-300"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 rounded-md border border-gray-700 bg-gray-900 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium mb-2 text-gray-300"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded-md border border-gray-700 bg-gray-900 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
