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

interface GullyBowserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GullyBowserFormModal: React.FC<GullyBowserFormModalProps> = ({ isOpen, onClose }) => {
  const { language: activeLanguage, changeLanguage } = useLanguage();
  const lang = activeLanguage || 'si';
  const L = (siText: string, enText: string, taText?: string) =>
    lang === 'si' ? siText : lang === 'ta' ? (taText || enText) : enText;

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceNo, setReferenceNo] = useState('');

  const [formData, setFormData] = useState({
    applicantName: '',
    address: '',
    telephoneNumber: '',
    nicNumber: '',
    gullyLocationAddress: '',
    premisesCategory: 'RESIDENTIAL', // RESIDENTIAL | COMMERCIAL | INDUSTRIAL | GOV
    loadsCount: '1',
    accessRoadDescription: '',
    agreedToTerms: false,
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
      applicantName: 'M. P. Nimal Karunaratne',
      address: 'No. 88, Station Road, Homagama',
      telephoneNumber: '077 452 8891',
      nicNumber: '851240892V',
      gullyLocationAddress: 'No. 88, Station Road, Homagama (Backyard Pit)',
      premisesCategory: 'RESIDENTIAL',
      loadsCount: '1',
      accessRoadDescription: 'Turn left near Homagama Railway Station lane; 12ft wide carpet road accessible for bowser truck.',
      agreedToTerms: true,
      submissionDate: new Date().toISOString().split('T')[0],
      applicantSignature: 'N. Karunaratne',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomRef = 'GUL-BWS-' + Math.floor(100000 + Math.random() * 900000);
    setReferenceNo(randomRef);
    setIsSubmitted(true);
  };

  const resetAndClose = () => {
    setIsSubmitted(false);
    setReferenceNo('');
    onClose();
  };

  const premisesOptions = [
    { id: 'RESIDENTIAL', si: 'නේවාසික', en: 'Residential', ta: 'குடியிருப்பு' },
    { id: 'COMMERCIAL', si: 'ව්‍යාපාරික', en: 'Commercial', ta: 'வணிகம்' },
    { id: 'INDUSTRIAL', si: 'කර්මාන්ත', en: 'Industrial', ta: 'தொழிற்சாலை' },
    { id: 'GOV', si: 'රාජ්‍ය ආයතනයක්', en: 'Government Institution', ta: 'அரசாங்க நிறுவனம்' },
  ];

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
      onClick={resetAndClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-[#F8FAFC] rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-gray-200 flex flex-col my-auto text-left"
      >
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-[#8C1538] to-[#6a102a] text-white px-6 sm:px-8 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative shadow-md shrink-0">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full text-amber-200">
                {L('හෝමාගම ප්‍රාදේශීය සභාව', 'Homagama Pradeshiya Sabha', 'ஹோமகம பிரதேச சபை')}
              </span>
              <span className="text-[11px] font-semibold bg-amber-400/20 text-amber-200 px-2.5 py-1 rounded-md border border-amber-300/30">
                Official Municipal Bowser Request
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight leading-tight pt-1">
              {L(
                'ගලි බවුසරය ලබා ගැනීමේ ඉල්ලුම්පත්‍රය',
                'Application for Municipal Gully Bowser Service',
                'கல்லி பௌசர் சேவைக்கான விண்ணப்பம்'
              )}
            </h2>
            <p className="text-xs sm:text-sm text-white/90 font-medium">
              {L(
                'අපජලය හා ගලි ටැංකි හිස් කිරීමේ නිල ඉල්ලුම්පත්‍රය',
                'Wastewater & Septic Tank Emptying Official Request',
                'கழிவுநீர் மற்றும் செப்டிக் டேங்க் அகற்றுவதற்கான விண்ணப்பம்'
              )}
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-center">
            {/* Language Switcher Pill */}
            <div className="flex items-center bg-black/25 p-1 rounded-xl border border-white/20">
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
                title="Fill sample request data"
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
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
          {isSubmitted ? (
            <div className="bg-white rounded-3xl p-8 sm:p-12 text-center max-w-lg mx-auto border border-gray-200 shadow-sm space-y-6 my-auto">
              <CheckCircleIcon />
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-gray-900">
                  {L('ඉල්ලුම්පත්‍රය සාර්ථකව යොමු කරන ලදී!', 'Gully Bowser Request Submitted!', 'விண்ணப்பம் வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது!')}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {L(
                    'ඔබගේ ගලි බවුසර ඉල්ලුම හෝමාගම ප්‍රාදේශීය සභාවේ සෞඛ්‍ය හා පරිසර අංශය වෙත යොමු කර ඇත. සේවා වෙන්කිරීම තහවුරු කිරීමට අපගේ නිලධාරියෙකු ඔබව අමතනු ඇත.',
                    'Your Gully Bowser service request has been registered with the Homagama Pradeshiya Sabha Health & Environment Department.',
                    'உங்கள் கல்லி பௌசர் சேவை கோரிக்கை பிரதேச சபை சுகாதார பிரிவில் பதிவு செய்யப்பட்டுள்ளது.'
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
              {/* Guidance Notice */}
              <div className="bg-amber-50/90 border border-amber-200/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                <div className="text-xs sm:text-sm text-amber-950 leading-relaxed">
                  <span className="font-bold text-amber-900">
                    {L('පුරවැසි අයදුම්පත් අංශය:', 'Applicant Section Only:', 'விண்ணப்பதாரர் பிரிவு மட்டும்:')}
                  </span>{' '}
                  {L(
                    'කරුණාකර ගලි ටැංකිය පිහිටි ස්ථානය, අවශ්‍ය ලෝඩ් ගණන සහ ප්‍රවේශ මාර්ග විස්තරය පැහැදිලිව සඳහන් කරන්න. (Office use section excluded).',
                    'Please fill out all applicant details, required bowser load quantity, and access road instructions clearly.',
                    'கல்லி டேங்க் அமைவிடம், தேவையான சுமை எண்ணிக்கை மற்றும் வீதி விவரங்களை தெளிவாக குறிப்பிடவும்.'
                  )}
                </div>
              </div>

              {/* Section 1: Applicant Information (Fields 1 - 4) */}
              <div className="bg-white rounded-2xl border border-gray-200/90 p-6 sm:p-8 shadow-xs space-y-6">
                <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                  <span className="bg-[#8C1538] text-white w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm shrink-0">
                    01
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900">
                      {L('අයදුම්කරුගේ තොරතුරු (01 - 04)', 'Applicant Information (Fields 01 - 04)', 'விண்ணப்பதாரரின் தகவல்கள் (01 - 04)')}
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2">
                      <span className="block text-sm sm:text-base font-bold text-gray-900">
                        {L('1. නම', '1. Applicant Name', '1. பெயர்')} <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      name="applicantName"
                      required
                      value={formData.applicantName}
                      onChange={handleInputChange}
                      placeholder="e.g. M. P. Nimal Karunaratne"
                      className="w-full bg-gray-50/70 border border-gray-300 focus:bg-white focus:border-[#8C1538] focus:ring-4 focus:ring-[#8C1538]/10 rounded-xl px-4 py-3 text-sm sm:text-base font-medium text-gray-900 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block mb-2">
                      <span className="block text-sm sm:text-base font-bold text-gray-900">
                        {L('4. ජාතික හැඳුනුම්පත් අංකය', '4. NIC Number', '4. தேசிய அடையாள அட்டை எண்')} <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      name="nicNumber"
                      required
                      value={formData.nicNumber}
                      onChange={handleInputChange}
                      placeholder="e.g. 851240892V"
                      className="w-full bg-gray-50/70 border border-gray-300 focus:bg-white focus:border-[#8C1538] focus:ring-4 focus:ring-[#8C1538]/10 rounded-xl px-4 py-3 text-sm sm:text-base font-semibold text-gray-900 focus:outline-none transition-all font-mono"
                    />
                  </div>

                  <div>
                    <label className="block mb-2">
                      <span className="block text-sm sm:text-base font-bold text-gray-900">
                        {L('2. ලිපිනය', '2. Address', '2. முகவரி')} <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="e.g. No. 88, Station Road, Homagama"
                      className="w-full bg-gray-50/70 border border-gray-300 focus:bg-white focus:border-[#8C1538] focus:ring-4 focus:ring-[#8C1538]/10 rounded-xl px-4 py-3 text-sm sm:text-base font-medium text-gray-900 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block mb-2">
                      <span className="block text-sm sm:text-base font-bold text-gray-900">
                        {L('3. දුරකථන අංකය', '3. Telephone Number', '3. தொலைபேசி எண்')} <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      name="telephoneNumber"
                      required
                      value={formData.telephoneNumber}
                      onChange={handleInputChange}
                      placeholder="e.g. 077 452 8891"
                      className="w-full bg-gray-50/70 border border-gray-300 focus:bg-white focus:border-[#8C1538] focus:ring-4 focus:ring-[#8C1538]/10 rounded-xl px-4 py-3 text-sm sm:text-base font-semibold text-gray-900 focus:outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Location & Bowser Load Requirements (Fields 5 - 8) */}
              <div className="bg-white rounded-2xl border border-gray-200/90 p-6 sm:p-8 shadow-xs space-y-6">
                <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                  <span className="bg-[#8C1538] text-white w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm shrink-0">
                    02
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900">
                      {L('ස්ථානයේ තොරතුරු සහ ලෝඩ් ගණන (05 - 08)', 'Location & Service Requirements (Fields 05 - 08)', 'இடம் மற்றும் சேவை தேவைகள் (05 - 08)')}
                    </h3>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block mb-2">
                      <span className="block text-sm sm:text-base font-bold text-gray-900">
                        {L('5. ගලි ටැංකිය / අපජලය වල පිහිටි ස්ථානයේ ලිපිනය', '5. Address of Septic Tank / Wastewater Pit Location', '5. செப்டிக் டேங்க் அமைவிட முகவரி')} <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      name="gullyLocationAddress"
                      required
                      value={formData.gullyLocationAddress}
                      onChange={handleInputChange}
                      placeholder="e.g. No. 88, Station Road, Homagama (Backyard Pit)"
                      className="w-full bg-gray-50/70 border border-gray-300 focus:bg-white focus:border-[#8C1538] focus:ring-4 focus:ring-[#8C1538]/10 rounded-xl px-4 py-3 text-sm sm:text-base font-medium text-gray-900 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm sm:text-base font-bold text-gray-900 mb-3">
                      {L('6. ස්ථානයේ ස්වභාවය / ආයතන වර්ගය', '6. Premises Category', '6. வளாக வகை')} <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      {premisesOptions.map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setFormData((p) => ({ ...p, premisesCategory: opt.id }))}
                          className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                            formData.premisesCategory === opt.id
                              ? 'border-[#8C1538] bg-red-50/60 font-bold text-[#8C1538] shadow-xs'
                              : 'border-gray-200 bg-white hover:border-gray-300 text-gray-800'
                          }`}
                        >
                          <div className="text-sm sm:text-base">
                            {L(opt.si, opt.en, opt.ta)}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block mb-2">
                        <span className="block text-sm sm:text-base font-bold text-gray-900">
                          {L('7. ඉවත් කළ යුතු ලෝඩ් ගණන', '7. Number of Gully Bowser Loads', '7. அகற்றப்பட வேண்டிய சுமை எண்ணிக்கை')} <span className="text-red-500">*</span>
                        </span>
                      </label>
                      <input
                        type="number"
                        step="1"
                        min="1"
                        name="loadsCount"
                        required
                        value={formData.loadsCount}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50/70 border border-gray-300 focus:bg-white focus:border-[#8C1538] focus:ring-4 focus:ring-[#8C1538]/10 rounded-xl px-4 py-3 text-sm sm:text-base font-bold text-gray-900 focus:outline-none transition-all max-w-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2">
                      <span className="block text-sm sm:text-base font-bold text-gray-900">
                        {L(
                          '8. ස්ථානයට ප්‍රවේශ විය හැකි මාර්ග විස්තරය (පසුපිට සඳහන් කරුණු)',
                          '8. Access Road Description / Route Instructions for Bowser Truck',
                          '8. பௌசர் வாகனம் செல்வதற்கான வீதி விவரங்கள்'
                        )} <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <textarea
                      name="accessRoadDescription"
                      rows={3}
                      required
                      value={formData.accessRoadDescription}
                      onChange={handleInputChange}
                      placeholder="e.g. Turn left near Homagama Railway Station lane; 12ft wide road accessible for heavy vehicles."
                      className="w-full bg-gray-50/70 border border-gray-300 focus:bg-white focus:border-[#8C1538] focus:ring-4 focus:ring-[#8C1538]/10 rounded-xl px-4 py-3 text-sm sm:text-base font-medium text-gray-900 focus:outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Declaration & Signature */}
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
                    name="agreedToTerms"
                    required
                    checked={formData.agreedToTerms}
                    onChange={handleInputChange}
                    className="w-5 h-5 rounded border-gray-300 text-[#8C1538] focus:ring-[#8C1538] mt-0.5 shrink-0"
                  />
                  <span className="text-xs sm:text-sm font-bold text-gray-900 leading-relaxed">
                    {L(
                      'ඉහත සඳහන් තොරතුරු සත්‍ය හා නිවැරදි බවත්, ප්‍රාදේශීය සභාවේ නියමිත ගලි බවුසර ගාස්තු ගෙවීමට එකඟ වන බවත් ප්‍රකාශ කරමි.',
                      'I declare that the details provided are accurate and agree to pay the standard Homagama Pradeshiya Sabha tariff for the bowser service.',
                      'மேலே உள்ள தகவல்கள் சரியானவை மற்றும் நிர்ணயிக்கப்பட்ட கட்டணத்தை செலுத்த ஒப்புக்கொள்கிறேன்.'
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
                      placeholder="e.g. N. Karunaratne"
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
                  {L('ඉල්ලුම්පත්‍රය ඉදිරිපත් කරන්න', 'Submit Gully Bowser Application', 'கல்லி பௌசர் விண்ணப்பத்தை சமர்ப்பிக்கவும்')}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default GullyBowserFormModal;
