import React, { useState } from 'react';
import { DateTimeSelectionStep } from './DateTimeSelectionStep';
import { FormStep } from './FormStep';

// Calendar date and availability helpers
const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay(); // 0 is Sunday, 6 is Saturday
};

const getAvailabilityForDay = (year: number, month: number, day: number) => {
  const dateObj = new Date(year, month, day);
  const dayOfWeek = dateObj.getDay();
  
  // Sundays (0) are fully booked
  if (dayOfWeek === 0) {
    return {
      status: 'unavailable',
      statusLabel: 'Fully Booked',
      statusColor: 'text-red-750 bg-red-50 border-red-200',
      dotColor: 'bg-red-500',
      slots: [
        { time: '08:30 AM - 10:30 AM', available: false },
        { time: '10:30 AM - 12:30 PM', available: false },
        { time: '01:30 PM - 03:30 PM', available: false },
        { time: '03:30 PM - 05:30 PM', available: false }
      ]
    };
  }
  
  // Mondays (1), Wednesdays (3), Fridays (5) are partially booked (Limited Slots)
  if (dayOfWeek === 1 || dayOfWeek === 3 || dayOfWeek === 5) {
    let slots = [];
    if (day % 3 === 0) {
      slots = [
        { time: '08:30 AM - 10:30 AM', available: true },
        { time: '10:30 AM - 12:30 PM', available: false },
        { time: '01:30 PM - 03:30 PM', available: true },
        { time: '03:30 PM - 05:30 PM', available: false }
      ];
    } else if (day % 3 === 1) {
      slots = [
        { time: '08:30 AM - 10:30 AM', available: false },
        { time: '10:30 AM - 12:30 PM', available: true },
        { time: '01:30 PM - 03:30 PM', available: true },
        { time: '03:30 PM - 05:30 PM', available: true }
      ];
    } else {
      slots = [
        { time: '08:30 AM - 10:30 AM', available: true },
        { time: '10:30 AM - 12:30 PM', available: true },
        { time: '01:30 PM - 03:30 PM', available: false },
        { time: '03:30 PM - 05:30 PM', available: false }
      ];
    }
    return {
      status: 'partially',
      statusLabel: 'Limited Slots',
      statusColor: 'text-amber-700 bg-amber-50 border-amber-250',
      dotColor: 'bg-amber-500',
      slots
    };
  }
  
  // Tuesdays (2), Thursdays (4), Saturdays (6) are fully available
  return {
    status: 'fully',
    statusLabel: 'Available',
    statusColor: 'text-green-700 bg-green-50 border-green-250',
    dotColor: 'bg-green-500',
    slots: [
      { time: '08:30 AM - 10:30 AM', available: true },
      { time: '10:30 AM - 12:30 PM', available: true },
      { time: '01:30 PM - 03:30 PM', available: true },
      { time: '03:30 PM - 05:30 PM', available: true }
    ]
  };
};

