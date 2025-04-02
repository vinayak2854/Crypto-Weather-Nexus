import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCryptoNews = createAsyncThunk(
  "news/fetchCryptoNews",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/news");

      if (!response.data) {
        console.error("No data received from API");
        throw new Error("No data received from news API");
      }

      if (!response.data.articles) {
        console.error("Invalid response format:", response.data);
        throw new Error("Invalid response format from news API");
      }

      console.log("Successfully fetched news articles");
      return response.data.articles;
    } catch (error) {
      console.error("Error fetching news:", error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("API Error Response:", error.response.data);
        return rejectWithValue(error.response.data.error || "API Error");
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
        return rejectWithValue("No response received from server");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up request:", error.message);
        return rejectWithValue(error.message || "Failed to fetch news data");
      }
    }
  }
);

const initialState = {
  articles: [],
  loading: false,
  error: null,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCryptoNews.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(fetchCryptoNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearError } = newsSlice.actions;
export default newsSlice.reducer;
