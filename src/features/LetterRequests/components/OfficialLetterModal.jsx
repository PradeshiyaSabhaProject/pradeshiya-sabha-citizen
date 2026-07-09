import React from 'react';
import logoImg from '../../../assets/logo.png';

const OfficialLetterModal = ({ isOpen, onClose, letter }) => {
  if (!isOpen || !letter) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs animate-fade-in p-4 sm:p-6">
      <div className="w-full max-w-3xl h-auto max-h-full overflow-y-auto rounded-xl bg-white shadow-2xl transition-all duration-300 ease-out border border-gray-150 flex flex-col">
        {/* Modal Header Actions (Sticky) */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-gray-50/90 px-6 py-3 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Official Letter View</h3>
            <span className="bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded text-xs font-semibold">
              {letter.refNo}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="text-gray-500 hover:text-[#8C1538] p-1.5 rounded-lg hover:bg-red-50/50 transition-colors"
              title="Print Letter"
              type="button"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
            </button>
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold p-1 cursor-pointer leading-none"
              type="button"
              aria-label="Close modal"
            >
              &times;
            </button>
          </div>
        </div>

        {/* Letter Content (Printable Area) */}
        <div className="p-8 sm:p-12 bg-white flex-grow print:p-0 print:shadow-none" id="printable-letter">
          {/* Letterhead */}
          <div className="flex flex-col items-center border-b-2 border-[#8C1538] pb-6 mb-8 text-center">
            <img src={logoImg} alt="Homagama Pradeshiya Sabha Logo" className="h-20 mb-4" />
            <h1 className="text-2xl font-bold text-[#8C1538] tracking-tight">HOMAGAMA PRADESHIYA SABHA</h1>
            <p className="text-sm font-semibold text-gray-700 mt-1">Court Road, Homagama, Sri Lanka.</p>
            <p className="text-xs text-gray-500 mt-1">Tel: +94 11 285 5230 | Email: homagamapradeshiyasabawa@gmail.com</p>
          </div>

          {/* Letter Metadata */}
          <div className="flex justify-between items-start mb-8 text-sm text-gray-800">
            <div>
              <p className="font-semibold mb-1">My No: <span className="font-normal">{letter.refNo}</span></p>
              <p className="font-semibold">Category: <span className="font-normal">{letter.category}</span></p>
            </div>
            <div className="text-right">
              <p className="font-semibold mb-1">Date: <span className="font-normal">{letter.dateSubmitted}</span></p>
            </div>
          </div>

          {/* Addressee */}
          <div className="mb-8 text-sm text-gray-800">
            <p>To,</p>
            <p className="font-semibold mt-1">The Applicant / Relevant Authority,</p>
            <p>Homagama.</p>
          </div>

          {/* Subject */}
          <div className="mb-6">
            <p className="text-sm font-bold text-gray-900 underline underline-offset-4">
              Subject: {letter.subject}
            </p>
          </div>

          {/* Body */}
          <div className="text-sm text-gray-800 leading-relaxed space-y-4 mb-12 min-h-[150px]">
            <p>Dear Sir/Madam,</p>
            <p>
              This is to acknowledge the receipt of your request regarding the above-mentioned subject on {letter.dateSubmitted} at {letter.timeSubmitted}.
            </p>
            <p>
              <strong>Description/Remarks:</strong><br/>
              {letter.description}
            </p>
            <p>
              <strong>Current Status:</strong> {letter.status}<br/>
              {letter.remarks && <span><strong>Additional Notes:</strong> {letter.remarks}</span>}
            </p>
            <p>
              Please note that this is an electronically generated document for your reference and may require a physical signature for official processing purposes depending on the specific application requirements.
            </p>
            <p>Thank you.</p>
          </div>

          {/* Signatures */}
          <div className="flex justify-between mt-16 text-sm text-gray-800 pt-8">
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
