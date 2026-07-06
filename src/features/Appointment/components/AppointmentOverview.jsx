import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const AppointmentOverview = ({ onNavigate, bookings }) => {
  const { t } = useLanguage();
  // Only get upcoming/active bookings (e.g. CONFIRMED, RESERVED, or PENDING)
  const upcomingBookings = bookings.filter(b => b.status === 'CONFIRMED' || b.status === 'RESERVED');

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <div 
        className="relative h-64 rounded-xl overflow-hidden bg-cover bg-center shadow-lg"
        style={{ 
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.5), rgba(0,0,0,0.2)), url('https://images.unsplash.com/photo-1541829019-2188201b83a0?w=1200&h=300&fit=crop')` 
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
          <h2 className="text-3xl font-extrabold text-white tracking-wide">
            {t('appointments.title', 'Citizen Appointment Portal')}
          </h2>
        </div>
      </div>

      {/* Quick Services */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-6">Quick Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Book Appointment */}
          <div className="relative border border-gray-150 rounded-xl p-6 bg-white hover:shadow-md transition-shadow flex flex-col justify-between h-48">
            <button 
              onClick={() => onNavigate('schedule')}
              className="absolute top-4 right-4 text-xs font-semibold text-gray-500 hover:text-red-800 transition-colors"
            >
              View Availability
            </button>
            <div>
              <div className="w-12 h-12 rounded-lg bg-red-800 flex items-center justify-center text-white mb-4 shadow-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="text-base font-bold text-gray-800 mb-1">Book Appointment</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Schedule time with the Chairman or departmental officers.
              </p>
            </div>
            <button 
              onClick={() => onNavigate('schedule')}
              className="mt-2 text-xs font-bold text-red-800 text-left hover:underline"
            >
              Get Started &rarr;
            </button>
          </div>

          {/* Card 2: Reserve Facility */}
          <div className="border border-gray-150 rounded-xl p-6 bg-white hover:shadow-md transition-shadow flex flex-col justify-between h-48">
            <div>
              <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h4 className="text-base font-bold text-gray-800 mb-1">Reserve Facility</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Book community halls, grounds, or council equipment.
              </p>
            </div>
            <button 
              onClick={() => onNavigate('facility')}
              className="text-xs font-bold text-red-800 text-left hover:underline"
            >
              Reserve Now &rarr;
            </button>
          </div>

          {/* Card 3: My Bookings */}
          <div className="border border-gray-150 rounded-xl p-6 bg-white hover:shadow-md transition-shadow flex flex-col justify-between h-48">
            <div>
              <div className="w-12 h-12 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h4 className="text-base font-bold text-gray-800 mb-1">My Bookings</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Check your booking appointments and reservations.
              </p>
            </div>
            <button 
              onClick={() => onNavigate('bookings')}
              className="text-xs font-bold text-red-800 text-left hover:underline"
            >
              View Bookings &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* Upcoming Bookings */}
      <div className="border border-gray-100 bg-white rounded-xl p-6 shadow-xs">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-gray-800">Upcoming Bookings & Reservations</h3>
          <button 
            onClick={() => onNavigate('bookings')}
            className="text-xs font-bold text-gray-500 hover:text-red-800 transition-colors uppercase tracking-wider"
          >
            VIEW ALL
          </button>
        </div>

        {upcomingBookings.length === 0 ? (
          <div className="text-center py-8 border border-dashed border-gray-200 rounded-lg text-gray-400 text-sm">
            No upcoming bookings. Get started by booking an appointment or facility.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingBookings.map(b => (
              <div 
                key={b.id} 
                className="flex items-start justify-between border border-gray-150 rounded-xl p-5 bg-white relative hover:border-gray-300 transition-colors cursor-pointer"
                onClick={() => onNavigate('bookings')}
              >
                <div className="flex gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-lg ${
                    b.type === 'appointment' ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-800'
                  }`}>
                    {b.type === 'appointment' ? '📅' : '🏢'}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-800">
                      {b.type === 'appointment' ? `Appointment with ${b.officialName}` : b.facilityName}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {b.date} {b.time ? `• ${b.time}` : ''}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {b.type === 'appointment' ? b.office : b.location}
                    </p>
                  </div>
                </div>
                <div>
                  <span className={`inline-block text-[10px] font-extrabold px-2.5 py-1 rounded-sm uppercase tracking-wider ${
                    b.status === 'CONFIRMED' 
                      ? 'bg-green-100 text-green-700' 
                      : 'border border-green-200 text-green-700 font-bold'
                  }`}>
                    {b.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentOverview;
