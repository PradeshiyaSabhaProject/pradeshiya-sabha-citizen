import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLetterRequests } from './hooks/useLetterRequests';
import LetterOverview from './components/LetterOverview';
import LetterForm from './components/LetterForm';
import LetterDetailsModal from './components/LetterDetailsModal';
import OfficialLetterModal from './components/OfficialLetterModal';
import { useLanguage } from '../../context/LanguageContext';

const getCategoryAvatar = (category: string) => {
  if (!category) return '✉️';
  const c = category.toLowerCase();
  if (c.includes('building') || c.includes('planning')) return '🏗️';
  if (c.includes('water') || c.includes('utility')) return '🚰';
  if (c.includes('land') || c.includes('property')) return '🏡';
  if (c.includes('tax') || c.includes('finance')) return '💰';
  if (c.includes('health') || c.includes('sanitation')) return '🌿';
  return '📄';
};

const getStatusBadgeStyle = (status: string) => {
  switch (status) {
    case 'Resolved':
      return 'bg-emerald-50 text-emerald-800 border-emerald-200';
    case 'In transit':
      return 'bg-blue-50 text-blue-800 border-blue-200';
    case 'Returned':
      return 'bg-red-50 text-red-800 border-red-200';
    case 'In review':
    default:
      return 'bg-amber-50 text-amber-800 border-amber-200';
  }
};

