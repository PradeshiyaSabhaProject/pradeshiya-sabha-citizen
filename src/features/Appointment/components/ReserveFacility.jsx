import React from 'react';

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
            {['Event Halls', 'Sports Grounds', 'Community Centers', 'Public Parks'].map((cat) => {
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

        {/* Capacity Slider */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-xs font-bold text-gray-700">Capacity Range</h4>
          </div>
          <input
            type="range"
            min="10"
            max="1000"
            value={capacity}
            onChange={(e) => setCapacity(Number(e.target.value))}
            className="w-full accent-red-850 cursor-pointer h-1 bg-gray-200 rounded-lg appearance-none"
          />
          <div className="flex justify-between text-[10px] text-gray-400 font-bold mt-2">
            <span>10</span>
            <span className="text-red-800">Upto {capacity}+</span>
            <span>1000+</span>
          </div>
        </div>

        {/* Availability Date Selector */}
        <div>
          <h4 className="text-xs font-bold text-gray-700 mb-2">Availability</h4>
          <div className="relative">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-red-800 focus:border-red-800 cursor-pointer"
            />
          </div>
        </div>

        {/* Clear All button */}
        <button
          type="button"
          onClick={onClearFilters}
          className="w-full bg-red-850 hover:bg-red-900 text-white py-2.5 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-xs"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H18.5" />
          </svg>
          <span>Clear All</span>
        </button>
      </div>

      {/* Right Facilities Panel */}
      <div className="lg:col-span-9 space-y-6">
        
        {/* Title and Sort Bar */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Reserve Community Facilities</h2>
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
                <span className="absolute top-3 right-3 bg-white text-gray-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase shadow-sm">
                  {fac.category === 'Event Halls' ? 'Event Hall' : 'Sports'}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-gray-800 mb-2">{fac.title}</h3>
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
                    onClick={() => onReserve(fac)}
                    className="bg-red-850 hover:bg-red-900 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors shadow-sm"
                  >
                    Reserve Now
                  </button>
                </div>
              </div>

            </div>
          ))}

          {/* Suggest a Facility Card */}
          <div className="border border-dashed border-gray-300 rounded-xl p-6 bg-white hover:bg-gray-50/50 transition-colors flex flex-col items-center justify-center text-center cursor-pointer min-h-[360px]">
            <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 mb-4 border border-dashed border-gray-250">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-sm font-bold text-gray-800 mb-2">Suggest a Facility</h3>
            <p className="text-xs text-gray-500 leading-relaxed max-w-[200px]">
              Can't find what you're looking for? Let us know about a community asset.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ReserveFacility;
