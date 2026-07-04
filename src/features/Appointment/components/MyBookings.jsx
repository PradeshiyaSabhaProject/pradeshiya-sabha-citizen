import React from 'react';

const MyBookings = ({ bookings, onNewBooking, onCancelBooking, onOpenDetails }) => {
  return (
    <div className="bg-white border border-gray-150 rounded-xl p-6 shadow-xs max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-150">
        <h2 className="text-2xl font-bold text-gray-800">My Bookings</h2>
        <button
          onClick={onNewBooking}
          className="bg-red-800 hover:bg-red-900 text-white px-4 py-2 rounded-md text-xs font-bold transition-colors shadow-sm flex items-center gap-1.5"
        >
          <span>+</span> New Booking
        </button>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-gray-200 rounded-lg text-gray-400 text-sm">
          No bookings found. Click "+ New Booking" to schedule one.
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map(b => {
            const isConfirmed = b.status === 'CONFIRMED';
            const isReserved = b.status === 'RESERVED';
            const isPending = b.status === 'PENDING';
            const isCancelled = b.status === 'CANCELLED';

            return (
              <div 
                key={b.id} 
                className="border border-gray-150 rounded-lg overflow-hidden bg-white hover:border-gray-300 transition-colors flex flex-col relative group"
              >
                {/* Eye Icon for detail popup */}
                <button
                  type="button"
                  onClick={() => onOpenDetails(b)}
                  className="absolute top-4 right-20 text-gray-400 hover:text-red-800 p-1.5 rounded-full hover:bg-gray-50 transition-colors"
                  title="View Details"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>

                {/* Main Card Content */}
                <div className="p-5 flex items-start gap-4">
                  {/* Left Icon */}
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl shrink-0 ${
                    isCancelled ? 'bg-gray-100 text-gray-400' :
                    isPending ? 'bg-amber-50 text-amber-600' :
                    b.type === 'appointment' ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-800'
                  }`}>
                    {b.type === 'appointment' ? '👤' : (b.avatar || '🏢')}
                  </div>

                  {/* Middle Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-base font-bold truncate ${isCancelled ? 'text-gray-400' : 'text-gray-800'}`}>
                      {b.type === 'appointment' ? b.officialName : b.facilityName}
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {b.type === 'appointment' ? b.office : b.location}
                    </p>

                    {/* Date and Time Info */}
                    {b.date && (
                      <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          📅 {b.date}
                        </span>
                        {b.time && (
                          <span className="flex items-center gap-1 border-l border-gray-200 pl-4">
                            ⏰ {b.time}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Right Status Badge */}
                  <div className="shrink-0 pt-1">
                    <span className={`inline-block text-[10px] font-extrabold px-2.5 py-1 rounded-sm uppercase tracking-wider ${
                      isConfirmed ? 'bg-green-100 text-green-700 font-bold' :
                      isReserved ? 'bg-green-100 text-green-700 font-bold' :
                      isPending ? 'bg-amber-500 text-white font-bold' :
                      'bg-gray-200 text-gray-600 font-bold'
                    }`}>
                      {b.status}
                    </span>
                  </div>
                </div>

                {/* Bottom Action / Info Bar */}
                {isConfirmed && (
                  <div className="bg-green-50/50 border-t border-gray-150 px-5 py-3 flex justify-between items-center text-xs">
                    <button className="text-green-700 font-bold hover:underline">
                      Download Slip
                    </button>
                    <button className="text-gray-500 font-medium hover:underline">
                      Reschedule
                    </button>
                  </div>
                )}

                {isReserved && (
                  <div className="bg-gray-50 border-t border-gray-150 px-5 py-3 flex justify-between items-center text-xs">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-gray-500 italic">
                        {b.statusMessage}
                      </span>
                      <button
                        onClick={() => onCancelBooking(b.id)}
                        className="text-red-700 font-bold hover:underline flex items-center gap-1 cursor-pointer text-left w-fit"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Cancel Reservation</span>
                      </button>
                    </div>
                    <span className="text-gray-800 font-extrabold shrink-0 self-end">
                      {b.price}
                    </span>
                  </div>
                )}

                {isPending && (
                  <div className="bg-red-50/30 border-t border-gray-150 px-5 py-3 flex justify-between items-center text-xs">
                    <span className="text-red-700 font-medium italic">
                      Awaiting official approval
                    </span>
                    <button 
                      onClick={() => onCancelBooking(b.id)}
                      className="text-red-700 font-bold hover:underline"
                    >
                      Cancel Request
                    </button>
                  </div>
                )}

                {isCancelled && (
                  <div className="bg-gray-50/50 border-t border-gray-150 px-5 py-3 text-xs text-gray-400 italic">
                    {b.statusMessage}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
