import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// SVG Icons for Services
const AlertIcon = () => (
  <svg className="w-6 h-6 text-[#8C1538]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-6 h-6 text-[#8C1538]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
  </svg>
);

const TrackingIcon = () => (
  <svg className="w-6 h-6 text-[#8C1538]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

const LibraryIcon = () => (
  <svg className="w-6 h-6 text-[#8C1538]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
);

const WaterIcon = () => (
  <svg className="w-6 h-6 text-[#8C1538]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
  </svg>
);

const AssetIcon = () => (
  <svg className="w-6 h-6 text-[#8C1538]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
  </svg>
);

const WasteIcon = () => (
  <svg className="w-6 h-6 text-[#8C1538]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
);

const TaxIcon = () => (
  <svg className="w-6 h-6 text-[#8C1538]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

const Services = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleServiceClick = (service) => {
    if (service.id === 'appointments') {
      navigate('/appointments?tab=schedule');
    } else if (service.id === 'reservations') {
      navigate('/appointments?tab=facility');
    } else {
      alert(`Opening portal for: ${service.title}`);
    }
  };

  const servicesData = [
    {
      id: 'reporting',
      title: 'Issue Reporting',
      desc: 'Street lights, waste management, road hazards.',
      icon: <AlertIcon />
    },
    {
      id: 'appointments',
      title: 'Citizen Appointments',
      desc: 'Schedule meetings with council officers.',
      icon: <CalendarIcon />
    },
    {
      id: 'tracking',
      title: 'Tracking & Status',
      desc: 'Real-time application status updates.',
      icon: <TrackingIcon />
    },
    {
      id: 'library',
      title: 'E-Library Access',
      desc: 'Digital books, archives, and research tools.',
      icon: <LibraryIcon />
    },
    {
      id: 'utility',
      title: 'Utility Services',
      desc: 'Water connections and maintenance requests.',
      icon: <WaterIcon />
    },
    {
      id: 'reservations',
      title: 'Asset Reservations',
      desc: 'Book council halls, grounds, and parks.',
      icon: <AssetIcon />
    },
    {
      id: 'waste',
      title: 'Waste & Environment',
      desc: 'Collection schedules and recycling guides.',
      icon: <WasteIcon />
    },
    {
      id: 'tax',
      title: 'Rate & Property Tax',
      desc: 'Online payments and billing history.',
      icon: <TaxIcon />
    }
  ];

  const filteredServices = servicesData.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans animate-fadeIn">
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-2 border-b border-gray-100">
        <div className="space-y-2 max-w-2xl">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Digital Citizen Services
          </h1>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Access essential municipal services, track applications, and engage with the Homagama community through our unified portal.
          </p>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => alert('Starting a new citizen request...')}
            className="bg-[#8C1538] hover:bg-[#73102d] text-white px-5 py-2.5 rounded-md font-semibold text-sm shadow-xs transition-all duration-200 cursor-pointer hover:shadow-sm"
          >
            Start New Request
          </button>
          <button
            type="button"
            onClick={() => alert('Viewing municipal documents and guides...')}
            className="bg-white border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 px-5 py-2.5 rounded-md font-semibold text-sm transition-all duration-200 cursor-pointer shadow-2xs hover:bg-gray-50"
          >
            View Documents
          </button>
        </div>
      </div>

      {/* Filter Assets Search Bar */}
      <div className="mb-8">
        <label htmlFor="service-search" className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 block select-none">
          FILTER ASSETS
        </label>
        <div className="relative w-full">
          <input
            id="service-search"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search facilities..."
            className="w-full bg-[#f3f4f6] border border-transparent focus:border-gray-300 focus:bg-white rounded-xl py-3.5 pl-4 pr-11 text-sm text-gray-800 placeholder-gray-500 focus:outline-none transition-all duration-200 shadow-2xs"
          />
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
            <SearchIcon />
          </div>
        </div>
      </div>

      {/* 8 Services Grid */}
      {filteredServices.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center my-6">
          <div className="text-4xl mb-3">🔍</div>
          <h3 className="text-lg font-bold text-gray-800 mb-1">No services found</h3>
          <p className="text-sm text-gray-500">No municipal services match your search query "{searchTerm}". Try another term.</p>
          <button
            type="button"
            onClick={() => setSearchTerm('')}
            className="mt-4 inline-block text-xs font-bold text-[#8C1538] hover:underline cursor-pointer"
          >
            Clear filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              onClick={() => {
                if (service.id === 'appointments') {
                  navigate('/appointments');
                } else if (service.id === 'reservations') {
                  navigate('/appointments', { state: { tab: 'facility' } });
                } else {
                  alert(`Opening portal for: ${service.title}`);
                }
              }}
              className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-xs hover:shadow-md hover:border-[#8C1538]/40 transition-all duration-200 cursor-pointer flex flex-col group"
            >
              <div className="w-12 h-12 rounded-xl bg-red-50 text-[#8C1538] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-200">
                {service.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1.5 group-hover:text-[#8C1538] transition-colors">
                {service.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Services;
