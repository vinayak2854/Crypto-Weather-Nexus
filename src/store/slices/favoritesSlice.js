import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cities: [],
  cryptos: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavoriteCity: (state, action) => {
      const city = action.payload;
      const index = state.cities.indexOf(city);
      if (index === -1) {
        state.cities.push(city);
      } else {
        state.cities.splice(index, 1);
      }
    },
    toggleFavoriteCrypto: (state, action) => {
      const crypto = action.payload;
      const index = state.cryptos.indexOf(crypto);
      if (index === -1) {
        state.cryptos.push(crypto);
      } else {
        state.cryptos.splice(index, 1);
      }
    },
    clearFavorites: (state) => {
      state.cities = [];
      state.cryptos = [];
    },
  },
});

export const { toggleFavoriteCity, toggleFavoriteCrypto, clearFavorites } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
