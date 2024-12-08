import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { fetchIntradayData } from "../api/stockAPI"; // Use appropriate chart data fetching function

// Utility functions for technical indicator calculations
const calculateMovingAverage = (data, period) => {
  const prices = data.map((d) => d.value);
  const movingAverage = prices
    .slice(-period)
    .reduce((sum, price) => sum + price, 0) / period;
  return movingAverage;
};

const calculateRSI = (data, period) => {
  const prices = data.map((d) => d.value);
  let gains = 0,
    losses = 0;

  for (let i = 1; i < prices.length; i++) {
    const change = prices[i] - prices[i - 1];
    if (change > 0) gains += change;
    else losses -= change;
  }

  const avgGain = gains / period;
  const avgLoss = losses / period;
  const rs = avgGain / avgLoss;

  return 100 - 100 / (1 + rs);
};

const calculateBollingerBands = (data, period) => {
  const prices = data.map((d) => d.value);
  const movingAverage = calculateMovingAverage(data, period);

  const squaredDiffs = prices
    .slice(-period)
    .map((price) => Math.pow(price - movingAverage, 2));

  const stdDev = Math.sqrt(
    squaredDiffs.reduce((sum, diff) => sum + diff, 0) / period
  );

  return {
    upper: movingAverage + 2 * stdDev,
    lower: movingAverage - 2 * stdDev,
  };
};

// TechnicalAnalysisModal Component
const TechnicalAnalysisModal = ({ isOpen, onRequestClose, stockSymbol }) => {
  const [chartData, setChartData] = useState([]);
  const [technicalData, setTechnicalData] = useState(null);

  useEffect(() => {
    if (!isOpen || !stockSymbol) return;

    const fetchData = async () => {
      try {
        const data = await fetchIntradayData(stockSymbol); // Fetch intraday chart data
        setChartData(data);

        // Calculate technical indicators
        const movingAverage = calculateMovingAverage(data, 14);
        const rsi = calculateRSI(data, 14);
        const bollingerBands = calculateBollingerBands(data, 14);

        setTechnicalData({ movingAverage, rsi, bollingerBands });
      } catch (error) {
        console.error("Error fetching or calculating technical data:", error);
      }
    };

    fetchData();
  }, [isOpen, stockSymbol]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Technical Analysis"
      className="modal-container"
      overlayClassName="overlay-container"
    >
      <div className="bg-white max-w-lg mx-auto rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Technical Analysis
        </h2>
        {technicalData ? (
          <div className="space-y-4">
            <p className="text-gray-700">
              <span className="font-bold">Moving Average (14):</span>{" "}
              {technicalData.movingAverage.toFixed(2)}
            </p>
            <p className="text-gray-700">
              <span className="font-bold">RSI (14):</span>{" "}
              {technicalData.rsi.toFixed(2)}
            </p>
            <div className="text-gray-700">
              <span className="font-bold">Bollinger Bands:</span>
              <ul className="list-disc list-inside">
                <li>
                  <span className="font-semibold">Upper:</span>{" "}
                  {technicalData.bollingerBands.upper.toFixed(2)}
                </li>
                <li>
                  <span className="font-semibold">Lower:</span>{" "}
                  {technicalData.bollingerBands.lower.toFixed(2)}
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-center">Loading...</p>
        )}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onRequestClose}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default TechnicalAnalysisModal;
