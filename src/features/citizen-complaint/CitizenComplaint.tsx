import React, { useState } from 'react';
import ComplaintDashboard from './components/ComplaintDashboard';
import ComplaintForm from './components/ComplaintForm';

/**
 * Coordinates the complaint dashboard and complaint submission views.
 * @returns {React.JSX.Element} The active complaint view.
 */
export default function CitizenComplaint() {
  // State used to toggle pages
  const [currentView, setCurrentView] = useState('dashboard');

  // 1. Main State matching the initial Mock Data structure (Keys) from your original design
  const [complaints, setComplaints] = useState([
    { 
      id: 'CMP-2024-025', 
      date: 'Jun 29, 2026', 
      category: 'Building Approval', 
      status: 'PENDING', 
      name: 'A.B. Perera', 
      phone: '0771234567', 
      address: '123, High Level Rd, Homagama', 
      desc: 'Delay in building plan approval for over 2 weeks.' 
    },
    { 
      id: 'CMP-2024-001', 
      date: 'Jun 15, 2026', 
      category: 'Waste Collection', 
      status: 'IN PROGRESS', 
      name: 'S. Silva', 
      phone: '0719876543', 
      address: '45, Katuwana Rd, Homagama', 
      desc: 'Garbage truck has not visited our lane for 5 days.' 
    },
    { 
      id: 'CMP-2024-008', 
      date: 'May 10, 2026', 
      category: 'Road Damage', 
      status: 'RESOLVED', 
      name: 'M. Fernando', 
      phone: '0754443322', 
      address: 'Galwilawatta, Homagama', 
      desc: 'Large pothole near the junction causing traffic.' 
    },
    { 
      id: 'CMP-2024-015', 
      date: 'Mar 02, 2026', 
      category: 'Street Lighting', 
      status: 'PENDING', 
      name: 'K. Premadasa', 
      phone: '0721112233', 
      address: 'Station Rd, Homagama', 
      desc: 'Three street lamps are broken since last Monday.' 
    },
  ]);

  // 2. Function to add a new Complaint (Added to the top of the array - LIFO)
  /**
   * Adds a new complaint to the beginning of the complaint list.
   * @param {object} newComplaintData - Complaint data submitted by the form.
   */
  const handleAddNewComplaint = (newComplaintData) => {
    // ID is generated exactly in your old format (e.g., CMP-2024-026)
    const nextIdNumber = complaints.length + 1;
    const formattedId = `CMP-2024-${String(nextIdNumber).padStart(3, '0')}`;
    
    // Format the date beautifully (e.g., Jul 05, 2026)
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: '2-digit', year: 'numeric' };
    const today = new Date().toLocaleDateString('en-US', options);

    const finalNewComplaint = {
      id: formattedId,
      date: today,
      status: 'PENDING',
      // Maps the data coming from the Form to your Dashboard Keys
      // (ComplaintForm's handleSubmit already sends: name, phone, address, desc, category)
      name: newComplaintData.name,
      phone: newComplaintData.phone,
      address: newComplaintData.address,
      desc: newComplaintData.desc,
      category: newComplaintData.category,
      image: newComplaintData.image
    };

    // Adds the new item to the very beginning of the Array using the [...prev] method
    setComplaints((prevComplaints) => [finalNewComplaint, ...prevComplaints]);
    setCurrentView('dashboard');
  };

  // 3. Function to completely edit and save a previously submitted Complaint
  /**
   * Replaces an existing complaint with its updated values.
   * @param {object} updatedComplaint - Updated complaint data.
   */
  const handleUpdateComplaint = (updatedComplaint) => {
    setComplaints((prevComplaints) =>
      prevComplaints.map((c) => (c.id === updatedComplaint.id ? updatedComplaint : c))
    );
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {currentView === 'dashboard' ? (
        <ComplaintDashboard 
          complaints={complaints} 
          onNavigateToForm={() => setCurrentView('form')} // Mapped to the exact Prop on your Dashboard
          onUpdateComplaint={handleUpdateComplaint}
        />
      ) : (
        <ComplaintForm 
          onSubmit={handleAddNewComplaint} 
          onBackToDashboard={() => setCurrentView('dashboard')} 
        />
      )}
    </div>
  );
}
