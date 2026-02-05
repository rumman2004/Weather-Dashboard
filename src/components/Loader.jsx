import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#e0e5ec] overflow-hidden">
      {/* Internal Styles for specific animations */}
      <style>{`
        @keyframes blob-bounce {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes blob-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes liquid-morph {
          0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
          100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
        }
        .animate-blob-1 { animation: blob-bounce 10s infinite ease-in-out alternate; }
        .animate-blob-2 { animation: blob-bounce 10s infinite ease-in-out alternate-reverse; }
        .animate-liquid { animation: liquid-morph 8s ease-in-out infinite; }
      `}</style>

      {/* --- LIQUID BACKGROUND ELEMENTS --- */}
      <div className="relative w-80 h-80 flex items-center justify-center">
        {/* Blob 1: Sun/Heat (Orange/Yellow) */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob-1"></div>
        
        {/* Blob 2: Rain/Water (Blue/Cyan) */}
        <div className="absolute top-0 -right-4 w-72 h-72 bg-gradient-to-br from-blue-300 to-cyan-400 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob-2 animation-delay-2000"></div>
        
        {/* Blob 3: Storm/Wind (Purple/Pink) */}
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-br from-purple-300 to-pink-400 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob-1 animation-delay-4000"></div>

        {/* --- GLASS LENS --- */}
        <div className="relative z-10 w-48 h-48 backdrop-blur-3xl bg-white/10 border border-white/30 shadow-2xl rounded-full flex items-center justify-center animate-liquid">
          {/* Inner Glare/Reflection */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 to-transparent opacity-50 pointer-events-none animate-liquid"></div>
          
          {/* Icon Container */}
          <div className="relative z-20 flex flex-col items-center">
             {/* Pulsing Sun/Cloud Icon */}
            <div className="text-6xl animate-pulse drop-shadow-lg filter">
              🌤️
            </div>
          </div>
        </div>
      </div>

      {/* --- TEXT --- */}
      <div className="mt-12 relative z-10">
        <h2 className="text-xl font-bold text-[#556075] tracking-[0.2em] uppercase">
          Forecasting
        </h2>
        {/* Loading dots */}
        <div className="flex justify-center gap-1 mt-2">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
      
      {/* Bottom Nuemorphic Text */}
      <p className="absolute bottom-8 text-xs text-[#94a3b8] font-medium tracking-wide opacity-60">
        PREPARING DASHBOARD
      </p>
    </div>
  );
};

export default Loader;