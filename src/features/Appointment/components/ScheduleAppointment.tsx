import React from 'react';

const calendarDays = [
  { id: 'prev-27', day: 27, currentMonth: false },
  { id: 'prev-28', day: 28, currentMonth: false },
  { id: 'prev-29', day: 29, currentMonth: false },
  { id: 'prev-30', day: 30, currentMonth: false },
  { id: 'curr-1', day: 1, currentMonth: true },
  { id: 'curr-2', day: 2, currentMonth: true },
  { id: 'curr-3', day: 3, currentMonth: true },
  { id: 'curr-4', day: 4, currentMonth: true },
  { id: 'curr-5', day: 5, currentMonth: true, selected: true },
  { id: 'curr-6', day: 6, currentMonth: true },
  { id: 'curr-7', day: 7, currentMonth: true },
  { id: 'curr-8', day: 8, currentMonth: true },
  { id: 'curr-9', day: 9, currentMonth: true },
  { id: 'curr-10', day: 10, currentMonth: true },
  { id: 'curr-11', day: 11, currentMonth: true, hasDots: true },
  { id: 'curr-12', day: 12, currentMonth: true },
  { id: 'curr-13', day: 13, currentMonth: true },
  { id: 'curr-14', day: 14, currentMonth: true },
  { id: 'curr-15', day: 15, currentMonth: true },
  { id: 'curr-16', day: 16, currentMonth: true },
  { id: 'curr-17', day: 17, currentMonth: true },
  { id: 'curr-18', day: 18, currentMonth: true },
  { id: 'curr-19', day: 19, currentMonth: true },
  { id: 'curr-20', day: 20, currentMonth: true },
  { id: 'curr-21', day: 21, currentMonth: true },
  { id: 'curr-22', day: 22, currentMonth: true },
  { id: 'curr-23', day: 23, currentMonth: true },
  { id: 'curr-24', day: 24, currentMonth: true },
  { id: 'curr-25', day: 25, currentMonth: true },
  { id: 'curr-26', day: 26, currentMonth: true },
  { id: 'curr-27', day: 27, currentMonth: true },
  { id: 'curr-28', day: 28, currentMonth: true },
  { id: 'curr-29', day: 29, currentMonth: true },
  { id: 'curr-30', day: 30, currentMonth: true },
  { id: 'curr-31', day: 31, currentMonth: true },
];

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
  attachedFile,
  setAttachedFile,
  onSubmit
}) => {

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

            const handleSelectDept = () => {
              setSelectedDept(dept);
              const associatedOfficials = officials.filter(o => o.departmentId === dept.id);
              if (associatedOfficials.length > 0) {
                setSelectedOfficial(associatedOfficials[0]);
              } else {
                setSelectedOfficial(null);
              }
            };

            return (
              <button
                key={dept.id}
                type="button"
                onClick={handleSelectDept}
                className={`w-full border rounded-lg p-5 cursor-pointer flex justify-between items-start transition-all text-left ${
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
              </button>
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
                    <button
                      key={official.id}
                      type="button"
                      onClick={() => setSelectedOfficial(official)}
                      className={`w-full border rounded-lg p-4 cursor-pointer flex items-center justify-between transition-all text-left ${
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
                    </button>
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
                    <button type="button" className="text-gray-400 hover:text-gray-600 p-1 font-extrabold text-sm">&lt;</button>
                    <button type="button" className="text-gray-400 hover:text-gray-600 p-1 font-extrabold text-sm">&gt;</button>
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
                  {calendarDays.map((d) => {
                    const isDaySelected = selectedDate === d.day && d.currentMonth;
                    
                    let buttonClass = 'text-gray-800 hover:bg-gray-100';
                    if (!d.currentMonth) {
                      buttonClass = 'text-gray-300 cursor-default';
                    } else if (isDaySelected) {
                      buttonClass = 'bg-red-850 text-white shadow-sm';
                    }

                    return (
                      <div key={d.id} className="flex flex-col items-center justify-center h-8 relative">
                        <button
                          type="button"
                          onClick={() => {
                            if (d.currentMonth) setSelectedDate(d.day);
                          }}
                          className={`w-7 h-7 rounded-full flex items-center justify-center font-bold transition-colors ${buttonClass}`}
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
                
                <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                  {timeSlots.map(slot => {
                    const isSelected = selectedTimeSlot?.id === slot.id;
                    if (slot.available) {
                      return (
                        <button
                          key={slot.id}
                          type="button"
                          onClick={() => setSelectedTimeSlot(slot)}
                          className={`w-full border rounded-lg px-4 py-3 text-xs font-bold transition-all cursor-pointer flex justify-between items-center text-left ${
                            isSelected
                              ? 'border-red-800 bg-red-50/10 text-red-800 ring-1 ring-red-800'
                              : 'border-gray-250 bg-white text-gray-700 hover:border-gray-300'
                          }`}
                        >
                          <span>{slot.time}</span>
                          {isSelected && (
                            <svg className="w-4 h-4 text-red-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                      );
                    } else {
                      return (
                        <div
                          key={slot.id}
                          className="w-full border border-gray-250 bg-gray-200 text-gray-400 rounded-lg px-4 py-3 text-xs font-bold cursor-not-allowed flex justify-between items-center opacity-85"
                        >
                          <span className="line-through">{slot.time}</span>
                          <span className="text-[11px] font-bold text-gray-500">Booked</span>
                        </div>
                      );
                    }
                  })}
                </div>

                {/* Legend */}
                <div className="flex gap-4 items-center justify-start mt-4 px-1">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-3.5 border border-gray-300 bg-white rounded-sm"></span>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-3.5 border border-gray-300 bg-gray-200 rounded-sm"></span>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Booked</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Right Column (Step 4) */}
        <div className="lg:col-span-5">
          <div className="bg-white border border-gray-150 rounded-xl p-6 shadow-xs h-full flex flex-col justify-between">
            <div className="flex-1 flex flex-col">
              <h3 className="text-sm font-bold text-red-800 uppercase tracking-wide mb-4">
                Step 4: Purpose of Meeting
              </h3>
              <textarea
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder="Briefly describe the reason for your appointment..."
                rows={6}
                className="w-full border border-gray-300 rounded-lg p-4 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-red-800 focus:border-red-800 resize-none mb-4"
              />

              {/* Upload field */}
              <div className="mt-2">
                <span className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Attach Documents / Image (Optional)
                </span>
                <label 
                  htmlFor="appointment-file"
                  className="flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-lg p-4 bg-gray-50/50 hover:bg-gray-50 transition-all cursor-pointer hover:border-red-800 focus-within:border-red-800 focus-within:ring-1 focus-within:ring-red-800 text-center block"
                >
                  <span className="text-xl mb-1">📤</span>
                  <div className="text-xs text-gray-600 text-center">
                    <span className="font-semibold text-[#8C1538] hover:underline">Click to upload</span> or drag and drop
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1">PDF, DOC, DOCX, PNG, JPG up to 10MB</p>
                  
                  {attachedFile && (
                    <div className="mt-3 text-xs text-green-700 font-bold flex items-center gap-1.5 bg-green-50 px-2.5 py-1.5 rounded border border-green-200 w-full justify-between">
                      <span className="truncate max-w-50">✓ {attachedFile.name}</span>
                      <button 
                        type="button" 
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          setAttachedFile(null);
                        }}
                        className="text-gray-400 hover:text-red-750 font-bold ml-2 text-sm leading-none cursor-pointer focus:outline-none"
                      >
                        &times;
                      </button>
                    </div>
                  )}
                </label>
                <input 
                  id="appointment-file" 
                  type="file" 
                  accept=".pdf,.doc,.docx,image/*" 
                  className="sr-only" 
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setAttachedFile(e.target.files[0]);
                    }
                  }}
                />
              </div>
            </div>
            <button
              type="button"
              onClick={onSubmit}
              className="w-full bg-red-850 hover:bg-red-900 text-white py-4 rounded-lg font-bold text-sm tracking-wider transition-colors shadow-md mt-6 shrink-0"
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
