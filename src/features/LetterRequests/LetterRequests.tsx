import React from 'react';
import { useLetterRequests } from './hooks/useLetterRequests';
import NewLetterModal from './components/NewLetterModal';
import LetterDetailsModal from './components/LetterDetailsModal';
import OfficialLetterModal from './components/OfficialLetterModal';
import { useLanguage } from '../../context/LanguageContext';

const LetterRequests = () => {
  const {
    activeTab,
    setActiveTab,
    filteredLetters,
    loading,
    searchQuery,
    setSearchQuery,
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

  const { language: activeLanguage } = useLanguage();
  const lang = activeLanguage || 'si';
  const L = (siText: string, enText: string, taText?: string) => {
    if (lang === 'si') return siText;
    if (lang === 'ta') return taText || enText;
    return enText;
  };

  // Status badges mapping
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'In review':
        return (
          <span className="bg-amber-50 text-amber-700 border border-amber-200/80 rounded-full px-3 py-1 text-xs font-bold inline-block text-center min-w-[95px] shadow-3xs">
            {L('සමාලෝචනයේ', 'In review', 'மதிப்பாய்வில்')}
          </span>
        );
      case 'Resolved':
        return (
          <span className="bg-green-50 text-green-700 border border-green-200/80 rounded-full px-3 py-1 text-xs font-bold inline-block text-center min-w-[95px] shadow-3xs">
            {L('විසඳා ඇත', 'Resolved', 'தீர்க்கப்பட்டது')}
          </span>
        );
      case 'In transit':
        return (
          <span className="bg-blue-50 text-blue-700 border border-blue-200/80 rounded-full px-3 py-1 text-xs font-bold inline-block text-center min-w-[95px] shadow-3xs">
            {L('ක්‍රියාත්මකයි', 'In transit', 'செயல்பாட்டில்')}
          </span>
        );
      case 'Returned':
        return (
          <span className="bg-red-50 text-red-700 border border-red-200/80 rounded-full px-3 py-1 text-xs font-bold inline-block text-center min-w-[95px] shadow-3xs">
            {L('ආපසු එවන ලදී', 'Returned', 'திரும்ப அனுப்பப்பட்டது')}
          </span>
        );
      default:
        return (
          <span className="bg-gray-50 text-gray-700 border border-gray-200 rounded-full px-3 py-1 text-xs font-bold inline-block text-center min-w-[95px] shadow-3xs">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-6 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Top Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 mb-6 pb-4 border-b border-gray-200/80">
          <div className="space-y-1.5 sm:space-y-2 max-w-2xl">
            <h1 className="text-xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              {L(
                'පුරවැසි ලිපි හා ඉල්ලීම් පැනලය',
                'Digital Citizen Letters & Correspondence Portal',
                'டிஜிட்டல் குடிமக்கள் கடிதங்கள் பலகை'
              )}
            </h1>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              {L(
                'හෝමාගම ප්‍රාදේශීය සභාවට නිල ලිපි, ඉල්ලීම් සහ විමසීම් මාර්ගගතව යොමු කර ඒවායේ ප්‍රගතිය සහ නිල ප්‍රතිචාර නිරීක්ෂණය කරන්න.',
                'Submit formal correspondence, requests, and inquiries directly to municipal divisions and track live official responses online.',
                'ஹோமகம பிரதேச சபைக்கு உத்தியோகபூர்வ கடிதங்கள் மற்றும் விசாரணைகளை ஆன்லைனில் சமர்ப்பித்து கண்காணிக்கவும்.'
              )}
            </p>
          </div>

          {/* Action Button */}
          <div className="flex items-center gap-3 shrink-0 self-start md:self-auto">
            <button
              type="button"
              onClick={openNewLetterModal}
              className="px-5 py-2.5 rounded-md font-semibold text-sm transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-xs bg-[#8C1538] hover:bg-[#73102d] text-white"
            >
              <span>✍️</span>
              <span>{L('නව ලිපියක් යොමු කරන්න', 'Submit New Letter', 'புதிய கடிதத்தை சமர்ப்பிக்கவும்')}</span>
            </button>
          </div>
        </div>

        {/* Status Tabs and Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          {/* Tabs */}
          <div className="flex items-center gap-2 flex-wrap">
            {[
              { id: 'All Status', label: L('සියල්ල', 'All Status', 'அனைத்தும்') },
              { id: 'In Progress', label: L('ක්‍රියාත්මකයි', 'In Progress', 'செயல்பாட்டில்') },
              { id: 'Resolved', label: L('විසඳා ඇත', 'Resolved', 'தீர்க்கப்பட்டது') },
              { id: 'Returned', label: L('ආපසු එවන ලදී', 'Returned', 'திரும்ப அனுப்பப்பட்டது') }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-md font-semibold text-xs sm:text-sm transition-all duration-200 cursor-pointer shadow-xs ${activeTab === tab.id
                  ? 'bg-[#8C1538] hover:bg-[#73102d] text-white shadow-xs'
                  : 'bg-white border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 hover:bg-gray-50 shadow-2xs'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={L('ලිපි හෝ යොමු අංක සොයන්න...', 'Search letters or ref no...', 'கடிதங்களைத் தேடுங்கள்...')}
              className="w-full bg-[#f3f4f6] border border-transparent focus:border-gray-300 focus:bg-white rounded-xl py-2.5 pl-10 pr-4 text-sm text-gray-800 placeholder-gray-500 focus:outline-none transition-all duration-200 shadow-2xs"
            />
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Sub-Filters Panel */}
        <div className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-2xs mb-6">
          <div className="flex flex-col md:flex-row items-center gap-4 justify-start">
            {/* Date Range Selector */}
            <div className="w-full md:w-1/3 flex items-center gap-2 border border-gray-300 rounded-xl px-3.5 py-2 bg-gray-50/50 hover:border-gray-400 transition-colors">
              <span className="text-gray-500 text-sm">📅</span>
              <input
                type="date"
                aria-label="Start date"
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                className="outline-none text-xs text-gray-700 bg-transparent flex-1 cursor-pointer w-full"
              />
              <span className="text-gray-400 text-xs font-semibold hidden sm:inline">to</span>
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
                  className="text-gray-400 hover:text-red-600 text-sm font-bold px-1.5 cursor-pointer"
                  title="Clear Dates"
                >
                  &times;
                </button>
              )}
            </div>

            {/* Category Dropdown */}
            <div className="w-full md:w-1/3">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3.5 py-2 bg-white text-xs sm:text-sm font-medium text-gray-700 hover:border-gray-400 transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#8C1538] shadow-2xs"
              >
                <option value="All Categories">{L('සියලුම කාණ්ඩ', 'All Categories', 'அனைத்து வகைகளும்')}</option>
                <option value="Building and planning">{L('ගොඩනැගිලි හා සැලසුම්', 'Building and planning', 'கட்டடம் மற்றும் திட்டமிடல்')}</option>
                <option value="Water and utilities">{L('ජලය හා උපයෝගීතා', 'Water and utilities', 'நீர் மற்றும் பயன்பாடுகள்')}</option>
                <option value="Land and property">{L('ඉඩම් හා දේපළ', 'Land and property', 'நிலம் மற்றும் சொத்து')}</option>
                <option value="Tax and finance">{L('බදු හා මූල්‍ය', 'Tax and finance', 'வரி மற்றும் நிதி')}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#8C1538]"></div>
          </div>
        )}

        {/* Letters Table Card */}
        {!loading && (
          <div className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/80 border-b border-gray-200/80">
                    <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">{L('යොමු අංකය', 'Ref No', 'குறிப்பு எண்')}</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">{L('මාතෘකාව', 'Subject', 'பொருள்')}</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">{L('කාණ්ඩය', 'Category', 'வகை')}</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">{L('යොමු කළ දිනය', 'Date Submitted', 'சமர்ப்பித்த தேதி')}</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider text-center">{L('තත්ත්වය', 'Status', 'நிலை')}</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider text-center">{L('විස්තර', 'Details', 'விவரங்கள்')}</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider text-center">{L('නිල ලිපිය', 'Letter', 'கடிதம்')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-150">
                  {filteredLetters.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-16 text-center text-sm text-gray-500 bg-white">
                        <div className="text-4xl mb-3">📁</div>
                        <p className="font-bold text-gray-800 text-base">{L('ලිපි කිසිවක් හමු නොවිණි', 'No Letter Requests Found', 'கடிதங்கள் எதுவும் காணப்படவில்லை')}</p>
                        <p className="text-xs text-gray-400 mt-1">{L('ඔබගේ සෙවුමට හෝ පෙරහන් වලට ගැලපෙන ලිපි නොමැත.', 'Try adjusting your filters or search terms.', 'உங்கள் தேடலை மாற்றியமைக்கவும்.')}</p>
                      </td>
                    </tr>
                  ) : (
                    filteredLetters.map((letter) => (
                      <tr
                        key={letter.id}
                        className="hover:bg-gray-50/60 transition-colors"
                      >
                        {/* Ref No */}
                        <td className="px-6 py-4 text-sm font-bold text-[#8C1538] whitespace-nowrap">
                          #{letter.refNo}
                        </td>

                        {/* Subject */}
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900 max-w-[240px] truncate">
                          {letter.subject}
                        </td>

                        {/* Category */}
                        <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap font-medium">
                          {letter.category}
                        </td>

                        {/* Date Submitted */}
                        <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                          <div className="flex flex-col">
                            <span className="font-semibold text-gray-800">{letter.dateSubmitted}</span>
                            <span className="text-[11px] text-gray-400 font-medium">{letter.timeSubmitted}</span>
                          </div>
                        </td>

                        {/* Status badge */}
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          {getStatusBadge(letter.status)}
                        </td>

                        {/* View Details button */}
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <button
                            onClick={() => openDetailsModal(letter)}
                            className="p-2 border border-gray-300 rounded-lg hover:border-[#8C1538] hover:bg-red-50/40 transition-all cursor-pointer inline-flex items-center justify-center text-gray-600 hover:text-[#8C1538] shadow-2xs"
                            title={L('විස්තර බලන්න', 'View Details', 'விவரங்கள்')}
                            type="button"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                        </td>

                        {/* Official Letter button */}
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <button
                            onClick={() => openOfficialModal(letter)}
                            className="p-2 border border-gray-300 rounded-lg hover:border-[#8C1538] hover:bg-red-50/40 transition-all cursor-pointer inline-flex items-center justify-center text-gray-600 hover:text-[#8C1538] shadow-2xs"
                            title={L('නිල ලිපිය බලන්න', 'View Official Letter Format', 'அதிகாரபூர்வ கடிதம்')}
                            type="button"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
