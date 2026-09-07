import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  appointmentService,
  type BookingItem,
  type MunicipalFacility
} from '../Appointment/services/appointmentService';
import ReserveFacility from '../Appointment/components/ReserveFacility';
import BookingDetailsModal from '../Appointment/components/BookingDetailsModal';
import { downloadSlip } from '../../utils/pdfGenerator';

const FacilityBooking: React.FC = () => {
  const { t } = useLanguage();
  const [activeView, setActiveView] = useState<'catalog' | 'my-reservations'>('catalog');
  const [facilities, setFacilities] = useState<MunicipalFacility[]>([]);
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Filter States
  const [facilitySearch, setFacilitySearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [capacityRange, setCapacityRange] = useState(1000);
  const [availabilityDate, setAvailabilityDate] = useState('');

  // Modals
  const [selectedBookingDetails, setSelectedBookingDetails] = useState<BookingItem | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      try {
        const [facs, allBookings] = await Promise.all([
          appointmentService.getFacilities(),
          appointmentService.getBookings()
        ]);
        setFacilities(facs);
        setBookings(allBookings.filter((b) => b.type === 'facility'));
      } catch (err) {
        console.error('Failed to load facility data', err);
      } finally {
        setLoading(false);
      }
    };
    loadInitialData();
  }, []);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const handleClearFilters = () => {
    setFacilitySearch('');
    setSelectedCategories([]);
    setCapacityRange(1000);
    setAvailabilityDate('');
  };

  const filteredFacilities = facilities.filter((fac) => {
    const matchesSearch =
      fac.title.toLowerCase().includes(facilitySearch.toLowerCase()) ||
      fac.subtitle.toLowerCase().includes(facilitySearch.toLowerCase()) ||
      fac.category.toLowerCase().includes(facilitySearch.toLowerCase());

    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(fac.category);

    return matchesSearch && matchesCategory;
  });

  const handleReserve = async (fac: MunicipalFacility, bookingDetails: any) => {
    let location = 'Main Municipal Grounds';
    if (fac.title === 'Central Town Hall') {
      location = 'South Wing, Level 1, Homagama';
    } else if (fac.title === 'Homagama Crematorium') {
      location = 'Homagama Municipal Cemetery Grounds';
    } else if (fac.title === 'Water Bowser Rental (6000L)') {
      location = 'Water Supply & Engineering Yard';
    }

    let avatar = '🏛️';
    if (fac.category === 'Crematoriums') {
      avatar = '🔥';
    } else if (fac.category === 'Vehicles & Machinery') {
      avatar = '🚚';
    } else if (fac.category === 'Sports Grounds') {
      avatar = '⚽';
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
      : (fac.category === 'Sports Grounds' ? 'Sports Tournament' : 'Community Event');

    const documentsList = bookingDetails.attachment
      ? [{
          name: bookingDetails.attachment.name,
          size: typeof bookingDetails.attachment.size === 'number'
            ? `${(bookingDetails.attachment.size / 1024).toFixed(0)} KB`
            : bookingDetails.attachment.size
        }]
      : [{ name: 'Applicant_NIC_Copy.pdf', size: '320 KB' }];

    const newBookingObj: Partial<BookingItem> = {
      type: 'facility',
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
      paymentStatus: 'PAID',
      date: bookingDetails.date,
      time: bookingDetails.time,
      status: 'PENDING',
      statusMessage: isCremation
        ? `Funeral Cremation request received. Verification of death certificate ${bookingDetails.formDetails?.deathCertificateNo || 'provided'} is underway.`
        : `Booking request received for ${fac.title}. Verification of rental purpose is underway.`,
      price: `Rs. ${totalTariff.toLocaleString()} Total (Paid)`,
      avatar,
      documents: documentsList,
      remarks: [
        {
          id: `rem-${Date.now()}`,
          author: 'Citizen Facility Gateway',
          text: 'Online facility reservation submitted with payment reconciliation.',
          date: new Date().toISOString().split('T')[0],
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          action: 'NOTE'
        }
      ],
      formDetails: bookingDetails.formDetails,
      attachment: bookingDetails.attachment
    };

    try {
      const created = await appointmentService.createBooking(newBookingObj);
      setBookings((prev) => [created, ...prev]);
      setActiveView('my-reservations');
    } catch (err) {
      console.error('Failed to reserve facility', err);
    }
  };

  const handleCancelBooking = async (id: number | string) => {
    if (window.confirm('Are you sure you want to cancel this facility reservation?')) {
      await appointmentService.cancelBooking(id);
      const all = await appointmentService.getBookings();
      setBookings(all.filter((b) => b.type === 'facility'));
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans animate-fadeIn">
      {/* Top Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-4 border-b border-gray-200">
        <div className="space-y-1.5 max-w-3xl">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Municipal Facility &amp; Asset Reservations
          </h1>
          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
            Reserve community town halls, athletic grounds, crematorium chapels, and municipal machinery online with real-time slot verification and refundable deposit management.
          </p>
        </div>

        {/* View Switcher Pills */}
        <div className="flex items-center gap-2 shrink-0 self-start md:self-auto">
          <button
            type="button"
            onClick={() => setActiveView('catalog')}
            className={`px-4 py-2.5 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-200 flex items-center gap-2 cursor-pointer ${
              activeView === 'catalog'
                ? 'bg-[#8C1538] text-white shadow-sm'
                : 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-700'
            }`}
          >
            <span>🏛️</span>
            <span>Explore Facilities</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveView('my-reservations')}
            className={`px-4 py-2.5 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-200 flex items-center gap-2 cursor-pointer ${
              activeView === 'my-reservations'
                ? 'bg-[#8C1538] text-white shadow-sm'
                : 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-700'
            }`}
          >
            <span>📄</span>
            <span>My Reservations ({bookings.length})</span>
          </button>
        </div>
      </div>

      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-xs">
          <div className="animate-spin rounded-full h-10 w-10 border-3 border-gray-200 border-t-[#8C1538]"></div>
        </div>
      )}

      {/* View 1: Facility Catalog */}
      {activeView === 'catalog' && (
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
          onReserve={handleReserve}
        />
      )}

      {/* View 2: My Facility Reservations */}
      {activeView === 'my-reservations' && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm max-w-4xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-150">
            <div>
              <h2 className="text-xl font-bold text-gray-900">My Facility Bookings &amp; Passes</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Track approval status, payment reconciliation, security deposit releases, and download entry passes.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveView('catalog')}
              className="bg-[#8C1538] hover:bg-[#73102d] text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
            >
              <span>+</span>
              <span>Reserve Another Venue</span>
            </button>
          </div>

          {bookings.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-gray-200 rounded-xl text-gray-400 text-xs space-y-2">
              <p>No facility reservations found.</p>
              <button
                type="button"
                onClick={() => setActiveView('catalog')}
                className="text-xs font-bold text-[#8C1538] underline"
              >
                Browse Available Venues &amp; Halls
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((b) => (
                <div
                  key={b.id}
                  className="border border-gray-200 rounded-xl overflow-hidden bg-white hover:border-gray-300 transition-all flex flex-col shadow-xs"
                >
                  {/* Top Strip */}
                  <div className="bg-gray-50/75 px-5 py-2.5 border-b border-gray-150 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[#8C1538] bg-red-50 px-2 py-0.5 rounded border border-red-100">
                        {b.refId || `#${b.id}`}
                      </span>
                      <span className="font-semibold text-gray-700">
                        • {b.eventType || 'Venue Reservation'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {b.paymentStatus && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider bg-emerald-100 text-emerald-800">
                          ✓ {b.paymentStatus}
                        </span>
                      )}
                      <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded uppercase tracking-wider border ${
                        b.status === 'APPROVED' || b.status === 'RESERVED'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : b.status === 'PENDING'
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : 'bg-gray-100 text-gray-500 border-gray-200'
                      }`}>
                        {b.status}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 text-blue-700 flex items-center justify-center text-2xl shrink-0">
                      {b.avatar || '🏛️'}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="text-base font-bold text-gray-900 truncate">{b.facilityName}</h3>
                        {b.rentalFee !== undefined && (
                          <span className="text-[11px] font-bold text-[#8C1538] bg-red-50 px-2 py-0.5 rounded border border-red-100 shrink-0">
                            Rs. {(b.rentalFee + (b.securityDeposit || 0)).toLocaleString()} Total
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-gray-500 mt-0.5">{b.location || 'Municipal Complex'}</p>

                      {b.eventTitle && (
                        <p className="text-xs font-semibold text-gray-800 mt-1">
                          🎉 {b.eventTitle}
                        </p>
                      )}

                      <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-gray-600 font-medium">
                        <span>📅 {b.date}</span>
                        {b.time && <span className="border-l border-gray-200 pl-3">⏰ {b.time}</span>}
                        {b.expectedAttendees && (
                          <span className="border-l border-gray-200 pl-3 text-gray-500 text-[11px]">
                            👥 ~{b.expectedAttendees} Attendees
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedBookingDetails(b);
                        setIsDetailsModalOpen(true);
                      }}
                      className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 p-2 rounded-lg transition-colors cursor-pointer shadow-3xs flex items-center gap-1 text-xs font-semibold shrink-0"
                    >
                      <span>Details</span>
                    </button>
                  </div>

                  {/* Bottom Strip */}
                  <div className="bg-stone-50 border-t border-gray-200 px-5 py-2.5 flex justify-between items-center text-xs">
                    <span className="text-gray-600 font-medium">
                      {b.statusMessage || 'Facility booking active.'}
                    </span>
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => downloadSlip(b)}
                        className="text-emerald-700 font-bold hover:underline cursor-pointer flex items-center gap-1"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        <span>Download Pass Slip</span>
                      </button>
                      {b.status === 'PENDING' && (
                        <>
                          <span className="text-gray-300">|</span>
                          <button
                            type="button"
                            onClick={() => handleCancelBooking(b.id)}
                            className="text-red-600 font-medium hover:underline cursor-pointer"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      <BookingDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        booking={selectedBookingDetails}
      />
    </div>
  );
};

export default FacilityBooking;
