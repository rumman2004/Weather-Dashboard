import React from 'react';
import Sun from './icons/Sun';
import Moon from './icons/Moon';
import Cloud from './icons/Cloud';
import Rain from './icons/Rain';
import Wind from './icons/Wind';

// Internal component for Lightning
const Lightning = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className="absolute inset-0">
    <style>
      {`
        @keyframes flash {
          0%, 10%, 20%, 100% { opacity: 0; }
          5%, 15% { opacity: 1; }
        }
        .lightning-bolt {
          animation: flash 3s ease-in-out infinite;
        }
      `}
    </style>
    <path
      d="M 50 20 L 45 50 L 52 50 L 48 80 L 60 45 L 53 45 Z"
      fill="#FCD34D"
      stroke="#F59E0B"
      strokeWidth="2"
      className="lightning-bolt"
    />
  </svg>
);

// Internal component for Snow
const Snow = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className="absolute inset-0">
    <style>
      {`
        @keyframes snow-fall {
          0% { transform: translateY(-10px); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(100px); opacity: 0; }
        }
        .snowflake { animation: snow-fall 3s linear infinite; }
      `}
    </style>
    {[...Array(6)].map((_, i) => (
      <circle
        key={i}
        cx={20 + i * 12}
        cy="10"
        r="2"
        fill="#E2E8F0"
        className="snowflake"
        style={{ animationDelay: `${i * 0.5}s` }}
      />
    ))}
  </svg>
);

const WeatherIcon = ({ weatherCode, isDay = true, size = 100, className = '' }) => {
  const iconCode = weatherCode?.icon || '';
  const main = weatherCode?.main?.toLowerCase() || '';
  const description = weatherCode?.description?.toLowerCase() || '';
  const isDayTime = iconCode.includes('d') || isDay;
  const id = weatherCode?.id;

  // Wrapper style handles sizing
  const wrapperStyle = { width: size, height: size, position: 'relative' };

  // 1. Thunderstorm
  if (main === 'thunderstorm' || (id >= 200 && id < 300)) {
    return (
      <div className={className} style={wrapperStyle}>
        <div className="absolute inset-0"><Cloud size={size} color="#475569" /></div>
        <div className="absolute inset-0"><Rain size={size} intensity="heavy" /></div>
        <div className="absolute inset-0"><Lightning size={size} /></div>
      </div>
    );
  }

  // 2. Drizzle
  if (main === 'drizzle' || (id >= 300 && id < 400)) {
    return (
      <div className={className} style={wrapperStyle}>
        <div className="absolute inset-0"><Cloud size={size} color="#94A3B8" /></div>
        <div className="absolute inset-0"><Rain size={size} intensity="light" /></div>
      </div>
    );
  }

  // 3. Rain
  if (main === 'rain' || (id >= 500 && id < 600)) {
    return (
      <div className={className} style={wrapperStyle}>
        <div className="absolute inset-0"><Cloud size={size} color="#64748B" /></div>
        <div className="absolute inset-0"><Rain size={size} intensity={id >= 520 ? 'heavy' : 'medium'} /></div>
      </div>
    );
  }

  // 4. Snow
  if (main === 'snow' || (id >= 600 && id < 700)) {
    return (
      <div className={className} style={wrapperStyle}>
        <div className="absolute inset-0"><Cloud size={size} color="#CBD5E1" /></div>
        <div className="absolute inset-0"><Snow size={size} /></div>
      </div>
    );
  }

  // 5. Atmosphere (Mist, Fog)
  if (main === 'mist' || main === 'fog' || (id >= 700 && id < 800)) {
    return (
      <div className={className} style={wrapperStyle}>
        <div className="absolute inset-0 opacity-80"><Cloud size={size} color="#E2E8F0" /></div>
        <div className="absolute inset-0 translate-y-2 opacity-50"><Wind size={size} /></div>
      </div>
    );
  }

  // 6. Clear Sky
  if (main === 'clear' || id === 800) {
    return (
      <div className={className} style={wrapperStyle}>
        {isDayTime ? <Sun size={size} /> : <Moon size={size} />}
      </div>
    );
  }

  // 7. Clouds
  if (main === 'clouds' || (id >= 801 && id <= 804)) {
    // Few/Scattered Clouds (Sun + Cloud)
    if (id === 801 || id === 802 || description.includes('few') || description.includes('scattered')) {
      return (
        <div className={className} style={wrapperStyle}>
          <div className="absolute inset-0 scale-75 -translate-x-2 -translate-y-2">
            {isDayTime ? <Sun size={size} /> : <Moon size={size} />}
          </div>
          <div className="absolute inset-0 translate-x-4 translate-y-4">
            <Cloud size={size * 0.8} color="#CBD5E1" />
          </div>
        </div>
      );
    }
    // Broken/Overcast Clouds (Cloud + Cloud)
    return (
      <div className={className} style={wrapperStyle}>
        <div className="absolute inset-0"><Cloud size={size} color="#64748B" /></div>
        <div className="absolute inset-0 translate-x-2 translate-y-1 opacity-70"><Cloud size={size * 0.9} color="#94A3B8" /></div>
      </div>
    );
  }

  return <div className={className} style={wrapperStyle}>{isDayTime ? <Sun size={size} /> : <Moon size={size} />}</div>;
};

export default WeatherIcon;