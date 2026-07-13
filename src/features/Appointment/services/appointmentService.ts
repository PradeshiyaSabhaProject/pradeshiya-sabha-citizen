// Dummy data and services for the Appointment portal
let bookings = [
  {
    id: 1,
    type: 'appointment',
    officialName: 'Ms. Jayawardene',
    role: 'Administrative Secretary',
    office: 'Admin Sec Room 102',
    date: 'Oct 28, 2026',
    time: '09:30 AM - 10:30 AM',
    status: 'CONFIRMED',
    statusMessage: '',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 2,
    type: 'facility',
    facilityName: 'Main Community Hall',
    location: 'South Wing, Level 1',
    date: 'Oct 30 - 31, 2026',
    time: 'Full Day Event',
    status: 'RESERVED',
    statusMessage: 'Amenities Included: AC, AV System, 500 Chairs',
    price: 'Rs. 30,000 Paid',
    avatar: '🏢'
  },
  {
    id: 3,
    type: 'appointment',
    officialName: 'Eng. R. Fernando',
    role: 'Planning Dept, Site Audit',
    office: 'Planning Dept, Site Audit',
    date: 'Oct 25, 2026',
    time: '10:30 AM - 11:30 AM',
    status: 'PENDING',
    statusMessage: 'Awaiting official approval',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 4,
    type: 'facility',
    facilityName: 'Vehicle: Tractor Rental',
    location: 'Agricultural Services',
    date: 'Oct 12, 2026',
    time: '',
    status: 'CANCELLED',
    statusMessage: 'Request was cancelled by the user on Oct 12th.',
    avatar: '🚜'
  }
];

const departments = [
  { id: 'planning', name: 'Planning', description: 'Building plans and land use' },
  { id: 'health', name: 'Health', description: 'Clinics, sanitation, and waste' },
  { id: 'general', name: 'General', description: 'Administrative and public relations' }
];

const officials = [
  {
    id: 'fernando',
    name: 'Eng. R. Fernando',
    role: 'Planning Department',
    departmentId: 'planning',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 'jayawardene',
    name: 'Ms. Jayawardene',
    role: 'Administrative Secretary',
    departmentId: 'general',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face'
  }
];

const facilities = [
  {
    id: 'fb-1',
    title: 'Central Town Hall',
    category: 'Event Halls',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=500&h=300&fit=crop',
    capacity: 500,
    price: 'LKR 15,000 /hr',
    basePrice: 'LKR 75,000',
    subtitle: 'A prestigious venue located in the heart of the city, perfect for wedding receptions, large conferences, and corporate exhibitions.',
    details: '500 Persons • LKR 15,000 /hr',
    amenities: ['AC', 'AV System', '500 Chairs', 'Stage']
  },
  {
    id: 'fb-2',
    title: 'Mahanama Sports Ground',
    category: 'Sports Grounds',
    image: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=600&q=80',
    capacity: 1000,
    price: 'LKR 2,500 /hr',
    basePrice: 'LKR 12,000',
    subtitle: 'Professional turf field suitable for cricket, football, and community outdoor events. Features spectator stands and lighting.',
    details: 'Outdoor • LKR 2,500 /hr',
    amenities: ['Lighting', 'Seating', 'Changing Rooms']
  },
  {
    id: 'fb-3',
    title: 'Homagama Crematorium',
    category: 'Crematoriums',
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=600&q=80',
    capacity: 50,
    price: 'LKR 5,000 / slot',
    basePrice: 'LKR 5,000',
    subtitle: 'Main cremation facility with modern environment-friendly electric furnaces, ceremonial pavilion, and comfortable waiting rooms.',
    details: 'Electric Furnace • LKR 5,000 / slot',
    amenities: ['Electric Furnace', 'Ceremonial Pavilion', 'Sound System', 'Waiting Lounge']
  },
  {
    id: 'fb-4',
    title: 'Water Bowser Rental',
    category: 'Vehicles & Machinery',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&h=300&fit=crop',
    capacity: 200,
    price: 'LKR 4,000 / trip',
    basePrice: 'LKR 4,000',
    subtitle: 'Clean drinking water bowser for public/private events, weddings, and emergency water supply needs.',
    details: '5000 Liters Capacity • LKR 4,000 / trip',
    amenities: ['Drinking Water', 'Hose Extension', 'Pump Operator']
  },
  {
    id: 'fb-5',
    title: 'Kottawa Public Park',
    category: 'Public Parks',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80',
    capacity: 300,
    price: 'LKR 1,500 /hr',
    basePrice: 'LKR 5,000',
    subtitle: 'Beautifully landscaped public park available for community gatherings, exhibitions, photography, and open-air meetings.',
    details: 'Outdoor Park • LKR 1,500 /hr',
    amenities: ['Restrooms', 'Jogging Track', 'Benches', 'Open Stage']
  },
  {
    id: 'fb-6',
    title: 'Community Center Auditorium',
    category: 'Community Centers',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&h=300&fit=crop',
    capacity: 150,
    price: 'LKR 3,000 /hr',
    basePrice: 'LKR 15,000',
    subtitle: 'Multi-purpose air-conditioned auditorium perfect for localized workshops, seminars, and small-scale community events.',
    details: '150 Persons • LKR 3,000 /hr',
    amenities: ['AC', 'Whiteboard', 'Sound System', 'Chairs']
  }
];

const timeSlots = [
  { id: '1', time: '08:30 AM - 09:30 AM', available: true },
  { id: '2', time: '09:30 AM - 10:30 AM', available: true },
  { id: '3', time: '10:30 AM - 11:30 AM', available: true },
  { id: '4', time: '11:30 AM - 12:30 PM', available: true },
  { id: '5', time: '01:30 PM - 02:30 PM', available: true },
  { id: '6', time: '02:30 PM - 03:30 PM', available: true }
];

export const appointmentService = {
  getBookings: () => {
    return Promise.resolve([...bookings]);
  },
  getDepartments: () => {
    return Promise.resolve([...departments]);
  },
  getOfficials: (deptId?: any) => {
    if (deptId) {
      return Promise.resolve(officials.filter(o => o.departmentId === deptId));
    }
    return Promise.resolve([...officials]);
  },
  getFacilities: () => {
    return Promise.resolve([...facilities]);
  },
  getTimeSlots: () => {
    return Promise.resolve([...timeSlots]);
  },
  createBooking: (newBooking) => {
    const booking = {
      id: Date.now(),
      status: 'PENDING',
      ...newBooking
    };
    bookings = [booking, ...bookings];
    return Promise.resolve(booking);
  },
  cancelBooking: (id) => {
    bookings = bookings.map(b => 
      b.id === id 
        ? { ...b, status: 'CANCELLED', statusMessage: `Request was cancelled by the user on ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}.` } 
        : b
    );
    return Promise.resolve(true);
  }
};
