import { format } from "date-fns";

export const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const formatPercentage = (value) => {
  return `${value > 0 ? "+" : ""}${value.toFixed(2)}%`;
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const formatTemperature = (temp) => {
  return `${Math.round(temp)}°C`;
};

export const getWeatherIcon = (code) => {
  return `https://openweathermap.org/img/wn/${code}@2x.png`;
};

export const calculatePriceChange = (currentPrice, previousPrice) => {
  return ((currentPrice - previousPrice) / previousPrice) * 100;
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
