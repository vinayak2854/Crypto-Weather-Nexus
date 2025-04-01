"use client";

import { useSelector } from "react-redux";
import { formatCurrency, formatPercentage } from "../utils/helpers";
import { toggleFavoriteCrypto } from "../store/slices/favoritesSlice";
import { useDispatch } from "react-redux";
import { Heart } from "lucide-react";

export default function CryptoSection() {
  const dispatch = useDispatch();
  const {
    data: cryptos,
    loading,
    error,
    websocketConnected,
  } = useSelector((state) => state.crypto);
  const { cryptos: favoriteCryptos } = useSelector((state) => state.favorites);

  if (loading) {
    return (
      <div className="card">
        <h2 className="card-title">Cryptocurrency</h2>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <h2 className="card-title">Cryptocurrency</h2>
        <div className="text-red-500">
          Error loading cryptocurrency data. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="card-title">Cryptocurrency</h2>
        <div
          className={`w-2 h-2 rounded-full ${
            websocketConnected ? "bg-green-500" : "bg-red-500"
          }`}
          title={websocketConnected ? "Connected" : "Disconnected"}
        />
      </div>
      <div className="space-y-4">
        {Object.entries(cryptos || {}).map(([id, data]) => {
          if (!data) return null;
          const isFavorite = favoriteCryptos.includes(id);
          const priceChange = data.price_change_percentage_24h;
          const isPositive = priceChange > 0;

          return (
            <div
              key={id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-700">
                    {id.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 capitalize">{id}</h3>
                  <p className="text-sm text-gray-500">
                    {formatCurrency(data.current_price)}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span
                  className={`text-sm ${
                    isPositive ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {formatPercentage(priceChange)}
                </span>
                <button
                  onClick={() => dispatch(toggleFavoriteCrypto(id))}
                  className={`p-2 rounded-full transition-colors ${
                    isFavorite
                      ? "text-yellow-500 hover:text-yellow-600"
                      : "text-gray-400 hover:text-gray-500"
                  }`}
                >
                  <Heart
                    className="w-5 h-5"
                    fill={isFavorite ? "currentColor" : "none"}
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
