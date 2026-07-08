import React, { useState } from 'react';

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-lg scale-95 overflow-hidden rounded-xl bg-white p-6 shadow-2xl transition-all duration-300 ease-out border border-gray-150">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
          <h3 className="text-lg font-bold text-gray-900">Request New Official Letter</h3>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 text-xl font-bold p-1 cursor-pointer"
            type="button"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="letter-subject" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Subject of the Letter <span className="text-red-500">*</span>
            </label>
            <input
              id="letter-subject"
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Building Permit approval Letter"
              className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-sm text-gray-800 focus:border-[#8C1538] focus:outline-none transition-all"
            />
          </div>

          <div>
            <label htmlFor="letter-category" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="letter-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-sm text-gray-800 focus:border-[#8C1538] focus:outline-none transition-all cursor-pointer"
            >
              <option value="Building and planning">Building and planning</option>
              <option value="Water and utilities">Water and utilities</option>
              <option value="Land and property">Land and property</option>
              <option value="Tax and finance">Tax and finance</option>
            </select>
          </div>

          <div>
            <label htmlFor="letter-desc" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Purpose / Description <span className="text-red-500">*</span>
            </label>
            {/* Gmail-style compose editor */}
            <div className="rounded-lg border border-gray-300 bg-white overflow-hidden focus-within:border-[#8C1538] transition-all">
              {/* To field */}
              <div className="flex items-center border-b border-gray-200 px-4 py-2.5">
                <span className="text-sm text-gray-500 font-medium mr-3 select-none">To</span>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="Chairman / Secretary / Engineering Dept."
                  className="flex-1 text-sm text-gray-800 bg-transparent focus:outline-none placeholder-gray-400"
                />
              </div>
              {/* Writing area */}
              <textarea
                id="letter-desc"
                required
                rows="6"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Compose your letter here..."
                className="w-full px-4 py-3 text-sm text-gray-800 bg-white focus:outline-none resize-none border-none"
              ></textarea>
              {/* Formatting toolbar */}
              <div className="flex items-center gap-1 px-3 py-2 border-t border-gray-200 bg-gray-50/60">
                {/* Text formatting */}
                <button type="button" title="Formatting options" className="p-1.5 rounded hover:bg-gray-200 transition-colors cursor-pointer text-gray-500 hover:text-gray-700">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12h8m-4-8v16M4 4h8m-4 16h4" />
                  </svg>
                </button>
                {/* Attach file */}
                <button type="button" title="Attach files" className="p-1.5 rounded hover:bg-gray-200 transition-colors cursor-pointer text-gray-500 hover:text-gray-700">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                </button>
                {/* Insert link */}
                <button type="button" title="Insert link" className="p-1.5 rounded hover:bg-gray-200 transition-colors cursor-pointer text-gray-500 hover:text-gray-700">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </button>
                {/* Emoji */}
                <button type="button" title="Insert emoji" className="p-1.5 rounded hover:bg-gray-200 transition-colors cursor-pointer text-gray-500 hover:text-gray-700">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
                {/* Insert photo */}
                <button type="button" title="Insert photo" className="p-1.5 rounded hover:bg-gray-200 transition-colors cursor-pointer text-gray-500 hover:text-gray-700">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </button>
                {/* Divider */}
                <div className="h-5 w-px bg-gray-300 mx-1"></div>
                {/* Confidential mode */}
                <button type="button" title="Confidential mode" className="p-1.5 rounded hover:bg-gray-200 transition-colors cursor-pointer text-gray-500 hover:text-gray-700">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </button>
                {/* More options */}
                <button type="button" title="More options" className="p-1.5 rounded hover:bg-gray-200 transition-colors cursor-pointer text-gray-500 hover:text-gray-700">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="5" r="1.5" />
                    <circle cx="12" cy="12" r="1.5" />
                    <circle cx="12" cy="19" r="1.5" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="letter-file" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Support Documents (Optional)
            </label>
            <div className="flex items-center justify-center border border-dashed border-gray-300 rounded-lg p-4 bg-gray-50/50 hover:bg-gray-50 transition-all cursor-pointer">
              <div className="space-y-1 text-center">
                <span className="inline-block text-xl">📤</span>
                <div className="text-xs text-gray-600">
                  <span className="font-semibold text-[#8C1538] hover:underline">Click to upload</span> or drag and drop
                </div>
                <p className="text-[10px] text-gray-400">PDF, PNG, JPG up to 10MB</p>
              </div>
              <input id="letter-file" type="file" className="hidden" />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-6 flex justify-end gap-3 border-t border-gray-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors disabled:opacity-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-[#8C1538] hover:bg-[#73102d] px-5 py-2 text-sm font-medium text-white transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewLetterModal;
