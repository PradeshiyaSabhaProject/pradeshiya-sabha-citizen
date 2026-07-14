import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

const RightArrow = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

const LeftArrow = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
  </svg>
);

const ShieldCheck = () => (
  <svg className="w-5 h-5 text-[#8C1538] shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11.002 12.001l3.3-3.299a1 1 0 10-1.414-1.414l-2.593 2.592-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0z" clipRule="evenodd" />
  </svg>
);

const IdIcon = () => (
  <svg className="w-8 h-8 text-[#8C1538] mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
  </svg>
);

const RegisterView = ({ onCancel }) => {
  const { t } = useLanguage();
  const { login, isLoading } = useAuth();
  const [step, setStep] = useState(1);

  // Step 1 Form Data
  const [formData, setFormData] = useState({
    name: '',
    nic: '',
    phone: '',
    email: '',
    address: '',
    confirmAccurate: false,
    confirmAuth: false,
    frontFile: null,
    backFile: null
  });

  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e, side) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        [side]: e.target.files[0].name
      }));
    }
  };

  const handleStep1Submit = (e) => {
    e.preventDefault();
    if (!formData.confirmAccurate) {
      alert('Please confirm that the information is accurate.');
      return;
    }
    setStep(2);
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`reg-otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleStep2Submit = (e) => {
    e.preventDefault();
    setStep(3);
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    if (!formData.confirmAuth) {
      alert('Please authorize document verification.');
      return;
    }
    login({
      name: formData.name || 'Verified Citizen',
      nic: formData.nic || '199012345678',
      phone: formData.phone || '+94 71 234 5678',
      email: formData.email || 'citizen@homagamaps.lk',
      address: formData.address || 'Homagama, Sri Lanka',
      role: 'citizen'
    });
  };

  return (
    <div className="py-2 animate-fadeIn font-sans">
      {/* Header & Progress Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Citizen Registration
          </h2>
          <p className="text-sm text-gray-500">
            Create your digital profile for government services.
          </p>
        </div>
        <div className="text-left sm:text-right shrink-0">
          <span className="text-xs font-bold text-[#8C1538] uppercase tracking-wider block">
            STEP {step} OF 3
          </span>
          <span className="text-sm font-bold text-gray-800">
            {step === 1 ? 'Details' : step === 2 ? 'Verification' : 'Documents'}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden mb-6">
        <div 
          className="bg-[#8C1538] h-full transition-all duration-300 ease-out rounded-full"
          style={{ width: step === 1 ? '33.33%' : step === 2 ? '66.66%' : '100%' }}
        />
      </div>

      {/* STEP 1: DETAILS (civil Registration 1.png) */}
      {step === 1 && (
        <form onSubmit={handleStep1Submit} className="space-y-4 animate-fadeIn">
          {/* Blue Info Alert */}
          <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-3.5 flex items-start gap-3">
            <ShieldCheck />
            <div>
              <h4 className="font-bold text-xs text-gray-900 tracking-wide uppercase">
                IDENTITY VERIFICATION
              </h4>
              <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                Information provided will be cross-referenced with the national registry for a <span className="font-semibold underline text-[#8C1538]">Verified Citizen</span> badge.
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Full Name (as per NIC)
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full legal name"
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:border-[#8C1538] focus:ring-1 focus:ring-[#8C1538] outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                National Identity Card (NIC)
              </label>
              <input
                type="text"
                name="nic"
                value={formData.nic}
                onChange={handleInputChange}
                placeholder="e.g., 199012345678"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:border-[#8C1538] focus:ring-1 focus:ring-[#8C1538] outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="e.g., 071 234 5678"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:border-[#8C1538] focus:ring-1 focus:ring-[#8C1538] outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="example@domain.com"
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:border-[#8C1538] focus:ring-1 focus:ring-[#8C1538] outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Home Address
            </label>
            <textarea
              name="address"
              rows={3}
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Street name, City, Postal Code"
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:border-[#8C1538] focus:ring-1 focus:ring-[#8C1538] outline-none transition-all resize-none"
            />
          </div>

          <label className="flex items-start gap-3 pt-2 cursor-pointer select-none">
            <input
              type="checkbox"
              name="confirmAccurate"
              checked={formData.confirmAccurate}
              onChange={handleInputChange}
              required
              className="mt-1 w-4 h-4 rounded-sm text-[#8C1538] focus:ring-[#8C1538] border-gray-300 cursor-pointer"
            />
            <span className="text-xs text-gray-600 leading-relaxed">
              I confirm that the information provided is accurate and belongs to me. I understand that false information may lead to the rejection of future service applications.
            </span>
          </label>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onCancel}
              className="w-full sm:w-auto border border-[#8C1538] text-[#8C1538] hover:bg-maroon-50 px-8 py-2.5 rounded-lg font-medium text-sm transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto bg-[#8C1538] hover:bg-[#72112d] text-white px-8 py-2.5 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <span>Continue</span>
              <RightArrow />
            </button>
          </div>
        </form>
      )}

      {/* STEP 2: VERIFICATION (civil Registration 2.png) */}
      {step === 2 && (
        <div className="py-2 animate-fadeIn">
          <div className="w-12 h-12 rounded-xl bg-red-50 text-[#8C1538] flex items-center justify-center mx-auto mb-4 font-bold text-xl shadow-xs">
            📱
          </div>
          <h3 className="text-xl font-bold text-gray-900 text-center mb-1">
            Verify Your Number
          </h3>
          <p className="text-sm text-gray-500 text-center mb-3">
            A verification code has been sent to your mobile number
          </p>
          <div className="text-center mb-6">
            <span className="font-semibold text-gray-800">{formData.phone || '+94 71 ••• ••89'}</span>{' '}
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-[#8C1538] font-semibold text-sm hover:underline ml-1 cursor-pointer"
            >
              Edit
            </button>
          </div>

          <form onSubmit={handleStep2Submit}>
            <div className="flex justify-center gap-2 sm:gap-3 mb-6">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`reg-otp-${idx}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  className="w-11 h-12 text-center text-lg font-bold border border-gray-300 rounded-lg focus:border-[#8C1538] focus:ring-1 focus:ring-[#8C1538] outline-none transition-all shadow-2xs"
                />
              ))}
            </div>

            <div className="text-center text-sm text-gray-500 mb-6">
              Didn't receive the code? <span className="text-[#8C1538] font-medium cursor-pointer hover:underline">Resend (58s)</span>
            </div>

            <button
              type="submit"
              className="w-full bg-[#8C1538] hover:bg-[#72112d] text-white py-3 rounded-lg font-medium shadow-sm transition-all duration-200 cursor-pointer mb-6"
            >
              Verify & Continue
            </button>
          </form>

          <div className="pt-4 border-t border-gray-100 flex items-center justify-center gap-1.5 text-xs text-gray-500 mb-6">
            <span>🔒</span>
            <span>Secure 256-bit Encrypted Verification</span>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="bg-[#8C1538] hover:bg-[#72112d] text-white px-6 py-2 rounded-lg text-sm font-medium inline-flex items-center gap-2 transition-colors cursor-pointer shadow-2xs"
            >
              <LeftArrow />
              <span>Back to registration</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: DOCUMENTS (civil Registration 3.png) */}
      {step === 3 && (
        <form onSubmit={handleFinalSubmit} className="space-y-6 animate-fadeIn">
          {/* Front Side Upload */}
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center bg-gray-50 hover:bg-gray-100/80 transition-colors">
            <IdIcon />
            <h4 className="text-base font-bold text-gray-900 mb-1">Front Side</h4>
            <p className="text-xs text-gray-500 mb-4 max-w-xs mx-auto">
              Drag and drop or click to browse your National ID front side photo.
            </p>
            {formData.frontFile && (
              <div className="mb-3 inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                ✓ {formData.frontFile}
              </div>
            )}
            <div>
              <label className="inline-block border border-[#8C1538] text-[#8C1538] hover:bg-maroon-50 px-6 py-1.5 rounded-lg text-sm font-medium bg-white transition-colors cursor-pointer shadow-2xs">
                <span>Select File</span>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => handleFileChange(e, 'frontFile')}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Back Side Upload */}
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center bg-gray-50 hover:bg-gray-100/80 transition-colors">
            <IdIcon />
            <h4 className="text-base font-bold text-gray-900 mb-1">Back Side</h4>
            <p className="text-xs text-gray-500 mb-4 max-w-xs mx-auto">
              Upload the reverse side of your ID card containing barcode or address.
            </p>
            {formData.backFile && (
              <div className="mb-3 inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                ✓ {formData.backFile}
              </div>
            )}
            <div>
              <label className="inline-block border border-[#8C1538] text-[#8C1538] hover:bg-maroon-50 px-6 py-1.5 rounded-lg text-sm font-medium bg-white transition-colors cursor-pointer shadow-2xs">
                <span>Select File</span>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => handleFileChange(e, 'backFile')}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Checkbox Alert Box */}
          <div className="bg-gray-100/80 rounded-xl p-4 flex items-start gap-3">
            <input
              type="checkbox"
              name="confirmAuth"
              checked={formData.confirmAuth}
              onChange={handleInputChange}
              required
              id="confirmAuthBox"
              className="mt-0.5 w-4 h-4 rounded-sm text-[#8C1538] focus:ring-[#8C1538] border-gray-300 cursor-pointer"
            />
            <label htmlFor="confirmAuthBox" className="text-xs text-gray-700 leading-relaxed cursor-pointer select-none">
              I confirm that the uploaded documents are authentic and belong to me. I authorize Homagama Pradeshiya Sabha to verify these details against the national database.
            </label>
          </div>

          {/* Bottom Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={() => alert('Draft saved successfully! You can resume later.')}
              className="w-full sm:w-auto border border-gray-300 text-gray-700 hover:bg-gray-100 px-8 py-2.5 rounded-lg font-medium text-sm transition-colors cursor-pointer"
            >
              Save Draft
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto bg-[#8C1538] hover:bg-[#72112d] text-white px-8 py-2.5 rounded-lg font-medium text-sm transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
            >
              {isLoading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default RegisterView;
