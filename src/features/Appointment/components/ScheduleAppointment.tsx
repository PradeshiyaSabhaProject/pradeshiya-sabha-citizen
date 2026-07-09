import React from 'react';

const ScheduleAppointment = ({
  departments,
  officials,
  timeSlots,
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
  onSubmit
}) => {

  const calendarDays = [
    { day: 27, currentMonth: false },
    { day: 28, currentMonth: false },
    { day: 29, currentMonth: false },
    { day: 30, currentMonth: false },
    { day: 1, currentMonth: true },
    { day: 2, currentMonth: true },
    { day: 3, currentMonth: true },
    { day: 4, currentMonth: true },
    { day: 5, currentMonth: true, selected: true },
    { day: 6, currentMonth: true },
    { day: 7, currentMonth: true },
    { day: 8, currentMonth: true },
    { day: 9, currentMonth: true },
    { day: 10, currentMonth: true },
    { day: 11, currentMonth: true, hasDots: true },
    { day: 12, currentMonth: true },
    { day: 13, currentMonth: true },
    { day: 14, currentMonth: true },
    { day: 15, currentMonth: true },
    { day: 16, currentMonth: true },
    { day: 17, currentMonth: true },
    { day: 18, currentMonth: true },
    { day: 19, currentMonth: true },
    { day: 20, currentMonth: true },
    { day: 21, currentMonth: true },
    { day: 22, currentMonth: true },
    { day: 23, currentMonth: true },
    { day: 24, currentMonth: true },
    { day: 25, currentMonth: true },
    { day: 26, currentMonth: true },
    { day: 27, currentMonth: true },
    { day: 28, currentMonth: true },
    { day: 29, currentMonth: true },
    { day: 30, currentMonth: true },
    { day: 31, currentMonth: true },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 border-b border-gray-150 pb-3">
        Schedule an Appointment
      </h2>

      {/* Step 1: Select Department */}
      <div className="bg-white border border-gray-150 rounded-xl p-6 shadow-xs">
        <h3 className="text-sm font-bold text-red-800 uppercase tracking-wide mb-1">
          Step 1: Select Department
        </h3>
        <p className="text-xs text-gray-500 mb-6">
          Please choose the administrative department for your appointment
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {departments.map(dept => {
            const isSelected = selectedDept?.id === dept.id;
            return (
              <div
                key={dept.id}
                onClick={() => {
                  setSelectedDept(dept);
                  // Auto-select first official in that department if available
                  const associatedOfficials = officials.filter(o => o.departmentId === dept.id);
                  if (associatedOfficials.length > 0) {
                    setSelectedOfficial(associatedOfficials[0]);
                  } else {
                    setSelectedOfficial(null);
                  }
                }}
                className={`border rounded-lg p-5 cursor-pointer flex justify-between items-start transition-all ${
                  isSelected
                    ? 'border-red-800 bg-red-50/10 text-red-800 ring-1 ring-red-800'
                    : 'border-gray-200 hover:border-gray-300 bg-white text-gray-700'
                }`}
              >
                <div>
                  <h4 className="text-sm font-bold capitalize">{dept.name}</h4>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{dept.description}</p>
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                  isSelected ? 'border-red-800 bg-red-800 text-white' : 'border-gray-300 bg-white'
                }`}>
                  {isSelected && (
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Steps 2, 3, and 4 layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (Step 2 & 3) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Step 2: Select Official */}
          <div className="bg-white border border-gray-150 rounded-xl p-6 shadow-xs">
            <h3 className="text-sm font-bold text-red-800 uppercase tracking-wide mb-4">
              Step 2: Select Official
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {officials.length === 0 ? (
                <div className="col-span-2 py-4 text-center text-xs text-gray-400">
                  Please select a department first to load officials.
                </div>
              ) : (
                officials.map(official => {
                  const isSelected = selectedOfficial?.id === official.id;
                  return (
                    <div
                      key={official.id}
                      onClick={() => setSelectedOfficial(official)}
                      className={`border rounded-lg p-4 cursor-pointer flex items-center justify-between transition-all ${
                        isSelected
                          ? 'border-red-800 bg-red-50/10 text-red-800 ring-1 ring-red-800'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={official.avatar}
                          alt={official.name}
                          className="w-12 h-12 rounded-full object-cover shrink-0 border border-gray-100"
                        />
                        <div>
                          <h4 className="text-sm font-bold text-gray-800">{official.name}</h4>
                          <p className="text-xs text-gray-500 mt-0.5">{official.role}</p>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-red-800 bg-red-800 text-white' : 'border-gray-300 bg-white'
                      }`}>
                        {isSelected && (
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Step 3: Select Date & Time */}
          <div className="bg-white border border-gray-150 rounded-xl p-6 shadow-xs">
            <h3 className="text-sm font-bold text-red-800 uppercase tracking-wide mb-6">
              Step 3: Select Date & Time
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Calendar Grid */}
              <div className="md:col-span-7 border border-gray-250 rounded-lg p-4 bg-white">
                <div className="flex justify-between items-center mb-4 px-1">
                  <span className="text-sm font-bold text-gray-800">October 2026</span>
                  <div className="flex gap-2">
                    <button className="text-gray-400 hover:text-gray-600 p-1 font-extrabold text-sm">&lt;</button>
                    <button className="text-gray-400 hover:text-gray-600 p-1 font-extrabold text-sm">&gt;</button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-y-2 text-center text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-2">
                  <span>Su</span>
                  <span>Mo</span>
                  <span>Tu</span>
                  <span>We</span>
                  <span>Th</span>
                  <span>Fr</span>
                  <span>Sa</span>
                </div>

                <div className="grid grid-cols-7 gap-y-2 text-center text-xs">
                  {calendarDays.map((d, index) => {
                    const isDaySelected = selectedDate === d.day && d.currentMonth;
                    return (
                      <div key={index} className="flex flex-col items-center justify-center h-8 relative">
                        <button
                          type="button"
                          onClick={() => {
                            if (d.currentMonth) setSelectedDate(d.day);
                          }}
                          className={`w-7 h-7 rounded-full flex items-center justify-center font-bold transition-colors ${
                            !d.currentMonth ? 'text-gray-300 cursor-default' :
                            isDaySelected ? 'bg-red-850 text-white shadow-sm' :
                            'text-gray-800 hover:bg-gray-100'
                          }`}
                        >
                          {d.day}
                        </button>
                        {d.hasDots && (
                          <div className="flex gap-0.5 absolute bottom-0">
                            <span className="w-1 h-1 rounded-full bg-green-500"></span>
                            <span className="w-1 h-1 rounded-full bg-green-500"></span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots */}
              <div className="md:col-span-5 flex flex-col justify-start">
                <h4 className="text-xs font-bold text-gray-700 mb-4">
                  Available Slots for Oct {selectedDate}th
                </h4>
                
                <div className="relative">
                  <select
                    value={selectedTimeSlot?.id || ''}
                    onChange={(e) => {
                      const selected = timeSlots.find(s => s.id === e.target.value);
                      setSelectedTimeSlot(selected || null);
                    }}
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3.5 pr-10 text-xs font-bold text-gray-700 focus:outline-none focus:ring-1 focus:ring-red-800 focus:border-red-800 cursor-pointer shadow-2xs appearance-none"
                  >
                    <option value="" disabled>Select a Time Slot</option>
                    {timeSlots.map(slot => (
                      <option 
                        key={slot.id} 
                        value={slot.id}
                        disabled={!slot.available}
                      >
                        {slot.time} {!slot.available ? '(Booked)' : ''}
                      </option>
                    ))}
                  </select>
                  {/* Chevron Icon */}
                  <div className="absolute inset-y-0 right-3.5 flex items-center pointer-events-none text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Right Column (Step 4) */}
        <div className="lg:col-span-5">
          <div className="bg-white border border-gray-150 rounded-xl p-6 shadow-xs h-full flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-red-800 uppercase tracking-wide mb-4">
                Step 4: Purpose of Meeting
              </h3>
              <textarea
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder="Briefly describe the reason for your appointment..."
                rows={10}
                className="w-full border border-gray-300 rounded-lg p-4 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-red-800 focus:border-red-800 resize-none"
              />
            </div>
            <button
              onClick={onSubmit}
              className="w-full bg-red-850 hover:bg-red-900 text-white py-4 rounded-lg font-bold text-sm tracking-wider transition-colors shadow-md mt-6"
            >
              REQUEST APPOINTMENT
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ScheduleAppointment;
