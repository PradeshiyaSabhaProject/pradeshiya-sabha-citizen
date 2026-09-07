import React from 'react';
import { downloadSlip } from '../../../utils/pdfGenerator';
import { type BookingItem } from '../services/appointmentService';

interface Step {
  title: string;
  description: string;
  status: 'completed' | 'active' | 'cancelled' | 'upcoming';
}

const getTimelineSteps = (booking: BookingItem): Step[] => {
  const isApproved = booking.status === 'APPROVED' || booking.status === 'CONFIRMED' || booking.status === 'RESERVED';
  const isRescheduled = booking.status === 'RESCHEDULED';
  const isRejected = booking.status === 'REJECTED';
  const isCompleted = booking.status === 'COMPLETED';
  const isCancelled = booking.status === 'CANCELLED';

  return [
    {
      title: '1. Request Intake & Submission',
      description: `Application logged into municipal portal on ${booking.date}.`,
      status: 'completed',
    },
    {
      title: '2. Administrative Review & Desk Routing',
      description: booking.type === 'appointment'
        ? `Routed to ${booking.officialName || 'Assigned Officer'} at ${booking.counter || 'Council Desk'}.`
        : `Facility availability verified at ${booking.location || 'Municipal Venue'}.`,
      status: isCancelled ? 'cancelled' : 'completed',
    },
    {
      title: isRescheduled
        ? '3. Rescheduled by Reviewing Officer'
        : isRejected
        ? '3. Application Rejected'
        : isApproved || isCompleted
        ? '3. Verification & Approval Confirmed'
        : '3. Awaiting Review Decision',
      description: isRescheduled
        ? (booking.rescheduledReason || 'Officer revised the time slot.')
        : isRejected
        ? (booking.rejectionReason || 'Application rejected by reviewing officer.')
        : isApproved || isCompleted
        ? 'All credentials verified and official token confirmed.'
        : 'Officer is currently reviewing agenda and schedule.',
      status: isRejected || isCancelled ? 'cancelled' : isRescheduled ? 'active' : isApproved || isCompleted ? 'completed' : 'active',
    },
    {
      title: isCompleted ? '4. Consultation / Event Concluded' : '4. Final Session Fulfilment',
      description: isCompleted
        ? (booking.resolutionNotes || 'Consultation completed and recorded in council ledger.')
        : isApproved
        ? `Pass active. Please visit ${booking.counter || 'assigned counter'} at scheduled time.`
        : 'Pending session fulfillment.',
      status: isCompleted ? 'completed' : isApproved ? 'active' : 'upcoming',
    },
  ];
};

const TimelineStep = ({ step, isLast }: { step: Step; isLast: boolean }) => {
  let iconBg = 'bg-gray-50 border-gray-200 text-gray-400';
  let icon = <span className="w-2 h-2 bg-gray-300 rounded-full" />;
  let titleColor = 'text-gray-400 font-medium';

  if (step.status === 'completed') {
    iconBg = 'bg-emerald-50 border-emerald-600 text-emerald-600';
    icon = (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
      </svg>
    );
    titleColor = 'text-gray-900 font-bold';
  } else if (step.status === 'active') {
    iconBg = 'bg-amber-50 border-amber-600 text-amber-700 animate-pulse';
    icon = (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
    titleColor = 'text-amber-900 font-extrabold';
  } else if (step.status === 'cancelled') {
    iconBg = 'bg-red-50 border-red-600 text-red-600';
    icon = (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
      </svg>
    );
    titleColor = 'text-red-700 font-bold';
  }

  return (
    <div className="flex gap-4 items-start relative">
      <div className="flex flex-col items-center shrink-0">
        <div className={`w-7 h-7 rounded-full flex items-center justify-center border-2 ${iconBg} z-10 bg-white shadow-2xs`}>
          {icon}
        </div>
        {!isLast && <div className="w-0.5 h-10 my-0.5 bg-gray-200" />}
      </div>

      <div className="pt-0.5 pb-2">
        <h4 className={`text-xs ${titleColor}`}>{step.title}</h4>
        <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">{step.description}</p>
      </div>
    </div>
  );
};

interface BookingDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: BookingItem | null;
}

