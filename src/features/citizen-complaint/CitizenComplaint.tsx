import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ComplaintOverview from './components/ComplaintOverview';
import ComplaintDashboard from './components/ComplaintDashboard';
import ComplaintForm from './components/ComplaintForm';
import ComplaintDetailsModal, { type ComplaintItem } from './components/ComplaintDetailsModal';

export default function CitizenComplaint() {
  const [activeTab, setActiveTab] = useState<'overview' | 'complaints' | 'form'>('overview');
  const [selectedComplaint, setSelectedComplaint] = useState<ComplaintItem | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab === 'complaints') {
      setActiveTab('complaints');
    } else if (tab === 'form' || tab === 'new') {
      setActiveTab('form');
    } else {
      setActiveTab('overview');
    }
  }, [location.search]);

  const [complaints, setComplaints] = useState<ComplaintItem[]>([
    { 
      id: 'CMP-2026-025', 
      date: 'Feb 28, 2026', 
      incidentDate: 'Feb 26, 2026',
      category: 'Building Maintenance', 
      status: 'PENDING', 
      name: 'A.B. Perera', 
      phone: '077 123 4567', 
      address: '123, High Level Rd, Homagama', 
      title: 'Cracked municipal retaining wall near bus halt',
      desc: 'Delay in building plan inspection and urgent inspection needed for cracked retaining boundary wall.',
      remarks: [
        {
          id: 'rem-1',
          author: 'Zonal Intake Officer',
          text: 'Complaint logged into public ledger. Assigned to Civil Works Engineering Division.',
          date: 'Feb 28, 2026',
          time: '10:15 AM'
        }
      ]
    },
    { 
      id: 'CMP-2026-018', 
      date: 'Feb 20, 2026', 
      incidentDate: 'Feb 19, 2026',
      category: 'Waste Collection', 
      status: 'IN PROGRESS', 
      name: 'S. Silva', 
      phone: '071 987 6543', 
      address: '45, Katuwana Rd, Homagama', 
      title: 'Garbage compactor missed commercial lane collection',
      desc: 'Garbage truck has not visited our secondary lane for 5 days. Waste accumulation on roadside.',
      assignedOfficer: 'Health Inspector - Zone 02',
      remarks: [
        {
          id: 'rem-2',
          author: 'Sanitation Overseer',
          text: 'Special collection vehicle route scheduled for tomorrow morning.',
          date: 'Feb 21, 2026',
          time: '02:30 PM'
        }
      ]
    },
    { 
      id: 'CMP-2026-008', 
      date: 'Feb 10, 2026', 
      incidentDate: 'Feb 08, 2026',
      category: 'Road Damage', 
      status: 'RESOLVED', 
      name: 'M. Fernando', 
      phone: '075 444 3322', 
      address: 'Galwilawatta Junction, Homagama', 
      title: 'Dangerous pothole at Galwilawatta intersection',
      desc: 'Large pothole near the central junction causing severe vehicle congestion and motorcycle accidents.',
      assignedOfficer: 'Road Maintenance Unit',
      resolutionNotes: 'Pothole asphalt patch remediation completed and road surface leveled.',
      remarks: [
        {
          id: 'rem-3',
          author: 'Road Maintenance Engineer',
          text: 'Asphalt cold mix and heavy roller compaction finished on site.',
          date: 'Feb 12, 2026',
          time: '04:00 PM'
        }
      ]
    },
    { 
      id: 'CMP-2026-002', 
      date: 'Jan 25, 2026', 
      incidentDate: 'Jan 24, 2026',
      category: 'Street Lighting', 
      status: 'RESOLVED', 
      name: 'K. Premadasa', 
      phone: '072 111 2233', 
      address: 'Station Rd, Homagama', 
      title: 'Three consecutive LED street lamps not functioning',
      desc: 'Three street lamps are out since last weekend creating safety concerns near the railway crossing.',
      assignedOfficer: 'Electrical Maintenance Team',
      resolutionNotes: 'Faulty capacitor and LED fixture replaced.',
      remarks: [
        {
          id: 'rem-4',
          author: 'Chief Electrician',
          text: 'New 60W LED fixtures mounted and line fuse repaired.',
          date: 'Jan 27, 2026',
          time: '11:45 AM'
        }
      ]
    },
  ]);

  const handleAddNewComplaint = (newComplaintData: any) => {
    const nextIdNumber = complaints.length + 1;
    const formattedId = `CMP-2026-${String(nextIdNumber).padStart(3, '0')}`;
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: '2-digit', year: 'numeric' };
    const today = new Date().toLocaleDateString('en-US', options);

    const finalNewComplaint: ComplaintItem = {
      id: formattedId,
      date: today,
      incidentDate: newComplaintData.incidentDate || today,
      status: 'PENDING',
      name: newComplaintData.name || newComplaintData.fullName || 'Verified Citizen',
      phone: newComplaintData.phone || newComplaintData.contactNumber || '077 123 4567',
      address: newComplaintData.address || newComplaintData.location || 'Homagama Jurisdiction',
      title: newComplaintData.title || newComplaintData.complaintTitle || newComplaintData.category,
      desc: newComplaintData.desc || newComplaintData.description || 'Public complaint registered.',
      category: newComplaintData.category || 'General Inquiries',
      image: newComplaintData.image || null,
      document: newComplaintData.document || null,
      documentName: newComplaintData.documentName || null,
      remarks: [
        {
          id: `rem-${Date.now()}`,
          author: 'Citizen Complaint Gateway',
          text: 'Complaint submitted via citizen digital portal.',
          date: today,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]
    };

    setComplaints((prev) => [finalNewComplaint, ...prev]);
    setActiveTab('complaints');
  };

  const handleOpenDetails = (complaint: ComplaintItem) => {
    setSelectedComplaint(complaint);
    setIsDetailsOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Inner Navigation Tabs matching Appointment / Facility Booking */}
      <div className="max-w-6xl mx-auto mb-6 flex justify-start border-b border-gray-250">
        <button
          type="button"
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2.5 text-xs font-bold transition-all uppercase tracking-wide border-b-2 cursor-pointer ${
            activeTab === 'overview'
              ? 'border-red-850 text-red-850'
              : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          Portal Overview
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('complaints')}
          className={`px-4 py-2.5 text-xs font-bold transition-all uppercase tracking-wide border-b-2 cursor-pointer ${
            activeTab === 'complaints'
              ? 'border-red-850 text-red-850'
              : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          My Complaints ({complaints.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('form')}
          className={`px-4 py-2.5 text-xs font-bold transition-all uppercase tracking-wide border-b-2 cursor-pointer ${
            activeTab === 'form'
              ? 'border-red-850 text-red-850'
              : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          Submit Complaint
        </button>
      </div>

      <div className="max-w-6xl mx-auto">
        {activeTab === 'overview' && (
          <ComplaintOverview
            onNavigate={(t) => setActiveTab(t)}
            complaints={complaints}
            onOpenDetails={handleOpenDetails}
          />
        )}

        {activeTab === 'complaints' && (
          <ComplaintDashboard
            complaints={complaints}
            onNavigateToForm={() => setActiveTab('form')}
          />
        )}

        {activeTab === 'form' && (
          <ComplaintForm
            onSubmit={handleAddNewComplaint}
            onBackToDashboard={() => setActiveTab('overview')}
          />
        )}
      </div>

      <ComplaintDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        complaint={selectedComplaint}
      />
    </div>
  );
}
