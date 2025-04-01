import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  history: [],
  preferences: {
    crypto: {
      enabled: true,
      threshold: 2, // percentage
      types: ["price", "volume"],
    },
    weather: {
      enabled: true,
      temperature: {
        high: 30,
        low: 5,
      },
      wind: {
        high: 20,
      },
      rain: {
        high: 0.5,
      },
    },
  },
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.history.unshift({
        id: Date.now(),
        timestamp: new Date().toISOString(),
        ...action.payload,
      });
      // Keep only last 50 notifications
      if (state.history.length > 50) {
        state.history.pop();
      }
    },
    updatePreferences: (state, action) => {
      state.preferences = {
        ...state.preferences,
        ...action.payload,
      };
    },
    clearHistory: (state) => {
      state.history = [];
    },
  },
});

export const { addNotification, updatePreferences, clearHistory } =
  notificationSlice.actions;

export default notificationSlice.reducer;
