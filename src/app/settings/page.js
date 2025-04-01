"use client";

import { useSelector, useDispatch } from "react-redux";
import {
  toggleFavoriteCity,
  toggleFavoriteCrypto,
  setWeatherUnits,
  setCryptoCurrency,
  setWeatherRefreshInterval,
  setCryptoRefreshInterval,
  toggleWeatherNotifications,
  toggleCryptoNotifications,
  setWeatherNotificationThreshold,
  setCryptoNotificationThreshold,
  initializePreferences,
} from "@/store/slices/preferencesSlice";
import { useState, useEffect } from "react";

export default function SettingsPage() {
  const dispatch = useDispatch();
  const preferences = useSelector((state) => state.preferences);
  const { weather, crypto, notifications } = preferences;

  const [newCity, setNewCity] = useState("");
  const [newCrypto, setNewCrypto] = useState("");

  // Initialize preferences from localStorage after component mounts
  useEffect(() => {
    dispatch(initializePreferences());
  }, [dispatch]);

  const handleAddCity = (e) => {
    e.preventDefault();
    if (newCity && !weather.favoriteCities.includes(newCity)) {
      dispatch(toggleFavoriteCity(newCity));
      setNewCity("");
    }
  };

  const handleAddCrypto = (e) => {
    e.preventDefault();
    if (newCrypto && !crypto.favoriteCryptos.includes(newCrypto)) {
      dispatch(toggleFavoriteCrypto(newCrypto));
      setNewCrypto("");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>

      {/* Weather Settings */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Weather Settings
        </h2>

        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Favorite Cities
          </h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {weather.favoriteCities.map((city) => (
              <span
                key={city}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center"
              >
                {city}
                <button
                  onClick={() => dispatch(toggleFavoriteCity(city))}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <form
            onSubmit={handleAddCity}
            className="flex flex-col sm:flex-row gap-2"
          >
            <input
              type="text"
              value={newCity}
              onChange={(e) => setNewCity(e.target.value)}
              placeholder="Add a city"
              className="w-full sm:flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add
            </button>
          </form>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Units</h3>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="metric"
                checked={weather.units === "metric"}
                onChange={(e) => dispatch(setWeatherUnits(e.target.value))}
                className="mr-2"
              />
              Metric (°C)
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="imperial"
                checked={weather.units === "imperial"}
                onChange={(e) => dispatch(setWeatherUnits(e.target.value))}
                className="mr-2"
              />
              Imperial (°F)
            </label>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Refresh Interval
          </h3>
          <select
            value={weather.refreshInterval}
            onChange={(e) =>
              dispatch(setWeatherRefreshInterval(Number(e.target.value)))
            }
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={300000}>5 minutes</option>
            <option value={600000}>10 minutes</option>
            <option value={900000}>15 minutes</option>
          </select>
        </div>
      </div>

      {/* Crypto Settings */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Cryptocurrency Settings
        </h2>

        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Favorite Cryptocurrencies
          </h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {crypto.favoriteCryptos.map((crypto) => (
              <span
                key={crypto}
                className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center"
              >
                {crypto}
                <button
                  onClick={() => dispatch(toggleFavoriteCrypto(crypto))}
                  className="ml-2 text-purple-600 hover:text-purple-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <form
            onSubmit={handleAddCrypto}
            className="flex flex-col sm:flex-row gap-2"
          >
            <input
              type="text"
              value={newCrypto}
              onChange={(e) => setNewCrypto(e.target.value)}
              placeholder="Add a cryptocurrency"
              className="w-full sm:flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Add
            </button>
          </form>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Currency</h3>
          <select
            value={crypto.currency}
            onChange={(e) => dispatch(setCryptoCurrency(e.target.value))}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            <option value="gbp">GBP</option>
          </select>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Refresh Interval
          </h3>
          <select
            value={crypto.refreshInterval}
            onChange={(e) =>
              dispatch(setCryptoRefreshInterval(Number(e.target.value)))
            }
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value={60000}>1 minute</option>
            <option value={300000}>5 minutes</option>
            <option value={600000}>10 minutes</option>
          </select>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Notification Settings
        </h2>

        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Weather Notifications
          </h3>
          <div className="flex items-center justify-between mb-4">
            <span>Enable weather alerts</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.weather.enabled}
                onChange={() => dispatch(toggleWeatherNotifications())}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <span>Temperature change threshold (°C)</span>
            <input
              type="number"
              value={notifications.weather.threshold}
              onChange={(e) =>
                dispatch(
                  setWeatherNotificationThreshold(Number(e.target.value))
                )
              }
              className="w-20 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Crypto Notifications
          </h3>
          <div className="flex items-center justify-between mb-4">
            <span>Enable price alerts</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.crypto.enabled}
                onChange={() => dispatch(toggleCryptoNotifications())}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <span>Price change threshold (%)</span>
            <input
              type="number"
              value={notifications.crypto.threshold}
              onChange={(e) =>
                dispatch(setCryptoNotificationThreshold(Number(e.target.value)))
              }
              className="w-20 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
