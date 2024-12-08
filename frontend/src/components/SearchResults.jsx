import React, { useContext } from "react";
import StockContext from "../context/StockContext";
import { useNavigate } from "react-router-dom";

const SearchResults = ({ results }) => {
  const { setStockSymbol } = useContext(StockContext);
  const navigate = useNavigate();

  const handleSelect = (symbol) => {
    setStockSymbol(symbol); // Update selected stock symbol
    navigate(`/stock/${symbol}`); // Redirect to stock page
  };

  return (
    <ul className="absolute top-12 border-2 w-full rounded-md h-64 overflow-y-scroll bg-white shadow-md z-50">
      {results.map((item) => (
        <li
          key={item.symbol}
          className="cursor-pointer p-4 m-2 flex items-center justify-between rounded-md hover:bg-gray-200"
          onClick={() => handleSelect(item.symbol)}
        >
          <span>{item.symbol}</span>
          <span>{item.description}</span>
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;
