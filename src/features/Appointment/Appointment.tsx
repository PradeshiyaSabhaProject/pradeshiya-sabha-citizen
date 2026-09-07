import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppointments } from './hooks/useAppointments';
import { appointmentService } from './services/appointmentService';
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

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Inner Navigation Tabs (For debugging/testing switching) */}
      <div className="max-w-6xl mx-auto mb-6 flex justify-start border-b border-gray-250">
        <button
          type="button"
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2.5 text-xs font-bold transition-all uppercase tracking-wide border-b-2 ${
            activeTab === 'overview' ? 'border-red-850 text-red-850' : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          {t('appointments.tab.overview', 'Portal Overview')}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('bookings')}
          className={`px-4 py-2.5 text-xs font-bold transition-all uppercase tracking-wide border-b-2 ${
            activeTab === 'bookings' ? 'border-red-850 text-red-850' : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          {t('appointments.tab.bookings', 'My Bookings')}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('schedule')}
          className={`px-4 py-2.5 text-xs font-bold transition-all uppercase tracking-wide border-b-2 ${
            activeTab === 'schedule' ? 'border-red-850 text-red-850' : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          {t('appointments.tab.schedule', 'Schedule Appointment')}
        </button>
        <button
          type="button"
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
            onReserve={async (fac, bookingDetails) => {
              let location = 'Main Ground';
              if (fac.title === 'Central Town Hall') {
                location = 'South Wing, Level 1, Homagama';
              } else if (fac.title === 'Homagama Crematorium') {
                location = 'Homagama Cremation Ground';
              } else if (fac.title === 'Water Bowser Rental') {
                location = 'Water Supply Dept';
              }

              let avatar = '⚽';
              if (fac.category === 'Crematoriums') {
                avatar = '🔥';
              } else if (fac.category === 'Vehicles & Machinery') {
                avatar = '🚚';
              } else if (fac.title === 'Central Town Hall') {
                avatar = '🏢';
              }

              const isCremation = fac.category === 'Crematoriums';
              const rentalFee = fac.rentalFee || 25000;
              const securityDeposit = fac.securityDeposit !== undefined ? fac.securityDeposit : 10000;
              const totalTariff = rentalFee + securityDeposit;

              const citizenApplicantName = bookingDetails.formDetails?.applicantName || 'Citizen Applicant';
              const citizenApplicantNic = bookingDetails.formDetails?.applicantNic || '199012345678';
              const citizenApplicantPhone = bookingDetails.formDetails?.applicantPhone || '0771234567';

              const eventTitle = isCremation
                ? `Funeral & Cremation Service (Late ${bookingDetails.formDetails?.deceasedName || 'Person'})`
                : (bookingDetails.formDetails?.bookingPurpose || `${fac.title} Community Reservation`);

              const eventType = isCremation
                ? 'Cremation Service'
                : (fac.category === 'Sports Grounds' ? 'Sports Tournament' : 'Community / Cultural Event');

              const documentsList = bookingDetails.attachment
                ? [{
                    name: bookingDetails.attachment.name,
                    size: typeof bookingDetails.attachment.size === 'number'
                      ? `${(bookingDetails.attachment.size / 1024).toFixed(0)} KB`
                      : bookingDetails.attachment.size
                  }]
                : [{ name: 'Applicant_NIC_Copy.pdf', size: '320 KB' }];

              const newBookingObj = {
                type: 'facility' as const,
                facilityName: fac.title,
                location,
                citizenName: citizenApplicantName,
                citizenNic: citizenApplicantNic,
                nicNumber: citizenApplicantNic,
                citizenPhone: citizenApplicantPhone,
                phone: citizenApplicantPhone,
                eventTitle,
                eventType,
                rentalFee,
                securityDeposit,
                totalTariff,
                paymentStatus: 'PAID' as const,
                date: bookingDetails.date,
                time: bookingDetails.time,
                status: 'PENDING' as const,
                statusMessage: isCremation 
                  ? `Funeral Cremation request received. Verification of death certificate ${bookingDetails.formDetails?.deathCertificateNo || 'provided'} is underway.`
                  : `Booking request received. Verification of rental purpose is underway.`,
                price: `Rs. ${totalTariff.toLocaleString()} Total (Paid)`,
                avatar,
                documents: documentsList,
                remarks: [
                  {
                    id: `rem-${Date.now()}`,
                    author: 'Citizen Intake Portal',
                    text: 'Online booking intake submitted with payment confirmation.',
                    date: new Date().toISOString().split('T')[0],
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    action: 'NOTE' as const
                  }
                ],
                formDetails: bookingDetails.formDetails,
                attachment: bookingDetails.attachment
              };
              
              try {
                const created = await appointmentService.createBooking(newBookingObj);
                bookingsList.unshift(created);
                setActiveTab('bookings');
              } catch (err) {
                console.error('Failed to reserve facility', err);
              }
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