const BookingDetailsModal: React.FC<BookingDetailsModalProps> = ({ isOpen, onClose, booking }) => {
  if (!isOpen || !booking) return null;

  const isFacility = booking.type === 'facility';
  const steps = getTimelineSteps(booking);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto animate-fadeIn">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-300 border border-gray-200 my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#8C1538] to-[#5c0d24] p-5 sm:p-6 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold bg-white/20 px-2.5 py-0.5 rounded-md">
                {booking.refId || `#PS-BK-${booking.id}`}
              </span>
              <span className="text-xs uppercase tracking-wider font-semibold text-rose-100">
                • {booking.type === 'appointment' ? 'Officer Consultation' : 'Facility Reservation'}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-white mt-1.5">
              {isFacility ? booking.facilityName : booking.officialName}
            </h3>
            {booking.counter && (
              <p className="text-xs text-rose-200 mt-0.5 font-medium">
                📍 {booking.counter}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-white hover:text-gray-200 text-2xl font-bold p-2 leading-none cursor-pointer"
            title="Close"
          >
            &times;
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Status Alert Banners */}
          {booking.status === 'RESCHEDULED' && (
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 text-xs text-blue-950 space-y-1">
              <div className="font-extrabold flex items-center gap-1.5 text-blue-900">
                <span>⏰</span> Rescheduled by Reviewing Officer
              </div>
              <p className="font-medium text-blue-800">
                {booking.rescheduledReason || 'Officer modified the appointment slot. Please review the updated date and time.'}
              </p>
            </div>
          )}

          {booking.status === 'REJECTED' && (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 text-xs text-red-950 space-y-1">
              <div className="font-extrabold flex items-center gap-1.5 text-red-900">
                <span>⚠️</span> Rejection Notice
              </div>
              <p className="font-medium text-red-800">
                {booking.rejectionReason || 'Application criteria or required documentation not satisfied.'}
              </p>
            </div>
          )}

          {booking.status === 'COMPLETED' && (
            <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4 text-xs text-purple-950 space-y-1">
              <div className="font-extrabold flex items-center gap-1.5 text-purple-900">
                <span>✓</span> Consultation / Reservation Concluded
              </div>
              <p className="font-medium text-purple-800">
                {booking.resolutionNotes || 'Session completed and archived in municipal council ledger.'}
              </p>
            </div>
          )}

          {/* Citizen & Booking Metadata Grid */}
          <div className="bg-stone-50 border border-gray-200 rounded-xl p-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <span className="text-gray-500 font-medium block">Citizen Name:</span>
              <span className="font-bold text-gray-900">{booking.citizenName || 'Sunil Jayaratne'}</span>
            </div>
            <div>
              <span className="text-gray-500 font-medium block">National ID (NIC):</span>
              <span className="font-mono font-bold text-gray-900">{booking.nicNumber || booking.citizenNic || '198421456789'}</span>
            </div>
            <div>
              <span className="text-gray-500 font-medium block">Contact Mobile:</span>
              <span className="font-bold text-gray-900">{booking.phone || booking.citizenPhone || '077 123 4567'}</span>
            </div>
            <div>
              <span className="text-gray-500 font-medium block">Allocated Date:</span>
              <span className="font-bold text-gray-900">{booking.date}</span>
            </div>
            <div>
              <span className="text-gray-500 font-medium block">Allocated Time:</span>
              <span className="font-bold text-[#8C1538]">{booking.time}</span>
            </div>
            <div>
              <span className="text-gray-500 font-medium block">Division:</span>
              <span className="font-bold text-gray-900">{booking.division || 'Homagama Jurisdiction'}</span>
            </div>
          </div>

          {/* Financial Breakdown (For Facility Bookings) */}
          {isFacility && (booking.rentalFee !== undefined || booking.totalTariff !== undefined) && (
            <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-2.5">
              <h4 className="text-xs font-extrabold text-gray-700 uppercase tracking-wide">
                Financial Tariff &amp; Payment Breakdown
              </h4>
              <div className="grid grid-cols-3 gap-3 text-xs bg-stone-50 p-3 rounded-lg">
                <div>
                  <div className="text-gray-500 font-medium">Rental Tariff</div>
                  <div className="font-extrabold text-gray-900">Rs. {(booking.rentalFee || 25000).toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-gray-500 font-medium">Refundable Deposit</div>
                  <div className="font-extrabold text-amber-700">
                    Rs. {(booking.securityDeposit !== undefined ? booking.securityDeposit : 10000).toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-gray-500 font-medium">Settlement Status</div>
                  <div className="font-extrabold text-emerald-700">
                    ✓ {booking.paymentStatus || 'PAID'} (Reconciled)
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Processing Timeline */}
          <div className="space-y-2">
            <h4 className="text-xs font-extrabold text-gray-700 uppercase tracking-wide mb-3">
              Processing &amp; Review Lifecycle
            </h4>
            <div className="space-y-3 pl-1">
              {steps.map((step, index) => (
                <TimelineStep key={step.title} step={step} isLast={index === steps.length - 1} />
              ))}
            </div>
          </div>

          {/* Staff Review Remarks History */}
          {booking.remarks && booking.remarks.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-extrabold text-gray-700 uppercase tracking-wide">
                Officer Remarks &amp; Audit Log
              </h4>
              <div className="space-y-2">
                {booking.remarks.map((rem) => (
                  <div key={rem.id} className="p-3 bg-stone-50 border border-gray-200 rounded-xl text-xs space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-bold text-gray-700">
                      <span>👤 {rem.author}</span>
                      <span className="text-gray-400 font-normal">{rem.date} at {rem.time}</span>
                    </div>
                    <p className="text-gray-800 font-medium">{rem.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Attached Supporting Documents */}
          {booking.documents && booking.documents.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-extrabold text-gray-700 uppercase tracking-wide">
                Attached Verification Documents ({booking.documents.length})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {booking.documents.map((doc, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 bg-stone-50 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-2 truncate">
                      <span>📄</span>
                      <span className="font-semibold text-gray-800 truncate" title={doc.name}>{doc.name}</span>
                    </div>
                    <span className="text-[10px] text-gray-400 font-medium shrink-0">{doc.size}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-stone-50 border-t border-gray-200 p-4 px-6 flex justify-between items-center">
          <button
            type="button"
            onClick={onClose}
            className="border border-gray-300 hover:border-gray-400 bg-white text-gray-700 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer"
          >
            Close Dossier
          </button>

          <button
            type="button"
            onClick={() => downloadSlip(booking)}
            className="bg-[#8C1538] hover:bg-[#73102d] text-white px-5 py-2 rounded-lg text-xs font-extrabold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Download Official Pass Slip</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsModal;
