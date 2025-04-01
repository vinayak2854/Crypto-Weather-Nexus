import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const COINGECKO_API_URL = "https://api.coingecko.com/api/v3";
const COINCAP_API_URL = "wss://ws.coincap.io/prices";

// Default cryptocurrencies if no favorites are set
const DEFAULT_CRYPTOS = [
  "bitcoin",
  "ethereum",
  "binancecoin",
  "cardano",
  "solana",
  "ripple",
];

export const fetchCryptoData = createAsyncThunk(
  "crypto/fetchCryptoData",
  async (_, { getState }) => {
    const { preferences } = getState();
    const cryptos =
      preferences.crypto.favoriteCryptos.length > 0
        ? preferences.crypto.favoriteCryptos
        : DEFAULT_CRYPTOS;

    try {
      const response = await axios.get(`${COINGECKO_API_URL}/simple/price`, {
        params: {
          ids: cryptos.join(","),
          vs_currencies: preferences.crypto.currency,
          include_24hr_change: true,
          include_market_cap: true,
          include_24hr_vol: true,
        },
      });

      const formattedData = {};
      Object.entries(response.data).forEach(([id, data]) => {
        formattedData[id] = {
          id,
          symbol: id,
          name: id.charAt(0).toUpperCase() + id.slice(1),
          current_price: data[preferences.crypto.currency],
          price_change_percentage_24h:
            data[`${preferences.crypto.currency}_24h_change`],
          market_cap: data[`${preferences.crypto.currency}_market_cap`],
          total_volume: data[`${preferences.crypto.currency}_24h_vol`],
          last_updated: new Date().toISOString(),
        };
      });

      return formattedData;
    } catch (error) {
      console.error("Error fetching crypto data:", error);
      throw error;
    }
  }
);

export const updateCryptoPrice = createAsyncThunk(
  "crypto/updateCryptoPrice",
  async ({ id, price }, { getState }) => {
    const { preferences } = getState();
    const { data } = getState().crypto;
    const crypto = data[id];

    if (!crypto) return null;

    const priceChange =
      ((price - crypto.current_price) / crypto.current_price) * 100;

    return {
      id,
      current_price: price,
      price_change_percentage_24h: priceChange,
      last_updated: new Date().toISOString(),
    };
  }
);

const cryptoSlice = createSlice({
  name: "crypto",
  initialState: {
    data: {},
    loading: false,
    error: null,
    lastUpdated: null,
    websocketConnected: false,
  },
  reducers: {
    setWebSocketStatus: (state, action) => {
      state.websocketConnected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCryptoData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = { ...state.data, ...action.payload };
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchCryptoData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateCryptoPrice.fulfilled, (state, action) => {
        if (action.payload) {
          const { id, ...updates } = action.payload;
          state.data[id] = { ...state.data[id], ...updates };
          state.lastUpdated = new Date().toISOString();
        }
      });
  },
});

export const { setWebSocketStatus } = cryptoSlice.actions;
export default cryptoSlice.reducer;
