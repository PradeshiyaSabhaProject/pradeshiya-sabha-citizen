import React from 'react';

const ConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-md scale-95 overflow-hidden rounded-lg bg-white p-6 shadow-2xl transition-all duration-300 ease-out border border-gray-150">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-800">Confirm New Booking</h3>
          <p className="mt-3 text-sm text-gray-600">
            Are you want to build a new booking?
          </p>
        </div>
        <div className="mt-6 flex justify-end gap-3 border-t border-gray-100 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-md px-5 py-2 text-sm font-medium text-white bg-red-800 hover:bg-red-900 transition-colors shadow-sm"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
