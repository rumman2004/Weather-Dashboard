import React, { useState, useEffect, useRef } from 'react';
import { Search, LocateFixed } from 'lucide-react';
import Card from './Card';

const SearchBar = ({ onSearch, onLocationSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);
  
  // USE ENV VARIABLE HERE
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  // Helper: Convert country code to Flag Emoji (e.g., IN -> 🇮🇳)
  const getFlagEmoji = (countryCode) => {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  };

  const getCountryName = (countryCode) => {
    try {
      return new Intl.DisplayNames(['en'], { type: 'region' }).of(countryCode);
    } catch (e) {
      return countryCode;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=10&appid=${API_KEY}`
        );
        const data = await response.json();
        const uniqueData = data.filter((v, i, a) => 
          a.findIndex(t => (t.lat === v.lat && t.lon === v.lon)) === i
        );
        setSuggestions(uniqueData);
        setShowSuggestions(true);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };
    const debounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleSelectSuggestion = (suggestion) => {
    const locationData = {
      lat: suggestion.lat,
      lon: suggestion.lon,
      name: suggestion.name,
      country: suggestion.country,
      state: suggestion.state || ''
    };
    setQuery(`${suggestion.name}, ${suggestion.country}`);
    setShowSuggestions(false);
    onLocationSelect(locationData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setShowSuggestions(false);
    }
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          onLocationSelect({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your location. Please check browser permissions.');
        }
      );
    }
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl z-50">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
              placeholder="Search city..."
              className="w-full pl-6 pr-12 py-4 rounded-3xl neu-concave bg-transparent focus:outline-none font-medium placeholder-gray-400 text-gray-700"
            />
            <button type="submit" className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors">
              <Search className="w-5 h-5" />
            </button>
          </div>
          
          <button
            type="button"
            onClick={handleGetCurrentLocation}
            className="neu-button px-6 py-4 rounded-3xl transition-transform active:scale-95 text-gray-600 hover:text-blue-500"
            title="Use current location"
          >
            <LocateFixed className="w-6 h-6" />
          </button>
        </div>
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-4 animate-fadeIn shadow-2xl rounded-3xl overflow-hidden z-50">
          <Card variant="flat" className="p-0 overflow-hidden">
            <div className="max-h-80 overflow-y-auto hide-scrollbar">
              {suggestions.map((suggestion, index) => (
                <div
                  key={`${suggestion.lat}-${suggestion.lon}-${index}`}
                  onClick={() => handleSelectSuggestion(suggestion)}
                  className="px-6 py-4 cursor-pointer hover:bg-black/5 transition-colors border-b border-gray-100 last:border-0"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl" role="img" aria-label={suggestion.country}>
                        {getFlagEmoji(suggestion.country)}
                      </span>
                      <div>
                        <div className="font-bold text-lg text-gray-800">
                          {suggestion.name}
                        </div>
                        <div className="text-sm font-medium text-gray-500">
                          {[suggestion.state, getCountryName(suggestion.country)].filter(Boolean).join(', ')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SearchBar;