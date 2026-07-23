import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { Link, useNavigate } from 'react-router-dom';

const ShieldCheckIcon = () => (
  <svg className="w-4 h-4 text-[#8C1538] fill-current shrink-0" viewBox="0 0 24 24">
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-4 h-4 stroke-current shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);




const HistoryIcon = () => (
  <svg className="w-4 h-4 stroke-current shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const SettingsIcon = () => (
  <svg className="w-4 h-4 stroke-current shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
);

const EditIcon = () => (
  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-4 h-4 text-white shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const LogoutIcon = () => (
  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

const LockIcon = () => (
  <svg className="w-4 h-4 shrink-0 text-[#8C1538]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const EyeIcon = () => (
  <svg className="w-4 h-4 shrink-0 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const EyeOffIcon = () => (
  <svg className="w-4 h-4 shrink-0 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
  </svg>
);
const Profile = () => {
  const { user, updateUser, logout } = useAuth();
  const { t, language, changeLanguage } = useLanguage();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'settings'>('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [passwordSuccessToast, setPasswordSuccessToast] = useState(false);

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setPasswordError(t('profile.pwdRequired', 'All password fields are required.'));
      return;
    }
    if (passwordData.newPassword.length < 6) {
      setPasswordError(t('profile.pwdLength', 'New password must be at least 6 characters long.'));
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError(t('profile.pwdMismatch', 'New password and confirm password do not match.'));
      return;
    }
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setPasswordSuccessToast(true);
    setTimeout(() => {
      setPasswordSuccessToast(false);
    }, 4000);
  };

  const [formData, setFormData] = useState({
    name: user?.name || 'Verified Citizen',
    nic: user?.nic || '199012345678',
    phone: user?.phone || '+94 71 234 5678',
    email: user?.email || 'citizen@homagamaps.lk',
    address: user?.address || 'No. 45, Temple Road, Homagama',
    gnDivision: user?.gnDivision || '584/A - Homagama North'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (updateUser) {
      updateUser({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        gnDivision: formData.gnDivision
      });
    }
    setIsEditing(false);
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 4000);
  };

  const handleCancelEdit = () => {
    setFormData({
      name: user?.name || 'Verified Citizen',
      nic: user?.nic || '199012345678',
      phone: user?.phone || '+94 71 234 5678',
      email: user?.email || 'citizen@homagamaps.lk',
      address: user?.address || 'No. 45, Temple Road, Homagama',
      gnDivision: user?.gnDivision || '584/A - Homagama North'
    });
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const activityTimeline = [
    {
      id: 'ACT-01',
      type: 'Application',
      title: 'Promotional Advertisement Display Permit #APP-2026-042 Submitted',
      date: '14 July 2026, 09:15 AM',
      status: 'In Progress',
      statusColor: 'bg-blue-100 text-blue-800 border-blue-200'
    },
    {
      id: 'ACT-02',
      type: 'Payment',
      title: 'Assessment Tax Q1 2026 Paid via Municipal Portal (LKR 4,850)',
      date: '12 July 2026, 02:40 PM',
      status: 'Completed',
      statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-200'
    },
    {
      id: 'ACT-03',
      type: 'Complaint',
      title: 'Citizen Grievance #CR-882 (Street Lighting Issue Resolved)',
      date: '10 July 2026, 11:30 AM',
      status: 'Resolved',
      statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-200'
    },
    {
      id: 'ACT-04',
      type: 'Letter',
      title: 'Residency Verification Letter Request #LTR-204 Submitted',
      date: '02 July 2026, 04:00 PM',
      status: 'In Review',
      statusColor: 'bg-amber-100 text-amber-800 border-amber-200'
    }
  ];

  const tabs = [
    { id: 'overview', label: t('profile.tab.overview', 'Personal Overview'), icon: <UserIcon /> },
    { id: 'history', label: t('profile.tab.history', 'Activity & Service History'), icon: <HistoryIcon /> },
    { id: 'settings', label: t('profile.tab.settings', 'Account Settings'), icon: <SettingsIcon /> },
  ];

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans animate-fadeIn">
      {(showSuccessToast || passwordSuccessToast) && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-800 text-white px-5 py-3.5 rounded-xl shadow-2xl border border-emerald-700 flex items-center gap-3 animate-slide-in">
          <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center shrink-0">
            <CheckIcon />
          </div>
          <span className="font-medium text-sm">
            {passwordSuccessToast
              ? 'Password updated successfully!'
              : t('profile.updateSuccess', 'Profile information updated successfully!')}
          </span>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-4 border-b border-gray-100">
        <div className="space-y-2 max-w-2xl">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            {t('profile.title', 'Citizen Profile & Digital Identity')}
          </h1>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            {t('profile.subtitle', 'Manage your personal information and review your activity history.')}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {!isEditing && activeTab === 'overview' && (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="bg-[#8C1538] hover:bg-[#73102d] text-white px-5 py-2.5 rounded-md font-semibold text-sm shadow-xs transition-all duration-200 cursor-pointer hover:shadow-sm flex items-center gap-2"
            >
              <EditIcon />
              <span>{t('profile.editBtn', 'Edit Profile Information')}</span>
            </button>
          )}
          <button
            type="button"
            onClick={handleLogout}
            className="bg-white border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 px-5 py-2.5 rounded-md font-semibold text-sm transition-all duration-200 cursor-pointer shadow-2xs hover:bg-gray-50 flex items-center gap-2"
          >
            <LogoutIcon />
            <span>{t('common.logout', 'Sign Out')}</span>
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              setActiveTab(tab.id as any);
              setIsEditing(false);
            }}
            className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
              activeTab === tab.id
                ? 'bg-[#8C1538] text-white shadow-xs scale-[1.02]'
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div>
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-fadeIn">
            {isEditing ? (
              <div className="bg-white rounded-xl border border-gray-200 shadow-xs p-6 sm:p-8">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Update Citizen Profile Details</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Modify your contact details and residential address below.</p>
                  </div>
                </div>

                <form onSubmit={handleSaveProfile} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                        {t('profile.fullName', 'Full Name')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white border border-gray-300 rounded-md px-3.5 py-2.5 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#8C1538]/20 focus:border-[#8C1538] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                        {t('profile.nic', 'National Identity Card (NIC)')}
                      </label>
                      <input
                        type="text"
                        name="nic"
                        value={formData.nic}
                        disabled
                        className="w-full bg-gray-100 border border-gray-200 rounded-md px-3.5 py-2.5 text-sm font-mono font-bold text-gray-500 cursor-not-allowed"
                        title="NIC cannot be modified directly."
                      />
                      <p className="text-[11px] text-gray-500 mt-1">NIC is linked to your digital identity records.</p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                        {t('profile.phone', 'Mobile Phone Number')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white border border-gray-300 rounded-md px-3.5 py-2.5 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#8C1538]/20 focus:border-[#8C1538] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                        {t('profile.email', 'Email Address')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white border border-gray-300 rounded-md px-3.5 py-2.5 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#8C1538]/20 focus:border-[#8C1538] transition-all"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                        {t('profile.address', 'Residential Address')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white border border-gray-300 rounded-md px-3.5 py-2.5 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#8C1538]/20 focus:border-[#8C1538] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                        {t('profile.gnDivision', 'Grama Niladhari Division')}
                      </label>
                      <input
                        type="text"
                        name="gnDivision"
                        value={formData.gnDivision}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-gray-300 rounded-md px-3.5 py-2.5 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#8C1538]/20 focus:border-[#8C1538] transition-all"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="bg-white border border-gray-300 hover:border-gray-400 text-gray-700 px-5 py-2.5 rounded-md font-semibold text-sm transition-all duration-200 cursor-pointer shadow-2xs hover:bg-gray-50"
                    >
                      {t('profile.cancelBtn', 'Cancel')}
                    </button>
                    <button
                      type="submit"
                      className="bg-[#8C1538] hover:bg-[#73102d] text-white px-5 py-2.5 rounded-md font-semibold text-sm shadow-xs transition-all duration-200 cursor-pointer hover:shadow-sm flex items-center gap-2"
                    >
                      <CheckIcon />
                      <span>{t('profile.saveBtn', 'Save Changes')}</span>
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              /* Citizen Profile Details Card */
              <div className="bg-white rounded-xl border border-gray-200 shadow-xs p-6 sm:p-8">
                {/* Profile Header Block */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-gray-100 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-[#8C1538]/10 border border-[#8C1538]/20 flex items-center justify-center text-3xl sm:text-4xl font-black text-[#8C1538] shrink-0">
                      {(formData.name || 'C').charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-md text-xs font-bold inline-flex items-center gap-1">
                          <ShieldCheckIcon />
                          <span>{t('profile.verifiedStatus', 'Verified Citizen')}</span>
                        </span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                        {formData.name}
                      </h2>
                      <p className="text-xs text-gray-500 font-medium mt-0.5">
                        GN Division: {formData.gnDivision} • Official Demographic Registry Record
                      </p>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 bg-gray-50 sm:bg-transparent p-3 sm:p-0 rounded-lg">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Identity Status</span>
                    <span className="text-sm font-bold text-emerald-600 flex items-center gap-1">
                      <span>● Active & Biometric Linked</span>
                    </span>
                  </div>
                </div>

                {/* Information Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50/80 p-4 rounded-xl border border-gray-150/80">
                    <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                      {t('profile.fullName', 'Full Name')}
                    </div>
                    <div className="text-sm font-bold text-gray-900">
                      {formData.name}
                    </div>
                  </div>

                  <div className="bg-gray-50/80 p-4 rounded-xl border border-gray-150/80">
                    <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                      {t('profile.nic', 'National Identity Card (NIC)')}
                    </div>
                    <div className="text-sm font-mono font-bold text-[#8C1538]">
                      {formData.nic}
                    </div>
                  </div>

                  <div className="bg-gray-50/80 p-4 rounded-xl border border-gray-150/80">
                    <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                      {t('profile.phone', 'Mobile Phone Number')}
                    </div>
                    <div className="text-sm font-semibold text-gray-900">
                      {formData.phone}
                    </div>
                  </div>

                  <div className="bg-gray-50/80 p-4 rounded-xl border border-gray-150/80">
                    <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                      {t('profile.email', 'Email Address')}
                    </div>
                    <div className="text-sm font-semibold text-gray-900">
                      {formData.email}
                    </div>
                  </div>

                  <div className="md:col-span-2 bg-gray-50/80 p-4 rounded-xl border border-gray-150/80">
                    <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                      {t('profile.address', 'Residential Address')}
                    </div>
                    <div className="text-sm font-semibold text-gray-900">
                      {formData.address}
                    </div>
                  </div>

                  <div className="bg-gray-50/80 p-4 rounded-xl border border-gray-150/80">
                    <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                      {t('profile.gnDivision', 'Grama Niladhari Division')}
                    </div>
                    <div className="text-sm font-bold text-gray-900">
                      {formData.gnDivision}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: ACTIVITY TIMELINE */}
        {activeTab === 'history' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white rounded-xl border border-gray-200 shadow-xs p-6 sm:p-8">
              <div className="pb-6 border-b border-gray-100 mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {t('profile.historyTitle', 'Municipal Activity Timeline')}
                </h3>
                <p className="text-xs text-gray-500">
                  {t('profile.historySub', 'Recent applications, bill payments, and complaint reports associated with your profile.')}
                </p>
              </div>

              <div className="relative pl-6 border-l-2 border-[#8C1538]/30 space-y-6 my-4">
                {activityTimeline.map((item) => (
                  <div key={item.id} className="relative group">
                    <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-[#8C1538] group-hover:scale-125 transition-transform"></div>

                    <div className="bg-white rounded-xl p-5 border border-gray-200 hover:border-[#8C1538]/30 hover:shadow-xs transition-all">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-[#8C1538] bg-[#8C1538]/10 px-2.5 py-0.5 rounded-md">
                            {item.type}
                          </span>
                          <span className="text-xs text-gray-400 font-medium">{item.date}</span>
                        </div>
                        <span className={`text-xs font-bold px-3 py-0.5 rounded-full border ${item.statusColor} self-start sm:self-center`}>
                          {item.status}
                        </span>
                      </div>

                      <h4 className="text-sm sm:text-base font-bold text-gray-900">{item.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: ACCOUNT SETTINGS */}
        {activeTab === 'settings' && (
          <div className="space-y-6 animate-fadeIn max-w-3xl">
            <div className="bg-white rounded-xl border border-gray-200 shadow-xs p-6 sm:p-8 space-y-8">
              <div className="pb-4 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {t('profile.tab.settings', 'Account Settings')}
                </h3>
                <p className="text-xs text-gray-500">
                  Manage your portal language preferences, communication alerts, and account session security.
                </p>
              </div>

              {/* Language Preference Section */}
              <div className="space-y-3">
                <div className="text-sm font-bold text-gray-900">Portal Language Preference</div>
                <p className="text-xs text-gray-600">
                  Choose your default language for civic portal notices, receipts, and navigation.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => changeLanguage('en')}
                    className={`py-2.5 px-3 rounded-md font-bold text-xs border transition-all cursor-pointer ${
                      language === 'en'
                        ? 'bg-[#8C1538] text-white border-[#8C1538] shadow-xs'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    English
                  </button>
                  <button
                    type="button"
                    onClick={() => changeLanguage('si')}
                    className={`py-2.5 px-3 rounded-md font-bold text-xs border transition-all cursor-pointer ${
                      language === 'si'
                        ? 'bg-[#8C1538] text-white border-[#8C1538] shadow-xs'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    සිංහල (Sinhala)
                  </button>
                  <button
                    type="button"
                    onClick={() => changeLanguage('ta')}
                    className={`py-2.5 px-3 rounded-md font-bold text-xs border transition-all cursor-pointer ${
                      language === 'ta'
                        ? 'bg-[#8C1538] text-white border-[#8C1538] shadow-xs'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    தமிழ் (Tamil)
                  </button>
                </div>
              </div>

              {/* Notifications Preferences */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <div className="text-sm font-bold text-gray-900">Communication & Alert Preferences</div>

                <div className="space-y-3">
                  <label className="flex items-center justify-between cursor-pointer">
                    <div>
                      <div className="text-xs font-bold text-gray-800">SMS Alerts for Garbage & Schedule Delays</div>
                      <div className="text-[11px] text-gray-500">Receive instant SMS if route schedules change in your area ({formData.gnDivision}).</div>
                    </div>
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-[#8C1538] rounded focus:ring-[#8C1538]" />
                  </label>

                  <label className="flex items-center justify-between cursor-pointer pt-3 border-t border-gray-100">
                    <div>
                      <div className="text-xs font-bold text-gray-800">WhatsApp Application Status Updates</div>
                      <div className="text-[11px] text-gray-500">Receive permit and inquiry status directly via WhatsApp on {formData.phone}.</div>
                    </div>
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-[#8C1538] rounded focus:ring-[#8C1538]" />
                  </label>

                  <label className="flex items-center justify-between cursor-pointer pt-3 border-t border-gray-100">
                    <div>
                      <div className="text-xs font-bold text-gray-800">Email Tax Assessment & Payment Receipts</div>
                      <div className="text-[11px] text-gray-500">Automatically send official PDF receipts to {formData.email}.</div>
                    </div>
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-[#8C1538] rounded focus:ring-[#8C1538]" />
                  </label>
                </div>
              </div>

              {/* Security & Password Management Section */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-gray-900 flex items-center gap-2">
                      <LockIcon />
                      <span>Security & Password Management</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Update your account password regularly to ensure your personal civic portal stays secure.
                    </p>
                  </div>
                </div>

                <form onSubmit={handlePasswordSubmit} className="bg-gray-50/80 p-5 rounded-xl border border-gray-200 space-y-4">
                  {passwordError && (
                    <div className="bg-red-50 text-red-700 border border-red-200 px-3.5 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2">
                      <span>⚠️</span>
                      <span>{passwordError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                        Current Password <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="currentPassword"
                          value={passwordData.currentPassword}
                          onChange={handlePasswordChange}
                          placeholder="••••••••"
                          className="w-full bg-white border border-gray-300 rounded-md px-3.5 py-2 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#8C1538]/20 focus:border-[#8C1538] transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                        New Password <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="newPassword"
                          value={passwordData.newPassword}
                          onChange={handlePasswordChange}
                          placeholder="At least 6 chars"
                          className="w-full bg-white border border-gray-300 rounded-md px-3.5 py-2 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#8C1538]/20 focus:border-[#8C1538] transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                        Confirm New Password <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          value={passwordData.confirmPassword}
                          onChange={handlePasswordChange}
                          placeholder="Re-enter password"
                          className="w-full bg-white border border-gray-300 rounded-md px-3.5 py-2 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#8C1538]/20 focus:border-[#8C1538] transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-200/60">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-xs font-semibold text-gray-600 hover:text-gray-900 flex items-center gap-1.5 cursor-pointer select-none"
                    >
                      {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                      <span>{showPassword ? 'Hide Passwords' : 'Show Passwords'}</span>
                    </button>

                    <button
                      type="submit"
                      className="bg-[#8C1538] hover:bg-[#73102d] text-white px-4 py-2 rounded-md font-semibold text-xs shadow-xs transition-all duration-200 cursor-pointer hover:shadow-sm flex items-center gap-1.5"
                    >
                      <CheckIcon />
                      <span>Update Password</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Logout / Switch Account Zone */}
              <div className="bg-red-50/70 rounded-xl p-5 border border-red-200/80 space-y-3 pt-4">
                <div className="text-sm font-bold text-red-900 flex items-center gap-2">
                  <LogoutIcon />
                  <span>{t('profile.logoutConfirm', 'Sign Out from Portal')}</span>
                </div>
                <p className="text-xs text-red-700">
                  {t('profile.logoutDesc', 'You will be logged out of your citizen account on this device. You can log back in anytime using your NIC or Mobile number.')}
                </p>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="px-5 py-2.5 rounded-md bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center gap-2"
                  >
                    <LogoutIcon />
                    <span>Sign Out / Switch Account</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
