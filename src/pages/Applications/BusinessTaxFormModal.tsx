import React, { useState } from 'react';
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

interface BusinessTaxFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddApplication?: (appData: any) => void;
}

const BusinessTaxFormModal: React.FC<BusinessTaxFormModalProps> = ({ isOpen, onClose, onAddApplication }) => {
  const { language: activeLanguage, changeLanguage } = useLanguage();
  const lang = activeLanguage || 'si';
  const L = (siText: string, enText: string, taText?: string) =>
    lang === 'si' ? siText : lang === 'ta' ? (taText || enText) : enText;

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceNo, setReferenceNo] = useState('');

  const [formData, setFormData] = useState({
    taxYear: '2026',
    businessNature: '',
    businessName: '',
    proprietorName: '',
    businessAddress: '',
    routeDescription: '',
    telephoneNumber: '',
    nicNumber: '',
    privateAddress: '',
    buildingOwnerInfo: '',
    assessmentNumberAndRoad: '',
    previousYearRevenue: '',
    agreedToDeclaration: false,
    submissionDate: new Date().toISOString().split('T')[0],
    applicantSignature: '',
  });

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAutoFill = () => {
    setFormData({
      taxYear: '2026',
      businessNature: 'Hardware & Construction Materials Retail Trade',
      businessName: 'Lanka Hardware & Stores',
      proprietorName: 'W. A. D. Sunil Jayawardena',
      businessAddress: 'No. 120, High Level Road, Homagama',
      routeDescription: 'Located 150m from Homagama Town Clock Tower towards Kottawa on High Level Road left side.',
      telephoneNumber: '011 285 4490 / 071 882 1100',
      nicNumber: '791140320V',
      privateAddress: 'No. 14/A, Katuwana Road, Homagama',
      buildingOwnerInfo: 'Self-Owned (W. A. D. Sunil Jayawardena, No. 14/A, Katuwana Road)',
      assessmentNumberAndRoad: 'Assessment No. 120, High Level Road',
      previousYearRevenue: '4500000',
      agreedToDeclaration: true,
      submissionDate: new Date().toISOString().split('T')[0],
      applicantSignature: 'S. Jayawardena',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomRef = 'BIZ-TAX-' + Math.floor(100000 + Math.random() * 900000);
    setReferenceNo(randomRef);
    setIsSubmitted(true);
    if (onAddApplication) {
      onAddApplication({
        id: randomRef,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        category: 'Industrial / Trade & Business Tax Application (Part A)',
        categoryCode: 'business-tax-permit',
        status: 'PENDING',
        applicantName: (formData as any).ownerName || 'S. Jayawardena',
        nicNumber: (formData as any).ownerNic || '198233445566',
        phone: (formData as any).phone || '077 889 9000',
        address: (formData as any).ownerAddress || 'No. 15, High Level Road, Homagama',
        locationAddress: `${(formData as any).businessAddress || 'Homagama'} (Assessment No: ${(formData as any).assessmentNo || '12/A'})`,
        details: `Business Tax Return (${(formData as any).businessName || 'Trade Enterprise'}, Type: ${(formData as any).businessNature || 'Retail'}, Annual Turnover: Rs. ${(formData as any).annualTurnover || '0'})`,
        documentName: 'BALANCE_SHEET_2025.PDF',
        inspectionDate: null,
        approvalDate: null
      });
    }
  };

  const resetAndClose = () => {
    setIsSubmitted(false);
    setReferenceNo('');
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-1.5 sm:p-6"
      onClick={resetAndClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-[#F8FAFC] rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[96vh] sm:max-h-[90vh] overflow-hidden shadow-2xl border border-gray-200 flex flex-col my-auto text-left"
      >
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-[#8C1538] to-[#6a102a] text-white px-3 sm:px-8 py-2.5 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 relative shadow-md shrink-0">
          <div className="space-y-0.5 sm:space-y-1.5 min-w-0">
            <h2 className="text-base sm:text-2xl font-extrabold tracking-tight leading-tight pt-0.5 sm:pt-1">
              {L(
                `${formData.taxYear} වර්ෂයට කර්මාන්ත / ව්‍යාපාර බදු ගෙවීමේ අයදුම්පත්‍රය - "ඒ" කොටස`,
                `Industrial / Business Tax & License Application (${formData.taxYear}) - Part A`,
                `${formData.taxYear} ஆம் ஆண்டிற்கான தொழில் / வியாபார வரி விண்ணப்பம் - பகுதி A`
              )}
            </h2>
            <p className="text-[11px] sm:text-sm text-white/90 font-medium">
              {L(
                'වාර්ෂික කර්මාන්ත හා ව්‍යාපාර බදු තක්සේරු ඉල්ලුම්පත්‍රය',
                'Annual Industrial & Trade License Assessment Application',
                'வருடாந்த தொழில் மற்றும் வர்த்தக வரி மதிப்பீட்டு விண்ணப்பம்'
              )}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between sm:justify-end gap-2 sm:gap-2.5 shrink-0 self-stretch sm:self-center pt-2 sm:pt-0 border-t border-white/10 sm:border-0 w-full sm:w-auto">
            {/* Language Switcher Pill */}
            <div className="flex items-center bg-black/25 p-1 rounded-xl border border-white/20 shrink-0">
              <button
                type="button"
                onClick={() => changeLanguage('si')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  lang === 'si' ? 'bg-white text-[#8C1538] shadow-xs' : 'text-white/85 hover:text-white'
                }`}
              >
                සිංහල
              </button>
              <button
                type="button"
                onClick={() => changeLanguage('en')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  lang === 'en' ? 'bg-white text-[#8C1538] shadow-xs' : 'text-white/85 hover:text-white'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => changeLanguage('ta')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  lang === 'ta' ? 'bg-white text-[#8C1538] shadow-xs' : 'text-white/85 hover:text-white'
                }`}
              >
                தமிழ்
              </button>
            </div>

            {!isSubmitted && (
              <button
                type="button"
                onClick={handleAutoFill}
                className="bg-white/15 hover:bg-white/25 text-white text-xs font-semibold px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all duration-200 cursor-pointer border border-white/20 shadow-xs"
                title="Fill sample business tax data"
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

        {/* Modal Content */}
        <div className="p-3 sm:p-8 overflow-y-auto space-y-5 sm:space-y-8 flex-1">
          {isSubmitted ? (
            <div className="bg-white rounded-3xl p-8 sm:p-12 text-center max-w-lg mx-auto border border-gray-200 shadow-sm space-y-6 my-auto">
              <CheckCircleIcon />
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-gray-900">
                  {L('අයදුම්පත සාර්ථකව ඉදිරිපත් කරන ලදී!', 'Business Tax Return Submitted!', 'விண்ணப்பம் வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது!')}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {L(
                    'ඔබගේ "ඒ" කොටස අයදුම්පත හෝමාගම ප්‍රාදේශීය සභාවේ ආදායම් පරීක්ෂක අංශය වෙත යොමු කර ඇත. තක්සේරු වාර්තාව සකස් කළ පසු ඔබට බදු ගෙවීම් දැනුම්දීම ලැබෙනු ඇත.',
                    'Your Part A return has been submitted to the Revenue Inspector Department. You will receive the tax assessment notification after review.',
                    'உங்கள் பகுதி A விண்ணப்பம் வருவாய் பரிசோதகர் பிரிவுக்கு அனுப்பப்பட்டுள்ளது.'
                  )}
                </p>
              </div>

              <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 text-center">
                <span className="block text-xs font-bold text-amber-900 uppercase tracking-wider mb-1">
                  {L('යොමු අංකය / Reference Number', 'Reference Number', 'குறிப்பு எண்')}
                </span>
                <span className="font-mono font-extrabold text-xl text-[#8C1538]">
                  {referenceNo}
                </span>
              </div>

              <button
                type="button"
                onClick={resetAndClose}
                className="w-full bg-[#8C1538] hover:bg-[#73102d] text-white font-bold py-3.5 px-6 rounded-xl transition-all cursor-pointer shadow-md"
              >
                {L('වසන්න', 'Close', 'மூடு')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Top Guidance Note */}
              <div className="bg-amber-50/90 border border-amber-200/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                <div className="text-xs sm:text-sm text-amber-950 leading-relaxed">
                  <span className="font-bold text-amber-900">
                    {L('අයදුම්කරු විසින් පිරවිය යුතු "ඒ" කොටස:', 'Part A (Applicant Declaration):', 'பகுதி A (விண்ணப்பதாரர் பகுதி):')}
                  </span>{' '}
                  {L(
                    'මෙම ෆෝරමයේ "ඒ" කොටස පුරවා හෝමාගම ප්‍රාදේශීය සභාවේ ප්‍රධාන කාර්යාලයට ඉදිරිපත් කළ යුතුය. (Office use Part B excluded).',
                    'Complete Part A details accurately. The Part B revenue inspector assessment report is reserved for municipal officers.',
                    'பகுதி A தகவல்களை சரியாக பூர்த்தி செய்யவும். பகுதி B அலுவலக பயன்பாட்டிற்கு மட்டுமே.'
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-bold text-gray-700">{L('වර්ෂය:', 'Year:', 'ஆண்டு:')}</span>
                  <select
                    name="taxYear"
                    value={formData.taxYear}
                    onChange={handleInputChange}
                    className="bg-white border border-amber-300 rounded-lg px-3 py-1.5 text-xs font-bold text-[#8C1538]"
                  >
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                  </select>
                </div>
              </div>

              {/* Section 1: Business Identification (Fields 1 - 3) */}
              <div className="bg-white rounded-2xl border border-gray-200/90 p-4 sm:p-6 md:p-8 shadow-xs space-y-5 sm:space-y-6">
                <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                  <span className="bg-[#8C1538] text-white w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm shrink-0">
                    01
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900">
                      {L('ව්‍යාපාරයේ මූලික තොරතුරු (01 - 03)', 'Business Identification Details (Fields 01 - 03)', 'வியாபார அடிப்படை தகவல்கள் (01 - 03)')}
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2">
                      <span className="block text-sm sm:text-base font-bold text-gray-900">
                        {L('2. ව්‍යාපාරික ස්ථානයේ වෙළඳ නාමය', '2. Trade / Business Name', '2. வியாபார நிறுவனத்தின் பெயர்')} <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      name="businessName"
                      required
                      value={formData.businessName}
                      onChange={handleInputChange}
                      placeholder="e.g. Lanka Hardware & Stores"
                      className="w-full bg-gray-50/70 border border-gray-300 focus:bg-white focus:border-[#8C1538] focus:ring-4 focus:ring-[#8C1538]/10 rounded-xl px-4 py-3 text-sm sm:text-base font-bold text-gray-900 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block mb-2">
                      <span className="block text-sm sm:text-base font-bold text-gray-900">
                        {L('1. වෙළඳ ව්‍යාපාරයේ ස්වභාවය', '1. Nature of Trade / Industry', '1. வியாபாரத்தின் தன்மை')} <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      name="businessNature"
                      required
                      value={formData.businessNature}
                      onChange={handleInputChange}
                      placeholder="e.g. Hardware & Construction Materials Retail Trade"
                      className="w-full bg-gray-50/70 border border-gray-300 focus:bg-white focus:border-[#8C1538] focus:ring-4 focus:ring-[#8C1538]/10 rounded-xl px-4 py-3 text-sm sm:text-base font-medium text-gray-900 focus:outline-none transition-all"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block mb-2">
                      <span className="block text-sm sm:text-base font-bold text-gray-900">
                        {L('3. ව්‍යාපාරිකයාගේ නම (අයිතිකරු)', '3. Name of Proprietor / Owner', '3. உரிமையாளரின் பெயர்')} <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      name="proprietorName"
                      required
                      value={formData.proprietorName}
                      onChange={handleInputChange}
                      placeholder="e.g. W. A. D. Sunil Jayawardena"
                      className="w-full bg-gray-50/70 border border-gray-300 focus:bg-white focus:border-[#8C1538] focus:ring-4 focus:ring-[#8C1538]/10 rounded-xl px-4 py-3 text-sm sm:text-base font-medium text-gray-900 focus:outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Contact & Premises Location (Fields 4 - 7) */}
              <div className="bg-white rounded-2xl border border-gray-200/90 p-4 sm:p-6 md:p-8 shadow-xs space-y-5 sm:space-y-6">
                <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                  <span className="bg-[#8C1538] text-white w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm shrink-0">
                    02
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900">
                      {L('ලිපිනය හා සම්බන්ධතා තොරතුරු (04 - 07)', 'Location & Contact Details (Fields 04 - 07)', 'முகவரி மற்றும் தொடர்பு விவரங்கள் (04 - 07)')}
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block mb-2">
                      <span className="block text-sm sm:text-base font-bold text-gray-900">
                        {L('4. ව්‍යාපාරික ස්ථානයේ ලිපිනය', '4. Business Premises Address', '4. வியாபார நிறுவனத்தின் முகவரி')} <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      name="businessAddress"
                      required
                      value={formData.businessAddress}
                      onChange={handleInputChange}
                      placeholder="e.g. No. 120, High Level Road, Homagama"
                      className="w-full bg-gray-50/70 border border-gray-300 focus:bg-white focus:border-[#8C1538] focus:ring-4 focus:ring-[#8C1538]/10 rounded-xl px-4 py-3 text-sm sm:text-base font-medium text-gray-900 focus:outline-none transition-all"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block mb-2">
                      <span className="block text-sm sm:text-base font-bold text-gray-900">
                        {L(
                          'ස්ථානයට ළඟාවිය හැකි මාර්ග විස්තරය (පිටුපස සඳහන් කරුණු)',
                          'Route & Access Description to Premises',
                          'நிறுவனத்திற்கு செல்லும் வீதி விவரங்கள்'
                        )}
                      </span>
                    </label>
                    <input
                      type="text"
                      name="routeDescription"
                      value={formData.routeDescription}
                      onChange={handleInputChange}
                      placeholder="e.g. Located 150m from Homagama Town Clock Tower towards Kottawa on High Level Road left side."
                      className="w-full bg-gray-50/70 border border-gray-300 focus:bg-white focus:border-[#8C1538] focus:ring-4 focus:ring-[#8C1538]/10 rounded-xl px-4 py-3 text-sm sm:text-base font-medium text-gray-900 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block mb-2">
                      <span className="block text-sm sm:text-base font-bold text-gray-900">
                        {L('5. ව්‍යාපාරික ස්ථානයේ දුරකථන අංකය', '5. Business Telephone Number', '5. தொலைபேசி எண்')} <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      name="telephoneNumber"
                      required
                      value={formData.telephoneNumber}
                      onChange={handleInputChange}
                      placeholder="e.g. 011 285 4490 / 071 882 1100"
                      className="w-full bg-gray-50/70 border border-gray-300 focus:bg-white focus:border-[#8C1538] focus:ring-4 focus:ring-[#8C1538]/10 rounded-xl px-4 py-3 text-sm sm:text-base font-semibold text-gray-900 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block mb-2">
                      <span className="block text-sm sm:text-base font-bold text-gray-900">
                        {L('6. ව්‍යාපාරිකයාගේ ජාතික හැඳුනුම්පත් අංකය', '6. Proprietor NIC Number', '6. தேசிய அடையாள அட்டை எண்')} <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      name="nicNumber"
                      required
                      value={formData.nicNumber}
                      onChange={handleInputChange}
                      placeholder="e.g. 791140320V"
                      className="w-full bg-gray-50/70 border border-gray-300 focus:bg-white focus:border-[#8C1538] focus:ring-4 focus:ring-[#8C1538]/10 rounded-xl px-4 py-3 text-sm sm:text-base font-semibold text-gray-900 focus:outline-none transition-all font-mono"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block mb-2">
                      <span className="block text-sm sm:text-base font-bold text-gray-900">
                        {L('7. ව්‍යාපාරිකයාගේ පෞද්ගලික ලිපිනය', '7. Proprietor Private / Residential Address', '7. உரிமையாளரின் தனிப்பட்ட முகவரி')} <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      name="privateAddress"
                      required
                      value={formData.privateAddress}
                      onChange={handleInputChange}
                      placeholder="e.g. No. 14/A, Katuwana Road, Homagama"
                      className="w-full bg-gray-50/70 border border-gray-300 focus:bg-white focus:border-[#8C1538] focus:ring-4 focus:ring-[#8C1538]/10 rounded-xl px-4 py-3 text-sm sm:text-base font-medium text-gray-900 focus:outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Assessment & Revenue Data (Fields 8 - 10) */}
              <div className="bg-white rounded-2xl border border-gray-200/90 p-4 sm:p-6 md:p-8 shadow-xs space-y-5 sm:space-y-6">
                <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                  <span className="bg-[#8C1538] text-white w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm shrink-0">
                    03
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900">
                      {L('ගොඩනැගිලි හා වරිපනම් තොරතුරු (08 - 10)', 'Building & Assessment Details (Fields 08 - 10)', 'கட்டிடம் மற்றும் மதிப்பீட்டு விவரங்கள் (08 - 10)')}
                    </h3>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block mb-2">
                      <span className="block text-sm sm:text-base font-bold text-gray-900">
                        {L(
                          '8. ව්‍යාපාරය පවත්වාගෙන යන ගොඩනැගිල්ලේ අයිතිකරුගේ නම හා ලිපිනය',
                          '8. Building Owner Name & Address (Landlord)',
                          '8. கட்டிடம் உரிமையாளரின் பெயர் மற்றும் முகவரி'
                        )} <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      name="buildingOwnerInfo"
                      required
                      value={formData.buildingOwnerInfo}
                      onChange={handleInputChange}
                      placeholder="e.g. Self-Owned / Owner Name & Address"
                      className="w-full bg-gray-50/70 border border-gray-300 focus:bg-white focus:border-[#8C1538] focus:ring-4 focus:ring-[#8C1538]/10 rounded-xl px-4 py-3 text-sm sm:text-base font-medium text-gray-900 focus:outline-none transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block mb-2">
                        <span className="block text-sm sm:text-base font-bold text-gray-900">
                          {L('9. වෙළඳ ස්ථානයේ වරිපනම් අංකය හා පාර', '9. Assessment Number & Road Name', '9. மதிப்பீட்டு இலக்கம் மற்றும் வீதி')} <span className="text-red-500">*</span>
                        </span>
                      </label>
                      <input
                        type="text"
                        name="assessmentNumberAndRoad"
                        required
                        value={formData.assessmentNumberAndRoad}
                        onChange={handleInputChange}
                        placeholder="e.g. Assessment No. 120, High Level Road"
                        className="w-full bg-gray-50/70 border border-gray-300 focus:bg-white focus:border-[#8C1538] focus:ring-4 focus:ring-[#8C1538]/10 rounded-xl px-4 py-3 text-sm sm:text-base font-medium text-gray-900 focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block mb-2">
                        <span className="block text-sm sm:text-base font-bold text-gray-900">
                          {L('10. පසුගිය වසරේ ව්‍යාපාරයේ වාර්ෂික ආදායම (රු.)', '10. Previous Year Annual Gross Turnover (LKR)', '10. கடந்த ஆண்டின் வருடாந்த வருமானம் (ரூ.)')} <span className="text-red-500">*</span>
                        </span>
                      </label>
                      <input
                        type="number"
                        name="previousYearRevenue"
                        required
                        value={formData.previousYearRevenue}
                        onChange={handleInputChange}
                        placeholder="e.g. 4500000"
                        className="w-full bg-gray-50/70 border border-gray-300 focus:bg-white focus:border-[#8C1538] focus:ring-4 focus:ring-[#8C1538]/10 rounded-xl px-4 py-3 text-sm sm:text-base font-bold text-gray-900 focus:outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Declaration & Signature */}
              <div className="bg-white rounded-2xl border border-gray-200/90 p-4 sm:p-6 md:p-8 shadow-xs space-y-5 sm:space-y-6">
                <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                  <span className="bg-[#8C1538] text-white w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm shrink-0">
                    04
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
                    name="agreedToDeclaration"
                    required
                    checked={formData.agreedToDeclaration}
                    onChange={handleInputChange}
                    className="w-5 h-5 rounded border-gray-300 text-[#8C1538] focus:ring-[#8C1538] mt-0.5 shrink-0"
                  />
                  <span className="text-xs sm:text-sm font-bold text-gray-900 leading-relaxed">
                    {L(
                      `ඉහත සඳහන් සියලු තොරතුරු සත්‍ය හා නිවැරදි බවත්, ${formData.taxYear} වර්ෂය සඳහා ප්‍රාදේශීය සභා ප්‍රඥප්තිය යටතේ නියමිත බදු ගෙවීමට එකඟ වන බවත් ප්‍රකාශ කරමි.`,
                      `I declare that all details stated in Part A are true and correct, and agree to pay the statutory industrial/trade tax for the year ${formData.taxYear}.`,
                      `மேலே உள்ள அனைத்து தகவல்களும் உண்மையானவை மற்றும் ${formData.taxYear} ஆம் ஆண்டிற்கான வரியை செலுத்த ஒப்புக்கொள்கிறேன்.`
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
                      <span className="block text-sm sm:text-base font-bold text-gray-900">{L('ඉල්ලුම්කරුගේ අත්සන', 'Applicant Signature', 'விண்ணப்பதாரரின் கையொப்பம்')} <span className="text-red-500">*</span></span>
                    </label>
                    <input
                      type="text"
                      name="applicantSignature"
                      required
                      value={formData.applicantSignature}
                      onChange={handleInputChange}
                      placeholder="e.g. S. Jayawardena"
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
                  {L('බදු අයදුම්පත ඉදිරිපත් කරන්න', 'Submit Business Tax Application Part A', 'வரி விண்ணப்பம் பகுதி A சமர்ப்பிக்கவும்')}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessTaxFormModal;
