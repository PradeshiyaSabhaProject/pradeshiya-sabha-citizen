import React from 'react';
import { downloadSlip } from '../../../utils/pdfGenerator';

interface Step {
  title: string;
  description: string;
  status: string;
}

const getStep3Details = (isConfirmed: boolean, isCancelled: boolean) => {
  if (isConfirmed) {
    return { desc: 'Verification check completed successfully.', status: 'completed' };
  }
  if (isCancelled) {
    return { desc: 'Process halted due to cancellation.', status: 'cancelled' };
  }
  return { desc: 'Awaiting final administrative sign-off and slot reservation.', status: 'active' };
};

const getStep4Details = (booking: any, isConfirmed: boolean, isCancelled: boolean) => {
  if (isConfirmed) {
    const desc = booking.type === 'appointment'
      ? `Confirmed! Your appointment is scheduled for ${booking.date} at ${booking.time}`
      : `Reserved! Your facility booking is confirmed for ${booking.date} (${booking.time || 'Full Day'}). Price: ${booking.price || 'Paid'}`;
    return { desc, status: 'completed' };
  }
  if (isCancelled) {
    return { desc: booking.statusMessage || 'This booking has been cancelled.', status: 'cancelled' };
  }
  return { desc: 'Awaiting approval confirmation.', status: 'upcoming' };
};

const getTimelineSteps = (booking: any, isConfirmed: boolean, isCancelled: boolean): Step[] => {
  const step3 = getStep3Details(isConfirmed, isCancelled);
  const step4 = getStep4Details(booking, isConfirmed, isCancelled);

  return [
    {
      title: 'Sent to Relevant Officer',
      description: booking.type === 'appointment'
        ? `Booking request successfully dispatched to official ${booking.officialName} (${booking.role || 'Council Official'})`
        : `Facility booking request received and dispatched to the Facility Coordinator`,
      status: 'completed',
    },
    {
      title: 'Checking Details',
      description: booking.type === 'appointment'
        ? `Officer is verifying the appointment agenda and checking the availability of ${booking.office || 'the department office'}`
        : `Checking facility availability at ${booking.location || 'designated venue'} and verifying capacity requirements`,
      status: isCancelled ? 'cancelled' : 'completed',
    },
    {
      title: 'Status is Pending',
      description: step3.desc,
      status: step3.status,
    },
    {
      title: isCancelled ? 'Request Cancelled' : 'Approved',
      description: step4.desc,
      status: step4.status,
    }
  ];
};

