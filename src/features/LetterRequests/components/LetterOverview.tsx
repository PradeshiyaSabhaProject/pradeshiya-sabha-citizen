import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import pradeshiyaImg from '../../../assets/pradeshiyasabha.png';

interface LetterOverviewProps {
  onNavigate: (tab: 'overview' | 'letters' | 'new') => void;
  letters: any[];
  onOpenDetails: (letter: any) => void;
}

const LetterOverview: React.FC<LetterOverviewProps> = ({
  onNavigate,
  letters,
  onOpenDetails
}) => {
  const { language: activeLanguage } = useLanguage();
  const lang = activeLanguage || 'si';
  const L = (siText: string, enText: string, taText?: string) =>
    lang === 'si' ? siText : lang === 'ta' ? (taText || enText) : enText;

  const activeLetters = letters.filter(
    (l) => l.status === 'In review' || l.status === 'In transit'
  );

  return (
    <div className="space-y-8">
      {/* Hero Banner with exact building image background & dark gradient overlay */}
      <div
        className="relative h-64 rounded-xl overflow-hidden bg-cover bg-center shadow-lg"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.5), rgba(0,0,0,0.2)), url('${pradeshiyaImg}')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
          <h2 className="text-3xl font-extrabold text-white tracking-wide">
            {L(
              'පුරවැසි ලිපි හා නිල ලිපි හුවමාරු පැනලය',
              'Citizen Letters & Correspondence Portal',
              'குடிமக்கள் கடிதங்கள் போர்டல்'
            )}
          </h2>
        </div>
      </div>

      {/* Quick Services */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-6">Quick Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Submit Letter */}
          <div className="relative border border-gray-150 rounded-xl p-6 bg-white hover:shadow-md transition-shadow flex flex-col justify-between h-48">
            <button
              type="button"
              onClick={() => onNavigate('new')}
              className="absolute top-4 right-4 text-xs font-semibold text-gray-500 hover:text-red-800 transition-colors cursor-pointer"
            >
              Draft Letter
            </button>
            <div>
              <div className="w-12 h-12 rounded-lg bg-red-800 flex items-center justify-center text-white mb-4 shadow-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h4 className="text-base font-bold text-gray-800 mb-1">Submit Formal Letter</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Direct official correspondence to municipal departments and secretariats.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('new')}
              className="mt-2 text-xs font-bold text-red-800 text-left hover:underline cursor-pointer"
            >
              Get Started &rarr;
            </button>
          </div>

          {/* Card 2: Secretariat & Planning */}
          <div className="border border-gray-150 rounded-xl p-6 bg-white hover:shadow-md transition-shadow flex flex-col justify-between h-48">
            <div>
              <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h4 className="text-base font-bold text-gray-800 mb-1">Inquiries &amp; Appeals</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Submit property boundary requests, permits, and tax appeals.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('new')}
              className="text-xs font-bold text-red-800 text-left hover:underline cursor-pointer"
            >
              Lodge Letter &rarr;
            </button>
          </div>

          {/* Card 3: My Letters */}
          <div className="border border-gray-150 rounded-xl p-6 bg-white hover:shadow-md transition-shadow flex flex-col justify-between h-48">
            <div>
              <div className="w-12 h-12 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h4 className="text-base font-bold text-gray-800 mb-1">My Submitted Letters</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Track status and download signed departmental reply passes.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('letters')}
              className="text-xs font-bold text-red-800 text-left hover:underline cursor-pointer"
            >
              View Letters &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* Active & Recent Correspondence Strip */}
      <div className="border border-gray-100 bg-white rounded-xl p-6 shadow-xs">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-gray-800">Pending Review &amp; Routing</h3>
          <button
            type="button"
            onClick={() => onNavigate('letters')}
            className="text-xs font-bold text-gray-500 hover:text-red-800 transition-colors uppercase tracking-wider cursor-pointer"
          >
            VIEW ALL
          </button>
        </div>

        {activeLetters.length === 0 ? (
          <div className="text-center py-8 border border-dashed border-gray-200 rounded-lg text-gray-400 text-sm">
            No pending letters. Get started by drafting a formal letter.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeLetters.map((l) => (
              <button
                key={l.id}
                type="button"
                className="w-full flex items-start justify-between border border-gray-150 rounded-xl p-5 bg-white relative hover:border-gray-300 transition-colors cursor-pointer text-left"
                onClick={() => onOpenDetails(l)}
              >
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-lg">
                    ✉️
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-800">
                      {l.subject}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {l.dateSubmitted} • #{l.refNo}
                    </p>
                    <p className="text-xs text-gray-400 mt-1 truncate max-w-xs">
                      🏢 {l.category}
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded uppercase tracking-wider border bg-amber-50 text-amber-700 border-amber-200">
                  {l.status}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LetterOverview;
