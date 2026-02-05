import React from 'react';

const Visibility = ({ size = 40, className = '' }) => {
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
            @keyframes blink {
              0%, 90%, 100% { transform: scaleY(1); }
              95% { transform: scaleY(0.1); }
            }
            .eye-shape {
              transform-origin: center;
              animation: blink 5s infinite;
            }
          `}
        </style>

        <defs>
          <linearGradient id="visGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
        </defs>

        <g className="eye-shape">
          {/* Eye Outline */}
          <path
            d="M10 50 Q 50 10 90 50 Q 50 90 10 50 Z"
            stroke="url(#visGradient)"
            strokeWidth="6"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Pupil */}
          <circle cx="50" cy="50" r="14" fill="url(#visGradient)" />
          {/* Highlight */}
          <circle cx="55" cy="45" r="4" fill="white" opacity="0.8" />
        </g>
      </svg>
    </div>
  );
};

export default Visibility;