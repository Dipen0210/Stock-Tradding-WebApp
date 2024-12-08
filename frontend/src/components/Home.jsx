import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-tl from-teal-400 via-indigo-600 to-pink-500 text-white">
      {/* Container with content */}
      <div className="relative z-10 text-center px-6 md:px-12">
        <h1 className="text-5xl font-extrabold mb-4 text-shadow-xl">
          Make Your Fortune Here: Do Trading!
        </h1>
        <p className="text-lg md:text-2xl font-semibold mb-8 opacity-90">
          Make Money While You Sleep!!..
        </p>

        <div className="flex space-x-6">
          {/* Login Button */}
          <Link to="/login">
            <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-full shadow-lg transform hover:scale-105 hover:bg-blue-100 transition-all duration-300 ease-in-out">
              Login
            </button>
          </Link>

          {/* Register Button */}
          <Link to="/register">
            <button className="px-8 py-3 bg-blue-800 text-white font-semibold rounded-full shadow-lg transform hover:scale-105 hover:bg-blue-700 transition-all duration-300 ease-in-out">
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
