import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import pradeshiyaImg from '../../assets/pradeshiyasabha.png';

const ShieldCheckIcon = () => (
  <svg className="w-3.5 h-3.5 text-[#8C1538] shrink-0" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11.002 12.001l3.3-3.299a1 1 0 10-1.414-1.414l-2.593 2.592-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0z" clipRule="evenodd" />
  </svg>
);

const ArrowRight = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

// Service Icons
const ComplaintIcon = () => (
  <svg className="w-6 h-6 text-[#8C1538]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-6 h-6 text-[#8C1538]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
  </svg>
);

const LettersIcon = () => (
  <svg className="w-6 h-6 text-[#8C1538]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

const UtilityIcon = () => (
  <svg className="w-6 h-6 text-[#8C1538]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.527-.639.806-1.433.806-2.257v-.524c0-.67-.267-1.312-.741-1.786L11.58 6.42a2.52 2.52 0 00-1.786-.741h-.524c-.824 0-1.618.279-2.257.806L3.983 8.983m0 0l3.03 2.496m-3.03-2.496l-1.042 1.042a1.5 1.5 0 000 2.122l4.95 4.95a1.5 1.5 0 002.122 0l1.042-1.042m0 0l2.496 3.03" />
  </svg>
);

const AssetsIcon = () => (
  <svg className="w-6 h-6 text-[#8C1538]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
  </svg>
);

const WasteIcon = () => (
  <svg className="w-6 h-6 text-[#8C1538]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
);

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const userName = user?.name || 'Chaminda Perera';

  // Dummy status updates
  const statusUpdates = [
    {
      time: 'Today, 09:45 AM',
      title: 'Application #HMG-4521 Approved',
      desc: 'Your building permit request has been reviewed and approved by the engineering department.'
    },
    {
      time: 'Yesterday, 04:20 PM',
      title: 'Waste Collection Update',
      desc: 'Standard route delayed by 2 hours in Zone 04 due to heavy rain. Please keep bins secured.'
    },
    {
      time: '2 days ago',
      title: 'Appointment Reminder',
      desc: "Your meeting with the Chairman's Secretary is confirmed for Wednesday at 10:30 AM."
    },
    {
      time: '3 days ago',
      title: 'Inquiry Resolved',
      desc: 'Ticket #CR-882: The street lamp on 4th Cross Lane has been replaced.'
    }
  ];

  // Dummy news
  const newsItems = [
    {
      tag: 'Development',
      tagColor: 'bg-[#0f3b7d] text-white',
      title: 'New Community Center Opening',
      desc: 'The Phase II expansion of the Homagama Digital Center is now complete and open to all public members for digital literacy courses.',
      linkText: 'Read Full Story',
      imgTint: 'from-blue-900/80 to-slate-900/90'
    },
    {
      tag: 'Public Notice',
      tagColor: 'bg-[#b34000] text-white',
      title: 'Town Hall Meeting: Road Planning',
      desc: 'Join us this Friday at the Main Hall to discuss the proposed bypass route and provide your valuable community feedback.',
      linkText: 'Register Attendance',
      imgTint: 'from-amber-950/80 to-stone-900/90'
    },
    {
      tag: 'Sustainability',
      tagColor: 'bg-[#2e6b35] text-white',
      title: 'Solar Initiative Phase 1',
      desc: 'Homagama is moving towards a greener future with the installation of solar panels across 15 municipal office buildings.',
      linkText: 'View Roadmap',
      imgTint: 'from-emerald-950/80 to-teal-900/90'
    }
  ];

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans animate-fadeIn">
      {/* Top Welcome / Hero Banner Card (civil Dashboard.png) */}
      <div className="bg-gradient-to-r from-[#F5F2FA] via-[#EFEAF6] to-[#E8E1F2] rounded-2xl border border-purple-100 p-6 md:p-8 mb-8 relative overflow-hidden shadow-xs">
        {/* Background decorative elements */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-end pr-4 select-none overflow-hidden">
          <div className="text-[180px] leading-none font-black text-[#8C1538] -mr-10">🏢</div>
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="text-xs font-bold text-[#8C1538] uppercase tracking-wider">
                CITIZEN PORTAL
              </span>
              <span className="bg-white/90 text-[#8C1538] border border-[#8C1538]/15 px-2.5 py-0.5 rounded-full text-xs font-semibold inline-flex items-center gap-1 shadow-2xs">
                <ShieldCheckIcon />
                <span>Verified Citizen</span>
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              Ayubowan, {userName}
            </h1>

            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              Manage your administrative requirements, track active applications, and contribute to the Homagama community from your digital dashboard.
            </p>
          </div>

          {/* Stat Cards Side-by-Side */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <div className="bg-white rounded-xl border border-gray-200/80 p-4 text-center shadow-xs min-w-[130px] sm:min-w-[150px] hover:border-[#8C1538]/30 transition-all">
              <div className="text-3xl font-extrabold text-[#8C1538] mb-0.5">2</div>
              <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Active Complaints</div>
            </div>

            <div onClick={() => navigate('/appointments?tab=bookings')} className="bg-white rounded-xl border border-gray-200/80 p-4 text-center shadow-xs min-w-[130px] sm:min-w-[150px] hover:border-[#8C1538]/30 transition-all cursor-pointer">
              <div className="text-3xl font-extrabold text-[#8C1538] mb-0.5">1</div>
              <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Pending Appointment</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Left Section: Digital Services (lg:col-span-8) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between pb-1">
            <h2 className="text-xl font-bold text-gray-900">
              Digital Services
            </h2>
            <a href="/services" className="text-xs font-bold text-[#8C1538] hover:underline cursor-pointer">
              View All Services
            </a>
          </div>

          {/* 6 Grid Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div onClick={() => navigate('/complaints')} className="bg-white rounded-xl border border-gray-200/80 p-5 hover:border-[#8C1538]/40 hover:shadow-md transition-all duration-200 cursor-pointer group flex flex-col">
              <div className="w-11 h-11 rounded-xl bg-red-50 text-[#8C1538] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ComplaintIcon />
              </div>
              <h3 className="font-bold text-gray-900 mb-1 group-hover:text-[#8C1538] transition-colors">Complaints</h3>
              <p className="text-xs text-gray-500 leading-relaxed">Street lights, waste, or roads.</p>
            </div>

            <div onClick={() => navigate('/appointments')} className="bg-white rounded-xl border border-gray-200/80 p-5 hover:border-[#8C1538]/40 hover:shadow-md transition-all duration-200 cursor-pointer group flex flex-col">
              <div className="w-11 h-11 rounded-xl bg-red-50 text-[#8C1538] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <CalendarIcon />
              </div>
              <h3 className="font-bold text-gray-900 mb-1 group-hover:text-[#8C1538] transition-colors">Appointments & Reservations</h3>
              <p className="text-xs text-gray-500 leading-relaxed">Schedule a meet with officials.</p>
            </div>

            <div onClick={() => alert('Opening Letters Tracking...')} className="bg-white rounded-xl border border-gray-200/80 p-5 hover:border-[#8C1538]/40 hover:shadow-md transition-all duration-200 cursor-pointer group flex flex-col">
              <div className="w-11 h-11 rounded-xl bg-red-50 text-[#8C1538] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <LettersIcon />
              </div>
              <h3 className="font-bold text-gray-900 mb-1 group-hover:text-[#8C1538] transition-colors">Letters</h3>
              <p className="text-xs text-gray-500 leading-relaxed">Real-time application tracking.</p>
            </div>

            <div onClick={() => alert('Opening Utility Request...')} className="bg-white rounded-xl border border-gray-200/80 p-5 hover:border-[#8C1538]/40 hover:shadow-md transition-all duration-200 cursor-pointer group flex flex-col">
              <div className="w-11 h-11 rounded-xl bg-red-50 text-[#8C1538] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <UtilityIcon />
              </div>
              <h3 className="font-bold text-gray-900 mb-1 group-hover:text-[#8C1538] transition-colors">Utility Request</h3>
              <p className="text-xs text-gray-500 leading-relaxed">Water, drainage and connections.</p>
            </div>

            <div onClick={() => navigate('/appointments?tab=facility')} className="bg-white rounded-xl border border-gray-200/80 p-5 hover:border-[#8C1538]/40 hover:shadow-md transition-all duration-200 cursor-pointer group flex flex-col">
              <div className="w-11 h-11 rounded-xl bg-red-50 text-[#8C1538] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <AssetsIcon />
              </div>
              <h3 className="font-bold text-gray-900 mb-1 group-hover:text-[#8C1538] transition-colors">Public Assets</h3>
              <p className="text-xs text-gray-500 leading-relaxed">Reserve community halls & parks.</p>
            </div>

            <div onClick={() => alert('Opening Waste Tracker...')} className="bg-white rounded-xl border border-gray-200/80 p-5 hover:border-[#8C1538]/40 hover:shadow-md transition-all duration-200 cursor-pointer group flex flex-col">
              <div className="w-11 h-11 rounded-xl bg-red-50 text-[#8C1538] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <WasteIcon />
              </div>
              <h3 className="font-bold text-gray-900 mb-1 group-hover:text-[#8C1538] transition-colors">Waste Tracker</h3>
              <p className="text-xs text-gray-500 leading-relaxed">Collection schedules & updates.</p>
            </div>
          </div>
        </div>

        {/* Right Section: Status Updates (lg:col-span-4) */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden flex flex-col h-full">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-base font-bold text-gray-900">Status Updates</h3>
              <span className="text-lg" title="History">⏱️</span>
            </div>

            {/* Timeline List */}
            <div className="p-5 space-y-5 flex-grow">
              {statusUpdates.map((item, idx) => (
                <div key={idx} className="border-l-2 border-[#8C1538] pl-3.5 py-0.5 relative">
                  <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                    {item.time}
                  </div>
                  <div className="text-sm font-bold text-gray-900 mt-0.5">
                    {item.title}
                  </div>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Footer Link */}
            <a
              href="#notifications"
              onClick={(e) => { e.preventDefault(); alert('Showing full notification history...'); }}
              className="text-xs font-bold text-[#8C1538] hover:bg-gray-100/80 transition-colors block text-center py-3.5 bg-gray-50 border-t border-gray-100"
            >
              View Notification History
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section: Civic News & Announcements */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            Civic News & Announcements
          </h2>
          <div className="flex items-center gap-2">
            <button type="button" aria-label="Previous" className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer">
              ‹
            </button>
            <button type="button" aria-label="Next" className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer">
              ›
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsItems.map((news, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col group">
              {/* Card Image Banner */}
              <div className="h-48 relative overflow-hidden bg-gray-900">
                <img 
                  src={pradeshiyaImg} 
                  alt={news.title} 
                  className="w-full h-full object-cover object-center opacity-60 group-hover:scale-105 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${news.imgTint} mix-blend-multiply`} />
                <div className="absolute top-4 left-4 z-10">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${news.tagColor}`}>
                    {news.tag}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#8C1538] transition-colors">
                  {news.title}
                </h3>
                <p className="text-sm text-gray-600 mb-6 flex-grow leading-relaxed">
                  {news.desc}
                </p>
                <a
                  href={`#news-${idx}`}
                  onClick={(e) => { e.preventDefault(); alert(`Reading story: ${news.title}`); }}
                  className="text-xs font-bold text-[#8C1538] hover:underline inline-flex items-center gap-1.5 mt-auto group-hover:translate-x-1 transition-transform"
                >
                  <span>{news.linkText}</span>
                  <ArrowRight />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
