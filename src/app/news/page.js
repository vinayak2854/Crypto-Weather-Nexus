"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCryptoNews } from "../../store/slices/newsSlice";
import NewsSection from "../../components/NewsSection";

export default function NewsPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCryptoNews());
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Crypto News</h1>
      <NewsSection />
    </div>
  );
}
