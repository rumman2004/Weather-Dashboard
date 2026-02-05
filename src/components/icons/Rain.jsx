import React from 'react';

const Rain = ({ size = 100, className = '', intensity = 'medium' }) => {
  const dropCounts = {
    light: 6,
    medium: 10,
    heavy: 16
  };
  
  const dropCount = dropCounts[intensity] || 10;
  
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 120 120" 
      fill="none" 
      className={className}
    >
      <style>{`
        @keyframes rain-fall {
          0% {
            transform: translateY(-15px);
            opacity: 0;
          }
          10% {
            opacity: 0.9;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(100px);
            opacity: 0;
          }
        }
        @keyframes rain-fall-slow {
          0% {
            transform: translateY(-10px);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(95px);
            opacity: 0;
          }
        }
        @keyframes splash {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1);
            opacity: 0.6;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        .rain-drop {
          animation: rain-fall 1.4s linear infinite;
          filter: drop-shadow(0 1px 2px rgba(96, 165, 250, 0.3));
        }
        .rain-drop-back {
          animation: rain-fall-slow 1.8s linear infinite;
        }
        .splash {
          animation: splash 0.6s ease-out infinite;
        }
      `}</style>
      
      {/* Background rain layer (slower, lighter) */}
      <g opacity="0.4">
        {[...Array(Math.floor(dropCount * 0.6))].map((_, i) => {
          const x = 25 + (i * (70 / Math.floor(dropCount * 0.6)));
          const delay = (i * 0.2) % 1.8;
          return (
            <line
              key={`back-${i}`}
              x1={x}
              y1="0"
              x2={x}
              y2="18"
              stroke="url(#rainGradientLight)"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="rain-drop-back"
              style={{ animationDelay: `${delay}s` }}
            />
          );
        })}
      </g>
      
      {/* Main rain drops */}
      <g>
        {[...Array(dropCount)].map((_, i) => {
          const x = 15 + (i * (90 / dropCount));
          const delay = (i * 0.14) % 1.4;
          const length = 16 + Math.random() * 6;
          
          return (
            <g key={i}>
              {/* Main drop */}
              <line
                x1={x}
                y1="0"
                x2={x}
                y2={length}
                stroke="url(#rainGradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="rain-drop"
                style={{ animationDelay: `${delay}s` }}
              />
              
              {/* Splash effect at bottom (every 3rd drop) */}
              {i % 3 === 0 && (
                <g className="splash" style={{ animationDelay: `${delay + 0.7}s` }}>
                  <circle
                    cx={x}
                    cy="95"
                    r="2"
                    fill="none"
                    stroke="#60A5FA"
                    strokeWidth="1"
                    opacity="0.6"
                  />
                </g>
              )}
            </g>
          );
        })}
      </g>
      
      {/* Foreground rain layer (faster, more opaque) */}
      <g opacity="0.9">
        {[...Array(Math.floor(dropCount * 0.4))].map((_, i) => {
          const x = 20 + (i * (80 / Math.floor(dropCount * 0.4)));
          const delay = (i * 0.12 + 0.3) % 1.4;
          return (
            <line
              key={`front-${i}`}
              x1={x}
              y1="0"
              x2={x}
              y2="20"
              stroke="url(#rainGradientDark)"
              strokeWidth="3"
              strokeLinecap="round"
              className="rain-drop"
              style={{ animationDelay: `${delay}s` }}
            />
          );
        })}
      </g>
      
      <defs>
        {/* Main rain gradient */}
        <linearGradient id="rainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.7" />
          <stop offset="50%" stopColor="#60A5FA" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.4" />
        </linearGradient>
        
        {/* Light rain gradient for background */}
        <linearGradient id="rainGradientLight" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#BFDBFE" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#93C5FD" stopOpacity="0.3" />
        </linearGradient>
        
        {/* Dark rain gradient for foreground */}
        <linearGradient id="rainGradientDark" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#3B82F6" stopOpacity="1" />
          <stop offset="100%" stopColor="#2563EB" stopOpacity="0.5" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Rain;