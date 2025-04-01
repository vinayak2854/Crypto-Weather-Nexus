import { store } from "../store";
import {
  updateCryptoPrice,
  setWebSocketStatus,
} from "../store/slices/cryptoSlice";
import { addNotification } from "../store/slices/notificationSlice";

class WebSocketService {
  constructor() {
    this.socket = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 1000;
    this.previousPrices = {};
  }

  connect() {
    try {
      this.socket = new WebSocket(
        "wss://ws.coincap.io/prices?assets=bitcoin,ethereum,binancecoin,cardano,solana,ripple"
      );

      this.socket.onopen = () => {
        console.log("WebSocket connected");
        store.dispatch(setWebSocketStatus(true));
        this.reconnectAttempts = 0;
        store.dispatch(
          addNotification({
            type: "system",
            icon: "🔌",
            message: "Real-time price updates connected",
          })
        );
      };

      this.socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const { preferences } = store.getState().notifications;

        if (!preferences.crypto.enabled) return;

        Object.entries(data).forEach(([id, price]) => {
          const previousPrice = this.previousPrices[id];
          const priceChange = previousPrice
            ? ((price - previousPrice) / previousPrice) * 100
            : 0;

          // Show notification for significant price changes based on preferences
          if (Math.abs(priceChange) > preferences.crypto.threshold) {
            store.dispatch(
              addNotification({
                type: "crypto",
                icon: priceChange > 0 ? "📈" : "📉",
                message: `${id.toUpperCase()} price ${
                  priceChange > 0 ? "increased" : "decreased"
                } by ${Math.abs(priceChange).toFixed(2)}%`,
              })
            );
          }

          this.previousPrices[id] = price;
          store.dispatch(updateCryptoPrice({ id, price }));
        });
      };

      this.socket.onclose = () => {
        console.log("WebSocket disconnected");
        store.dispatch(setWebSocketStatus(false));
        store.dispatch(
          addNotification({
            type: "system",
            icon: "⚠️",
            message: "Real-time price updates disconnected",
          })
        );
        this.handleReconnect();
      };

      this.socket.onerror = (error) => {
        console.error("WebSocket error:", error);
        store.dispatch(setWebSocketStatus(false));
        store.dispatch(
          addNotification({
            type: "system",
            icon: "❌",
            message: "Connection error. Attempting to reconnect...",
          })
        );
      };
    } catch (error) {
      console.error("WebSocket connection error:", error);
      this.handleReconnect();
    }
  }

  handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay =
        this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);
      setTimeout(() => {
        console.log(
          `Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`
        );
        this.connect();
      }, delay);
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
      store.dispatch(setWebSocketStatus(false));
    }
  }
}

export const websocketService = new WebSocketService();
