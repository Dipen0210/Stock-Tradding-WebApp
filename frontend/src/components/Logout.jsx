// LogoutButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleLogout = () => {
    // Clear token or session data
    localStorage.removeItem('token'); // Remove token from localStorage
    
    // Redirect to the login page
    navigate('/login');
  };

  return (
    <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md">
      Logout
    </button>
  );
};

export default LogoutButton;
