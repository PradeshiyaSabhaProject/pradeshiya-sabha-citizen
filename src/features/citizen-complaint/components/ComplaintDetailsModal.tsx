import React from 'react';
import { downloadSlip } from '../../../utils/pdfGenerator';

export interface ComplaintItem {
  id: string;
  date: string;
  category: string;
  status: 'PENDING' | 'IN PROGRESS' | 'RESOLVED' | string;
  name: string;
  phone: string;
  address: string;
  desc: string;
  title?: string;
  incidentDate?: string;
  email?: string;
  image?: string | null;
  document?: string | null;
  documentName?: string | null;
  assignedOfficer?: string;
  resolutionNotes?: string;
  remarks?: Array<{
    id: string;
    author: string;
    text: string;
    date: string;
    time: string;
  }>;
}

interface Step {
  title: string;
  description: string;
  status: 'completed' | 'active' | 'cancelled' | 'upcoming';
}

const getTimelineSteps = (complaint: ComplaintItem): Step[] => {
  const isResolved = complaint.status === 'RESOLVED';
  const isInProgress = complaint.status === 'IN PROGRESS';
  const isPending = complaint.status === 'PENDING';

  return [
    {
      title: '1. Incident Lodged & Intake',
      description: `Complaint registered in municipal gateway on ${complaint.date}.`,
      status: 'completed',
    },
    {
      title: '2. Zonal Desk Review & Officer Allocation',
      description: isInProgress || isResolved
        ? `Allocated to ${complaint.assignedOfficer || 'Zonal Field Engineer'} for site inspection.`
        : 'Awaiting review and department allocation.',
      status: isInProgress || isResolved ? 'completed' : 'active',
    },
    {
      title: '3. Field Inspection & Redressal Work',
      description: isResolved
        ? 'Field inspection verified and remediation work executed on site.'
        : isInProgress
        ? 'Field technical team is actively addressing the reported issue.'
        : 'Pending technical investigation.',
      status: isResolved ? 'completed' : isInProgress ? 'active' : 'upcoming',
    },
    {
      title: '4. Final Resolution & Ledger Sign-off',
      description: isResolved
        ? (complaint.resolutionNotes || 'Remediation completed, inspected, and archived in council records.')
        : 'Awaiting final verification and sign-off.',
      status: isResolved ? 'completed' : 'upcoming',
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

interface ComplaintDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  complaint: ComplaintItem | null;
}

const ComplaintDetailsModal: React.FC<ComplaintDetailsModalProps> = ({ isOpen, onClose, complaint }) => {
  if (!isOpen || !complaint) return null;

  const steps = getTimelineSteps(complaint);
  const isResolved = complaint.status === 'RESOLVED';
  const isInProgress = complaint.status === 'IN PROGRESS';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-fadeIn select-none font-sans">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl border border-gray-200 my-8 animate-modalScaleIn text-left">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#8C1538] to-[#5c0d24] p-5 sm:p-6 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold bg-white/20 px-2.5 py-0.5 rounded-md">
                {complaint.id}
              </span>
              <span className="text-xs uppercase tracking-wider font-semibold text-rose-100">
                • {complaint.category}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-white mt-1.5">
              {complaint.title || complaint.category}
            </h3>
            <p className="text-xs text-rose-200 mt-0.5 font-medium">
              📍 {complaint.address}
            </p>
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
          {isInProgress && (
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 text-xs text-blue-950 space-y-1">
              <div className="font-extrabold flex items-center gap-1.5 text-blue-900">
                <span>⚙️</span> In Progress &amp; Under Remediation
              </div>
              <p className="font-medium text-blue-800">
                A field inspection crew from the {complaint.category} division has been assigned.
              </p>
            </div>
          )}

          {isResolved && (
            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4 text-xs text-emerald-950 space-y-1">
              <div className="font-extrabold flex items-center gap-1.5 text-emerald-900">
                <span>✓</span> Resolved &amp; Verified
              </div>
              <p className="font-medium text-emerald-800">
                {complaint.resolutionNotes || 'Remediation completed and verified by municipal zonal officer.'}
              </p>
            </div>
          )}

          {/* Citizen & Complaint Metadata Grid */}
          <div className="bg-stone-50 border border-gray-200 rounded-xl p-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <span className="text-gray-500 font-medium block">Applicant Name:</span>
              <span className="font-bold text-gray-900">{complaint.name}</span>
            </div>
            <div>
              <span className="text-gray-500 font-medium block">Contact Mobile:</span>
              <span className="font-bold text-gray-900">{complaint.phone}</span>
            </div>
            <div>
              <span className="text-gray-500 font-medium block">Incident Date:</span>
              <span className="font-bold text-[#8C1538]">{complaint.incidentDate || complaint.date}</span>
            </div>
            <div className="col-span-2 sm:col-span-3">
              <span className="text-gray-500 font-medium block">Location / Address:</span>
              <span className="font-bold text-gray-900">{complaint.address}</span>
            </div>
            <div className="col-span-2 sm:col-span-3">
              <span className="text-gray-500 font-medium block">Full Description:</span>
              <p className="text-gray-800 font-medium mt-0.5 leading-relaxed">{complaint.desc}</p>
            </div>
          </div>

          {/* Photographic Evidence */}
          {complaint.image && (
            <div className="space-y-2">
              <h4 className="text-xs font-extrabold text-gray-700 uppercase tracking-wide">
                Attached Photo Evidence
              </h4>
              <div className="border border-gray-200 rounded-xl overflow-hidden max-h-56 bg-black/5 flex items-center justify-center">
                <img
                  src={complaint.image}
                  alt="Complaint Evidence"
                  className="max-h-56 w-auto object-contain rounded-lg"
                />
              </div>
            </div>
          )}

          {/* Processing Timeline */}
          <div className="space-y-2">
            <h4 className="text-xs font-extrabold text-gray-700 uppercase tracking-wide mb-3">
              Processing &amp; Redressal Lifecycle
            </h4>
            <div className="space-y-3 pl-1">
              {steps.map((step, index) => (
                <TimelineStep key={step.title} step={step} isLast={index === steps.length - 1} />
              ))}
            </div>
          </div>

          {/* Officer Remarks Log */}
          {complaint.remarks && complaint.remarks.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-extrabold text-gray-700 uppercase tracking-wide">
                Officer Remarks &amp; Audit Log
              </h4>
              <div className="space-y-2">
                {complaint.remarks.map((rem) => (
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
            onClick={() => downloadSlip(complaint)}
            className="bg-[#8C1538] hover:bg-[#73102d] text-white px-5 py-2 rounded-lg text-xs font-extrabold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Download Official Tracking Pass</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetailsModal;
