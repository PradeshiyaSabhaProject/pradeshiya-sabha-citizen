import React, { useState } from 'react';
import logoImg from '../../assets/logo.png';
import { useAuth } from '../../context/AuthContext';
import { useLocation, Link } from 'react-router-dom';

const FacebookIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const WhatsappIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M11.999 0C5.373 0 0 5.373 0 12c0 2.123.553 4.195 1.601 6.001L.053 23.951l6.115-1.603C7.904 23.405 9.936 24 11.999 24 18.626 24 24 18.627 24 12S18.626 0 11.999 0zM12 21.817c-1.83 0-3.619-.492-5.185-1.424l-.371-.221-3.847 1.008 1.026-3.751-.243-.386c-1.023-1.624-1.564-3.52-1.564-5.043 0-5.418 4.408-9.825 9.825-9.825 5.417 0 9.825 4.407 9.825 9.825 0 5.417-4.408 9.825-9.825 9.825zm5.385-7.359c-.295-.148-1.745-.861-2.016-.959-.271-.098-.468-.148-.664.148-.197.295-.762.959-.934 1.156-.172.197-.344.221-.639.074-.295-.148-1.244-.459-2.37-1.464-.876-.782-1.468-1.748-1.64-2.043-.172-.295-.018-.454.13-.601.134-.133.295-.344.443-.516.148-.172.197-.295.295-.492.098-.197.049-.369-.025-.516-.074-.148-.664-1.6-0.91-2.192-.24-.576-.484-.498-.664-.507-.172-.008-.369-.008-.565-.008-.197 0-.516.074-.787.369-.271.295-1.033 1.008-1.033 2.459 0 1.451 1.058 2.852 1.205 3.049.148.197 2.079 3.175 5.038 4.452.703.303 1.252.484 1.68.62.707.225 1.352.193 1.861.117.57-.085 1.745-.713 1.992-1.402.246-.689.246-1.279.172-1.402-.074-.123-.271-.197-.566-.344z"/>
  </svg>
);

const ShieldCheckIcon = () => (
  <svg className="w-4 h-4 text-black fill-current" viewBox="0 0 24 24">
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
  </svg>
);

const HelpCircleIcon = () => (
  <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

const UserCircleIcon = () => (
  <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const Header = () => {
  const { user, logout, isLoggedIn } = useAuth();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);

  const isAuthPage = !isLoggedIn || location.pathname === '/login' || location.pathname === '/register';

  return (
    <header className="w-full flex flex-col shadow-sm select-none font-sans">
      {/* Top White Bar */}
      <div className="bg-white px-4 sm:px-6 lg:px-10 py-3 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-gray-100">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link to="/" className="inline-block transition-transform hover:scale-[1.01] duration-200">
            <img 
              src={logoImg} 
              alt="Homagama Pradeshiya Sabha Logo" 
              className="h-14 md:h-16 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Right Section: Socials, Language, Contact */}
        <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
          {/* Social Icons */}
          <div className="flex items-center gap-2.5">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-9 h-9 rounded-full bg-[#6b6f76] text-white hover:bg-[#1877F2] transition-all duration-200 flex items-center justify-center shadow-xs hover:scale-105"
            >
              <FacebookIcon />
            </a>
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-9 h-9 rounded-full bg-[#6b6f76] text-white hover:bg-[#FF0000] transition-all duration-200 flex items-center justify-center shadow-xs hover:scale-105"
            >
              <YoutubeIcon />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full bg-[#6b6f76] text-white hover:bg-linear-to-tr hover:from-yellow-500 hover:via-red-500 hover:to-purple-500 transition-all duration-200 flex items-center justify-center shadow-xs hover:scale-105"
            >
              <InstagramIcon />
            </a>
          </div>

          {/* Language Switcher & Contact Button */}
          <div className="flex flex-col items-center sm:items-end gap-1.5">
            <div className="flex items-center text-sm font-medium">
              <button type="button" className="text-gray-700 font-semibold hover:text-black transition-colors px-1.5 cursor-pointer">
                English
              </button>
              <span className="text-gray-300 select-none">|</span>
              <button type="button" className="text-gray-400 hover:text-gray-700 transition-colors px-1.5 cursor-pointer">
                Sinhala
              </button>
              <span className="text-gray-300 select-none">|</span>
              <button type="button" className="text-gray-400 hover:text-gray-700 transition-colors px-1.5 cursor-pointer">
                Tamil
              </button>
            </div>

            <a 
              href="tel:+94112855230" 
              className="inline-flex items-center gap-2 bg-[#6b6f76] hover:bg-[#55585e] text-white px-3.5 py-1.5 rounded-md text-sm font-medium transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer"
            >
              <WhatsappIcon />
              <span>+94 11 285 5230</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Maroon Bar - Hidden on login and registration pages */}
      {!isAuthPage && (
        <div className="bg-[#8C1538] text-white px-4 sm:px-6 lg:px-10 py-2.5 shadow-md flex flex-wrap items-center justify-between gap-3 relative">
          {/* Sabha Title */}
          <div className="flex items-center">
            <h1 className="text-lg md:text-xl font-bold tracking-wide text-white drop-shadow-xs">
              Homagama Pradeshiya Sabha
            </h1>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6 ml-auto mr-2 lg:mr-4 text-sm font-medium">
            <Link to="/" className="hover:text-white/80 transition-colors cursor-pointer">Dashboard</Link>
            <Link to="/services" className="hover:text-white/80 transition-colors cursor-pointer">Services</Link>
            <Link to="/applications" className="hover:text-white/80 transition-colors cursor-pointer">Applications</Link>
            <Link to="/payments" className="hover:text-white/80 transition-colors cursor-pointer">Payments</Link>
          </nav>

          {/* Admin & Action Icons */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Vertical Separator */}
            <div className="hidden sm:block h-5 w-px bg-white/30"></div>

            {/* Verified Badge */}
            <div className="bg-white text-gray-900 px-3 py-1 rounded-full text-xs md:text-sm font-semibold flex items-center gap-1.5 shadow-xs select-none">
              <ShieldCheckIcon />
              <span>{user?.role === 'admin' ? 'Verified Admin' : 'Verified Citizen'}</span>
            </div>

            {/* Help Button */}
            <button 
              type="button" 
              aria-label="Help & FAQ" 
              className="text-white hover:text-white/80 hover:bg-white/10 p-1 rounded-full transition-all duration-150 cursor-pointer"
            >
              <HelpCircleIcon />
            </button>

            {/* User Account Button & Menu */}
            <div className="relative">
              <button 
                type="button" 
                onClick={() => setShowMenu(!showMenu)}
                aria-label="User profile" 
                className="text-white hover:text-white/80 hover:bg-white/10 p-1 rounded-full transition-all duration-150 cursor-pointer flex items-center gap-1"
              >
                <UserCircleIcon />
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-3 px-4 text-gray-800 z-50 animate-fadeIn">
                  <div className="pb-2 border-b border-gray-100">
                    <div className="font-bold text-sm text-gray-900">{user?.name || 'Verified Citizen'}</div>
                    <div className="text-xs text-gray-500">NIC: {user?.nic || '199012345678'}</div>
                    <div className="text-xs text-[#8C1538] font-medium mt-0.5">{user?.phone}</div>
                  </div>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowMenu(false);
                        logout();
                      }}
                      className="w-full text-left text-xs font-semibold text-red-600 hover:bg-red-50 py-1.5 px-2 rounded-md transition-colors cursor-pointer"
                    >
                      Sign Out / Switch Account
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
