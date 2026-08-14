import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

const SendIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
  </svg>
);

const LockIcon = () => (
  <svg className="w-5 h-5 text-[#8C1538]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const EyeIcon = () => (
  <svg className="w-4 h-4 text-gray-400 hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const EyeOffIcon = () => (
  <svg className="w-4 h-4 text-gray-400 hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
  </svg>
);

const LoginView = () => {
  const { t } = useLanguage();
  const { login, dummyLogin, isLoading } = useAuth();
  const [loginType, setLoginType] = useState('mobile'); // 'mobile' (Login1.png) or 'detailed' (login2.png)
  const [showOtpStep, setShowOtpStep] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotStep, setForgotStep] = useState<'request' | 'verify' | 'reset' | 'success'>('request');
  const [forgotIdentifier, setForgotIdentifier] = useState('+94 71 234 5678');
  const [forgotOtp, setForgotOtp] = useState(['', '', '', '', '', '']);
  const [forgotPasswordData, setForgotPasswordData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [forgotError, setForgotError] = useState('');
  const [showForgotPwd, setShowForgotPwd] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: 'Verified Citizen',
    nic: '199012345678',
    phone: '+94 71 234 5678',
    email: 'citizen@homagamaps.lk',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (formData.password && formData.password.trim().length >= 4) {
      login(formData);
    } else {
      setShowOtpStep(true);
    }
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

  if (showForgotPassword) {
    return (
      <div className="py-2 animate-fadeIn font-sans">
        {forgotStep === 'request' && (
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 border border-amber-200/60 flex items-center justify-center mx-auto mb-3 font-bold text-xl shadow-xs">
              🔑
            </div>
            <h2 className="text-xl font-bold text-gray-900 text-center mb-1">
              Forgot Your Password?
            </h2>
            <p className="text-sm text-gray-500 text-center mb-6">
              Enter your registered Mobile Number, NIC, or Email. We will send a verification code to reset your account credentials.
            </p>

            <form onSubmit={(e) => {
              e.preventDefault();
              if (!forgotIdentifier.trim()) {
                setForgotError('Please enter your registered contact detail.');
                return;
              }
              setForgotError('');
              setForgotStep('verify');
            }} className="space-y-4">
              {forgotError && (
                <div className="bg-red-50 text-red-700 border border-red-200 px-3.5 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2">
                  <span>⚠️</span>
                  <span>{forgotError}</span>
                </div>
              )}

              <div>
                <label htmlFor="forgot-identifier" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Registered Mobile / NIC / Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="forgot-identifier"
                  type="text"
                  value={forgotIdentifier}
                  onChange={(e) => {
                    setForgotIdentifier(e.target.value);
                    if (forgotError) setForgotError('');
                  }}
                  placeholder="+94 7X XXX XXXX or NIC"
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:border-[#8C1538] focus:ring-1 focus:ring-[#8C1538] outline-none transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#8C1538] hover:bg-[#72112d] text-white py-3 rounded-full font-medium shadow-sm transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Send Reset Code</span>
                <SendIcon />
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-gray-100 text-center">
              <button
                type="button"
                onClick={() => {
                  setShowForgotPassword(false);
                  setForgotStep('request');
                  setForgotError('');
                }}
                className="text-xs font-bold text-gray-600 hover:text-gray-900 transition-colors cursor-pointer inline-flex items-center gap-1"
              >
                <span>← Back to Civilian Login</span>
              </button>
            </div>
          </div>
        )}

        {forgotStep === 'verify' && (
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 border border-blue-200/60 flex items-center justify-center mx-auto mb-3 font-bold text-xl shadow-xs">
              🛡️
            </div>
            <h2 className="text-xl font-bold text-gray-900 text-center mb-1">
              Verify Reset Code
            </h2>
            <p className="text-sm text-gray-500 text-center mb-4">
              Enter the 6-digit verification code sent to <span className="font-semibold text-gray-800">{forgotIdentifier}</span>
            </p>

            <form onSubmit={(e) => {
              e.preventDefault();
              setForgotError('');
              setForgotStep('reset');
            }}>
              <div className="flex justify-center gap-2 sm:gap-3 mb-6">
                {forgotOtp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`forgot-otp-${idx}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val.length > 1) return;
                      const newOtp = [...forgotOtp];
                      newOtp[idx] = val;
                      setForgotOtp(newOtp);
                      if (val && idx < 5) {
                        const next = document.getElementById(`forgot-otp-${idx + 1}`);
                        if (next) next.focus();
                      }
                    }}
                    className="w-11 h-12 text-center text-lg font-bold border border-gray-300 rounded-lg focus:border-[#8C1538] focus:ring-1 focus:ring-[#8C1538] outline-none transition-all shadow-2xs"
                  />
                ))}
              </div>

              <div className="text-center text-sm text-gray-500 mb-6">
                Didn't receive code? <span className="text-[#8C1538] font-medium cursor-pointer hover:underline">Resend OTP (45s)</span>
              </div>

              <button
                type="submit"
                className="w-full bg-[#8C1538] hover:bg-[#72112d] text-white py-3 rounded-full font-medium shadow-sm transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Verify & Continue</span>
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-gray-100 text-center">
              <button
                type="button"
                onClick={() => setForgotStep('request')}
                className="text-xs font-bold text-gray-600 hover:text-gray-900 transition-colors cursor-pointer inline-flex items-center gap-1"
              >
                <span>← Change Identifier</span>
              </button>
            </div>
          </div>
        )}

        {forgotStep === 'reset' && (
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200/60 flex items-center justify-center mx-auto mb-3 font-bold text-xl shadow-xs">
              🔒
            </div>
            <h2 className="text-xl font-bold text-gray-900 text-center mb-1">
              Create New Password
            </h2>
            <p className="text-sm text-gray-500 text-center mb-6">
              Your identity has been verified. Choose a strong new password for your citizen account.
            </p>

            <form onSubmit={(e) => {
              e.preventDefault();
              if (!forgotPasswordData.newPassword || !forgotPasswordData.confirmPassword) {
                setForgotError('Please fill in both password fields.');
                return;
              }
              if (forgotPasswordData.newPassword.length < 6) {
                setForgotError('Password must be at least 6 characters long.');
                return;
              }
              if (forgotPasswordData.newPassword !== forgotPasswordData.confirmPassword) {
                setForgotError('New password and confirm password do not match.');
                return;
              }
              setForgotError('');
              setForgotStep('success');
            }} className="space-y-4">
              {forgotError && (
                <div className="bg-red-50 text-red-700 border border-red-200 px-3.5 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2">
                  <span>⚠️</span>
                  <span>{forgotError}</span>
                </div>
              )}

              <div>
                <label htmlFor="forgot-new-password" className="block text-sm font-medium text-gray-700 mb-1.5">
                  New Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="forgot-new-password"
                    type={showForgotPwd ? 'text' : 'password'}
                    value={forgotPasswordData.newPassword}
                    onChange={(e) => {
                      setForgotPasswordData(prev => ({ ...prev, newPassword: e.target.value }));
                      if (forgotError) setForgotError('');
                    }}
                    placeholder="At least 6 characters"
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:border-[#8C1538] focus:ring-1 focus:ring-[#8C1538] outline-none transition-all pr-10"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="forgot-confirm-password" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Confirm New Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="forgot-confirm-password"
                    type={showForgotPwd ? 'text' : 'password'}
                    value={forgotPasswordData.confirmPassword}
                    onChange={(e) => {
                      setForgotPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }));
                      if (forgotError) setForgotError('');
                    }}
                    placeholder="Re-enter new password"
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:border-[#8C1538] focus:ring-1 focus:ring-[#8C1538] outline-none transition-all pr-10"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between py-1">
                <button
                  type="button"
                  onClick={() => setShowForgotPwd(!showForgotPwd)}
                  className="text-xs text-gray-600 hover:text-gray-900 font-medium flex items-center gap-1.5 cursor-pointer select-none"
                >
                  {showForgotPwd ? <EyeOffIcon /> : <EyeIcon />}
                  <span>{showForgotPwd ? 'Hide Passwords' : 'Show Passwords'}</span>
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-[#8C1538] hover:bg-[#72112d] text-white py-3 rounded-full font-medium shadow-sm transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Update Password</span>
              </button>
            </form>
          </div>
        )}

        {forgotStep === 'success' && (
          <div className="py-6 animate-fadeIn font-sans text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300/60 flex items-center justify-center mx-auto font-bold text-3xl shadow-md">
              ✓
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Password Reset Successful!
            </h2>
            <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
              Your portal password has been updated securely. You can now use your new credentials to sign into the Homagama Pradeshiya Sabha portal.
            </p>

            <div className="pt-4">
              <button
                type="button"
                onClick={() => {
                  setShowForgotPassword(false);
                  setForgotStep('request');
                  setForgotError('');
                  setForgotPasswordData({ newPassword: '', confirmPassword: '' });
                }}
                className="w-full bg-[#8C1538] hover:bg-[#72112d] text-white py-3 rounded-full font-semibold shadow-md transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Sign In with New Password</span>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

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
          <div className="space-y-4">
            <div>
              <label htmlFor="login-mobile-phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                Mobile Number
              </label>
              <input
                id="login-mobile-phone"
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+94 7X XXX XXXX"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:border-[#8C1538] focus:ring-1 focus:ring-[#8C1538] outline-none transition-all"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="login-mobile-password" className="block text-sm font-medium text-gray-700">
                  Password <span className="text-xs font-normal text-gray-400">(Optional if using OTP)</span>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotPassword(true);
                    setForgotStep('request');
                    setForgotError('');
                  }}
                  className="text-xs font-semibold text-[#8C1538] hover:underline cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <input
                  id="login-mobile-password"
                  type={showLoginPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:border-[#8C1538] focus:ring-1 focus:ring-[#8C1538] outline-none transition-all pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showLoginPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

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
              <label htmlFor="login-full-name" className="block text-sm font-medium text-gray-700 mb-1.5">
                Full Name
              </label>
              <input
                id="login-full-name"
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
                <label htmlFor="login-nic" className="block text-sm font-medium text-gray-700 mb-1.5">
                  National ID (NIC)
                </label>
                <input
                  id="login-nic"
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
                <label htmlFor="login-phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Mobile Number
                </label>
                <input
                  id="login-phone"
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
              <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-1.5">
                Gmail Address
              </label>
              <input
                id="login-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="example@gmail.com"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:border-[#8C1538] focus:ring-1 focus:ring-[#8C1538] outline-none transition-all"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="login-password" className="block text-sm font-medium text-gray-700">
                  Password <span className="text-xs font-normal text-gray-400">(Optional if using OTP)</span>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotPassword(true);
                    setForgotStep('request');
                    setForgotError('');
                  }}
                  className="text-xs font-semibold text-[#8C1538] hover:underline cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <input
                  id="login-password"
                  type={showLoginPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:border-[#8C1538] focus:ring-1 focus:ring-[#8C1538] outline-none transition-all pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showLoginPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
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
          <span>{formData.password && formData.password.trim().length >= 4 ? 'Login with Password' : 'Send OTP'}</span>
          <SendIcon />
        </button>
      </form>
    </div>
  );
};

export default LoginView;
