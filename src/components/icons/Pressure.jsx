import React from 'react';

const Pressure = ({ size = 40, className = '' }) => {
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
            @keyframes sway-needle {
              0% { transform: rotate(-20deg); }
              50% { transform: rotate(20deg); }
              100% { transform: rotate(-20deg); }
            }
            .gauge-needle {
              transform-origin: 50% 65%;
              animation: sway-needle 4s ease-in-out infinite;
            }
          `}
        </style>

        <defs>
          <linearGradient id="pressureGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#A78BFA" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
        </defs>

        {/* Gauge Arc */}
        <path
          d="M20 65 A 40 40 0 1 1 80 65"
          stroke="url(#pressureGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
        />
        
        {/* Ticks */}
        <path d="M50 25 L50 15" stroke="#A78BFA" strokeWidth="2" />
        <path d="M78 37 L86 32" stroke="#A78BFA" strokeWidth="2" />
        <path d="M22 37 L14 32" stroke="#A78BFA" strokeWidth="2" />

        {/* Needle */}
        <g className="gauge-needle">
          <circle cx="50" cy="65" r="5" fill="#7C3AED" />
          <path d="M50 65 L50 25" stroke="#7C3AED" strokeWidth="4" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
};

export default Pressure;