const TimelineStep = ({ step, isLast, nextStepStatus }: { step: Step; isLast: boolean; nextStepStatus?: string }) => {
  let iconBg = 'bg-gray-50 border-gray-200 text-gray-400';
  let icon = <span className="w-2 h-2 bg-gray-450 rounded-full" />;
  let titleColor = 'text-gray-400 font-medium';

  if (step.status === 'completed') {
    iconBg = 'bg-green-50 border-green-600 text-green-600';
    icon = (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
      </svg>
    );
    titleColor = 'text-gray-800 font-bold';
  } else if (step.status === 'active') {
    iconBg = 'bg-amber-50 border-amber-600 text-amber-700 animate-pulse';
    icon = (
      <svg className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '3s' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
    titleColor = 'text-amber-800 font-extrabold';
  } else if (step.status === 'cancelled') {
    iconBg = 'bg-red-50 border-red-600 text-red-600';
    icon = (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
      </svg>
    );
    titleColor = 'text-red-700 font-bold';
  }

  const isCompletedAndNextNotUpcoming = step.status === 'completed' && nextStepStatus !== 'upcoming';
  const connectorBg = isCompletedAndNextNotUpcoming ? 'bg-green-600' : 'bg-gray-200';

  return (
    <div className="flex gap-4 items-start relative">
      {/* Left Column: Bullet and Connector Line */}
      <div className="flex flex-col items-center shrink-0">
        <div className={`w-7 h-7 rounded-full flex items-center justify-center border-2 ${iconBg} z-10 bg-white shadow-xs`}>
          {icon}
        </div>
        {!isLast && (
          <div className={`w-0.5 h-10 my-0.5 ${connectorBg}`} />
        )}
      </div>

      {/* Right Column: Step Text */}
      <div className="pt-0.5 pb-2">
        <h4 className={`text-sm ${titleColor}`}>{step.title}</h4>
        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{step.description}</p>
      </div>
    </div>
  );
};

const FormDetailsSummary = ({ booking }: { booking: any }) => {
  if (!booking.formDetails) return null;
  const isCremation = booking.facilityName?.includes('Crematorium');

  return (
    <div className="mb-5 border border-gray-150 rounded-xl overflow-hidden text-xs">
      <div className="bg-gray-50 px-4 py-2 border-b border-gray-150 font-bold text-gray-700 uppercase tracking-wider">
        {isCremation ? 'Cremation Details' : 'Reservation Details'}
      </div>
      <div className="p-4 space-y-2 bg-white max-h-48 overflow-y-auto">
        {isCremation ? (
          <div className="grid grid-cols-2 gap-y-1 gap-x-2">
            <span className="text-gray-400 font-bold">Applicant Name:</span>
            <span className="text-gray-800 font-semibold text-right">{booking.formDetails.applicantName}</span>
            
            <span className="text-gray-400 font-bold">Applicant NIC:</span>
            <span className="text-gray-800 font-semibold text-right">{booking.formDetails.applicantNic}</span>
            
            <span className="text-gray-400 font-bold">Deceased Name:</span>
            <span className="text-gray-800 font-semibold text-right">{booking.formDetails.deceasedName}</span>
            
            <span className="text-gray-400 font-bold">Deceased NIC:</span>
            <span className="text-gray-800 font-semibold text-right">{booking.formDetails.deceasedNic || 'N/A'}</span>
            
            <span className="text-gray-400 font-bold">Relationship:</span>
            <span className="text-gray-800 font-semibold text-right">{booking.formDetails.relationship}</span>
            
            <span className="text-gray-400 font-bold">Death Certificate No:</span>
            <span className="text-gray-800 font-semibold text-right">{booking.formDetails.deathCertificateNo}</span>
            
            <span className="text-gray-400 font-bold">Cause of Death:</span>
            <span className="text-gray-800 font-semibold text-right">{booking.formDetails.causeOfDeath}</span>

            {booking.formDetails.inquestConducted === 'Yes' && (
              <>
                <span className="text-gray-400 font-bold">Inquest Verdict:</span>
                <span className="text-gray-800 font-semibold text-right">{booking.formDetails.inquestVerdict}</span>
              </>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-y-1 gap-x-2">
            <span className="text-gray-400 font-bold">Applicant Name:</span>
            <span className="text-gray-800 font-semibold text-right">{booking.formDetails.applicantName}</span>
            
            <span className="text-gray-400 font-bold">Applicant NIC:</span>
            <span className="text-gray-800 font-semibold text-right">{booking.formDetails.applicantNic}</span>
            
            <span className="text-gray-400 font-bold">Event Purpose:</span>
            <span className="text-gray-800 font-semibold text-right">{booking.formDetails.bookingPurpose}</span>
            
            <span className="text-gray-400 font-bold">Expected Attendance:</span>
            <span className="text-gray-800 font-semibold text-right">{booking.formDetails.expectedAttendance}</span>
            
            {booking.formDetails.equipmentRequired && (
              <>
                <span className="text-gray-400 font-bold">Special Request:</span>
                <span className="text-gray-800 font-semibold text-right">{booking.formDetails.equipmentRequired}</span>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const BookingDetailsModal = ({ isOpen, onClose, booking }: { isOpen: boolean; onClose: () => void; booking: any }) => {
  if (!isOpen || !booking) return null;

  const isConfirmed = booking.status === 'CONFIRMED' || booking.status === 'RESERVED';
  const isCancelled = booking.status === 'CANCELLED';

  const steps = getTimelineSteps(booking, isConfirmed, isCancelled);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-lg scale-95 overflow-hidden rounded-xl bg-white p-6 shadow-2xl transition-all duration-300 ease-out border border-gray-150">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-5">
          <div>
            <span className="text-[10px] font-bold text-red-800 uppercase tracking-widest bg-red-50 px-2 py-0.5 rounded">
              {booking.type} Reference
            </span>
            <h3 className="text-lg font-extrabold text-gray-800 mt-1">Booking #PS-BK-{booking.id}</h3>
          </div>
          <button 
            type="button"
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold p-1 leading-none cursor-pointer"
          >
            &times;
          </button>
        </div>

        {/* Timeline View */}
        <div className="space-y-1 mb-6">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Processing Timeline</h4>
          
          <div className="space-y-4 py-1 pl-1">
            {steps.map((step, index) => (
              <TimelineStep
                key={step.title}
                step={step}
                isLast={index === steps.length - 1}
                nextStepStatus={index < steps.length - 1 ? steps[index + 1].status : undefined}
              />
            ))}
          </div>
        </div>

        {/* Form Details Summary */}
        <FormDetailsSummary booking={booking} />

        {/* Attached Document (Optional) */}
        {booking.attachment && (
          <div className="mb-6 p-3.5 bg-gray-50 border border-gray-200 rounded-lg flex justify-between items-center text-xs">
            <div className="flex items-center gap-2 text-gray-700 min-w-0">
              <span className="text-sm">📎</span>
              <span className="font-semibold truncate max-w-61.25" title={booking.attachment.name}>
                {booking.attachment.name}
              </span>
              <span className="text-[10px] text-gray-400">
                ({booking.attachment.size ? `${(booking.attachment.size / 1024).toFixed(1)} KB` : '100 KB'})
              </span>
            </div>
            <button 
              type="button"
              onClick={() => alert(`Opening attached document: ${booking.attachment.name}`)}
              className="text-red-800 font-bold hover:underline cursor-pointer shrink-0"
            >
              View Document
            </button>
          </div>
        )}

        {/* Footer Actions */}
        <div className="mt-6 flex justify-end gap-3 pt-3 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md bg-gray-150 hover:bg-gray-250 px-4 py-2 text-xs font-bold text-gray-700 transition-colors cursor-pointer"
          >
            Close Details
          </button>
          
          <button
            type="button"
            onClick={() => downloadSlip(booking)}
            className="rounded-md bg-red-800 hover:bg-red-900 px-4 py-2 text-xs font-extrabold text-white transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Slip
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsModal;
