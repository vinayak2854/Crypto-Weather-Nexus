# Crypto-Weather-Nexus
# Crypto Weather Nexus

A modern web application that combines real-time cryptocurrency data with weather information, providing a unified dashboard for monitoring both markets and weather conditions.

## 🌟 Features

### Weather Dashboard

- Real-time weather information for favorite cities
- Support for both metric (°C) and imperial (°F) units
- Customizable refresh intervals (5, 10, or 15 minutes)
- Favorite cities management
- Weather alerts with customizable temperature thresholds

### Cryptocurrency Dashboard

- Real-time cryptocurrency price tracking
- Support for multiple currencies (USD, EUR, GBP)
- Favorite cryptocurrencies management
- Customizable refresh intervals (1, 5, or 10 minutes)
- Price alerts with customizable percentage thresholds

### Settings & Preferences

- User preferences persistence using localStorage
- Customizable notification settings for both weather and crypto
- Responsive design for all screen sizes
- Dark/Light mode support

## 🚀 Tech Stack

- **Frontend Framework**: Next.js 14
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **API Integration**:
  - Weather API
  - Cryptocurrency API

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

## 🛠️ Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/crypto-weather-nexus.git
   cd crypto-weather-nexus
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your API keys:

   ```
   NEXT_PUBLIC_WEATHER_API_KEY=your_weather_api_key
   NEXT_PUBLIC_CRYPTO_API_KEY=your_crypto_api_key
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Configuration

### Weather Settings

- Add/remove favorite cities
- Choose between metric and imperial units
- Set refresh intervals
- Configure temperature alerts

### Cryptocurrency Settings

- Add/remove favorite cryptocurrencies
- Select preferred currency (USD, EUR, GBP)
- Set refresh intervals
- Configure price change alerts

## 📱 Responsive Design

The application is fully responsive and works on:

- Desktop browsers
- Tablets
- Mobile devices

## 🔒 Security

- API keys are stored securely in environment variables
- User preferences are stored locally in the browser
- No sensitive data is transmitted to external servers

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Weather data provided by [Weather API Provider]
- Cryptocurrency data provided by [Crypto API Provider]
- Icons and UI components from [Icon/UI Library]

## 📞 Support

For support, please open an issue in the GitHub repository or contact [vinayak.vallakati@gmail.com]

---

Made with ❤️ by [Vinayak Vallakati]
