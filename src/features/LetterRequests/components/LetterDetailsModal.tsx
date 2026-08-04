import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const LetterDetailsModal = ({ isOpen, onClose, letter }) => {
  const { language: activeLanguage } = useLanguage();
  const lang = activeLanguage || 'si';
  const L = (siText: string, enText: string, taText?: string) => {
    if (lang === 'si') return siText;
    if (lang === 'ta') return taText || enText;
    return enText;
  };

  if (!isOpen || !letter) return null;

  const isResolved = letter.status === 'Resolved';

  // Badge colors
  const statusColors = {
    'In review': 'border-amber-200 bg-amber-50/80 text-amber-800',
    'Resolved': 'border-green-200 bg-green-50/80 text-green-800',
    'In transit': 'border-blue-200 bg-blue-50/80 text-blue-800',
    'Returned': 'border-red-200 bg-red-50/80 text-red-800'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-1.5 sm:p-6 bg-black/65 backdrop-blur-sm overflow-hidden animate-fadeIn select-none font-sans">
      <div className="bg-[#F8FAFC] rounded-2xl sm:rounded-3xl max-w-3xl w-full max-h-[96vh] sm:max-h-[88vh] overflow-hidden shadow-2xl border border-gray-200 flex flex-col my-auto text-left">
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-[#8C1538] to-[#5e0d23] text-white px-3 sm:px-8 py-2.5 sm:py-6 flex items-center justify-between gap-4 relative shadow-md shrink-0">
          <div className="space-y-0.5 sm:space-y-1 min-w-0">
            <h2 className="text-base sm:text-2xl font-extrabold tracking-tight leading-tight">
              {L('ඉල්ලුම්පත් විස්තරය', 'Request Details', 'கோரிக்கை விவரங்கள்')} - #{letter.refNo}
            </h2>
            <p className="text-[11px] sm:text-sm text-white/90 font-medium truncate sm:whitespace-normal">
              {L(
                'ලිපියේ ප්‍රගතිය, කාලරේඛාව සහ නිල ප්‍රතිචාර නිරීක්ෂණය කරන්න',
                'Track status, correspondence timeline, and official actions',
                'நிலை, கடிதத் தொடர்பு காலவரிசை மற்றும் அதிகாரபூர்வ நடவடிக்கைகளைக் கண்காணிக்கவும்'
              )}
            </p>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="text-white/80 hover:text-white text-2xl sm:text-3xl font-bold p-1 transition-all cursor-pointer leading-none"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        {/* Content Area */}
        <div className="p-4 sm:p-8 overflow-y-auto flex-1 space-y-6">
          {/* Main Info Card */}
          <div className="bg-white rounded-2xl border border-gray-200/90 p-4 sm:p-6 shadow-xs space-y-5">
            <div>
              <span className="block text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-1">{L('විෂය / මාතෘකාව', 'Subject', 'பொருள்')}</span>
              <h4 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">{letter.subject}</h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-100 pt-4">
              <div>
                <span className="block text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-0.5">{L('කාණ්ඩය', 'Category', 'வகை')}</span>
                <span className="text-sm font-bold text-gray-800">{letter.category}</span>
              </div>
              <div>
                <span className="block text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-0.5">{L('යොමු කළ දිනය හා වේලාව', 'Date & Time Submitted', 'சமர்ப்பித்த தேதி')}</span>
                <span className="text-sm font-bold text-gray-800">{letter.dateSubmitted} at {letter.timeSubmitted}</span>
              </div>
            </div>

            {/* Status Section */}
            <div className={`p-4 rounded-xl border ${statusColors[letter.status] || 'border-gray-200 bg-gray-50 text-gray-800'} shadow-3xs`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider">{L('වත්මන් තත්ත්වය:', 'Current Status:', 'தற்போதைய நிலை:')}</span>
                <span className="text-xs font-extrabold uppercase px-3 py-1 rounded-full border bg-white shadow-2xs">
                  {letter.status}
                </span>
              </div>
              {letter.remarks && (
                <p className="mt-2.5 text-xs leading-relaxed italic font-medium opacity-95 border-t border-black/5 pt-2">
                  <span className="font-bold not-italic">{L('සටහන්:', 'Remarks:', 'குறிப்புகள்:')}</span> {letter.remarks}
                </p>
              )}
            </div>

            {/* Description Section */}
            <div>
              <span className="block text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">{L('සම්පූර්ණ විස්තරය', 'Description Content', 'முழுமையான விவரம்')}</span>
              <div className="text-sm text-gray-800 bg-[#f9fafb] p-4 rounded-xl border border-gray-200/80 leading-relaxed font-normal whitespace-pre-wrap">
                {letter.description}
              </div>
            </div>
          </div>

          {/* Timeline Card */}
          {letter.timeline && letter.timeline.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-200/90 p-4 sm:p-6 shadow-xs">
              <span className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2.5">
                {L('ප්‍රගති කාලරේඛාව', 'Correspondence Timeline', 'காலவரிசை')}
              </span>
              <div className="space-y-5 relative pl-5 border-l-2 border-red-200 ml-2 pt-1">
                {letter.timeline.map((step, idx) => (
                  <div key={idx} className="relative">
                    {/* Circle Dot */}
                    <div className="absolute -left-[27px] top-0.5 w-4 h-4 rounded-full bg-white border-2 border-[#8C1538] flex items-center justify-center shadow-2xs">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#8C1538]"></div>
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-[#8C1538] uppercase tracking-wider">{step.date}</span>
                      <div className="text-sm font-bold text-gray-900 mt-0.5">{step.status}</div>
                      <p className="text-xs text-gray-600 mt-1 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex items-center justify-between gap-3 pt-2 border-t border-gray-200/80">
            <div>
              {isResolved && (
                <button
                  type="button"
                  onClick={() => alert(`Downloading Letter Response for ${letter.refNo}...`)}
                  className="rounded-md border border-[#8C1538] text-[#8C1538] hover:bg-red-50/60 px-5 py-2.5 text-sm font-semibold transition-colors cursor-pointer inline-flex items-center gap-2 shadow-2xs"
                >
                  <span>📥</span>
                  <span>{L('නිල ප්‍රතිචාරය බාගන්න', 'Download Response Letter', 'பதிலை பதிவிறக்கம் செய்யவும்')}</span>
                </button>
              )}
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-md bg-gray-800 hover:bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white transition-colors cursor-pointer shadow-xs"
              >
                {L('වසා දමන්න', 'Close', 'மூடு')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LetterDetailsModal;
