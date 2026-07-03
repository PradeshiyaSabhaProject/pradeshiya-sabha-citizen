import React, { useState } from 'react';
import ApplicationFormModal from './ApplicationFormModal';

// SVG Icons for Applications
const CertificateIcon = () => (
  <svg className="w-6 h-6 text-[#8C1538]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

const Applications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppTitle, setSelectedAppTitle] = useState('');

  const applicationsData = [
    {
      id: 'street-line-certificate',
      title: 'Street Line & Non-Vesting Certificate',
      desc: 'Apply for official municipal certification verifying building alignments, street line limits, and non-vesting property ownership.',
      icon: <CertificateIcon />
    }
  ];

  const filteredApplications = applicationsData.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openApplicationModal = (title) => {
    setSelectedAppTitle(title);
    setIsModalOpen(true);
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans animate-fadeIn">
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-2 border-b border-gray-100">
        <div className="space-y-2 max-w-2xl">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Digital Citizen Applications
          </h1>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Submit and track formal applications, permits, and requests to the Homagama Pradeshiya Sabha through our unified portal.
          </p>
        </div>


      </div>

      {/* Filter Applications Search Bar */}
      <div className="mb-8">
        <label htmlFor="application-search" className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 block select-none">
          FILTER APPLICATIONS
        </label>
        <div className="relative w-full">
          <input
            id="application-search"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search applications..."
            className="w-full bg-[#f3f4f6] border border-transparent focus:border-gray-300 focus:bg-white rounded-xl py-3.5 pl-4 pr-11 text-sm text-gray-800 placeholder-gray-500 focus:outline-none transition-all duration-200 shadow-2xs"
          />
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
            <SearchIcon />
          </div>
        </div>
      </div>

      {/* Applications Grid */}
      {filteredApplications.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center my-6">
          <div className="text-4xl mb-3">🔍</div>
          <h3 className="text-lg font-bold text-gray-800 mb-1">No applications found</h3>
          <p className="text-sm text-gray-500">No municipal applications match your search query "{searchTerm}". Try another term.</p>
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
          {filteredApplications.map((application) => (
            <div
              key={application.id}
              onClick={() => openApplicationModal(application.title)}
              className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-xs hover:shadow-md hover:border-[#8C1538]/40 transition-all duration-200 cursor-pointer flex flex-col group"
            >
              <div className="w-12 h-12 rounded-xl bg-red-50 text-[#8C1538] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-200">
                {application.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1.5 group-hover:text-[#8C1538] transition-colors">
                {application.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {application.desc}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Application Form Modal */}
      <ApplicationFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        applicationTitle={selectedAppTitle}
      />
    </div>
  );
};

export default Applications;
