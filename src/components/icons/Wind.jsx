import React from 'react';

const Wind = ({ size = 100, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 120 120" 
    fill="none" 
    className={className}
  >
    <style>{`
      @keyframes wind-flow-1 {
        0% {
          stroke-dashoffset: 120;
          opacity: 0.3;
        }
        50% {
          opacity: 1;
        }
        100% {
          stroke-dashoffset: 0;
          opacity: 0.3;
        }
      }
      @keyframes wind-flow-2 {
        0% {
          stroke-dashoffset: 140;
          opacity: 0.4;
        }
        50% {
          opacity: 0.95;
        }
        100% {
          stroke-dashoffset: 0;
          opacity: 0.4;
        }
      }
      @keyframes wind-flow-3 {
        0% {
          stroke-dashoffset: 100;
          opacity: 0.25;
        }
        50% {
          opacity: 0.85;
        }
        100% {
          stroke-dashoffset: 0;
          opacity: 0.25;
        }
      }
      @keyframes drift {
        0%, 100% {
          transform: translateX(0);
        }
        50% {
          transform: translateX(3px);
        }
      }
      .wind-line-1 {
        stroke-dasharray: 120;
        animation: wind-flow-1 3.5s ease-in-out infinite;
        filter: drop-shadow(0 1px 3px rgba(148, 163, 184, 0.3));
      }
      .wind-line-2 {
        stroke-dasharray: 140;
        animation: wind-flow-2 4s ease-in-out infinite;
        filter: drop-shadow(0 1px 4px rgba(148, 163, 184, 0.4));
      }
      .wind-line-3 {
        stroke-dasharray: 100;
        animation: wind-flow-3 3s ease-in-out infinite;
        filter: drop-shadow(0 1px 2px rgba(148, 163, 184, 0.2));
      }
      .wind-group {
        animation: drift 5s ease-in-out infinite;
      }
    `}</style>
    
    <g className="wind-group">
      {/* Top wind stream - thinner, faster */}
      <path
        d="M 15 28 Q 45 25 75 28 Q 95 29 105 26"
        stroke="url(#windGradient1)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        className="wind-line-3"
        style={{ animationDelay: '0s' }}
      />
      
      {/* Decorative swirl at end */}
      <path
        d="M 105 26 Q 110 26 110 30 Q 110 33 107 33"
        stroke="url(#windGradient1)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />
      
      {/* Upper-middle wind stream - medium thickness */}
      <path
        d="M 20 45 Q 55 41 90 45 Q 105 46 112 43"
        stroke="url(#windGradient2)"
        strokeWidth="4.5"
        strokeLinecap="round"
        fill="none"
        className="wind-line-2"
        style={{ animationDelay: '0.6s' }}
      />
      
      {/* Decorative swirl */}
      <path
        d="M 112 43 Q 116 43 116 47 Q 116 50 113 50"
        stroke="url(#windGradient2)"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
      
      {/* Main central wind stream - thickest, most prominent */}
      <path
        d="M 10 62 Q 50 58 95 62 Q 110 63 118 60"
        stroke="url(#windGradient3)"
        strokeWidth="5.5"
        strokeLinecap="round"
        fill="none"
        className="wind-line-1"
        style={{ animationDelay: '1.2s' }}
      />
      
      {/* Main decorative swirl */}
      <circle
        cx="118"
        cy="63"
        r="3"
        fill="none"
        stroke="url(#windGradient3)"
        strokeWidth="2"
        opacity="0.8"
      />
      
      {/* Lower-middle wind stream */}
      <path
        d="M 18 78 Q 52 75 88 78 Q 100 79 108 76"
        stroke="url(#windGradient4)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        className="wind-line-3"
        style={{ animationDelay: '1.8s' }}
      />
      
      {/* Bottom wind stream - subtle */}
      <path
        d="M 25 92 Q 55 89 80 92 Q 92 93 98 91"
        stroke="url(#windGradient5)"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
        className="wind-line-2"
        style={{ animationDelay: '2.4s' }}
      />
      
      {/* Small decorative particles */}
      <circle cx="40" cy="35" r="1.5" fill="#CBD5E1" opacity="0.6">
        <animate attributeName="cx" values="40;70;40" dur="4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;0.3;0.6" dur="4s" repeatCount="indefinite" />
      </circle>
      
      <circle cx="65" cy="52" r="2" fill="#94A3B8" opacity="0.5">
        <animate attributeName="cx" values="65;95;65" dur="5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.5;0.2;0.5" dur="5s" repeatCount="indefinite" />
      </circle>
      
      <circle cx="50" cy="70" r="1.5" fill="#CBD5E1" opacity="0.6">
        <animate attributeName="cx" values="50;85;50" dur="4.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;0.3;0.6" dur="4.5s" repeatCount="indefinite" />
      </circle>
    </g>
    
    <defs>
      <linearGradient id="windGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#CBD5E1" stopOpacity="0.2" />
        <stop offset="30%" stopColor="#94A3B8" stopOpacity="0.7" />
        <stop offset="70%" stopColor="#E2E8F0" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#CBD5E1" stopOpacity="0.3" />
      </linearGradient>
      
      <linearGradient id="windGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#94A3B8" stopOpacity="0.3" />
        <stop offset="40%" stopColor="#CBD5E1" stopOpacity="0.85" />
        <stop offset="60%" stopColor="#F1F5F9" stopOpacity="1" />
        <stop offset="100%" stopColor="#94A3B8" stopOpacity="0.4" />
      </linearGradient>
      
      <linearGradient id="windGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#64748B" stopOpacity="0.4" />
        <stop offset="35%" stopColor="#94A3B8" stopOpacity="0.9" />
        <stop offset="65%" stopColor="#E2E8F0" stopOpacity="1" />
        <stop offset="100%" stopColor="#CBD5E1" stopOpacity="0.5" />
      </linearGradient>
      
      <linearGradient id="windGradient4" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#CBD5E1" stopOpacity="0.25" />
        <stop offset="50%" stopColor="#94A3B8" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#CBD5E1" stopOpacity="0.35" />
      </linearGradient>
      
      <linearGradient id="windGradient5" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#E2E8F0" stopOpacity="0.2" />
        <stop offset="50%" stopColor="#CBD5E1" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#94A3B8" stopOpacity="0.3" />
      </linearGradient>
    </defs>
  </svg>
);

export default Wind;