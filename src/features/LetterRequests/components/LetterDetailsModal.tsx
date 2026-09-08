import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { downloadSlip } from '../../../utils/pdfGenerator';

interface LetterDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  letter: any;
}

interface Step {
  title: string;
  description: string;
  status: 'completed' | 'active' | 'cancelled' | 'upcoming';
}

const getTimelineSteps = (letter: any): Step[] => {
  const isResolved = letter.status === 'Resolved';
  const isInTransit = letter.status === 'In transit' || letter.status === 'In review';
  const isReturned = letter.status === 'Returned';

  return [
    {
      title: '1. Letter Registered & Dispatched',
      description: `Formal correspondence received in central secretariat on ${letter.dateSubmitted || letter.date}.`,
      status: 'completed',
    },
    {
      title: '2. Secretarial Assignment & Division Routing',
      description: isReturned
        ? 'Review halted: Returned for additional citizen documentation.'
        : isInTransit || isResolved
        ? `Routed to ${letter.category || 'Competent Division'} for review.`
        : 'Awaiting desk review.',
      status: isReturned ? 'cancelled' : isInTransit || isResolved ? 'completed' : 'active',
    },
    {
      title: '3. Departmental Evaluation & Drafting',
      description: isReturned
        ? (letter.remarks || 'Returned by council secretariat.')
        : isResolved
        ? 'Evaluation finalized and official response letter authored.'
        : isInTransit
        ? 'Departmental reviewer is assessing the request against municipal bylaws.'
        : 'Pending review.',
      status: isReturned ? 'cancelled' : isResolved ? 'completed' : isInTransit ? 'active' : 'upcoming',
    },
    {
      title: '4. Official Response Issued',
      description: isResolved
        ? 'Official signed letter issued and archived in municipal correspondence ledger.'
        : 'Pending final executive approval.',
      status: isResolved ? 'completed' : 'upcoming',
    },
  ];
};

