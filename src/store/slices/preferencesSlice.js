import { createSlice } from "@reduxjs/toolkit";

const defaultPreferences = {
  weather: {
    favoriteCities: [],
    units: "metric", // metric or imperial
    refreshInterval: 300000, // 5 minutes in milliseconds
  },
  crypto: {
    favoriteCryptos: [],
    currency: "usd",
    refreshInterval: 60000, // 1 minute in milliseconds
  },
  notifications: {
    weather: {
      enabled: true,
      threshold: 5, // temperature change threshold in Celsius
    },
    crypto: {
      enabled: true,
      threshold: 2, // price change threshold in percentage
    },
  },
};

// Load preferences from localStorage or use default values
const loadPreferences = () => {
  // Always return default preferences during server-side rendering
  if (typeof window === "undefined") return defaultPreferences;

  try {
    const savedPreferences = localStorage.getItem("preferences");
    return savedPreferences ? JSON.parse(savedPreferences) : defaultPreferences;
  } catch (error) {
    console.error("Error loading preferences:", error);
    return defaultPreferences;
  }
};

// Initialize with default preferences
const initialState = defaultPreferences;

const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    toggleFavoriteCity: (state, action) => {
      const city = action.payload;
      const index = state.weather.favoriteCities.indexOf(city);
      if (index === -1) {
        state.weather.favoriteCities.push(city);
      } else {
        state.weather.favoriteCities.splice(index, 1);
      }
      // Save to localStorage
      localStorage.setItem("preferences", JSON.stringify(state));
    },
    toggleFavoriteCrypto: (state, action) => {
      const crypto = action.payload;
      const index = state.crypto.favoriteCryptos.indexOf(crypto);
      if (index === -1) {
        state.crypto.favoriteCryptos.push(crypto);
      } else {
        state.crypto.favoriteCryptos.splice(index, 1);
      }
      // Save to localStorage
      localStorage.setItem("preferences", JSON.stringify(state));
    },
    setWeatherUnits: (state, action) => {
      state.weather.units = action.payload;
      localStorage.setItem("preferences", JSON.stringify(state));
    },
    setCryptoCurrency: (state, action) => {
      state.crypto.currency = action.payload;
      localStorage.setItem("preferences", JSON.stringify(state));
    },
    setWeatherRefreshInterval: (state, action) => {
      state.weather.refreshInterval = action.payload;
      localStorage.setItem("preferences", JSON.stringify(state));
    },
    setCryptoRefreshInterval: (state, action) => {
      state.crypto.refreshInterval = action.payload;
      localStorage.setItem("preferences", JSON.stringify(state));
    },
    toggleWeatherNotifications: (state) => {
      state.notifications.weather.enabled =
        !state.notifications.weather.enabled;
      localStorage.setItem("preferences", JSON.stringify(state));
    },
    toggleCryptoNotifications: (state) => {
      state.notifications.crypto.enabled = !state.notifications.crypto.enabled;
      localStorage.setItem("preferences", JSON.stringify(state));
    },
    setWeatherNotificationThreshold: (state, action) => {
      state.notifications.weather.threshold = action.payload;
      localStorage.setItem("preferences", JSON.stringify(state));
    },
    setCryptoNotificationThreshold: (state, action) => {
      state.notifications.crypto.threshold = action.payload;
      localStorage.setItem("preferences", JSON.stringify(state));
    },
    setPreferences: (state, action) => {
      Object.assign(state, action.payload);
    },
  },
});

// Add a new action to initialize preferences from localStorage
export const initializePreferences = () => (dispatch) => {
  const preferences = loadPreferences();
  dispatch(preferencesSlice.actions.setPreferences(preferences));
};

export const {
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
  setPreferences,
} = preferencesSlice.actions;

export default preferencesSlice.reducer;
