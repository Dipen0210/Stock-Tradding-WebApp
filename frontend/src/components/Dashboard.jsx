import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { addToWatchlist } from "../api/watchlistAPI";
import StockContext from "../context/StockContext";
import { fetchStockDetails, fetchQuote } from "../api/stockAPI";
import BuyModal from "./Buy";
import SellModal from "./Sell";
import TechnicalAnalysisModal from "./TechnicalAnalysis"; // New modal for technical analysis
import "../components/stylecomp/Home.css";
import Chart from "./Chart";
import Overview from "./Overview";
import Details from "./Details";

const Dashboard = ({ token }) => {
  const { stockSymbol, setStockSymbol } = useContext(StockContext);
  const { symbol } = useParams();
  const navigate = useNavigate();

  const [stockDetails, setStockDetails] = useState({});
  const [quote, setQuote] = useState({});
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [isTechnicalModalOpen, setIsTechnicalModalOpen] = useState(false); // State for technical analysis modal

  useEffect(() => {
    if (symbol && symbol !== stockSymbol) {
      setStockSymbol(symbol);
    }
  }, [symbol, stockSymbol, setStockSymbol]);

  useEffect(() => {
    const updateStockDetails = async () => {
      try {
        const result = await fetchStockDetails(stockSymbol);
        setStockDetails(result);
      } catch (error) {
        setStockDetails({});
        console.log(error);
      }
    };

    const updateStockOverview = async () => {
      try {
        const result = await fetchQuote(stockSymbol);
        setQuote(result);
      } catch (error) {
        setQuote({});
        console.log(error);
      }
    };

    if (stockSymbol) {
      updateStockDetails();
      updateStockOverview();
    }
  }, [stockSymbol]);

  const handleAddToWatchlist = async () => {
    try {
      if (!token) {
        console.error("Token is missing or invalid.");
        return;
      }
      const companyName = stockDetails.name || "Company";
      await addToWatchlist(stockSymbol, companyName, token);
      alert(`${companyName} added to your watchlist!`);
    } catch (err) {
      console.error("Error adding to watchlist:", err.response?.data || err.message);
    }
  };

  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-8 md:grid-rows-7 xl:grid-rows-5 auto-rows-fr gap-6 p-10 font-quicksand">
      <div className="col-span-1 md:col-span-2 xl:col-span-3 row-span-1 flex items-center justify-between">
        <button onClick={() => navigate("/portfolio")} className="text-blue-500">
          Back to Portfolio
        </button>
        <button onClick={handleAddToWatchlist} className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Watch
        </button>
        <button onClick={() => setIsBuyModalOpen(true)} className="bg-green-500 text-white px-4 py-2 rounded-md">
          Buy
        </button>
        <button onClick={() => setIsSellModalOpen(true)} className="bg-red-500 text-white px-4 py-2 rounded-md">
          Sell
        </button>
        <button
          onClick={() => setIsTechnicalModalOpen(true)}
          className="bg-purple-500 text-white px-4 py-2 rounded-md"
        >
          Technical Analysis
        </button>
      </div>
      <div className="md:col-span-2 row-span-4">
        <Chart />
      </div>
      <div>
        <Overview
          symbol={stockSymbol}
          price={quote.pc}
          change={quote.d}
          changePercent={quote.dp}
          currency={stockDetails.currency}
        />
      </div>
      <div className="row-span-2 xl:row-span-3">
        <Details details={stockDetails} />
      </div>

      <BuyModal
        isOpen={isBuyModalOpen}
        onRequestClose={() => setIsBuyModalOpen(false)}
        stockSymbol={stockSymbol}
        token={token}
      />

      <SellModal
        isOpen={isSellModalOpen}
        onRequestClose={() => setIsSellModalOpen(false)}
        stockSymbol={stockSymbol}
        token={token}
      />

      <TechnicalAnalysisModal
        isOpen={isTechnicalModalOpen}
        onRequestClose={() => setIsTechnicalModalOpen(false)}
        stockSymbol={stockSymbol}
      />
    </div>
  );
};

export default Dashboard;
