import React from 'react';

const WindSpeed = ({ size = 40, className = '' }) => {
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
            @keyframes wind-dash {
              to { stroke-dashoffset: -100; }
            }
            .wind-stream {
              stroke-dasharray: 60 40;
              animation: wind-dash 2s linear infinite;
            }
          `}
        </style>

        <defs>
          <linearGradient id="windDetailGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>

        <path
          d="M10 30 Q 30 15 50 30 T 90 30"
          stroke="url(#windDetailGradient)"
          strokeWidth="6"
          strokeLinecap="round"
          className="wind-stream"
          style={{ animationDuration: '2.5s' }}
        />
        
        <path
          d="M5 50 Q 30 65 60 50 T 95 50"
          stroke="url(#windDetailGradient)"
          strokeWidth="6"
          strokeLinecap="round"
          className="wind-stream"
          style={{ animationDuration: '2s', animationDelay: '0.2s' }}
        />
        
        <path
          d="M15 70 Q 35 55 55 70 T 85 70"
          stroke="url(#windDetailGradient)"
          strokeWidth="6"
          strokeLinecap="round"
          className="wind-stream"
          style={{ animationDuration: '3s', animationDelay: '0.5s' }}
        />
      </svg>
    </div>
  );
};

export default WindSpeed;