"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchCryptoData } from "@/store/slices/cryptoSlice";
import { formatCurrency, formatPercentage } from "@/utils/helpers";
import Link from "next/link";
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clock,
  Activity,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function CryptoDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { cryptos, loading, error } = useSelector((state) => state.crypto);
  const [timeRange, setTimeRange] = useState("24h");
  const [historicalData, setHistoricalData] = useState(null);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    dispatch(fetchCryptoData());
    // Fetch historical data
    fetchHistoricalData();
  }, [dispatch, id, timeRange]);

  const fetchHistoricalData = async () => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${
          timeRange === "24h" ? 1 : timeRange === "7d" ? 7 : 30
        }`
      );
      const data = await response.json();
      setHistoricalData(data);

      // Format data for the chart
      const formattedData = data.prices.map(([timestamp, price]) => ({
        date: new Date(timestamp).toLocaleString(),
        price: price,
      }));
      setChartData(formattedData);
    } catch (error) {
      console.error("Error fetching historical data:", error);
    }
  };

  const crypto = cryptos[id];

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !crypto) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h2 className="text-red-800 font-semibold">Error</h2>
          <p className="text-red-600">{error || "Cryptocurrency not found"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </Link>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {crypto.name} ({crypto.symbol.toUpperCase()})
            </h1>
            <p className="text-gray-600">Rank #{crypto.market_cap_rank}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(crypto.current_price)}
            </p>
            <p
              className={`inline-flex items-center ${
                crypto.price_change_percentage_24h >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {crypto.price_change_percentage_24h >= 0 ? (
                <TrendingUp className="w-4 h-4 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 mr-1" />
              )}
              {formatPercentage(crypto.price_change_percentage_24h)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center text-gray-600 mb-2">
              <DollarSign className="w-4 h-4 mr-2" />
              <span className="text-sm">Market Cap</span>
            </div>
            <p className="text-xl font-semibold text-gray-900">
              {formatCurrency(crypto.market_cap)}
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center text-gray-600 mb-2">
              <Activity className="w-4 h-4 mr-2" />
              <span className="text-sm">24h Volume</span>
            </div>
            <p className="text-xl font-semibold text-gray-900">
              {formatCurrency(crypto.total_volume)}
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center text-gray-600 mb-2">
              <Clock className="w-4 h-4 mr-2" />
              <span className="text-sm">Last Updated</span>
            </div>
            <p className="text-xl font-semibold text-gray-900">
              {new Date(crypto.last_updated).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Historical Pricing
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setTimeRange("24h")}
              className={`px-3 py-1 rounded ${
                timeRange === "24h"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              24h
            </button>
            <button
              onClick={() => setTimeRange("7d")}
              className={`px-3 py-1 rounded ${
                timeRange === "7d"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              7d
            </button>
            <button
              onClick={() => setTimeRange("30d")}
              className={`px-3 py-1 rounded ${
                timeRange === "30d"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              30d
            </button>
          </div>
        </div>

        {chartData.length > 0 ? (
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return timeRange === "24h"
                      ? date.toLocaleTimeString()
                      : date.toLocaleDateString();
                  }}
                />
                <YAxis
                  tickFormatter={(value) => formatCurrency(value)}
                  domain={["auto", "auto"]}
                />
                <Tooltip
                  formatter={(value) => [formatCurrency(value), "Price"]}
                  labelFormatter={(label) => new Date(label).toLocaleString()}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">Loading historical data...</p>
          </div>
        )}
      </div>
    </div>
  );
}
