import React, { useState } from 'react';

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
  const today = new Date(2026, 6, 10); // July 10, 2026 default
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
    
    // Reset specific fields
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

  const handleMockUpload = () => {
    const isCremation = selectedFacility?.category === 'Crematoriums';
    const filename = isCremation ? 'death_certificate_signed.pdf' : 'permit_request_form.pdf';
    setUploadedFileName(filename);
    setUploadedFileSize(148500); // ~145 KB
  };

  const handleNextStep = () => {
    if (!chosenDateObj || !chosenTimeSlot) {
      alert('Please select both a date and an available time slot.');
      return;
    }
    setWizardStep('form');
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!applicantName.trim()) newErrors.applicantName = 'Applicant name is required';
    if (!applicantAddress.trim()) newErrors.applicantAddress = 'Address is required';
    if (!applicantNic.trim()) newErrors.applicantNic = 'NIC is required';
    if (!applicantPhone.trim()) newErrors.applicantPhone = 'Telephone is required';
    if (!applicantGrama.trim()) newErrors.applicantGrama = 'Grama Niladhari Division is required';

    if (selectedFacility?.category === 'Crematoriums') {
      if (!deceasedName.trim()) newErrors.deceasedName = 'Deceased person name is required';
      if (!deceasedAddress.trim()) newErrors.deceasedAddress = 'Deceased address is required';
      if (!deceasedGrama.trim()) newErrors.deceasedGrama = 'Deceased Grama Division is required';
      if (!deathCertificateNo.trim()) newErrors.deathCertificateNo = 'Death Certificate details are required';
      if (!causeOfDeath.trim()) newErrors.causeOfDeath = 'Cause of death is required';
      if (inquestConducted === 'Yes' && !inquestVerdict.trim()) {
        newErrors.inquestVerdict = 'Inquest conclusion/verdict is required';
      }
    } else {
      if (!bookingPurpose.trim()) newErrors.bookingPurpose = 'Purpose of booking is required';
    }

    if (!uploadedFileName) {
      newErrors.file = 'Please upload the required document/certificate';
    }

    if (!declaredCorrect) {
      newErrors.declaration = 'You must declare that the information is correct';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitBooking = () => {
    if (!validateForm()) {
      alert('Please fill all required fields, attach the documents and check the declaration.');
      return;
    }

    // Prepare custom details to store
    const formDetails = selectedFacility?.category === 'Crematoriums' ? {
      applicantName,
      applicantAddress,
      applicantNic,
      applicantPhone,
      applicantGrama,
      deceasedName,
      deceasedAddress,
      deceasedGrama,
      deceasedNic,
      relationship,
      deathCertificateNo,
      registrarName,
      registrarAddress,
      causeOfDeath,
      inquestConducted,
      inquestDateTime,
      inquestVerdict,
      bodyHandedOver,
      prefPreference2,
      prefPreference3
    } : {
      applicantName,
      applicantAddress,
      applicantNic,
      applicantPhone,
      applicantGrama,
      bookingPurpose,
      expectedAttendance,
      equipmentRequired
    };

    const bookingPayload = {
      date: chosenDateObj.dateStr,
      time: chosenTimeSlot.time,
      formDetails,
      attachment: uploadedFileName ? { name: uploadedFileName, size: uploadedFileSize } : null
    };

    // Callback to parent
    onReserve(selectedFacility, bookingPayload);
    setWizardStep('list');
  };

  // ----------------------------------------------------
  // RENDER: STEP 1 - DATE & TIME SELECTION
  // ----------------------------------------------------
  if (wizardStep === 'datetime') {
    const daysInMonth = getDaysInMonth(viewYear, viewMonth);
    const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const handlePrevMonth = () => {
      if (viewMonth === 0) {
        setViewMonth(11);
        setViewYear(prev => prev - 1);
      } else {
        setViewMonth(prev => prev - 1);
      }
    };

    const handleNextMonth = () => {
      if (viewMonth === 11) {
        setViewMonth(0);
        setViewYear(prev => prev + 1);
      } else {
        setViewMonth(prev => prev + 1);
      }
    };

    return (
      <div className="max-w-4xl mx-auto bg-white border border-gray-150 rounded-xl shadow-xs overflow-hidden">
        {/* Header */}
        <div className="bg-red-850 p-6 text-white flex justify-between items-center">
          <div>
            <span className="text-[10px] bg-white/20 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
              Step 1 of 2: Booking Schedule
            </span>
            <h2 className="text-xl font-bold mt-2 font-serif">Select Date & Time</h2>
          </div>
          <button 
            onClick={() => setWizardStep('list')}
            className="text-white hover:text-gray-200 text-xs font-bold bg-black/20 hover:bg-black/35 px-4 py-2 rounded-lg transition-colors cursor-pointer"
          >
            Cancel Reservation
          </button>
        </div>

        {/* Selected Facility Overview */}
        <div className="p-6 border-b border-gray-150 bg-gray-50 flex flex-col md:flex-row gap-5 items-center">
          <img 
            src={selectedFacility.image} 
            alt={selectedFacility.title} 
            className="w-32 h-20 rounded-lg object-cover shadow-sm"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-red-50 text-red-800 text-[9px] font-extrabold px-2 py-0.5 rounded uppercase">
                {selectedFacility.category}
              </span>
              <span className="text-[10px] text-gray-400 font-semibold">
                Starting at {selectedFacility.basePrice}
              </span>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mt-1 font-serif">{selectedFacility.title}</h3>
            <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
              {selectedFacility.subtitle}
            </p>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Calendar Picker Section */}
          <div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
              <h4 className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <span>📅</span> Select a Date
              </h4>
              
              {/* Legend */}
              <div className="flex flex-wrap gap-3.5 text-[10px] font-extrabold uppercase tracking-wide">
                <span className="flex items-center gap-1.5 text-green-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500 block"></span>
                  Available
                </span>
                <span className="flex items-center gap-1.5 text-amber-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 block"></span>
                  Limited Slots
                </span>
                <span className="flex items-center gap-1.5 text-red-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 block"></span>
                  Fully Booked
                </span>
              </div>
            </div>

            {/* Calendar Widget Grid */}
            <div className="border border-gray-200 rounded-xl overflow-hidden shadow-xs bg-white max-w-sm">
              
              {/* Calendar Month Header */}
              <div className="flex justify-between items-center p-3.5 bg-gray-50 border-b border-gray-150">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  className="p-1.5 rounded-lg hover:bg-gray-250 text-gray-600 transition-colors font-bold text-xs cursor-pointer select-none"
                >
                  &larr; Prev
                </button>
                <span className="text-xs font-extrabold text-gray-800 uppercase tracking-wider">
                  {monthNames[viewMonth]} {viewYear}
                </span>
                <button
                  type="button"
                  onClick={handleNextMonth}
                  className="p-1.5 rounded-lg hover:bg-gray-250 text-gray-600 transition-colors font-bold text-xs cursor-pointer select-none"
                >
                  Next &rarr;
                </button>
              </div>

              {/* Grid Days */}
              <div className="p-3.5">
                
                {/* Weekdays Labels */}
                <div className="grid grid-cols-7 gap-1 text-center text-[9px] font-extrabold text-gray-450 uppercase mb-2">
                  <span>Sun</span>
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                </div>

                {/* Days Grid cells */}
                <div className="grid grid-cols-7 gap-1.5">
                  {/* Padding cells */}
                  {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={`pad-${i}`} className="aspect-square bg-gray-50/20 rounded-lg"></div>
                  ))}
                  
                  {/* Month days */}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const dateDetails = getAvailabilityForDay(viewYear, viewMonth, day);
                    const isSelected = chosenDateObj && 
                                      chosenDateObj.day === day && 
                                      chosenDateObj.month === viewMonth && 
                                      chosenDateObj.year === viewYear;
                    
                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => {
                          const dateDetails = getAvailabilityForDay(viewYear, viewMonth, day);
                          const formattedMonth = String(viewMonth + 1).padStart(2, '0');
                          const formattedDay = String(day).padStart(2, '0');
                          const rawDate = `${viewYear}-${formattedMonth}-${formattedDay}`;
                          const weekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                          const weekdayIndex = new Date(viewYear, viewMonth, day).getDay();
                          const dateStr = `${weekdayNames[weekdayIndex]}, ${monthNames[viewMonth].substring(0, 3)} ${day}`;
                          
                          setChosenDateObj({
                            day,
                            month: viewMonth,
                            year: viewYear,
                            dateStr,
                            rawDate,
                            ...dateDetails
                          });
                          setChosenTimeSlot(null); // Reset time when date changes
                        }}
                        className={`aspect-square rounded-lg flex flex-col items-center justify-between p-1.5 border text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'border-red-850 bg-red-850 text-white shadow-sm ring-2 ring-red-850/30 font-extrabold'
                            : 'border-gray-150 hover:border-gray-300 bg-white text-gray-750'
                        }`}
                      >
                        <span className="text-[10px] self-start leading-none">{day}</span>
                        <span className={`w-1.5 h-1.5 rounded-full ${dateDetails.dotColor} block mt-auto`}></span>
                      </button>
                    );
                  })}
                </div>

              </div>
            </div>
          </div>

          {/* Time Slots Selector */}
          {chosenDateObj && (
            <div>
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <span>🕒</span> Available Time Slots for {chosenDateObj.dateStr}
                </h4>
                <span className="text-xs text-gray-400 font-bold uppercase">
                  Status: {chosenDateObj.statusLabel}
                </span>
              </div>

              {chosenDateObj.status === 'unavailable' ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-5 text-center text-red-850 text-xs font-bold">
                  🚫 All slots are fully booked for this date. Please choose a different date above.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  {chosenDateObj.slots.map((slot, index) => {
                    const isSelected = chosenTimeSlot?.time === slot.time;
                    return (
                      <button
                        key={index}
                        type="button"
                        disabled={!slot.available}
                        onClick={() => setChosenTimeSlot(slot)}
                        className={`border rounded-xl py-3 px-4 text-xs font-bold text-center transition-all ${
                          !slot.available 
                            ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed line-through'
                            : isSelected
                              ? 'border-red-850 bg-red-850 text-white shadow-sm'
                              : 'border-gray-200 bg-white text-gray-700 hover:border-red-800/40 hover:bg-red-50/10 cursor-pointer'
                        }`}
                      >
                        <div className="flex items-center justify-center gap-1.5">
                          <span>{slot.time}</span>
                          {!slot.available && <span className="text-[9px] bg-gray-250 text-gray-500 px-1 rounded font-bold uppercase">Booked</span>}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="bg-gray-50 border-t border-gray-150 p-5 flex justify-between items-center">
          <span className="text-xs text-gray-500 font-bold">
            {chosenTimeSlot ? `Selected: ${chosenDateObj.dateStr} at ${chosenTimeSlot.time}` : 'Please select date and time slot.'}
          </span>
          <button
            onClick={handleNextStep}
            disabled={!chosenDateObj || !chosenTimeSlot}
            className={`px-6 py-2.5 rounded-lg text-xs font-extrabold transition-all shadow-sm cursor-pointer flex items-center gap-1.5 ${
              chosenDateObj && chosenTimeSlot
                ? 'bg-red-850 hover:bg-red-900 text-white'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <span>Next Step</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // RENDER: STEP 2 - RESERVATION FORMS (CREMATION / GENERAL)
  // ----------------------------------------------------
  if (wizardStep === 'form') {
    const isCremation = selectedFacility?.category === 'Crematoriums';

    return (
      <div className="max-w-4xl mx-auto bg-white border border-gray-150 rounded-xl shadow-xs overflow-hidden">
        {/* Header */}
        <div className="bg-red-850 p-6 text-white flex justify-between items-center">
          <div>
            <span className="text-[10px] bg-white/20 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
              Step 2 of 2: Information Form
            </span>
            <h2 className="text-xl font-bold mt-2 font-serif">
              {isCremation ? 'Application for Cremation (English Digital Version)' : 'Facility Reservation Request Form'}
            </h2>
          </div>
          <button 
            onClick={() => setWizardStep('datetime')}
            className="text-white hover:text-gray-200 text-xs font-bold bg-black/20 hover:bg-black/35 px-4 py-2 rounded-lg transition-colors cursor-pointer"
          >
            Back to Schedule
          </button>
        </div>

        {/* Selected Schedule Summary */}
        <div className="p-4 border-b border-gray-150 bg-red-50/20 flex flex-wrap justify-between items-center gap-3 text-xs font-bold text-red-950">
          <div>
            Facility: <span className="text-red-900 font-extrabold">{selectedFacility.title}</span>
          </div>
          <div className="flex gap-4">
            <span>📅 Date: {chosenDateObj.dateStr}</span>
            <span>🕒 Time: {chosenTimeSlot.time}</span>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* SECTION A: APPLICANT DETAILS (COMMON) */}
          <div className="border border-gray-150 rounded-xl p-5 bg-white space-y-4">
            <h3 className="text-xs font-extrabold text-red-800 uppercase tracking-widest border-b border-gray-100 pb-2 mb-3">
              Part A: Applicant Information (අයදුම්කරුගේ තොරතුරු)
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  1. Applicant's Full Name (සම්පූර්ණ නම) <span className="text-red-800">*</span>
                </label>
                <input 
                  type="text"
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg text-xs focus:outline-none focus:ring-1 ${
                    errors.applicantName 
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50/10' 
                      : 'border-gray-300 focus:ring-red-800 focus:border-red-800'
                  }`}
                />
                {errors.applicantName && <p className="text-[10px] text-red-600 mt-1 font-bold">{errors.applicantName}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  2. NIC Number (ජාතික හැඳුනුම්පත් අංකය) <span className="text-red-800">*</span>
                </label>
                <input 
                  type="text"
                  value={applicantNic}
                  onChange={(e) => setApplicantNic(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg text-xs focus:outline-none focus:ring-1 ${
                    errors.applicantNic 
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50/10' 
                      : 'border-gray-300 focus:ring-red-800 focus:border-red-800'
                  }`}
                  placeholder="e.g. 198812345678 or 881234567V"
                />
                {errors.applicantNic && <p className="text-[10px] text-red-600 mt-1 font-bold">{errors.applicantNic}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  3. Address of Applicant (ලිපිනය) <span className="text-red-800">*</span>
                </label>
                <input 
                  type="text"
                  value={applicantAddress}
                  onChange={(e) => setApplicantAddress(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg text-xs focus:outline-none focus:ring-1 ${
                    errors.applicantAddress 
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50/10' 
                      : 'border-gray-300 focus:ring-red-800 focus:border-red-800'
                  }`}
                />
                {errors.applicantAddress && <p className="text-[10px] text-red-600 mt-1 font-bold">{errors.applicantAddress}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  4. Grama Niladhari Division (ග්‍රාම සේවා කොට්ඨාසය) <span className="text-red-800">*</span>
                </label>
                <input 
                  type="text"
                  value={applicantGrama}
                  onChange={(e) => setApplicantGrama(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg text-xs focus:outline-none focus:ring-1 ${
                    errors.applicantGrama 
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50/10' 
                      : 'border-gray-300 focus:ring-red-800 focus:border-red-800'
                  }`}
                  placeholder="e.g. Homagama North - 482"
                />
                {errors.applicantGrama && <p className="text-[10px] text-red-600 mt-1 font-bold">{errors.applicantGrama}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  5. Telephone / Contact Number (දුරකථන අංකය) <span className="text-red-800">*</span>
                </label>
                <input 
                  type="text"
                  value={applicantPhone}
                  onChange={(e) => setApplicantPhone(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg text-xs focus:outline-none focus:ring-1 ${
                    errors.applicantPhone 
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50/10' 
                      : 'border-gray-300 focus:ring-red-800 focus:border-red-800'
                  }`}
                  placeholder="e.g. +94 77 123 4567"
                />
                {errors.applicantPhone && <p className="text-[10px] text-red-600 mt-1 font-bold">{errors.applicantPhone}</p>}
              </div>
            </div>
          </div>

          {/* CREMATION FORM PARTS (ONLY IF CREMATORIUM CATEGORY SELECTED) */}
          {isCremation ? (
            <>
              {/* PART B: DECEASED PERSON DETAILS */}
              <div className="border border-gray-150 rounded-xl p-5 bg-white space-y-4">
                <h3 className="text-xs font-extrabold text-red-800 uppercase tracking-widest border-b border-gray-100 pb-2 mb-3">
                  Part B: Deceased Person Information (මියගිය තැනැත්තාගේ තොරතුරු)
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      6. Deceased Person's Full Name (මියගිය තැනැත්තාගේ නම) <span className="text-red-800">*</span>
                    </label>
                    <input 
                      type="text"
                      value={deceasedName}
                      onChange={(e) => setDeceasedName(e.target.value)}
                      placeholder="Full Name of Deceased"
                      className={`w-full px-3 py-2 border rounded-lg text-xs focus:outline-none focus:ring-1 ${
                        errors.deceasedName 
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50/10' 
                          : 'border-gray-300 focus:ring-red-800 focus:border-red-800'
                      }`}
                    />
                    {errors.deceasedName && <p className="text-[10px] text-red-600 mt-1 font-bold">{errors.deceasedName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      7. Deceased Person's NIC (ජාතික හැඳුනුම්පත් අංකය)
                    </label>
                    <input 
                      type="text"
                      value={deceasedNic}
                      onChange={(e) => setDeceasedNic(e.target.value)}
                      placeholder="NIC (if available)"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-red-800 focus:border-red-800"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      8. Address of Residence (පදිංචි වී සිටි ලිපිනය) <span className="text-red-800">*</span>
                    </label>
                    <input 
                      type="text"
                      value={deceasedAddress}
                      onChange={(e) => setDeceasedAddress(e.target.value)}
                      placeholder="Last known residence address"
                      className={`w-full px-3 py-2 border rounded-lg text-xs focus:outline-none focus:ring-1 ${
                        errors.deceasedAddress 
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50/10' 
                          : 'border-gray-300 focus:ring-red-800 focus:border-red-800'
                      }`}
                    />
                    {errors.deceasedAddress && <p className="text-[10px] text-red-600 mt-1 font-bold">{errors.deceasedAddress}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      9. Grama Niladhari Division (ග්‍රාමසේවා කොට්ඨාසය) <span className="text-red-850">*</span>
                    </label>
                    <input 
                      type="text"
                      value={deceasedGrama}
                      onChange={(e) => setDeceasedGrama(e.target.value)}
                      placeholder="GN division where deceased resided"
                      className={`w-full px-3 py-2 border rounded-lg text-xs focus:outline-none focus:ring-1 ${
                        errors.deceasedGrama 
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50/10' 
                          : 'border-gray-300 focus:ring-red-800 focus:border-red-800'
                      }`}
                    />
                    {errors.deceasedGrama && <p className="text-[10px] text-red-600 mt-1 font-bold">{errors.deceasedGrama}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      10. Relationship of Applicant to Deceased (සම්බන්ධතාවය) <span className="text-red-850">*</span>
                    </label>
                    <select 
                      value={relationship}
                      onChange={(e) => setRelationship(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-red-800 focus:border-red-800 bg-white"
                    >
                      <option>Spouse</option>
                      <option>Child</option>
                      <option>Parent</option>
                      <option>Sibling</option>
                      <option>Other Relative</option>
                      <option>Authorized Agent / Undertaker</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* PART C: LEGAL & CORONER DETAILS */}
              <div className="border border-gray-150 rounded-xl p-5 bg-white space-y-4">
                <h3 className="text-xs font-extrabold text-red-800 uppercase tracking-widest border-b border-gray-100 pb-2 mb-3">
                  Part C: Legal & Coroner Information (නීතිමය හා පරීක්ෂණ විස්තර)
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      11. Death Certificate No. & Date (මරණ සහතිකයේ අංකය හා දිනය) <span className="text-red-850">*</span>
                    </label>
                    <input 
                      type="text"
                      value={deathCertificateNo}
                      onChange={(e) => setDeathCertificateNo(e.target.value)}
                      placeholder="e.g. Reg No. 1234/2026, dated 2026-07-09"
                      className={`w-full px-3 py-2 border rounded-lg text-xs focus:outline-none focus:ring-1 ${
                        errors.deathCertificateNo 
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50/10' 
                          : 'border-gray-300 focus:ring-red-800 focus:border-red-800'
                      }`}
                    />
                    {errors.deathCertificateNo && <p className="text-[10px] text-red-600 mt-1 font-bold">{errors.deathCertificateNo}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      12. Cause of Death (මරණයට හේතුව) <span className="text-red-850">*</span>
                    </label>
                    <input 
                      type="text"
                      value={causeOfDeath}
                      onChange={(e) => setCauseOfDeath(e.target.value)}
                      placeholder="As declared in medical certificate"
                      className={`w-full px-3 py-2 border rounded-lg text-xs focus:outline-none focus:ring-1 ${
                        errors.causeOfDeath 
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50/10' 
                          : 'border-gray-300 focus:ring-red-800 focus:border-red-800'
                      }`}
                    />
                    {errors.causeOfDeath && <p className="text-[10px] text-red-600 mt-1 font-bold">{errors.causeOfDeath}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      13. Registrar's Full Name (මරණ ලියාපදිංචි කළ ලේකම්ගේ නම)
                    </label>
                    <input 
                      type="text"
                      value={registrarName}
                      onChange={(e) => setRegistrarName(e.target.value)}
                      placeholder="Name of Death Registrar"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-red-800 focus:border-red-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      14. Registrar's Address / Office (ලේකම්ගේ ලිපිනය)
                    </label>
                    <input 
                      type="text"
                      value={registrarAddress}
                      onChange={(e) => setRegistrarAddress(e.target.value)}
                      placeholder="Office address of Registrar"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-red-800 focus:border-red-800"
                    />
                  </div>

                  <div className="md:col-span-2 border-t border-gray-100 pt-3">
                    <label className="block text-xs font-bold text-gray-700 mb-2">
                      15. Was an inquest or post-mortem conducted? (මරණය සම්බන්ධයෙන් පරීක්ෂණයක් පවත්වන ලද්දේ ද?)
                    </label>
                    <div className="flex gap-6 mb-3">
                      <label className="flex items-center gap-2 text-xs font-semibold text-gray-600 cursor-pointer">
                        <input 
                          type="radio" 
                          name="inquest" 
                          value="No" 
                          checked={inquestConducted === 'No'} 
                          onChange={() => setInquestConducted('No')}
                          className="w-4 h-4 text-red-800 focus:ring-red-800"
                        />
                        <span>No (නැත)</span>
                      </label>
                      <label className="flex items-center gap-2 text-xs font-semibold text-gray-600 cursor-pointer">
                        <input 
                          type="radio" 
                          name="inquest" 
                          value="Yes" 
                          checked={inquestConducted === 'Yes'} 
                          onChange={() => setInquestConducted('Yes')}
                          className="w-4 h-4 text-red-800 focus:ring-red-800"
                        />
                        <span>Yes (ඔව්)</span>
                      </label>
                    </div>

                    {inquestConducted === 'Yes' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 bg-gray-50 p-4 border border-gray-200 rounded-lg animate-fade-in">
                        <div>
                          <label className="block text-[11px] font-bold text-gray-700 mb-1">
                            Inquest Date and Time (පරීක්ෂණය පැවැත්වූ දිනය හා වේලාව)
                          </label>
                          <input 
                            type="text"
                            value={inquestDateTime}
                            onChange={(e) => setInquestDateTime(e.target.value)}
                            placeholder="e.g. 2026-07-09, 10:30 AM"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-gray-700 mb-1">
                            Conclusion/Verdict of Inquest Officer (නිලධාරියාගේ නිගමනය) <span className="text-red-800">*</span>
                          </label>
                          <input 
                            type="text"
                            value={inquestVerdict}
                            onChange={(e) => setInquestVerdict(e.target.value)}
                            placeholder="Verdict or ruling"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs bg-white"
                          />
                          {errors.inquestVerdict && <p className="text-[10px] text-red-600 mt-1">{errors.inquestVerdict}</p>}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-2 border-t border-gray-100 pt-3">
                    <label className="block text-xs font-bold text-gray-700 mb-2">
                      16. Handing over body for cremation? (මෘත ශරීරය ආදාහනය කිරීමට ලබා දෙන්නේ ද?)
                    </label>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2 text-xs font-semibold text-gray-600 cursor-pointer">
                        <input 
                          type="radio" 
                          name="bodyHandedOver" 
                          value="Yes" 
                          checked={bodyHandedOver === 'Yes'} 
                          onChange={() => setBodyHandedOver('Yes')}
                          className="w-4 h-4 text-red-800 focus:ring-red-800"
                        />
                        <span>Yes, fully authorized (ඔව්)</span>
                      </label>
                      <label className="flex items-center gap-2 text-xs font-semibold text-gray-600 cursor-pointer">
                        <input 
                          type="radio" 
                          name="bodyHandedOver" 
                          value="No" 
                          checked={bodyHandedOver === 'No'} 
                          onChange={() => setBodyHandedOver('No')}
                          className="w-4 h-4 text-red-800 focus:ring-red-800"
                        />
                        <span>No (නැත)</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* PART D: CREMATION BOOKING PREFERENCES */}
              <div className="border border-gray-150 rounded-xl p-5 bg-white space-y-4">
                <h3 className="text-xs font-extrabold text-red-800 uppercase tracking-widest border-b border-gray-100 pb-2 mb-3">
                  Part D: Cremation Time Preferences (ආදාහනය කිරීමට අවශ්‍ය දිනය හා වේලාවන්)
                </h3>
                
                <p className="text-[11px] text-gray-400 font-bold leading-normal uppercase">
                  Please list the required cremation dates/times in order of preference:
                </p>

                <div className="space-y-3.5">
                  <div className="flex items-center gap-4 bg-gray-50 border border-gray-250 rounded-lg p-3">
                    <span className="text-xs font-bold text-red-855 bg-red-50 rounded-full w-6 h-6 flex items-center justify-center border border-red-200">I</span>
                    <div className="text-xs">
                      <div className="font-extrabold text-gray-800">1st Preference (Primary Booking):</div>
                      <div className="text-gray-500 font-bold mt-0.5">{chosenDateObj.dateStr} at {chosenTimeSlot.time}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-gray-500 bg-gray-50 rounded-full w-6 h-6 flex items-center justify-center border border-gray-250">II</span>
                    <input 
                      type="text"
                      value={prefPreference2}
                      onChange={(e) => setPrefPreference2(e.target.value)}
                      placeholder="2nd Preference Date/Time (e.g. Next day, morning slot)"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-red-800 focus:border-red-800"
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-gray-500 bg-gray-50 rounded-full w-6 h-6 flex items-center justify-center border border-gray-250">III</span>
                    <input 
                      type="text"
                      value={prefPreference3}
                      onChange={(e) => setPrefPreference3(e.target.value)}
                      placeholder="3rd Preference Date/Time (e.g. Next day, evening slot)"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-red-800 focus:border-red-800"
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* GENERAL FACILITY FORM (IF NOT CREMATORIUM) */
            <div className="border border-gray-150 rounded-xl p-5 bg-white space-y-4">
              <h3 className="text-xs font-extrabold text-red-800 uppercase tracking-widest border-b border-gray-100 pb-2 mb-3">
                Part B: Event & Reservation Information
              </h3>
              
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    6. Purpose of Booking / Description of Event <span className="text-red-800">*</span>
                  </label>
                  <textarea 
                    value={bookingPurpose}
                    onChange={(e) => setBookingPurpose(e.target.value)}
                    rows={3}
                    placeholder="Provide details about the type of event, ceremony, sports match or meeting..."
                    className={`w-full px-3 py-2 border rounded-lg text-xs focus:outline-none focus:ring-1 ${
                      errors.bookingPurpose 
                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50/10' 
                        : 'border-gray-300 focus:ring-red-800 focus:border-red-800'
                    }`}
                  />
                  {errors.bookingPurpose && <p className="text-[10px] text-red-600 mt-1 font-bold">{errors.bookingPurpose}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      7. Expected Attendance (Persons)
                    </label>
                    <input 
                      type="number"
                      value={expectedAttendance}
                      onChange={(e) => setExpectedAttendance(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-red-800 focus:border-red-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      8. Special Equipment or Services Requested
                    </label>
                    <input 
                      type="text"
                      value={equipmentRequired}
                      onChange={(e) => setEquipmentRequired(e.target.value)}
                      placeholder="e.g. Additional chairs, AV systems, public address setup"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-red-800 focus:border-red-800"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PART E: DOCUMENT ATTACHMENT & DECLARATION */}
          <div className="border border-gray-150 rounded-xl p-5 bg-white space-y-4">
            <h3 className="text-xs font-extrabold text-red-800 uppercase tracking-widest border-b border-gray-100 pb-2 mb-3">
              {isCremation ? 'Part E: Attachments & Sign-off' : 'Part C: Attachments & Sign-off'}
            </h3>

            {/* Document Uploader */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-700">
                {isCremation ? 'Attach Death Certificate / Disposal Permit (PDF/Image)' : 'Attach National Identity Card (NIC) / Supporting Permission Letter'} <span className="text-red-800">*</span>
              </label>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 flex flex-col items-center justify-center text-center">
                {uploadedFileName ? (
                  <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-lg p-2.5 px-4 text-xs text-green-800 font-bold">
                    <span>📄</span>
                    <div>
                      <div>{uploadedFileName}</div>
                      <div className="text-[10px] text-gray-400 font-semibold mt-0.5">({(uploadedFileSize / 1024).toFixed(1)} KB) • Uploaded</div>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => setUploadedFileName('')}
                      className="text-red-600 hover:text-red-800 font-extrabold text-base ml-4 leading-none cursor-pointer"
                    >
                      &times;
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    <p className="text-xs text-gray-500 font-bold">Drag and drop files here, or upload from your device.</p>
                    <button
                      type="button"
                      onClick={handleMockUpload}
                      className="bg-red-850 hover:bg-red-900 text-white px-4.5 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <span>⬆</span> Upload Document
                    </button>
                  </div>
                )}
                {errors.file && <p className="text-[10px] text-red-600 mt-2 font-bold">{errors.file}</p>}
              </div>
            </div>

            {/* Declaration Checkbox */}
            <div className="pt-2 border-t border-gray-100">
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input 
                  type="checkbox"
                  checked={declaredCorrect}
                  onChange={(e) => setDeclaredCorrect(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-red-800 focus:ring-red-800 mt-0.5"
                />
                <span className="text-[11px] font-bold text-gray-600 leading-normal">
                  {isCremation 
                    ? 'I hereby certify that all information provided above regarding the deceased and the applicant is true and correct to the best of my knowledge. I have attached the official death certificate/disposal permit. (ඉහත සඳහන් කර ඇති තොරතුරු සියල්ල නිවැරදි හා සත්‍ය බව සහතික කරමි. අදාළ සහතිකය අමුණා ඇත.)'
                    : 'I certify that the information provided is correct, and I agree to adhere to the rules and guidelines governing the reservation of facilities under the Pradeshiya Sabha.'
                  }
                </span>
              </label>
              {errors.declaration && <p className="text-[10px] text-red-600 mt-1 font-bold">{errors.declaration}</p>}
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="bg-gray-50 border-t border-gray-150 p-5 flex justify-between items-center">
          <button
            type="button"
            onClick={() => setWizardStep('datetime')}
            className="border border-gray-300 hover:border-gray-400 bg-white text-gray-700 px-6 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
          >
            Back to Schedule
          </button>
          
          <button
            onClick={handleSubmitBooking}
            className="bg-red-850 hover:bg-red-900 text-white px-7 py-2.5 rounded-lg text-xs font-extrabold transition-all shadow-sm cursor-pointer flex items-center gap-1.5"
          >
            <span>Confirm & Reserve Facility</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </button>
        </div>
      </div>
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
