import React, { useContext, useEffect, useState } from "react";
import ChartFilter from "./ChartFilter";
import Card from "./Card";
import {
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  AreaChart,
  Tooltip,
} from "recharts";
import StockContext from "../context/StockContext";
import {
  fetchIntradayData,
  fetchDailyData,
  fetchWeeklyData,
  fetchMonthlyData,
} from "../api/stockAPI";

const Chart = () => {
  const [filter, setFilter] = useState("D");
  const { stockSymbol } = useContext(StockContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let result;
        switch (filter) {
          case "D": // Intraday data
            result = await fetchIntradayData(stockSymbol);
            break;
          case "W": // Daily data
            result = await fetchDailyData(stockSymbol);
            break;
          case "M": // Weekly data
            result = await fetchWeeklyData(stockSymbol);
            break;
          case "Y": // Monthly data
            result = await fetchMonthlyData(stockSymbol);
            break;
          default:
            throw new Error("Invalid filter selected.");
        }
        setData(result.reverse()); // Reverse to display oldest first
      } catch (error) {
        console.error("Error fetching chart data:", error);
        setData([]);
      }
    };

    fetchData();
  }, [stockSymbol, filter]);

  return (
    <Card>
      <ul className="flex absolute top-2 right-2 z-40">
        {["D", "W", "M", "Y"].map((item) => (
          <li key={item}>
            <ChartFilter
              text={item}
              active={filter === item}
              onClick={() => setFilter(item)}
            />
          </li>
        ))}
      </ul>
      <ResponsiveContainer>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={"rgb(199 210 254)"}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={"rgb(199 210 254)"}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <Tooltip/>
          <Area
            type="monotone"
            dataKey="value"
            stroke="#312e81"
            fill="url(#chartColor)"
            fillOpacity={1}
            strokeWidth={0.5}
          />
          <XAxis dataKey="date" />
          <YAxis domain={["dataMin", "dataMax"]} />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default Chart;
