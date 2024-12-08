import React, { createContext, useState } from "react";

const StockContext = createContext();

export const StockProvider = ({ children }) => {
  const [stockSymbol, setStockSymbol] = useState("");

  return (
    <StockContext.Provider value={{ stockSymbol, setStockSymbol }}>
      {children}
    </StockContext.Provider>
  );
};

export default StockContext;
