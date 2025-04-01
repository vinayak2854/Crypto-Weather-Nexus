"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchWeatherData } from "../../store/slices/weatherSlice";
import WeatherSection from "../../components/WeatherSection";

export default function WeatherPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWeatherData("New York"));
    dispatch(fetchWeatherData("London"));
    dispatch(fetchWeatherData("Tokyo"));
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Weather Dashboard
      </h1>
      <WeatherSection />
    </div>
  );
}
