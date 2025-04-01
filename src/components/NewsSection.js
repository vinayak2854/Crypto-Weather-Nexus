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
        <div className="text-red-500">Error loading news data</div>
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
