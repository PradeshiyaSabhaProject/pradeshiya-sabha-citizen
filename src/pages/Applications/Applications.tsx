import React, { useState, useEffect } from 'react';
import ApplicationFormModal from './ApplicationFormModal';
import PromotionalAdFormModal from './PromotionalAdFormModal';
import WasteRemovalFormModal from './WasteRemovalFormModal';
import RoadExcavationFormModal from './RoadExcavationFormModal';
import GullyBowserFormModal from './GullyBowserFormModal';
import BusinessTaxFormModal from './BusinessTaxFormModal';
import MyApplicationsDashboard, { type ApplicationItem } from './MyApplicationsDashboard';
import { useLanguage } from '../../context/LanguageContext';

// SVG Icons for Applications
const CertificateIcon = () => (
  <svg className="w-6 h-6 text-[#8C1538]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

const PromotionalAdIcon = () => (
  <svg className="w-6 h-6 text-[#8C1538]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
  </svg>
);

const WasteRemovalIcon = () => (
  <svg className="w-6 h-6 text-[#8C1538]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
);

const RoadExcavationIcon = () => (
  <svg className="w-6 h-6 text-[#8C1538]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
  </svg>
);

const GullyBowserIcon = () => (
  <svg className="w-6 h-6 text-[#8C1538]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
  </svg>
);

const BusinessTaxIcon = () => (
  <svg className="w-6 h-6 text-[#8C1538]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

interface ApplicationsProps {
  initialTab?: string;
}

const Applications: React.FC<ApplicationsProps> = ({ initialTab }) => {
  const [currentTab, setCurrentTab] = useState<'forms' | 'my-applications'>(
    (initialTab as 'forms' | 'my-applications') || 'forms'
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppId, setSelectedAppId] = useState('');
  const [selectedAppTitle, setSelectedAppTitle] = useState('');
  const { language: activeLanguage } = useLanguage();
  const lang = activeLanguage || 'si';
  const L = (siText: string, enText: string, taText?: string) =>
    lang === 'si' ? siText : lang === 'ta' ? (taText || enText) : enText;

  useEffect(() => {
    if (initialTab === 'my-applications' || initialTab === 'forms') {
      setCurrentTab(initialTab);
    }
  }, [initialTab]);

  const [myApplications, setMyApplications] = useState<ApplicationItem[]>([
    {
      id: 'APP-2026-042',
      date: 'Jul 14, 2026',
      category: L(
        'ප්‍රචාරක දැන්වීම් සහ ප්‍රදර්ශන පුවරු අවසර පත්‍රය',
        'Promotional Advertisement Display Permit',
        'விளம்பர பலகை காட்சி அனுமதிப்பத்திரம்'
      ),
      categoryCode: 'promotional-ad-permit',
      status: 'IN PROGRESS',
      applicantName: 'Roshan K. Gunawardena',
      nicNumber: '198731402281',
      phone: '077 458 9632',
      address: 'No. 112, High Level Road, Homagama',
      locationAddress: 'High Level Junction, Homagama Town (Near Clock Tower)',
      details: 'Annual Trade Fair & Agricultural Exhibition Promotional Banner (Length: 15 ft, Width: 4 ft, Duration: 3 Months)',
      documentName: 'EXHIBITION_BANNER_FINAL_2026.PNG',
      inspectionDate: 'Jul 15, 2026',
      approvalDate: null
    },
    {
      id: 'WM-2026-019',
      date: 'Jul 08, 2026',
      category: L(
        'වාණිජ හා හදිසි කසළ ඉවත් කිරීමේ අවසර පත්‍රය',
        'Commercial & Emergency Waste Removal Permit',
        'வர்த்தக மற்றும் அவசர கழிவு அகற்றுதல் அனுமதிப்பத்திரம்'
      ),
      categoryCode: 'waste-removal-permit',
      status: 'APPROVED',
      applicantName: 'Nimal Jayatilleke',
      nicNumber: '198123456789',
      phone: '071 854 1200',
      address: 'No. 205, High Level Road, Homagama Town',
      locationAddress: 'Homagama Green Supermarket & Food Emporium, High Level Rd',
      details: 'Monthly Commercial Solid Waste Collection (Biodegradable: 450 kg/month, Non-Biodegradable: 180 kg/month)',
      documentName: 'TRADE_LICENSE_COPY_2026.PDF',
      inspectionDate: 'Jul 09, 2026',
      approvalDate: 'Jul 11, 2026'
    },
    {
      id: 'RE-2026-008',
      date: 'Jun 28, 2026',
      category: L(
        'ජල සම්බන්ධතා සඳහා මාර්ග කැණීම් අවසර පත්‍රය',
        'Road Excavation Permit for Water Pipeline Connection',
        'நீர் இணைப்புக்கான வீதி அகழ்வு அனுமதிப்பத்திரம்'
      ),
      categoryCode: 'road-excavation-permit',
      status: 'PENDING',
      applicantName: 'Chaminda Perera',
      nicNumber: '199012345678',
      phone: '071 285 5230',
      address: 'No. 45, Temple Road, Homagama',
      locationAddress: '4th Cross Lane, Temple Road, Homagama North',
      details: 'Excavation of Carpeted Road for Water Board Main Pipeline Connection (Length: 12 meters, Depth: 1.5 meters)',
      documentName: 'WATER_BOARD_APPROVAL_LETTER.PDF',
      inspectionDate: null,
      approvalDate: null
    },
    {
      id: 'GB-2026-015',
      date: 'Jun 15, 2026',
      category: L(
        'ගලි බවුසරය ලබා ගැනීමේ ඉල්ලුම්පත්‍රය',
        'Application for Municipal Gully Bowser Service',
        'கல்லி பௌசர் சேவைக்கான விண்ணப்பம்'
      ),
      categoryCode: 'gully-bowser-service',
      status: 'APPROVED',
      applicantName: 'Sujith Fernando',
      nicNumber: '198544332211',
      phone: '075 444 3322',
      address: 'No. 88, Katuwana Industrial Estate, Homagama',
      locationAddress: 'No. 88, Katuwana Industrial Estate, Homagama',
      details: 'Emergency Septic Tank & Wastewater Pit Clearance (Capacity: 5000 Liters, Commercial Premises)',
      documentName: 'PREMISES_ASSESSMENT_TAX_RECEIPT.PDF',
      inspectionDate: 'Jun 16, 2026',
      approvalDate: 'Jun 16, 2026'
    },
    {
      id: 'SL-2026-031',
      date: 'May 20, 2026',
      category: L(
        'වීදි රේඛා, නොපවරා ගැනීමේ සහ නාගරික සහතික',
        'Street Line, Non-Vesting & Municipal Certificates',
        'வீதி கோடு மற்றும் பிரதேச சபை சான்றிதழ்கள்'
      ),
      categoryCode: 'street-line-certificate',
      status: 'REJECTED',
      applicantName: 'K. Premadasa',
      nicNumber: '197855667788',
      phone: '072 111 2233',
      address: 'No. 12, Station Road, Homagama',
      locationAddress: 'Lot 04, Plan SP-1204, Station Road, Homagama',
      details: 'Street Line & Building Limit Verification Certificate (Returned due to missing survey plan annexure B)',
      documentName: 'INCOMPLETE_SURVEY_PLAN.PDF',
      inspectionDate: 'May 22, 2026',
      approvalDate: 'May 24, 2026'
    }
  ]);

  const handleAddSubmittedApplication = (newApp: ApplicationItem) => {
    setMyApplications((prev) => [newApp, ...prev]);
  };

  const applicationsData = [
    {
      id: 'promotional-ad-permit',
      title: L(
        'ප්‍රචාරක දැන්වීම් සහ ප්‍රදර්ශන පුවරු අවසර පත්‍රය',
        'Promotional Advertisement Display Permit',
        'விளம்பர பலகை காட்சி அனுமதிப்பத்திரம்'
      ),
      desc: L(
        'හෝමාගම ප්‍රාදේශීය සභා බලප්‍රදේශය තුළ ප්‍රචාරක බැනර්, නාමපුවරු සහ වාණිජ දැන්වීම් ප්‍රදර්ශනය කිරීම සඳහා නිල අවසර පත්‍රය ලබා ගැනීම.',
        'Apply for official municipal permit to display promotional banners, signboards, hoardings, and commercial advertisements within the Pradeshiya Sabha area.',
        'பிரதேச சபை எல்லைக்குள் விளம்பர பதாகைகள் மற்றும் வர்த்தக பலகைகளை காட்சிப்படுத்துவதற்கான அனுமதிப்பத்திரம்.'
      ),
      icon: <PromotionalAdIcon />,
      formCode: 'හෝ/ප්‍රාස/3/3',
      badgeText: L('නව • නිල ෆෝරමය', 'New • Official Form', 'புதிய • அதிகாரப்பூர்வ படிவம்')
    },
    {
      id: 'waste-removal-permit',
      title: L(
        'වාණිජ හා හදිසි කසළ ඉවත් කිරීමේ අවසර පත්‍රය',
        'Commercial & Emergency Waste Removal Permit',
        'வர்த்தக மற்றும் அவசர கழிவு அகற்றுதல் அனுமதிப்பத்திரம்'
      ),
      desc: L(
        'ව්‍යාපාරික ආයතන, කර්මාන්ත හා ආයතන සඳහා මාසික හෝ හදිසි කසළ ඉවත් කිරීමේ නාගරික සේවාවන් ලබා ගැනීම.',
        'Apply for monthly or emergency municipal solid waste collection and disposal services for enterprises and institutions.',
        'நிறுவனங்களுக்கான மாதாந்த அல்லது அவசர கழிவு அகற்றுதல் சேவைகளுக்கான விண்ணப்பம்.'
      ),
      icon: <WasteRemovalIcon />,
      formCode: 'WM-SWM-02',
      badgeText: L('නව • නිල ෆෝරමය', 'New • Official Form', 'புதிய • அதிகாரப்பூர்வ படிவம்')
    },
    {
      id: 'road-excavation-permit',
      title: L(
        'ජල සම්බන්ධතා සඳහා මාර්ග කැණීම් අවසර පත්‍රය',
        'Road Excavation Permit for Water Pipeline Connection',
        'நீர் இணைப்புக்கான வீதி அகழ்வு அனுமதிப்பத்திரம்'
      ),
      desc: L(
        'ජල සම්පාදන සම්බන්ධතා ලබා ගැනීම සඳහා තාර, කාපට්, කොන්ක්‍රීට් හෝ බොරළු මාර්ග කැණීමට ප්‍රාදේශීය සභා අවසරය ලබා ගැනීම.',
        'Apply for municipal permission to excavate/cut tar, carpet, concrete, interlocking block, or gravel roads for water supply connection.',
        'நீர் வழங்கல் இணைப்புக்காக வீதிகளை தோண்டுவதற்கான பிரதேச சபை அனுமதி.'
      ),
      icon: <RoadExcavationIcon />,
      formCode: 'හෝ/ප්‍රාස/3/8/මාර්ග කැණීම්',
      badgeText: L('නව • නිල ෆෝරමය', 'New • Official Form', 'புதிய • அதிகாரப்பூர்வ படிவம்')
    },
    {
      id: 'gully-bowser-service',
      title: L(
        'ගලි බවුසරය ලබා ගැනීමේ ඉල්ලුම්පත්‍රය',
        'Application for Municipal Gully Bowser Service',
        'கல்லி பௌசர் சேவைக்கான விண்ணப்பம்'
      ),
      desc: L(
        'නේවාසික, ව්‍යාපාරික, කර්මාන්ත හෝ රාජ්‍ය ආයතනවල අපජලය හා ගලි ටැංකි හිස් කිරීම සඳහා ප්‍රාදේශීය සභා ගලි බවුසර රථය වෙන්කර ගැනීම.',
        'Apply for municipal gully bowser trucks to empty septic tanks and wastewater pits for residential, commercial, industrial, or government premises.',
        'செப்டிக் டேங்குகளை சுத்தம் செய்வதற்கான பிரதேச சபை கல்லி பௌசர் சேவை.'
      ),
      icon: <GullyBowserIcon />,
      formCode: 'ගලි බවුසර ඉල්ලුම',
      badgeText: L('නව • නිල ෆෝරමය', 'New • Official Form', 'புதிய • அதிகாரப்பூர்வ படிவம்')
    },
    {
      id: 'business-tax-permit',
      title: L(
        'කර්මාන්ත හා ව්‍යාපාර බදු අයදුම්පත්‍රය - "ඒ" කොටස',
        'Industrial / Trade & Business Tax Application (Part A)',
        'தொழில் / வியாபார வரி விண்ணப்பம் (பகுதி A)'
      ),
      desc: L(
        'වාර්ෂික කර්මාන්ත හා ව්‍යාපාර බදු තක්සේරු ඉල්ලුම්පත්‍රයේ "ඒ" කොටස හෝමාගම ප්‍රාදේශීය සභාවේ ප්‍රධාන කාර්යාලය වෙත ඉදිරිපත් කිරීම.',
        'Submit annual trade and industry license assessment return (Part A) to Homagama Pradeshiya Sabha Head Office.',
        'வருடாந்த தொழில் மற்றும் வர்த்தக வரி மதிப்பீட்டு விண்ணப்பம் (பகுதி A) சமர்ப்பித்தல்.'
      ),
      icon: <BusinessTaxIcon />,
      formCode: 'ව්‍යාපාර බදු - "ඒ" කොටස',
      badgeText: L('වාර්ෂික • නිල ෆෝරමය', 'Annual • Official Form', 'வருடாந்தம் • அதிகாரப்பூர்வ படிவம்')
    },
    {
      id: 'street-line-certificate',
      title: L(
        'වීදි රේඛා, නොපවරා ගැනීමේ සහ නාගරික සහතික',
        'Street Line, Non-Vesting & Municipal Certificates',
        'வீதி கோடு மற்றும் பிரதேச சபை சான்றிதழ்கள்'
      ),
      desc: L(
        'වීදි රේඛා සහ ගොඩනැගිලි සීමා සහතික, වරිපනම් බදු ගෙවීම් තහවුරු කිරීමේ සහතික හෝ ප්‍රාදේශීය සභා පොදු මාර්ග සහතික ලබා ගැනීම.',
        'Apply for Street Line & Building Limits, Assessment Tax Payment verification, or Pradeshiya Sabha Public Road Maintenance certificates.',
        'வீதி கோடு, கட்டிட எல்லை மற்றும் பிரதேச சபை சான்றிதழ்களுக்கான விண்ணப்பம்.'
      ),
      icon: <CertificateIcon />,
      formCode: 'SL-NVC-01',
      badgeText: L('නිල ෆෝරමය', 'Official Form', 'அதிகாரப்பூர்வ படிவம்')
    }
  ];

  const filteredApplications = applicationsData.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.formCode && item.formCode.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const openApplicationModal = (id: string, title: string) => {
    setSelectedAppId(id);
    setSelectedAppTitle(title);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-6 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Top Header & View Switcher */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-2 border-b border-gray-100">
          <div className="space-y-2 max-w-2xl">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              {L(
                'ඩිජිටල් පුරවැසි අයදුම්පත් හා බලපත්‍ර පැනලය',
                'Digital Citizen Applications & Permits',
                'டிஜிட்டல் குடிமக்கள் விண்ணப்பங்கள்'
              )}
            </h1>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              {L(
                'හෝමාගම ප්‍රාදේශීය සභාවේ නිල අයදුම්පත් හා අවසර පත්‍ර මාර්ගගතව ඉදිරිපත් කරන්න හෝ ඉදිරිපත් කළ අයදුම්පත් වල ප්‍රගතිය නිරීක්ෂණය කරන්න.',
                'Submit formal applications online or switch to My Applications to view entered details and track live progress stages.',
                'ஹோமகம பிரதேச சபைக்கு உத்தியோகபூர்வ விண்ணப்பங்கள் மற்றும் அனுமதிப்பத்திரங்களை சமர்ப்பிக்கவும்.'
              )}
            </p>
          </div>

          {/* View Switcher Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setCurrentTab('forms')}
              className={`px-5 py-2.5 rounded-md font-semibold text-sm transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-xs ${currentTab === 'forms'
                  ? 'bg-[#8C1538] hover:bg-[#73102d] text-white shadow-xs'
                  : 'bg-white border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 hover:bg-gray-50 shadow-2xs'
                }`}
            >

              <span>{L('නව අයදුම්පත් (Permit Catalog)', 'Apply for Permits', 'விண்ணப்பங்கள்')}</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentTab('my-applications')}
              className={`px-5 py-2.5 rounded-md font-semibold text-sm transition-all duration-200 flex items-center gap-2.5 cursor-pointer shadow-xs ${currentTab === 'my-applications'
                  ? 'bg-[#8C1538] hover:bg-[#73102d] text-white shadow-xs'
                  : 'bg-white border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 hover:bg-gray-50 shadow-2xs'
                }`}
            >

              <span>{L('මගේ අයදුම්පත්', 'My Applications', 'எனது விண்ணப்பங்கள்')}</span>
              <span
                className={`text-[11px] font-mono px-2 py-0.5 rounded-full font-bold ${currentTab === 'my-applications'
                    ? 'bg-white/20 text-white border border-white/20'
                    : 'bg-[#8C1538]/10 text-[#8C1538]'
                  }`}
              >
                {myApplications.length}
              </span>
            </button>
          </div>
        </div>

        {/* Main Content Area Based on Active Tab */}
        {currentTab === 'my-applications' ? (
          <MyApplicationsDashboard
            applications={myApplications}
            onNavigateToForms={() => setCurrentTab('forms')}
            L={L}
          />
        ) : (
          <>
            {/* Filter Applications Search Bar */}
            <div className="mb-8">
              <label
                htmlFor="application-search"
                className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 block select-none"
              >
                {L('අයදුම්පත් පෙරහන', 'FILTER APPLICATIONS', 'விண்ணப்பங்களை வடிகட்டவும்')}
              </label>
              <div className="relative w-full">
                <input
                  id="application-search"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={L('අයදුම්පත් සොයන්න...', 'Search applications...', 'விண்ணப்பங்களைத் தேடுங்கள்...')}
                  className="w-full bg-[#f3f4f6] border border-transparent focus:border-gray-300 focus:bg-white rounded-xl py-3.5 pl-4 pr-11 text-sm text-gray-800 placeholder-gray-500 focus:outline-none transition-all duration-200 shadow-2xs"
                />
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                  <SearchIcon />
                </div>
              </div>
            </div>

            {/* Applications Grid */}
            {filteredApplications.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center my-6">
                <div className="text-4xl mb-3">🔍</div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">
                  {L('අයදුම්පත් කිසිවක් හමු නොවිණි', 'No applications found', 'விண்ணப்பங்கள் எதுவும் காணப்படவில்லை')}
                </h3>
                <p className="text-sm text-gray-500">
                  {L(
                    'ඔබගේ සෙවුමට ගැළපෙන අයදුම්පත් නොමැත. වෙනත් වචනයක් උත්සාහ කරන්න.',
                    'No municipal applications match your search query. Try another term.',
                    'உங்கள் தேடலுக்கு பொருந்தக்கூடிய விண்ணப்பங்கள் எதுவும் இல்லை.'
                  )}
                </p>
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="mt-4 inline-block text-xs font-bold text-[#8C1538] hover:underline cursor-pointer"
                >
                  {L('පෙරහන ඉවත් කරන්න', 'Clear filter', 'வடிகட்டலை அகற்று')}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredApplications.map((application) => (
                  <div
                    key={application.id}
                    onClick={() => openApplicationModal(application.id, application.title)}
                    className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-xs hover:shadow-lg hover:border-[#8C1538]/50 transition-all duration-200 cursor-pointer flex flex-col justify-between group relative overflow-hidden"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3.5 sm:mb-5">
                        <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-red-50 text-[#8C1538] flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                          {application.icon}
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          {application.badgeText && (
                            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-[#8C1538]/10 text-[#8C1538] px-2 sm:px-2.5 py-0.5 rounded-full">
                              {application.badgeText}
                            </span>
                          )}
                          {application.formCode && (
                            <span className="text-[10px] sm:text-[11px] font-mono font-medium text-gray-500">
                              {application.formCode}
                            </span>
                          )}
                        </div>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1.5 sm:mb-2 group-hover:text-[#8C1538] transition-colors leading-snug">
                        {application.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4 sm:mb-6">
                        {application.desc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#8C1538] group-hover:translate-x-1 transition-transform">
                      <span>{L('මාර්ගගතව අයදුම් කරන්න', 'Apply Online', 'ஆன்லைனில் விண்ணப்பிக்கவும்')}</span>
                      <span>→</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Application Form Modal Switcher */}
        {selectedAppId === 'promotional-ad-permit' ? (
          <PromotionalAdFormModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            applicationTitle={selectedAppTitle}
            onAddApplication={(appData: any) => {
              handleAddSubmittedApplication(appData);
            }}
          />
        ) : selectedAppId === 'waste-removal-permit' ? (
          <WasteRemovalFormModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onAddApplication={(appData: any) => {
              handleAddSubmittedApplication(appData);
            }}
          />
        ) : selectedAppId === 'road-excavation-permit' ? (
          <RoadExcavationFormModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onAddApplication={(appData: any) => {
              handleAddSubmittedApplication(appData);
            }}
          />
        ) : selectedAppId === 'gully-bowser-service' ? (
          <GullyBowserFormModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onAddApplication={(appData: any) => {
              handleAddSubmittedApplication(appData);
            }}
          />
        ) : selectedAppId === 'business-tax-permit' ? (
          <BusinessTaxFormModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onAddApplication={(appData: any) => {
              handleAddSubmittedApplication(appData);
            }}
          />
        ) : (
          <ApplicationFormModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            applicationTitle={selectedAppTitle}
            onAddApplication={(appData: any) => {
              handleAddSubmittedApplication(appData);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Applications;


