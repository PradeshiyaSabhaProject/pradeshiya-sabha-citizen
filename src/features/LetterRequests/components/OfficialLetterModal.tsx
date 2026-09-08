import React from 'react';
import logoImg from '../../../assets/logo.png';
import { useLanguage } from '../../../context/LanguageContext';

const OfficialLetterModal = ({ isOpen, onClose, letter }) => {
  const { language: activeLanguage } = useLanguage();
  const lang = activeLanguage || 'si';
  const L = (siText: string, enText: string, taText?: string) =>
    lang === 'si' ? siText : lang === 'ta' ? (taText || enText) : enText;

  if (!isOpen || !letter) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-1.5 sm:p-6 bg-black/65 backdrop-blur-xs overflow-hidden animate-fadeIn select-none font-sans print:p-0 print:bg-white">
      <div className="bg-[#F8FAFC] rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[96vh] sm:max-h-[90vh] overflow-hidden shadow-2xl border border-gray-200 flex flex-col my-auto text-left animate-modalScaleIn print:max-h-none print:shadow-none print:border-none print:rounded-none">
        {/* Modal Header Banner (Hidden in print) */}
        <div className="bg-gradient-to-r from-[#8C1538] to-[#5e0d23] text-white px-3 sm:px-8 py-2.5 sm:py-5 flex items-center justify-between gap-4 relative shadow-md shrink-0 print:hidden">
          <div className="flex items-center gap-3">
            <div>
              <h2 className="text-base sm:text-xl font-extrabold tracking-tight leading-tight">
                {L('නිල ලිපි ආකෘතිය', 'Official Letter Format', 'அதிகாரபூர்வ கடிதம்')}
              </h2>
              <p className="text-[11px] sm:text-xs text-white/85 font-medium">
                {L('හෝමාගම ප්‍රාදේශීය සභාවේ නිල ලේඛන පිටපත', 'Homagama Pradeshiya Sabha Official Record Copy', 'ஹோமகம பிரதேச சபை உத்தியோகபூர்வ ஆவணம்')}
              </p>
            </div>
            <span className="bg-white/15 text-white border border-white/20 px-2.5 py-0.5 rounded-md text-xs font-bold">
              #{letter.refNo}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="bg-white/15 hover:bg-white/25 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs border border-white/20"
              title="Print Letter"
              type="button"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              <span>{L('මුද්‍රණය කරන්න', 'Print', 'அச்சிட')}</span>
            </button>
            <button
              onClick={onClose}
              type="button"
              className="text-white/80 hover:text-white text-2xl sm:text-3xl font-bold p-1 transition-all cursor-pointer leading-none ml-1"
              aria-label="Close modal"
            >
              &times;
            </button>
          </div>
        </div>

        {/* Letter Content (Printable Area) */}
        <div className="p-6 sm:p-12 bg-white flex-grow overflow-y-auto print:p-0 print:overflow-visible select-text" id="printable-letter">
          {/* Letterhead */}
          <div className="flex flex-col items-center border-b-2 border-[#8C1538] pb-6 mb-8 text-center">
            <img src={logoImg} alt="Homagama Pradeshiya Sabha Logo" className="h-20 mb-3" />
            <h1 className="text-xl sm:text-2xl font-bold text-[#8C1538] tracking-tight">HOMAGAMA PRADESHIYA SABHA</h1>
            <p className="text-sm font-semibold text-gray-700 mt-1">Court Road, Homagama, Sri Lanka.</p>
            <p className="text-xs text-gray-500 mt-1">Tel: +94 11 285 5230 | Email: homagamapradeshiyasabawa@gmail.com</p>
          </div>

          {/* Letter Metadata */}
          <div className="flex justify-between items-start mb-8 text-sm text-gray-800">
            <div>
              <p className="font-semibold mb-1">My No: <span className="font-normal text-gray-900 font-mono font-bold">{letter.refNo}</span></p>
              <p className="font-semibold">Category: <span className="font-normal text-gray-700">{letter.category}</span></p>
            </div>
            <div className="text-right">
              <p className="font-semibold mb-1">Date: <span className="font-normal text-gray-700">{letter.dateSubmitted}</span></p>
            </div>
          </div>

          {/* Addressee */}
          <div className="mb-8 text-sm text-gray-800 leading-relaxed">
            <p>To,</p>
            <p className="font-bold mt-1 text-gray-900">The Applicant / Relevant Authority,</p>
            <p>Homagama.</p>
          </div>

          {/* Subject */}
          <div className="mb-6">
            <p className="text-sm font-bold text-gray-900 underline underline-offset-4">
              Subject: {letter.subject}
            </p>
          </div>

          {/* Body */}
          <div className="text-sm text-gray-800 leading-relaxed space-y-4 mb-12 min-h-[160px]">
            <p>Dear Sir/Madam,</p>
            <p>
              This is to acknowledge the receipt of your request regarding the above-mentioned subject on <strong>{letter.dateSubmitted}</strong> at <strong>{letter.timeSubmitted}</strong>.
            </p>
            <div className="bg-gray-50/80 p-4 rounded-xl border border-gray-200/80 my-4 space-y-1">
              <p className="font-bold text-gray-900 text-xs uppercase tracking-wider mb-1">Description / Request Details:</p>
              <p className="text-gray-700 whitespace-pre-wrap">{letter.description}</p>
            </div>
            <p>
              <strong>Current Status:</strong> <span className="font-bold text-[#8C1538]">{letter.status}</span><br/>
              {letter.remarks && <span><strong>Additional Notes:</strong> {letter.remarks}</span>}
            </p>
            <p className="text-xs text-gray-500 italic pt-2">
              Please note that this is an electronically generated official correspondence record from the Homagama Pradeshiya Sabha Digital Citizen Portal and may require a physical verification or signature for processing purposes depending on statutory requirements.
            </p>
            <p>Thank you,</p>
          </div>

          {/* Signatures */}
          <div className="flex justify-between mt-16 text-sm text-gray-800 pt-8 border-t border-gray-200/60">
            <div className="text-center">
              <div className="border-t border-gray-400 w-40 pt-2 mx-auto">
                <p className="font-semibold">Prepared By</p>
                <p className="text-xs text-gray-500">Citizen Portal System</p>
              </div>
            </div>
            <div className="text-center">
              <div className="border-t border-gray-400 w-48 pt-2 mx-auto">
                <p className="font-semibold">Authorized Officer</p>
                <p className="text-xs text-gray-500">Homagama Pradeshiya Sabha</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficialLetterModal;
