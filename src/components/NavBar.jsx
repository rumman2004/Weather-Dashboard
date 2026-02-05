import React from 'react';
import { MapPin, CloudSun } from 'lucide-react';
import Card from './Card';
import SearchBar from './SearchBar';
import logo from '../assets/logo.png';

const NavBar = ({ location, onSearch, onLocationSelect, onRefreshLocation }) => {
  return (
    <nav className="mb-6 sm:mb-8 relative z-50">
      <Card variant="flat" className="flex flex-col md:flex-row items-center justify-between gap-4 p-4">
        
        {/* Logo Section */}
        <div className="flex items-center gap-3 min-w-fit self-start">
          <img 
            src={logo} 
            alt="WeatherNeu Logo" 
            // Changed sizes: w-16/h-16 for mobile, sm:w-20/sm:h-20 for desktop
            className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-xl" 
          />
          <div className="sm:block">
            <h1 className="text-xl font-bold text-gradient">Weather</h1>
          </div>
        </div>

        {/* Search Bar */}
        <div className="w-full md:max-w-md mx-0 md:mx-4">
          <SearchBar onSearch={onSearch} onLocationSelect={onLocationSelect} />
        </div>
        
        {/* Location Badge */}
        {location && (
          <div 
            onClick={onRefreshLocation}
            title="Update to my current location"
            className="hidden md:flex items-center gap-2 text-text-secondary bg-neu-base neu-pressed px-4 py-2 rounded-full min-w-fit cursor-pointer hover:text-blue-500 transition-colors active:scale-95"
          >
            <MapPin className="w-4 h-4 text-blue-500" />
            <span className="font-medium text-sm truncate max-w-[150px]">{location}</span>
          </div>
        )}
      </Card>
    </nav>
  );
};

export default NavBar;