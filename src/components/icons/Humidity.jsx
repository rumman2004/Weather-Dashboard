import React from 'react';

const Humidity = ({ size = 40, className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <style>
          {`
            @keyframes float-drop {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-5px); }
            }
            @keyframes fill-pulse {
              0%, 100% { fill-opacity: 0.6; }
              50% { fill-opacity: 0.9; }
            }
            .humid-body {
              animation: float-drop 3s ease-in-out infinite;
              transform-origin: center;
            }
            .humid-fill {
              animation: fill-pulse 3s ease-in-out infinite;
            }
          `}
        </style>
        
        <defs>
          <linearGradient id="humidGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
          <filter id="glow-humid" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <g className="humid-body" filter="url(#glow-humid)">
          {/* Outer Border */}
          <path
            d="M50 15 C50 15 85 50 85 70 C85 89.33 69.33 105 50 105 C30.67 105 15 89.33 15 70 C15 50 50 15 50 15 Z"
            stroke="url(#humidGradient)"
            strokeWidth="3"
            fill="none"
          />
          {/* Inner Fill */}
          <path
            d="M50 25 C50 25 78 55 78 70 C78 85.46 65.46 98 50 98 C34.54 98 22 85.46 22 70 C22 55 50 25 50 25 Z"
            fill="url(#humidGradient)"
            className="humid-fill"
          />
          {/* Reflection Highlight */}
          <path
            d="M35 65 Q 35 55 45 45"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.6"
          />
        </g>
      </svg>
    </div>
  );
};

export default Humidity;