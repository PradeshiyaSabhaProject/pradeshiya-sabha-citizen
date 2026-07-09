import React from 'react';

const LetterDetailsModal = ({ isOpen, onClose, letter }) => {
  if (!isOpen || !letter) return null;

  const isResolved = letter.status === 'Resolved';
  const isInTransit = letter.status === 'In transit';
  const isInReview = letter.status === 'In review';
  const isReturned = letter.status === 'Returned';

  // Badge colors
  const statusColors = {
    'In review': 'border-amber-200 bg-amber-50 text-amber-700',
    'Resolved': 'border-green-200 bg-green-50 text-green-700',
    'In transit': 'border-blue-200 bg-blue-50 text-blue-700',
    'Returned': 'border-red-200 bg-red-50 text-red-700'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-xl scale-95 overflow-hidden rounded-xl bg-white p-6 shadow-2xl transition-all duration-300 ease-out border border-gray-150">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
          <h3 className="text-lg font-bold text-gray-900">Request Details - #{letter.refNo}</h3>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 text-xl font-bold p-1 cursor-pointer"
            type="button"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="space-y-5 max-h-[70vh] overflow-y-auto pr-1">
          {/* Main Info */}
          <div>
            <span className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">Subject</span>
            <h4 className="text-base font-bold text-gray-800">{letter.subject}</h4>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">Category</span>
              <span className="text-sm font-semibold text-gray-700">{letter.category}</span>
            </div>
            <div>
              <span className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">Date Submitted</span>
              <span className="text-sm font-semibold text-gray-700">{letter.dateSubmitted} at {letter.timeSubmitted}</span>
            </div>
          </div>

          {/* Status and Action */}
          <div className={`p-4 rounded-lg border ${statusColors[letter.status] || 'border-gray-200 bg-gray-50 text-gray-700'}`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider">Current Status:</span>
              <span className="text-xs font-bold uppercase px-2.5 py-0.5 rounded-full border bg-white shadow-3xs">
                {letter.status}
              </span>
            </div>
            {letter.remarks && (
              <p className="mt-2 text-xs leading-relaxed italic opacity-90">
                {letter.remarks}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <span className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mb-1">Description</span>
            <p className="text-xs text-gray-600 bg-gray-50/50 p-3 rounded-lg border border-gray-100 leading-relaxed">
              {letter.description}
            </p>
          </div>

          {/* Timeline */}
          {letter.timeline && letter.timeline.length > 0 && (
            <div>
              <span className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mb-3">Timeline</span>
              <div className="space-y-4 relative pl-4 border-l-2 border-gray-200 ml-2">
                {letter.timeline.map((step, idx) => (
                  <div key={idx} className="relative">
                    {/* Circle Dot */}
                    <div className="absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full bg-white border-2 border-[#8C1538] flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#8C1538]"></div>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase">{step.date}</span>
                      <div className="text-xs font-bold text-gray-800">{step.status}</div>
                      <p className="text-xs text-gray-500 mt-0.5">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="mt-6 flex justify-between gap-3 border-t border-gray-100 pt-4">
          <div>
            {isResolved && (
              <button
                type="button"
                onClick={() => alert(`Downloading Letter Response for ${letter.refNo}...`)}
                className="rounded-md border border-[#8C1538] text-[#8C1538] hover:bg-red-50/50 px-4 py-2 text-sm font-semibold transition-colors cursor-pointer inline-flex items-center gap-1.5"
              >
                <span>📥</span>
                <span>Download Letter</span>
              </button>
            )}
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md bg-gray-800 hover:bg-gray-900 px-5 py-2 text-sm font-medium text-white transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LetterDetailsModal;
