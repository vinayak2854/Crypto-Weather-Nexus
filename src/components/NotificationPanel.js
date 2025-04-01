import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearHistory,
  updatePreferences,
} from "@/store/slices/notificationSlice";
import { formatDistanceToNow } from "date-fns";

export default function NotificationPanel({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const { history, preferences } = useSelector((state) => state.notifications);
  const [activeTab, setActiveTab] = useState("history");

  const handlePreferenceChange = (section, field, value) => {
    dispatch(
      updatePreferences({
        [section]: {
          ...preferences[section],
          [field]: value,
        },
      })
    );
  };

  return (
    <div
      className={`fixed inset-y-0 right-0 w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="h-full flex flex-col">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Notifications</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="flex border-b">
          <button
            className={`flex-1 py-2 px-4 ${
              activeTab === "history"
                ? "border-b-2 border-indigo-500 text-indigo-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("history")}
          >
            History
          </button>
          <button
            className={`flex-1 py-2 px-4 ${
              activeTab === "preferences"
                ? "border-b-2 border-indigo-500 text-indigo-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("preferences")}
          >
            Preferences
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {activeTab === "history" ? (
            <div className="p-4">
              {history.length === 0 ? (
                <p className="text-gray-500 text-center">
                  No notifications yet
                </p>
              ) : (
                <div className="space-y-4">
                  {history.map((notification) => (
                    <div
                      key={notification.id}
                      className="p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-start">
                        <span className="text-2xl mr-2">
                          {notification.icon}
                        </span>
                        <div>
                          <p className="text-sm">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {formatDistanceToNow(
                              new Date(notification.timestamp),
                              {
                                addSuffix: true,
                              }
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {history.length > 0 && (
                <button
                  onClick={() => dispatch(clearHistory())}
                  className="mt-4 w-full py-2 text-sm text-red-600 hover:text-red-800"
                >
                  Clear History
                </button>
              )}
            </div>
          ) : (
            <div className="p-4 space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Crypto Alerts</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={preferences.crypto.enabled}
                      onChange={(e) =>
                        handlePreferenceChange(
                          "crypto",
                          "enabled",
                          e.target.checked
                        )
                      }
                      className="mr-2"
                    />
                    Enable crypto alerts
                  </label>
                  <div className="ml-6">
                    <label className="block text-sm text-gray-600">
                      Price change threshold (%)
                    </label>
                    <input
                      type="number"
                      value={preferences.crypto.threshold}
                      onChange={(e) =>
                        handlePreferenceChange(
                          "crypto",
                          "threshold",
                          parseFloat(e.target.value)
                        )
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Weather Alerts</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={preferences.weather.enabled}
                      onChange={(e) =>
                        handlePreferenceChange(
                          "weather",
                          "enabled",
                          e.target.checked
                        )
                      }
                      className="mr-2"
                    />
                    Enable weather alerts
                  </label>
                  <div className="ml-6 space-y-4">
                    <div>
                      <label className="block text-sm text-gray-600">
                        High temperature (°C)
                      </label>
                      <input
                        type="number"
                        value={preferences.weather.temperature.high}
                        onChange={(e) =>
                          handlePreferenceChange("weather", "temperature", {
                            ...preferences.weather.temperature,
                            high: parseFloat(e.target.value),
                          })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600">
                        Low temperature (°C)
                      </label>
                      <input
                        type="number"
                        value={preferences.weather.temperature.low}
                        onChange={(e) =>
                          handlePreferenceChange("weather", "temperature", {
                            ...preferences.weather.temperature,
                            low: parseFloat(e.target.value),
                          })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600">
                        High wind speed (m/s)
                      </label>
                      <input
                        type="number"
                        value={preferences.weather.wind.high}
                        onChange={(e) =>
                          handlePreferenceChange("weather", "wind", {
                            ...preferences.weather.wind,
                            high: parseFloat(e.target.value),
                          })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600">
                        Heavy rain threshold (mm/h)
                      </label>
                      <input
                        type="number"
                        value={preferences.weather.rain.high}
                        onChange={(e) =>
                          handlePreferenceChange("weather", "rain", {
                            ...preferences.weather.rain,
                            high: parseFloat(e.target.value),
                          })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
