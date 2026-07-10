import React, { useState, useRef } from 'react';

// Maps the short "Complaint Type" codes used in this form
// to the full category labels the Dashboard table/filter expects.
const CATEGORY_LABELS = {
  Water: 'Water Issues',
  Waste: 'Waste Collection',
  Road: 'Road Damage',
  StreetLight: 'Street Lighting',
  Building: 'Building Approval',
};

export default function ComplaintForm({ onSubmit, onBackToDashboard }) {
  const [formData, setFormData] = useState({
    fullName: '', contactNumber: '', email: '',
    complaintType: '', incidentDate: '',
    location: '', complaintTitle: '', description: ''
  });

  const [image, setImage] = useState<any>(null);
  const [document, setDocument] = useState<any>(null);
  const imageInputRef = useRef<any>(null);
  const docInputRef = useRef<any>(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e, setFile) => {
    if (e.target.files[0]) setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Build the object in the EXACT shape ComplaintDashboard expects
    // (category / name / phone / address / desc / status ...)
    onSubmit({
      ...formData,
      category: CATEGORY_LABELS[formData.complaintType] || formData.complaintType,
      name: formData.fullName,
      phone: formData.contactNumber,
      address: formData.location,
      desc: formData.description,
      title: formData.complaintTitle,
      status: 'PENDING',
      image: image ? URL.createObjectURL(image) : null,
      document: document ? URL.createObjectURL(document) : null,
      documentName: document ? document.name : null
    });
  };

  // Glass card style configuration (no bottom margin here - spacing is handled by the layout wrappers)
  const cardStyle = "bg-white/80 backdrop-blur-md border border-white/50 rounded-2xl p-6 shadow-lg h-full";

  return (
    <div className="bg-gray-50 p-6 min-h-screen">
      <div className="max-w-7xl mx-auto border border-gray-200 rounded-3xl p-8 bg-white shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 border-b pb-4">Submit a New Complaint</h2>

        <form onSubmit={handleSubmit}>
          {/* Row 1: Personal Information + Complaint Details side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-8 items-stretch">
            {/* Section 1: Personal Information */}
            <div className={cardStyle}>
              <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">👤 Personal Information</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
                  <input name="fullName" onChange={handleChange} className="w-full border rounded-lg p-2.5" placeholder="Enter your full name" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Contact Number</label>
                  <input name="contactNumber" onChange={handleChange} className="w-full border rounded-lg p-2.5" placeholder="+94 XX XXX XXXX" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
                  <input type="email" name="email" onChange={handleChange} className="w-full border rounded-lg p-2.5" placeholder="email@example.com" required />
                </div>
              </div>
            </div>

            {/* Section 2: Complaint Details */}
            <div className={cardStyle}>
              <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">ⓘ Complaint Details</h3>
              <div className="grid grid-cols-1 gap-4">

                {/* Complaint Type Selection Dropdown -> feeds the Dashboard's "Category" column */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Complaint Type</label>
                  <select name="complaintType" onChange={handleChange} className="w-full border rounded-lg p-2.5" required>
                    <option value="">Select issue type</option>
                    <option value="Water">Water Issues</option>
                    <option value="Waste">Waste Collection</option>
                    <option value="Road">Road Damage</option>
                    <option value="StreetLight">Street Light Issues</option>
                    <option value="Building">Building Maintenance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Incident Date</label>
                  <input type="date" name="incidentDate" onChange={handleChange} className="w-full border rounded-lg p-2.5" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Location / Address</label>
                  <input name="location" onChange={handleChange} className="w-full border rounded-lg p-2.5" placeholder="Search address or street name" required />
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: The Issue - full width */}
          <div className={`${cardStyle} mb-6`}>
            <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">📄 The Issue</h3>
            <input name="complaintTitle" onChange={handleChange} className="w-full border rounded-lg p-2.5 mb-4" placeholder="Short summary of the issue" required />
            <textarea name="description" onChange={handleChange} className="w-full border rounded-lg p-2.5" rows={4} placeholder="Provide full details of the problem..." required />

            {/* File Upload Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div onClick={() => imageInputRef.current.click()} className="border-2 border-dashed rounded-xl p-4 text-center cursor-pointer hover:border-red-800">
                <p className="text-sm font-bold">📷 Photo Evidence</p>
                <p className="text-xs text-gray-400">JPG, PNG (Max 10MB)</p>
                <input type="file" ref={imageInputRef} hidden accept="image/*" onChange={(e) => handleFileChange(e, setImage)} />
                {image && <p className="text-green-600 text-xs mt-2 truncate">✓ {image.name}</p>}
              </div>
              <div onClick={() => docInputRef.current.click()} className="border-2 border-dashed rounded-xl p-4 text-center cursor-pointer hover:border-red-800">
                <p className="text-sm font-bold">📂 Documents & PDF</p>
                <p className="text-xs text-gray-400">PDF, DOCX (Max 10MB)</p>
                <input type="file" ref={docInputRef} hidden accept=".pdf,.docx" onChange={(e) => handleFileChange(e, setDocument)} />
                {document && <p className="text-green-600 text-xs mt-2 truncate">✓ {document.name}</p>}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button type="button" onClick={onBackToDashboard} className="px-6 py-2 border rounded-lg hover:bg-gray-100">Cancel</button>
            <button type="submit" className="px-6 py-2 bg-red-900 text-white rounded-lg hover:bg-red-800">Submit Complaint</button>
          </div>
        </form>
      </div>
    </div>
  );
}
