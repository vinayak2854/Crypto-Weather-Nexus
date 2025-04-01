"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeatherData } from "@/store/slices/weatherSlice";
import { toggleFavoriteCity } from "@/store/slices/preferencesSlice";
import { formatTemperature, getWeatherIcon } from "@/utils/helpers";
import { Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function WeatherSection() {
  const dispatch = useDispatch();
  const {
    data: cities,
    loading,
    error,
  } = useSelector((state) => state.weather);
  const favoriteCities = useSelector(
    (state) => state.preferences?.weather?.favoriteCities || []
  );

  useEffect(() => {
    dispatch(fetchWeatherData());
    const interval = setInterval(() => {
      dispatch(fetchWeatherData());
    }, 300000); // Refresh every 5 minutes

    return () => clearInterval(interval);
  }, [dispatch]);

  if (loading) {
    return (
      <div className="card">
        <h2 className="card-title">Weather</h2>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <h2 className="card-title">Weather</h2>
        <div className="text-red-600">Error loading weather data</div>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="card-title">Weather</h2>
      <div className="space-y-4">
        {Object.entries(cities || {}).map(([city, data]) => {
          if (!data) return null;
          const isFavorite = favoriteCities.includes(city);
          return (
            <div
              key={city}
              className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 relative">
                    <img
                      src={getWeatherIcon(data.weather[0].icon)}
                      alt={data.weather[0].description}
                      className="w-full h-full"
                      width={48}
                      height={48}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      <Link
                        href={`/weather/${city}`}
                        className="hover:text-blue-600"
                      >
                        {city}
                      </Link>
                    </h3>
                    <p className="text-gray-600">
                      {formatTemperature(data.main.temp)}°C
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => dispatch(toggleFavoriteCity(city))}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${isFavorite ? "text-red-500" : ""}`}
                    fill={isFavorite ? "currentColor" : "none"}
                  />
                </button>
              </div>
              <div className="mt-2 grid grid-cols-3 gap-2 text-sm text-gray-600">
                <div>Humidity: {data.main.humidity}%</div>
                <div>Wind: {data.wind.speed} m/s</div>
                <div>
                  Feels like: {formatTemperature(data.main.feels_like)}°C
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
