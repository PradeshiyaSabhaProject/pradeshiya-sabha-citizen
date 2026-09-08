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

  // Badge colors for status
  const statusColors = {
    'In review': 'border-amber-200 bg-amber-50/80 text-amber-800',
    'Resolved': 'border-green-200 bg-green-50/80 text-green-800',
    'In transit': 'border-blue-200 bg-blue-50/80 text-blue-800',
    'Returned': 'border-red-200 bg-red-50/80 text-red-800'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs animate-fade-in p-4 sm:p-0">
      <div className="w-full max-w-lg scale-95 sm:scale-100 overflow-hidden rounded-xl bg-white p-5 sm:p-6 shadow-2xl transition-all duration-300 ease-out border border-gray-150 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-5 shrink-0">
          <div>
            <span className="text-[10px] font-bold text-red-800 uppercase tracking-widest bg-red-50 px-2 py-0.5 rounded">
              {L('ඉල්ලුම්පත් විස්තරය', 'Request Details', 'கோரிக்கை விவரங்கள்')}
            </span>
            <h3 className="text-lg font-extrabold text-gray-800 mt-1">Letter #{letter.refNo}</h3>
          </div>
          <button 
            type="button"
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold p-1 leading-none cursor-pointer"
          >
            &times;
          </button>
        </div>

        {/* Content Area */}
        <div className="overflow-y-auto flex-1 space-y-6 pr-1">
          {/* Main Info */}
          <div className="space-y-4">
            <div>
              <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{L('විෂය / මාතෘකාව', 'Subject', 'பொருள்')}</span>
              <h4 className="text-base font-bold text-gray-900 leading-snug">{letter.subject}</h4>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-4">
              <div>
                <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">{L('කාණ්ඩය', 'Category', 'வகை')}</span>
                <span className="text-sm font-bold text-gray-800">{letter.category}</span>
              </div>
              <div>
                <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">{L('යොමු කළ දිනය', 'Submitted On', 'சமர்ப்பித்த தேதி')}</span>
                <span className="text-sm font-bold text-gray-800">{letter.dateSubmitted}</span>
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
            <div className="mb-5 border border-gray-150 rounded-xl overflow-hidden text-xs">
              <div className="bg-gray-50 px-4 py-2 border-b border-gray-150 font-bold text-gray-700 uppercase tracking-wider">
                {L('සම්පූර්ණ විස්තරය', 'Description Content', 'முழுமையான விவரம்')}
              </div>
              <div className="p-4 bg-white text-sm text-gray-800 leading-relaxed font-normal whitespace-pre-wrap max-h-48 overflow-y-auto">
                {letter.description}
              </div>
            </div>
          </div>

          {/* Timeline View */}
          {letter.timeline && letter.timeline.length > 0 && (
            <div className="space-y-1 mb-6">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2.5">
                {L('ප්‍රගති කාලරේඛාව', 'Processing Timeline', 'காலவரிசை')}
              </h4>
              
              <div className="space-y-4 py-1 pl-1">
                {letter.timeline.map((step, index) => {
                  let iconBg = 'bg-gray-50 border-gray-200 text-gray-400';
                  let icon = <span className="w-2 h-2 bg-gray-450 rounded-full" />;
                  let titleColor = 'text-gray-400 font-medium';

                  // Determine status for styling based on step text or simple logic
                  // Since letter timeline steps usually just have a status string like "Received", "Reviewed", we'll just style them generally completed if past.
                  // For simplicity, we treat all steps in the array as 'completed' except maybe the last one if it's not resolved.
                  let isCompleted = true;
                  if (index === letter.timeline.length - 1 && !isResolved) {
                    isCompleted = false; // The current active step
                  }

                  if (isCompleted) {
                    iconBg = 'bg-green-50 border-green-600 text-green-600';
                    icon = (
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    );
                    titleColor = 'text-gray-800 font-bold';
                  } else {
                    iconBg = 'bg-amber-50 border-amber-600 text-amber-700 animate-pulse';
                    icon = (
                      <svg className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '3s' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    );
                    titleColor = 'text-amber-800 font-extrabold';
                  }

                  const isLast = index === letter.timeline.length - 1;

                  return (
                    <div key={`${step.status}-${step.date}`} className="flex gap-4 items-start relative">
                      {/* Left Column: Bullet and Connector Line */}
                      <div className="flex flex-col items-center shrink-0">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center border-2 ${iconBg} z-10 bg-white shadow-xs`}>
                          {icon}
                        </div>
                        {!isLast && (
                          <div className={`w-0.5 h-10 my-0.5 ${isCompleted ? 'bg-green-600' : 'bg-gray-200'}`} />
                        )}
                      </div>

                      {/* Right Column: Step Text */}
                      <div className="pt-0.5 pb-2">
                        <div className="flex items-center gap-2">
                          <h4 className={`text-sm ${titleColor}`}>{step.status}</h4>
                          <span className="text-[10px] font-bold text-gray-400">{step.date}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="mt-5 flex justify-end gap-3 pt-3 border-t border-gray-100 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md bg-gray-150 hover:bg-gray-250 px-4 py-2 text-xs font-bold text-gray-700 transition-colors cursor-pointer"
          >
            {L('වසා දමන්න', 'Close Details', 'மூடு')}
          </button>
          
          {isResolved && (
            <button
              type="button"
              onClick={() => alert(`Downloading Letter Response for ${letter.refNo}...`)}
              className="rounded-md bg-red-800 hover:bg-red-900 px-4 py-2 text-xs font-extrabold text-white transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              {L('ප්‍රතිචාරය බාගන්න', 'Download Response', 'பதிலை பதிவிறக்கம் செய்யவும்')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LetterDetailsModal;
