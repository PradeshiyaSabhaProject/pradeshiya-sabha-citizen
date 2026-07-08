import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const LanguageSelectionPortal = () => {
  const { selectLanguage } = useLanguage();
  const [selectedTile, setSelectedTile] = useState(null);

  const handleTileClick = (lang) => {
    setSelectedTile(lang);
    setTimeout(() => {
      selectLanguage(lang);
    }, 150);
  };

  return (
    <div className="min-h-[calc(100vh-140px)] w-full bg-white flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans select-none animate-fadeIn">
      
      {/* Clean Header Text */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          Select Your Preferred Language
        </h1>
        <p className="text-sm sm:text-base text-gray-600 font-medium">
          ඔබගේ මනාප භාෂාව තෝරන්න / உங்கள் விருப்பமான மொழியைத் தேர்ந்தெடுக்கவும்
        </p>
      </div>

      {/* Centered Three Tiles in White Background */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-3xl w-full mx-auto">
        
        {/* TILE 1: SINHALA */}
        <button
          type="button"
          onClick={() => handleTileClick('si')}
          className={`w-full bg-[#8C1538] hover:bg-[#731331] text-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer p-8 sm:p-10 flex flex-col items-center justify-center text-center group border border-[#8C1538]/20 ${
            selectedTile === 'si' ? 'scale-95 ring-4 ring-[#8C1538]/30' : ''
          }`}
        >
          <span className="text-3xl sm:text-4xl font-extrabold tracking-wide text-white group-hover:scale-105 transition-transform">
            සිංහල
          </span>
          <span className="text-sm font-semibold text-white/90 mt-2">
            Sinhala
          </span>
        </button>

        {/* TILE 2: ENGLISH */}
        <button
          type="button"
          onClick={() => handleTileClick('en')}
          className={`w-full bg-[#8C1538] hover:bg-[#731331] text-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer p-8 sm:p-10 flex flex-col items-center justify-center text-center group border border-[#8C1538]/20 ${
            selectedTile === 'en' ? 'scale-95 ring-4 ring-[#8C1538]/30' : ''
          }`}
        >
          <span className="text-3xl sm:text-4xl font-extrabold tracking-wide text-white group-hover:scale-105 transition-transform">
            English
          </span>
          <span className="text-sm font-semibold text-white/90 mt-2">
            English
          </span>
        </button>

        {/* TILE 3: TAMIL */}
        <button
          type="button"
          onClick={() => handleTileClick('ta')}
          className={`w-full bg-[#8C1538] hover:bg-[#731331] text-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer p-8 sm:p-10 flex flex-col items-center justify-center text-center group border border-[#8C1538]/20 ${
            selectedTile === 'ta' ? 'scale-95 ring-4 ring-[#8C1538]/30' : ''
          }`}
        >
          <span className="text-3xl sm:text-4xl font-extrabold tracking-wide text-white group-hover:scale-105 transition-transform">
            தமிழ்
          </span>
          <span className="text-sm font-semibold text-white/90 mt-2">
            Tamil
          </span>
        </button>

      </div>

    </div>
  );
};

export default LanguageSelectionPortal;
