"use client";

import { useSelector } from "react-redux";
import { formatDate } from "../utils/helpers";

export default function NewsSection() {
  const { articles, loading, error } = useSelector((state) => state.news);

  if (loading) {
    return (
      <div className="card">
        <h2 className="card-title">Latest News</h2>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-20 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <h2 className="card-title">Latest News</h2>
        <div className="text-red-500 space-y-2">
          <p>Error loading news data:</p>
          <p className="text-sm">{error}</p>
          <p className="text-xs text-gray-500">
            Please check if the API key is properly configured in your
            environment variables.
          </p>
        </div>
      </div>
    );
  }

  if (!articles || articles.length === 0) {
    return (
      <div className="card">
        <h2 className="card-title">Latest News</h2>
        <div className="text-gray-500">No news articles available.</div>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="card-title">Latest News</h2>
      <div className="space-y-4">
        {articles.map((article, index) => (
          <a
            key={index}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-start space-x-4">
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-20 h-20 object-cover rounded"
                  onError={(e) => {
                    e.target.src = "/placeholder-image.jpg";
                  }}
                />
              )}
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {article.source.name} • {formatDate(article.publishedAt)}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
