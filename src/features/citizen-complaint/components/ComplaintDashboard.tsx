import React, { useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';

export default function ComplaintDashboard({ onNavigateToForm, complaints = [], onUpdateComplaint }) {
  const { t } = useLanguage();
  
  // Filters State
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');

  // ---- PAGINATION STATES ----
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; 

  // Modal (Pop-up) States
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const [editForm, setEditForm] = useState<any>({
    category: '',
    status: '',
    name: '',
    phone: '',
    address: '',
    desc: ''
  });

  const getStatusStyle = (status) => {
    switch (status) {
      case 'RESOLVED': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'IN PROGRESS': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-rose-50 text-rose-700 border-rose-200';
    }
  };

  // Colors for the "Current Status" banner shown inside the details modal
  const getStatusBannerStyle = (status) => {
    switch (status) {
      case 'RESOLVED': return 'bg-emerald-50 border-emerald-200 text-emerald-800';
      case 'IN PROGRESS': return 'bg-blue-50 border-blue-200 text-blue-800';
      default: return 'bg-amber-50 border-amber-200 text-amber-800'; // PENDING
    }
  };

  const getStatusBannerMessage = (status) => {
    switch (status) {
      case 'RESOLVED': return 'This issue has been resolved and closed.';
      case 'IN PROGRESS': return 'Your complaint is being actively worked on by the relevant department.';
      default: return 'Awaiting review by the relevant department.';
    }
  };

  // Builds a simple, read-only progress timeline for the citizen to track their complaint.
  // This reflects the status set by the handling officer - citizens can view it, not edit it.
  const getTimelineSteps = (complaint) => {
    const statusOrder = ['PENDING', 'IN PROGRESS', 'RESOLVED'];
    const currentIndex = Math.max(statusOrder.indexOf(complaint.status), 0);

    const steps = [
      {
        label: 'Submitted',
        description: 'Complaint received and logged into the system.',
        date: complaint.date,
      },
      {
        label: 'In Progress',
        description: currentIndex >= 1
          ? 'Assigned to the relevant department officer for action.'
          : 'Awaiting assignment to a department officer.',
        date: currentIndex >= 1 ? complaint.date : null,
      },
      {
        label: 'Resolved',
        description: currentIndex >= 2
          ? 'Issue has been resolved and closed.'
          : 'Pending final resolution.',
        date: currentIndex >= 2 ? complaint.date : null,
      },
    ];

    return steps.map((step, idx) => ({ ...step, completed: idx <= currentIndex }));
  };

  // 1. Filtering Logic
  const filteredComplaints = complaints.filter(item => {
    const matchesStatus = statusFilter === 'All Statuses' || item.status === statusFilter;
    const matchesCategory = categoryFilter === 'All Categories' || item.category === categoryFilter;
    return matchesStatus && matchesCategory;
  });

  // ---- PAGINATION LOGIC ----
  const totalPages = Math.ceil(filteredComplaints.length / itemsPerPage) || 1;
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredComplaints.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryFilterChange = (e) => {
    setCategoryFilter(e.target.value);
    setCurrentPage(1);
  };

  // Stats Calculations
  const totalCount = complaints.length;
  const activeCount = complaints.filter(c => c.status === 'PENDING' || c.status === 'IN PROGRESS').length;
  const resolvedCount = complaints.filter(c => c.status === 'RESOLVED').length;

  const handleOpenModal = (complaint) => {
    setSelectedComplaint(complaint);
    setEditForm({ ...complaint });
    setIsEditing(false);
  };

  const handleSaveChanges = () => {
    onUpdateComplaint(editForm);
    setIsEditing(false);
    setSelectedComplaint(null);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6 font-sans">
      {/* Banner Section */}
      <div className="relative rounded-xl overflow-hidden mb-6 h-48 bg-gradient-to-r from-slate-800 to-slate-900 flex items-center px-8 text-white">
        <div className="z-10">
          <h1 className="text-3xl font-bold">{t('complaints.title', 'Citizen Complaint Portal')}</h1>
          <p className="text-gray-300 mt-2 text-sm">{t('complaints.subtitle', 'Manage your submitted reports and track institutional progress in real-time.')}</p>
        </div>
        <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80')` }}></div>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm text-center">
          <span className="text-rose-800 font-semibold text-xs uppercase tracking-wider block mb-1">Total Complaints</span>
          <h3 className="text-3xl font-bold text-gray-800">{String(totalCount).padStart(2, '0')}</h3>
          <span className="text-emerald-500 text-xs mt-1 block">▲ Dynamic tracking enabled</span>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm text-center">
          <span className="text-blue-800 font-semibold text-xs uppercase tracking-wider block mb-1">Active</span>
          <h3 className="text-3xl font-bold text-gray-800">{String(activeCount).padStart(2, '0')}</h3>
          <span className="text-gray-400 text-xs mt-1 block">Currently under review</span>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm text-center">
          <span className="text-emerald-800 font-semibold text-xs uppercase tracking-wider block mb-1">Resolved</span>
          <h3 className="text-3xl font-bold text-gray-800">{String(resolvedCount).padStart(2, '0')}</h3>
          <span className="text-emerald-500 text-xs mt-1 block">✓ Live resolution rate</span>
        </div>
      </div>

      {/* Filter and Table Section */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="font-semibold text-gray-800">{t('complaints.myComplaints', 'My Complaints')}</span>
            
            <select 
              value={statusFilter}
              onChange={handleStatusFilterChange}
              className="border border-gray-200 rounded-lg px-3 py-1.5 bg-gray-50 text-xs font-medium focus:outline-none focus:border-red-800"
            >
              <option value="All Statuses">All Statuses</option>
              <option value="PENDING">PENDING</option>
              <option value="IN PROGRESS">IN PROGRESS</option>
              <option value="RESOLVED">RESOLVED</option>
            </select>

            <select 
              value={categoryFilter}
              onChange={handleCategoryFilterChange}
              className="border border-gray-200 rounded-lg px-3 py-1.5 bg-gray-50 text-xs font-medium focus:outline-none focus:border-red-800"
            >
              <option value="All Categories">All Categories</option>
              <option value="Building Approval">Building Approval</option>
              <option value="Waste Collection">Waste Collection</option>
              <option value="Road Damage">Road Damage</option>
              <option value="Street Lighting">Street Lighting</option>
            </select>
          </div>
          
          <button 
            onClick={onNavigateToForm}
            className="bg-[#991b1b] hover:bg-[#7f1d1d] text-white px-4 py-2 rounded-lg font-medium text-sm transition-all shadow-sm flex items-center gap-2"
          >
            <span>+</span> {t('complaints.newComplaint', 'New Complaint')}
          </button>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold border-b border-gray-100">
                <th className="p-4">Complaint ID</th>
                <th className="p-4">Date Submitted</th>
                <th className="p-4">Category</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
              {currentItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="p-4 font-bold text-gray-900">{item.id}</td>
                  <td className="p-4 text-gray-500">{item.date}</td>
                  <td className="p-4 font-medium">{item.category}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${getStatusStyle(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <button 
                      onClick={() => handleOpenModal(item)}
                      className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-red-800 transition-colors border border-gray-200 inline-block"
                      title="View Details"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
         </svg>
        </button>
                  </td>
                </tr>
              ))}
              {currentItems.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-400">No complaints found for the selected filter.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/50 text-xs text-gray-500">
          <div>
            Showing <span className="font-semibold text-gray-700">{currentItems.length}</span> of <span className="font-semibold text-gray-700">{filteredComplaints.length}</span> complaints
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-1.5 rounded-md border text-gray-600 bg-white transition-colors ${currentPage === 1 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-100'}`}
            >
              ‹
            </button>

            {Array.from({ length: totalPages }, (_, index) => {
              const pageNum = index + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-7 h-7 font-semibold rounded-md transition-all ${
                    currentPage === pageNum
                      ? 'bg-[#800020] text-white'
                      : 'text-gray-600 hover:bg-gray-200 bg-white border border-gray-200'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-1.5 rounded-md border text-gray-600 bg-white transition-colors ${currentPage === totalPages ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-100'}`}
            >
              &rsaquo;
            </button>
          </div>
        </div>
      </div>

      {/* Pop-up View Modal */}
      {selectedComplaint && (
          
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200 bg-gray-100 flex justify-between items-center">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold">Complaint Details</span>
                <h3 className="font-bold text-gray-900 text-xl">{selectedComplaint.id}</h3>
              </div>
              <button onClick={() => setSelectedComplaint(null)} className="text-gray-400 hover:text-gray-700 text-xl leading-none">✕</button>
            </div>

            <div className="p-6 space-y-5 text-sm text-gray-700 overflow-y-auto max-h-[70vh]">

              {/* Current Status banner - reflects officer-updated status, view only */}
              <div className={`rounded-lg border p-4 ${getStatusBannerStyle(selectedComplaint.status)}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider">Current Status</span>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-current">
                    {selectedComplaint.status}
                  </span>
                </div>
                <p className="text-sm italic">{getStatusBannerMessage(selectedComplaint.status)}</p>
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                <div>
                  <span className="text-xs text-gray-400 block mb-1">Citizen Name</span>
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={editForm.name} 
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-red-800 bg-white"
                    />
                  ) : (
                    <p className="font-medium text-gray-900">{selectedComplaint.name}</p>
                  )}
                </div>
                <div>
                  <span className="text-xs text-gray-400 block mb-1">Contact Number</span>
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={editForm.phone} 
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-red-800 bg-white"
                    />
                  ) : (
                    <p className="font-medium text-gray-900">{selectedComplaint.phone}</p>
                  )}
                </div>

                <div>
                  <span className="text-xs text-gray-400 block mb-1">Incident Category</span>
                  {isEditing ? (
                    <select 
                      value={editForm.category} 
                      onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-red-800 bg-white"
                    >
                      <option value="Building Approval">Building Approval</option>
                      <option value="Waste Collection">Waste Collection</option>
                      <option value="Road Damage">Road Damage</option>
                      <option value="Street Lighting">Street Lighting</option>
                    </select>
                  ) : (
                    <p className="font-medium text-gray-900">{selectedComplaint.category}</p>
                  )}
                </div>

                {/* ---- STATUS FIELD ---- */}
                <div>
                  <span className="text-xs text-gray-400 block mb-1">Status</span>
                  <p className="font-bold text-gray-900 bg-gray-100/60 px-3 py-1.5 rounded-lg border border-gray-200/50 inline-block mt-0.5">
                    {editForm.status}
                  </p>
                </div>

                <div>
                  <span className="text-xs text-gray-400 block mb-1">Location / Address</span>
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={editForm.address} 
                      onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-red-800 bg-white"
                    />
                  ) : (
                    <p className="font-medium text-gray-900">{selectedComplaint.address}</p>
                  )}
                </div>
              </div>

              <div className="border-t border-gray-100 pt-3">
                <span className="text-xs text-gray-400 block mb-1">Complaint Description</span>
                {isEditing ? (
                  <textarea 
                    value={editForm.desc} 
                    onChange={(e) => setEditForm({ ...editForm, desc: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none bg-white"
                    rows={3}
                  />
                ) : (
                  <p className="bg-gray-50 p-3 rounded-lg border border-gray-100 text-gray-800 leading-relaxed">{selectedComplaint.desc}</p>
                )}
              </div>
              {/* ---- TIMELINE (read-only - updated by officer only, citizen just views progress) ---- */}
              <div className="border-t border-gray-100 pt-4">
                <span className="text-xs text-gray-400 block mb-3 uppercase tracking-wider font-semibold">Progress Timeline</span>
                <div>
                  {getTimelineSteps(selectedComplaint).map((step, idx, arr) => (
                    <div key={step.label} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <span className={`w-3.5 h-3.5 rounded-full border-2 shrink-0 ${step.completed ? 'bg-red-800 border-red-800' : 'bg-white border-gray-300'}`}></span>
                        {idx < arr.length - 1 && (
                          <span className={`w-0.5 flex-1 my-1 ${step.completed && arr[idx + 1].completed ? 'bg-red-800' : 'bg-gray-200'}`} style={{ minHeight: '28px' }}></span>
                        )}
                      </div>
                      <div className={`pb-5 ${!step.completed ? 'opacity-50' : ''}`}>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-sm font-bold ${step.completed ? 'text-gray-900' : 'text-gray-400'}`}>{step.label}</span>
                          {step.date && <span className="text-xs text-gray-400">{step.date}</span>}
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              
{/* Attached Evidence Section */}
{(selectedComplaint.image || selectedComplaint.document) && (
  <div className="border-t border-gray-100 pt-3">
    <span className="text-xs text-gray-400 block mb-2 uppercase font-semibold">Attached Evidence</span>
    
    {/* Image part */}
    {selectedComplaint.image && (
      <div className="relative rounded-lg overflow-hidden border border-gray-200 max-h-48 bg-gray-50 flex items-center justify-center mb-3">
        <img src={editForm.image || selectedComplaint.image} alt="Evidence" className="max-h-48 object-contain w-full" />
        
        {isEditing && (
          <label className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded cursor-pointer hover:bg-black/80">
            Change Image
            <input type="file" className="hidden" accept="image/*" onChange={(e) => {
              if (e.target.files?.[0]) {
                const reader = new FileReader();
                reader.onload = (ev) => setEditForm({ ...editForm, image: ev.target.result });
                reader.readAsDataURL(e.target.files[0]);
              }
            }} />
          </label>
        )}
      </div>
    )}

    {/* Document part */}
    {(selectedComplaint.document || isEditing) && (
      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
        {selectedComplaint.document ? (
          <a href={selectedComplaint.document} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-700 hover:text-red-800">
            <span className="text-xl">📂</span> {selectedComplaint.documentName || "View Document"}
          </a>
        ) : (
          <span className="text-xs text-gray-400 italic">No document attached</span>
        )}

        {isEditing && (
          <div className="mt-3">
            <span className="text-xs text-gray-400 block mb-1">Update Document</span>
            <input type="file" accept=".pdf,.docx" className="w-full text-xs" onChange={(e) => {
              if (e.target.files?.[0]) {
                setEditForm({ ...editForm, document: URL.createObjectURL(e.target.files[0]), documentName: e.target.files[0].name });
              }
            }} />
          </div>
        )}
      </div>
    )}
  </div>
)}
        </div>

            <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              {isEditing ? (
                <>
                  <button onClick={() => setIsEditing(false)} className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 font-medium text-xs bg-white hover:bg-gray-50">Cancel</button>
                  <button onClick={handleSaveChanges} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs rounded-lg">Save Changes</button>
                </>
              ) : (
                <>
                  {selectedComplaint.status === 'PENDING' && (
      <button 
        onClick={() => setIsEditing(true)} 
        className="px-4 py-2 border border-amber-300 text-amber-700 hover:bg-amber-50 rounded-lg font-medium text-xs bg-white"
      >
        ✏ Edit Complaint
      </button>
    )}
    
    {/* The close button should be normal. */}
    <button onClick={() => setSelectedComplaint(null)} className="px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white font-medium text-xs rounded-lg">Close</button>
  </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
