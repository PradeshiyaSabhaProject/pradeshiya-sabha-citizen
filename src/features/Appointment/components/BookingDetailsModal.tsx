import React from 'react';

const BookingDetailsModal = ({ isOpen, onClose, booking }) => {
  if (!isOpen || !booking) return null;

  const isConfirmed = booking.status === 'CONFIRMED' || booking.status === 'RESERVED';
  const isPending = booking.status === 'PENDING';
  const isCancelled = booking.status === 'CANCELLED';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-lg scale-95 overflow-hidden rounded-xl bg-white p-6 shadow-2xl transition-all duration-300 ease-out border border-gray-150">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
          <h3 className="text-lg font-bold text-gray-800">Booking Reference #{booking.id}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl font-bold p-1">
            &times;
          </button>
        </div>

        <div className="space-y-4">
          {/* Status Banner */}
          <div className={`p-3 rounded-lg flex items-center justify-between ${
            isConfirmed ? 'bg-green-50 text-green-800' :
            isPending ? 'bg-amber-50 text-amber-800' :
            'bg-gray-50 text-gray-800'
          }`}>
            <span className="text-sm font-semibold">Status:</span>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
              isConfirmed ? 'bg-green-200' :
              isPending ? 'bg-amber-200' :
              'bg-gray-200'
            }`}>
              {booking.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="block text-xs font-medium text-gray-400 uppercase tracking-wider">Service Type</span>
              <span className="text-sm font-bold text-gray-800 capitalize">{booking.type} Booking</span>
            </div>
            <div>
              <span className="block text-xs font-medium text-gray-400 uppercase tracking-wider">Date & Time</span>
              <span className="text-sm font-bold text-gray-800">
                {booking.date} {booking.time ? `• ${booking.time}` : ''}
              </span>
            </div>
          </div>

          {booking.type === 'appointment' ? (
            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
              {booking.avatar && booking.avatar.startsWith('http') ? (
                <img src={booking.avatar} alt={booking.officialName} className="w-10 h-10 rounded-full object-cover" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-lg">
                  👤
                </div>
              )}
              <div>
                <span className="block text-xs text-gray-500 font-medium">Council Official</span>
                <span className="text-sm font-bold text-gray-800">{booking.officialName}</span>
                <span className="block text-xs text-gray-400">{booking.role}</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-lg">
                {booking.avatar || '🏢'}
              </div>
              <div>
                <span className="block text-xs text-gray-500 font-medium">Facility / Asset Name</span>
                <span className="text-sm font-bold text-gray-800">{booking.facilityName}</span>
                <span className="block text-xs text-gray-400">{booking.location}</span>
              </div>
            </div>
          )}

          {booking.price && (
            <div className="flex justify-between items-center py-2 border-t border-b border-gray-100">
              <span className="text-sm text-gray-500 font-medium">Amount Paid</span>
              <span className="text-sm font-bold text-red-800">{booking.price}</span>
            </div>
          )}

          {booking.statusMessage && (
            <div className="p-3 bg-red-50/50 rounded-lg text-xs text-gray-600 italic border border-red-100">
              {booking.statusMessage}
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-3 pt-3 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md bg-gray-800 hover:bg-gray-900 px-5 py-2 text-sm font-medium text-white transition-colors"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsModal;
