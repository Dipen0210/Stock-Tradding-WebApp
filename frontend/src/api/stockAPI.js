const basePath = "https://finnhub.io/api/v1";
const basePath2 = "https://www.alphavantage.co";
/**
 * Searches best stock matches based on a user's query
 * @param {string} query - The user's query, e.g. 'fb'
 * @returns {Promise<Object[]>} Response array of best stock matches
 */
export const searchSymbol = async (query) => {
  const url = `${basePath}/search?q=${query}&token=${process.env.REACT_APP_API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  return await response.json();
};

/**
 * Fetches the details of a given company
 * @param {string} stockSymbol - Symbol of the company, e.g. 'FB'
 * @returns {Promise<Object>} Response object
 */
export const fetchStockDetails = async (stockSymbol) => {
  const url = `${basePath}/stock/profile2?symbol=${stockSymbol}&token=${process.env.REACT_APP_API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  return await response.json();
};

/**
 * Fetches the latest quote of a given stock
 * @param {string} stockSymbol - Symbol of the company, e.g. 'FB'
 * @returns {Promise<Object>} Response object
 */
export const fetchQuote = async (stockSymbol) => {
  const url = `${basePath}/quote?symbol=${stockSymbol}&token=${process.env.REACT_APP_API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  return await response.json();
};

/**
 * Fetch intraday data
 * @param {string} stockSymbol - Stock symbol, e.g., "IBM"
 * @returns {Promise<Object[]>} - Formatted intraday data
 */
export const fetchIntradayData = async (stockSymbol) => {
  const url = `${basePath2}/query?function=TIME_SERIES_INTRADAY&symbol=${stockSymbol}&interval=5min&apikey=${process.env.REACT_APP_API_KEY2}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Intraday API Error: ${response.status}`);
  }

  const result = await response.json();
  const timeSeries = result["Time Series (5min)"];
  if (!timeSeries) throw new Error("No intraday data found.");

  return Object.entries(timeSeries).map(([date, values]) => ({
    date,
    value: parseFloat(values["4. close"]),
  }));
};

/**
 * Fetch daily data
 */
export const fetchDailyData = async (stockSymbol) => {
  const url = `${basePath2}/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&apikey=${process.env.REACT_APP_API_KEY2}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Daily API Error: ${response.status}`);
  }

  const result = await response.json();
  const timeSeries = result["Time Series (Daily)"];
  if (!timeSeries) throw new Error("No daily data found.");

  return Object.entries(timeSeries).map(([date, values]) => ({
    date,
    value: parseFloat(values["4. close"]),
  }));
};

/**
 * Fetch weekly data
 */
export const fetchWeeklyData = async (stockSymbol) => {
  const url = `${basePath2}/query?function=TIME_SERIES_WEEKLY&symbol=${stockSymbol}&apikey=${process.env.REACT_APP_API_KEY2}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Weekly API Error: ${response.status}`);
  }

  const result = await response.json();
  const timeSeries = result["Weekly Time Series"];
  if (!timeSeries) throw new Error("No weekly data found.");

  return Object.entries(timeSeries).map(([date, values]) => ({
    date,
    value: parseFloat(values["4. close"]),
  }));
};

/**
 * Fetch monthly data
 */
export const fetchMonthlyData = async (stockSymbol) => {
  const url = `${basePath2}/query?function=TIME_SERIES_MONTHLY&symbol=${stockSymbol}&apikey=${process.env.REACT_APP_API_KEY2}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Monthly API Error: ${response.status}`);
  }

  const result = await response.json();
  const timeSeries = result["Monthly Time Series"];
  if (!timeSeries) throw new Error("No monthly data found.");

  return Object.entries(timeSeries).map(([date, values]) => ({
    date,
    value: parseFloat(values["4. close"]),
  }));
};


/**
 * Fetches news articles for the given category
 * @param {string} category - The news category (e.g., "general", "technology")
 * @returns {Promise<Object[]>} Array of news articles
 */
export const fetchNews = async (category = "general") => {
  const url = `${basePath}/news?category=${category}&token=${process.env.REACT_APP_API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`;
    throw new Error(message);
  }

  return await response.json();
};
