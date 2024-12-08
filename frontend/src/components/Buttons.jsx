import React from "react";

const ActionButtons = ({ stockName }) => {
  return (
    <div className="w-full flex flex-col md:flex-row justify-between items-center p-4 bg-gray-100 rounded-lg shadow-md">
      {/* Stock Name */}
      <h1 className="text-2xl md:text-4xl font-bold font-quicksand text-gray-800 mb-4 md:mb-0">
        {stockName || "Stock Name Unavailable"}
      </h1>

      {/* Buttons */}
      <div className="flex gap-4 items-center justify-center">
        <button className="bg-blue-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg text-sm md:text-xl font-semibold hover:bg-blue-600 transition duration-300 ease-in-out shadow-sm">
          Watch
        </button>
        <button className="bg-green-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg text-sm md:text-xl font-semibold hover:bg-green-600 transition duration-300 ease-in-out shadow-sm">
          Buy
        </button>
        <button className="bg-red-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg text-sm md:text-xl font-semibold hover:bg-red-600 transition duration-300 ease-in-out shadow-sm">
          Sell
        </button>
        <button className="bg-orange-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg text-sm md:text-xl font-semibold hover:bg-orange-600 transition duration-300 ease-in-out shadow-sm">
          News
        </button>
      </div>
    </div>
  );
};

export default ActionButtons;
