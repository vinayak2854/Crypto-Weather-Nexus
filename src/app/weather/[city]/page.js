"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchWeatherData } from "../../../store/slices/weatherSlice";
import { useSelector } from "react-redux";
import { formatTemperature, getWeatherIcon } from "../../../utils/helpers";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function CityDetails({ params }) {
  const dispatch = useDispatch();
  const city = decodeURIComponent(params.city);
  const { cities } = useSelector((state) => state.weather);
  const [historicalData, setHistoricalData] = useState([]);

  useEffect(() => {
    dispatch(fetchWeatherData(city));
    // Fetch historical data (mock data for now)
    const mockHistoricalData = Array.from({ length: 24 }, (_, i) => ({
      time: `${i}:00`,
      temperature: Math.random() * 10 + 15,
      humidity: Math.random() * 20 + 60,
    }));
    setHistoricalData(mockHistoricalData);
  }, [dispatch, city]);

  const cityData = cities[city];

  if (!cityData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading weather data...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {city} Weather
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Temperature</h3>
            <p className="text-3xl font-bold text-gray-900">
              {formatTemperature(cityData.main.temp)}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Humidity</h3>
            <p className="text-3xl font-bold text-gray-900">
              {cityData.main.humidity}%
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Conditions</h3>
            <div className="flex items-center">
              <img
                src={getWeatherIcon(cityData.weather[0].icon)}
                alt={cityData.weather[0].description}
                className="w-12 h-12"
              />
              <p className="text-xl font-semibold text-gray-900 capitalize">
                {cityData.weather[0].description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">
          24-Hour Temperature History
        </h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="temperature"
                stroke="#8884d8"
                name="Temperature (°C)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Additional Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium text-gray-900">Wind Speed</h3>
            <p className="text-gray-600">{cityData.wind.speed} m/s</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Pressure</h3>
            <p className="text-gray-600">{cityData.main.pressure} hPa</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Feels Like</h3>
            <p className="text-gray-600">
              {formatTemperature(cityData.main.feels_like)}
            </p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Visibility</h3>
            <p className="text-gray-600">{cityData.visibility / 1000} km</p>
          </div>
        </div>
      </div>
    </div>
  );
}
