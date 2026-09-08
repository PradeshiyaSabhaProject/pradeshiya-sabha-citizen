import React, { useState, useRef } from 'react';
import { useLanguage } from '../../../context/LanguageContext';

interface LetterFormProps {
  onSubmit: (letterData: any) => Promise<void> | void;
  onBackToDashboard: () => void;
  loading?: boolean;
}

export default function LetterForm({ onSubmit, onBackToDashboard, loading = false }: LetterFormProps) {
  const { language: activeLanguage } = useLanguage();
  const lang = activeLanguage || 'si';
  const L = (siText: string, enText: string, taText?: string) =>
    lang === 'si' ? siText : lang === 'ta' ? (taText || enText) : enText;

  const [formData, setFormData] = useState({
    fullName: '',
    contactNumber: '',
    email: '',
    recipient: 'Chairman / Municipal Secretary',
    category: 'Building and planning',
    subject: '',
    description: '',
    urgency: 'Normal'
  });

  const [document, setDocument] = useState<File | null>(null);
  const docInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDocument(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.subject.trim() || !formData.description.trim()) {
      alert(L('කරුණාකර සියලුම අවශ්‍ය තොරතුරු පුරවන්න.', 'Please fill in all required fields.', 'தயவுசெய்து அனைத்து தேவையான புலங்களையும் நிரப்பவும்.'));
      return;
    }

    onSubmit({
      ...formData,
      document: document ? URL.createObjectURL(document) : null,
      documentName: document ? document.name : null
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        {/* Header strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-6 border-b border-gray-150">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              {L('නව නිල ලිපියක් හෝ ඉල්ලීමක් යොමු කිරීම', 'Submit Official Correspondence & Letter Request', 'புதிய அதிகாரபூர்வ கடிதம் சமர்ப்பிக்க')}
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              {L(
                'හෝමාගම ප්‍රාදේශීය සභාවේ අදාළ අංශ හෝ නිලධාරීන් වෙත ඔබගේ නිල ලිපිය හෝ ඉල්ලීම ඍජුවම යොමු කරන්න.',
                'Submit formal letters and requests directly to the municipal secretariat and departmental officers.',
                'ஹோமகம பிரதேச சபையின் உரிய பிரிவுக்கு உங்கள் கடிதத்தை சமர்ப்பிக்கவும்.'
              )}
            </p>
          </div>
          <button
            type="button"
            onClick={onBackToDashboard}
            className="text-xs font-bold text-gray-500 hover:text-gray-800 transition-colors self-start sm:self-auto cursor-pointer"
          >
            ← {L('ආපසු ලිපි වෙත', 'Back to Letter Requests', 'கடிதங்களுக்குத் திரும்பு')}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1 & 2: 2-column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sender / Citizen Information */}
            <div className="bg-stone-50/70 border border-gray-200 rounded-xl p-5 space-y-4">
              <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                <span>👤</span> {L('පුරවැසි තොරතුරු', 'Sender / Citizen Identification', 'அனுப்புனர் தகவல்')}
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <label htmlFor="fullName" className="block font-semibold text-gray-700 mb-1">
                    {L('සම්පූර්ණ නම', 'Full Name', 'முழுப் பெயர்')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-200 rounded-lg p-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#8C1538]"
                    placeholder={L('ඔබගේ සම්පූර්ණ නම', 'Enter your full legal name', 'உங்கள் முழுப் பெயர்')}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="contactNumber" className="block font-semibold text-gray-700 mb-1">
                    {L('දුරකථන අංකය', 'Contact Mobile Number', 'தொலைபேசி எண்')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contactNumber"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-200 rounded-lg p-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#8C1538]"
                    placeholder="07X XXX XXXX"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block font-semibold text-gray-700 mb-1">
                    {L('විද්‍යුත් තැපෑල (විකල්ප)', 'Email Address (Optional)', 'மின்னஞ்சல் (விருப்பத்திற்குரியது)')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-200 rounded-lg p-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#8C1538]"
                    placeholder="citizen@example.com"
                  />
                </div>
              </div>
            </div>

            {/* Department Routing Meta */}
            <div className="bg-stone-50/70 border border-gray-200 rounded-xl p-5 space-y-4">
              <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                <span>🏛️</span> {L('අදාළ අංශය සහ ලබන්නා', 'Departmental Routing & Recipient', 'பிரிவு மற்றும் பெறுநர்')}
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <label htmlFor="category" className="block font-semibold text-gray-700 mb-1">
                    {L('අදාළ දෙපාර්තමේන්තුව / කාණ්ඩය', 'Department / Subject Category', 'பிரிவு / வகை')} <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-200 rounded-lg p-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#8C1538] cursor-pointer"
                    required
                  >
                    <option value="Building and planning">{L('ගොඩනැගිලි හා සැලසුම් අංශය', 'Building & Planning Division', 'கட்டடம் மற்றும் திட்டமிடல் பிரிவு')}</option>
                    <option value="Water and utilities">{L('ජලය හා උපයෝගීතා අංශය', 'Water & Utilities Division', 'நீர் மற்றும் பயன்பாடுகள் பிரிவு')}</option>
                    <option value="Land and property">{L('ඉඩම් හා දේපළ අංශය', 'Land & Property Division', 'நிலம் மற்றும் சொத்து பிரிவு')}</option>
                    <option value="Tax and finance">{L('බදු හා මූල්‍ය අංශය', 'Tax & Finance Division', 'வரி மற்றும் நிதி பிரிவு')}</option>
                    <option value="Health and sanitation">{L('සෞඛ්‍ය හා සනීපාරක්ෂක අංශය', 'Health & Sanitation Division', 'சுகாதாரம் மற்றும் தூய்மை பிரிவு')}</option>
                    <option value="General Administration">{L('පොදු පරිපාලන අංශය', 'General Administration', 'பொது நிர்வாகம்')}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="recipient" className="block font-semibold text-gray-700 mb-1">
                    {L('ලිපිය යොමු කරන නිලධාරියා (To:)', 'Addressed To (Official Designation)', 'பெறுநர்')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="recipient"
                    name="recipient"
                    value={formData.recipient}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-200 rounded-lg p-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#8C1538]"
                    placeholder={L('සභාපති / ලේකම් / ප්‍රධාන ඉංජිනේරු...', 'Chairman / Secretary / Chief Civil Engineer...', 'தலைவர் / செயலாளர்...')}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="urgency" className="block font-semibold text-gray-700 mb-1">
                    {L('ප්‍රමුඛතාව / හදිසිභාවය', 'Urgency Level', 'அவசர நிலை')}
                  </label>
                  <select
                    id="urgency"
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-200 rounded-lg p-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#8C1538] cursor-pointer"
                  >
                    <option value="Normal">{L('සාමාන්‍ය (දින 3 - 5)', 'Normal Priority (3 - 5 Working Days)', 'வழக்கமான')}</option>
                    <option value="High">{L('ඉහළ ප්‍රමුඛතාව (දින 1 - 2)', 'High Priority (1 - 2 Working Days)', 'உயர் முன்னுரிமை')}</option>
                    <option value="Urgent">{L('හදිසි / කඩිනම්', 'Urgent / Immediate Attention', 'அவசரம்')}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Subject, Body, and Attachments */}
          <div className="bg-stone-50/70 border border-gray-200 rounded-xl p-5 space-y-4">
            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
              <span>📄</span> {L('ලිපියේ අන්තර්ගතය සහ ලේඛන', 'Letter Content & Documentation', 'கடித உள்ளடக்கம்')}
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label htmlFor="subject" className="block font-semibold text-gray-700 mb-1">
                  {L('ලිපියේ මාතෘකාව / විෂය', 'Subject of the Letter', 'கடிதத்தின் பொருள்')} <span className="text-red-500">*</span>
                </label>
                <input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-200 rounded-lg p-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#8C1538]"
                  placeholder={L('උදා: ගොඩනැගිලි සැලසුම් අනුමැතිය ඉල්ලා සිටීම', 'e.g. Request for Building Plan Approval & Site Inspection', 'உ-ம்: கட்டட அனுமதி கோரிக்கை')}
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block font-semibold text-gray-700 mb-1">
                  {L('ලිපියේ සම්පූර්ණ විස්තරය / ඉල්ලීම', 'Letter Body & Detailed Explanation', 'கடிதத்தின் விரிவான உள்ளடக்கம்')} <span className="text-red-500">*</span>
                </label>
                <div className="border border-gray-200 rounded-lg overflow-hidden bg-white focus-within:border-[#8C1538]">
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={7}
                    className="w-full p-3 text-xs text-gray-900 focus:outline-none resize-none leading-relaxed"
                    placeholder={L(
                      'ගරු සභාපතිතුමනි / ලේකම්තුමනි,\n\nමෙම ලිපිය මගින් මා ඉල්ලා සිටින්නේ...',
                      'Dear Sir / Madam,\n\nI am writing to formally request / inquire regarding...',
                      'அன்பார்ந்த ஐயா / அம்மையீர்,\n\nநான் இத்தால் கோருவது யாதெனில்...'
                    )}
                    required
                  />
                  {/* Formatting Toolbar */}
                  <div className="flex items-center gap-1 px-3 py-1.5 border-t border-gray-150 bg-gray-50/80 text-gray-500 text-[11px]">
                    <span className="font-semibold text-gray-400 mr-2 select-none">Quick Tools:</span>
                    <button
                      type="button"
                      onClick={() => setFormData((p) => ({ ...p, description: p.description + '\n\n• Point 1: \n• Point 2: ' }))}
                      className="px-2 py-0.5 rounded hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                      + Bullet List
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData((p) => ({ ...p, description: p.description + '\n\nReference Document Number: ' }))}
                      className="px-2 py-0.5 rounded hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                      + Reference Ref
                    </button>
                  </div>
                </div>
              </div>

              {/* Upload Dropzone */}
              <div className="pt-2">
                <label className="block font-semibold text-gray-700 mb-1">
                  {L('සහායක ලිපි ලේඛන (PDF / පින්තූර)', 'Supporting Documents & Attachments (Optional)', 'ஆதரவு ஆவணங்கள்')}
                </label>
                <div
                  onClick={() => docInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 hover:border-[#8C1538] rounded-xl p-5 text-center cursor-pointer transition-colors bg-white"
                >
                  <span className="text-2xl block mb-1">📎</span>
                  <p className="text-xs font-bold text-gray-800">
                    {document ? document.name : L('ගොනුව තෝරන්න හෝ මෙතැනට ඇද දමන්න', 'Click to upload or drag & drop files', 'கோப்பை பதிவேற்ற கிளிக் செய்க')}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    {document ? `${(document.size / 1024 / 1024).toFixed(2)} MB • Ready to attach` : 'PDF, DOCX, PNG, JPG (Max 10MB)'}
                  </p>
                  <input
                    type="file"
                    ref={docInputRef}
                    hidden
                    accept=".pdf,.docx,image/*"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onBackToDashboard}
              className="border border-gray-300 hover:bg-gray-100 text-gray-700 px-5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
            >
              {L('අවලංගු කරන්න', 'Cancel', 'ரத்து')}
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-[#8C1538] hover:bg-[#73102d] text-white px-6 py-2.5 rounded-lg text-xs font-extrabold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>{L('යොමු කරමින්...', 'Submitting...', 'சமர்ப்பிக்கிறது...')}</span>
                </>
              ) : (
                <>
                  <span>✉️</span>
                  <span>{L('නිල ලිපිය යොමු කරන්න', 'Submit Official Letter Request', 'கடிதத்தை சமர்ப்பிக்கவும்')}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
