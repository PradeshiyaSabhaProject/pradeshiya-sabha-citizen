import React, { useState } from 'react';
import LoginView from './LoginView';
import RegisterView from './RegisterView';
import pradeshiyaImg from '../../assets/pradeshiyasabha.png';

const AuthPortal = () => {
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'register'

  return (
    <div className="flex-grow w-full bg-gray-100 flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 border border-gray-100">
        
        {/* Left Panel - Rich Maroon Banner with Building & Text */}
        <div className="lg:col-span-5 bg-[#8C1538] relative overflow-hidden flex flex-col justify-end p-8 sm:p-12 text-white min-h-[350px] lg:min-h-full">
          {/* Background Image with Gradient Overlay */}
          <div className="absolute inset-0 z-0 opacity-25 mix-blend-overlay">
            <img 
              src={pradeshiyaImg} 
              alt="Homagama Pradeshiya Sabha Building" 
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#8C1538] via-[#8C1538]/80 to-transparent z-10" />

          {/* Foreground Mission Content */}
          <div className="relative z-20 space-y-4">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              Empowering Homagama
            </h1>
            <p className="text-white/90 text-sm sm:text-base leading-relaxed font-light">
              Welcome to our Unified Digital Gateway. Celebrating one year of digital transformation, we are committed to providing a seamless, transparent, and efficient administrative experience for all our citizens.
            </p>
          </div>
        </div>

        {/* Right Panel - Dynamic Login & Registration Card */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center bg-white">
          {/* Top Tabs */}
          <div className="flex border-b border-gray-200 mb-8">
            <button
              type="button"
              onClick={() => setActiveTab('login')}
              className={`pb-3 px-6 text-sm sm:text-base font-semibold transition-all cursor-pointer ${
                activeTab === 'login'
                  ? 'border-b-2 border-[#8C1538] text-[#8C1538]'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              Civilian Login
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('register')}
              className={`pb-3 px-6 text-sm sm:text-base font-semibold transition-all cursor-pointer ${
                activeTab === 'register'
                  ? 'border-b-2 border-[#8C1538] text-[#8C1538]'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              Civilian Register
            </button>
          </div>

          {/* Active View Container */}
          <div className="w-full">
            {activeTab === 'login' ? (
              <LoginView />
            ) : (
              <RegisterView onCancel={() => setActiveTab('login')} />
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AuthPortal;
