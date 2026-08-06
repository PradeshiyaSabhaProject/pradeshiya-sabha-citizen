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

const ApplicationFormModal = ({ isOpen, onClose, applicationTitle, onAddApplication }: any) => {
  const { language: activeLanguage, changeLanguage } = useLanguage();
  const lang = activeLanguage || 'si';
  const L = (siText: string, enText: string, taText?: string) => lang === 'si' ? siText : lang === 'ta' ? (taText || enText) : enText;

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceNo, setReferenceNo] = useState('');

  const [formData, setFormData] = useState({
    // 01-02. Applicant Info
    applicantName: '',
    address: '',

    // 03-04. Land Info
    landName: '',
    village: '',
    varipanamNumber: '',
    roadName: '',
    planNumber: '',
    lotNumber: '',
    telephoneNumber: '',

    // 05. Reason & Institution
    reasonAndInstitution: '',

    // 06. Required Certificate Types (Checkboxes)
    certVaripanamPayment: false, // වරිපනම් ගෙවන / නොගෙවන බවට
    certStreetLineBuilding: true, // වීථි රේඛා නොපැවරීම / ගොඩනැගිලි සීමාව
    certPublicRoadMaint: false,  // ප්‍රාදේශීය සභාව නඩත්තු කරන / නොකරන පොදු පාරක් බව

    // Declaration & Signature (No Office Use Section)
    agreedToConditions: false,
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
      applicantName: 'Chaminda Perera',
      address: 'No. 45, Temple Road, Homagama',
      landName: 'Perera Gardens (පෙරේරා වත්ත)',
      village: 'Homagama North (උතුරු හෝමාගම)',
      varipanamNumber: '45/B',
      roadName: 'High Level Road (4th Cross Lane)',
      planNumber: 'SP-8894',
      lotNumber: 'Lot 02 A',
      telephoneNumber: '071 285 5230',
      reasonAndInstitution: 'For Housing Construction Mortgage Loan – Bank of Ceylon, Homagama Branch',
      certVaripanamPayment: true,
      certStreetLineBuilding: true,
      certPublicRoadMaint: false,
      agreedToConditions: true,
      submissionDate: new Date().toISOString().split('T')[0],
      applicantSignature: 'C. Perera'
    });
  };

  const calculateTotalFee = () => {
    let selectedCount = 0;
    if (formData.certVaripanamPayment) selectedCount++;
    if (formData.certStreetLineBuilding) selectedCount++;
    if (formData.certPublicRoadMaint) selectedCount++;
    return Math.max(1, selectedCount) * 800;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.certVaripanamPayment && !formData.certStreetLineBuilding && !formData.certPublicRoadMaint) {
      alert('කරුණාකර අවම වශයෙන් එක් සහතික වර්ගයක් හෝ තෝරන්න / Please select at least one required certificate under Section 06.');
      return;
    }
    if (!formData.agreedToConditions) {
      alert('කරුණාකර කොන්දේසි වලට යටත්ව ඉල්ලුම් කරන බව තහවුරු කරන්න / Please confirm your agreement to the statutory conditions.');
      return;
    }
    const randomRef = 'HMG-SL-' + Math.floor(100000 + Math.random() * 900000);
    setReferenceNo(randomRef);
    setIsSubmitted(true);
    if (onAddApplication) {
      onAddApplication({
        id: randomRef,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        category: applicationTitle || 'Street Line & Building Limit Certificate',
        categoryCode: 'street-line-certificate',
        status: 'PENDING',
        applicantName: (formData as any).applicantName || 'Roshan Gunawardena',
        nicNumber: (formData as any).nicNumber || '198731402281',
        phone: (formData as any).phone || '077 458 9632',
        address: (formData as any).address || 'Homagama Town',
        locationAddress: `${(formData as any).wardNo || ''} ${(formData as any).streetName || ''}`,
        details: `Street Line & Non-Vesting Certificate (${(formData as any).assessmentNo || 'Lot 01'})`,
        documentName: 'SURVEY_PLAN_COPY.PDF',
        inspectionDate: null,
        approvalDate: null
      });
    }
  };

  const resetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-1.5 sm:p-6 bg-black/65 backdrop-blur-sm overflow-hidden animate-fadeIn select-none font-sans">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#F8FAFC] rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[96vh] sm:max-h-[88vh] overflow-hidden shadow-2xl border border-gray-200 flex flex-col my-auto text-left"
      >

        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-[#8C1538] to-[#6a102a] text-white px-3 sm:px-8 py-2.5 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 relative shadow-md shrink-0">
          <div className="space-y-0.5 sm:space-y-1.5 min-w-0">
            <h2 className="text-base sm:text-2xl font-extrabold tracking-tight leading-tight pt-0.5 sm:pt-1">
              {L(
                'වීථි රේඛා හා නොපවරා ගැනීමේ සහතික ඉල්ලුම් කිරීම',
                'Application for Street Line, Non-Vesting & Municipal Road Certificates',
                'வீதி எல்லை மற்றும் சுவீகரிப்பு அல்லாத சான்றிதழ்களுக்கான விண்ணப்பம்'
              )}
            </h2>
            <p className="text-[11px] sm:text-sm text-white/90 font-medium">
              {L(
                'නිල සහතික සඳහා මාර්ගගත අයදුම්පත',
                'Online Application for Official Municipal Certificates',
                'அதிகாரபூர்வ சான்றிதழ்களுக்கான ஆன்லைன் விண்ணப்பம்'
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
                title="Fill sample land & citizen data"
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
            /* Success Confirmation Screen */
            <div className="bg-white rounded-2xl border border-gray-200/80 p-8 text-center space-y-6 shadow-sm">
              <CheckCircleIcon />
              <div className="space-y-2">
                <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 uppercase tracking-wide">
                  අයදුම්පත භාර ගන්නා ලදී • Application Received
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                  සහතික අයදුම්පත සාර්ථකව ඉදිරිපත් කරන ලදී!
                </h3>
                <p className="text-base font-semibold text-gray-700">
                  Street Line & Municipal Certificate Application Successfully Submitted!
                </p>
                <p className="text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
                  Your application has been logged with the Homagama Pradeshiya Sabha Planning & Land Division. SMS notifications will be sent to your registered telephone number.
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
                  <span className="text-gray-600 font-medium">Applicant Name:</span>
                  <span className="font-bold text-gray-900 truncate max-w-[220px]">{formData.applicantName || 'Citizen'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 font-medium">Land Name & Plan:</span>
                  <span className="font-bold text-gray-900 truncate max-w-[220px]">
                    {formData.landName || 'Land'}, Plan {formData.planNumber || 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 font-medium">Requested Certificates:</span>
                  <div className="text-right font-bold text-gray-900 text-xs space-y-1">
                    {formData.certVaripanamPayment && <div>• වරිපනම් ගෙවන/නොගෙවන බවට</div>}
                    {formData.certStreetLineBuilding && <div>• වීථි රේඛා නොපැවරීම/ගොඩනැගිලි සීමාව</div>}
                    {formData.certPublicRoadMaint && <div>• ප්‍රාදේශීය සභාව නඩත්තු කරන පොදු පාරක් බව</div>}
                  </div>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
                  <span className="text-gray-600 font-medium">Total Statutory Fee:</span>
                  <span className="font-extrabold text-base text-[#8C1538]">
                    LKR {calculateTotalFee().toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 font-medium">Submission Date:</span>
                  <span className="font-semibold text-gray-900">{formData.submissionDate}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => alert(`Downloading Certificate Application Receipt (${referenceNo})...`)}
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
            /* Digitalized Form matching form1.jpeg exactly (No Office Use Only section) */
            <form id="street-line-certificate-form" onSubmit={handleSubmit} className="space-y-6">

              {/* Top Form Guidance Notice */}
              <div className="bg-amber-50/90 border border-amber-200/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                <div className="text-xs sm:text-sm text-amber-950 leading-relaxed">

                  {L(
                    'කරුණාකර සහතිකය අවශ්‍ය ඉඩම සහ අයදුම්කරු පිළිබඳ සියලු තොරතුරු පැහැදිලිව සම්පූර්ණ කරන්න.',
                    'Please fill out all applicant and land information required for the municipal certificate.',
                    'சான்றிதழுக்கு தேவையான விண்ணப்பதாரர் மற்றும் காணி பற்றிய அனைத்து தகவல்களையும் பூர்த்தி செய்யவும்.'
                  )}
                </div>
                <div className="text-xs font-mono font-bold text-[#8C1538] bg-white px-3 py-1.5 rounded-xl border border-amber-200 shrink-0 shadow-2xs">
                  {L('ගාස්තුව: සහතිකයකට රු. 800/=', 'Fee: LKR 800/= per Certificate', 'கட்டணம்: சான்றிதழுக்கு ரூ. 800/=')}
                </div>
              </div>

              {/* Section 1: Applicant Information (Fields 01 - 02) */}
              <div className="bg-white rounded-2xl border border-gray-200/90 p-4 sm:p-6 md:p-8 shadow-xs space-y-5 sm:space-y-6">
                <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                  <span className="bg-[#8C1538] text-white w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm shrink-0">
                    01
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900">
                      {L('අයදුම්කරුගේ තොරතුරු (01 - 02)', 'Applicant Information (Fields 01 - 02)', 'விண்ணப்பதாரரின் தகவல்கள் (01 - 02)')}
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2">
                      <span className="block text-sm sm:text-base font-bold text-gray-900">
                        {L('01. අයදුම්කරුගේ නම', '01. Applicant\'s Name', '01. விண்ணப்பதாரரின் பெயர்')} <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      name="applicantName"
                      required
                      value={formData.applicantName}
                      onChange={handleInputChange}
                      placeholder="e.g. Chaminda Perera"
                      className="w-full bg-gray-50/70 border border-gray-300 focus:bg-white focus:border-[#8C1538] focus:ring-4 focus:ring-[#8C1538]/10 rounded-xl px-4 py-3 text-sm sm:text-base font-medium text-gray-900 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block mb-2">
                      <span className="block text-sm sm:text-base font-bold text-gray-900">
                        {L('02. ලිපිනය', '02. Address', '02. முகவரி')} <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="e.g. No. 45, Temple Road, Homagama"
                      className="w-full bg-gray-50/70 border border-gray-300 focus:bg-white focus:border-[#8C1538] focus:ring-4 focus:ring-[#8C1538]/10 rounded-xl px-4 py-3 text-sm sm:text-base font-medium text-gray-900 focus:outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Land Details (Fields 03 - 04) */}
              <div className="bg-white rounded-2xl border border-gray-200/90 p-4 sm:p-6 md:p-8 shadow-xs space-y-5 sm:space-y-6">
                <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                  <span className="bg-[#8C1538] text-white w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm shrink-0">
                    02
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900">
                      {L('ඉඩම පිළිබඳ තොරතුරු (03 - 04)', 'Land Details (Fields 03 - 04)', 'காணி பற்றிய தகவல்கள் (03 - 04)')}
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block mb-2">
                      <span className="block text-sm sm:text-base font-bold text-gray-900">
                        {L('03. සහතික අවශ්‍ය ඉඩමේ නම', '03. Name of Land', '03. காணியின் பெயர்')} <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      name="landName"
                      required
                      value={formData.landName}
                      onChange={handleInputChange}
                      placeholder="e.g. Perera Gardens"
                      className="w-full bg-gray-50/70 border border-gray-300 focus:bg-white focus:border-[#8C1538] focus:ring-4 focus:ring-[#8C1538]/10 rounded-xl px-4 py-3 text-sm sm:text-base font-medium text-gray-900 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block mb-2">
                      <span className="block text-sm sm:text-base font-bold text-gray-900">
                        {L('04. i. ඉඩම පිහිටි ගම', '04. i. Village or Area', '04. i. கிராமம் அல்லது பிரதேசம்')} <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      name="village"
                      required
                      value={formData.village}
                      onChange={handleInputChange}
                      placeholder="e.g. Homagama North"
                      className="w-full bg-gray-50/70 border border-gray-300 focus:bg-white focus:border-[#8C1538] focus:ring-4 focus:ring-[#8C1538]/10 rounded-xl px-4 py-3 text-sm sm:text-base font-medium text-gray-900 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block mb-2">
                      <span className="block text-sm sm:text-base font-bold text-gray-900">
                        {L('04. ii. වරිපනම් අංකය', '04. ii. Assessment Number', '04. ii. வரிப்பண இலக்கம்')} <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      name="varipanamNumber"
                      required
                      value={formData.varipanamNumber}
                      onChange={handleInputChange}
                      placeholder="e.g. 45/B"
                      className="w-full bg-gray-50/70 border border-gray-300 focus:bg-white focus:border-[#8C1538] focus:ring-4 focus:ring-[#8C1538]/10 rounded-xl px-4 py-3 text-sm sm:text-base font-semibold text-gray-900 focus:outline-none transition-all font-mono"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block mb-2">
                      <span className="block text-sm sm:text-base font-bold text-gray-900">
                        {L('04. iii. පාර', '04. iii. Road / Street Name', '04. iii. வீதி / தெரு பெயர்')} <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      name="roadName"
                      required
                      value={formData.roadName}
                      onChange={handleInputChange}
                      placeholder="e.g. High Level Road (4th Cross Lane)"
                      className="w-full bg-gray-50/70 border border-gray-300 focus:bg-white focus:border-[#8C1538] focus:ring-4 focus:ring-[#8C1538]/10 rounded-xl px-4 py-3 text-sm sm:text-base font-medium text-gray-900 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block mb-2">
                      <span className="block text-sm sm:text-base font-bold text-gray-900">
                        {L('04. iv. මානක සැලසුම් අංකය', '04. iv. Survey Plan Number', '04. iv. அளவை வரைபட இலக்கம்')} <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      name="planNumber"
                      required
                      value={formData.planNumber}
                      onChange={handleInputChange}
                      placeholder="e.g. SP-8894"
                      className="w-full bg-gray-50/70 border border-gray-300 focus:bg-white focus:border-[#8C1538] focus:ring-4 focus:ring-[#8C1538]/10 rounded-xl px-4 py-3 text-sm sm:text-base font-semibold text-gray-900 focus:outline-none transition-all font-mono"
                    />
                  </div>

                  <div>
                    <label className="block mb-2">
                      <span className="block text-sm sm:text-base font-bold text-gray-900">
                        {L('04. v. කැබලි අංකය', '04. v. Lot Number', '04. v. துண்டு இலக்கம்')} <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      name="lotNumber"
                      required
                      value={formData.lotNumber}
                      onChange={handleInputChange}
                      placeholder="e.g. Lot 02 A"
                      className="w-full bg-gray-50/70 border border-gray-300 focus:bg-white focus:border-[#8C1538] focus:ring-4 focus:ring-[#8C1538]/10 rounded-xl px-4 py-3 text-sm sm:text-base font-medium text-gray-900 focus:outline-none transition-all"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block mb-2">
                      <span className="block text-sm sm:text-base font-bold text-gray-900">
                        {L('04. vi. දුරකථන අංකය', '04. vi. Telephone Number', '04. vi. தொலைபேசி எண்')} <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      name="telephoneNumber"
                      required
                      value={formData.telephoneNumber}
                      onChange={handleInputChange}
                      placeholder="e.g. 071 285 5230"
                      className="w-full bg-gray-50/70 border border-gray-300 focus:bg-white focus:border-[#8C1538] focus:ring-4 focus:ring-[#8C1538]/10 rounded-xl px-4 py-3 text-sm sm:text-base font-semibold text-gray-900 focus:outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Reason for Certificate (Field 05) */}
              <div className="bg-white rounded-2xl border border-gray-200/90 p-4 sm:p-6 md:p-8 shadow-xs space-y-5 sm:space-y-6">
                <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                  <span className="bg-[#8C1538] text-white w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm shrink-0">
                    03
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900">
                      {L('සහතිකය අවශ්‍ය කාරණය සහ ඉදිරිපත් කරන ආයතනය (05)', 'Reason for Certificate & Presenting Institution (05)', 'சான்றிதழுக்கான காரணம் மற்றும் சமர்ப்பிக்கும் நிறுவனம் (05)')}
                    </h3>
                  </div>
                </div>

                <div>
                  <label className="block mb-2">
                    <span className="block text-sm sm:text-base font-bold text-gray-900">
                      {L('05. සහතිකය අවශ්‍ය කාරණය සහ ඉදිරිපත් කරන ආයතනය', '05. Reason for Certificate & Name of Presenting Institution', '05. சான்றிதழுக்கான காரணம் மற்றும் நிறுவனம்')} <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    name="reasonAndInstitution"
                    required
                    value={formData.reasonAndInstitution}
                    onChange={handleInputChange}
                    placeholder="e.g. For Housing Construction Mortgage Loan – Bank of Ceylon, Homagama Branch"
                    className="w-full bg-gray-50/70 border border-gray-300 focus:bg-white focus:border-[#8C1538] focus:ring-4 focus:ring-[#8C1538]/10 rounded-xl px-4 py-3 text-sm sm:text-base font-medium text-gray-900 focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Section 4: Required Certificates (Field 06) */}
              <div className="bg-white rounded-2xl border border-gray-200/90 p-4 sm:p-6 md:p-8 shadow-xs space-y-5 sm:space-y-6">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="bg-[#8C1538] text-white w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm shrink-0">
                      04
                    </span>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-gray-900">
                        {L('06. අවශ්‍ය කරන සහතිකය', '06. Required Certificate Type', '06. தேவையான சான்றிதழ் வகை')}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3.5 sm:gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData((p) => ({ ...p, certVaripanamPayment: !p.certVaripanamPayment }))}
                    className={`cursor-pointer border-2 rounded-2xl p-3.5 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-left transition-all ${formData.certVaripanamPayment
                        ? 'border-[#8C1538] bg-red-50/50 shadow-sm'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 ${formData.certVaripanamPayment ? 'border-[#8C1538] bg-[#8C1538] text-white' : 'border-gray-300'}`}>
                        {formData.certVaripanamPayment && (
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-sm sm:text-base text-gray-900">{L('වරිපනම් ගෙවන / නොගෙවන බවට', 'Assessment Tax payment / non-payment verification certificate', 'வரிப்பண செலுத்துதல் / செலுத்தாதது சான்றிதழ்')}</div>
                      </div>
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-[#8C1538] bg-white px-3 py-1 rounded-lg border border-gray-200 shrink-0 self-end sm:self-center">LKR 800/=</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData((p) => ({ ...p, certStreetLineBuilding: !p.certStreetLineBuilding }))}
                    className={`cursor-pointer border-2 rounded-2xl p-3.5 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-left transition-all ${formData.certStreetLineBuilding
                        ? 'border-[#8C1538] bg-red-50/50 shadow-sm'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 ${formData.certStreetLineBuilding ? 'border-[#8C1538] bg-[#8C1538] text-white' : 'border-gray-300'}`}>
                        {formData.certStreetLineBuilding && (
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-sm sm:text-base text-gray-900">{L('වීථි රේඛා නොපැවරීම / ගොඩනැගිලි සීමාව', 'Street Line, Non-Vesting & Building Limit official certificate', 'வீதி எல்லை மற்றும் சுவீகரிப்பு அல்லாத சான்றிதழ்')}</div>
                      </div>
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-[#8C1538] bg-white px-3 py-1 rounded-lg border border-gray-200 shrink-0 self-end sm:self-center">LKR 800/=</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData((p) => ({ ...p, certPublicRoadMaint: !p.certPublicRoadMaint }))}
                    className={`cursor-pointer border-2 rounded-2xl p-3.5 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-left transition-all ${formData.certPublicRoadMaint
                        ? 'border-[#8C1538] bg-red-50/50 shadow-sm'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 ${formData.certPublicRoadMaint ? 'border-[#8C1538] bg-[#8C1538] text-white' : 'border-gray-300'}`}>
                        {formData.certPublicRoadMaint && (
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-sm sm:text-base text-gray-900">{L('ප්‍රාදේශීය සභාව නඩත්තු කරන / නොකරන පොදු පාරක් බව', 'Pradeshiya Sabha Public Road Maintenance status certificate', 'பிரதேச சபை பராமரிக்கும் பொது வீதி சான்றிதழ்')}</div>
                      </div>
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-[#8C1538] bg-white px-3 py-1 rounded-lg border border-gray-200 shrink-0 self-end sm:self-center">LKR 800/=</span>
                  </button>
                </div>
              </div>

              {/* Section 5: Conditions & Statutory Checklist */}
              <div className="bg-white rounded-2xl border border-gray-200/90 p-4 sm:p-6 md:p-8 shadow-xs space-y-5 sm:space-y-6">
                <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                  <span className="bg-[#8C1538] text-white w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm shrink-0">
                    05
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900">
                      {L('කොන්දේසි සහ එකඟතාවය (05)', 'Statutory Conditions & Checklist (05)', 'விதிமுறைகள் மற்றும் நிபந்தனைகள் (05)')}
                    </h3>
                  </div>
                </div>

                {/* Conditions box matching form1.jpeg exactly */}
                <div className="bg-red-50/60 border border-red-100 rounded-2xl p-5 space-y-3">
                  <div className="font-bold text-[#8C1538] uppercase text-xs tracking-wider">
                    {L('කොන්දේසි:', 'Mandatory Conditions:', 'கட்டாய நிபந்தனைகள்:')}
                  </div>
                  <ul className="space-y-2.5 list-disc list-inside text-xs sm:text-sm text-gray-800 leading-relaxed">
                    <li>
                      <span className="font-bold text-gray-900">
                        {L('අදාළ ගාස්තුව රු: 800/= කි.', 'Relevant fee is LKR 800/= per certificate.', 'சான்றிதழுக்கான கட்டணம் ரூ. 800/=')}
                      </span>
                    </li>
                    <li>
                      <span className="font-bold text-gray-900">
                        {L('ඉල්ලුම්කරුගේ/ අයිතිකරුගේ ජාතික හැඳුනුම්පතෙහි පිටපතක්', 'Copy of National Identity Card of applicant/owner', 'விண்ணப்பதாரரின் தேசிய அடையாள அட்டை நகல்')}
                      </span>
                    </li>
                    <li>
                      <span className="font-bold text-gray-900">
                        {L('අදාළ වර්ෂයට වරිපනම් බදු ගෙවූ ලදුපතෙහි පිටපතක්', 'Copy of Assessment tax receipt for the relevant year', 'சம்பந்தப்பட்ட ஆண்டிற்கான வரிப்பண பற்றுச்சீட்டு நகல்')}
                      </span>
                    </li>
                    <li>
                      <span className="font-bold text-gray-900">
                        {L('අනුමත සැලසුමෙහි (ඉඩමේ) පිටපතක්', 'Copy of approved survey plan of the land', 'காணியின் அங்கீகரிக்கப்பட்ட அளவை வரைபட நகல்')}
                      </span>
                    </li>
                    <li>
                      <span className="font-bold text-gray-900">
                        {L(
                          'වරිපනම් ලේඛනයේ නම අයිතිකරු ලෙස පමණක් සඳහන් නම් මෙය ඉල්ලුම් කිරීමට පෙර ඔප්පුවේ/ හිමිකම් සහතිකයේ පරිදි කාර්යාලයේ තිබෙන ඔප්පු සාරාංශ අයදුම්පත් (ATD) මඟින් නම සංශෝධනය කරගත යුතුය.',
                          'If Assessment register needs name amendment, ATD form correction should precede application submission.',
                          'வரிப்பணப் பதிவேட்டில் பெயர் திருத்தம் தேவைப்பட்டால், விண்ணப்பத்திற்கு முன் ATD திருத்தம் செய்யப்பட வேண்டும்.'
                        )}
                      </span>
                    </li>
                  </ul>
                </div>

                <label className="flex items-start gap-3.5 cursor-pointer select-none bg-gray-50 p-4 rounded-xl border border-gray-200/80">
                  <input
                    type="checkbox"
                    name="agreedToConditions"
                    checked={formData.agreedToConditions}
                    onChange={handleInputChange}
                    className="w-5 h-5 rounded border-gray-300 text-[#8C1538] focus:ring-[#8C1538] mt-0.5 shrink-0"
                  />
                  <span className="text-xs sm:text-sm font-bold text-gray-900 leading-relaxed">
                    {L(
                      'පහත කොන්දේසි වලට යටත්ව අංක 06 යටතේ ඉල්ලුම් කර ඇති සහතික ලබාදෙන ලෙස කාරුණිකව දන්වා සිටිමි.',
                      'I agree to apply for the requested certificate(s) subject to the above statutory conditions.',
                      'மேற்கண்ட சட்டரீதியான நிபந்தனைகளுக்கு உட்பட்டு கோரப்பட்ட சான்றிதழுக்கு விண்ணப்பிக்க ஒப்புக்கொள்கிறேன்.'
                    )}
                  </span>
                </label>

                {/* Date & Applicant Signature */}
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
                      placeholder="e.g. C. Perera"
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
                  {L('සහතිකය සඳහා අයදුම් කරන්න', 'Submit Certificate Application', 'சான்றிதழ் விண்ணப்பத்தை சமர்ப்பிக்கவும்')}
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};

export default ApplicationFormModal;
