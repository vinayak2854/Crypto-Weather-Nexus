import { store } from "../store";
import { addNotification } from "../store/slices/notificationSlice";

class WeatherAlertService {
  constructor() {
    this.alertInterval = null;
  }

  startAlerts() {
    // Check for weather alerts every 5 minutes
    this.alertInterval = setInterval(() => {
      const { cities } = store.getState().weather;
      const { preferences } = store.getState().notifications;

      if (!preferences.weather.enabled) return;

      Object.entries(cities).forEach(([city, data]) => {
        if (!data) return;

        const thresholds = preferences.weather;

        // Temperature alerts
        if (data.main.temp > thresholds.temperature.high) {
          store.dispatch(
            addNotification({
              type: "weather",
              icon: "🌡️",
              message: `High temperature alert for ${city}: ${data.main.temp}°C`,
            })
          );
        } else if (data.main.temp < thresholds.temperature.low) {
          store.dispatch(
            addNotification({
              type: "weather",
              icon: "❄️",
              message: `Low temperature alert for ${city}: ${data.main.temp}°C`,
            })
          );
        }

        // Wind alerts
        if (data.wind.speed > thresholds.wind.high) {
          store.dispatch(
            addNotification({
              type: "weather",
              icon: "💨",
              message: `High wind alert for ${city}: ${data.wind.speed} m/s`,
            })
          );
        }

        // Rain alerts
        if (data.rain && data.rain["1h"] > thresholds.rain.high) {
          store.dispatch(
            addNotification({
              type: "weather",
              icon: "🌧️",
              message: `Heavy rain alert for ${city}: ${data.rain["1h"]} mm/h`,
            })
          );
        }

        // Humidity alerts
        if (data.main.humidity > 80) {
          store.dispatch(
            addNotification({
              type: "weather",
              icon: "💧",
              message: `High humidity alert for ${city}: ${data.main.humidity}%`,
            })
          );
        }

        // Pressure alerts
        if (data.main.pressure < 1000) {
          store.dispatch(
            addNotification({
              type: "weather",
              icon: "🌪️",
              message: `Low pressure alert for ${city}: ${data.main.pressure} hPa`,
            })
          );
        }

        // Visibility alerts
        if (data.visibility < 1000) {
          store.dispatch(
            addNotification({
              type: "weather",
              icon: "🌫️",
              message: `Low visibility alert for ${city}: ${data.visibility}m`,
            })
          );
        }

        // Snow alerts (if available)
        if (data.snow && data.snow["1h"] > 0) {
          store.dispatch(
            addNotification({
              type: "weather",
              icon: "❄️",
              message: `Snow alert for ${city}: ${data.snow["1h"]}mm`,
            })
          );
        }
      });
    }, 300000); // Check every 5 minutes
  }

  stopAlerts() {
    if (this.alertInterval) {
      clearInterval(this.alertInterval);
      this.alertInterval = null;
    }
  }
}

export const weatherAlertService = new WeatherAlertService();
