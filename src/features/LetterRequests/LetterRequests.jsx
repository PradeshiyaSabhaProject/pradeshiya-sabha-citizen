import React from 'react';
import { useLetterRequests } from './hooks/useLetterRequests';
import NewLetterModal from './components/NewLetterModal';
import LetterDetailsModal from './components/LetterDetailsModal';
import OfficialLetterModal from './components/OfficialLetterModal';

const LetterRequests = () => {
  const {
    activeTab,
    setActiveTab,
    filteredLetters,
    loading,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    categoryFilter,
    setCategoryFilter,
    dateRange,
    setDateRange,

    // Modal states
    isNewLetterModalOpen,
    openNewLetterModal,
    closeNewLetterModal,
    isDetailsModalOpen,
    openDetailsModal,
    closeDetailsModal,
    isOfficialModalOpen,
    openOfficialModal,
    closeOfficialModal,
    selectedLetter,

    // Form inputs and submit
    formSubject,
    setFormSubject,
    formCategory,
    setFormCategory,
    formDescription,
    setFormDescription,
    handleCreateLetterSubmit
  } = useLetterRequests();

  // Status badges mapping
  const getStatusBadge = (status) => {
    switch (status) {
      case 'In review':
        return (
          <span className="border border-orange-300 text-orange-600 bg-orange-50/30 rounded-full px-4 py-1 text-xs font-semibold inline-block text-center min-w-[100px]">
            In review
          </span>
        );
      case 'Resolved':
        return (
          <span className="border border-green-300 text-green-600 bg-green-50/30 rounded-full px-4 py-1 text-xs font-semibold inline-block text-center min-w-[100px]">
            Resolved
          </span>
        );
      case 'In transit':
        return (
          <span className="border border-blue-300 text-blue-600 bg-blue-50/30 rounded-full px-4 py-1 text-xs font-semibold inline-block text-center min-w-[100px]">
            In transit
          </span>
        );
      case 'Returned':
        return (
          <span className="border border-red-300 text-red-600 bg-red-50/30 rounded-full px-4 py-1 text-xs font-semibold inline-block text-center min-w-[100px]">
            Returned
          </span>
        );
      default:
        return (
          <span className="border border-gray-300 text-gray-600 bg-gray-50/30 rounded-full px-4 py-1 text-xs font-semibold inline-block text-center min-w-[100px]">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Hero Banner */}
        <div 
          className="relative h-64 rounded-xl overflow-hidden bg-cover bg-center shadow-md border border-gray-200"
          style={{ 
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.5), rgba(0,0,0,0.2)), url('https://images.unsplash.com/photo-1541829019-2188201b83a0?w=1200&h=300&fit=crop')` 
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
            <h2 className="text-3xl font-extrabold text-white tracking-wide drop-shadow-sm">
              Citizen Letter Portal
            </h2>
          </div>
        </div>

        {/* Navigation & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gray-200 pb-4">
          {/* Tabs */}
          <div className="flex gap-1.5 flex-wrap">
            {['All Status', 'In Progress', 'Resolved', 'Returned'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all cursor-pointer ${
                  activeTab === tab
                    ? 'bg-[#8C1538]/10 text-[#8C1538] border border-[#8C1538]/20'
                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100 border border-transparent'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search and Action Button */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <div className="relative flex-grow sm:flex-grow-0">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="search"
                className="w-full sm:w-64 border border-red-300 rounded-full py-1.5 pl-10 pr-4 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#8C1538] focus:border-[#8C1538] placeholder-red-300/80 bg-white"
              />
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-[#8C1538]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            <button
              onClick={openNewLetterModal}
              className="bg-[#8C1538] hover:bg-[#73102d] text-white px-5 py-2 rounded-lg font-semibold text-sm transition-all shadow-sm cursor-pointer whitespace-nowrap"
            >
              + New Letter
            </button>
          </div>
        </div>

        {/* Sub-Filters Panel */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-3xs">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Date Range Selector */}
            <div className="flex-1 flex flex-col sm:flex-row items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 bg-gray-50/30 hover:border-gray-400 transition-colors">
              <span className="text-gray-500 text-sm">📅</span>
              <input 
                type="date"
                aria-label="Start date"
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                className="outline-none text-xs text-gray-700 bg-transparent flex-1 cursor-pointer w-full"
              />
              <span className="text-gray-300 text-xs hidden sm:inline">to</span>
              <input 
                type="date"
                aria-label="End date"
                value={dateRange.end}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                className="outline-none text-xs text-gray-700 bg-transparent flex-1 cursor-pointer w-full"
              />
              {(dateRange.start || dateRange.end) && (
                <button 
                  type="button" 
                  onClick={() => setDateRange({ start: '', end: '' })}
                  className="text-gray-400 hover:text-red-600 text-sm font-bold px-1"
                >
                  &times;
                </button>
              )}
            </div>

            {/* Status Dropdown */}
            <div className="flex-1">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 bg-white text-sm text-gray-700 hover:border-gray-400 transition-colors cursor-pointer focus:outline-none"
              >
                <option value="All Statuses">All Statuses</option>
                <option value="In review">In review</option>
                <option value="Resolved">Resolved</option>
                <option value="In transit">In transit</option>
                <option value="Returned">Returned</option>
              </select>
            </div>

            {/* Category Dropdown */}
            <div className="flex-1">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 bg-white text-sm text-gray-700 hover:border-gray-400 transition-colors cursor-pointer focus:outline-none"
              >
                <option value="All Categories">All Categories</option>
                <option value="Building and planning">Building and planning</option>
                <option value="Water and utilities">Water and utilities</option>
                <option value="Land and property">Land and property</option>
                <option value="Tax and finance">Tax and finance</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#8C1538]"></div>
          </div>
        )}

        {/* Table / Results */}
        {!loading && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Ref No</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Subject</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date Submitted</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">View</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-150">
                  {filteredLetters.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-12 text-center text-sm text-gray-500 bg-white">
                        <div className="text-3xl mb-2">📁</div>
                        <p className="font-semibold text-gray-700">No Letter Requests Found</p>
                        <p className="text-xs text-gray-400 mt-1">Try adjusting your filters or search terms.</p>
                      </td>
                    </tr>
                  ) : (
                    filteredLetters.map((letter) => (
                      <tr 
                        key={letter.id} 
                        className="hover:bg-gray-50/50 transition-colors"
                      >
                        {/* Ref No */}
                        <td className="px-6 py-4 text-sm font-bold text-[#8C1538] whitespace-nowrap">
                          #{letter.refNo}
                        </td>
                        
                        {/* Subject */}
                        <td className="px-6 py-4 text-sm font-semibold text-gray-800 max-w-[220px] truncate">
                          {letter.subject}
                        </td>

                        {/* Category */}
                        <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                          {letter.category}
                        </td>

                        {/* Date Submitted */}
                        <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                          <div className="flex flex-col">
                            <span className="font-semibold text-gray-800">{letter.dateSubmitted}</span>
                            <span className="text-[10px] text-gray-400 font-medium">{letter.timeSubmitted}</span>
                          </div>
                        </td>

                        {/* Status badge */}
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          {getStatusBadge(letter.status)}
                        </td>

                        {/* View button (Eye Icon) */}
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <button
                            onClick={() => openOfficialModal(letter)}
                            className="p-2 border border-gray-300 rounded-lg hover:border-[#8C1538] hover:bg-red-50/30 transition-all cursor-pointer inline-flex items-center justify-center"
                            title="View Letter"
                            type="button"
                          >
                            <svg className="w-5 h-5 text-gray-500 hover:text-[#8C1538]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                        </td>

                        {/* Action button (Document Icon) */}
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <button
                            onClick={() => openDetailsModal(letter)}
                            className="p-2 border border-gray-300 rounded-lg hover:border-[#8C1538] hover:bg-red-50/30 transition-all cursor-pointer inline-flex items-center justify-center"
                            title="View Details"
                            type="button"
                          >
                            <svg className="w-5 h-5 text-gray-500 hover:text-[#8C1538]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* New Letter Request Modal */}
      <NewLetterModal
        isOpen={isNewLetterModalOpen}
        onClose={closeNewLetterModal}
        onSubmit={handleCreateLetterSubmit}
        subject={formSubject}
        setSubject={setFormSubject}
        category={formCategory}
        setCategory={setFormCategory}
        description={formDescription}
        setDescription={setFormDescription}
        loading={loading}
      />

      {/* Letter Details Viewer Modal */}
      <LetterDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={closeDetailsModal}
        letter={selectedLetter}
      />

      {/* Official Letter Format Modal */}
      <OfficialLetterModal
        isOpen={isOfficialModalOpen}
        onClose={closeOfficialModal}
        letter={selectedLetter}
      />
    </div>
  );
};

export default LetterRequests;
