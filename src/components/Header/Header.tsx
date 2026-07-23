import React, { useState, useEffect } from 'react';
import logoImg from '../../assets/logo.png';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useLocation, Link } from 'react-router-dom';

const FacebookIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const WhatsappIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M11.999 0C5.373 0 0 5.373 0 12c0 2.123.553 4.195 1.601 6.001L.053 23.951l6.115-1.603C7.904 23.405 9.936 24 11.999 24 18.626 24 24 18.627 24 12S18.626 0 11.999 0zM12 21.817c-1.83 0-3.619-.492-5.185-1.424l-.371-.221-3.847 1.008 1.026-3.751-.243-.386c-1.023-1.624-1.564-3.52-1.564-5.043 0-5.418 4.408-9.825 9.825-9.825 5.417 0 9.825 4.407 9.825 9.825 0 5.417-4.408 9.825-9.825 9.825zm5.385-7.359c-.295-.148-1.745-.861-2.016-.959-.271-.098-.468-.148-.664.148-.197.295-.762.959-.934 1.156-.172.197-.344.221-.639.074-.295-.148-1.244-.459-2.37-1.464-.876-.782-1.468-1.748-1.64-2.043-.172-.295-.018-.454.13-.601.134-.133.295-.344.443-.516.148-.172.197-.295.295-.492.098-.197.049-.369-.025-.516-.074-.148-.664-1.6-0.91-2.192-.24-.576-.484-.498-.664-.507-.172-.008-.369-.008-.565-.008-.197 0-.516.074-.787.369-.271.295-1.033 1.008-1.033 2.459 0 1.451 1.058 2.852 1.205 3.049.148.197 2.079 3.175 5.038 4.452.703.303 1.252.484 1.68.62.707.225 1.352.193 1.861.117.57-.085 1.745-.713 1.992-1.402.246-.689.246-1.279.172-1.402-.074-.123-.271-.197-.566-.344z" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg className="w-4 h-4 text-black fill-current" viewBox="0 0 24 24">
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
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

