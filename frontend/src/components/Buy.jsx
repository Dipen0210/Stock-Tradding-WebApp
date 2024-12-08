import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { fetchQuote } from '../api/stockAPI';
import { buyStock } from '../api/BuySellAPI';

const BuyModal = ({ isOpen, onRequestClose, stockSymbol, onBuySuccess }) => {
  const [quantity, setQuantity] = useState(1);
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    // Fetch stock price when modal opens
    const fetchStockPrice = async () => {
      try {
        const data = await fetchQuote(stockSymbol);
        setPurchasePrice(data.c); // Assuming `data.c` holds the current stock price
      } catch (error) {
        console.error('Error fetching stock price:', error);
      }
    };

    if (stockSymbol) {
      fetchStockPrice();
    }
  }, [stockSymbol]);

  const handleQuantityChange = (e) => {
    const qty = Math.max(1, e.target.value); // Prevent negative or zero quantity
    setQuantity(qty);
    setTotalCost(purchasePrice * qty);
  };

  const handleBuy = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await buyStock(
        { ticker: stockSymbol, purchasePrice, quantity },
        token
      );
      onBuySuccess(response); // Update parent with new portfolio data
      onRequestClose(); // Close modal
    } catch (error) {
      console.error('Error buying stock:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Buy Stock"
      className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50"
      overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75"
    >
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-600 dark:text-blue-400">
          Buy Stock: {stockSymbol}
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Quantity:
          </label>
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            min="1"
            className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Total Cost:
          </label>
          <input
            type="text"
            value={`$${totalCost.toFixed(2)}`}
            readOnly
            className="w-full p-2 mt-1 border rounded-md bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
          />
        </div>
        <div className="flex justify-between">
          <button
            onClick={handleBuy}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500"
          >
            Buy
          </button>
          <button
            onClick={onRequestClose}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default BuyModal;
