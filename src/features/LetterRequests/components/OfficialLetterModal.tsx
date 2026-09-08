import React from 'react';
import logoImg from '../../../assets/logo.png';
import { useLanguage } from '../../../context/LanguageContext';

const OfficialLetterModal = ({ isOpen, onClose, letter }) => {
  const { language: activeLanguage } = useLanguage();
  const lang = activeLanguage || 'si';
  const L = (siText: string, enText: string, taText?: string) => {
    if (lang === 'si') return siText;
    if (lang === 'ta') return taText || enText;
    return enText;
  };

  if (!isOpen || !letter) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs animate-fade-in p-4 sm:p-0 print:p-0 print:bg-white">
      <div className="w-full max-w-4xl scale-95 sm:scale-100 overflow-hidden rounded-xl bg-white p-5 sm:p-6 shadow-2xl transition-all duration-300 ease-out border border-gray-150 flex flex-col max-h-[90vh] print:max-h-none print:shadow-none print:border-none print:rounded-none print:scale-100">
        {/* Modal Header Banner (Hidden in print) */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-5 shrink-0 print:hidden">
          <div>
            <span className="text-[10px] font-bold text-red-800 uppercase tracking-widest bg-red-50 px-2 py-0.5 rounded">
              {L('නිල ලිපි ආකෘතිය', 'Official Letter Format', 'அதிகாரபூர்வ கடிதம்')}
            </span>
            <div className="flex items-center gap-2 mt-1">
              <h3 className="text-lg font-extrabold text-gray-800">
                Letter #{letter.refNo}
              </h3>
            </div>
            <p className="text-xs text-gray-500 font-medium mt-1">
              {L('හෝමාගම ප්‍රාදේශීය සභාවේ නිල ලේඛන පිටපත', 'Homagama Pradeshiya Sabha Official Record', 'ஹோமகம பிரதேச சபை உத்தியோகபூர்வ ஆவணம்')}
            </p>
          </div>

          <div className="flex items-center gap-3 self-start mt-1">
            <button
              onClick={() => window.print()}
              className="bg-gray-150 hover:bg-gray-200 text-gray-800 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-xs border border-gray-200"
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
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold p-1 leading-none cursor-pointer"
              aria-label="Close modal"
            >
              &times;
            </button>
          </div>
        </div>

        {/* Letter Content (Printable Area) */}
        <div className="p-2 sm:p-6 bg-white flex-grow overflow-y-auto print:p-0 print:overflow-visible select-text border border-gray-100 rounded-lg shadow-sm" id="printable-letter">
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
