import React, { useState } from 'react';
import { downloadSlip } from '../../../utils/pdfGenerator';
import { type BookingItem, type AppointmentStatus } from '../services/appointmentService';

interface BookingCardProps {
  b: BookingItem;
  onOpenDetails: (booking: BookingItem) => void;
  onCancelBooking: (id: string | number) => void;
}

const getStatusBadgeStyle = (status: AppointmentStatus | string) => {
  switch (status) {
    case 'APPROVED':
    case 'CONFIRMED':
    case 'RESERVED':
      return 'bg-emerald-50 text-emerald-800 border-emerald-200';
    case 'RESCHEDULED':
      return 'bg-blue-50 text-blue-800 border-blue-200';
    case 'REJECTED':
      return 'bg-red-50 text-red-800 border-red-200';
    case 'COMPLETED':
      return 'bg-purple-50 text-purple-800 border-purple-200';
    case 'PENDING':
      return 'bg-amber-50 text-amber-800 border-amber-200';
    case 'NO-SHOW':
      return 'bg-gray-100 text-gray-700 border-gray-300';
    case 'CANCELLED':
    default:
      return 'bg-gray-100 text-gray-500 border-gray-200';
  }
};

const BookingCard: React.FC<BookingCardProps> = ({ b, onOpenDetails, onCancelBooking }) => {
  const isApproved = b.status === 'APPROVED' || b.status === 'CONFIRMED' || b.status === 'RESERVED';
  const isConfirmed = b.status === 'CONFIRMED' || b.status === 'APPROVED';
  const isReserved = b.status === 'RESERVED';
  const isRescheduled = b.status === 'RESCHEDULED';
  const isPending = b.status === 'PENDING';
  const isRejected = b.status === 'REJECTED';
  const isCompleted = b.status === 'COMPLETED';
  const isCancelled = b.status === 'CANCELLED';
  const isNoShow = b.status === 'NO-SHOW';

  const isAppointment = b.type === 'appointment';
  const isFacility = b.type === 'facility';
  const documentsCount = (b.documents?.length || 0) + (b.attachment ? 1 : 0);

  let iconClass = 'bg-red-50 text-red-800';
  // Terminal and pending states override the default type-based icon color.
  if (isCancelled) {
    iconClass = 'bg-gray-100 text-gray-400';
  } else if (isPending) {
    iconClass = 'bg-amber-50 text-amber-600';
  } else if (isAppointment) {
    iconClass = 'bg-blue-50 text-blue-600';
  }

  let badgeClass = 'bg-gray-200 text-gray-600 font-bold';
  // Confirmed and reserved records share the successful status treatment.
  if (isConfirmed || isReserved) {
    badgeClass = 'bg-green-100 text-green-700 font-bold';
  } else if (isPending) {
    badgeClass = 'bg-amber-500 text-white font-bold';
  }

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white hover:border-gray-300 transition-all flex flex-col shadow-xs">
      {/* Top Header Strip */}
      <div className="bg-gray-50/75 px-5 py-2.5 border-b border-gray-150 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-[#8C1538] bg-red-50 px-2 py-0.5 rounded border border-red-100">
            {b.refId || `#${b.id}`}
          </span>
          {b.service ? (
            <span className="font-semibold text-gray-700">
              • {b.service}
            </span>
          ) : b.eventType ? (
            <span className="font-semibold text-gray-700">
              • {b.eventType}
            </span>
          ) : null}
        </div>
        <div className="flex items-center gap-2">
          {isFacility && b.paymentStatus && (
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
              b.paymentStatus === 'PAID'
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-amber-100 text-amber-800'
            }`}>
              ✓ {b.paymentStatus}
            </span>
          )}
          <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded uppercase tracking-wider border ${getStatusBadgeStyle(b.status)}`}>
            {b.status}
          </span>
        </div>
      </div>

      {/* Main Card Content */}
      <div className="p-5 flex items-start gap-4">
        {/* Left Icon */}
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 border ${
          isCancelled || isNoShow
            ? 'bg-gray-100 border-gray-200 text-gray-400'
            : isRescheduled
            ? 'bg-blue-50 border-blue-200 text-blue-700'
            : isRejected
            ? 'bg-red-50 border-red-200 text-red-700'
            : isCompleted
            ? 'bg-purple-50 border-purple-200 text-purple-700'
            : isApproved
            ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
            : isAppointment
            ? 'bg-red-50 border-red-200 text-[#8C1538]'
            : 'bg-amber-50 border-amber-200 text-amber-800'
        }`}>
          {isAppointment ? '👤' : (b.avatar || '🏢')}
        </div>

        {/* Middle Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className={`text-base font-bold truncate ${isCancelled ? 'text-gray-400' : 'text-gray-900'}`}>
              {isAppointment ? b.officialName : b.facilityName}
            </h3>
            {b.counter ? (
              <span className="text-[11px] font-semibold text-[#1e3a8a] bg-blue-50/60 px-2 py-0.5 rounded border border-blue-100 shrink-0">
                {b.counter.split(' - ')[0] || b.counter}
              </span>
            ) : b.rentalFee ? (
              <span className="text-[11px] font-bold text-[#8C1538] bg-red-50 px-2 py-0.5 rounded border border-red-100 shrink-0">
                Rs. {(b.rentalFee + (b.securityDeposit || 0)).toLocaleString()} Total
              </span>
            ) : null}
          </div>

          <p className="text-xs text-gray-500 mt-0.5">
            {isAppointment
              ? `${b.role || 'Council Official'} • ${b.office || 'Main Council Office'}`
              : (b.location || 'Municipal Complex')}
          </p>

          {/* Event Title if Facility */}
          {isFacility && b.eventTitle && (
            <p className="text-xs font-semibold text-gray-800 mt-1">
              🎉 {b.eventTitle}
            </p>
          )}

          {/* Date and Time Info */}
          {b.date && (
            <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-gray-600 font-medium">
              <span className="flex items-center gap-1.5">
                📅 {b.date}
              </span>
              {b.time && (
                <span className="flex items-center gap-1.5 border-l border-gray-200 pl-3">
                  ⏰ {b.time}
                </span>
              )}
              {b.expectedAttendees && (
                <span className="border-l border-gray-200 pl-3 text-gray-500 text-[11px]">
                  👥 ~{b.expectedAttendees} Attendees
                </span>
              )}
              {b.division && (
                <span className="hidden sm:inline-block border-l border-gray-200 pl-3 text-gray-500 text-[11px]">
                  📍 {b.division}
                </span>
              )}
            </div>
          )}

          {/* Verification documents indicator */}
          {documentsCount > 0 && (
            <div className="mt-2.5 flex items-center gap-1.5 text-xs text-gray-500">
              <span>📎</span>
              <span className="font-medium text-gray-600">
                {documentsCount} Verification Document{documentsCount > 1 ? 's' : ''} Attached
              </span>
            </div>
          )}
        </div>

        {/* Right Details Button */}
        <div className="shrink-0 flex items-center">
          <button
            type="button"
            onClick={() => onOpenDetails(b)}
            className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 p-2 rounded-lg transition-colors cursor-pointer shadow-3xs flex items-center gap-1 text-xs font-semibold"
            title="View Full Booking Dossier & Tracking"
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span className="hidden sm:inline">Details</span>
          </button>
        </div>
      </div>

      {/* Dynamic Status Notification Banners */}
      {isRescheduled && (
        <div className="bg-blue-50/70 border-t border-blue-200 px-5 py-2.5 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="text-blue-900">
            <span className="font-bold">⏰ Rescheduled by Officer:</span>{' '}
            <span>{b.rescheduledReason || 'Revised slot assigned by administrative reviewer.'}</span>
            {b.counter && <span className="font-semibold ml-1">Report to: {b.counter}</span>}
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => downloadSlip(b)}
              className="text-blue-800 font-bold hover:underline cursor-pointer"
            >
              Download Updated Slip
            </button>
          </div>
        </div>
      )}

      {isRejected && (
        <div className="bg-red-50/80 border-t border-red-200 px-5 py-2.5 text-xs text-red-900">
          <span className="font-bold text-red-800">⚠️ Rejection Reason:</span>{' '}
          <span className="text-red-700 font-medium">
            {b.rejectionReason || b.statusMessage || 'Application requirements or venue availability not satisfied.'}
          </span>
        </div>
      )}

      {isCompleted && (
        <div className="bg-purple-50/70 border-t border-purple-200 px-5 py-2.5 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="text-purple-900">
            <span className="font-bold">✓ Concluded:</span>{' '}
            <span className="text-purple-800 font-medium">
              {b.resolutionNotes || b.statusMessage || 'Service fulfilled and registered in council ledger.'}
            </span>
          </div>
          <button
            type="button"
            onClick={() => downloadSlip(b)}
            className="text-purple-800 font-bold hover:underline cursor-pointer shrink-0"
          >
            Download Slip
          </button>
        </div>
      )}

      {/* Reserved bookings expose price and allow the citizen to cancel the reservation. */}
      {isReserved && (
        <div className="bg-gray-50 border-t border-gray-150 px-5 py-3 flex justify-between items-center text-xs">
          <span className="text-gray-500 italic">
            {b.statusMessage}
          </span>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => downloadSlip(b)}
              className="text-emerald-800 font-bold hover:underline cursor-pointer flex items-center gap-1"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download Official Pass</span>
            </button>
            <span className="text-gray-300">|</span>
            <button
              type="button"
              onClick={() => onOpenDetails(b)}
              className="text-gray-600 font-medium hover:text-[#8C1538] hover:underline"
            >
              Tracking Details
            </button>
          </div>
        </div>
      )}

      {/* Pending bookings can still be cancelled while awaiting official approval. */}
      {isPending && (
        <div className="bg-red-50/30 border-t border-gray-150 px-5 py-3 flex justify-between items-center text-xs">
          <span className="text-red-700 font-medium italic">
            Awaiting official approval
          </span>
          <div className="flex items-center gap-4 shrink-0">
            <button
              type="button"
              onClick={() => downloadSlip(b)}
              className="text-amber-800 font-bold hover:underline cursor-pointer flex items-center gap-1"
            >
              <span>Draft Slip</span>
            </button>
            <span className="text-amber-200">|</span>
            <button
              type="button"
              onClick={() => onCancelBooking(b.id)}
              className="text-red-600 font-medium hover:underline flex items-center gap-1 cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Cancel</span>
            </button>
          </div>
        </div>
      )}

      {/* Cancelled records remain visible for history but have no active actions. */}
      {isCancelled && (
        <div className="bg-gray-50/50 border-t border-gray-150 px-5 py-3 text-xs text-gray-400 italic">
          {b.statusMessage}
        </div>
      )}
    </div>
  );
};

interface MyBookingsProps {
  bookings: BookingItem[];
  onNewBooking: () => void;
  onCancelBooking: (id: string | number) => void;
  onOpenDetails: (booking: BookingItem) => void;
}

const MyBookings: React.FC<MyBookingsProps> = ({ bookings, onNewBooking, onCancelBooking, onOpenDetails }) => {
  const [activeSubTab, setActiveSubTab] = useState<'appointments' | 'reservations'>('appointments');

  const filteredBookings = bookings.filter(b => {
    // The active tab is the single source of truth for which booking type is shown.
    if (activeSubTab === 'appointments') {
      return b.type === 'appointment';
    } else {
      return b.type === 'facility';
    }
  });

  const appointmentsCount = bookings.filter((b) => b.type === 'appointment').length;
  const facilitiesCount = bookings.filter((b) => b.type === 'facility').length;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-gray-150">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">My Bookings &amp; Tracking Passes</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Monitor real-time approval status, officer review notes, counter assignments, and download official token slips.
          </p>
        </div>
        <button
          type="button"
          onClick={onNewBooking}
          className="bg-[#8C1538] hover:bg-[#73102d] text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer shrink-0 self-start sm:self-auto"
        >
          <span>+</span>
          <span>New Booking</span>
        </button>
      </div>

      {/* Sub-tabs / Segmented control */}
      <div className="flex gap-6 mb-6 border-b border-gray-100 text-xs sm:text-sm">
        <button
          type="button"
          onClick={() => setActiveSubTab('appointments')}
          className={`pb-3 font-bold transition-all relative flex items-center gap-1.5 cursor-pointer ${
            activeSubTab === 'appointments'
              ? 'text-[#8C1538] border-b-2 border-[#8C1538]'
              : 'text-gray-500 hover:text-gray-800 font-medium'
          }`}
        >
          <span>Officer Consultations</span>
          {appointmentsCount > 0 && (
            <span className="px-2 py-0.5 text-[10px] bg-red-50 text-[#8C1538] border border-red-100 rounded-full font-bold">
              {appointmentsCount}
            </span>
          )}
        </button>
        <button
          type="button"
          onClick={() => setActiveSubTab('reservations')}
          className={`pb-3 font-bold transition-all relative flex items-center gap-1.5 cursor-pointer ${
            activeSubTab === 'reservations'
              ? 'text-[#8C1538] border-b-2 border-[#8C1538]'
              : 'text-gray-500 hover:text-gray-800 font-medium'
          }`}
        >
          <span>Facility Reservations</span>
          {facilitiesCount > 0 && (
            <span className="px-2 py-0.5 text-[10px] bg-red-50 text-[#8C1538] border border-red-100 rounded-full font-bold">
              {facilitiesCount}
            </span>
          )}
        </button>
      </div>

      {/* Keep the empty-state guidance specific to appointments or facility reservations. */}
      {filteredBookings.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-gray-200 rounded-xl text-gray-400 text-xs space-y-2">
          <p>
            {activeSubTab === 'appointments'
              ? 'No officer consultations scheduled yet. Click "+ New Booking" to request one.'
              : 'No facility reservations found. Click "+ New Booking" to reserve a hall or ground.'}
          </p>
          <button
            type="button"
            onClick={onNewBooking}
            className="text-xs font-bold text-[#8C1538] underline"
          >
            Start Booking Now
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((b) => (
            <BookingCard
              key={b.id}
              b={b}
              onOpenDetails={onOpenDetails}
              onCancelBooking={onCancelBooking}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
