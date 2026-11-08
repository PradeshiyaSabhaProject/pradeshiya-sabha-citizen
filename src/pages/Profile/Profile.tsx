import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

// Crisp inline SVG Icons
const ShieldCheckIcon = () => (
  <svg className="w-4 h-4 text-emerald-600 fill-current shrink-0" viewBox="0 0 24 24">
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const HomeBuildingIcon = () => (
  <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const SettingsIcon = () => (
  <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

const CreditCardIcon = () => (
  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
    <line x1="1" y1="10" x2="23" y2="10"></line>
  </svg>
);

const QrCodeIcon = () => (
  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
  </svg>
);

const CloseIcon = () => (
  <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

// Property Data Interface
interface Property {
  id: string;
  assessmentNo: string;
  title: string;
  propertyType: 'Residential' | 'Commercial' | 'Agricultural';
  propertyTypeSinhala: string;
  address: string;
  gnDivision: string;
  ward: string;
  landExtent: string;
  builtArea: string;
  deedNo: string;
  cadastralPlanNo: string;
  annualValuation: number;
  taxRatePercent: number;
  annualTax: number;
  quarterlyTax: number;
  currentQuarterStatus: 'due' | 'paid';
  dueQuarter: string;
  dueAmount: number;
  dueDate: string;
  lastPaymentDate?: string;
  lastReceiptNo?: string;
  quarters: {
    q: string;
    period: string;
    amount: number;
    status: 'paid' | 'due' | 'upcoming';
    receiptNo?: string;
    paidDate?: string;
  }[];
}

const INITIAL_PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    assessmentNo: 'HPS/WAR/2026/0482',
    title: 'Primary Residence - Pitipana South',
    propertyType: 'Residential',
    propertyTypeSinhala: 'නේවාසික දේපළ',
    address: 'No. 45, Temple Road, Pitipana, Homagama',
    gnDivision: '584/A - Homagama North',
    ward: 'Ward 04 - Pitipana',
    landExtent: '15.5 Perches',
    builtArea: '1,850 sq.ft (Single Storey House)',
    deedNo: 'DEED-4912/2014 (Homagama Land Registry)',
    cadastralPlanNo: 'Plan No. 1823/2012 by Lic. Surveyor M. Dias',
    annualValuation: 180000,
    taxRatePercent: 6.0,
    annualTax: 10800,
    quarterlyTax: 2700,
    currentQuarterStatus: 'due',
    dueQuarter: 'Q2 2026 (April - June)',
    dueAmount: 2700,
    dueDate: '30 June 2026',
    lastPaymentDate: '12 January 2026',
    lastReceiptNo: 'HPS-WAR-2026-0814',
    quarters: [
      { q: 'Q1 2026', period: 'Jan - Mar', amount: 2700, status: 'paid', receiptNo: 'HPS-WAR-2026-0814', paidDate: '12 Jan 2026' },
      { q: 'Q2 2026', period: 'Apr - Jun', amount: 2700, status: 'due' },
      { q: 'Q3 2026', period: 'Jul - Sep', amount: 2700, status: 'upcoming' },
      { q: 'Q4 2026', period: 'Oct - Dec', amount: 2700, status: 'upcoming' }
    ]
  },
  {
    id: 'prop-2',
    assessmentNo: 'HPS/WAR/2026/1190',
    title: 'Commercial Annex & Retail Shop',
    propertyType: 'Commercial',
    propertyTypeSinhala: 'වාණිජ ගොඩනැගිල්ල',
    address: 'No. 112/B, High Level Road, Makumbura, Homagama',
    gnDivision: '586 - Makumbura',
    ward: 'Ward 02 - Homagama East',
    landExtent: '8.0 Perches',
    builtArea: '1,200 sq.ft (Ground Floor Commercial)',
    deedNo: 'DEED-7740/2019 (Homagama Land Registry)',
    cadastralPlanNo: 'Plan No. 941/2018 by Lic. Surveyor K. Bandara',
    annualValuation: 220000,
    taxRatePercent: 9.0,
    annualTax: 19800,
    quarterlyTax: 4950,
    currentQuarterStatus: 'paid',
    dueQuarter: 'Q3 2026 (July - September)',
    dueAmount: 0,
    dueDate: '30 September 2026',
    lastPaymentDate: '10 April 2026',
    lastReceiptNo: 'HPS-WAR-2026-90412',
    quarters: [
      { q: 'Q1 2026', period: 'Jan - Mar', amount: 4950, status: 'paid', receiptNo: 'HPS-WAR-2026-3301', paidDate: '14 Jan 2026' },
      { q: 'Q2 2026', period: 'Apr - Jun', amount: 4950, status: 'paid', receiptNo: 'HPS-WAR-2026-90412', paidDate: '10 Apr 2026' },
      { q: 'Q3 2026', period: 'Jul - Sep', amount: 4950, status: 'upcoming' },
      { q: 'Q4 2026', period: 'Oct - Dec', amount: 4950, status: 'upcoming' }
    ]
  },
  {
    id: 'prop-3',
    assessmentNo: 'HPS/WAR/2026/2045',
    title: 'Agricultural Land & Coconut Garden',
    propertyType: 'Agricultural',
    propertyTypeSinhala: 'කෘෂිකාර්මික / නිදහස් ඉඩම',
    address: 'Lot 4, Godagama Road, Meegoda, Homagama',
    gnDivision: '591 - Meegoda West',
    ward: 'Ward 08 - Meegoda',
    landExtent: '40.0 Perches (0.25 Acres)',
    builtArea: 'Agricultural Bare Land / Boundary Wall',
    deedNo: 'DEED-2189/2008 (Homagama Land Registry)',
    cadastralPlanNo: 'Plan No. 440/2007 by Lic. Surveyor S. Wickrama',
    annualValuation: 40000,
    taxRatePercent: 4.0,
    annualTax: 1600,
    quarterlyTax: 400,
    currentQuarterStatus: 'paid',
    dueQuarter: 'Annual 2026 Paid in Advance',
    dueAmount: 0,
    dueDate: 'Paid in Advance (10% Discount applied)',
    lastPaymentDate: '15 January 2026',
    lastReceiptNo: 'HPS-WAR-2026-10294',
    quarters: [
      { q: 'Q1 2026', period: 'Jan - Mar', amount: 400, status: 'paid', receiptNo: 'HPS-WAR-2026-10294', paidDate: '15 Jan 2026' },
      { q: 'Q2 2026', period: 'Apr - Jun', amount: 400, status: 'paid', receiptNo: 'HPS-WAR-2026-10294', paidDate: '15 Jan 2026' },
      { q: 'Q3 2026', period: 'Jul - Sep', amount: 400, status: 'paid', receiptNo: 'HPS-WAR-2026-10294', paidDate: '15 Jan 2026' },
      { q: 'Q4 2026', period: 'Oct - Dec', amount: 400, status: 'paid', receiptNo: 'HPS-WAR-2026-10294', paidDate: '15 Jan 2026' }
    ]
  }
];

const Profile: React.FC = () => {
  const { user, updateUser, logout } = useAuth();
  const { t, language, changeLanguage } = useLanguage();
  const navigate = useNavigate();

  // Sidebar navigation state: 'my-profile' | 'my-properties' | 'settings'
  const [activeTab, setActiveTab] = useState<'my-profile' | 'my-properties' | 'settings'>('my-profile');

  // Personal details state
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const [formData, setFormData] = useState({
    name: user?.name || 'K. A. D. Sandun Perera',
    nic: user?.nic || '199012345678',
    phone: user?.phone || '+94 71 234 5678',
    email: user?.email || 'sandun.perera@homagamaps.lk',
    address: user?.address || 'No. 45, Temple Road, Pitipana, Homagama',
    gnDivision: user?.gnDivision || '584/A - Homagama North',
    ward: 'Ward 04 - Pitipana'
  });

  // Properties State
  const [properties, setProperties] = useState<Property[]>(INITIAL_PROPERTIES);
  const [selectedPropertyForModal, setSelectedPropertyForModal] = useState<Property | null>(null);

  // Waripanam Payment Modal State
  const [payingProperty, setPayingProperty] = useState<Property | null>(null);
  const [paymentOption, setPaymentOption] = useState<'quarter' | 'annual'>('quarter');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'lankaqr' | 'bank'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccessReceipt, setPaymentSuccessReceipt] = useState<any>(null);

  // Settings State
  const [passwordSuccessToast, setPasswordSuccessToast] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isVerifyingPasswordOtp, setIsVerifyingPasswordOtp] = useState(false);
  const [passwordOtpCode, setPasswordOtpCode] = useState('');
  const [passwordOtpError, setPasswordOtpError] = useState('');

  // Handle personal profile edit
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
    triggerToast(t('profile.updateSuccess', 'Profile personal details updated successfully!'));
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 4000);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Open Waripanam payment modal
  const handleOpenPayment = (property: Property) => {
    setPayingProperty(property);
    setPaymentOption('quarter');
    setPaymentMethod('card');
    setCardNumber('4532 •••• •••• 8819');
    setCardExpiry('08/28');
    setCardCvv('912');
    setPaymentSuccessReceipt(null);
  };

  // Process Waripanam payment
  const handleExecutePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!payingProperty) return;

    setIsProcessingPayment(true);

    setTimeout(() => {
      const isAnnual = paymentOption === 'annual';
      const rawAmount = isAnnual ? (payingProperty.quarterlyTax * 3) : payingProperty.dueAmount || payingProperty.quarterlyTax;
      // 5% discount for advance prompt settlement
      const finalAmount = isAnnual ? Math.round(rawAmount * 0.95) : rawAmount;
      const receiptNo = `HPS-WAR-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
      const paidDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

      // Update property in local state
      setProperties(prev => prev.map(p => {
        if (p.id === payingProperty.id) {
          const updatedQuarters = p.quarters.map(q => {
            if (isAnnual || q.q === 'Q2 2026') {
              return { ...q, status: 'paid' as const, receiptNo, paidDate };
            }
            return q;
          });
          return {
            ...p,
            currentQuarterStatus: 'paid' as const,
            dueAmount: 0,
            dueQuarter: isAnnual ? 'Settled for 2026' : 'Q3 2026 (Upcoming)',
            lastPaymentDate: paidDate,
            lastReceiptNo: receiptNo,
            quarters: updatedQuarters
          };
        }
        return p;
      }));

      // Generate receipt
      setPaymentSuccessReceipt({
        receiptNo,
        assessmentNo: payingProperty.assessmentNo,
        propertyTitle: payingProperty.title,
        propertyAddress: payingProperty.address,
        citizenName: formData.name,
        nic: formData.nic,
        paymentDate: paidDate,
        amount: finalAmount,
        discountApplied: isAnnual ? Math.round(rawAmount * 0.05) : 0,
        period: isAnnual ? 'Remaining Quarters (Q2, Q3, Q4 2026) - Annual Advance' : 'Q2 2026 Waripanam (Assessment Tax)',
        paymentMethod: paymentMethod === 'card' ? 'Online Debit/Credit Card (Visa/Master)' : paymentMethod === 'lankaqr' ? 'LankaQR National Digital Payment' : 'Direct Council Bank Transfer',
        councilName: 'Homagama Pradeshiya Sabha - Revenue & Assessment Division'
      });

      setIsProcessingPayment(false);
      triggerToast(`Waripanam payment of LKR ${finalAmount.toLocaleString()} completed successfully!`);
    }, 1200);
  };

  // Password submission in settings
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setPasswordError('All password fields are required.');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters long.');
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('New password and confirm password do not match.');
      return;
    }

    setPasswordOtpError('');
    setPasswordOtpCode('');
    setIsVerifyingPasswordOtp(true);
  };

  const handleConfirmPasswordOtp = () => {
    if (passwordOtpCode.trim().length < 6) {
      setPasswordOtpError('Please enter the 6-digit SMS verification code.');
      return;
    }
    setPasswordOtpError('');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setIsVerifyingPasswordOtp(false);
    setPasswordSuccessToast(true);
    setTimeout(() => {
      setPasswordSuccessToast(false);
    }, 4000);
  };

  // Metrics for properties
  const totalPropertiesCount = properties.length;
  const totalValuation = properties.reduce((acc, p) => acc + p.annualValuation, 0);
  const totalDueWaripanam = properties.reduce((acc, p) => acc + (p.currentQuarterStatus === 'due' ? p.dueAmount : 0), 0);

  return (
    <div className="min-h-screen bg-gray-50/60 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Toast Alert */}
      {(showSuccessToast || passwordSuccessToast) && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-800 text-white px-5 py-3.5 rounded-xl shadow-2xl border border-emerald-700 flex items-center gap-3 animate-slide-in">
          <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center shrink-0">
            <CheckIcon />
          </div>
          <span className="font-medium text-sm">
            {passwordSuccessToast ? 'Password credentials updated successfully!' : toastMessage}
          </span>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Top Header / Breadcrumb */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-1">
              <span>Homagama Pradeshiya Sabha</span>
              <span>/</span>
              <span>Citizen Portal</span>
              <span>/</span>
              <span className="text-[#8C1538] font-bold">Profile & Properties</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              {activeTab === 'my-profile' && 'My Citizen Profile'}
              {activeTab === 'my-properties' && 'My Registered Properties & Waripanam'}
              {activeTab === 'settings' && 'Account & Portal Settings'}
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
              {activeTab === 'my-profile' && 'Review and update your personal demographic information.'}
              {activeTab === 'my-properties' && 'Manage your lands, houses, commercial premises and settle municipal Waripanam (Assessment Tax).'}
              {activeTab === 'settings' && 'Configure language preferences, notifications, and portal security.'}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs">
              <ShieldCheckIcon />
              <span>National ID Verified</span>
            </span>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 hover:text-red-700 transition-colors shadow-2xs cursor-pointer"
            >
              <LogoutIcon />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Main Grid: Sidebar (3 cols) + Content (9 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ================= SIDEBAR ================= */}
          <aside className="lg:col-span-3 lg:sticky lg:top-24 space-y-5">
            {/* Citizen Summary Card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-5 text-center">
              <div className="relative inline-block mb-3">
                <div className="w-20 h-20 rounded-full bg-[#8C1538]/10 border-2 border-[#8C1538] text-[#8C1538] flex items-center justify-center text-3xl font-black mx-auto shadow-inner">
                  {(formData.name || 'C').charAt(0).toUpperCase()}
                </div>
                <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white" title="Active Verified Citizen">
                  <CheckIcon />
                </span>
              </div>
              <h2 className="text-base font-bold text-gray-900 leading-snug">{formData.name}</h2>
              <p className="text-xs font-mono font-semibold text-[#8C1538] mt-0.5">NIC: {formData.nic}</p>
              <div className="mt-3 pt-3 border-t border-gray-100 text-left space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span className="text-gray-400">GN Division:</span>
                  <span className="font-semibold text-gray-800">{formData.gnDivision}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Mobile:</span>
                  <span className="font-semibold text-gray-800">{formData.phone}</span>
                </div>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden p-2 space-y-1" aria-label="Profile navigation sidebar">
              {/* Option 1: My Profile */}
              <button
                type="button"
                onClick={() => {
                  setActiveTab('my-profile');
                  setIsEditing(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-left transition-all cursor-pointer ${
                  activeTab === 'my-profile'
                    ? 'bg-[#8C1538] text-white shadow-xs font-bold'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 font-semibold'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`p-1.5 rounded-lg ${activeTab === 'my-profile' ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'}`}>
                    <UserIcon />
                  </div>
                  <div>
                    <div className="text-sm">My Profile</div>
                    <div className={`text-[11px] ${activeTab === 'my-profile' ? 'text-white/80' : 'text-gray-400'}`}>
                      Personal Details
                    </div>
                  </div>
                </div>
                {activeTab === 'my-profile' && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
              </button>

              {/* Option 2: My Properties */}
              <button
                type="button"
                onClick={() => {
                  setActiveTab('my-properties');
                  setIsEditing(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-left transition-all cursor-pointer ${
                  activeTab === 'my-properties'
                    ? 'bg-[#8C1538] text-white shadow-xs font-bold'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 font-semibold'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`p-1.5 rounded-lg ${activeTab === 'my-properties' ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'}`}>
                    <HomeBuildingIcon />
                  </div>
                  <div>
                    <div className="text-sm">My Properties</div>
                    <div className={`text-[11px] ${activeTab === 'my-properties' ? 'text-white/80' : 'text-gray-400'}`}>
                      Properties & Waripanam
                    </div>
                  </div>
                </div>
                {totalDueWaripanam > 0 ? (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    activeTab === 'my-properties' ? 'bg-amber-400 text-gray-900' : 'bg-amber-100 text-amber-800'
                  }`}>
                    Due
                  </span>
                ) : (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    activeTab === 'my-properties' ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'
                  }`}>
                    {totalPropertiesCount}
                  </span>
                )}
              </button>

              {/* Option 3: Settings */}
              <button
                type="button"
                onClick={() => {
                  setActiveTab('settings');
                  setIsEditing(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-left transition-all cursor-pointer ${
                  activeTab === 'settings'
                    ? 'bg-[#8C1538] text-white shadow-xs font-bold'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 font-semibold'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`p-1.5 rounded-lg ${activeTab === 'settings' ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'}`}>
                    <SettingsIcon />
                  </div>
                  <div>
                    <div className="text-sm">Settings</div>
                    <div className={`text-[11px] ${activeTab === 'settings' ? 'text-white/80' : 'text-gray-400'}`}>
                      Security & Preferences
                    </div>
                  </div>
                </div>
                {activeTab === 'settings' && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
              </button>
            </nav>

            {/* Waripanam Notice Card */}
            <div className="bg-gradient-to-br from-red-50/80 to-amber-50/50 rounded-2xl border border-red-100 p-4 space-y-2">
              <div className="flex items-center gap-2 text-[#8C1538]">
                <ShieldCheckIcon />
                <h4 className="text-xs font-bold uppercase tracking-wider">Waripanam (වරිපනම් බදු)</h4>
              </div>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                Under the Pradeshiya Sabha Act, assessment tax is due quarterly. Settle full annual tax in advance before January 31 to enjoy a <strong>10% prompt discount</strong>, or pay within the first month of any quarter for a <strong>5% rebate</strong>.
              </p>
              <div className="pt-2 border-t border-red-100 text-[11px] font-semibold text-gray-700">
                Revenue Inquiry: <a href="tel:+94112855230" className="text-[#8C1538] hover:underline font-bold">+94 11 285 5230</a>
              </div>
            </div>
          </aside>

          {/* ================= MAIN CONTENT AREA ================= */}
          <main className="lg:col-span-9 space-y-6">

            {/* ----------------- TAB 1: MY PROFILE (PERSONAL DETAILS) ----------------- */}
            {activeTab === 'my-profile' && (
              <div className="space-y-6 animate-fadeIn">
                {/* Header Action Card */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Personal & Demographic Details</h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Your identity credentials as verified by the Grama Niladhari and Homagama Pradeshiya Sabha.
                    </p>
                  </div>
                  {!isEditing && (
                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="bg-[#8C1538] hover:bg-[#73102d] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer self-start sm:self-auto"
                    >
                      <EditIcon />
                      <span>Edit Personal Details</span>
                    </button>
                  )}
                </div>

                {/* Edit Form or Read-Only Grid */}
                {isEditing ? (
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 sm:p-8">
                    <form onSubmit={handleSaveProfile} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full bg-white border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#8C1538]/20 focus:border-[#8C1538]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                            National Identity Card (NIC)
                          </label>
                          <input
                            type="text"
                            name="nic"
                            value={formData.nic}
                            disabled
                            className="w-full bg-gray-100 border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm font-mono font-bold text-gray-500 cursor-not-allowed"
                            title="NIC cannot be modified directly."
                          />
                          <p className="text-[11px] text-gray-400 mt-1">Directly locked to biometric civil registry.</p>
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                            Mobile Phone Number <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            className="w-full bg-white border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#8C1538]/20 focus:border-[#8C1538]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full bg-white border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#8C1538]/20 focus:border-[#8C1538]"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                            Residential Address <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                            className="w-full bg-white border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#8C1538]/20 focus:border-[#8C1538]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                            Grama Niladhari Division
                          </label>
                          <input
                            type="text"
                            name="gnDivision"
                            value={formData.gnDivision}
                            onChange={handleInputChange}
                            className="w-full bg-white border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#8C1538]/20 focus:border-[#8C1538]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                            Pradeshiya Sabha Ward
                          </label>
                          <input
                            type="text"
                            name="ward"
                            value={formData.ward}
                            onChange={handleInputChange}
                            className="w-full bg-white border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#8C1538]/20 focus:border-[#8C1538]"
                          />
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
                        <button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="bg-[#8C1538] hover:bg-[#73102d] text-white px-5 py-2 rounded-lg text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                        >
                          <CheckIcon />
                          <span>Save Changes</span>
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 sm:p-8 space-y-6">
                    {/* Information Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                      <div className="bg-gray-50/80 p-4 rounded-xl border border-gray-150">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                          Full Citizen Name
                        </div>
                        <div className="text-sm font-bold text-gray-900">
                          {formData.name}
                        </div>
                      </div>

                      <div className="bg-gray-50/80 p-4 rounded-xl border border-gray-150">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                          National Identity Card (NIC)
                        </div>
                        <div className="text-sm font-mono font-bold text-[#8C1538] flex items-center gap-1.5">
                          <span>{formData.nic}</span>
                          <span className="text-emerald-600 text-xs font-bold">✓</span>
                        </div>
                      </div>

                      <div className="bg-gray-50/80 p-4 rounded-xl border border-gray-150">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                          Mobile Phone
                        </div>
                        <div className="text-sm font-semibold text-gray-900">
                          {formData.phone}
                        </div>
                      </div>

                      <div className="bg-gray-50/80 p-4 rounded-xl border border-gray-150">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                          Official Email
                        </div>
                        <div className="text-sm font-semibold text-gray-900 truncate">
                          {formData.email}
                        </div>
                      </div>

                      <div className="bg-gray-50/80 p-4 rounded-xl border border-gray-150">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                          GN Division
                        </div>
                        <div className="text-sm font-bold text-gray-900">
                          {formData.gnDivision}
                        </div>
                      </div>

                      <div className="bg-gray-50/80 p-4 rounded-xl border border-gray-150">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                          Council Ward
                        </div>
                        <div className="text-sm font-bold text-gray-900">
                          {formData.ward}
                        </div>
                      </div>

                      <div className="sm:col-span-2 md:col-span-3 bg-gray-50/80 p-4 rounded-xl border border-gray-150">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                          Permanent Residential Address
                        </div>
                        <div className="text-sm font-semibold text-gray-900">
                          {formData.address}
                        </div>
                      </div>
                    </div>

                    {/* Official Digital Identity Badge Card */}
                    <div className="mt-6 pt-6 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-white rounded-xl p-5 border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-5">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-[#8C1538]/10 text-[#8C1538] rounded-xl flex items-center justify-center font-black text-2xl border border-[#8C1538]/20 shrink-0">
                          ID
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-gray-900">Official Municipal Digital Identity</h4>
                            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                              Active & Verified
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">
                            Homagama Pradeshiya Sabha Digital Registry Record • Integrated with Sri Lanka National Identity Service.
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setActiveTab('my-properties')}
                        className="bg-[#8C1538] hover:bg-[#73102d] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-2 shrink-0 cursor-pointer"
                      >
                        <HomeBuildingIcon />
                        <span>View My Properties →</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ----------------- TAB 2: MY PROPERTIES & WARIPANAM ----------------- */}
            {activeTab === 'my-properties' && (
              <div className="space-y-6 animate-fadeIn">
                {/* Metric Summary Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-5 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Properties</div>
                      <div className="text-2xl font-black text-gray-900 mt-1">{totalPropertiesCount} Registered</div>
                      <div className="text-[11px] text-gray-500 mt-0.5">Residential & Commercial</div>
                    </div>
                    <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                      <HomeBuildingIcon />
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-5 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Annual Valuation</div>
                      <div className="text-2xl font-black text-gray-900 mt-1">LKR {totalValuation.toLocaleString()}</div>
                      <div className="text-[11px] text-gray-500 mt-0.5">Assessed Council Value</div>
                    </div>
                    <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold text-xs">
                      LKR
                    </div>
                  </div>

                  <div className={`rounded-2xl border shadow-xs p-5 flex items-center justify-between ${
                    totalDueWaripanam > 0
                      ? 'bg-amber-50/80 border-amber-200'
                      : 'bg-emerald-50/80 border-emerald-200'
                  }`}>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-gray-600">Waripanam Status</div>
                      <div className="text-2xl font-black text-gray-900 mt-1">
                        {totalDueWaripanam > 0 ? `LKR ${totalDueWaripanam.toLocaleString()} Due` : 'All Settled'}
                      </div>
                      <div className="text-[11px] text-gray-600 mt-0.5">
                        {totalDueWaripanam > 0 ? 'Q2 2026 Due (Pay below)' : 'Up to date with council rates'}
                      </div>
                    </div>
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold ${
                      totalDueWaripanam > 0 ? 'bg-amber-200 text-amber-900' : 'bg-emerald-200 text-emerald-900'
                    }`}>
                      {totalDueWaripanam > 0 ? '⚠️' : '✓'}
                    </div>
                  </div>
                </div>

                {/* Properties Header & Explanation */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        Registered Municipal Properties ({properties.length})
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Properties registered under your NIC <span className="font-mono font-bold text-gray-700">{formData.nic}</span> with Homagama Pradeshiya Sabha.
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full self-start sm:self-auto">
                      Sri Lanka Local Authority Assessment System
                    </span>
                  </div>

                  {/* Properties Cards List */}
                  <div className="mt-6 space-y-5">
                    {properties.map((property) => (
                      <div
                        key={property.id}
                        className="rounded-2xl border border-gray-200 hover:border-gray-300 bg-white p-5 sm:p-6 transition-all shadow-xs hover:shadow-md"
                      >
                        {/* Top Card Row */}
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-gray-100">
                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-1.5">
                              <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-black bg-[#8C1538]/10 text-[#8C1538] border border-[#8C1538]/20">
                                {property.assessmentNo}
                              </span>
                              <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-gray-100 text-gray-700">
                                {property.propertyType} ({property.propertyTypeSinhala})
                              </span>
                            </div>
                            <h4 className="text-base sm:text-lg font-bold text-gray-900">
                              {property.title}
                            </h4>
                            <p className="text-xs text-gray-600 mt-0.5 flex items-center gap-1">
                              <span>📍 {property.address}</span>
                              <span className="text-gray-400">•</span>
                              <span className="text-gray-500">{property.gnDivision}</span>
                            </p>
                          </div>

                          {/* Status Badge */}
                          <div className="self-start sm:self-end text-left sm:text-right">
                            {property.currentQuarterStatus === 'due' ? (
                              <div className="inline-flex flex-col items-start sm:items-end">
                                <span className="px-3 py-1 rounded-full text-xs font-black bg-red-100 text-red-800 border border-red-200 flex items-center gap-1.5">
                                  <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                                  <span>Waripanam Due: LKR {property.dueAmount.toLocaleString()}</span>
                                </span>
                                <span className="text-[11px] text-gray-500 mt-1">Due for {property.dueQuarter}</span>
                              </div>
                            ) : (
                              <div className="inline-flex flex-col items-start sm:items-end">
                                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                                  <span>✓</span>
                                  <span>Waripanam Settled</span>
                                </span>
                                <span className="text-[11px] text-gray-500 mt-1">Last Paid: {property.lastPaymentDate}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Property Specs Grid */}
                        <div className="py-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                          <div>
                            <span className="text-gray-400 block font-semibold text-[11px]">Land Extent</span>
                            <span className="font-bold text-gray-800">{property.landExtent}</span>
                          </div>
                          <div>
                            <span className="text-gray-400 block font-semibold text-[11px]">Annual Valuation</span>
                            <span className="font-bold text-gray-800">LKR {property.annualValuation.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-gray-400 block font-semibold text-[11px]">Tax Rate</span>
                            <span className="font-bold text-gray-800">{property.taxRatePercent}% / Year</span>
                          </div>
                          <div>
                            <span className="text-gray-400 block font-semibold text-[11px]">Quarterly Waripanam</span>
                            <span className="font-bold text-[#8C1538]">LKR {property.quarterlyTax.toLocaleString()}</span>
                          </div>
                        </div>

                        {/* Action Buttons Row */}
                        <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
                          <button
                            type="button"
                            onClick={() => setSelectedPropertyForModal(property)}
                            className="text-xs font-bold text-gray-700 hover:text-black hover:bg-gray-100 px-3.5 py-2 rounded-lg border border-gray-200 transition-colors cursor-pointer flex items-center gap-1.5"
                          >
                            <span>View Full Details & Breakdown</span>
                            <span>→</span>
                          </button>

                          <div className="flex items-center gap-2">
                            {property.currentQuarterStatus === 'due' ? (
                              <button
                                type="button"
                                onClick={() => handleOpenPayment(property)}
                                className="bg-[#8C1538] hover:bg-[#73102d] text-white px-5 py-2 rounded-xl text-xs font-bold shadow-xs hover:shadow-md transition-all flex items-center gap-2 cursor-pointer"
                              >
                                <CreditCardIcon />
                                <span>Pay Waripanam (LKR {property.dueAmount.toLocaleString()})</span>
                              </button>
                            ) : (
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => setSelectedPropertyForModal(property)}
                                  className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 hover:bg-emerald-100 transition-colors cursor-pointer"
                                >
                                  View Receipt #{property.lastReceiptNo}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleOpenPayment(property)}
                                  className="text-xs font-semibold text-[#8C1538] hover:text-[#73102d] bg-white border border-[#8C1538]/30 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                                >
                                  Pay Advance Quarter
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ----------------- TAB 3: SETTINGS ----------------- */}
            {activeTab === 'settings' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 sm:p-8 space-y-8">
                  <div className="pb-4 border-b border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Account & Portal Settings</h3>
                    <p className="text-xs text-gray-500">
                      Configure your official portal language, alert notifications for Waripanam dues, and security credentials.
                    </p>
                  </div>

                  {/* Language Selection */}
                  <div className="space-y-3">
                    <div className="text-sm font-bold text-gray-900">Portal Preferred Language</div>
                    <p className="text-xs text-gray-600">
                      Select your preferred language for council notices, receipts, and assessment tax notifications.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                      <button
                        type="button"
                        onClick={() => changeLanguage('en')}
                        className={`py-2.5 px-3 rounded-xl font-bold text-xs border transition-all cursor-pointer ${
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
                        className={`py-2.5 px-3 rounded-xl font-bold text-xs border transition-all cursor-pointer ${
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
                        className={`py-2.5 px-3 rounded-xl font-bold text-xs border transition-all cursor-pointer ${
                          language === 'ta'
                            ? 'bg-[#8C1538] text-white border-[#8C1538] shadow-xs'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        தமிழ் (Tamil)
                      </button>
                    </div>
                  </div>

                  {/* Notifications */}
                  <div className="space-y-4 pt-4 border-t border-gray-100">
                    <div className="text-sm font-bold text-gray-900">Communication & Civic Alerts</div>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between cursor-pointer p-3 rounded-xl hover:bg-gray-50 border border-gray-100">
                        <div>
                          <div className="text-xs font-bold text-gray-800">SMS Waripanam & Assessment Due Reminders</div>
                          <div className="text-[11px] text-gray-500">
                            Receive SMS 14 days before quarterly discount deadline to your mobile ({formData.phone}).
                          </div>
                        </div>
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-[#8C1538] rounded focus:ring-[#8C1538]" />
                      </label>

                      <label className="flex items-center justify-between cursor-pointer p-3 rounded-xl hover:bg-gray-50 border border-gray-100">
                        <div>
                          <div className="text-xs font-bold text-gray-800">Email Digital Receipts & Assessment Statements</div>
                          <div className="text-[11px] text-gray-500">
                            Instantly email signed council tax receipts to {formData.email}.
                          </div>
                        </div>
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-[#8C1538] rounded focus:ring-[#8C1538]" />
                      </label>
                    </div>
                  </div>

                  {/* Password & Security */}
                  <div className="space-y-4 pt-4 border-t border-gray-100">
                    <div className="text-sm font-bold text-gray-900 flex items-center gap-2">
                      <LockIcon />
                      <span>Security Credentials & Password Management</span>
                    </div>

                    {isVerifyingPasswordOtp ? (
                      <div className="bg-red-50/70 border border-[#8C1538]/30 rounded-2xl p-5 space-y-4 animate-fadeIn">
                        <div className="flex items-center gap-2 text-[#8C1538]">
                          <ShieldCheckIcon />
                          <h4 className="font-bold text-sm">SMS OTP Security Challenge</h4>
                        </div>
                        <p className="text-xs text-gray-700">
                          To update your password, enter the 6-digit code sent to your registered phone number <strong className="font-mono">{formData.phone}</strong>.
                        </p>
                        {passwordOtpError && (
                          <div className="bg-red-100 text-red-800 p-2 rounded text-xs font-semibold">
                            ⚠️ {passwordOtpError}
                          </div>
                        )}
                        <div className="flex gap-2">
                          <input
                            type="text"
                            maxLength={6}
                            placeholder="Enter 6-digit OTP"
                            value={passwordOtpCode}
                            onChange={(e) => setPasswordOtpCode(e.target.value.replace(/\D/g, ''))}
                            className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-2 font-mono font-bold text-center text-[#8C1538]"
                          />
                          <button
                            type="button"
                            onClick={() => setPasswordOtpCode('894215')}
                            className="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg text-xs font-bold cursor-pointer"
                          >
                            Demo Code
                          </button>
                        </div>
                        <div className="flex items-center justify-between pt-2">
                          <button
                            type="button"
                            onClick={() => setIsVerifyingPasswordOtp(false)}
                            className="text-xs font-semibold text-gray-600 cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={handleConfirmPasswordOtp}
                            className="bg-[#8C1538] hover:bg-[#73102d] text-white px-4 py-2 rounded-lg text-xs font-bold cursor-pointer"
                          >
                            Verify & Update
                          </button>
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handlePasswordSubmit} className="bg-gray-50/80 p-5 rounded-2xl border border-gray-200 space-y-4">
                        {passwordError && (
                          <div className="bg-red-50 text-red-700 border border-red-200 px-3.5 py-2.5 rounded-lg text-xs font-semibold">
                            ⚠️ {passwordError}
                          </div>
                        )}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                              Current Password <span className="text-red-500">*</span>
                            </label>
                            <input
                              type={showPassword ? 'text' : 'password'}
                              name="currentPassword"
                              value={passwordData.currentPassword}
                              onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                              placeholder="••••••••"
                              className="w-full bg-white border border-gray-300 rounded-lg px-3.5 py-2 text-sm font-semibold"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                              New Password <span className="text-red-500">*</span>
                            </label>
                            <input
                              type={showPassword ? 'text' : 'password'}
                              name="newPassword"
                              value={passwordData.newPassword}
                              onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                              placeholder="Min 6 characters"
                              className="w-full bg-white border border-gray-300 rounded-lg px-3.5 py-2 text-sm font-semibold"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                              Confirm Password <span className="text-red-500">*</span>
                            </label>
                            <input
                              type={showPassword ? 'text' : 'password'}
                              name="confirmPassword"
                              value={passwordData.confirmPassword}
                              onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                              placeholder="Re-enter password"
                              className="w-full bg-white border border-gray-300 rounded-lg px-3.5 py-2 text-sm font-semibold"
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-xs font-semibold text-gray-600 hover:text-gray-900 flex items-center gap-1.5 cursor-pointer"
                          >
                            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                            <span>{showPassword ? 'Hide Passwords' : 'Show Passwords'}</span>
                          </button>

                          <button
                            type="submit"
                            className="bg-[#8C1538] hover:bg-[#73102d] text-white px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                          >
                            <CheckIcon />
                            <span>Update Password</span>
                          </button>
                        </div>
                      </form>
                    )}
                  </div>

                  {/* Sign Out Card */}
                  <div className="bg-red-50/70 rounded-2xl p-5 border border-red-200 space-y-3">
                    <div className="text-sm font-bold text-red-900 flex items-center gap-2">
                      <LogoutIcon />
                      <span>Sign Out from Citizen Session</span>
                    </div>
                    <p className="text-xs text-red-700">
                      Sign out of your citizen account on this computer. You can log back in anytime using your NIC or phone number.
                    </p>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
                    >
                      Sign Out Now
                    </button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ================= MODAL 1: PROPERTY DETAILS MODAL ================= */}
      {selectedPropertyForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-[#8C1538]/10 text-[#8C1538] flex items-center justify-center">
                  <HomeBuildingIcon />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{selectedPropertyForModal.title}</h3>
                  <p className="text-xs font-mono font-bold text-[#8C1538]">{selectedPropertyForModal.assessmentNo}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPropertyForModal(null)}
                className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 cursor-pointer"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Specifications Grid */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">Official Municipal Registration Record</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-400 block font-semibold">Address</span>
                  <span className="font-bold text-gray-900">{selectedPropertyForModal.address}</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-400 block font-semibold">Grama Niladhari & Ward</span>
                  <span className="font-bold text-gray-900">{selectedPropertyForModal.gnDivision} • {selectedPropertyForModal.ward}</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-400 block font-semibold">Deed & Land Registry</span>
                  <span className="font-bold text-gray-900">{selectedPropertyForModal.deedNo}</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-400 block font-semibold">Surveyor Plan</span>
                  <span className="font-bold text-gray-900">{selectedPropertyForModal.cadastralPlanNo}</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-400 block font-semibold">Land Extent & Structure</span>
                  <span className="font-bold text-gray-900">{selectedPropertyForModal.landExtent} • {selectedPropertyForModal.builtArea}</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-400 block font-semibold">Annual Valuation & Council Rate</span>
                  <span className="font-bold text-gray-900">
                    LKR {selectedPropertyForModal.annualValuation.toLocaleString()} ({selectedPropertyForModal.taxRatePercent}% p.a.)
                  </span>
                </div>
              </div>
            </div>

            {/* Waripanam Schedule Breakdown */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">2026 Waripanam Schedule (Quarterly Breakdown)</h4>
                <span className="text-xs font-bold text-[#8C1538]">
                  Annual: LKR {selectedPropertyForModal.annualTax.toLocaleString()}
                </span>
              </div>

              <div className="border border-gray-200 rounded-xl overflow-hidden divide-y divide-gray-100 text-xs">
                {selectedPropertyForModal.quarters.map((q) => (
                  <div key={q.q} className="p-3.5 flex items-center justify-between bg-white hover:bg-gray-50">
                    <div>
                      <div className="font-bold text-gray-900">{q.q} ({q.period})</div>
                      <div className="text-[11px] text-gray-500">
                        Amount: LKR {q.amount.toLocaleString()} {q.receiptNo && `• Receipt: ${q.receiptNo} (${q.paidDate})`}
                      </div>
                    </div>
                    <div>
                      {q.status === 'paid' && (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                          ✓ Settled
                        </span>
                      )}
                      {q.status === 'due' && (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-100 text-red-800 animate-pulse">
                          ⚠️ Due Now
                        </span>
                      )}
                      {q.status === 'upcoming' && (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-gray-100 text-gray-600">
                          Upcoming
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setSelectedPropertyForModal(null)}
                className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-xs font-bold cursor-pointer"
              >
                Close
              </button>

              {selectedPropertyForModal.currentQuarterStatus === 'due' ? (
                <button
                  type="button"
                  onClick={() => {
                    const prop = selectedPropertyForModal;
                    setSelectedPropertyForModal(null);
                    handleOpenPayment(prop);
                  }}
                  className="bg-[#8C1538] hover:bg-[#73102d] text-white px-5 py-2 rounded-lg text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  <CreditCardIcon />
                  <span>Pay Waripanam Now (LKR {selectedPropertyForModal.dueAmount.toLocaleString()})</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    const prop = selectedPropertyForModal;
                    setSelectedPropertyForModal(null);
                    handleOpenPayment(prop);
                  }}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer"
                >
                  Pay Next Quarter in Advance
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL 2: WARIPANAM PAYMENT MODAL ================= */}
      {payingProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl max-w-xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 space-y-6">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-[#8C1538]/10 text-[#8C1538] flex items-center justify-center">
                  <CreditCardIcon />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Pay Waripanam (Assessment Tax)</h3>
                  <p className="text-xs text-gray-500">Homagama Pradeshiya Sabha Revenue Gateway</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPayingProperty(null)}
                className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 cursor-pointer"
              >
                <CloseIcon />
              </button>
            </div>

            {/* If Receipt is Generated */}
            {paymentSuccessReceipt ? (
              <div className="space-y-6 animate-fadeIn">
                <div className="text-center py-4 bg-emerald-50 rounded-2xl border border-emerald-200 p-6">
                  <div className="w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-2xl shadow-md">
                    ✓
                  </div>
                  <h4 className="text-lg font-black text-gray-900">Payment Successfully Completed!</h4>
                  <p className="text-xs text-emerald-800 font-semibold mt-1">
                    Official Digital Assessment Receipt Issued
                  </p>
                </div>

                {/* Receipt Card */}
                <div className="border border-gray-300 rounded-2xl p-6 bg-gray-50/70 space-y-4 font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                    <div>
                      <div className="font-bold text-gray-900">RECEIPT #{paymentSuccessReceipt.receiptNo}</div>
                      <div className="text-[10px] text-gray-500">{paymentSuccessReceipt.councilName}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-[#8C1538]">LKR {paymentSuccessReceipt.amount.toLocaleString()}</div>
                      <div className="text-[10px] text-gray-500">{paymentSuccessReceipt.paymentDate}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-[11px]">
                    <div>
                      <span className="text-gray-400 block font-sans">Assessment No:</span>
                      <span className="font-bold text-gray-800">{paymentSuccessReceipt.assessmentNo}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block font-sans">Owner Name:</span>
                      <span className="font-bold text-gray-800">{paymentSuccessReceipt.citizenName}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block font-sans">Tax Period:</span>
                      <span className="font-bold text-gray-800">{paymentSuccessReceipt.period}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block font-sans">Payment Method:</span>
                      <span className="font-bold text-gray-800">{paymentSuccessReceipt.paymentMethod}</span>
                    </div>
                  </div>

                  {paymentSuccessReceipt.discountApplied > 0 && (
                    <div className="p-2 bg-emerald-100 text-emerald-900 rounded-lg text-[11px] font-sans font-bold flex justify-between">
                      <span>Early Prompt Rebate (5%):</span>
                      <span>- LKR {paymentSuccessReceipt.discountApplied.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="pt-2 border-t border-gray-200 text-center text-[10px] text-gray-400 font-sans">
                    This is an electronically generated municipal tax receipt valid under Pradeshiya Sabha Act No. 15 of 1987.
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      window.print();
                    }}
                    className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-xl text-xs font-bold cursor-pointer"
                  >
                    🖨️ Print Receipt
                  </button>
                  <button
                    type="button"
                    onClick={() => setPayingProperty(null)}
                    className="bg-[#8C1538] hover:bg-[#73102d] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                  >
                    Done & Return to Properties
                  </button>
                </div>
              </div>
            ) : (
              /* Payment Form */
              <form onSubmit={handleExecutePayment} className="space-y-5">
                {/* Property Details Bar */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500 font-semibold">Property:</span>
                    <span className="font-bold text-gray-900">{payingProperty.title}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500 font-semibold">Assessment No:</span>
                    <span className="font-mono font-bold text-[#8C1538]">{payingProperty.assessmentNo}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500 font-semibold">Address:</span>
                    <span className="font-medium text-gray-700">{payingProperty.address}</span>
                  </div>
                </div>

                {/* Payment Option Selector */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase text-gray-700">
                    Select Waripanam Period & Payment Option
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentOption('quarter')}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        paymentOption === 'quarter'
                          ? 'border-[#8C1538] bg-red-50/50 ring-2 ring-[#8C1538]/20'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-xs font-bold text-gray-900">Current Quarter Due (Q2 2026)</div>
                      <div className="text-sm font-black text-[#8C1538] mt-1">
                        LKR {(payingProperty.dueAmount || payingProperty.quarterlyTax).toLocaleString()}
                      </div>
                      <div className="text-[10px] text-gray-500 mt-0.5">Settle current quarter dues</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentOption('annual')}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        paymentOption === 'annual'
                          ? 'border-[#8C1538] bg-red-50/50 ring-2 ring-[#8C1538]/20'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-900">Rest of Year (Q2, Q3, Q4)</span>
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">5% OFF</span>
                      </div>
                      <div className="text-sm font-black text-emerald-700 mt-1">
                        LKR {Math.round(payingProperty.quarterlyTax * 3 * 0.95).toLocaleString()}
                      </div>
                      <div className="text-[10px] text-gray-500 mt-0.5">Save LKR {Math.round(payingProperty.quarterlyTax * 3 * 0.05).toLocaleString()} rebate</div>
                    </button>
                  </div>
                </div>

                {/* Payment Method Selector */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase text-gray-700">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                        paymentMethod === 'card'
                          ? 'border-[#8C1538] bg-red-50/60 font-bold text-[#8C1538]'
                          : 'border-gray-200 text-gray-700 hover:bg-gray-50 text-xs'
                      }`}
                    >
                      <CreditCardIcon />
                      <span className="text-[11px]">Card (Visa/Master)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('lankaqr')}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                        paymentMethod === 'lankaqr'
                          ? 'border-[#8C1538] bg-red-50/60 font-bold text-[#8C1538]'
                          : 'border-gray-200 text-gray-700 hover:bg-gray-50 text-xs'
                      }`}
                    >
                      <QrCodeIcon />
                      <span className="text-[11px]">LankaQR Scan</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('bank')}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                        paymentMethod === 'bank'
                          ? 'border-[#8C1538] bg-red-50/60 font-bold text-[#8C1538]'
                          : 'border-gray-200 text-gray-700 hover:bg-gray-50 text-xs'
                      }`}
                    >
                      <span className="text-base leading-none">🏛️</span>
                      <span className="text-[11px]">Direct Bank Debit</span>
                    </button>
                  </div>
                </div>

                {/* Payment Method Input Preview */}
                {paymentMethod === 'card' && (
                  <div className="bg-gray-50/80 p-4 rounded-xl border border-gray-200 space-y-3">
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-gray-600 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="4532 •••• •••• 8819"
                        required
                        className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono font-bold"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-gray-600 mb-1">
                          Expiry MM/YY
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/YY"
                          required
                          className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-gray-600 mb-1">
                          CVV / CVC
                        </label>
                        <input
                          type="password"
                          maxLength={4}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          placeholder="•••"
                          required
                          className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'lankaqr' && (
                  <div className="bg-gray-50/80 p-4 rounded-xl border border-gray-200 text-center space-y-2">
                    <div className="w-36 h-36 bg-white mx-auto border-2 border-gray-800 rounded-xl flex items-center justify-center p-2 shadow-inner">
                      <div className="grid grid-cols-5 gap-1.5 w-full h-full p-2 bg-gray-900 rounded">
                        <div className="bg-white col-span-2 row-span-2"></div>
                        <div className="bg-white"></div>
                        <div className="bg-white col-span-2 row-span-2"></div>
                        <div className="bg-white col-span-3"></div>
                        <div className="bg-white col-span-2"></div>
                        <div className="bg-white col-span-2 row-span-2"></div>
                        <div className="bg-white col-span-3"></div>
                      </div>
                    </div>
                    <p className="text-xs font-bold text-gray-800">Scan with any LankaQR Bank App</p>
                    <p className="text-[11px] text-gray-500">Commercial Bank COMBANK, BOC SmartPay, FriMi, Flash, Genie, Sampath PayApp</p>
                  </div>
                )}

                {paymentMethod === 'bank' && (
                  <div className="bg-gray-50/80 p-4 rounded-xl border border-gray-200 space-y-2 text-xs">
                    <p className="font-bold text-gray-800">Direct Municipal Revenue Collection Bank Accounts:</p>
                    <div className="p-2.5 bg-white rounded-lg border border-gray-200 space-y-1">
                      <div className="flex justify-between font-semibold">
                        <span>Bank of Ceylon (BOC) Homagama:</span>
                        <span className="font-mono font-bold text-[#8C1538]">0002341908</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span>People's Bank Homagama:</span>
                        <span className="font-mono font-bold text-[#8C1538]">14710012000341</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-gray-500">Instant direct debit verification supported via CEFTS.</p>
                  </div>
                )}

                {/* Total & Submit */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-gray-400 uppercase block">Total Payable</span>
                    <span className="text-xl font-black text-[#8C1538]">
                      LKR {paymentOption === 'quarter'
                        ? (payingProperty.dueAmount || payingProperty.quarterlyTax).toLocaleString()
                        : Math.round(payingProperty.quarterlyTax * 3 * 0.95).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setPayingProperty(null)}
                      className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-xl text-xs font-bold cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isProcessingPayment}
                      className="bg-[#8C1538] hover:bg-[#73102d] disabled:bg-gray-400 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                    >
                      {isProcessingPayment ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <CheckIcon />
                          <span>Confirm & Pay Now</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
