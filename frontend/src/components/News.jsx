import React, { useState, useEffect } from "react";
import { fetchNews } from "../api/stockAPI";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNewsArticles = async () => {
      try {
        setLoading(true);
        const articles = await fetchNews("general");
        setNews(articles);
      } catch (err) {
        setError("Failed to load news articles.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsArticles();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-100 to-purple-200">
        <div className="text-xl font-semibold text-gray-800">Loading News...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-red-100 to-yellow-200">
        <p className="text-red-600 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-quicksand">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-teal-600">Latest News</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((article, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105"
            >
              <h3 className="font-semibold text-xl text-gray-800 mb-2">{article.headline}</h3>
              <p className="text-sm text-gray-600 mb-4">{article.summary}</p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-semibold hover:underline mt-auto"
              >
                Read More
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
