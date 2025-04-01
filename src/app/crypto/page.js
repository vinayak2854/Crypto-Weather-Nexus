"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCryptoData } from "../../store/slices/cryptoSlice";
import CryptoSection from "../../components/CryptoSection";
import { websocketService } from "../../services/websocket";

export default function CryptoPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCryptoData("bitcoin"));
    dispatch(fetchCryptoData("ethereum"));
    dispatch(fetchCryptoData("binancecoin"));
    websocketService.connect();

    return () => {
      websocketService.disconnect();
    };
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Cryptocurrency Dashboard
      </h1>
      <CryptoSection />
    </div>
  );
}
