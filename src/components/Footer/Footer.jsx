import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const CitizenIcon = () => (
  <svg className="w-5 h-5 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const PlayVideoIcon = () => (
  <svg className="w-5 h-5 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polygon points="10 8 16 12 10 16 10 8"></polygon>
  </svg>
);

const GalleryIcon = () => (
  <svg className="w-5 h-5 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
    <circle cx="12" cy="13" r="4"></circle>
  </svg>
);

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-[#18181B] text-gray-300 pt-12 pb-8 px-4 sm:px-8 lg:px-12 border-t border-gray-800 font-sans select-none">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
        {/* Column 1: Contact Information */}
        <div className="flex flex-col">
          <h3 className="text-white font-semibold text-base md:text-lg mb-4 tracking-wide">
            {t('footer.contactUs', 'Contact Information')}
          </h3>
          <div className="text-gray-300 text-sm leading-relaxed mb-4 font-normal space-y-1">
            <p>හෝමාගම ප්‍රාදේශීය සභාව,</p>
            <p>උසාවිය පාර,</p>
            <p>හෝමාගම</p>
          </div>
          <p className="text-gray-300 text-sm mb-2">
            <span className="text-gray-400">Phone: </span> 
            +94 11 285 5230 / +94 11 275 5108
          </p>
          <p className="text-gray-300 text-sm mb-5">
            <span className="text-gray-400">Email: </span> 
            <a 
              href="mailto:homagamapradeshiyasabawa@gmail.com" 
              className="hover:text-white transition-colors underline-offset-2 hover:underline"
            >
              homagamapradeshiyasabawa@gmail.com
            </a>
          </p>

          {/* Bottom Action Icon Buttons */}
          <div className="flex items-center gap-3 mt-auto pt-2">
            <button 
              type="button"
              aria-label="Citizen portal" 
              className="w-10 h-10 rounded-lg border border-gray-700 bg-gray-900/50 hover:bg-gray-800 hover:border-gray-500 text-gray-300 hover:text-white transition-all duration-200 flex items-center justify-center shadow-xs cursor-pointer hover:scale-105"
            >
              <CitizenIcon />
            </button>
            <button 
              type="button"
              aria-label="Media videos" 
              className="w-10 h-10 rounded-lg border border-gray-700 bg-gray-900/50 hover:bg-gray-800 hover:border-gray-500 text-gray-300 hover:text-white transition-all duration-200 flex items-center justify-center shadow-xs cursor-pointer hover:scale-105"
            >
              <PlayVideoIcon />
            </button>
            <button 
              type="button"
              aria-label="Photo gallery" 
              className="w-10 h-10 rounded-lg border border-gray-700 bg-gray-900/50 hover:bg-gray-800 hover:border-gray-500 text-gray-300 hover:text-white transition-all duration-200 flex items-center justify-center shadow-xs cursor-pointer hover:scale-105"
            >
              <GalleryIcon />
            </button>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="flex flex-col">
          <h3 className="text-white font-semibold text-base md:text-lg mb-4 tracking-wide">
            {t('footer.quickLinks', 'Quick Links')}
          </h3>
          <ul className="flex flex-col space-y-2.5 text-sm">
            <li>
              <a href="/" className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-150">
                Home
              </a>
            </li>
            <li>
              <a href="#introduction" className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-150">
                Introduction
              </a>
            </li>
            <li>
              <a href="#rti" className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-150">
                RTI Officers
              </a>
            </li>
            <li>
              <a href="#gallery" className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-150">
                Gallery
              </a>
            </li>
            <li>
              <a href="#downloads" className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-150">
                Downloads
              </a>
            </li>
            <li>
              <a href="#contact" className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-150">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Important Links */}
        <div className="flex flex-col">
          <h3 className="text-white font-semibold text-base md:text-lg mb-4 tracking-wide">
            Important Links
          </h3>
          <ul className="flex flex-col space-y-2.5 text-sm">
            <li>
              <a 
                href="https://www.gov.lk/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-150"
              >
                ශ්‍රී ලංකා රජයේ නිල අන්තර්ජාල බිහිදොර
              </a>
            </li>
            <li>
              <a 
                href="https://www.uda.gov.lk/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-150"
              >
                නාගරික සංවර්ධන අධිකාරිය
              </a>
            </li>
            <li>
              <a 
                href="https://www.gic.gov.lk/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-150"
              >
                රාජ්‍ය තොරතුරු කේන්ද්‍රය
              </a>
            </li>
            <li>
              <a 
                href="https://www.defence.lk/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-150"
              >
                ආරක්ෂක අමාත්‍යාංශය
              </a>
            </li>
            <li>
              <a 
                href="https://www.mpclg.gov.lk/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-150"
              >
                පළාත් පාලන හා පළාත් සභා අමාත්‍යාංශය
              </a>
            </li>
            <li>
              <a 
                href="https://www.pubad.gov.lk/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-150"
              >
                රාජ්‍ය පරිපාලන, පළාත් පාලන හා ප්‍රජාතන්ත්‍රීය පාලනය පිළිබඳ අමාත්‍යාංශය
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider and Copyright */}
      <div className="max-w-7xl mx-auto border-t border-gray-800/80 mt-10 pt-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-gray-400">
          <p>Copyright © 2025 {t('header.title', 'Homagama Pradeshiya Sabha')}. {t('footer.rights', 'All Rights Reserved.')}</p>
          <p>Concept, Design & Development by SLT</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
