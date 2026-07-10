import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const SparklesIcon = () => (
  <svg className="w-4 h-4 text-amber-300" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 01-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 8.134a1 1 0 010 1.932l-3.354.935-1.18 4.455a1 1 0 01-1.933 0L9.854 11l-3.354-.935a1 1 0 010-1.932l3.354-.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg className="w-16 h-16 text-[#8C1538] mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const WasteRemovalFormModal = ({ isOpen, onClose }) => {
  const { language: activeLanguage, changeLanguage } = useLanguage();
  const lang = activeLanguage || 'si';
  const L = (siText: string, enText: string, taText?: string) => lang === 'si' ? siText : lang === 'ta' ? (taText || enText) : enText;

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceNo, setReferenceNo] = useState('');

  const [formData, setFormData] = useState({
    // 1-4. Applicant & Institution Info
    applicantName: '',
    institutionName: '',
    institutionAddress: '',
    telephoneNumber: '',

    // 5. Service Type
    serviceBasis: 'monthly', // 'monthly' | 'emergency'

    // 5.I Monthly Basis Quantities
    biodegradableKg: '',
    nonBiodegradableKg: '',

    // 5.II Emergency Basis Loads
    emergencyLoadCount: '',

    // Declaration & Signatures (Citizen section only)
    agreedToWasteGuidelines: false,
    submissionDate: new Date().toISOString().split('T')[0],
    applicantSignature: ''
  });

  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAutoFill = () => {
    setFormData({
      applicantName: 'Nimal Jayatilleke',
      institutionName: 'Homagama Green Supermarket & Food Emporium',
      institutionAddress: 'No. 205, High Level Road, Homagama Town',
      telephoneNumber: '071 854 1200',
      serviceBasis: 'monthly',
      biodegradableKg: '450',
      nonBiodegradableKg: '180',
      emergencyLoadCount: '1',
      agreedToWasteGuidelines: true,
      submissionDate: new Date().toISOString().split('T')[0],
      applicantSignature: 'N. Jayatilleke'
    });
  };

  const calculateEstimate = () => {
    if (formData.serviceBasis === 'monthly') {
      const bio = parseFloat(formData.biodegradableKg) || 0;
      const nonBio = parseFloat(formData.nonBiodegradableKg) || 0;
      return Math.round(bio * 8 + nonBio * 15);
    } else {
      const loads = parseFloat(formData.emergencyLoadCount) || 0;
      return Math.round(loads * 6500);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreedToWasteGuidelines) {
      alert('කරුණාකර කසළ වෙන්කර තැබීමේ නියමයන්ට එකඟ බව තහවුරු කරන්න / Please confirm your agreement to municipal waste segregation guidelines.');
      return;
    }
    const randomRef = 'HMG-WM-' + Math.floor(100000 + Math.random() * 900000);
    setReferenceNo(randomRef);
    setIsSubmitted(true);
  };

  const resetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-sm overflow-hidden animate-fadeIn select-none font-sans">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-[#F8FAFC] rounded-3xl max-w-4xl w-full max-h-[88vh] overflow-hidden shadow-2xl border border-gray-200 flex flex-col my-auto text-left"
      >
        
        {/* Modal Header Banner */}
        <div className="bg-gradient-to-r from-[#8C1538] to-[#5e0d23] text-white px-6 sm:px-8 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative shadow-md shrink-0">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full text-amber-200">
                {L('හෝමාගම ප්‍රාදේශීය සභාව', 'Homagama Pradeshiya Sabha', 'ஹோமகம பிரதேச சபை')}
              </span>
              <span className="text-[11px] font-semibold bg-amber-400/20 text-amber-200 px-2.5 py-1 rounded-md border border-amber-300/30">
                Waste Management Portal
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight leading-tight pt-1">
              {L(
                'කසල ඉවත්කිරීම සඳහා ස්ථාන පිළිබඳ අයදුම්පත / වාර්තාව',
                'Application & Service Report for Commercial & Emergency Waste Removal',
                'கழிவுகளை அகற்றுவதற்கான விண்ணப்பம் / அறிக்கை'
              )}
            </h2>
            <p className="text-xs sm:text-sm text-white/90 font-medium">
              {L(
                'වාණිජ හා හදිසි කසල ඉවත්කිරීමේ සේවා අයදුම්පත',
                'Commercial & Emergency Waste Collection Service Application',
                'வணிக மற்றும் அவசர கழிவு சேகரிப்பு விண்ணப்பம்'
              )}
            </p>
          </div>
          <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-center">
            {/* Language Switcher Pill */}
            <div className="flex items-center bg-black/25 p-1 rounded-xl border border-white/20">
              <button
                type="button"
                onClick={() => changeLanguage('si')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${lang === 'si' ? 'bg-white text-[#8C1538] shadow-xs' : 'text-white/85 hover:text-white'}`}
              >
                සිංහල
              </button>
              <button
                type="button"
                onClick={() => changeLanguage('en')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${lang === 'en' ? 'bg-white text-[#8C1538] shadow-xs' : 'text-white/85 hover:text-white'}`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => changeLanguage('ta')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${lang === 'ta' ? 'bg-white text-[#8C1538] shadow-xs' : 'text-white/85 hover:text-white'}`}
              >
                தமிழ்
              </button>
            </div>

            {!isSubmitted && (
              <button
                type="button"
                onClick={handleAutoFill}
                className="bg-white/15 hover:bg-white/25 text-white text-xs font-semibold px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all duration-200 cursor-pointer border border-white/20 shadow-xs"
                title="Fill sample commercial applicant data"
              >
                <SparklesIcon />
                <span className="hidden sm:inline">{L('ආදර්ශ දත්ත', 'Sample Fill', 'மாதிரி தரவு')}</span>
              </button>
            )}
            <button
              type="button"
              onClick={resetAndClose}
              className="text-white/80 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
            >
              <CloseIcon />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-8 overflow-y-auto space-y-8 flex-grow">
          {isSubmitted ? (
            /* Success Confirmation Screen */
            <div className="bg-white rounded-2xl border border-gray-200/80 p-8 text-center space-y-6 shadow-sm">
              <CheckCircleIcon />
              <div className="space-y-2">
                <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 uppercase tracking-wide">
                  අයදුම්පත ලියාපදිංචි කරන ලදී • Request Logged
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                  කසල ඉවත්කිරීමේ සේවා අයදුම්පත සාර්ථකව ඉදිරිපත් කරන ලදී!
                </h3>
                <p className="text-base font-semibold text-gray-700">
                  Waste Removal Service Application Successfully Submitted!
                </p>
                <p className="text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
                  Your request has been forwarded to the Homagama Health & Solid Waste Management Inspectorate. Collection scheduling details will be sent via SMS.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 max-w-lg mx-auto text-left space-y-3.5 shadow-xs">
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Reference Number</span>
                  <span className="font-mono font-bold text-lg text-[#8C1538] bg-red-50 px-3.5 py-1 rounded-lg border border-red-100">
                    {referenceNo}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 font-medium">Applicant:</span>
                  <span className="font-bold text-gray-900 truncate max-w-[220px]">{formData.applicantName || 'Citizen'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 font-medium">Institution / Enterprise:</span>
                  <span className="font-bold text-gray-900 truncate max-w-[220px]">{formData.institutionName || 'N/A'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 font-medium">Service Category:</span>
                  <span className="font-bold text-gray-900">
                    {formData.serviceBasis === 'monthly' ? 'මාසික පදනම / Monthly Basis' : 'හදිසි ඉවත්කිරීම / Emergency Removal'}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 font-medium">Declared Quantity:</span>
                  <span className="font-bold text-gray-900">
                    {formData.serviceBasis === 'monthly'
                      ? `${formData.biodegradableKg || 0} kg Bio / ${formData.nonBiodegradableKg || 0} kg Non-Bio`
                      : `${formData.emergencyLoadCount || 0} Tractor Load(s)`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 font-medium">Estimated Municipal Tariff:</span>
                  <span className="font-extrabold text-base text-[#8C1538]">
                    LKR {calculateEstimate().toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
                  <span className="text-gray-600 font-medium">Date Submitted:</span>
                  <span className="font-semibold text-gray-900">{formData.submissionDate}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => alert(`Downloading Waste Removal Application Receipt (${referenceNo})...`)}
                  className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer shadow-xs"
                >
                  📄 Download Application Receipt (PDF)
                </button>
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="bg-[#8C1538] hover:bg-[#73102d] text-white px-6 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer shadow-sm hover:shadow"
                >
                  Done & Return to Applications
                </button>
              </div>
            </div>
          ) : (
            /* Digitalized Form matching form2.jpeg (Excluding internal office sections) */
            <form id="waste-removal-form" onSubmit={handleSubmit} className="space-y-6">
              
              {/* Note Guidance Bar */}
              <div className="bg-amber-50/90 border border-amber-200/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                <div className="text-xs sm:text-sm text-amber-950 leading-relaxed">
                  <span className="font-bold text-amber-900">
                    {L('පුරවැසි / ආයතනික අංශය:', 'Applicant Section Only:', 'விண்ணப்பதாரர் பிரிவு மட்டும்:')}
                  </span>{' '}
                  {L(
                    'ආයතනය හෝ ව්‍යාපාරය විසින් ඉදිරිපත් කළ යුතු විස්තර පහතින් සම්පූර්ණ කරන්න.',
                    'Please fill out the details below required for institution or commercial waste collection.',
                    'நிறுவனம் அல்லது வணிக கழிவுகளை அகற்றுவதற்கு தேவையான விவரங்களை கீழே பூர்த்தி செய்யவும்.'
                  )}
                </div>
              </div>

              {/* Section 1: Applicant & Institution Details (Fields 1 - 4) */}
              <div className="bg-white rounded-2xl border border-gray-200/90 p-6 sm:p-8 shadow-xs space-y-6">
                <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                  <span className="bg-[#8C1538] text-white w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm shrink-0">
                    01
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900">
                      {L(
                        'ඉල්ලුම්කරු සහ ආයතන තොරතුරු (01 - 04)',
                        'Applicant & Institution Information (Fields 1 - 4)',
                        'விண்ணப்பதாரர் மற்றும் நிறுவன தகவல்கள் (1 - 4)'
                      )}
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block mb-2">
                      <span className="block text-sm sm:text-base font-bold text-gray-900">
                        {L('1. ඉල්ලුම්කරුගේ නම', '1. Applicant\'s Name', '1. விண்ணப்பதாரரின் பெயர்')} <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      name="applicantName"
                      required
                      value={formData.applicantName}
                      onChange={handleInputChange}
                      placeholder="e.g. Nimal Jayatilleke"
                      className="w-full bg-gray-50/70 border border-gray-300 focus:bg-white focus:border-[#8C1538] focus:ring-4 focus:ring-[#8C1538]/10 rounded-xl px-4 py-3 text-sm sm:text-base font-medium text-gray-900 focus:outline-none transition-all"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block mb-2">
                      <span className="block text-sm sm:text-base font-bold text-gray-900">
                        {L('2. ආයතනයේ නම', '2. Institution / Business Name', '2. நிறுவனம் / வணிக பெயர்')} <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      name="institutionName"
                      required
                      value={formData.institutionName}
                      onChange={handleInputChange}
                      placeholder="e.g. Homagama Green Supermarket & Food Emporium"
                      className="w-full bg-gray-50/70 border border-gray-300 focus:bg-white focus:border-[#8C1538] focus:ring-4 focus:ring-[#8C1538]/10 rounded-xl px-4 py-3 text-sm sm:text-base font-medium text-gray-900 focus:outline-none transition-all"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block mb-2">
                      <span className="block text-sm sm:text-base font-bold text-gray-900">
                        {L('3. ආයතනයේ ලිපිනය', '3. Institution / Premises Address', '3. நிறுவனத்தின் முகவரி')} <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      name="institutionAddress"
                      required
                      value={formData.institutionAddress}
                      onChange={handleInputChange}
                      placeholder="e.g. No. 205, High Level Road, Homagama Town"
                      className="w-full bg-gray-50/70 border border-gray-300 focus:bg-white focus:border-[#8C1538] focus:ring-4 focus:ring-[#8C1538]/10 rounded-xl px-4 py-3 text-sm sm:text-base font-medium text-gray-900 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block mb-2">
                      <span className="block text-sm sm:text-base font-bold text-gray-900">
                        {L('4. දුරකථන අංකය', '4. Telephone Number', '4. தொலைபேசி எண்')} <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      name="telephoneNumber"
                      required
                      value={formData.telephoneNumber}
                      onChange={handleInputChange}
                      placeholder="e.g. 071 854 1200 / 011 285 3000"
                      className="w-full bg-gray-50/70 border border-gray-300 focus:bg-white focus:border-[#8C1538] focus:ring-4 focus:ring-[#8C1538]/10 rounded-xl px-4 py-3 text-sm sm:text-base font-semibold text-gray-900 focus:outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Waste Removal Basis & Quantities (Field 5) */}
              <div className="bg-white rounded-2xl border border-gray-200/90 p-6 sm:p-8 shadow-xs space-y-6">
                <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                  <span className="bg-[#8C1538] text-white w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm shrink-0">
                    02
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900">
                      {L(
                        'කසල ඉවත්කිරීමේ පදනම සහ ප්‍රමාණයන් (05)',
                        'Waste Removal Basis & Quantities (Field 05)',
                        'கழிவுகளை அகற்றும் முறை மற்றும் அளவுகள் (05)'
                      )}
                    </h3>
                  </div>
                </div>

                {/* 5. Select Category */}
                <div>
                  <label className="block mb-3">
                    <span className="block text-sm sm:text-base font-bold text-gray-900">
                      {L(
                        '5. කසල ඉවත්කිරීම මාසික පදනම / හදිසි ඉවත්කිරීම',
                        '5. Select Service Category (Monthly or Emergency)',
                        '5. சேவை வகையைத் தேர்ந்தெடுக்கவும் (மாதாந்திர அல்லது அவசர)'
                      )} <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setFormData((p) => ({ ...p, serviceBasis: 'monthly' }))}
                      className={`cursor-pointer border-2 rounded-2xl p-5 flex items-center gap-4 text-left transition-all ${
                        formData.serviceBasis === 'monthly'
                          ? 'border-[#8C1538] bg-red-50/50 shadow-sm'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.serviceBasis === 'monthly' ? 'border-[#8C1538]' : 'border-gray-300'}`}>
                        {formData.serviceBasis === 'monthly' && <div className="w-2.5 h-2.5 rounded-full bg-[#8C1538]" />}
                      </div>
                      <div>
                        <div className="font-bold text-base text-gray-900">{L('I. මාසික පදනම', 'I. Monthly Basis', 'I. மாதாந்திர முறை')}</div>
                        <div className="text-xs sm:text-sm font-medium text-gray-600 mt-0.5">{L('නිතිපතා කාලසටහන්ගත කසල ඉවත් කිරීම', 'Regular scheduled collection', 'வழக்கமான திட்டமிடப்பட்ட சேகரிப்பு')}</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData((p) => ({ ...p, serviceBasis: 'emergency' }))}
                      className={`cursor-pointer border-2 rounded-2xl p-5 flex items-center gap-4 text-left transition-all ${
                        formData.serviceBasis === 'emergency'
                          ? 'border-[#8C1538] bg-red-50/50 shadow-sm'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.serviceBasis === 'emergency' ? 'border-[#8C1538]' : 'border-gray-300'}`}>
                        {formData.serviceBasis === 'emergency' && <div className="w-2.5 h-2.5 rounded-full bg-[#8C1538]" />}
                      </div>
                      <div>
                        <div className="font-bold text-base text-gray-900">{L('II. හදිසි ඉවත්කිරීම', 'II. Emergency Removal', 'II. அவசர அகற்றம்')}</div>
                        <div className="text-xs sm:text-sm font-medium text-gray-600 mt-0.5">{L('එක්වරක් තොග වශයෙන් ඉවත් කිරීම', 'One-time bulk clearance', 'ஒரு முறை மொத்தமாக அகற்றுதல்')}</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Conditional Fields based on serviceBasis */}
                {formData.serviceBasis === 'monthly' ? (
                  <div className="bg-gray-50/80 border border-gray-200 rounded-2xl p-6 space-y-6">
                    <h4 className="text-sm font-bold text-[#8C1538] uppercase tracking-wide">
                      {L('I. මාසික පදනම වන විට (Kg)', 'I. Monthly Quantities (in Kg)', 'I. மாதாந்திர அளவுகள் (Kg)')}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block mb-2">
                          <span className="block text-sm sm:text-base font-bold text-gray-900">
                            {L('• මසකට ඉවත්කරන දිරන කසල ප්‍රමාණය (Kg)', '• Monthly Biodegradable Waste (Kg)', '• மாதாந்திர மக்கும் கழிவுகள் (Kg)')}
                          </span>
                        </label>
                        <input
                          type="number"
                          name="biodegradableKg"
                          value={formData.biodegradableKg}
                          onChange={handleInputChange}
                          placeholder="e.g. 450"
                          className="w-full bg-white border border-gray-300 focus:border-[#8C1538] focus:ring-4 focus:ring-[#8C1538]/10 rounded-xl px-4 py-3 text-sm sm:text-base font-bold text-gray-900 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block mb-2">
                          <span className="block text-sm sm:text-base font-bold text-gray-900">
                            {L('• මසකට ඉවත්කරන නොදිරන කසල ප්‍රමාණය (Kg)', '• Monthly Non-Biodegradable Waste (Kg)', '• மாதாந்திர மக்காத கழிவுகள் (Kg)')}
                          </span>
                        </label>
                        <input
                          type="number"
                          name="nonBiodegradableKg"
                          value={formData.nonBiodegradableKg}
                          onChange={handleInputChange}
                          placeholder="e.g. 180"
                          className="w-full bg-white border border-gray-300 focus:border-[#8C1538] focus:ring-4 focus:ring-[#8C1538]/10 rounded-xl px-4 py-3 text-sm sm:text-base font-bold text-gray-900 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50/80 border border-gray-200 rounded-2xl p-6 space-y-4">
                    <h4 className="text-sm font-bold text-[#8C1538] uppercase tracking-wide">
                      {L('II. හදිසි ඉවත්කිරීම (ලෝඩ් ගණන)', 'II. Emergency Bulk Clearance', 'II. அவசர மொத்த அகற்றம்')}
                    </h4>
                    <div>
                      <label className="block mb-2">
                        <span className="block text-sm sm:text-base font-bold text-gray-900">
                          {L('• හදිසි ඉවත්කිරීම ලෝඩ් ප්‍රමාණය', '• Tractor / Truck Load Quantity', '• டிராக்டர் / லாரி சுமை எண்ணிக்கை')}
                        </span>
                      </label>
                      <input
                        type="number"
                        step="1"
                        name="emergencyLoadCount"
                        value={formData.emergencyLoadCount}
                        onChange={handleInputChange}
                        placeholder="e.g. 1"
                        className="w-full bg-white border border-gray-300 focus:border-[#8C1538] focus:ring-4 focus:ring-[#8C1538]/10 rounded-xl px-4 py-3 text-sm sm:text-base font-bold text-gray-900 max-w-xs transition-all"
                      />
                    </div>
                  </div>
                )}

                {/* Tariff Estimator Banner */}
                <div className="bg-red-50/60 border border-red-100 rounded-2xl p-5 flex items-center justify-between">
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-[#8C1538] uppercase">
                      {L('ඇස්තමේන්තුගත සේවා ගාස්තුව', 'Estimated Municipal Service Tariff', 'மதிப்பிடப்பட்ட சேவை கட்டணம்')}
                    </div>
                    <div className="text-xs font-medium text-gray-600 mt-0.5">
                      {L('ප්‍රකාශිත කසල ප්‍රමාණය මත ගණනය කර ඇත', 'Calculated based on declared waste quantities & category', 'அறிவிக்கப்பட்ட அளவின் அடிப்படையில் கணக்கிடப்பட்டது')}
                    </div>
                  </div>
                  <div className="text-lg sm:text-xl font-extrabold text-[#8C1538] bg-white px-5 py-2 rounded-xl border border-gray-200 shadow-2xs">
                    LKR {calculateEstimate().toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Section 3: Declaration & Applicant Signature */}
              <div className="bg-white rounded-2xl border border-gray-200/90 p-6 sm:p-8 shadow-xs space-y-6">
                <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                  <span className="bg-[#8C1538] text-white w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm shrink-0">
                    03
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900">
                      {L('ප්‍රකාශය සහ අත්සන', 'Declaration & Signature', 'உறுதிமொழி மற்றும் கையொப்பம்')}
                    </h3>
                  </div>
                </div>

                <label className="flex items-start gap-3.5 cursor-pointer select-none bg-gray-50 p-4 rounded-xl border border-gray-200/80">
                  <input
                    type="checkbox"
                    name="agreedToWasteGuidelines"
                    checked={formData.agreedToWasteGuidelines}
                    onChange={handleInputChange}
                    className="w-5 h-5 rounded border-gray-300 text-[#8C1538] focus:ring-[#8C1538] mt-0.5 shrink-0"
                  />
                  <span className="text-xs sm:text-sm font-bold text-gray-900 leading-relaxed">
                    {L(
                      'ඉහත සඳහන් තොරතුරු සත්‍ය හා නිවැරදි බවත්, ප්‍රාදේශීය සභාවේ කසළ වෙන්කිරීමේ නියමයන්ට එකඟ වන බවත් ප්‍රකාශ කරමි.',
                      'I declare that the details provided are accurate and agree to abide by Homagama Pradeshiya Sabha solid waste segregation regulations.',
                      'மேலே உள்ள தகவல்கள் சரியானவை மற்றும் பிரதேச சபை கழிவுப் பிரிப்பு விதிகளுக்கு கட்டுப்படுவேன் என்று அறிவிக்கிறேன்.'
                    )}
                  </span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  <div>
                    <label className="block mb-2">
                      <span className="block text-sm sm:text-base font-bold text-gray-900">{L('දිනය', 'Date', 'திகதி')} <span className="text-red-500">*</span></span>
                    </label>
                    <input
                      type="date"
                      name="submissionDate"
                      required
                      value={formData.submissionDate}
                      onChange={handleInputChange}
                      className="w-full bg-gray-50/70 border border-gray-300 focus:bg-white focus:border-[#8C1538] focus:ring-4 focus:ring-[#8C1538]/10 rounded-xl px-4 py-3 text-sm sm:text-base font-semibold text-gray-900 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block mb-2">
                      <span className="block text-sm sm:text-base font-bold text-gray-900">{L('අයදුම්කරුගේ අත්සන', 'Applicant\'s Signature', 'விண்ணப்பதாரரின் கையொப்பம்')} <span className="text-red-500">*</span></span>
                    </label>
                    <input
                      type="text"
                      name="applicantSignature"
                      required
                      value={formData.applicantSignature}
                      onChange={handleInputChange}
                      placeholder="e.g. N. Jayatilleke"
                      className="w-full bg-gray-50/70 border border-gray-300 focus:bg-white focus:border-[#8C1538] focus:ring-4 focus:ring-[#8C1538]/10 rounded-xl px-4 py-3 text-sm sm:text-base font-semibold text-gray-900 focus:outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-sm sm:text-base font-bold transition-all cursor-pointer"
                >
                  {L('අවලංගු කරන්න', 'Cancel', 'ரத்து செய்')}
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#8C1538] to-[#73102d] hover:from-[#73102d] hover:to-[#5a0c23] text-white text-sm sm:text-base font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  {L('අයදුම්පත ඉදිරිපත් කරන්න', 'Submit Waste Removal Request', 'விண்ணப்பத்தை சமர்ப்பிக்கவும்')}
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};

export default WasteRemovalFormModal;
