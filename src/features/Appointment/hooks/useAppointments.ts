import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { appointmentService } from '../services/appointmentService';

export const useAppointments = () => {
  const location = useLocation();
  // Navigation: 'overview' | 'bookings' | 'schedule' | 'facility'
  const [activeTab, setActiveTab] = useState(location.state?.tab || 'overview');
  
  // Data State
  const [bookingsList, setBookingsList] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [officials, setOfficials] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  // Scheduling Wizard State
  const [scheduleStep, setScheduleStep] = useState(1);
  const [selectedDept, setSelectedDept] = useState(null);
  const [selectedOfficial, setSelectedOfficial] = useState(null);
  const [selectedDate, setSelectedDate] = useState(5); // Oct 5th as default per image
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [purpose, setPurpose] = useState('');
  const [attachedFile, setAttachedFile] = useState(null);

  // Facility Filter State
  const [facilitySearch, setFacilitySearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // Empty default to show all facilities
  const [capacityRange, setCapacityRange] = useState(1000);
  const [availabilityDate, setAvailabilityDate] = useState('');

  // Modals
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedBookingDetails, setSelectedBookingDetails] = useState(null);

  // Load Initial Data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [bookingsData, deptsData, officialsData, facilitiesData, slotsData] = await Promise.all([
          appointmentService.getBookings(),
          appointmentService.getDepartments(),
          appointmentService.getOfficials(),
          appointmentService.getFacilities(),
          appointmentService.getTimeSlots()
        ]);
        setBookingsList(bookingsData);
        setDepartments(deptsData);
        setOfficials(officialsData);
        setFacilities(facilitiesData);
        setTimeSlots(slotsData);
      } catch (err) {
        console.error('Failed to load data', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Update active tab if navigation state or URL updates
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tabParam = searchParams.get('tab');
    if (tabParam && ['overview', 'bookings', 'schedule', 'facility'].includes(tabParam)) {
      setActiveTab(tabParam as any);
    } else if (location.pathname === '/facility-booking' || location.pathname === '/reservations') {
      setActiveTab('facility');
    } else if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location.state, location.search, location.pathname]);

  // Filter officials by selected department
  const filteredOfficials = selectedDept 
    ? officials.filter(o => o.departmentId === selectedDept.id)
    : officials;

  // Compute available time slots based on selected official and date
  const computedTimeSlots = timeSlots.map(slot => {
    const isBooked = bookingsList.some(booking => 
      booking.type === 'appointment' &&
      booking.officialName === selectedOfficial?.name &&
      booking.date === `Oct ${selectedDate}, 2026` &&
      booking.time === slot.time &&
      booking.status !== 'CANCELLED'
    );
    return {
      ...slot,
      available: !isBooked
    };
  });

  // Reset selected time slot if official or date changes to avoid invalid selections
  useEffect(() => {
    setSelectedTimeSlot(null);
  }, [selectedOfficial, selectedDate]);

  // Filter facilities
  const filteredFacilities = facilities.filter(fac => {
    const matchesSearch = fac.title.toLowerCase().includes(facilitySearch.toLowerCase()) || 
                          fac.subtitle.toLowerCase().includes(facilitySearch.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(fac.category);
    return matchesSearch && matchesCategory;
  });

  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const handleClearFilters = () => {
    setFacilitySearch('');
    setSelectedCategories([]);
    setCapacityRange(1000);
    setAvailabilityDate('');
  };

  // Actions
  const startNewBooking = () => {
    setScheduleStep(1);
    setSelectedDept(null);
    setSelectedOfficial(null);
    setSelectedTimeSlot(null);
    setPurpose('');
    setAttachedFile(null);
    setActiveTab('schedule');
  };

  const handleRequestAppointmentSubmit = () => {
    if (!selectedDept || !selectedOfficial || !selectedTimeSlot || !purpose) {
      alert('Please fill out all steps of the appointment form.');
      return;
    }
    setIsConfirmModalOpen(true);
  };

  const confirmNewBooking = async () => {
    setIsConfirmModalOpen(false);
    setLoading(true);
    try {
      const newBookingObj = {
        type: 'appointment' as const,
        officialName: selectedOfficial.name,
        role: selectedOfficial.role,
        counter: selectedOfficial.counter || 'Counter 01 - Citizen Reception & Helpdesk',
        office: selectedOfficial.role === 'Administrative Secretary' ? 'Admin Sec Room 102' : 'Planning Dept Room 104',
        date: `Oct ${selectedDate}, 2026`,
        time: selectedTimeSlot.time,
        avatar: selectedOfficial.avatar,
        documents: attachedFile ? [{ name: attachedFile.name, size: typeof attachedFile.size === 'number' ? `${(attachedFile.size / 1024).toFixed(0)} KB` : attachedFile.size }] : []
      };
      const created = await appointmentService.createBooking(newBookingObj);
      setBookingsList(prev => [created, ...prev]);
      setAttachedFile(null);
      setActiveTab('bookings');
    } catch (err) {
      console.error('Failed to create booking', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (id) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      setLoading(true);
      try {
        await appointmentService.cancelBooking(id);
        const updated = await appointmentService.getBookings();
        setBookingsList(updated);
      } catch (err) {
        console.error('Failed to cancel booking', err);
      } finally {
        setLoading(false);
      }
    }
  };

  const openBookingDetails = (booking) => {
    setSelectedBookingDetails(booking);
    setIsDetailsModalOpen(true);
  };

  return {
    activeTab,
    setActiveTab,
    bookingsList,
    departments,
    officials: filteredOfficials,
    facilities,
    timeSlots: computedTimeSlots,
    loading,

    // Wizard
    scheduleStep,
    setScheduleStep,
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
  };
};
