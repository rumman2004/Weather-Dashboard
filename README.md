# 🌤️ WeatherNeu - Neumorphic Weather Dashboard

A beautiful, modern weather dashboard built with **React**, **Tailwind CSS**, and the **OpenWeatherMap API**. This project features a distinctive "Soft UI" (Neumorphism) design aesthetic, fluid animations, and a fully responsive layout.

[![WeatherNeu Dashboard](https://res.cloudinary.com/dtbytfxzs/image/upload/v1770308939/Screenshot_2026-02-05_215842_qgkptn.png)](https://weather-dashboard-beta-lilac.vercel.app/)

## ✨ Features

* **🎨 Neumorphic Design:** Soft, realistic UI with convex/concave shapes and smooth shadows.
* **🌍 Global Search:** Search for any city worldwide with autocomplete suggestions.
* **📍 Geolocation:** Automatically detects and loads weather for your current location.
* **🌡️ Real-time Data:** Displays current temperature, weather conditions, humidity, pressure, wind speed, and visibility.
* **📅 Forecasts:** Includes detailed **12-hour hourly forecast** and a **7-day daily forecast**.
* **🌥️ Environmental Details:** Shows Cloud Cover, Air Quality Index (AQI), Sunrise, and Sunset times.
* **📱 Fully Responsive:** Optimized for desktops, tablets, and mobile devices.
* **⚡ Fast Performance:** Built with Vite for lightning-fast development and production builds.

## 🛠️ Tech Stack

* **Frontend Library:** React (v18+)
* **Build Tool:** Vite
* **Styling:** Tailwind CSS (v4) + Custom CSS variables for Neumorphism
* **Icons:** Lucide React & Custom Animated SVGs
* **Data Source:** OpenWeatherMap API

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites

* Node.js (v16 or higher)
* npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/rumman2004/Weather-Dashboard.git](https://github.com/rumman2004/Weather-Dashboard.git)
    cd weather-dashboard
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    * Create a `.env` file in the root directory.
    * Add your OpenWeatherMap API key:
        ```env
        VITE_WEATHER_API_KEY=your_api_key_here
        ```
    * *Note: You can get a free API key from [OpenWeatherMap](https://openweathermap.org/api).*

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open `http://localhost:5173` in your browser to view the app.

## 📦 Building for Production

To create an optimized production build:

```bash
npm run build
```

This will generate a dist folder ready for deployment.

## 📂 Project Structure
```Structure
weather-dashboard/
├── public/              # Static assets (favicon, etc.)
├── src/
│   ├── assets/          # Images and static files
│   ├── components/      # Reusable UI components
│   │   ├── icons/       # Custom SVG animated icons
│   │   ├── Card.jsx     # Neumorphic card wrapper
│   │   ├── Loader.jsx   # Custom loading screen
│   │   ├── NavBar.jsx   # Navigation bar
│   │   ├── SearchBar.jsx # Search input with autocomplete
│   │   └── WeatherIcon.jsx # Weather condition logic
│   ├── App.jsx          # Main application logic
│   ├── index.css        # Global styles & Tailwind directives
│   └── main.jsx         # React entry point
├── .env                 # Environment variables (not committed)
├── index.html           # HTML entry point
├── tailwind.config.js   # Tailwind configuration
├── vercel.json          # Vercel deployment config
└── vite.config.js       # Vite configuration
```

## 🤝 Contributing
Contributions are welcome! If you have suggestions or improvements, please fork the repository and submit a pull request.
1. Fork the Project
2. Create your Feature Branch (git checkout -b feature/AmazingFeature)
3. Commit your Changes (git commit -m 'Add some AmazingFeature')
4. Push to the Branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.