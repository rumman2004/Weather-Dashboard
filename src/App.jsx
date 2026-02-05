import React, { useState, useEffect } from 'react';
import { 
  Droplets, 
  Gauge, 
  Wind, 
  Eye, 
  Cloud, 
  Leaf, 
  Sunrise, 
  Sunset,
  Navigation
} from 'lucide-react';
import Card from './components/Card';
import NavBar from './components/NavBar';
import WeatherIcon from './components/WeatherIcon'; // Corrected import
import Loader from './components/Loader';
import WindSpeed from './components/icons/WindSpeed'; // Corrected import
import './index.css';

// USE ENV VARIABLE HERE
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [airQuality, setAirQuality] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState({ name: '', country: '' });

  const handleGetCurrentLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          let errorMessage = "Unknown error";
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = "User denied the request for Geolocation.";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = "Location information is unavailable.";
              break;
            case error.TIMEOUT:
              errorMessage = "The request to get user location timed out.";
              break;
            default:
              errorMessage = "An unknown error occurred.";
          }
          console.error('Geolocation error:', errorMessage);
          if (!weatherData) fetchWeatherByCity('New York');
          else setLoading(false);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetCurrentLocation();
  }, []);

  const fetchWeatherByCoords = async (lat, lon) => {
    setLoading(true);
    setError(null);
    
    try {
      const [weather, forecast, aqi] = await Promise.all([
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`).then(res => res.json()),
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`).then(res => res.json()),
        fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`).then(res => res.json())
      ]);

      if (weather.cod !== 200) throw new Error(weather.message);

      setWeatherData(weather);
      setForecastData(forecast);
      setAirQuality(aqi);
      setLocation({
        name: weather.name,
        country: weather.sys.country
      });
    } catch (err) {
      setError('Failed to fetch weather data. Please check your connection.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCity = async (cityName) => {
    setLoading(true);
    setError(null);
    
    try {
      const geoResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`
      );
      const geoData = await geoResponse.json();
      
      if (geoData.length > 0) {
        const { lat, lon } = geoData[0];
        await fetchWeatherByCoords(lat, lon);
      } else {
        setError('City not found. Please try another search.');
        setLoading(false);
      }
    } catch (err) {
      setError('Failed to fetch weather data.');
      console.error(err);
      setLoading(false);
    }
  };

  const handleLocationSelect = (locationData) => {
    fetchWeatherByCoords(locationData.lat, locationData.lon);
  };

  const getAQILevel = (aqi) => {
    const levels = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];
    const colors = ['text-green-500', 'text-yellow-500', 'text-orange-500', 'text-red-500', 'text-purple-500'];
    return { level: levels[aqi - 1] || 'Unknown', color: colors[aqi - 1] || 'text-gray-500' };
  };

  const getDailyForecast = () => {
    if (!forecastData) return [];
    
    const dailyData = {};
    forecastData.list.forEach(item => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!dailyData[date]) {
        dailyData[date] = {
          date: item.dt,
          temps: [item.main.temp],
          weather: item.weather[0],
          minTemp: item.main.temp_min,
          maxTemp: item.main.temp_max
        };
      } else {
        dailyData[date].temps.push(item.main.temp);
        dailyData[date].minTemp = Math.min(dailyData[date].minTemp, item.main.temp_min);
        dailyData[date].maxTemp = Math.max(dailyData[date].maxTemp, item.main.temp_max);
      }
    });
    return Object.values(dailyData).slice(0, 7);
  };

  const getHourlyForecast = () => {
    if (!forecastData) return [];
    return forecastData.list.slice(0, 12);
  };

  if (loading) return <Loader />;
  if (!weatherData) return null;

  const currentWeather = weatherData.weather[0];
  const aqi = airQuality?.list?.[0];
  const aqiInfo = aqi ? getAQILevel(aqi.main.aqi) : null;

  return (
    <div className="min-h-screen py-4 sm:py-6 px-4 relative overflow-x-hidden bg-[#e0e5ec] text-gray-700">
      <div className="grid-pattern fixed inset-0 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        <NavBar 
          location={`${location.name}, ${location.country}`} 
          onSearch={fetchWeatherByCity}
          onLocationSelect={handleLocationSelect}
          onRefreshLocation={handleGetCurrentLocation}
        />

        {/* --- Main Dashboard Section --- */}
        <div className="mb-8 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
          <Card variant="flat" hover className="p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
              
              {/* LEFT SIDE: Circular Design */}
              <div className="flex-1 flex flex-col items-center justify-center w-full">
                
                {/* Mobile Location Label */}
                <div 
                  onClick={handleGetCurrentLocation} 
                  className="flex items-center gap-2 mb-8 text-lg sm:text-xl font-semibold text-gray-600 md:hidden cursor-pointer active:opacity-70"
                >
                  <Navigation className="w-5 h-5 text-blue-500 fill-current" />
                  {location.name}, {location.country}
                </div>

                <div className="relative mb-8">
                  {/* Neumorphic Circle */}
                  <div className="w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full neu-concave flex flex-col items-center justify-center border-[6px] border-[#e0e5ec] shadow-inner transition-all duration-500 hover:scale-105">
                    
                    {/* Icon */}
                    <div className="mb-2 filter drop-shadow-md">
                      <WeatherIcon 
                        weatherCode={{ ...currentWeather, id: weatherData.weather[0].id }} 
                        isDay={weatherData.weather[0].icon.includes('d')}
                        size={window.innerWidth < 640 ? 80 : 100} 
                      />
                    </div>

                    {/* Temperature */}
                    <div className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-700 tracking-tighter leading-none">
                      {Math.round(weatherData.main.temp)}°
                    </div>

                    {/* Description */}
                    <div className="text-base sm:text-lg font-medium text-gray-500 capitalize mt-2">
                      {currentWeather.description}
                    </div>
                  </div>
                </div>

                <div className="text-gray-500 font-medium bg-gray-200/50 px-6 py-2 rounded-full shadow-sm backdrop-blur-sm">
                  Feels like {Math.round(weatherData.main.feels_like)}°C
                </div>
              </div>
              
              {/* RIGHT SIDE: Detail Grid (Lucide Icons) */}
              <div className="flex-1 grid grid-cols-2 gap-4 sm:gap-6 w-full max-w-xl">
                <DetailBox 
                  icon={<Droplets size={32} className="text-blue-500" />}
                  label="Humidity"
                  value={`${weatherData.main.humidity}%`}
                />
                <DetailBox 
                  icon={<Gauge size={32} className="text-purple-500" />}
                  label="Pressure"
                  value={`${weatherData.main.pressure} hPa`}
                />
                <DetailBox 
                  icon={<WindSpeed size={45} className="text-green-500" />}
                  label="Wind Speed"
                  value={`${weatherData.wind.speed} m/s`}
                />
                <DetailBox 
                  icon={<Eye size={32} className="text-orange-500" />}
                  label="Visibility"
                  value={`${(weatherData.visibility / 1000).toFixed(1)} km`}
                />
              </div>
            </div>
          </Card>
        </div>

        {/* --- Info Grid --- */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            <Card variant="convex">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
                <Cloud size={24} className="text-gray-500" />
                <span>Environmental Info</span>
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 rounded-2xl neu-concave">
                  <span className="text-gray-600 flex items-center gap-2">
                    <Cloud size={18} /> Cloud Cover
                  </span>
                  <span className="text-xl sm:text-2xl font-bold text-blue-500">{weatherData.clouds.all}%</span>
                </div>
                {aqiInfo && (
                  <div className="flex justify-between items-center p-4 rounded-2xl neu-concave">
                    <span className="text-gray-600 flex items-center gap-2">
                      <Leaf size={18} /> Air Quality
                    </span>
                    <span className={`text-xl sm:text-2xl font-bold ${aqiInfo.color}`}>{aqiInfo.level}</span>
                  </div>
                )}
              </div>
            </Card>
          </div>
          <div className="animate-fadeIn" style={{ animationDelay: '0.3s' }}>
            <Card variant="convex">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
                <Sunrise size={24} className="text-orange-400" />
                <span>Sun Times</span>
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 rounded-2xl neu-concave">
                  <span className="text-gray-600 flex items-center gap-2">
                    <Sunrise size={18} /> Sunrise
                  </span>
                  <span className="text-lg sm:text-xl font-semibold text-orange-400">
                    {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 rounded-2xl neu-concave">
                  <span className="text-gray-600 flex items-center gap-2">
                    <Sunset size={18} /> Sunset
                  </span>
                  <span className="text-lg sm:text-xl font-semibold text-indigo-500">
                    {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* --- Hourly Forecast --- */}
        <div className="mb-8 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
          <Card variant="flat">
            <h3 className="text-lg sm:text-xl font-semibold mb-6 flex items-center gap-2"><span>⏰</span> Hourly Forecast</h3>
            <div className="overflow-x-auto pb-4 hide-scrollbar">
              <div className="flex gap-4 min-w-max">
                {getHourlyForecast().map((hour, index) => (
                  <div key={hour.dt} className="flex-shrink-0 w-28 sm:w-32 animate-slideIn" style={{ animationDelay: `${index * 0.05}s` }}>
                    <Card variant="concave" className="text-center py-4 px-2 hover:scale-105 transition-transform duration-300">
                      <div className="text-sm mb-3 text-gray-500">{new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                      <div className="flex justify-center mb-3">
                        <WeatherIcon weatherCode={{ ...hour.weather[0], id: hour.weather[0].id }} isDay={hour.weather[0].icon.includes('d')} size={40} />
                      </div>
                      <div className="text-xl font-bold text-gray-800">{Math.round(hour.main.temp)}°</div>
                      <div className="text-xs mt-1 capitalize text-gray-500 truncate px-2">{hour.weather[0].main}</div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* --- 7-Day Forecast --- */}
        <div className="animate-fadeIn mb-8" style={{ animationDelay: '0.5s' }}>
          <Card variant="flat">
            <h3 className="text-lg sm:text-xl font-semibold mb-6 flex items-center gap-2"><span>📅</span> 7-Day Forecast</h3>
            <div className="space-y-3 sm:space-y-4">
              {getDailyForecast().map((day, index) => (
                <div key={day.date} className="animate-slideIn" style={{ animationDelay: `${index * 0.05}s` }}>
                  <Card variant="concave" hover className="transition-neu">
                    <div className="flex items-center justify-between px-2">
                      <div className="flex items-center gap-4 sm:gap-6 flex-1">
                        <div className="w-20 sm:w-24 font-semibold text-gray-700 text-sm sm:text-base">
                          {new Date(day.date * 1000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                        </div>
                        <div className="flex items-center gap-3">
                          <WeatherIcon weatherCode={{ ...day.weather, id: day.weather.id }} isDay={true} size={35} />
                          <div className="capitalize text-gray-500 hidden sm:block">{day.weather.description}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 sm:gap-8">
                        <div className="text-right">
                          <div className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wide">High</div>
                          <div className="text-lg sm:text-xl font-bold text-red-500">{Math.round(day.maxTemp)}°</div>
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wide">Low</div>
                          <div className="text-lg sm:text-xl font-bold text-blue-500">{Math.round(day.minTemp)}°</div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="text-center text-sm text-gray-400 pb-8 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
          <p>Powered by OpenWeatherMap</p>
          <p className="mt-1 opacity-60">Last updated: {new Date().toLocaleTimeString()}</p>
        </div>
      </div>
    </div>
  );
}

const DetailBox = ({ icon, label, value }) => (
  <div className="neu-concave rounded-2xl p-4 text-center hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-center h-28 sm:h-32">
    <div className="flex justify-center mb-2 sm:mb-3">{icon}</div>
    <div className="text-xs sm:text-sm mb-1 text-gray-500 font-medium">{label}</div>
    <div className="text-base sm:text-lg font-bold text-gray-800">{value}</div>
  </div>
);

export default App;