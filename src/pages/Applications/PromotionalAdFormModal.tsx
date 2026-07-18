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

const UploadIcon = () => (
  <svg className="w-7 h-7 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
  </svg>
);

const PromotionalAdFormModal = ({ isOpen, onClose, applicationTitle, onAddApplication }: any) => {
  const { language: activeLanguage, changeLanguage } = useLanguage();
  const lang = activeLanguage || 'si';
  const L = (siText: string, enText: string, taText?: string) => lang === 'si' ? siText : lang === 'ta' ? (taText || enText) : enText;

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceNo, setReferenceNo] = useState('');

  const [formData, setFormData] = useState({
    // 01 - 04. Applicant Details
    applicantFullName: '',
    permanentAddress: '',
    nicNumber: '',
    telephoneNumber: '',

    // 05 - 06. Display Location Details
    promotionalLocationAddress: '',
    locationOwnerAddress: '',

    // 07. Nature of Advertisement & Design Artwork
    advertisementNature: '',
    artworkFileName: null as string | null,

    // 08. Type & Dimensions
    advertisementType: 'banner', // 'banner' | 'board'
    lengthFeet: '',
    widthFeet: '',

    // 09. Duration
    durationCategory: '3months', // '3months' | '6months' | '1year'

    // 10. Agreement on Rectifying/Repairing Damage
    agreedToRepairDamage: true,
    repairAgreementNotes: '',

    // Statutory Declaration
    agreedToDeclaration: false,
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAutoFill = () => {
    setFormData({
      applicantFullName: 'Roshan K. Gunawardena',
      permanentAddress: 'No. 112, High Level Road, Homagama',
      nicNumber: '198731402281',
      telephoneNumber: '077 458 9632',
      promotionalLocationAddress: 'High Level Junction, Homagama Town (Near Clock Tower)',
      locationOwnerAddress: 'Pradeshiya Sabha Commercial Zone / Public Easement',
      advertisementNature: 'Annual Trade Fair & Agricultural Exhibition Promotional Banner',
      artworkFileName: 'EXHIBITION_BANNER_FINAL_2026.PNG',
      advertisementType: 'banner',
      lengthFeet: '12',
      widthFeet: '4',
      durationCategory: '3months',
      agreedToRepairDamage: true,
      repairAgreementNotes: 'Will immediately replace or remove banner if discolored or detached.',
      agreedToDeclaration: true,
      submissionDate: new Date().toISOString().split('T')[0],
      applicantSignature: 'R. Gunawardena'
    });
  };

  const calculateAreaAndFee = () => {
    const len = parseFloat(formData.lengthFeet) || 0;
    const wid = parseFloat(formData.widthFeet) || 0;
    const sqFeet = len * wid;
    let ratePerSqFt = formData.advertisementType === 'banner' ? 120 : 250;
    let multiplier = 1;
    if (formData.durationCategory === '6months') multiplier = 1.8;
    if (formData.durationCategory === '1year') multiplier = 3.0;
    const estimatedFee = Math.round(sqFeet * ratePerSqFt * multiplier);
    return { sqFeet, estimatedFee };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreedToDeclaration) {
      alert('කරුණාකර ඉහත ප්‍රකාශයට සහ නියමයන්ට එකඟ බව තහවුරු කරන්න / Please acknowledge and agree to the statutory declaration.');
      return;
    }
    const randomRef = 'HMG-AD-' + Math.floor(100000 + Math.random() * 900000);
    setReferenceNo(randomRef);
    setIsSubmitted(true);
    if (onAddApplication) {
      onAddApplication({
        id: randomRef,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        category: applicationTitle || 'Promotional Advertisement Display Permit',
        categoryCode: 'promotional-ad-permit',
        status: 'PENDING',
        applicantName: (formData as any).applicantFullName || (formData as any).applicantName || 'Roshan K. Gunawardena',
        nicNumber: (formData as any).nicNumber || '198731402281',
        phone: (formData as any).telephoneNumber || '077 458 9632',
        address: (formData as any).permanentAddress || 'No. 112, High Level Road, Homagama',
        locationAddress: (formData as any).promotionalLocationAddress || 'Homagama Town',
        details: `${(formData as any).advertisementNature || 'Promotional Banner'} (${(formData as any).lengthFeet}ft x ${(formData as any).widthFeet}ft)`,
        documentName: (formData as any).artworkFileName || 'EXHIBITION_BANNER.PNG',
        inspectionDate: null,
        approvalDate: null
      });
    }
  };

  const resetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  const { sqFeet, estimatedFee } = calculateAreaAndFee();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-1.5 sm:p-6 bg-black/65 backdrop-blur-sm overflow-hidden animate-fadeIn select-none font-sans">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#F8FAFC] rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[96vh] sm:max-h-[88vh] overflow-hidden shadow-2xl border border-gray-200 flex flex-col my-auto text-left"
      >

        {/* Modal Header Banner */}
        <div className="bg-gradient-to-r from-[#8C1538] to-[#5e0d23] text-white px-3 sm:px-8 py-2.5 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 relative shadow-md shrink-0">
          <div className="space-y-0.5 sm:space-y-1.5 min-w-0">
            <div className="flex flex-wrap items-center gap-1 sm:gap-2">

            </div>
            <h2 className="text-base sm:text-2xl font-extrabold tracking-tight leading-tight pt-0.5 sm:pt-1">
              {L(
                'ප්‍රචාරක දැන්වීම් ප්‍රදර්ශනය කිරීම සම්බන්ධ අයදුම් පත්‍රය',
                'Application for Displaying Promotional Advertisements & Signboards',
                'விளம்பரங்கள் மற்றும் பதாகைகள் காட்சிப்படுத்துவதற்கான விண்ணப்பம்'
              )}
            </h2>
            <p className="text-[11px] sm:text-sm text-white/90 font-medium">
              {L(
                'වාණිජ බැනර් සහ පුවරු ප්‍රදර්ශන බලපත්‍රය',
                'Commercial Banner & Signboard Display Permit Application',
                'வணிக பதாகை மற்றும் காட்சி அனுமதி விண்ணப்பம்'
              )}
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-between sm:justify-end gap-2 sm:gap-2.5 shrink-0 self-stretch sm:self-center pt-2 sm:pt-0 border-t border-white/10 sm:border-0 w-full sm:w-auto">
            {/* Language Switcher Pill */}
            <div className="flex items-center bg-black/25 p-1 rounded-xl border border-white/20 shrink-0">
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
                title="Fill sample commercial banner permit data"
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
        <div className="p-3 sm:p-8 overflow-y-auto space-y-5 sm:space-y-8 flex-grow">
          {isSubmitted ? (
            /* Submission Confirmation Screen */
            <div className="bg-white rounded-2xl border border-gray-200/80 p-8 text-center space-y-6 shadow-sm">
              <CheckCircleIcon />
              <div className="space-y-2">
                <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 uppercase tracking-wide">
                  අයදුම්පත ලියාපදිංචි කරන ලදී • Request Logged
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                  ප්‍රචාරක දැන්වීම් ප්‍රදර්ශන බලපත්‍ර අයදුම්පත සාර්ථකව ඉදිරිපත් කරන ලදී!
                </h3>
                <p className="text-base font-semibold text-gray-700">
                  Promotional Advertisement Display Permit Application Successfully Submitted!
                </p>
                <p className="text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
                  Your application has been received by the Homagama Pradeshiya Sabha Revenue & Planning Inspectorate. Inspection schedule and fee voucher will be notified via SMS.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 max-w-lg mx-auto text-left space-y-3.5 shadow-xs">
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Permit Reference ID</span>
                  <span className="font-mono font-bold text-lg text-[#8C1538] bg-red-50 px-3.5 py-1 rounded-lg border border-red-100">
                    {referenceNo}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 font-medium">Applicant Name:</span>
                  <span className="font-bold text-gray-900 truncate max-w-[220px]">{formData.applicantFullName || 'Citizen'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 font-medium">Display Category:</span>
                  <span className="font-bold text-gray-900">
                    {formData.advertisementType === 'banner' ? 'I. බැනර් (Banner)' : 'II. පුවරු (Board / Hoarding)'}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 font-medium">Display Dimensions:</span>
                  <span className="font-bold text-gray-900">
                    {formData.lengthFeet || 0} ft × {formData.widthFeet || 0} ft ({sqFeet} sq.ft)
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 font-medium">Requested Duration:</span>
                  <span className="font-bold text-gray-900">
                    {formData.durationCategory === '3months' && 'මාස 3ක් හෝ ඊට අඩු'}
                    {formData.durationCategory === '6months' && 'මාස 6ක් හෝ ඊට අඩු'}
                    {formData.durationCategory === '1year' && 'වසර 1ක් (දෙසැ. 31 දක්වා)'}
                  </span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
                  <span className="text-gray-600 font-medium">Estimated Municipal Fee:</span>
                  <span className="font-extrabold text-base text-[#8C1538]">
                    LKR {estimatedFee.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => alert(`Downloading Promotional Advertisement Application Receipt (${referenceNo})...`)}
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
            /* Full Form Matching Official Paper Application */
            <form id="promotional-ad-form" onSubmit={handleSubmit} className="space-y-6">

              {/* Section 1: Applicant Information (Fields 01 - 04) */}
              <div className="bg-white rounded-2xl border border-gray-200/90 p-4 sm:p-6 md:p-8 shadow-xs space-y-5 sm:space-y-6">
                <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                  <span className="bg-[#8C1538] text-white w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm shrink-0">
                    01
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900">
                      {L('අයදුම්කරුගේ තොරතුරු (01 - 04)', 'Applicant Information (Fields 01 - 04)', 'விண்ணப்பதாரர் தகவல்கள் (01 - 04)')}
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block mb-2">
                      <span className="block text-sm sm:text-base font-bold text-gray-900">
                        {L('01. අයදුම්කරුගේ සම්පූර්ණ නම', '01. Applicant\'s Full Name', '01. விண்ணப்பதாரரின் முழு பெயர்')} <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      name="applicantFullName"
                      required
                      value={formData.applicantFullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Roshan K. Gunawardena"
                      className="w-full bg-gray-50/70 border border-gray-300 focus:bg-white focus:border-[#8C1538] focus:ring-4 focus:ring-[#8C1538]/10 rounded-xl px-4 py-3 text-sm sm:text-base font-medium text-gray-900 focus:outline-none transition-all"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block mb-2">
                      <span className="block text-sm sm:text-base font-bold text-gray-900">
                        {L('02. ස්ථිර ලිපිනය', '02. Permanent Address', '02. நிரந்தர முகவரி')} <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      name="permanentAddress"
                      required
                      value={formData.permanentAddress}
                      onChange={handleInputChange}
                      placeholder="e.g. No. 112, High Level Road, Homagama"
                      className="w-full bg-gray-50/70 border border-gray-300 focus:bg-white focus:border-[#8C1538] focus:ring-4 focus:ring-[#8C1538]/10 rounded-xl px-4 py-3 text-sm sm:text-base font-medium text-gray-900 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block mb-2">
                      <span className="block text-sm sm:text-base font-bold text-gray-900">
                        {L('03. ජාතික හැඳුනුම්පත් අංකය', '03. National Identity Card Number', '03. தேசிய அடையாள அட்டை எண்')} <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      name="nicNumber"
                      required
                      value={formData.nicNumber}
                      onChange={handleInputChange}
                      placeholder="e.g. 198731402281"
                      className="w-full bg-gray-50/70 border border-gray-300 focus:bg-white focus:border-[#8C1538] focus:ring-4 focus:ring-[#8C1538]/10 rounded-xl px-4 py-3 text-sm sm:text-base font-semibold text-gray-900 focus:outline-none transition-all font-mono"
                    />
                  </div>

                  <div>
                    <label className="block mb-2">
                      <span className="block text-sm sm:text-base font-bold text-gray-900">
                        {L('04. දුරකථන අංකය', '04. Telephone Number', '04. தொலைபேசி எண்')} <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      name="telephoneNumber"
                      required
                      value={formData.telephoneNumber}
                      onChange={handleInputChange}
                      placeholder="e.g. 077 458 9632"
                      className="w-full bg-gray-50/70 border border-gray-300 focus:bg-white focus:border-[#8C1538] focus:ring-4 focus:ring-[#8C1538]/10 rounded-xl px-4 py-3 text-sm sm:text-base font-semibold text-gray-900 focus:outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Display Location Details (Fields 05 - 06) */}
              <div className="bg-white rounded-2xl border border-gray-200/90 p-4 sm:p-6 md:p-8 shadow-xs space-y-5 sm:space-y-6">
                <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                  <span className="bg-[#8C1538] text-white w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm shrink-0">
                    02
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900">
                      {L(
                        'ප්‍රචාරක දැන්වීම් ප්‍රදර්ශනය කරන ස්ථානය පිළිබඳ විස්තර (05 - 06)',
                        'Promotional Location Details (Fields 05 - 06)',
                        'விளம்பரம் காட்சிப்படுத்தும் இடத்தின் விவரங்கள் (05 - 06)'
                      )}
                    </h3>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block mb-2">
                      <span className="block text-sm sm:text-base font-bold text-gray-900">
                        {L(
                          '05. ප්‍රචාරක දැන්වීම් ප්‍රදර්ශනය කිරීමට බලාපොරොත්තු වන ස්ථානයේ ලිපිනය',
                          '05. Address of intended advertisement display location',
                          '05. விளம்பரம் காட்சிப்படுத்தப்படும் இடத்தின் முகவரி'
                        )} <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      name="promotionalLocationAddress"
                      required
                      value={formData.promotionalLocationAddress}
                      onChange={handleInputChange}
                      placeholder="e.g. High Level Junction, Homagama Town (Near Clock Tower)"
                      className="w-full bg-gray-50/70 border border-gray-300 focus:bg-white focus:border-[#8C1538] focus:ring-4 focus:ring-[#8C1538]/10 rounded-xl px-4 py-3 text-sm sm:text-base font-medium text-gray-900 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block mb-2">
                      <span className="block text-sm sm:text-base font-bold text-gray-900">
                        {L(
                          '06. අදාළ ස්ථානය පෞද්ගලික ඉඩමක් නම් අයිතිකරුගේ ලිපිනය',
                          '06. Address of property owner (if displayed on private premises)',
                          '06. காணி உரிமையாளரின் முகவரி (தனியார் காணியாக இருந்தால்)'
                        )}
                      </span>
                    </label>
                    <input
                      type="text"
                      name="locationOwnerAddress"
                      value={formData.locationOwnerAddress}
                      onChange={handleInputChange}
                      placeholder="e.g. Public Road Reserve / Commercial Zone or Private Property Owner Address"
                      className="w-full bg-gray-50/70 border border-gray-300 focus:bg-white focus:border-[#8C1538] focus:ring-4 focus:ring-[#8C1538]/10 rounded-xl px-4 py-3 text-sm sm:text-base font-medium text-gray-900 focus:outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Nature of Advertisement & Artwork (Field 07) */}
              <div className="bg-white rounded-2xl border border-gray-200/90 p-4 sm:p-6 md:p-8 shadow-xs space-y-5 sm:space-y-6">
                <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                  <span className="bg-[#8C1538] text-white w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm shrink-0">
                    03
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900">
                      {L(
                        'දැන්වීම පිළිබඳ විස්තරය සහ සැලැස්ම (07)',
                        'Nature of Advertisement & Artwork Sketch (Field 07)',
                        'விளம்பரத்தின் தன்மை மற்றும் வடிவமைப்பு (07)'
                      )}
                    </h3>
                  </div>
                </div>

                <div>
                  <label className="block mb-2">
                    <span className="block text-sm sm:text-base font-bold text-gray-900">
                      {L(
                        '07. ප්‍රදර්ශනය කිරීමට බලාපොරොත්තු වන දැන්වීම පිළිබඳ විස්තරය',
                        '07. Description of the promotional advertisement / event / business',
                        '07. விளம்பரம் / நிகழ்வு பற்றிய விளக்கம்'
                      )} <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <textarea
                    rows={2}
                    name="advertisementNature"
                    required
                    value={formData.advertisementNature}
                    onChange={handleInputChange}
                    placeholder="e.g. Annual Trade Fair & Agricultural Exhibition Promotional Banner"
                    className="w-full bg-gray-50/70 border border-gray-300 focus:bg-white focus:border-[#8C1538] focus:ring-4 focus:ring-[#8C1538]/10 rounded-xl px-4 py-3 text-sm sm:text-base font-medium text-gray-900 focus:outline-none transition-all"
                  />
                </div>

                {/* Artwork Attachment Box */}
                <div className="space-y-3">
                  <label className="block text-xs sm:text-sm font-bold text-gray-700 uppercase tracking-wide">
                    {L(
                      'දැන්වීමේ ආකෘතිය / ආදර්ශ සැලැස්ම (Artwork Layout Sketch / Attachment)',
                      'Artwork Layout Sketch / Attachment (Optional preview file)',
                      'வடிவமைப்பு ஆவணம் / வரைபடம்'
                    )}
                  </label>

                  <div
                    onClick={() => setFormData((p) => ({ ...p, artworkFileName: p.artworkFileName ? null : 'HOMAGAMA_FESTIVAL_BANNER_DESIGN_2026.PNG' }))}
                    className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${formData.artworkFileName
                      ? 'border-[#8C1538] bg-red-50/50'
                      : 'border-gray-300 hover:border-[#8C1538] bg-gray-50/50'
                      }`}
                  >
                    {formData.artworkFileName ? (
                      <div className="space-y-1">
                        <div className="text-sm font-bold text-gray-900">📎 Attached Design Sketch:</div>
                        <div className="text-sm font-mono font-bold text-[#8C1538]">{formData.artworkFileName}</div>
                        <div className="text-xs text-gray-500">Click to replace or remove sample file</div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <UploadIcon />
                        <div className="text-sm font-bold text-gray-800">
                          {L(
                            'දැන්වීමේ ආදර්ශ සැලැස්ම මෙතනින් ඇතුළත් කරන්න',
                            'Click to upload advertisement artwork / sketch image',
                            'வடிவமைப்பு ஆவணத்தைப் பதிவேற்ற கிளிக் செய்யவும்'
                          )}
                        </div>
                        <div className="text-xs text-gray-500">
                          Supported formats: PNG, JPG, PDF (Max size 10MB)
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Section 4: Type & Dimensions (Fields 08 - 09) */}
              <div className="bg-white rounded-2xl border border-gray-200/90 p-4 sm:p-6 md:p-8 shadow-xs space-y-5 sm:space-y-6">
                <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                  <span className="bg-[#8C1538] text-white w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm shrink-0">
                    05
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900">
                      {L(
                        'දැන්වීම් වර්ගය සහ ප්‍රමාණය (08)',
                        'Advertisement Type & Dimensions (Field 08)',
                        'விளம்பரத்தின் வகை மற்றும் அளவுகள் (08)'
                      )}
                    </h3>
                  </div>
                </div>

                <div>
                  <label className="block mb-3">
                    <span className="block text-sm sm:text-base font-bold text-gray-900">
                      {L(
                        '08. ප්‍රදර්ශනය කිරීමට බලාපොරොත්තු වන දැන්වීම් වර්ගය',
                        '08. Select Advertisement Category',
                        '08. விளம்பர வகையைத் தேர்ந்தெடுக்கவும்'
                      )} <span className="text-red-500">*</span>
                    </span>
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    <button
                      type="button"
                      onClick={() => setFormData((p) => ({ ...p, advertisementType: 'banner' }))}
                      className={`cursor-pointer border-2 rounded-2xl p-3.5 sm:p-4 flex items-center gap-3 text-left transition-all ${formData.advertisementType === 'banner'
                        ? 'border-[#8C1538] bg-red-50/50 shadow-sm'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${formData.advertisementType === 'banner' ? 'border-[#8C1538]' : 'border-gray-300'}`}>
                        {formData.advertisementType === 'banner' && <div className="w-2.5 h-2.5 rounded-full bg-[#8C1538]" />}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-gray-900">{L('I. බැනර් (Banner)', 'I. Banner', 'I. பதாகை (Banner)')}</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData((p) => ({ ...p, advertisementType: 'board' }))}
                      className={`cursor-pointer border-2 rounded-2xl p-3.5 sm:p-4 flex items-center gap-3 text-left transition-all ${formData.advertisementType === 'board'
                        ? 'border-[#8C1538] bg-red-50/50 shadow-sm'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${formData.advertisementType === 'board' ? 'border-[#8C1538]' : 'border-gray-300'}`}>
                        {formData.advertisementType === 'board' && <div className="w-2.5 h-2.5 rounded-full bg-[#8C1538]" />}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-gray-900">{L('II. පුවරු (Board / Hoarding)', 'II. Board / Hoarding', 'II. பலகை (Board)')}</div>
                      </div>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  <div>
                    <label className="block mb-2">
                      <span className="block text-sm sm:text-base font-bold text-gray-900">
                        {L('දිග (අඩි වලින්)', 'Length (in Feet)', 'நீளம் (அடியில்)')} <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <input
                      type="number"
                      name="lengthFeet"
                      required
                      min="1"
                      value={formData.lengthFeet}
                      onChange={handleInputChange}
                      placeholder="e.g. 12"
                      className="w-full bg-gray-50/70 border border-gray-300 focus:bg-white focus:border-[#8C1538] focus:ring-4 focus:ring-[#8C1538]/10 rounded-xl px-4 py-3 text-sm sm:text-base font-bold text-gray-900 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block mb-2">
                      <span className="block text-sm sm:text-base font-bold text-gray-900">
                        {L('පළල (අඩි වලින්)', 'Width (in Feet)', 'அகலம் (அடியில்)')} <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <input
                      type="number"
                      name="widthFeet"
                      required
                      min="1"
                      value={formData.widthFeet}
                      onChange={handleInputChange}
                      placeholder="e.g. 4"
                      className="w-full bg-gray-50/70 border border-gray-300 focus:bg-white focus:border-[#8C1538] focus:ring-4 focus:ring-[#8C1538]/10 rounded-xl px-4 py-3 text-sm sm:text-base font-bold text-gray-900 transition-all"
                    />
                  </div>
                </div>

                <div className="bg-red-50/60 border border-red-100 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-[#8C1538] uppercase">
                      {L('මුළු වර්ග අඩි ප්‍රමාණය සහ ගණනය කළ ගාස්තුව', 'Total Area & Estimated Municipal Fee', 'மொத்த பரப்பளவு மற்றும் மதிப்பிடப்பட்ட கட்டணம்')}
                    </div>
                  </div>
                  <div className="text-lg sm:text-xl font-extrabold text-[#8C1538] bg-white px-5 py-2 rounded-xl border border-gray-200 shadow-2xs">
                    LKR {estimatedFee.toLocaleString()}
                  </div>
                </div>

                <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-4 text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
                  {L(
                    '* සෑම ප්‍රචාරක දැන්වීම් බලපත්‍රයකම වලංගු කාලය එම වර්ෂයේ දෙසැම්බර් මස 31 දිනෙන් අවසන් වේ.',
                    '* All annual promotional advertisement permits expire on December 31st of the calendar year.',
                    '* அனைத்து விளம்பர அனுமதிகளும் டிசம்பர் 31 அன்று முடிவடையும்.'
                  )}
                </div>
              </div>

              {/* Section 5: Agreement on Rectifying/Repairing Damage (Field 10) */}
              <div className="bg-white rounded-2xl border border-gray-200/90 p-4 sm:p-6 md:p-8 shadow-xs space-y-5 sm:space-y-6">
                <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                  <span className="bg-[#8C1538] text-white w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm shrink-0">
                    06
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900">
                      {L(
                        'නඩත්තු සහ හානි පිළිසකර කිරීමේ එකඟතාව (10)',
                        'Rectification & Maintenance Agreement (Field 10)',
                        'பராமரிப்பு மற்றும் சீரமைப்பு ஒப்பந்தம் (10)'
                      )}
                    </h3>
                  </div>
                </div>

                <label className="flex items-start gap-3.5 cursor-pointer select-none bg-gray-50 p-4 rounded-xl border border-gray-200/80">
                  <input
                    type="checkbox"
                    name="agreedToRepairDamage"
                    checked={formData.agreedToRepairDamage}
                    onChange={handleInputChange}
                    className="w-5 h-5 rounded border-gray-300 text-[#8C1538] focus:ring-[#8C1538] mt-0.5 shrink-0"
                  />
                  <span className="text-xs sm:text-sm font-bold text-gray-900 leading-relaxed">
                    {L(
                      '10. අදාළ දැන්වීම අවපැහැ ගැන්වීම, ගැලවී යාම හෝ හානියට පත්වීම සිදු වුවහොත් වහාම ඉවත් කිරීමට හෝ නිවැරදි කිරීමට එකඟ වෙමි.',
                      '10. I agree to immediately repair, rectify or remove the advertisement if it becomes discolored, detached, or damaged.',
                      '10. விளம்பரம் சேதமடைந்தால் அல்லது நிறமிழந்தால் உடனடியாக சரிசெய்ய அல்லது அகற்ற சம்மதிக்கிறேன்.'
                    )}
                  </span>
                </label>
              </div>

              {/* Section 6: Statutory Declaration */}
              <div className="bg-white rounded-2xl border border-gray-200/90 p-4 sm:p-6 md:p-8 shadow-xs space-y-5 sm:space-y-6">
                <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                  <span className="bg-[#8C1538] text-white w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm shrink-0">
                    07
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900">
                      {L('ප්‍රකාශය සහ අත්සන', 'Statutory Declaration & Signature', 'உறுதிமொழி மற்றும் கையொப்பம்')}
                    </h3>
                  </div>
                </div>

                <label className="flex items-start gap-3.5 cursor-pointer select-none bg-gray-50 p-4 rounded-xl border border-gray-200/80">
                  <input
                    type="checkbox"
                    name="agreedToDeclaration"
                    checked={formData.agreedToDeclaration}
                    onChange={handleInputChange}
                    className="w-5 h-5 rounded border-gray-300 text-[#8C1538] focus:ring-[#8C1538] mt-0.5 shrink-0"
                  />
                  <span className="text-xs sm:text-sm font-bold text-gray-900 leading-relaxed">
                    {L(
                      'ඉහත ප්‍රකාශයට සහ නියමයන්ට එකඟ වෙමි. ඉදිරිපත් කරන ලද සියලු විස්තර සත්‍ය හා නිවැරදි බව ප්‍රකාශ කරමි.',
                      'I declare that all details provided above are true and accurate, and agree to abide by municipal advertisement regulations.',
                      'மேலே வழங்கப்பட்ட அனைத்து விவரங்களும் உண்மையானவை என்று நான் அறிவிக்கிறேன்.'
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
                      placeholder="e.g. R. Gunawardena"
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
                  {L('බලපත්‍රය සඳහා අයදුම් කරන්න', 'Submit Permit Application', 'விண்ணப்பத்தை சமர்ப்பிக்கவும்')}
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};

export default PromotionalAdFormModal;
