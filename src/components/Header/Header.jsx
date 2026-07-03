import React from 'react';

const Header = () => {
  return (
    <header className="w-full bg-white select-none shadow-xs font-sans">
      {/* Top White Branding Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left Side: Logo and Title translations */}
        <div className="flex items-center gap-4">
          {/* Stylized emblem/logo */}
          <div className="w-16 h-16 shrink-0 bg-amber-500 rounded-full flex items-center justify-center border-4 border-amber-300 relative shadow-inner">
            <span className="text-xl">🦁</span>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-red-800 rounded-xs flex items-center justify-center border border-white text-[8px] font-bold text-white shadow-xs">
              🇱🇰
            </div>
          </div>

          <div>
            <h2 className="text-sm font-extrabold text-gray-800 leading-tight">හෝමාගම ප්‍රාදේශීය සභාව</h2>
            <h2 className="text-xs font-bold text-gray-700 leading-tight">ஹோமாகம பிரதேச சபை</h2>
            <h1 className="text-xs font-extrabold text-red-850 tracking-wider mt-0.5 leading-none uppercase">
              Homagama Pradeshiya Sabha
            </h1>
          </div>
        </div>

        {/* Right Side: Social, Lang, Hotline */}
        <div className="flex flex-col items-end gap-2.5">
          <div className="flex items-center gap-4 text-[11px] font-bold text-gray-400">
            {/* Social Icons */}
            <div className="flex gap-2 mr-2">
              <a href="#" className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                🔵
              </a>
              <a href="#" className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors">
                🔴
              </a>
              <a href="#" className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-pink-50 hover:text-pink-600 transition-colors">
                📸
              </a>
            </div>

            {/* Language Links */}
            <div className="flex gap-1.5 border-r border-gray-250 pr-4">
              <span className="text-red-850 cursor-pointer hover:underline">English</span>
              <span>|</span>
              <span className="cursor-pointer hover:underline">Sinhala</span>
              <span>|</span>
              <span className="cursor-pointer hover:underline">Tamil</span>
            </div>

            {/* Hotline Pill */}
            <div className="flex items-center gap-1.5 bg-gray-700 text-white px-3.5 py-1.5 rounded-full shadow-xs">
              <span>📞</span>
              <span>+94 11 285 5230</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Maroon Header Bar */}
      <div className="w-full bg-red-850 text-white">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo Name */}
          <div className="text-base font-extrabold tracking-wide">
            Homagama Pradeshiya Sabha
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center gap-6 text-xs font-bold uppercase tracking-wider">
            <a href="#" className="hover:text-red-100 transition-colors">Dashboard</a>
            <a href="#" className="text-red-100 underline decoration-2 underline-offset-4 font-extrabold">Services</a>
            <a href="#" className="hover:text-red-100 transition-colors">Applications</a>
            <a href="#" className="hover:text-red-100 transition-colors">Payments</a>

            <div className="w-px h-4 bg-red-700 hidden md:block" />

            {/* Verified Citizen Badge */}
            <div className="flex items-center gap-1.5 bg-white text-gray-800 px-3.5 py-1.5 rounded-full font-extrabold text-[10px] shadow-xs">
              <span className="text-green-600 font-extrabold text-xs">✓</span>
              <span>Verified Citizen</span>
            </div>

            {/* Utility icons */}
            <div className="flex items-center gap-3 ml-2">
              <button className="w-7 h-7 rounded-full border border-red-700 flex items-center justify-center hover:bg-red-800 font-extrabold">
                ❓
              </button>
              <button className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center font-bold">
                👤
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
