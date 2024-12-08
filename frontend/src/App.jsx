import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Portfolio from "./components/Portfolio";
import Dashboard from "./components/Dashboard";
import News from "./components/News"; // Import the News component
import { StockProvider } from "./context/StockContext";

const App = () => {
  const token = localStorage.getItem("token");

  return (
    <StockProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/portfolio" element={<Portfolio token={token} />} />
          <Route path="/stock/:symbol" element={<Dashboard token={token} />} />
          <Route path="/dashboard/:symbol" element={<Dashboard token={token} />} />
          <Route path="/news" element={<News />} />
        </Routes>
      </Router>
    </StockProvider>
  );
};

export default App;
