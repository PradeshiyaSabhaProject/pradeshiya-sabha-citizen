import React from 'react';

interface DateTimeSelectionStepProps {
  selectedFacility: any;
  viewMonth: number;
  setViewMonth: React.Dispatch<React.SetStateAction<number>>;
  viewYear: number;
  setViewYear: React.Dispatch<React.SetStateAction<number>>;
  chosenDateObj: any;
  setChosenDateObj: (dateObj: any) => void;
  chosenTimeSlot: any;
  setChosenTimeSlot: (slot: any) => void;
  setWizardStep: (step: string) => void;
  getDaysInMonth: (year: number, month: number) => number;
  getFirstDayOfMonth: (year: number, month: number) => number;
  getAvailabilityForDay: (year: number, month: number, day: number) => any;
}

export const DateTimeSelectionStep: React.FC<DateTimeSelectionStepProps> = ({
  selectedFacility,
  viewMonth,
  setViewMonth,
  viewYear,
  setViewYear,
  chosenDateObj,
  setChosenDateObj,
  chosenTimeSlot,
  setChosenTimeSlot,
  setWizardStep,
  getDaysInMonth,
  getFirstDayOfMonth,
  getAvailabilityForDay,
}) => {
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

  const handleNextStep = () => {
    if (!chosenDateObj || !chosenTimeSlot) {
      alert('Please select both a date and an available time slot.');
      return;
    }
    setWizardStep('form');
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
          type="button"
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
                <span>Available</span>
              </span>
              <span className="flex items-center gap-1.5 text-amber-700">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 block"></span>
                <span>Limited Slots</span>
              </span>
              <span className="flex items-center gap-1.5 text-red-700">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 block"></span>
                <span>Fully Booked</span>
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

            {/* Calendar Days */}
            <div className="p-3.5 bg-white">
              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">
                <span>Sun</span>
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
              </div>

              {/* Grid Days */}
              <div className="grid grid-cols-7 gap-1.5">
                {/* Empty cells */}
                {Array.from({ length: firstDay }).map((_, idx) => (
                  <div key={`empty-${idx}`} className="aspect-square bg-gray-50/40 rounded-lg"></div>
                ))}

                {/* Day buttons */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const dateDetails = getAvailabilityForDay(viewYear, viewMonth, day);
                  const isSelected = chosenDateObj?.day === day && 
                                    chosenDateObj?.month === viewMonth && 
                                    chosenDateObj?.year === viewYear;
                  
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
                  let slotButtonStyles = 'border-gray-200 bg-white text-gray-750 hover:border-red-800/40 hover:bg-red-50/10 cursor-pointer';
                  if (!slot.available) {
                    slotButtonStyles = 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed line-through';
                  } else if (isSelected) {
                    slotButtonStyles = 'border-red-850 bg-red-850 text-white shadow-sm';
                  }

                  return (
                    <button
                      key={slot.time}
                      type="button"
                      disabled={!slot.available}
                      onClick={() => setChosenTimeSlot(slot)}
                      className={`border rounded-xl py-3 px-4 text-xs font-bold text-center transition-all ${slotButtonStyles}`}
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
          type="button"
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
};
