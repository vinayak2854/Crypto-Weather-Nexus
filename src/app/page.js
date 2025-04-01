"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchWeatherData } from "@/store/slices/weatherSlice";
import { fetchCryptoData } from "@/store/slices/cryptoSlice";
import { fetchCryptoNews } from "@/store/slices/newsSlice";
import WeatherSection from "@/components/WeatherSection";
import CryptoSection from "@/components/CryptoSection";
import NewsSection from "@/components/NewsSection";
import NotificationPanel from "@/components/NotificationPanel";
import { websocketService } from "@/services/websocket";
import { weatherAlertService } from "@/services/weatherAlerts";
import Link from "next/link";

export default function Dashboard() {
  const dispatch = useDispatch();
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);

  useEffect(() => {
    // Fetch initial data
    dispatch(fetchWeatherData());
    dispatch(fetchCryptoData());
    dispatch(fetchCryptoNews());

    // Initialize WebSocket connection
    websocketService.connect();

    // Start weather alerts
    weatherAlertService.startAlerts();

    // Cleanup on unmount
    return () => {
      websocketService.disconnect();
      weatherAlertService.stopAlerts();
    };
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <button
          onClick={() => setIsNotificationPanelOpen(true)}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <span className="sr-only">Notifications</span>
          🔔
        </button>
      </div>

      <NotificationPanel
        isOpen={isNotificationPanelOpen}
        onClose={() => setIsNotificationPanelOpen(false)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Weather</h2>
            <Link
              href="/weather"
              className="text-sm text-indigo-600 hover:text-indigo-800"
            >
              View Details →
            </Link>
          </div>
          <WeatherSection />
        </div>
        <div className="lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Cryptocurrency
            </h2>
            <Link
              href="/crypto"
              className="text-sm text-indigo-600 hover:text-indigo-800"
            >
              View Details →
            </Link>
          </div>
          <CryptoSection />
        </div>
        <div className="lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Latest News</h2>
            <Link
              href="/news"
              className="text-sm text-indigo-600 hover:text-indigo-800"
            >
              View Details →
            </Link>
          </div>
          <NewsSection />
        </div>
      </div>
    </div>
  );
}
