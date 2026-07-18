import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

export interface ApplicationItem {
  id: string;
  date: string;
  category: string;
  categoryCode: string;
  status: 'PENDING' | 'IN PROGRESS' | 'APPROVED' | 'REJECTED';
  applicantName: string;
  nicNumber: string;
  phone: string;
  address: string;
  locationAddress: string;
  details: string;
  documentName?: string;
  inspectionDate?: string | null;
  approvalDate?: string | null;
}

interface MyApplicationsDashboardProps {
  applications: ApplicationItem[];
  onNavigateToForms: () => void;
  L: (siText: string, enText: string, taText?: string) => string;
}

const MyApplicationsDashboard: React.FC<MyApplicationsDashboardProps> = ({
  applications = [],
  onNavigateToForms,
  L
}) => {
  const { t } = useLanguage();

  // Filters State
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [searchTerm, setSearchTerm] = useState('');

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Inspect Modal State
  const [selectedApp, setSelectedApp] = useState<ApplicationItem | null>(null);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'IN PROGRESS':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'REJECTED':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-amber-50 text-amber-700 border-amber-200'; // PENDING
    }
  };

  const getStatusBannerStyle = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-emerald-50 border-emerald-200 text-emerald-800';
      case 'IN PROGRESS':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'REJECTED':
        return 'bg-rose-50 border-rose-200 text-rose-800';
      default:
        return 'bg-amber-50 border-amber-200 text-amber-800'; // PENDING
    }
  };

  const getStatusBannerMessage = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return L(
          'ඔබගේ අයදුම්පත්‍රය අනුමත කර ඇති අතර අදාළ අවසර පත්‍රය/සහතිකය නිකුත් කර ඇත.',
          'Your application has been approved and the official municipal permit/certificate has been issued.',
          'உங்கள் விண்ணப்பம் அங்கீகரிக்கப்பட்டுள்ளது மற்றும் அதிகாரப்பூர்வ அனுமதிப்பத்திரம் வழங்கப்பட்டுள்ளது.'
        );
      case 'IN PROGRESS':
        return L(
          'අදාළ තාක්ෂණික නිලධාරීන් විසින් ඔබගේ අයදුම්පත්‍රය සහ ස්ථානය දැනට පරීක්ෂා කරමින් පවතී.',
          'Your application is actively undergoing technical field inspection and department verification.',
          'உங்கள் விண்ணப்பம் தற்போது தொழில்நுட்ப கள ஆய்வு மற்றும் துறை சரிபார்ப்புக்கு உட்பட்டுள்ளது.'
        );
      case 'REJECTED':
        return L(
          'අවශ්‍ය ලිපිලේඛන හෝ තාක්ෂණික නිර්ණායක සපුරා නොමැති බැවින් මෙම අයදුම්පත්‍රය ප්‍රතික්ෂේප වී හෝ නැවත යොමු කර ඇත.',
          'This application has been returned or rejected due to unmet technical criteria or missing annexures.',
          'தேவையான ஆவணங்கள் அல்லது தொழில்நுட்ப அளவுகோல்கள் பூர்த்தி செய்யப்படாததால் இந்த விண்ணப்பம் நிராகரிக்கப்பட்டுள்ளது.'
        );
      default:
        return L(
          'ඔබගේ ඉල්ලුම්පත්‍රය සාර්ථකව පද්ධතියට ලැබී ඇති අතර තාක්ෂණික පරීක්ෂණ අංශයට යොමු කෙරෙමින් පවතී.',
          'Your application has been received and is awaiting assignment to the technical verification desk.',
          'உங்கள் விண்ணப்பம் பெறப்பட்டுள்ளது மற்றும் தொழில்நுட்ப சரிபார்ப்பு பிரிவின் ஒதுக்கீட்டிற்காக காத்திருக்கிறது.'
        );
    }
  };

  // Progress timeline generator exactly like ComplaintDashboard.tsx
  const getTimelineSteps = (app: ApplicationItem) => {
    const statusOrder = ['PENDING', 'IN PROGRESS', 'APPROVED'];
    let currentIndex = statusOrder.indexOf(app.status);
    if (app.status === 'REJECTED') {
      currentIndex = 2; // reaches decision step
    }
    if (currentIndex === -1) currentIndex = 0;

    const steps = [
      {
        label: L('අයදුම්පත් ඉදිරිපත් කිරීම', 'Application Submitted', 'விண்ணப்பம் சமர்ப்பிக்கப்பட்டது'),
        description: L(
          'අයදුම්පත්‍රය සාර්ථකව හෝමාගම ප්‍රාදේශීය සභා ඩිජිටල් පද්ධතියේ ලියාපදිංචි විය.',
          'Form received, verified, and officially logged into the Pradeshiya Sabha digital registry.',
          'விண்ணப்பம் பெறப்பட்டு பிரதேச சபை டிஜிட்டல் பதிவேட்டில் பதிவு செய்யப்பட்டது.'
        ),
        date: app.date,
        completed: true
      },
      {
        label: L('තාක්ෂණික ක්ෂේත්‍ර පරීක්ෂණය', 'Technical Inspection & Review', 'தொழில்நுட்ப கள ஆய்வு'),
        description: currentIndex >= 1 || app.status === 'REJECTED'
          ? L(
              'අදාළ අංශයේ තාක්ෂණික නිලධාරී වෙත ක්ෂේත්‍ර පරීක්ෂාව සහ ලේඛන සත්‍යාපනය සඳහා යොමු කර ඇත.',
              'Assigned to the relevant department technical officer for field inspection and statutory verification.',
              'கள ஆய்வு மற்றும் சட்டப்பூர்வ சரிபார்ப்புக்காக உரிய துறை தொழில்நுட்ப உத்தியோகத்தருக்கு ஒதுக்கப்பட்டுள்ளது.'
            )
          : L(
              'තාක්ෂණික නිලධාරියෙකු වෙත යොමු වන තෙක් පවතී.',
              'Awaiting assignment to a department technical officer for field assessment.',
              'கள மதிப்பீட்டிற்காக ஒரு துறை தொழில்நுட்ப உத்தியோகத்தரின் ஒதுக்கீட்டிற்காக காத்திருக்கிறது.'
            ),
        date: currentIndex >= 1 || app.status === 'REJECTED' ? (app.inspectionDate || app.date) : null,
        completed: currentIndex >= 1 || app.status === 'REJECTED'
      },
      {
        label: app.status === 'REJECTED'
          ? L('අවසන් තීරණය (නැවත යොමු කිරීම/ප්‍රතික්ෂේප කිරීම)', 'Final Decision (Returned / Rejected)', 'இறுதி முடிவு (நிராகரிக்கப்பட்டது)')
          : L('අවසන් අනුමැතිය සහ බලපත්‍ර නිකුතුව', 'Final Approval & Permit Issued', 'இறுதி ஒப்புதல் மற்றும் அனுமதிப்பத்திரம்'),
        description: app.status === 'APPROVED'
          ? L(
              'සභාපති/ලේකම්තුමාගේ අවසන් අනුමැතිය ලැබී ඇති අතර නිල ඩිජිටල් අවසර පත්‍රය නිකුත් කර ඇත.',
              'Application approved by Pradeshiya Sabha Secretary/Chairman and digital statutory permit issued.',
              'பிரதேச சபை செயலாளர்/தலைவரால் விண்ணப்பம் அங்கீகரிக்கப்பட்டு டிஜிட்டல் அனுமதிப்பத்திரம் வழங்கப்பட்டது.'
            )
          : app.status === 'REJECTED'
          ? L(
              'තාක්ෂණික පරීක්ෂාවෙන් පසු විස්තර අසම්පූර්ණ බැවින් අයදුම්පත්‍රය නැවත යොමු කර හෝ ප්‍රතික්ෂේප කර ඇත.',
              'Application reviewed and returned/rejected with remarks during technical assessment.',
              'தொழில்நுட்ப மதிப்பீட்டின் போது கருத்துகளுடன் விண்ணப்பம் நிராகரிக்கப்பட்டது/திருப்பி அனுப்பப்பட்டது.'
            )
          : L(
              'අවසන් විධායක අනුමැතිය සහ සහතික නිකුතුව සඳහා බලාපොරොත්තු වේ.',
              'Pending final executive approval from the Secretary/Chairman and official certificate generation.',
              'செயலாளர்/தலைவரிடமிருந்து இறுதி நிர்வாக ஒப்புதல் மற்றும் சான்றிதழ் உருவாக்கத்திற்காக காத்திருக்கிறது.'
            ),
        date: currentIndex >= 2 || app.status === 'REJECTED' ? (app.approvalDate || app.date) : null,
        completed: currentIndex >= 2 || app.status === 'REJECTED'
      }
    ];

    return steps;
  };

  // Filtering Logic
  const filteredApplications = applications.filter((item) => {
    const matchesStatus = statusFilter === 'All Statuses' || item.status === statusFilter;
    const matchesSearch =
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.details.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredApplications.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Stats Calculations
  const totalCount = applications.length;
  const activeCount = applications.filter((a) => a.status === 'PENDING' || a.status === 'IN PROGRESS').length;
  const approvedCount = applications.filter((a) => a.status === 'APPROVED').length;

  return (
    <div className="space-y-6">
      {/* Banner Section */}
      <div className="relative rounded-xl overflow-hidden mb-6 h-48 bg-gradient-to-r from-slate-800 to-slate-900 flex items-center px-8 text-white">
        <div className="z-10">
          <h1 className="text-3xl font-bold">{L('පුරවැසි අයදුම්පත් පැනලය', 'Citizen Application Portal', 'குடிமக்கள் விண்ணப்பப் பலகை')}</h1>
          <p className="text-gray-300 mt-2 text-sm">{L('ඔබ විසින් ඉදිරිපත් කරන ලද අයදුම්පත් කළමනාකරණය කර ඒවායේ ප්‍රගතිය තත්‍ය කාලීනව නිරීක්ෂණය කරන්න.', 'Manage your submitted municipal permit reports and track institutional progress in real-time.', 'உங்கள் சமர்ப்பிக்கப்பட்ட விண்ணப்பங்களை நிர்வகிக்கவும் மற்றும் நிகழ்நேர முன்னேற்றத்தைக் கண்காணிக்கவும்.')}</p>
        </div>
        <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80')` }}></div>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm text-center">
          <span className="text-rose-800 font-semibold text-xs uppercase tracking-wider block mb-1">
            {L('මුළු අයදුම්පත්', 'Total Applications', 'மொத்த விண்ணப்பங்கள்')}
          </span>
          <h3 className="text-3xl font-bold text-gray-800">{String(totalCount).padStart(2, '0')}</h3>
          <span className="text-emerald-500 text-xs mt-1 block">▲ Dynamic tracking enabled</span>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm text-center">
          <span className="text-blue-800 font-semibold text-xs uppercase tracking-wider block mb-1">
            {L('පරීක්ෂණ මට්ටමේ (Active)', 'Active', 'மதிப்பாய்வில்')}
          </span>
          <h3 className="text-3xl font-bold text-gray-800">{String(activeCount).padStart(2, '0')}</h3>
          <span className="text-gray-400 text-xs mt-1 block">Currently under review</span>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm text-center">
          <span className="text-emerald-800 font-semibold text-xs uppercase tracking-wider block mb-1">
            {L('අනුමත කළ බලපත්‍ර', 'Approved & Issued', 'அங்கீகரிக்கப்பட்டவை')}
          </span>
          <h3 className="text-3xl font-bold text-gray-800">{String(approvedCount).padStart(2, '0')}</h3>
          <span className="text-emerald-500 text-xs mt-1 block">✓ Live permit issuance</span>
        </div>
      </div>

      {/* Filter and Table Section */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <span className="font-semibold text-gray-800">{L('මගේ අයදුම්පත්', 'My Applications', 'எனது விண்ணப்பங்கள்')}</span>
            
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-200 rounded-lg px-3 py-1.5 bg-gray-50 text-xs font-medium focus:outline-none focus:border-red-800"
            >
              <option value="All Statuses">{L('සියලුම තත්වයන්', 'All Statuses', 'அனைத்தும்')}</option>
              <option value="PENDING">PENDING</option>
              <option value="IN PROGRESS">IN PROGRESS</option>
              <option value="APPROVED">APPROVED</option>
              <option value="REJECTED">REJECTED</option>
            </select>

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder={L('සොයන්න...', 'Search applications...', 'தேடு...')}
              className="border border-gray-200 rounded-lg px-3 py-1.5 bg-gray-50 text-xs font-medium focus:outline-none focus:border-red-800 w-44 sm:w-60"
            />
          </div>

          <button
            onClick={onNavigateToForms}
            className="bg-[#991b1b] hover:bg-[#7f1d1d] text-white px-4 py-2 rounded-lg font-medium text-sm transition-all shadow-sm flex items-center gap-2 cursor-pointer shrink-0"
          >
            <span>+</span> {L('නව අයදුම්පත්‍රයක්', 'New Application', 'புதிய விண்ணப்பம்')}
          </button>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold border-b border-gray-100">
                <th className="p-4">{L('අයදුම්පත් අංකය', 'Application ID', 'விண்ணப்ப எண்')}</th>
                <th className="p-4">{L('දිනය', 'Date Submitted', 'திகதி')}</th>
                <th className="p-4">{L('අයදුම්පත් වර්ගය / සහතිකය', 'Category', 'வகை')}</th>
                <th className="p-4">{L('තත්වය', 'Status', 'நிலை')}</th>
                <th className="p-4 text-center">{L('ක්‍රියාකාරකම', 'Action', 'செயல்')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
              {currentItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="p-4 font-bold text-gray-900 font-mono">{item.id}</td>
                  <td className="p-4 text-gray-500 whitespace-nowrap">{item.date}</td>
                  <td className="p-4 font-medium">{item.category}</td>
                  <td className="p-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold border inline-block ${getStatusStyle(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 text-center whitespace-nowrap">
                    <button
                      onClick={() => setSelectedApp(item)}
                      className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-red-800 transition-colors border border-gray-200 inline-block cursor-pointer"
                      title={L('විස්තර පරීක්ෂා කරන්න', 'Inspect Details', 'விவரங்களை காண்க')}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
              {currentItems.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-400">
                    {L('අයදුම්පත් කිසිවක් හමු නොවිණි.', 'No applications found for the selected filter.', 'விண்ணப்பங்கள் எதுவும் காணப்படவில்லை.')}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer / Pagination */}
        <div className="p-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/50 text-xs text-gray-500">
          <div>
            Showing <span className="font-semibold text-gray-700">{currentItems.length}</span> of <span className="font-semibold text-gray-700">{filteredApplications.length}</span> applications
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-1.5 rounded-md border text-gray-600 bg-white transition-colors ${currentPage === 1 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-100 cursor-pointer'}`}
            >
              ‹
            </button>

            {Array.from({ length: totalPages }, (_, index) => {
              const pageNum = index + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-7 h-7 font-semibold rounded-md transition-all ${
                    currentPage === pageNum
                      ? 'bg-[#800020] text-white'
                      : 'text-gray-600 hover:bg-gray-200 bg-white border border-gray-200 cursor-pointer'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-1.5 rounded-md border text-gray-600 bg-white transition-colors ${currentPage === totalPages ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-100 cursor-pointer'}`}
            >
              &rsaquo;
            </button>
          </div>
        </div>
      </div>

      {/* Pop-up View Modal */}
      {selectedApp && (
        <div
          onClick={() => setSelectedApp(null)}
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl border border-gray-100 max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden text-left"
          >
            <div className="px-6 py-5 border-b border-gray-200 bg-gray-100 flex justify-between items-center">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold">
                  {L('අයදුම්පත් විස්තරය', 'Application Details', 'விண்ணப்ப விவரங்கள்')}
                </span>
                <h3 className="font-bold text-gray-900 text-xl font-mono">{selectedApp.id}</h3>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="text-gray-400 hover:text-gray-700 text-xl leading-none cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-5 text-sm text-gray-700 overflow-y-auto max-h-[70vh]">
              {/* Current Status banner */}
              <div className={`rounded-lg border p-4 ${getStatusBannerStyle(selectedApp.status)}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider">Current Status</span>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-current">
                    {selectedApp.status}
                  </span>
                </div>
                <p className="text-sm italic">{getStatusBannerMessage(selectedApp.status)}</p>
              </div>

              {/* Entered Application Details */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                <div>
                  <span className="text-xs text-gray-400 block mb-1">{L('අයදුම්කරුගේ නම', 'Applicant Name', 'பெயர்')}</span>
                  <p className="font-medium text-gray-900">{selectedApp.applicantName}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-400 block mb-1">{L('ජාතික හැඳුනුම්පත් අංකය', 'NIC Number', 'தேசிய அடையாள அட்டை')}</span>
                  <p className="font-medium text-gray-900 font-mono">{selectedApp.nicNumber || 'N/A'}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-400 block mb-1">{L('දුරකථන අංකය', 'Contact Number', 'தொலைபேசி')}</span>
                  <p className="font-medium text-gray-900 font-mono">{selectedApp.phone}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-400 block mb-1">{L('ඉදිරිපත් කළ දිනය', 'Submission Date', 'திகதி')}</span>
                  <p className="font-medium text-gray-900">{selectedApp.date}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-xs text-gray-400 block mb-1">{L('ලිපිනය', 'Postal / Institution Address', 'முகவரி')}</span>
                  <p className="font-medium text-gray-900">{selectedApp.address}</p>
                </div>
                {selectedApp.locationAddress && selectedApp.locationAddress !== selectedApp.address && (
                  <div className="col-span-2">
                    <span className="text-xs text-gray-400 block mb-1">{L('සේවා/ප්‍රදර්ශන ස්ථානය', 'Service / Display Location', 'இடம்')}</span>
                    <p className="font-medium text-gray-900">{selectedApp.locationAddress}</p>
                  </div>
                )}
                <div className="col-span-2">
                  <span className="text-xs text-gray-400 block mb-1">{L('අයදුම්පත් වර්ගය', 'Application Category', 'வகை')}</span>
                  <p className="font-bold text-gray-900 bg-gray-100/60 px-3 py-1.5 rounded-lg border border-gray-200/50 inline-block mt-0.5">
                    {selectedApp.category}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-3">
                <span className="text-xs text-gray-400 block mb-1">{L('විශේෂ විස්තර සහ නියමයන්', 'Entered Specifications & Scope Details', 'விவரங்கள்')}</span>
                <p className="bg-gray-50 p-3 rounded-lg border border-gray-100 text-gray-800 leading-relaxed font-medium">
                  {selectedApp.details}
                </p>
              </div>

              {/* Progress Timeline */}
              <div className="border-t border-gray-100 pt-4">
                <span className="text-xs text-gray-400 block mb-3 uppercase tracking-wider font-semibold">
                  {L('ප්‍රගති කාලරේඛාව', 'Progress Timeline', 'முன்னேற்ற காலவரிசை')}
                </span>
                <div>
                  {getTimelineSteps(selectedApp).map((step, idx, arr) => (
                    <div key={step.label} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <span className={`w-3.5 h-3.5 rounded-full border-2 shrink-0 ${step.completed ? 'bg-red-800 border-red-800' : 'bg-white border-gray-300'}`}></span>
                        {idx < arr.length - 1 && (
                          <span className={`w-0.5 flex-1 my-1 ${step.completed && arr[idx + 1].completed ? 'bg-red-800' : 'bg-gray-200'}`} style={{ minHeight: '28px' }}></span>
                        )}
                      </div>
                      <div className={`pb-5 ${!step.completed ? 'opacity-50' : ''}`}>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-sm font-bold ${step.completed ? 'text-gray-900' : 'text-gray-400'}`}>{step.label}</span>
                          {step.date && <span className="text-xs text-gray-400 font-mono">{step.date}</span>}
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Attached Evidence Section */}
              {selectedApp.documentName && (
                <div className="border-t border-gray-100 pt-3">
                  <span className="text-xs text-gray-400 block mb-2 uppercase font-semibold">
                    {L('අමුණා ඇති ලේඛනය', 'Attached Evidence / Document', 'இணைக்கப்பட்ட ஆவணம்')}
                  </span>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 flex items-center gap-2 text-sm text-gray-700">
                    <span className="text-xl">📂</span>
                    <span className="font-mono font-semibold text-gray-900">{selectedApp.documentName}</span>
                    <span className="text-xs text-emerald-600 font-medium ml-auto">✓ Verified File</span>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button
                onClick={() => setSelectedApp(null)}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white font-medium text-xs rounded-lg cursor-pointer"
              >
                {L('වසා දමන්න', 'Close', 'மூடு')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyApplicationsDashboard;
