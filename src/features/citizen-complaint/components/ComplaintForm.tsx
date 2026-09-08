import React, { useState, useRef } from 'react';

interface ComplaintFormProps {
  onSubmit: (data: any) => void;
  onBackToDashboard: () => void;
}

const CATEGORY_LABELS: Record<string, string> = {
  Water: 'Water Issues',
  Waste: 'Waste Collection',
  Road: 'Road Damage',
  StreetLight: 'Street Lighting',
  Building: 'Building Maintenance',
};

export default function ComplaintForm({ onSubmit, onBackToDashboard }: ComplaintFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    contactNumber: '',
    email: '',
    complaintType: '',
    incidentDate: new Date().toISOString().split('T')[0],
    location: '',
    complaintTitle: '',
    description: ''
  });

  const [image, setImage] = useState<any>(null);
  const [document, setDocument] = useState<any>(null);
  const imageInputRef = useRef<any>(null);
  const docInputRef = useRef<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFile: (file: File) => void) => {
    if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

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

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-150">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Submit Citizen Complaint &amp; Redressal Request
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Provide incident details and photo evidence to dispatch municipal technical teams.
            </p>
          </div>
          <button
            type="button"
            onClick={onBackToDashboard}
            className="text-xs font-bold text-gray-500 hover:text-gray-800 transition-colors"
          >
            ← Back to Complaints
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1 & 2: 2-column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Details */}
            <div className="bg-stone-50/70 border border-gray-200 rounded-xl p-5 space-y-4">
              <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                <span>👤</span> Citizen Identification
              </h3>
              
              <div className="space-y-3 text-xs">
                <div>
                  <label htmlFor="fullName" className="block font-semibold text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-200 rounded-lg p-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#8C1538]"
                    placeholder="Enter full legal name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="contactNumber" className="block font-semibold text-gray-700 mb-1">
                    Contact Mobile Number *
                  </label>
                  <input
                    id="contactNumber"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-200 rounded-lg p-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#8C1538]"
                    placeholder="07X XXX XXXX"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block font-semibold text-gray-700 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-200 rounded-lg p-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#8C1538]"
                    placeholder="citizen@example.com"
                  />
                </div>
              </div>
            </div>

            {/* Complaint Meta */}
            <div className="bg-stone-50/70 border border-gray-200 rounded-xl p-5 space-y-4">
              <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                <span>📍</span> Incident Specification
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <label htmlFor="complaintType" className="block font-semibold text-gray-700 mb-1">
                    Complaint Category *
                  </label>
                  <select
                    id="complaintType"
                    name="complaintType"
                    value={formData.complaintType}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-200 rounded-lg p-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#8C1538]"
                    required
                  >
                    <option value="">Select problem category</option>
                    <option value="Water">Water Supply &amp; Drainage</option>
                    <option value="Waste">Waste Collection &amp; Garbage</option>
                    <option value="Road">Road Damage &amp; Potholes</option>
                    <option value="StreetLight">Street Lighting Failure</option>
                    <option value="Building">Building Maintenance &amp; Public Safety</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="incidentDate" className="block font-semibold text-gray-700 mb-1">
                    Incident Date Observed *
                  </label>
                  <input
                    type="date"
                    id="incidentDate"
                    name="incidentDate"
                    value={formData.incidentDate}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-200 rounded-lg p-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#8C1538]"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block font-semibold text-gray-700 mb-1">
                    Exact Location / Street Address *
                  </label>
                  <input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-200 rounded-lg p-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#8C1538]"
                    placeholder="E.g., In front of 124/2, Station Road, Homagama"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Summary & Full Narrative */}
          <div className="bg-stone-50/70 border border-gray-200 rounded-xl p-5 space-y-4">
            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
              <span>📝</span> Problem Description &amp; Evidence
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label htmlFor="complaintTitle" className="block font-semibold text-gray-700 mb-1">
                  Brief Summary / Subject *
                </label>
                <input
                  id="complaintTitle"
                  name="complaintTitle"
                  value={formData.complaintTitle}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-200 rounded-lg p-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#8C1538]"
                  placeholder="One sentence summary of the civic hazard"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block font-semibold text-gray-700 mb-1">
                  Detailed Explanation &amp; Hazard Context *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-white border border-gray-200 rounded-lg p-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#8C1538]"
                  placeholder="Describe the severity, duration, and any public hazard caused..."
                  required
                />
              </div>

              {/* Upload Dropzones */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => imageInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 hover:border-[#8C1538] rounded-xl p-4 text-center cursor-pointer transition-colors bg-white"
                >
                  <span className="text-xl block mb-1">📷</span>
                  <p className="text-xs font-bold text-gray-800">Attach Photo Evidence</p>
                  <p className="text-[10px] text-gray-400">JPG, PNG (Max 10MB)</p>
                  <input
                    type="file"
                    ref={imageInputRef}
                    hidden
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, setImage)}
                  />
                  {image && <p className="text-emerald-700 text-xs mt-2 font-bold truncate">✓ {image.name}</p>}
                </button>

                <button
                  type="button"
                  onClick={() => docInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 hover:border-[#8C1538] rounded-xl p-4 text-center cursor-pointer transition-colors bg-white"
                >
                  <span className="text-xl block mb-1">📄</span>
                  <p className="text-xs font-bold text-gray-800">Attach Document / Letter</p>
                  <p className="text-[10px] text-gray-400">PDF, DOCX (Max 10MB)</p>
                  <input
                    type="file"
                    ref={docInputRef}
                    hidden
                    accept=".pdf,.docx"
                    onChange={(e) => handleFileChange(e, setDocument)}
                  />
                  {document && <p className="text-emerald-700 text-xs mt-2 font-bold truncate">✓ {document.name}</p>}
                </button>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onBackToDashboard}
              className="border border-gray-300 hover:bg-gray-100 text-gray-700 px-5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-[#8C1538] hover:bg-[#73102d] text-white px-6 py-2.5 rounded-lg text-xs font-extrabold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <span>🚀</span>
              <span>Submit Official Complaint</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
