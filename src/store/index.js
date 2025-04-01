import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./slices/weatherSlice";
import cryptoReducer from "./slices/cryptoSlice";
import newsReducer from "./slices/newsSlice";
import favoritesReducer from "./slices/favoritesSlice";
import notificationReducer from "./slices/notificationSlice";
import preferencesReducer from "./slices/preferencesSlice";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    crypto: cryptoReducer,
    news: newsReducer,
    favorites: favoritesReducer,
    notifications: notificationReducer,
    preferences: preferencesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
