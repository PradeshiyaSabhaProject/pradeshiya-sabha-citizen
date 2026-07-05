import React, { useState, useRef } from 'react';

export default function ComplaintForm({ onSubmit, onBackToDashboard }) {
  // State to hold form data
  const [formData, setFormData] = useState({
    citizenName: '',
    contactNumber: '',
    category: '',
    location: '',
    description: ''
  });

  // State to save the image and show a preview
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  // Function executed when normal Input Fields change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Logic to convert the selected image into Base64 format
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Sets the Base64 string for the preview
      };
      reader.readAsDataURL(file);
    }
  };

  // Triggers the Hidden Input when the drag and drop area is clicked
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // When the form is submitted
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Sends all data including the image to the main state
    onSubmit({
      ...formData,
      image: imagePreview // Image (Base64 string) or null
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6 font-sans flex justify-center items-center">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm max-w-2xl w-full p-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Submit a New Complaint</h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Row 1: Name & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-1">Citizen Name</label>
              <input
                type="text"
                name="citizenName"
                value={formData.citizenName}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:border-red-800 text-sm bg-white"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-1">Contact Number</label>
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="e.g. +94 77 123 4567"
                required
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:border-red-800 text-sm bg-white"
              />
            </div>
          </div>

          {/* Row 2: Category & Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-1">Complaint Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:border-red-800 text-sm bg-white text-gray-600"
              >
                <option value="">Select category</option>
                <option value="Building Approval">Building Approval</option>
                <option value="Waste Collection">Waste Collection</option>
                <option value="Road Damage">Road Damage</option>
                <option value="Street Lighting">Street Lighting</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-1">Location / Address</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Street name, ward, or landmark"
                required
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:border-red-800 text-sm bg-white"
              />
            </div>
          </div>

          {/* Row 3: Description */}
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1">Complaint Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Please provide detailed information about your concern..."
              rows="4"
              required
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:border-red-800 text-sm bg-white"
            />
          </div>

          {/* ---- IMAGE UPLOAD SECTION (image_1c1127.png අනුව නිමවා ඇත) ---- */}
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1">Evidence / Photos (Optional)</label>
            
            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />

            {/* Upload Area Box */}
            <div
              onClick={triggerFileInput}
              className="border-2 border-dashed border-gray-200 hover:border-red-800 rounded-xl p-6 text-center cursor-pointer transition-all bg-gray-50/50 flex flex-col items-center justify-center min-h-[140px]"
            >
              {imagePreview ? (
                // Shows a thumbnail if an image is selected
                <div className="relative group w-full max-w-[200px]">
                  <img src={imagePreview} alt="Preview" className="h-24 mx-auto rounded-lg object-cover border border-gray-200" />
                  <p className="text-[11px] text-emerald-600 mt-1 font-semibold">✓ Image Selected</p>
                  <button 
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setImagePreview(null); }}
                    className="absolute -top-2 -right-2 bg-rose-600 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center shadow-md hover:bg-rose-700"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                // Initial UI displayed when no image is selected
                <>
                  {/* Cloud Icon */}
                  <div className="text-gray-300 text-3xl mb-1">☁</div>
                  <p className="text-sm font-semibold text-slate-700">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-400 mt-0.5">PNG, JPG or PDF (max. 10MB)</p>
                </>
              )}
            </div>
          </div>

          {/* Buttons Section */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onBackToDashboard}
              className="px-5 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 font-medium text-sm transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#991b1b] hover:bg-[#7f1d1d] text-white px-5 py-2 rounded-lg font-medium text-sm transition-all shadow-sm flex items-center gap-2"
            >
              ➤ Submit Complaint
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}