const TimelineStep = ({ step, isLast }: { step: Step; isLast: boolean }) => {
  let iconBg = 'bg-gray-50 border-gray-200 text-gray-400';
  let icon = <span className="w-2 h-2 bg-gray-300 rounded-full" />;
  let titleColor = 'text-gray-400 font-medium';

  if (step.status === 'completed') {
    iconBg = 'bg-emerald-50 border-emerald-600 text-emerald-600';
    icon = (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
      </svg>
    );
    titleColor = 'text-gray-900 font-bold';
  } else if (step.status === 'active') {
    iconBg = 'bg-amber-50 border-amber-600 text-amber-700 animate-pulse';
    icon = (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
    titleColor = 'text-amber-900 font-extrabold';
  } else if (step.status === 'cancelled') {
    iconBg = 'bg-red-50 border-red-600 text-red-600';
    icon = (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
      </svg>
    );
    titleColor = 'text-red-700 font-bold';
  }

  return (
    <div className="flex gap-4 items-start relative">
      <div className="flex flex-col items-center shrink-0">
        <div className={`w-7 h-7 rounded-full flex items-center justify-center border-2 ${iconBg} z-10 bg-white shadow-2xs`}>
          {icon}
        </div>
        {!isLast && <div className="w-0.5 h-10 my-0.5 bg-gray-200" />}
      </div>

      <div className="pt-0.5 pb-2">
        <h4 className={`text-xs ${titleColor}`}>{step.title}</h4>
        <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">{step.description}</p>
      </div>
    </div>
  );
};

const LetterDetailsModal: React.FC<LetterDetailsModalProps> = ({ isOpen, onClose, letter }) => {
  const { language: activeLanguage } = useLanguage();
  const lang = activeLanguage || 'si';
  const L = (siText: string, enText: string, taText?: string) =>
    lang === 'si' ? siText : lang === 'ta' ? (taText || enText) : enText;

  if (!isOpen || !letter) return null;

  const isResolved = letter.status === 'Resolved';
  const isInTransit = letter.status === 'In transit' || letter.status === 'In review';
  const isReturned = letter.status === 'Returned';
  const steps = getTimelineSteps(letter);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-fadeIn select-none font-sans">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl border border-gray-200 my-8 animate-modalScaleIn text-left">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#8C1538] to-[#5c0d24] p-5 sm:p-6 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold bg-white/20 px-2.5 py-0.5 rounded-md">
                #{letter.refNo || letter.id}
              </span>
              <span className="text-xs uppercase tracking-wider font-semibold text-rose-100">
                • {letter.category}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-white mt-1.5">
              {letter.subject}
            </h3>
            <p className="text-xs text-rose-200 mt-0.5 font-medium">
              🏢 {letter.department || 'Homagama Pradeshiya Sabha Secretariat'}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-white hover:text-gray-200 text-2xl font-bold p-2 leading-none cursor-pointer"
            title="Close"
          >
            &times;
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Status Alert Banners */}
          {isInTransit && (
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 text-xs text-blue-950 space-y-1">
              <div className="font-extrabold flex items-center gap-1.5 text-blue-900">
                <span>📨</span> {L('සමාලෝචනයේ පවතී', 'Under Departmental Review', 'மதிப்பாய்வில் உள்ளது')}
              </div>
              <p className="font-medium text-blue-800">
                {L(
                  'අදාළ දෙපාර්තමේන්තු ප්‍රධානී විසින් ඔබගේ ලිපිය පරීක්ෂා කරමින් පවතී.',
                  'Assigned officer is currently reviewing your correspondence against municipal protocols.',
                  'அதிகாரபூர்வ ஆய்வில் உள்ளது.'
                )}
              </p>
            </div>
          )}

          {isReturned && (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 text-xs text-red-950 space-y-1">
              <div className="font-extrabold flex items-center gap-1.5 text-red-900">
                <span>⚠️</span> {L('ආපසු හරවන ලදී', 'Returned with Remarks', 'திரும்ப அனுப்பப்பட்டது')}
              </div>
              <p className="font-medium text-red-800">
                {letter.remarks || 'Additional verification or official attachments required.'}
              </p>
            </div>
          )}

          {isResolved && (
            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4 text-xs text-emerald-950 space-y-1">
              <div className="font-extrabold flex items-center gap-1.5 text-emerald-900">
                <span>✓</span> {L('නිල ප්‍රතිචාරය නිකුත් කරන ලදී', 'Official Response Issued', 'அதிகாரபூர்வ பதில் வழங்கப்பட்டது')}
              </div>
              <p className="font-medium text-emerald-800">
                {letter.resolutionNotes || 'Official decision signed by council secretary. You can download the response below.'}
              </p>
            </div>
          )}

          {/* Citizen & Letter Metadata Grid */}
          <div className="bg-stone-50 border border-gray-200 rounded-xl p-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <span className="text-gray-500 font-medium block">{L('යොමු කළ දිනය', 'Submission Date', 'சமர்ப்பித்த தேதி')}:</span>
              <span className="font-bold text-gray-900">{letter.dateSubmitted || letter.date}</span>
            </div>
            <div>
              <span className="text-gray-500 font-medium block">{L('වේලාව', 'Submission Time', 'நேரம்')}:</span>
              <span className="font-bold text-[#8C1538]">{letter.timeSubmitted || '10:00 AM'}</span>
            </div>
            <div>
              <span className="text-gray-500 font-medium block">{L('කාණ්ඩය', 'Service Domain', 'வகை')}:</span>
              <span className="font-bold text-gray-900">{letter.category}</span>
            </div>
            <div className="col-span-2 sm:col-span-3">
              <span className="text-gray-500 font-medium block">{L('විෂය මාතෘකාව', 'Subject Header', 'பொருள்')}:</span>
              <span className="font-bold text-gray-900">{letter.subject}</span>
            </div>
            <div className="col-span-2 sm:col-span-3">
              <span className="text-gray-500 font-medium block">{L('සම්පූර්ණ විස්තරය', 'Full Body Content', 'விவரம்')}:</span>
              <p className="text-gray-800 font-medium mt-0.5 leading-relaxed bg-white p-3 rounded-lg border border-gray-150">
                {letter.description}
              </p>
            </div>
          </div>

          {/* Processing Timeline */}
          <div className="space-y-2">
            <h4 className="text-xs font-extrabold text-gray-700 uppercase tracking-wide mb-3">
              {L('ලිපි ගමන්මග හා කාලරේඛාව', 'Secretariat Routing & Review Lifecycle', 'காலவரிசை')}
            </h4>
            <div className="space-y-3 pl-1">
              {steps.map((step, index) => (
                <TimelineStep key={step.title} step={step} isLast={index === steps.length - 1} />
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-stone-50 border-t border-gray-200 p-4 px-6 flex justify-between items-center">
          <button
            type="button"
            onClick={onClose}
            className="border border-gray-300 hover:border-gray-400 bg-white text-gray-700 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer"
          >
            {L('වසා දමන්න', 'Close Dossier', 'மூடு')}
          </button>

          <button
            type="button"
            onClick={() => downloadSlip(letter)}
            className="bg-[#8C1538] hover:bg-[#73102d] text-white px-5 py-2 rounded-lg text-xs font-extrabold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>{L('නිල ලියවිල්ල බාගන්න', 'Download Official Pass Slip', 'பதிவிறக்கு')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LetterDetailsModal;
