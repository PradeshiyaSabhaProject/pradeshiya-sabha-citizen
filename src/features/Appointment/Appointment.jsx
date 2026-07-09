import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppointments } from './hooks/useAppointments';
import { useLanguage } from '../../context/LanguageContext';
import AppointmentOverview from './components/AppointmentOverview';
import MyBookings from './components/MyBookings';
import ScheduleAppointment from './components/ScheduleAppointment';
import ReserveFacility from './components/ReserveFacility';
import ConfirmModal from './components/ConfirmModal';
import BookingDetailsModal from './components/BookingDetailsModal';

const Appointment = () => {
  const { t } = useLanguage();
  const {
    activeTab,
    setActiveTab,
    bookingsList,
    departments,
    officials,
    timeSlots,
    loading,

    // Scheduling
    selectedDept,
    setSelectedDept,
    selectedOfficial,
    setSelectedOfficial,
    selectedDate,
    setSelectedDate,
    selectedTimeSlot,
    setSelectedTimeSlot,
    purpose,
    setPurpose,
    attachedFile,
    setAttachedFile,
    startNewBooking,
    handleRequestAppointmentSubmit,

    // Facility Filter
    facilitySearch,
    setFacilitySearch,
    selectedCategories,
    handleCategoryToggle,
    capacityRange,
    setCapacityRange,
    availabilityDate,
    setAvailabilityDate,
    handleClearFilters,
    filteredFacilities,

    // Modals
    isConfirmModalOpen,
    setIsConfirmModalOpen,
    confirmNewBooking,
    isDetailsModalOpen,
    setIsDetailsModalOpen,
    selectedBookingDetails,
    openBookingDetails,
    handleCancelBooking
  } = useAppointments();

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (['overview', 'bookings', 'schedule', 'facility'].includes(tab)) {
      setActiveTab(tab);
    } else if (location.pathname === '/reservations') {
      setActiveTab('facility');
    } else {
      setActiveTab('overview');
    }
  }, [location.pathname, location.search, setActiveTab]);

  const handleFacilityReserve = (facility) => {
    // Add facility reservation directly to user bookings
    const confirmed = window.confirm(`Do you want to reserve ${facility.title}?`);
    if (confirmed) {
      const newBooking = {
        type: 'facility',
        facilityName: facility.title,
        location: facility.subtitle.split(',').slice(0, 2).join(',') || facility.title,
        date: 'Oct 30 - 31, 2026', // Mock date range
        time: 'Full Day Event',
        status: 'RESERVED',
        statusMessage: `Amenities Included: ${facility.amenities.join(', ')}`,
        price: `${facility.basePrice} Paid`,
        avatar: '🏢'
      };
      // Trigger a confirm or just add it
      appointmentService?.createBooking(newBooking).then(() => {
        // Simple mock reload
        window.location.reload();
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Inner Navigation Tabs (For debugging/testing switching) */}
      <div className="max-w-6xl mx-auto mb-6 flex justify-start border-b border-gray-250">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2.5 text-xs font-bold transition-all uppercase tracking-wide border-b-2 ${
            activeTab === 'overview' ? 'border-red-850 text-red-850' : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          {t('appointments.tab.overview', 'Portal Overview')}
        </button>
        <button
          onClick={() => setActiveTab('bookings')}
          className={`px-4 py-2.5 text-xs font-bold transition-all uppercase tracking-wide border-b-2 ${
            activeTab === 'bookings' ? 'border-red-850 text-red-850' : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          {t('appointments.tab.bookings', 'My Bookings')}
        </button>
        <button
          onClick={() => setActiveTab('schedule')}
          className={`px-4 py-2.5 text-xs font-bold transition-all uppercase tracking-wide border-b-2 ${
            activeTab === 'schedule' ? 'border-red-850 text-red-850' : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          {t('appointments.tab.schedule', 'Schedule Appointment')}
        </button>
        <button
          onClick={() => setActiveTab('facility')}
          className={`px-4 py-2.5 text-xs font-bold transition-all uppercase tracking-wide border-b-2 ${
            activeTab === 'facility' ? 'border-red-850 text-red-850' : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          {t('appointments.tab.facility', 'Reserve Facility')}
        </button>
      </div>

      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-850"></div>
        </div>
      )}

      {/* Dynamic Tab Rendering */}
      <div className="transition-all duration-300">
        {activeTab === 'overview' && (
          <AppointmentOverview 
            onNavigate={setActiveTab} 
            bookings={bookingsList} 
          />
        )}
        {activeTab === 'bookings' && (
          <MyBookings 
            bookings={bookingsList} 
            onNewBooking={startNewBooking} 
            onCancelBooking={handleCancelBooking} 
            onOpenDetails={openBookingDetails} 
          />
        )}
        {activeTab === 'schedule' && (
          <ScheduleAppointment 
            departments={departments}
            officials={officials}
            timeSlots={timeSlots}
            selectedDept={selectedDept}
            setSelectedDept={setSelectedDept}
            selectedOfficial={selectedOfficial}
            setSelectedOfficial={setSelectedOfficial}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedTimeSlot={selectedTimeSlot}
            setSelectedTimeSlot={setSelectedTimeSlot}
            purpose={purpose}
            setPurpose={setPurpose}
            attachedFile={attachedFile}
            setAttachedFile={setAttachedFile}
            onSubmit={handleRequestAppointmentSubmit}
          />
        )}
        {activeTab === 'facility' && (
          <ReserveFacility 
            search={facilitySearch}
            setSearch={setFacilitySearch}
            categories={selectedCategories}
            onCategoryToggle={handleCategoryToggle}
            capacity={capacityRange}
            setCapacity={setCapacityRange}
            date={availabilityDate}
            setDate={setAvailabilityDate}
            onClearFilters={handleClearFilters}
            facilities={filteredFacilities}
            onReserve={(fac) => {
              // Add to bookings list
              const newBookingObj = {
                id: Date.now(),
                type: 'facility',
                facilityName: fac.title,
                location: fac.title === 'Central Town Hall' ? 'South Wing, Level 1' : 'Main Arena',
                date: 'Oct 30 - 31, 2026',
                time: 'Full Day Event',
                status: 'RESERVED',
                statusMessage: `Amenities Included: ${fac.amenities.join(', ')}`,
                price: `${fac.basePrice} Paid`,
                avatar: fac.title === 'Central Town Hall' ? '🏢' : '⚽'
              };
              // Add to list and navigate
              setActiveTab('bookings');
              bookingsList.unshift(newBookingObj);
            }}
          />
        )}
      </div>

      {/* Confirmation Popup Modal */}
      <ConfirmModal 
        isOpen={isConfirmModalOpen} 
        onClose={() => setIsConfirmModalOpen(false)} 
        onConfirm={confirmNewBooking} 
        attachedFile={attachedFile}
      />

      {/* Booking Details Viewer Popup Modal */}
      <BookingDetailsModal 
        isOpen={isDetailsModalOpen} 
        onClose={() => setIsDetailsModalOpen(false)} 
        booking={selectedBookingDetails} 
      />
    </div>
  );
};

export default Appointment;
