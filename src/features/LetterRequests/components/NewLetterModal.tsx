import React, { useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const NewLetterModal = ({
  isOpen,
  onClose,
  onSubmit,
  subject,
  setSubject,
  category,
  setCategory,
  description,
  setDescription,
  loading
}) => {
  const [recipient, setRecipient] = useState('');
  const { language: activeLanguage } = useLanguage();
  const lang = activeLanguage || 'si';
  const L = (siText: string, enText: string, taText?: string) => {
    if (lang === 'si') return siText;
    if (lang === 'ta') return taText || enText;
    return enText;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-1.5 sm:p-6 bg-black/65 backdrop-blur-sm overflow-hidden animate-fadeIn select-none font-sans">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#F8FAFC] rounded-2xl sm:rounded-3xl max-w-3xl w-full max-h-[96vh] sm:max-h-[88vh] overflow-hidden shadow-2xl border border-gray-200 flex flex-col my-auto text-left"
      >
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-[#8C1538] to-[#5e0d23] text-white px-3 sm:px-8 py-2.5 sm:py-6 flex items-center justify-between gap-4 relative shadow-md shrink-0">
          <div className="space-y-0.5 sm:space-y-1 min-w-0">
            <h2 className="text-base sm:text-2xl font-extrabold tracking-tight leading-tight">
              {L('නව නිල ලිපියක් යොමු කිරීම', 'Submit New Municipal Letter', 'புதிய அதிகாரபூர்வ கடிதம்')}
            </h2>
            <p className="text-[11px] sm:text-sm text-white/90 font-medium truncate sm:whitespace-normal">
              {L(
                'හෝමාගම ප්‍රාදේශීය සභාවේ අදාළ අංශ වෙත ඔබගේ ලිපිය හෝ ඉල්ලීම යොමු කරන්න',
                'Submit formal correspondence directly to municipal departments',
                'ஹோமகம பிரதேச சபையின் உரிய பிரிவுக்கு உங்கள் கடிதத்தை சமர்ப்பிக்கவும்'
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

        {/* Form Content */}
        <form onSubmit={onSubmit} className="p-4 sm:p-8 overflow-y-auto flex-1 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200/90 p-4 sm:p-6 shadow-xs space-y-5">
            <div>
              <label htmlFor="letter-subject" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                {L('ලිපියේ මාතෘකාව / විෂය', 'Subject of the Letter', 'கடிதத்தின் பொருள்')} <span className="text-red-500">*</span>
              </label>
              <input
                id="letter-subject"
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder={L('උදා: ගොඩනැගිලි අවසරපත් සම්බන්ධ ලිපිය', 'e.g. Building Permit Approval Letter', 'உ-ம்: கட்டட அனுமதி கடிதம்')}
                className="w-full bg-[#f3f4f6] border border-transparent focus:border-gray-300 focus:bg-white rounded-xl py-3 px-4 text-sm text-gray-800 placeholder-gray-400 focus:outline-none transition-all duration-200 shadow-2xs"
              />
            </div>

            <div>
              <label htmlFor="letter-category" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                {L('අදාළ අංශය / කාණ්ඩය', 'Category / Department', 'பிரிவு / வகை')} <span className="text-red-500">*</span>
              </label>
              <select
                id="letter-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#f3f4f6] border border-transparent focus:border-gray-300 focus:bg-white rounded-xl py-3 px-4 text-sm font-medium text-gray-800 focus:outline-none transition-all duration-200 shadow-2xs cursor-pointer"
              >
                <option value="Building and planning">{L('ගොඩනැගිලි හා සැලසුම් අංශය', 'Building and planning', 'கட்டடம் மற்றும் திட்டமிடல்')}</option>
                <option value="Water and utilities">{L('ජලය හා උපයෝගීතා අංශය', 'Water and utilities', 'நீர் மற்றும் பயன்பாடுகள்')}</option>
                <option value="Land and property">{L('ඉඩම් හා දේපළ අංශය', 'Land and property', 'நிலம் மற்றும் சொத்து')}</option>
                <option value="Tax and finance">{L('බදු හා මූල්‍ය අංශය', 'Tax and finance', 'வரி மற்றும் நிதி')}</option>
              </select>
            </div>

            <div>
              <label htmlFor="letter-desc" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                {L('ලිපියේ අන්තර්ගතය / විස්තරය', 'Letter Content / Description', 'கடிதத்தின் உள்ளடக்கம்')} <span className="text-red-500">*</span>
              </label>
              <div className="rounded-xl border border-gray-200/90 bg-white overflow-hidden focus-within:border-[#8C1538] transition-all shadow-2xs">
                {/* To field */}
                <div className="flex items-center border-b border-gray-100 px-4 py-2.5 bg-gray-50/40">
                  <span className="text-xs font-bold text-gray-500 uppercase mr-3 select-none">To:</span>
                  <input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder={L('සභාපති / ලේකම් / ඉංජිනේරු අංශය...', 'Chairman / Secretary / Engineering Dept...', 'தலைவர் / செயலாளர்...')}
                    className="flex-1 text-sm text-gray-800 bg-transparent focus:outline-none placeholder-gray-400 font-medium"
                  />
                </div>
                {/* Writing area */}
                <textarea
                  id="letter-desc"
                  required
                  rows={6}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={L('ඔබගේ ලිපිය හෝ ඉල්ලීම මෙහි පැහැදිලිව සටහන් කරන්න...', 'Compose your letter here...', 'உங்கள் கடிதத்தை இங்கே எழுதவும்...')}
                  className="w-full px-4 py-3.5 text-sm text-gray-800 bg-white focus:outline-none resize-none border-none leading-relaxed"
                ></textarea>
                {/* Formatting toolbar */}
                <div className="flex items-center gap-1 px-3 py-2 border-t border-gray-150 bg-gray-50/80">
                  <button type="button" title="Formatting options" className="p-1.5 rounded hover:bg-gray-200 transition-colors cursor-pointer text-gray-500 hover:text-gray-700">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12h8m-4-8v16M4 4h8m-4 16h4" />
                    </svg>
                  </button>
                  <button type="button" title="Attach files" className="p-1.5 rounded hover:bg-gray-200 transition-colors cursor-pointer text-gray-500 hover:text-gray-700">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                  </button>
                  <button type="button" title="Insert link" className="p-1.5 rounded hover:bg-gray-200 transition-colors cursor-pointer text-gray-500 hover:text-gray-700">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </button>
                  <button type="button" title="Insert emoji" className="p-1.5 rounded hover:bg-gray-200 transition-colors cursor-pointer text-gray-500 hover:text-gray-700">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                  <button type="button" title="Insert photo" className="p-1.5 rounded hover:bg-gray-200 transition-colors cursor-pointer text-gray-500 hover:text-gray-700">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </button>
                  <div className="h-5 w-px bg-gray-300 mx-1"></div>
                  <button type="button" title="Confidential mode" className="p-1.5 rounded hover:bg-gray-200 transition-colors cursor-pointer text-gray-500 hover:text-gray-700">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="letter-file" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                {L('අමතර සහායක ලිපිලේඛන (විකල්ප)', 'Support Documents (Optional)', 'ஆதரவு ஆவணங்கள் (விரும்பினால்)')}
              </label>
              <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-5 bg-gray-50/50 hover:bg-gray-50 transition-all cursor-pointer">
                <div className="space-y-1 text-center">
                  <span className="inline-block text-2xl">📤</span>
                  <div className="text-xs text-gray-600">
                    <span className="font-bold text-[#8C1538] hover:underline">{L('ගොනුව තෝරන්න', 'Click to upload', 'பதிவேற்ற கிளிக் செய்யவும்')}</span> {L('හෝ මෙතැනට ඇද දමන්න', 'or drag and drop', 'அல்லது இழுத்து விடவும்')}
                  </div>
                  <p className="text-[10px] font-semibold text-gray-400">PDF, PNG, JPG up to 10MB</p>
                </div>
                <input id="letter-file" type="file" className="hidden" />
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-md border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-colors disabled:opacity-50 cursor-pointer shadow-xs"
            >
              {L('අවලංගු කරන්න', 'Cancel', 'ரத்து')}
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-[#8C1538] hover:bg-[#73102d] px-6 py-2.5 text-sm font-semibold text-white transition-colors shadow-xs disabled:opacity-50 cursor-pointer flex items-center gap-2"
            >
              <span>{loading ? L('යොමු කරමින්...', 'Submitting...', 'சமர்ப்பிக்கிறது...') : L('ලිපිය යොමු කරන්න', 'Submit Request', 'சமர்ப்பிக்கவும்')}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewLetterModal;
