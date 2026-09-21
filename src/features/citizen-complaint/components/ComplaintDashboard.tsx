import React, { useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import ComplaintDetailsModal, { type ComplaintItem } from './ComplaintDetailsModal';

interface ComplaintDashboardProps {
  onNavigateToForm: () => void;
  complaints: ComplaintItem[];
  onUpdateComplaint?: (updated: ComplaintItem) => void;
}

const getCategoryAvatar = (category: string) => {
  switch (category) {
    case 'Water Issues':
    case 'Water':
      return '🚰';
    case 'Waste Collection':
    case 'Waste':
      return '🚛';
    case 'Road Damage':
    case 'Road':
      return '🚧';
    case 'Street Lighting':
    case 'StreetLight':
      return '💡';
    case 'Building Maintenance':
    case 'Building Approval':
    case 'Building':
      return '🏗️';
    default:
      return '⚠️';
  }
};

const getStatusBadgeStyle = (status: string) => {
  switch (status) {
    case 'RESOLVED':
      return 'bg-emerald-50 text-emerald-800 border-emerald-200';
    case 'IN PROGRESS':
      return 'bg-blue-50 text-blue-800 border-blue-200';
    case 'PENDING':
    default:
      return 'bg-amber-50 text-amber-800 border-amber-200';
  }
};

export default function ComplaintDashboard({
  onNavigateToForm,
  complaints = []
}: ComplaintDashboardProps) {
  const { t } = useLanguage();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Modal State
  const [selectedComplaint, setSelectedComplaint] = useState<ComplaintItem | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Stats calculation
  const totalCount = complaints.length;
  const pendingCount = complaints.filter((c) => c.status === 'PENDING').length;
  const inProgressCount = complaints.filter((c) => c.status === 'IN PROGRESS').length;
  const resolvedCount = complaints.filter((c) => c.status === 'RESOLVED').length;

  const categories = Array.from(new Set(complaints.map((c) => c.category))).filter(Boolean);

  const filteredComplaints = complaints.filter((item) => {
    const matchesSearch =
      (item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.address.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleOpenDetails = (complaint: ComplaintItem) => {
    setSelectedComplaint(complaint);
    setIsDetailsOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Metric Stat Cards Strip matching Facility Booking summary style */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-2xs">
          <div className="text-2xl font-extrabold text-gray-900">{totalCount}</div>
          <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mt-0.5">
            Total Complaints
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-2xs">
          <div className="text-2xl font-extrabold text-amber-700">{pendingCount}</div>
          <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mt-0.5">
            Pending Review
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-2xs">
          <div className="text-2xl font-extrabold text-blue-700">{inProgressCount}</div>
          <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mt-0.5">
            Under Remediation
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-2xs">
          <div className="text-2xl font-extrabold text-emerald-700">{resolvedCount}</div>
          <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mt-0.5">
            Resolved &amp; Closed
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm max-w-4xl mx-auto space-y-6">
        {/* Header Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-150">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Registered Citizen Complaints</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Monitor live zonal inspector assignments, remediation milestones, and download official tracking slips.
            </p>
          </div>
          <button
            type="button"
            onClick={onNavigateToForm}
            className="bg-[#8C1538] hover:bg-[#73102d] text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer self-start sm:self-auto shrink-0"
          >
            <span>+</span>
            <span>File New Complaint</span>
          </button>
        </div>

        {/* Filter and Search Controls */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Status Pills */}
            <div className="flex items-center gap-2 flex-wrap">
              {[
                { id: 'All', label: 'All' },
                { id: 'PENDING', label: 'Pending Review' },
                { id: 'IN PROGRESS', label: 'In Progress' },
                { id: 'RESOLVED', label: 'Resolved' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setStatusFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    statusFilter === tab.id
                      ? 'bg-[#8C1538] text-white shadow-2xs'
                      : 'bg-stone-50 border border-gray-200 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Category Dropdown Filter */}
            <div className="w-full sm:w-48">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full bg-stone-50 border border-gray-200 rounded-lg py-1.5 px-3 text-xs font-medium text-gray-700 focus:outline-none focus:border-gray-400"
              >
                <option value="All">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search complaints by description, location, or reference ID..."
              className="w-full bg-stone-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-xs text-gray-800 placeholder-gray-400 focus:bg-white focus:outline-none focus:border-gray-400 transition-all shadow-3xs"
            />
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Complaints Cards List matching Facility Booking / MyBookings card standard */}
        {filteredComplaints.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-gray-200 rounded-xl text-gray-400 text-xs space-y-2">
            <p>No complaints match the selected filter criteria.</p>
            <button
              type="button"
              onClick={onNavigateToForm}
              className="text-xs font-bold text-[#8C1538] underline cursor-pointer"
            >
              Report a Civic Issue Now
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredComplaints.map((item) => {
              const isResolved = item.status === 'RESOLVED';
              const isInProgress = item.status === 'IN PROGRESS';
              const isPending = item.status === 'PENDING';

              return (
                <div
                  key={item.id}
                  className="border border-gray-200 rounded-xl overflow-hidden bg-white hover:border-gray-300 transition-all flex flex-col shadow-xs"
                >
                  {/* Top Strip */}
                  <div className="bg-gray-50/75 px-5 py-2.5 border-b border-gray-150 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[#8C1538] bg-red-50 px-2 py-0.5 rounded border border-red-100">
                        {item.id}
                      </span>
                      <span className="font-semibold text-gray-700">
                        • {item.category}
                      </span>
                    </div>
                    <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded uppercase tracking-wider border ${getStatusBadgeStyle(item.status)}`}>
                      {item.status}
                    </span>
                  </div>

                  {/* Main Card Content */}
                  <div className="p-5 flex items-start gap-4">
                    {/* Category Avatar Box */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 border ${
                      isResolved
                        ? 'bg-emerald-50 border-emerald-200'
                        : isInProgress
                        ? 'bg-blue-50 border-blue-200'
                        : 'bg-amber-50 border-amber-200'
                    }`}>
                      {getCategoryAvatar(item.category)}
                    </div>

                    {/* Middle Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="text-base font-bold text-gray-900 truncate">
                          {item.title || item.category}
                        </h3>
                      </div>

                      <p className="text-xs text-gray-600 mt-1 line-clamp-2 leading-relaxed">
                        {item.desc}
                      </p>

                      {/* Location and Date Info Strip */}
                      <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-gray-600 font-medium">
                        <span className="flex items-center gap-1.5">
                          📍 {item.address}
                        </span>
                        <span className="flex items-center gap-1.5 border-l border-gray-200 pl-3">
                          📅 {item.date}
                        </span>
                        <span className="hidden sm:inline-block border-l border-gray-200 pl-3 text-gray-500 text-[11px]">
                          👤 {item.name} ({item.phone})
                        </span>
                      </div>
                    </div>

                    {/* Right Details Button */}
                    <div className="shrink-0 flex items-center">
                      <button
                        type="button"
                        onClick={() => handleOpenDetails(item)}
                        className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 p-2 rounded-lg transition-colors cursor-pointer shadow-3xs flex items-center gap-1 text-xs font-semibold"
                        title="View Full Complaint Dossier & Tracking"
                      >
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span className="hidden sm:inline">Details</span>
                      </button>
                    </div>
                  </div>

                  {/* Status Strips */}
                  {isPending && (
                    <div className="bg-amber-50/70 border-t border-amber-200 px-5 py-2.5 text-xs text-amber-900 flex items-center justify-between">
                      <span>⏳ Awaiting initial assessment and dispatch to {item.category} field unit.</span>
                    </div>
                  )}

                  {isInProgress && (
                    <div className="bg-blue-50/70 border-t border-blue-200 px-5 py-2.5 text-xs text-blue-900 flex items-center justify-between">
                      <span>⚙️ Remediation underway. Field team assigned for inspection and repair.</span>
                    </div>
                  )}

                  {isResolved && (
                    <div className="bg-emerald-50/70 border-t border-emerald-200 px-5 py-2.5 text-xs text-emerald-900 flex items-center justify-between">
                      <span>✓ Resolved and validated by Zonal Redressal Officer.</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Complaint Dossier Modal */}
      <ComplaintDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        complaint={selectedComplaint}
      />
    </div>
  );
}
