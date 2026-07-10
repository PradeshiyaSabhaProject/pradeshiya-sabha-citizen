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

interface RoadExcavationFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RoadExcavationFormModal: React.FC<RoadExcavationFormModalProps> = ({ isOpen, onClose }) => {
  const { language: activeLanguage, changeLanguage } = useLanguage();
  const lang = activeLanguage || 'si';
  const L = (siText: string, enText: string, taText?: string) =>
    lang === 'si' ? siText : lang === 'ta' ? (taText || enText) : enText;

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceNo, setReferenceNo] = useState('');

  const [formData, setFormData] = useState({
    referenceLetterNo: '',
    referenceDate: '',
    assessmentNo: '',
    roadType: 'TAR', // TAR | CARPET | CONCRETE | INTERLOCK | GRAVEL
    excavationAreaSqM: '',
    applicantNameOrInstitution: '',
    feePaidLkr: '',
    agreedToConditions: false,
    submissionDate: new Date().toISOString().split('T')[0],
    applicantSignature: '',
  });

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAutoFill = () => {
    setFormData({
      referenceLetterNo: 'NWSDB/HMA/CON/2026/142',
      referenceDate: '2026-07-05',
      assessmentNo: '45/2B, Temple Road, Homagama',
      roadType: 'TAR',
      excavationAreaSqM: '4.5',
      applicantNameOrInstitution: 'K. A. D. Samantha Perera',
      feePaidLkr: '15000',
      agreedToConditions: true,
      submissionDate: new Date().toISOString().split('T')[0],
      applicantSignature: 'S. Perera',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomRef = 'RD-EXC-' + Math.floor(100000 + Math.random() * 900000);
    setReferenceNo(randomRef);
    setIsSubmitted(true);
  };

  const resetAndClose = () => {
    setIsSubmitted(false);
    setReferenceNo('');
    onClose();
  };

  const roadTypeOptions = [
    { id: 'TAR', si: 'තාර මාර්ගයේ', en: 'Tar Road', ta: 'தார் வீதி' },
    { id: 'CARPET', si: 'කාපට් මාර්ගයේ', en: 'Carpet Road', ta: 'காபட் வீதி' },
    { id: 'CONCRETE', si: 'කොන්ක්‍රීට් මාර්ගයේ', en: 'Concrete Road', ta: 'கொங்கிரீட் வீதி' },
    { id: 'INTERLOCK', si: 'කොන්ක්‍රීට් ගල් අතුරන ලද මාර්ගයේ', en: 'Interlocking Paving Block Road', ta: 'கற்கள் பதிக்கப்பட்ட வீதி' },
    { id: 'GRAVEL', si: 'බොරළු මාර්ගයේ', en: 'Gravel Road', ta: 'கிரவல் வீதி' },
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
                Official Road Excavation Permit
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight leading-tight pt-1">
              {L(
                'ජලනළ සම්බන්ධය සඳහා මාර්ග කැණීම් අවසර පත්‍රය',
                'Road Excavation Permit for Water Pipeline Connection',
                'குழாய் நீர் இணைப்புக்கான வீதி அகழ்வு அனுமதி'
              )}
            </h2>
            <p className="text-xs sm:text-sm text-white/90 font-medium">
              {L(
                'හෝ/ප්‍රාස/3/8/මාර්ග කැණීම් • නිල ඉල්ලුම්පත්‍රය',
                'Form Ref: HO/PS/3/8/Road-Excavation • Official Permit Application',
                'படிவ எண்: HO/PS/3/8/Road-Excavation'
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
                title="Fill sample permit data"
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
                  {L('අයදුම්පත සාර්ථකව ඉදිරිපත් කරන ලදී!', 'Permit Application Submitted!', 'விண்ணப்பம் வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது!')}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {L(
                    'ඔබගේ මාර්ග කැණීම් අවසර පත්‍ර අයදුම්පත හෝමාගම ප්‍රාදේශීය සභාවේ ඉංජිනේරු හා මාර්ග අංශය වෙත යොමු කර ඇත.',
                    'Your Road Excavation Permit application has been submitted to the Homagama Pradeshiya Sabha Engineering & Roads Department.',
                    'உங்கள் வீதி அகழ்வு அனுமதி விண்ணப்பம் பிரதேச சபை பொறியியல் பிரிவுக்கு அனுப்பப்பட்டுள்ளது.'
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
                    'ජාතික ජල සම්පාදන හා ජලාපවහන මණ්ඩලයේ ලිපිය හා මාර්ග විස්තරය නිවැරදිව ඇතුළත් කරන්න.',
                    'Please fill in your Water Board reference details, premises assessment number, and road excavation specifications.',
                    'நீர் வழங்கல் சபையின் கடித விவரங்கள் மற்றும் வீதி அகழ்வு விவரங்களை சரியாக பூர்த்தி செய்யவும்.'
                  )}
                </div>
              </div>

              {/* Section 1: Reference Letter Details */}
              <div className="bg-white rounded-2xl border border-gray-200/90 p-6 sm:p-8 shadow-xs space-y-6">
                <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                  <span className="bg-[#8C1538] text-white w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm shrink-0">
                    01
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900">
                      {L('ලිපි යොමු තොරතුරු', 'Reference Letter Details', 'கடித குறிப்பு தகவல்கள்')}
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2">
                      <span className="block text-sm sm:text-base font-bold text-gray-900">
                        {L('උක්ත කරුණ සඳහා වූ ලිපි අංකය', 'Reference Letter Number', 'கடித இலக்கம்')} <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      name="referenceLetterNo"
                      required
                      value={formData.referenceLetterNo}
                      onChange={handleInputChange}
                      placeholder="e.g. NWSDB/HMA/2026/142"
                      className="w-full bg-gray-50/70 border border-gray-300 focus:bg-white focus:border-[#8C1538] focus:ring-4 focus:ring-[#8C1538]/10 rounded-xl px-4 py-3 text-sm sm:text-base font-medium text-gray-900 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block mb-2">
                      <span className="block text-sm sm:text-base font-bold text-gray-900">
                        {L('ලිපියේ දිනය', 'Letter Date', 'கடித திகதி')} <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <input
                      type="date"
                      name="referenceDate"
                      required
                      value={formData.referenceDate}
                      onChange={handleInputChange}
                      className="w-full bg-gray-50/70 border border-gray-300 focus:bg-white focus:border-[#8C1538] focus:ring-4 focus:ring-[#8C1538]/10 rounded-xl px-4 py-3 text-sm sm:text-base font-medium text-gray-900 focus:outline-none transition-all"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block mb-2">
                      <span className="block text-sm sm:text-base font-bold text-gray-900">
                        {L('හෝමාගම ප්‍රාදේශීය සභා බල ප්‍රදේශයට අයත් අංක / ස්ථානය', 'Assessment Number / Premises Location', 'மதிப்பீட்டு இலக்கம் / இடம்')} <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      name="assessmentNo"
                      required
                      value={formData.assessmentNo}
                      onChange={handleInputChange}
                      placeholder="e.g. 45/2B, Temple Road, Homagama"
                      className="w-full bg-gray-50/70 border border-gray-300 focus:bg-white focus:border-[#8C1538] focus:ring-4 focus:ring-[#8C1538]/10 rounded-xl px-4 py-3 text-sm sm:text-base font-medium text-gray-900 focus:outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Road Type & Excavation Specification */}
              <div className="bg-white rounded-2xl border border-gray-200/90 p-6 sm:p-8 shadow-xs space-y-6">
                <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                  <span className="bg-[#8C1538] text-white w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm shrink-0">
                    02
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900">
                      {L('මාර්ග වර්ගය සහ කැණීම් ප්‍රමාණය', 'Road Surface Type & Excavation Area', 'வீதி வகை மற்றும் அகழ்வு அளவு')}
                    </h3>
                  </div>
                </div>

                <div>
                  <label className="block text-sm sm:text-base font-bold text-gray-900 mb-3">
                    {L('මාර්ගයේ වර්ගය තෝරන්න', 'Select Road Surface Type', 'வீதி வகையை தேர்ந்தெடுக்கவும்')} <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {roadTypeOptions.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setFormData((p) => ({ ...p, roadType: opt.id }))}
                        className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                          formData.roadType === opt.id
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div>
                    <label className="block mb-2">
                      <span className="block text-sm sm:text-base font-bold text-gray-900">
                        {L('කැණීම් සඳහා වර්ග මීටර් ප්‍රමාණය', 'Excavation Area (Square Meters)', 'அகழ்வு பரப்பளவு (சதுர மீட்டர்)')} <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      name="excavationAreaSqM"
                      required
                      value={formData.excavationAreaSqM}
                      onChange={handleInputChange}
                      placeholder="e.g. 4.5"
                      className="w-full bg-gray-50/70 border border-gray-300 focus:bg-white focus:border-[#8C1538] focus:ring-4 focus:ring-[#8C1538]/10 rounded-xl px-4 py-3 text-sm sm:text-base font-bold text-gray-900 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block mb-2">
                      <span className="block text-sm sm:text-base font-bold text-gray-900">
                        {L('ගෙවන ලද ගාස්තුව (රු.)', 'Paid Damage Deposit / Fee (LKR)', 'செலுத்தப்பட்ட கட்டணம் (ரூ.)')}
                      </span>
                    </label>
                    <input
                      type="number"
                      name="feePaidLkr"
                      value={formData.feePaidLkr}
                      onChange={handleInputChange}
                      placeholder="e.g. 15000"
                      className="w-full bg-gray-50/70 border border-gray-300 focus:bg-white focus:border-[#8C1538] focus:ring-4 focus:ring-[#8C1538]/10 rounded-xl px-4 py-3 text-sm sm:text-base font-bold text-gray-900 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2">
                    <span className="block text-sm sm:text-base font-bold text-gray-900">
                      {L('අයදුම්කරු / ආයතනය', 'Applicant Name / Institution', 'விண்ணப்பதாரர் / நிறுவனம்')} <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    name="applicantNameOrInstitution"
                    required
                    value={formData.applicantNameOrInstitution}
                    onChange={handleInputChange}
                    placeholder="e.g. K. A. D. Samantha Perera"
                    className="w-full bg-gray-50/70 border border-gray-300 focus:bg-white focus:border-[#8C1538] focus:ring-4 focus:ring-[#8C1538]/10 rounded-xl px-4 py-3 text-sm sm:text-base font-medium text-gray-900 focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Section 3: Statutory Conditions (Matching Form 3 Exactly) */}
              <div className="bg-white rounded-2xl border border-gray-200/90 p-6 sm:p-8 shadow-xs space-y-6">
                <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                  <span className="bg-[#8C1538] text-white w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm shrink-0">
                    03
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900">
                      {L('කොන්දේසි සහ එකඟතාවය', 'Statutory Conditions & Declaration', 'நிபந்தனைகள் மற்றும் உறுதிமொழி')}
                    </h3>
                  </div>
                </div>

                <div className="bg-red-50/60 border border-red-100 rounded-2xl p-5 space-y-3">
                  <div className="font-bold text-[#8C1538] uppercase text-xs tracking-wider">
                    {L('කොන්දේසි / Mandatory Conditions:', 'Mandatory Conditions:', 'கட்டாய நிபந்தனைகள்:')}
                  </div>
                  <ul className="space-y-2.5 list-disc list-inside text-xs sm:text-sm text-gray-800 leading-relaxed">
                    <li>
                      <span className="font-bold text-gray-900">
                        {L(
                          'මාර්ග කැණීම් කටයුතු මාසයක් ඇතුළත අවසන් කළ යුතුය.',
                          'Road excavation work must be completed within one month.',
                          'வீதி அகழ்வு பணிகளை ஒரு மாதத்திற்குள் முடிக்க வேண்டும்.'
                        )}
                      </span>
                    </li>
                    <li>
                      <span className="font-bold text-gray-900">
                        {L(
                          'මාර්ග කැණීමට ඇස්ෆෝල්ට් කපන යන්ත්‍රය භාවිතා කළ යුතුය.',
                          'Asphalt cutter machine must be used for road excavation.',
                          'வீதி அகழ்வுக்கு அஸ்பால்ட் வெட்டும் இயந்திரத்தை பயன்படுத்த வேண்டும்.'
                        )}
                      </span>
                    </li>
                    <li>
                      <span className="font-bold text-gray-900">
                        {L(
                          'කොන්ක්‍රීට් හා කොන්ක්‍රීට් ගල් අතුරන මාර්ගයන් නැවත පිළිසකර කිරීම ඉල්ලුම්කරු විසින් සිදු කළ යුතුය.',
                          'Reconstruction of concrete and interlocking paving block roads must be carried out by the applicant.',
                          'கொங்கிரீட் மற்றும் கல் வீதிகளை மீளமைப்பது விண்ணப்பதாரரால் செய்யப்பட வேண்டும்.'
                        )}
                      </span>
                    </li>
                    <li>
                      <span className="font-bold text-gray-900">
                        {L(
                          'කාපට් හා තාර මාර්ග සඳහා ගෙවනු ලබන මුදල් ආපසු ගෙවීම් කරනු නොලැබේ. (බොරළු පාරවල් සඳහා මාර්ග හානි අය කිරීම සිදු නොකෙරේ).',
                          'Fees paid for carpet and tar roads are non-refundable. (No damage fee charged for gravel roads).',
                          'காபட் மற்றும் தார் வீதிகளுக்காக செலுத்தப்படும் கட்டணம் திரும்ப வழங்கப்படமாட்டாது.'
                        )}
                      </span>
                    </li>
                  </ul>
                </div>

                <label className="flex items-start gap-3.5 cursor-pointer select-none bg-gray-50 p-4 rounded-xl border border-gray-200/80">
                  <input
                    type="checkbox"
                    name="agreedToConditions"
                    required
                    checked={formData.agreedToConditions}
                    onChange={handleInputChange}
                    className="w-5 h-5 rounded border-gray-300 text-[#8C1538] focus:ring-[#8C1538] mt-0.5 shrink-0"
                  />
                  <span className="text-xs sm:text-sm font-bold text-gray-900 leading-relaxed">
                    {L(
                      'ඉහත සඳහන් කොන්දේසිවලට යටත්ව ජලනළ සම්බන්ධය සඳහා මාර්ග කැණීම් කිරීමට අවසර ලබාගැනීමට එකඟ වෙමි.',
                      'I declare agreement to abide by the above Homagama Pradeshiya Sabha statutory conditions for road excavation.',
                      'மேற்கண்ட நிபந்தனைகளுக்கு உட்பட்டு வீதி அகழ்வு அனுமதி பெற ஒப்புக்கொள்கிறேன்.'
                    )}
                  </span>
                </label>

                {/* Date & Signature */}
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
                      placeholder="e.g. S. Perera"
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
                  {L('අයදුම්පත ඉදිරිපත් කරන්න', 'Submit Road Excavation Application', 'வீதி அகழ்வு விண்ணப்பத்தை சமர்ப்பிக்கவும்')}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoadExcavationFormModal;
