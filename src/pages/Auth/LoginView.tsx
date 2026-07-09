import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

const SendIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
  </svg>
);

const LoginView = () => {
  const { t } = useLanguage();
  const { login, dummyLogin, isLoading } = useAuth();
  const [loginType, setLoginType] = useState('mobile'); // 'mobile' (Login1.png) or 'detailed' (login2.png)
  const [showOtpStep, setShowOtpStep] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  // Form state
  const [formData, setFormData] = useState({
    name: 'Verified Citizen',
    nic: '199012345678',
    phone: '+94 71 234 5678',
    email: 'citizen@homagamaps.lk'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    setShowOtpStep(true);
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`login-otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    login(formData);
  };

  if (showOtpStep) {
    return (
      <div className="py-2 animate-fadeIn font-sans">
        <div className="w-12 h-12 rounded-xl bg-red-50 text-[#8C1538] flex items-center justify-center mx-auto mb-4 font-bold text-xl shadow-xs">
          📱
        </div>
        <h2 className="text-xl font-bold text-gray-900 text-center mb-1">
          Verify Your Number
        </h2>
        <p className="text-sm text-gray-500 text-center mb-4">
          A verification code has been sent to your mobile number
        </p>
        <div className="text-center mb-6">
          <span className="font-semibold text-gray-800">{formData.phone || '+94 71 234 5678'}</span>{' '}
          <button 
            type="button"
            onClick={() => setShowOtpStep(false)}
            className="text-[#8C1538] font-semibold text-sm hover:underline ml-1 cursor-pointer"
          >
            Edit
          </button>
        </div>

        <form onSubmit={handleVerifyOtp}>
          <div className="flex justify-center gap-2 sm:gap-3 mb-6">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                id={`login-otp-${idx}`}
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
            disabled={isLoading}
            className="w-full bg-[#8C1538] hover:bg-[#72112d] text-white py-3 rounded-lg font-medium shadow-sm transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
          >
            {isLoading ? 'Verifying...' : 'Verify & Continue'}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-gray-100 text-center">
          <button
            type="button"
            onClick={dummyLogin}
            className="text-xs bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1.5 rounded-full font-medium hover:bg-amber-100 transition-colors cursor-pointer inline-flex items-center gap-1.5"
          >
            <span>⚡ Test Bypass: Instant Dummy Login</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-2 animate-fadeIn font-sans">
      <h2 className="text-2xl font-bold text-gray-900 mb-1">
        {t('auth.civilianLogin', 'Civilian Login')}
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Please provide your details to receive an authentication code.
      </p>

      {/* Quick Dummy Login Banner */}
      <div className="mb-6 bg-maroon-50 border border-[#8C1538]/20 rounded-xl p-3 bg-[#8C1538]/5 flex items-center justify-between gap-3">
        <div className="text-xs text-gray-700">
          <span className="font-semibold text-[#8C1538]">{t('common.testingMode', 'Testing Mode')}:</span> {t('common.bypassOtp', 'Bypass OTP and login immediately as dummy citizen.')}
        </div>
        <button
          type="button"
          onClick={dummyLogin}
          className="bg-[#8C1538] hover:bg-[#72112d] text-white text-xs px-3 py-1.5 rounded-md font-medium shadow-xs transition-colors shrink-0 cursor-pointer"
        >
          ⚡ {t('auth.loginBtn', 'Login')}
        </button>
      </div>

      <form onSubmit={handleSendOtp} className="space-y-4">
        {loginType === 'mobile' ? (
          /* Mode 1: Mobile OTP only (Login1.png) */
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Mobile Number
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+94 7X XXX XXXX"
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:border-[#8C1538] focus:ring-1 focus:ring-[#8C1538] outline-none transition-all"
            />
            <div className="mt-2 text-right">
              <span className="text-xs text-gray-500">Want to use Email? </span>
              <button
                type="button"
                onClick={() => setLoginType('detailed')}
                className="text-xs font-bold text-gray-900 hover:text-[#8C1538] underline transition-colors cursor-pointer"
              >
                Login with Email
              </button>
            </div>
          </div>
        ) : (
          /* Mode 2: Detailed Email / Admin mode (login2.png) */
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:border-[#8C1538] focus:ring-1 focus:ring-[#8C1538] outline-none transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  National ID (NIC)
                </label>
                <input
                  type="text"
                  name="nic"
                  value={formData.nic}
                  onChange={handleInputChange}
                  placeholder="e.g. 199012345678"
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:border-[#8C1538] focus:ring-1 focus:ring-[#8C1538] outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Mobile Number
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+94 7X XXX XXXX"
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:border-[#8C1538] focus:ring-1 focus:ring-[#8C1538] outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Gmail Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="example@gmail.com"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:border-[#8C1538] focus:ring-1 focus:ring-[#8C1538] outline-none transition-all"
              />
            </div>

            <div className="mt-2 text-right">
              <span className="text-xs text-gray-500">Are you a staff member? </span>
              <button
                type="button"
                onClick={() => setLoginType('mobile')}
                className="text-xs font-bold text-[#8C1538] hover:underline transition-colors cursor-pointer"
              >
                Switch to Admin Login
              </button>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-4 bg-[#8C1538] hover:bg-[#72112d] text-white py-3 rounded-full font-medium flex items-center justify-center gap-2 shadow-sm transition-all duration-200 cursor-pointer hover:shadow-md"
        >
          <span>Send OTP</span>
          <SendIcon />
        </button>
      </form>
    </div>
  );
};

export default LoginView;
