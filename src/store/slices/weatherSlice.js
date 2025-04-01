import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const OPENWEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

// Default cities if no favorites are set
const DEFAULT_CITIES = [
  "London",
  "New York",
  "Tokyo",
  "Paris",
  "Sydney",
  "Dubai",
];

export const fetchWeatherData = createAsyncThunk(
  "weather/fetchWeatherData",
  async (_, { getState }) => {
    const { preferences } = getState();
    const cities =
      preferences.weather.favoriteCities.length > 0
        ? preferences.weather.favoriteCities
        : DEFAULT_CITIES;

    try {
      const promises = cities.map(async (city) => {
        const response = await axios.get(`${OPENWEATHER_API_URL}/weather`, {
          params: {
            q: city,
            appid: API_KEY,
            units: preferences.weather.units,
          },
        });
        return response.data;
      });

      const results = await Promise.allSettled(promises);
      const weatherData = {};

      results.forEach((result, index) => {
        if (result.status === "fulfilled") {
          const city = cities[index];
          weatherData[city] = result.value;
        } else {
          console.error(
            `Error fetching weather for ${cities[index]}:`,
            result.reason
          );
        }
      });

      return weatherData;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      throw error;
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    data: {},
    loading: false,
    error: null,
    lastUpdated: null,
  },
  reducers: {
    updateWeatherData: (state, action) => {
      state.data = { ...state.data, ...action.payload };
      state.lastUpdated = new Date().toISOString();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { updateWeatherData } = weatherSlice.actions;
export default weatherSlice.reducer;
