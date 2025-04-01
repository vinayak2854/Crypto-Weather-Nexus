import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const NEWS_API_URL = "https://newsapi.org/v2";

export const fetchCryptoNews = createAsyncThunk(
  "news/fetchCryptoNews",
  async () => {
    const response = await axios.get(
      `${NEWS_API_URL}/everything?q=cryptocurrency&apiKey=${NEWS_API_KEY}&language=en&pageSize=5`
    );
    return response.data.articles;
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