const ReserveFacility = ({
  search,
  setSearch,
  categories,
  onCategoryToggle,
  capacity,
  setCapacity,
  date,
  setDate,
  onClearFilters,
  facilities,
  onReserve
}) => {
  // Wizard states: 'list' | 'datetime' | 'form'
  const [wizardStep, setWizardStep] = useState('list');
  const [selectedFacility, setSelectedFacility] = useState(null);
  
  // Date/Time Selection states
  const [viewMonth, setViewMonth] = useState(6); // July
  const [viewYear, setViewYear] = useState(2026);
  const [chosenDateObj, setChosenDateObj] = useState<any>(null);
  const [chosenTimeSlot, setChosenTimeSlot] = useState(null);

  // Form states
  const [applicantName, setApplicantName] = useState('');
  const [applicantAddress, setApplicantAddress] = useState('');
  const [applicantNic, setApplicantNic] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantGrama, setApplicantGrama] = useState('');
  
  // Cremation specific details
  const [deceasedName, setDeceasedName] = useState('');
  const [deceasedAddress, setDeceasedAddress] = useState('');
  const [deceasedGrama, setDeceasedGrama] = useState('');
  const [deceasedNic, setDeceasedNic] = useState('');
  const [relationship, setRelationship] = useState('Child');
  const [deathCertificateNo, setDeathCertificateNo] = useState('');
  const [registrarName, setRegistrarName] = useState('');
  const [registrarAddress, setRegistrarAddress] = useState('');
  const [causeOfDeath, setCauseOfDeath] = useState('');
  const [inquestConducted, setInquestConducted] = useState('No');
  const [inquestDateTime, setInquestDateTime] = useState('');
  const [inquestVerdict, setInquestVerdict] = useState('');
  const [bodyHandedOver, setBodyHandedOver] = useState('Yes');
  const [prefPreference2, setPrefPreference2] = useState('');
  const [prefPreference3, setPrefPreference3] = useState('');

  // General reservation details
  const [bookingPurpose, setBookingPurpose] = useState('');
  const [expectedAttendance, setExpectedAttendance] = useState('100');
  const [equipmentRequired, setEquipmentRequired] = useState('');

  // File upload state (mock)
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [uploadedFileSize, setUploadedFileSize] = useState(0);
  const [declaredCorrect, setDeclaredCorrect] = useState(false);

  // Error validations
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleStartBooking = (facility) => {
    setSelectedFacility(facility);
    
    // Start each booking from the portal's configured current date and availability.
    const todayDate = new Date(2026, 6, 10);
    const day = todayDate.getDate();
    const month = todayDate.getMonth();
    const year = todayDate.getFullYear();
    const dateDetails = getAvailabilityForDay(year, month, day);
    const dateStr = todayDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    const rawDate = todayDate.toISOString().split('T')[0];
    
    setViewMonth(month);
    setViewYear(year);
    setChosenDateObj({
      day,
      month,
      year,
      dateStr,
      rawDate,
      ...dateDetails
    });
    
    setChosenTimeSlot(null);
    setWizardStep('datetime');
    
    // Clear booking-specific data so a new reservation cannot inherit a previous draft.
    setDeceasedName('');
    setDeceasedAddress('');
    setDeceasedGrama('');
    setDeceasedNic('');
    setRelationship('Child');
    setDeathCertificateNo('');
    setRegistrarName('');
    setRegistrarAddress('');
    setCauseOfDeath('');
    setInquestConducted('No');
    setInquestDateTime('');
    setInquestVerdict('');
    setBookingPurpose('');
    setUploadedFileName('');
    setUploadedFileSize(0);
    setDeclaredCorrect(false);
    setErrors({});
  };

  // ----------------------------------------------------
  // RENDER: STEP 1 - DATE & TIME SELECTION
  // ----------------------------------------------------
  if (wizardStep === 'datetime') {
    // The child step owns calendar interactions while this component retains the wizard state.
    return (
      <DateTimeSelectionStep
        selectedFacility={selectedFacility}
        viewMonth={viewMonth}
        setViewMonth={setViewMonth}
        viewYear={viewYear}
        setViewYear={setViewYear}
        chosenDateObj={chosenDateObj}
        setChosenDateObj={setChosenDateObj}
        chosenTimeSlot={chosenTimeSlot}
        setChosenTimeSlot={setChosenTimeSlot}
        setWizardStep={setWizardStep}
        getDaysInMonth={getDaysInMonth}
        getFirstDayOfMonth={getFirstDayOfMonth}
        getAvailabilityForDay={getAvailabilityForDay}
      />
    );
  }

  // ----------------------------------------------------
  // RENDER: STEP 2 - RESERVATION FORMS (CREMATION / GENERAL)
  // ----------------------------------------------------
  if (wizardStep === 'form') {
    // FormStep receives both shared applicant fields and cremation-specific fields.
    return (
      <FormStep
        selectedFacility={selectedFacility}
        chosenDateObj={chosenDateObj}
        chosenTimeSlot={chosenTimeSlot}
        setWizardStep={setWizardStep}
        onReserve={onReserve}
        applicantName={applicantName}
        setApplicantName={setApplicantName}
        applicantAddress={applicantAddress}
        setApplicantAddress={setApplicantAddress}
        applicantNic={applicantNic}
        setApplicantNic={setApplicantNic}
        applicantPhone={applicantPhone}
        setApplicantPhone={setApplicantPhone}
        applicantGrama={applicantGrama}
        setApplicantGrama={setApplicantGrama}
        deceasedName={deceasedName}
        setDeceasedName={setDeceasedName}
        deceasedAddress={deceasedAddress}
        setDeceasedAddress={setDeceasedAddress}
        deceasedGrama={deceasedGrama}
        setDeceasedGrama={setDeceasedGrama}
        deceasedNic={deceasedNic}
        setDeceasedNic={setDeceasedNic}
        relationship={relationship}
        setRelationship={setRelationship}
        deathCertificateNo={deathCertificateNo}
        setDeathCertificateNo={setDeathCertificateNo}
        registrarName={registrarName}
        setRegistrarName={setRegistrarName}
        registrarAddress={registrarAddress}
        setRegistrarAddress={setRegistrarAddress}
        causeOfDeath={causeOfDeath}
        setCauseOfDeath={setCauseOfDeath}
        inquestConducted={inquestConducted}
        setInquestConducted={setInquestConducted}
        inquestDateTime={inquestDateTime}
        setInquestDateTime={setInquestDateTime}
        inquestVerdict={inquestVerdict}
        setInquestVerdict={setInquestVerdict}
        bodyHandedOver={bodyHandedOver}
        setBodyHandedOver={setBodyHandedOver}
        prefPreference2={prefPreference2}
        setPrefPreference2={setPrefPreference2}
        prefPreference3={prefPreference3}
        setPrefPreference3={setPrefPreference3}
        bookingPurpose={bookingPurpose}
        setBookingPurpose={setBookingPurpose}
        expectedAttendance={expectedAttendance}
        setExpectedAttendance={setExpectedAttendance}
        equipmentRequired={equipmentRequired}
        setEquipmentRequired={setEquipmentRequired}
        uploadedFileName={uploadedFileName}
        setUploadedFileName={setUploadedFileName}
        uploadedFileSize={uploadedFileSize}
        setUploadedFileSize={setUploadedFileSize}
        declaredCorrect={declaredCorrect}
        setDeclaredCorrect={setDeclaredCorrect}
        errors={errors}
        setErrors={setErrors}
      />
    );
  }

  // ----------------------------------------------------
  // RENDER: DEFAULT VIEW - FACILITIES GRID
  // ----------------------------------------------------
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
      
      {/* Left Sidebar Filter Panel */}
      <div className="lg:col-span-3 bg-white border border-gray-150 rounded-xl p-5 shadow-xs h-fit space-y-6">
        <div>
          <h3 className="text-xs font-extrabold text-gray-500 uppercase tracking-wider mb-3">
            FILTER ASSETS
          </h3>
          
          {/* Search Box */}
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search facilities..."
              className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-xs placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-red-800 focus:border-red-800"
            />
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Category filters */}
        <div>
          <h4 className="text-xs font-bold text-gray-700 mb-3">Category</h4>
          <div className="space-y-2.5">
            {['Event Halls', 'Sports Grounds', 'Community Centers', 'Public Parks', 'Crematoriums', 'Vehicles & Machinery'].map((cat) => {
              const checked = categories.includes(cat);
              return (
                <label key={cat} className="flex items-center gap-2.5 cursor-pointer text-xs text-gray-600 hover:text-gray-800 select-none">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onCategoryToggle(cat)}
                    className="w-4 h-4 rounded border-gray-300 text-red-800 focus:ring-red-800"
                  />
                  <span>{cat}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Clear All button */}
        <button
          type="button"
          onClick={onClearFilters}
          className="w-full bg-red-850 hover:bg-red-900 text-white py-2.5 rounded-lg text-xs font-bold transition-colors flex items-center justify-center shadow-xs cursor-pointer"
        >
          <span>Clear All Filters</span>
        </button>
      </div>

      {/* Right Facilities Panel */}
      <div className="lg:col-span-9 space-y-6">
        
        {/* Title and Sort Bar */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 font-serif">Reserve Community Facilities</h2>
            <p className="text-xs text-gray-500 mt-1">
              Book venues for your next event, sports match, or community gathering.
            </p>
          </div>
          
          <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
            <span className="text-xs text-gray-400 font-bold whitespace-nowrap">Sort by:</span>
            <select className="border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs text-gray-700 bg-white font-bold focus:outline-none">
              <option>Capacity (High to Low)</option>
              <option>Capacity (Low to High)</option>
              <option>Price (Low to High)</option>
            </select>
          </div>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((fac) => (
            // Keep the card presentational; starting a reservation is handled by the wizard.
            <div key={fac.id} className="border border-gray-150 rounded-xl overflow-hidden bg-white hover:shadow-md transition-shadow flex flex-col justify-between">
              
              {/* Card Header & Image */}
              <div className="relative">
                <img
                  src={fac.image}
                  alt={fac.title}
                  className="w-full h-44 object-cover"
                />
                <span className="absolute top-3 right-3 bg-white text-gray-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase shadow-sm border border-gray-100">
                  {fac.category}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-gray-800 mb-2 font-serif">{fac.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 mb-4">
                    {fac.subtitle}
                  </p>
                  
                  {/* Specifications */}
                  <div className="flex items-center gap-4 text-[10px] text-gray-400 font-bold mb-4">
                    <span className="flex items-center gap-1">
                      👤 {fac.capacity} Persons
                    </span>
                    <span className="flex items-center gap-1">
                      💵 {fac.price}
                    </span>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="border-t border-gray-100 pt-4 flex justify-between items-center mt-2">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wide">Starting at</span>
                    <span className="text-xs font-extrabold text-red-800">{fac.basePrice}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleStartBooking(fac)}
                    className="bg-red-850 hover:bg-red-900 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors shadow-sm cursor-pointer"
                  >
                    Reserve Now
                  </button>
                </div>
              </div>

            </div>
          ))}

          {/* Suggest a Facility Card */}
          <div className="border border-dashed border-gray-300 rounded-xl p-6 bg-white hover:bg-gray-50/50 transition-colors flex flex-col items-center justify-center text-center cursor-pointer min-h-90">
            <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 mb-4 border border-dashed border-gray-250">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-sm font-bold text-gray-800 mb-2">Suggest a Facility</h3>
            <p className="text-xs text-gray-500 leading-relaxed max-w-50">
              Can't find what you're looking for? Let us know about a community asset.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ReserveFacility;
