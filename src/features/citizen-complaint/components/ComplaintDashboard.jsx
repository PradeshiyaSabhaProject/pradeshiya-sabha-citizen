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
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const [editForm, setEditForm] = useState({
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
                      className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-800 transition-colors border border-gray-200 inline-block"
                    >
                      👁
                    </button>
                  </td>
                </tr>
              ))}
              {currentItems.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-400">No complaints found for the selected filter.</td>
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl border border-gray-100 max-w-lg w-full overflow-hidden">
            <div className="p-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
              <h3 className="font-bold text-gray-900 text-lg">Complaint Details ({selectedComplaint.id})</h3>
              <button onClick={() => setSelectedComplaint(null)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>
            
            <div className="p-6 space-y-4 text-sm text-gray-700">
              <div className="grid grid-cols-2 gap-4">
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
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                
                {/* ---- UPDATED STATUS SECTION ---- */}
                <div>
                  <span className="text-xs text-gray-400 block mb-1">Status</span>
                  <p className="font-bold text-gray-900 bg-gray-100/60 px-3 py-1.5 rounded-lg border border-gray-200/50 inline-block mt-0.5">
                    {editForm.status}
                  </p>
                </div>
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

              <div className="border-t border-gray-100 pt-3">
                <span className="text-xs text-gray-400 block mb-1">Complaint Description</span>
                {isEditing ? (
                  <textarea 
                    value={editForm.desc} 
                    onChange={(e) => setEditForm({ ...editForm, desc: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none bg-white"
                    rows="3"
                  />
                ) : (
                  <p className="bg-gray-50 p-3 rounded-lg border border-gray-100 text-gray-800 leading-relaxed">{selectedComplaint.desc}</p>
                )}
              </div>
              {/* Attached Evidence Image View */}
{selectedComplaint.image && !isEditing && (
  <div className="border-t border-gray-100 pt-3">
    <span className="text-xs text-gray-400 block mb-2">Attached Evidence</span>
    <div className="relative rounded-lg overflow-hidden border border-gray-200 max-h-48 bg-gray-50 flex items-center justify-center">
      <img 
        src={selectedComplaint.image} 
        alt="Complaint Evidence" 
        className="max-h-48 object-contain w-full"
      />
    </div>
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
                  <button onClick={() => setIsEditing(true)} className="px-4 py-2 border border-amber-300 text-amber-700 hover:bg-amber-50 rounded-lg font-medium text-xs bg-white">✏ Edit Complaint</button>
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