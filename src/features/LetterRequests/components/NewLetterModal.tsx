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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs animate-fade-in p-4 sm:p-0">
      <div className="w-full max-w-lg scale-95 sm:scale-100 overflow-hidden rounded-xl bg-white p-5 sm:p-6 shadow-2xl transition-all duration-300 ease-out border border-gray-150 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-5 shrink-0">
          <div>
            <span className="text-[10px] font-bold text-red-800 uppercase tracking-widest bg-red-50 px-2 py-0.5 rounded">
              {L('නව ලිපිය', 'New Letter', 'புதிய கடிதம்')}
            </span>
            <h3 className="text-lg font-extrabold text-gray-800 mt-1">
              {L('නව නිල ලිපියක් යොමු කිරීම', 'Submit New Letter', 'புதிய அதிகாரபூர்வ கடிதம்')}
            </h3>
            <p className="text-xs text-gray-500 font-medium mt-1">
              {L(
                'අදාළ අංශ වෙත ඔබගේ ලිපිය යොමු කරන්න',
                'Submit formal correspondence to departments',
                'உரிய பிரிவுக்கு உங்கள் கடிதத்தை சமர்ப்பிக்கவும்'
              )}
            </p>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold p-1 leading-none cursor-pointer self-start mt-1"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={onSubmit} className="overflow-y-auto flex-1 space-y-5 pr-1">
          <div className="space-y-4">
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
                placeholder={L('උදා: ගොඩනැගිලි අවසරපත්...', 'e.g. Building Permit...', 'உ-ம்: கட்டட அனுமதி...')}
                className="w-full bg-white border border-gray-200 focus:border-[#8C1538] focus:ring-1 focus:ring-[#8C1538]/20 rounded-lg py-2.5 px-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none transition-all duration-200 shadow-xs"
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
                className="w-full bg-white border border-gray-200 focus:border-[#8C1538] focus:ring-1 focus:ring-[#8C1538]/20 rounded-lg py-2.5 px-3 text-sm font-medium text-gray-800 focus:outline-none transition-all duration-200 shadow-xs cursor-pointer"
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
              <div className="rounded-lg border border-gray-200 bg-white overflow-hidden focus-within:border-[#8C1538] focus-within:ring-1 focus-within:ring-[#8C1538]/20 transition-all shadow-xs">
                {/* To field */}
                <div className="flex items-center border-b border-gray-100 px-3 py-2 bg-gray-50/40">
                  <span className="text-xs font-bold text-gray-500 uppercase mr-2 select-none">To:</span>
                  <input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder={L('සභාපති / ලේකම්...', 'Chairman / Secretary...', 'தலைவர் / செயலாளர்...')}
                    className="flex-1 text-sm text-gray-800 bg-transparent focus:outline-none placeholder-gray-400 font-medium"
                  />
                </div>
                {/* Writing area */}
                <textarea
                  id="letter-desc"
                  required
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={L('ඔබගේ ලිපිය හෝ ඉල්ලීම මෙහි පැහැදිලිව සටහන් කරන්න...', 'Compose your letter here...', 'உங்கள் கடிதத்தை இங்கே எழுதவும்...')}
                  className="w-full px-3 py-3 text-sm text-gray-800 bg-white focus:outline-none resize-none border-none leading-relaxed"
                ></textarea>
                {/* Formatting toolbar */}
                <div className="flex items-center gap-1 px-2 py-1.5 border-t border-gray-100 bg-gray-50/80 overflow-x-auto no-scrollbar">
                  <button type="button" title="Formatting options" className="p-1 rounded hover:bg-gray-200 transition-colors cursor-pointer text-gray-500 hover:text-gray-700">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12h8m-4-8v16M4 4h8m-4 16h4" /></svg>
                  </button>
                  <button type="button" title="Attach files" className="p-1 rounded hover:bg-gray-200 transition-colors cursor-pointer text-gray-500 hover:text-gray-700">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                  </button>
                  <button type="button" title="Insert link" className="p-1 rounded hover:bg-gray-200 transition-colors cursor-pointer text-gray-500 hover:text-gray-700">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                  </button>
                  <button type="button" title="Insert photo" className="p-1 rounded hover:bg-gray-200 transition-colors cursor-pointer text-gray-500 hover:text-gray-700">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="letter-file" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                {L('අමතර සහායක ලිපිලේඛන', 'Support Documents', 'ஆதரவு ஆவணங்கள்')} <span className="text-gray-400 normal-case font-normal">(Optional)</span>
              </label>
              <div className="flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg p-4 bg-gray-50/50 hover:bg-gray-50 hover:border-gray-300 transition-all cursor-pointer">
                <div className="space-y-1 text-center">
                  <span className="inline-block text-xl">📤</span>
                  <div className="text-xs text-gray-600">
                    <span className="font-bold text-[#8C1538] hover:underline">{L('ගොනුව තෝරන්න', 'Click to upload', 'பதிவேற்ற கிளிக் செய்யவும்')}</span>
                  </div>
                  <p className="text-[10px] font-semibold text-gray-400">PDF, PNG, JPG up to 10MB</p>
                </div>
                <input id="letter-file" type="file" className="hidden" />
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-5 flex items-center justify-end gap-3 pt-4 border-t border-gray-100 shrink-0">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-md bg-gray-150 hover:bg-gray-250 px-4 py-2 text-xs font-bold text-gray-700 transition-colors disabled:opacity-50 cursor-pointer"
            >
              {L('අවලංගු කරන්න', 'Cancel', 'ரத்து')}
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-[#8C1538] hover:bg-[#73102d] px-5 py-2 text-xs font-extrabold text-white transition-colors shadow-sm disabled:opacity-50 cursor-pointer flex items-center gap-1.5"
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