const MenuIcon = () => (
  <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const CloseIcon = () => (
  <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const Header = () => {
  const { user, logout, isLoggedIn } = useAuth();
  const { language, changeLanguage, t } = useLanguage();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAuthPage = !isLoggedIn || location.pathname === '/login' || location.pathname === '/register';

  // Automatically close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="w-full flex flex-col shadow-sm select-none font-sans sticky top-0 z-40 bg-white">
      {/* Top White Bar */}
      <div className="bg-white px-2.5 sm:px-6 lg:px-10 py-1.5 sm:py-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-4 border-b border-gray-100">
        {/* Top Row on mobile: Logo + Contact Button */}
        <div className="flex items-center justify-between sm:justify-start gap-2 w-full sm:w-auto">
          {/* Logo Section */}
          <div className="flex items-center min-w-0">
            <Link to="/" className="inline-block transition-transform hover:scale-[1.01] duration-200 focus:outline-none">
              <img
                src={logoImg}
                alt="Homagama Pradeshiya Sabha Logo"
                className="h-9 sm:h-14 md:h-16 w-auto object-contain max-w-[160px] sm:max-w-none shrink-0"
              />
            </Link>
          </div>

          {/* Telephone/Contact Button - Visible on mobile top row right next to logo, or right aligned on desktop */}
          <a
            href="tel:+94112855230"
            aria-label="Call +94 11 285 5230"
            className="inline-flex items-center gap-1 sm:gap-2 bg-[#6b6f76] hover:bg-[#55585e] text-white px-2 sm:px-3.5 py-1 sm:py-1.5 rounded-md sm:rounded-lg text-[11px] sm:text-sm font-medium transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer shrink-0"
          >
            <WhatsappIcon />
            <span className="font-semibold">+94 11 285 5230</span>
          </a>
        </div>

        {/* Right Section: Socials & Language Switcher */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between sm:justify-end gap-1.5 sm:gap-4 md:gap-6 pt-1 sm:pt-0 border-t border-gray-100/80 sm:border-0 w-full sm:w-auto">
          {/* Social Icons - Hidden on small screens, displayed on md+ (available inside mobile drawer for < md) */}
          <div className="hidden md:flex items-center gap-2.5 shrink-0">
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

          {/* Language Switcher */}
          <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto text-[11px] sm:text-sm font-medium bg-gray-50 sm:bg-transparent p-0.5 sm:p-0 rounded-md sm:rounded-lg border border-gray-200/70 sm:border-0 shadow-2xs sm:shadow-none">
            <button
              type="button"
              onClick={() => changeLanguage('en')}
              className={`flex-1 sm:flex-initial text-center py-1 sm:py-0 px-1.5 sm:px-1.5 rounded sm:rounded-none transition-all duration-150 font-semibold cursor-pointer ${language === 'en'
                  ? 'bg-[#8C1538] text-white sm:bg-transparent sm:text-[#8C1538] sm:underline sm:decoration-2 sm:underline-offset-4 shadow-2xs sm:shadow-none'
                  : 'text-gray-600 hover:text-black hover:bg-gray-100 sm:hover:bg-transparent'
                }`}
            >
              English
            </button>
            <span className="hidden sm:inline text-gray-300 select-none px-0.5">|</span>
            <button
              type="button"
              onClick={() => changeLanguage('si')}
              className={`flex-1 sm:flex-initial text-center py-1 sm:py-0 px-1.5 sm:px-1.5 rounded sm:rounded-none transition-all duration-150 font-semibold cursor-pointer ${language === 'si'
                  ? 'bg-[#8C1538] text-white sm:bg-transparent sm:text-[#8C1538] sm:underline sm:decoration-2 sm:underline-offset-4 shadow-2xs sm:shadow-none'
                  : 'text-gray-600 hover:text-black hover:bg-gray-100 sm:hover:bg-transparent'
                }`}
            >
              සිංහල
            </button>
            <span className="hidden sm:inline text-gray-300 select-none px-0.5">|</span>
            <button
              type="button"
              onClick={() => changeLanguage('ta')}
              className={`flex-1 sm:flex-initial text-center py-1 sm:py-0 px-1.5 sm:px-1.5 rounded sm:rounded-none transition-all duration-150 font-semibold cursor-pointer ${language === 'ta'
                  ? 'bg-[#8C1538] text-white sm:bg-transparent sm:text-[#8C1538] sm:underline sm:decoration-2 sm:underline-offset-4 shadow-2xs sm:shadow-none'
                  : 'text-gray-600 hover:text-black hover:bg-gray-100 sm:hover:bg-transparent'
                }`}
            >
              தமிழ்
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Maroon Bar - Hidden on login and registration pages */}
      {!isAuthPage && (
        <div className="bg-[#8C1538] text-white px-2.5 sm:px-6 lg:px-10 py-1.5 sm:py-2.5 shadow-md flex flex-wrap items-center justify-between gap-2 sm:gap-3 relative">
          {/* Sabha Title & Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 md:flex-initial">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              className="md:hidden text-white hover:bg-white/10 p-1 sm:p-1.5 rounded-lg transition-colors cursor-pointer shrink-0 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white/40"
            >
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>

          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6 ml-auto mr-2 lg:mr-4 text-sm font-medium">
            <Link to="/" className={`transition-colors cursor-pointer pb-0.5 ${location.pathname === '/' ? 'text-white font-bold border-b-2 border-white' : 'text-white/80 hover:text-white'}`}>{t('nav.dashboard', 'Dashboard')}</Link>
            <Link to="/services" className={`transition-colors cursor-pointer pb-0.5 ${location.pathname.startsWith('/services') ? 'text-white font-bold border-b-2 border-white' : 'text-white/80 hover:text-white'}`}>{t('nav.services', 'Services')}</Link>
            <Link to="/applications" className={`transition-colors cursor-pointer pb-0.5 ${location.pathname.startsWith('/applications') || location.pathname === '/my-applications' ? 'text-white font-bold border-b-2 border-white' : 'text-white/80 hover:text-white'}`}>{t('nav.applications', 'Applications')}</Link>
            <Link to="/payments" className={`transition-colors cursor-pointer pb-0.5 ${location.pathname.startsWith('/payments') ? 'text-white font-bold border-b-2 border-white' : 'text-white/80 hover:text-white'}`}>{t('nav.payments', 'Payments')}</Link>
          </nav>

          {/* Admin & Action Icons */}
          <div className="flex items-center gap-1 sm:gap-3 md:gap-4 shrink-0">
            {/* Vertical Separator */}
            <div className="hidden sm:block h-5 w-px bg-white/30"></div>

            {/* Verified Badge */}
            <div className="bg-white text-gray-900 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs md:text-sm font-semibold flex items-center gap-1 sm:gap-1.5 shadow-xs select-none shrink-0">
              <ShieldCheckIcon />
              <span className="hidden sm:inline">{user?.role === 'admin' ? 'Verified Admin' : t('common.citizen', 'Verified Citizen')}</span>
              <span className="sm:hidden font-bold">{user?.role === 'admin' ? 'Admin' : 'Citizen'}</span>
            </div>

            {/* Help Button */}
            <button
              type="button"
              aria-label="Help & FAQ"
              className="text-white hover:text-white/80 hover:bg-white/10 p-1.5 rounded-full transition-all duration-150 cursor-pointer flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white/40"
            >
              <HelpCircleIcon />
            </button>

            {/* User Account Link */}
            <Link
              to="/profile"
              aria-label="User profile"
              className={`text-white hover:text-white/80 hover:bg-white/10 p-1.5 rounded-full transition-all duration-150 cursor-pointer flex items-center justify-center gap-1 focus:outline-none focus:ring-2 focus:ring-white/40 ${location.pathname === '/profile' ? 'bg-white/20 ring-2 ring-white/60' : ''}`}
            >
              <UserCircleIcon />
            </Link>
          </div>

          {/* Mobile Navigation Drawer / Dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden w-full pt-3 pb-4 mt-2 border-t border-white/20 flex flex-col gap-1.5 animate-fade-in z-40">
              <div className="flex items-center justify-between px-2 mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-white/80">
                  {t('common.menu', 'Navigation Menu')}
                </span>
                <span className="text-[11px] font-semibold text-white/80 bg-white/10 px-2.5 py-0.5 rounded-full">
                  {user?.role === 'admin' ? 'Admin Portal' : 'Citizen Portal'}
                </span>
              </div>

              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3.5 py-3 rounded-xl font-medium text-sm transition-all flex items-center justify-between ${location.pathname === '/'
                    ? 'bg-white text-[#8C1538] font-bold shadow-md scale-[1.01]'
                    : 'bg-white/10 text-white hover:bg-white/20 active:scale-[0.99]'
                  }`}
              >
                <span>{t('nav.dashboard', 'Dashboard')}</span>
                {location.pathname === '/' && <span className="w-2 h-2 rounded-full bg-[#8C1538]"></span>}
              </Link>
              <Link
                to="/services"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3.5 py-3 rounded-xl font-medium text-sm transition-all flex items-center justify-between ${location.pathname.startsWith('/services')
                    ? 'bg-white text-[#8C1538] font-bold shadow-md scale-[1.01]'
                    : 'bg-white/10 text-white hover:bg-white/20 active:scale-[0.99]'
                  }`}
              >
                <span>{t('nav.services', 'Services')}</span>
                {location.pathname.startsWith('/services') && <span className="w-2 h-2 rounded-full bg-[#8C1538]"></span>}
              </Link>
              <Link
                to="/applications"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3.5 py-3 rounded-xl font-medium text-sm transition-all flex items-center justify-between ${location.pathname.startsWith('/applications') || location.pathname === '/my-applications'
                    ? 'bg-white text-[#8C1538] font-bold shadow-md scale-[1.01]'
                    : 'bg-white/10 text-white hover:bg-white/20 active:scale-[0.99]'
                  }`}
              >
                <span>{t('nav.applications', 'Applications')}</span>
                {(location.pathname.startsWith('/applications') || location.pathname === '/my-applications') && <span className="w-2 h-2 rounded-full bg-[#8C1538]"></span>}
              </Link>
              <Link
                to="/payments"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3.5 py-3 rounded-xl font-medium text-sm transition-all flex items-center justify-between ${location.pathname.startsWith('/payments')
                    ? 'bg-white text-[#8C1538] font-bold shadow-md scale-[1.01]'
                    : 'bg-white/10 text-white hover:bg-white/20 active:scale-[0.99]'
                  }`}
              >
                <span>{t('nav.payments', 'Payments')}</span>
                {location.pathname.startsWith('/payments') && <span className="w-2 h-2 rounded-full bg-[#8C1538]"></span>}
              </Link>
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3.5 py-3 rounded-xl font-medium text-sm transition-all flex items-center justify-between ${location.pathname === '/profile'
                    ? 'bg-white text-[#8C1538] font-bold shadow-md scale-[1.01]'
                    : 'bg-white/10 text-white hover:bg-white/20 active:scale-[0.99]'
                  }`}
              >
                <span>{t('nav.profile', 'Profile & Account Settings')}</span>
                {location.pathname === '/profile' && <span className="w-2 h-2 rounded-full bg-[#8C1538]"></span>}
              </Link>

              {/* Mobile Social Links & Contact Strip */}
              <div className="mt-2.5 pt-3 border-t border-white/20 flex flex-col xs:flex-row items-center justify-between gap-2.5 px-2">
                <span className="text-xs font-medium text-white/80">
                  {t('common.connectWithUs', 'Connect With Us')}
                </span>
                <div className="flex items-center gap-2.5">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="w-8 h-8 rounded-full bg-white/15 hover:bg-[#1877F2] text-white flex items-center justify-center transition-all duration-200 shadow-xs"
                  >
                    <FacebookIcon />
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="w-8 h-8 rounded-full bg-white/15 hover:bg-[#FF0000] text-white flex items-center justify-center transition-all duration-200 shadow-xs"
                  >
                    <YoutubeIcon />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="w-8 h-8 rounded-full bg-white/15 hover:bg-linear-to-tr hover:from-yellow-500 hover:via-red-500 hover:to-purple-500 text-white flex items-center justify-center transition-all duration-200 shadow-xs"
                  >
                    <InstagramIcon />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