const LetterRequests: React.FC = () => {
  const [activeMainTab, setActiveMainTab] = useState<'overview' | 'letters' | 'form'>('overview');

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
    isDetailsModalOpen,
    openDetailsModal,
    closeDetailsModal,
    isOfficialModalOpen,
    openOfficialModal,
    closeOfficialModal,
    selectedLetter,

    // Form inputs and submit
    handleCreateLetterSubmit
  } = useLetterRequests();

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab === 'letters') {
      setActiveMainTab('letters');
    } else if (tab === 'form' || tab === 'new') {
      setActiveMainTab('form');
    } else {
      setActiveMainTab('overview');
    }
  }, [location.search]);

  const { language: activeLanguage } = useLanguage();
  const lang = activeLanguage || 'si';
  const L = (siText: string, enText: string, taText?: string) =>
    lang === 'si' ? siText : lang === 'ta' ? (taText || enText) : enText;

  const handleOpenLetterDetails = (letter: any) => {
    openDetailsModal(letter);
  };

  const handleFormSubmission = async (formData: any) => {
    // If handleCreateLetterSubmit accepts event or direct data, we can call service directly or through hook
    const fakeEvent = {
      preventDefault: () => {}
    };
    try {
      await handleCreateLetterSubmit({
        subject: formData.subject,
        category: formData.category,
        description: formData.description,
        recipient: formData.recipient,
        senderName: formData.fullName,
        senderPhone: formData.contactNumber,
        senderEmail: formData.email,
        urgency: formData.urgency,
        document: formData.document,
        documentName: formData.documentName
      });
      setActiveMainTab('letters');
    } catch (e) {
      console.error(e);
      setActiveMainTab('letters');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Inner Navigation Tabs matching Appointment / Facility Booking / Complaints */}
      <div className="max-w-6xl mx-auto mb-6 flex justify-start border-b border-gray-250">
        <button
          type="button"
          onClick={() => setActiveMainTab('overview')}
          className={`px-4 py-2.5 text-xs font-bold transition-all uppercase tracking-wide border-b-2 cursor-pointer ${
            activeMainTab === 'overview'
              ? 'border-red-850 text-red-850'
              : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          {L('දළ විශ්ලේෂණය', 'Portal Overview', 'கண்ணோட்டம்')}
        </button>
        <button
          type="button"
          onClick={() => setActiveMainTab('letters')}
          className={`px-4 py-2.5 text-xs font-bold transition-all uppercase tracking-wide border-b-2 cursor-pointer ${
            activeMainTab === 'letters'
              ? 'border-red-850 text-red-850'
              : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          {L('මගේ ලිපි', 'My Letters', 'என் கடிதங்கள்')} ({filteredLetters.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveMainTab('form')}
          className={`px-4 py-2.5 text-xs font-bold transition-all uppercase tracking-wide border-b-2 cursor-pointer ${
            activeMainTab === 'form'
              ? 'border-red-850 text-red-850'
              : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          {L('නව ලිපියක් යොමු කරන්න', 'Submit Letter', 'கடிதம் சமர்ப்பிக்க')}
        </button>
      </div>

      <div className="max-w-6xl mx-auto">
        {activeMainTab === 'overview' && (
          <LetterOverview
            onNavigate={(tab) => {
              if (tab === 'new' || (tab as any) === 'form') {
                setActiveMainTab('form');
              } else {
                setActiveMainTab(tab as any);
              }
            }}
            letters={filteredLetters}
            onOpenDetails={handleOpenLetterDetails}
          />
        )}

        {activeMainTab === 'letters' && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-6">
            {/* Header Strip */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-150">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {L('මගේ නිල ලිපි සහ ඉල්ලීම්', 'My Submitted Correspondence & Requests', 'என் கடிதங்கள்')}
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  {L(
                    'දෙපාර්තමේන්තු ගමන් මග, නිල අත්සන් සහ ප්‍රතිචාර ලිපි බාගත කිරීම් සජීවීව නිරීක්ෂණය කරන්න.',
                    'Monitor departmental progress, executive endorsements, and download official response letters.',
                    'அதிகாரபூர்வ பதில்களை கண்காணிக்கவும்.'
                  )}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveMainTab('form')}
                className="bg-[#8C1538] hover:bg-[#73102d] text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer self-start sm:self-auto shrink-0"
              >
                <span>+</span>
                <span>{L('නව ලිපියක්', 'New Letter', 'புதிய கடிதம்')}</span>
              </button>
            </div>

            {/* Filter and Search Controls */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                {/* Status Pills */}
                <div className="flex items-center gap-2 flex-wrap">
                  {[
                    { id: 'All Status', label: L('සියල්ල', 'All', 'அனைத்தும்') },
                    { id: 'In Progress', label: L('ක්‍රියාත්මකයි', 'In Review', 'மதிப்பாய்வில்') },
                    { id: 'Resolved', label: L('විසඳා ඇත', 'Resolved', 'தீர்க்கப்பட்டது') },
                    { id: 'Returned', label: L('ආපසු එවන ලදී', 'Returned', 'திரும்பியது') }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        activeTab === tab.id
                          ? 'bg-[#8C1538] text-white shadow-2xs'
                          : 'bg-stone-50 border border-gray-200 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Category Dropdown */}
                <div className="w-full sm:w-48">
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="w-full bg-stone-50 border border-gray-200 rounded-lg py-1.5 px-3 text-xs font-medium text-gray-700 focus:outline-none focus:border-gray-400"
                  >
                    <option value="All Categories">{L('සියලුම කාණ්ඩ', 'All Categories', 'அனைத்து வகைகளும்')}</option>
                    <option value="Building and planning">{L('ගොඩනැගිලි හා සැලසුම්', 'Building & Planning', 'கட்டடம்')}</option>
                    <option value="Water and utilities">{L('ජලය හා උපයෝගීතා', 'Water & Utilities', 'நீர்')}</option>
                    <option value="Land and property">{L('ඉඩම් හා දේපළ', 'Land & Property', 'நிலம்')}</option>
                    <option value="Tax and finance">{L('බදු හා මූල්‍ය', 'Tax & Finance', 'வரி')}</option>
                  </select>
                </div>
              </div>

              {/* Search Box */}
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={L('ලිපි විෂය හෝ යොමු අංකයෙන් සොයන්න...', 'Search letters by subject, department, or reference #...', 'தேடுங்கள்...')}
                  className="w-full bg-stone-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-xs text-gray-800 placeholder-gray-400 focus:bg-white focus:outline-none focus:border-gray-400 transition-all shadow-3xs"
                />
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Loading Spinner */}
            {loading && (
              <div className="flex items-center justify-center py-16">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#8C1538]"></div>
              </div>
            )}

            {/* Letter Cards List */}
            {!loading && (
              filteredLetters.length === 0 ? (
                <div className="text-center py-16 border border-dashed border-gray-200 rounded-xl text-gray-400 text-xs space-y-2">
                  <p>{L('ලිපි කිසිවක් හමු නොවිණි.', 'No letter requests match the selected filters.', 'கடிதங்கள் எதுவும் இல்லை.')}</p>
                  <button
                    type="button"
                    onClick={() => setActiveMainTab('form')}
                    className="text-xs font-bold text-[#8C1538] underline cursor-pointer"
                  >
                    {L('නව ලිපියක් යොමු කරන්න', 'Submit a New Letter Now', 'புதிய கடிதம் சமர்ப்பிக்கவும்')}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredLetters.map((letter) => {
                    const isResolved = letter.status === 'Resolved';
                    const isInTransit = letter.status === 'In transit' || letter.status === 'In review';
                    const isReturned = letter.status === 'Returned';

                    return (
                      <div
                        key={letter.id}
                        className="border border-gray-200 rounded-xl overflow-hidden bg-white hover:border-gray-300 transition-all flex flex-col shadow-xs"
                      >
                        {/* Top Strip */}
                        <div className="bg-gray-50/75 px-5 py-2.5 border-b border-gray-150 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-[#8C1538] bg-red-50 px-2 py-0.5 rounded border border-red-100">
                              #{letter.refNo || letter.id}
                            </span>
                            <span className="font-semibold text-gray-700">
                              • {letter.category}
                            </span>
                          </div>
                          <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded uppercase tracking-wider border ${getStatusBadgeStyle(letter.status)}`}>
                            {letter.status}
                          </span>
                        </div>

                        {/* Main Card Content */}
                        <div className="p-5 flex items-start gap-4">
                          {/* Avatar Box */}
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 border ${
                            isResolved
                              ? 'bg-emerald-50 border-emerald-200'
                              : isReturned
                              ? 'bg-red-50 border-red-200'
                              : 'bg-blue-50 border-blue-200'
                          }`}>
                            {getCategoryAvatar(letter.category)}
                          </div>

                          {/* Middle Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline justify-between gap-2">
                              <h3 className="text-base font-bold text-gray-900 truncate">
                                {letter.subject}
                              </h3>
                            </div>

                            <p className="text-xs text-gray-600 mt-1 line-clamp-2 leading-relaxed">
                              {letter.description}
                            </p>

                            {/* Metadata Strip */}
                            <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-gray-600 font-medium">
                              <span className="flex items-center gap-1.5">
                                📅 {letter.dateSubmitted} {letter.timeSubmitted && `• ${letter.timeSubmitted}`}
                              </span>
                              <span className="flex items-center gap-1.5 border-l border-gray-200 pl-3">
                                🏢 {letter.category}
                              </span>
                            </div>
                          </div>

                          {/* Right Action Buttons */}
                          <div className="shrink-0 flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => openDetailsModal(letter)}
                              className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 p-2 rounded-lg transition-colors cursor-pointer shadow-3xs flex items-center gap-1 text-xs font-semibold"
                              title="View Full Letter Dossier"
                            >
                              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              <span className="hidden sm:inline">Details</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => openOfficialModal(letter)}
                              className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 p-2 rounded-lg transition-colors cursor-pointer shadow-3xs flex items-center gap-1 text-xs font-semibold"
                              title="View Formal Letter Layout"
                            >
                              <svg className="w-4 h-4 text-[#8C1538]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              <span className="hidden sm:inline">Letter</span>
                            </button>
                          </div>
                        </div>

                        {/* Status Strips */}
                        {isInTransit && (
                          <div className="bg-blue-50/70 border-t border-blue-200 px-5 py-2.5 text-xs text-blue-900 flex items-center justify-between">
                            <span>📨 {L('අදාළ දෙපාර්තමේන්තුව වෙත යොමු කර ඇත.', 'Letter assigned and under active review in the department.', 'மதிப்பாய்வில் உள்ளது.')}</span>
                          </div>
                        )}

                        {isReturned && (
                          <div className="bg-red-50/70 border-t border-red-200 px-5 py-2.5 text-xs text-red-900 flex items-center justify-between">
                            <span>⚠️ {letter.remarks || L('වැඩිදුර ලේඛන අවශ්‍ය බැවින් ආපසු හරවන ලදී.', 'Returned with remarks. Action required from citizen.', 'திரும்பியது.')}</span>
                          </div>
                        )}

                        {isResolved && (
                          <div className="bg-emerald-50/70 border-t border-emerald-200 px-5 py-2.5 text-xs text-emerald-900 flex items-center justify-between">
                            <span>✓ {L('නිල ප්‍රතිචාර ලිපිය අනුමත කර නිකුත් කරන ලදී.', 'Official response approved and issued by the secretariat.', 'பதில் வழங்கப்பட்டது.')}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )
            )}
          </div>
        )}

        {activeMainTab === 'form' && (
          <LetterForm
            onSubmit={handleFormSubmission}
            onBackToDashboard={() => setActiveMainTab('overview')}
            loading={loading}
          />
        )}
      </div>

      {/* Modals for Dossier & Official PDF Letter */}
      <LetterDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={closeDetailsModal}
        letter={selectedLetter}
      />

      <OfficialLetterModal
        isOpen={isOfficialModalOpen}
        onClose={closeOfficialModal}
        letter={selectedLetter}
      />
    </div>
  );
};

export default LetterRequests;
