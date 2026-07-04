import React from 'react';

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
            <textarea
              id="letter-desc"
              required
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain the background and what is required in this letter..."
              className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-sm text-gray-800 focus:border-[#8C1538] focus:outline-none transition-all resize-none"
            ></textarea>
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
