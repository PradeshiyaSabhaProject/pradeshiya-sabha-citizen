// Data types and services synchronized with the Municipal Staff Portal (PradeshiyaSabha)

export type AppointmentStatus =
  | 'PENDING'
  | 'APPROVED'
  | 'CONFIRMED'
  | 'RESCHEDULED'
  | 'REJECTED'
  | 'COMPLETED'
  | 'NO-SHOW'
  | 'CANCELLED'
  | 'RESERVED';

export type PaymentStatus = 'PAID' | 'PENDING' | 'REFUNDED' | 'EXEMPT';

export interface AttachmentItem {
  name: string;
  size: string;
  url?: string;
}

export interface BookingRemark {
  id: string;
  text: string;
  date: string;
  time: string;
  author: string;
  action?: 'APPROVED' | 'REJECTED' | 'NOTE';
}

export interface BookingItem {
  id: number | string;
  refId?: string; // Standard format: #PS-2026-XXXX or #PS-FB-2026-XXXX
  type: 'appointment' | 'facility';
  officialName?: string;
  role?: string;
  office?: string;
  counter?: string; // Assigned physical counter e.g. "Counter 04 - Planning & Building Approvals"
  division?: string; // Grama Niladhari division
  citizenName?: string;
  citizenNic?: string;
  nicNumber?: string;
  citizenPhone?: string;
  phone?: string;
  citizenEmail?: string;
  email?: string;
  citizenAddress?: string;
  service?: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  statusMessage?: string;
  rescheduledReason?: string;
  rejectionReason?: string;
  resolutionNotes?: string;
  priority?: 'NORMAL' | 'URGENT' | 'VIP';
  avatar?: string;
  documents?: AttachmentItem[];
  remarks?: BookingRemark[];

  // Facility specific fields
  facilityName?: string;
  location?: string;
  eventTitle?: string;
  eventType?: string;
  expectedAttendees?: number;
  rentalFee?: number;
  securityDeposit?: number;
  totalTariff?: number;
  paymentStatus?: PaymentStatus;
  specialRequirements?: string;
  price?: string;
  formDetails?: any;
  attachment?: any;
}

export interface MunicipalFacility {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  pricing: string;
  basePrice: string;
  rentalFee?: number;
  securityDeposit?: number;
  capacity: number;
  image: string;
  amenities: string[];
}

export const GN_DIVISIONS = [
  'Homagama Town',
  'Homagama North',
  'Homagama South',
  'Meegoda',
  'Pitipana North',
  'Pitipana South',
  'Katuwana',
  'Godagama North',
  'Godagama South',
  'Magammana',
  'Diyagama',
  'Mattegoda',
];

export const MUNICIPAL_COUNTERS = [
  'Counter 01 - Citizen Reception & Helpdesk',
  'Counter 02 - Revenue & Assessment Taxes',
  'Counter 03 - Business & Trade Licenses',
  'Counter 04 - Planning & Building Approvals',
  'Counter 05 - Public Health & Sanitation',
  'Counter 06 - Land & Deeds Validation',
  'Executive Suite - Secretary & Chairman Office',
];

export const MUNICIPAL_SERVICES = [
  'Building Plan Approvals & Site Inspections',
  'Certificate of Conformity (COC)',
  'Assessment Tax & Ownership Registration',
  'Trade, Liquor & Business Licenses',
  'Public Health, Sanitation & Dengue Prevention',
  'Environment & Solid Waste Inquiries',
  'Street Lighting & Road Maintenance Petitions',
  'General Council Inquiries & Secretary Petitions',
];

// Rich mock data demonstrating full synchronization with staff side
let bookings: BookingItem[] = [
  {
    id: 1,
    refId: '#PS-2026-0842',
    type: 'appointment',
    officialName: 'Eng. Priyantha Bandara',
    role: 'Chief Planning Engineer',
    office: 'Planning Dept, 1st Floor',
    counter: 'Counter 04 - Planning & Building Approvals',
    division: 'Homagama North',
    citizenName: 'Sunil Jayaratne',
    citizenNic: '198421456789',
    nicNumber: '198421456789',
    citizenPhone: '0771234567',
    phone: '0771234567',
    service: 'Building Plan Approvals & Site Inspections',
    date: 'Oct 05, 2026',
    time: '09:30 AM - 10:30 AM',
    status: 'APPROVED',
    statusMessage: 'Scheduled with Planning Engineer. Please bring original deed and survey plan copies.',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face',
    documents: [
      { name: 'Survey_Plan_Homagama_Lot42.pdf', size: '2.4 MB' },
      { name: 'Architectural_Drawings.pdf', size: '4.8 MB' },
      { name: 'NIC_Front_Back.jpg', size: '320 KB' },
    ],
    remarks: [
      {
        id: 'rem-1',
        author: 'Eng. Priyantha Bandara',
        text: 'Initial digital application verified. Preliminary building boundary check passed.',
        date: '2026-10-01',
        time: '11:15 AM',
        action: 'APPROVED',
      },
    ],
  },
  {
    id: 2,
    refId: '#PS-FB-2026-0014',
    type: 'facility',
    facilityName: 'Central Town Hall & Banquet Complex',
    location: 'South Wing, Level 1, Homagama',
    eventTitle: 'Annual District Youth Cultural Festival',
    eventType: 'Community & Cultural Event',
    expectedAttendees: 450,
    rentalFee: 35000,
    securityDeposit: 15000,
    totalTariff: 50000,
    paymentStatus: 'PAID',
    specialRequirements: 'Public address system, podium, 400 banquet chairs, generator standby',
    citizenName: 'Nadeeka Perera',
    citizenNic: '199071234567',
    nicNumber: '199071234567',
    citizenPhone: '0714567890',
    phone: '0714567890',
    date: 'Oct 28 - 29, 2026',
    time: '08:30 AM - 05:30 PM (Full Day)',
    status: 'APPROVED',
    statusMessage: 'Facility reservation approved by Council Secretary. Hall Key handover scheduled on Oct 27.',
    price: 'Rs. 50,000 Total (Rs. 15,000 Refundable Deposit Included)',
    avatar: '🏛️',
    documents: [
      { name: 'Event_Proposal_Program.pdf', size: '1.2 MB' },
      { name: 'Police_Sound_Permit_Copy.pdf', size: '840 KB' },
    ],
    remarks: [
      {
        id: 'rem-2',
        author: 'Council Secretary Office',
        text: 'Payment received and reconciled at municipal revenue counter. Facility reserved.',
        date: '2026-10-02',
        time: '02:30 PM',
        action: 'APPROVED',
      },
    ],
  },
  {
    id: 3,
    refId: '#PS-2026-0850',
    type: 'appointment',
    officialName: 'Mrs. Jayani Fernando',
    role: 'Chief Revenue Officer',
    office: 'Finance & Revenue Division',
    counter: 'Counter 02 - Revenue & Assessment Taxes',
    division: 'Pitipana North',
    citizenName: 'Dhammika Silva',
    citizenNic: '197512345678',
    nicNumber: '197512345678',
    citizenPhone: '0769876543',
    phone: '0769876543',
    service: 'Assessment Tax & Ownership Registration',
    date: 'Oct 07, 2026',
    time: '02:00 PM - 03:00 PM',
    status: 'RESCHEDULED',
    statusMessage: 'Meeting rescheduled by officer due to field valuation audit. Revised date allocated.',
    rescheduledReason: 'Officer assigned to urgent court valuation session on morning of Oct 05. Rescheduled to Oct 07 afternoon at Counter 02.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face',
    documents: [
      { name: 'Title_Deed_Copy.pdf', size: '3.1 MB' },
      { name: 'Previous_Tax_Receipt_2025.pdf', size: '450 KB' },
    ],
    remarks: [
      {
        id: 'rem-3',
        author: 'Mrs. Jayani Fernando',
        text: 'Slot shifted to Wednesday Oct 07. Citizen notified via portal token.',
        date: '2026-10-03',
        time: '09:00 AM',
        action: 'NOTE',
      },
    ],
  },
  {
    id: 4,
    refId: '#PS-2026-0855',
    type: 'appointment',
    officialName: 'Dr. Rohan Wickramasinghe',
    role: 'Supervisory Public Health Inspector',
    office: 'Public Health Division',
    counter: 'Counter 05 - Public Health & Sanitation',
    division: 'Meegoda',
    citizenName: 'Kasun Abeyratne',
    citizenNic: '198856789012',
    nicNumber: '198856789012',
    citizenPhone: '0723456789',
    phone: '0723456789',
    service: 'Trade, Liquor & Business Licenses',
    date: 'Oct 02, 2026',
    time: '11:00 AM - 11:30 AM',
    status: 'REJECTED',
    statusMessage: 'Application rejected: Incomplete food handler medical clearance certificates.',
    rejectionReason: 'Mandatory Food Handler Medical Examination reports and Water Quality Laboratory test reports were not attached. Please attach valid certificates and re-submit.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
    documents: [
      { name: 'Business_Registration_Certificate.pdf', size: '780 KB' },
    ],
    remarks: [
      {
        id: 'rem-4',
        author: 'Dr. Rohan Wickramasinghe',
        text: 'Health compliance criteria not fulfilled. Rejection logged in staff portal.',
        date: '2026-10-02',
        time: '04:10 PM',
        action: 'REJECTED',
      },
    ],
  },
  {
    id: 5,
    refId: '#PS-FB-2026-0018',
    type: 'facility',
    facilityName: 'Homagama Modern Crematorium',
    location: 'Homagama Municipal Cemetery Grounds',
    eventTitle: 'Funeral Demise & Cremation Service (Late W. Jayasuriya)',
    eventType: 'Cremation & Funeral Service',
    expectedAttendees: 150,
    rentalFee: 8500,
    securityDeposit: 0,
    totalTariff: 8500,
    paymentStatus: 'PAID',
    citizenName: 'Anura Jayasuriya',
    citizenNic: '197214567890',
    nicNumber: '197214567890',
    citizenPhone: '0772345678',
    phone: '0772345678',
    date: 'Oct 06, 2026',
    time: '03:00 PM - 05:00 PM',
    status: 'PENDING',
    statusMessage: 'Death certificate verification underway by Crematorium Superintendent.',
    price: 'Rs. 8,500 Paid (Official Receipt Issued)',
    avatar: '🔥',
    documents: [
      { name: 'Death_Certificate_Reg1204.pdf', size: '640 KB' },
      { name: 'Disposal_Permit_Signed.pdf', size: '510 KB' },
    ],
    remarks: [
      {
        id: 'rem-5',
        author: 'Public Health Department',
        text: 'Coroner report received. Waiting for final verification of Registrar seal.',
        date: '2026-10-04',
        time: '10:20 AM',
        action: 'NOTE',
      },
    ],
  },
  {
    id: 6,
    refId: '#PS-2026-0830',
    type: 'appointment',
    officialName: 'Mr. K. Samarasinghe',
    role: 'Senior Administrative Officer',
    office: 'Administration & Licensing Office',
    counter: 'Counter 03 - Business & Trade Licenses',
    division: 'Katuwana',
    citizenName: 'Chaminda Rathnayake',
    citizenNic: '198124567890',
    nicNumber: '198124567890',
    citizenPhone: '0718899001',
    phone: '0718899001',
    service: 'Certificate of Conformity (COC)',
    date: 'Sep 28, 2026',
    time: '10:00 AM - 10:30 AM',
    status: 'COMPLETED',
    statusMessage: 'Consultation concluded. COC inspection certificate issued.',
    resolutionNotes: 'Site inspection report verified against approved architectural plan. COC certificate recommendation endorsed to Council Secretary.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    documents: [
      { name: 'Approved_Plan_Drawings.pdf', size: '3.8 MB' },
      { name: 'Site_Engineer_Clearance.pdf', size: '920 KB' },
    ],
    remarks: [
      {
        id: 'rem-6',
        author: 'Mr. K. Samarasinghe',
        text: 'All prerequisites satisfied. Citizen collected approved file at Counter 03.',
        date: '2026-09-28',
        time: '10:45 AM',
        action: 'APPROVED',
      },
    ],
  },
  {
    id: 7,
    refId: '#PS-FB-2026-0022',
    type: 'facility',
    facilityName: 'Homagama Public Sports Ground',
    location: 'Hospital Road, Homagama',
    eventTitle: 'Western Province Inter-School Cricket Championship',
    eventType: 'Sports Tournament',
    expectedAttendees: 800,
    rentalFee: 15000,
    securityDeposit: 5000,
    totalTariff: 20000,
    paymentStatus: 'PAID',
    specialRequirements: 'Turf wicket preparation, floodlight operation from 5:30 PM to 8:30 PM, scoreboard operator',
    citizenName: 'Suresh De Silva',
    citizenNic: '198634567891',
    nicNumber: '198634567891',
    citizenPhone: '0773456123',
    phone: '0773456123',
    date: 'Nov 02 - 03, 2026',
    time: '08:00 AM - 06:00 PM (2 Days)',
    status: 'APPROVED',
    statusMessage: 'Sports pavilion reserved. Ground curator instructed for wicket rolling.',
    price: 'Rs. 20,000 Total (Rs. 5,000 Refundable Deposit Included)',
    avatar: '⚽',
    documents: [
      { name: 'Schools_Cricket_Assoc_Letter.pdf', size: '620 KB' },
      { name: 'Match_Schedule_Fixture.pdf', size: '340 KB' },
    ],
    remarks: [
      {
        id: 'rem-7',
        author: 'Sports & Recreation Officer',
        text: 'Fixture approved. Pavilion key handover on Nov 01 afternoon.',
        date: '2026-10-03',
        time: '03:15 PM',
        action: 'APPROVED',
      },
    ],
  },
  {
    id: 8,
    refId: '#PS-2026-0862',
    type: 'appointment',
    officialName: 'Eng. Priyantha Bandara',
    role: 'Chief Planning Engineer',
    office: 'Planning Dept, 1st Floor',
    counter: 'Counter 04 - Planning & Building Approvals',
    division: 'Godagama North',
    citizenName: 'Manoja Wickramaratne',
    citizenNic: '199267890123',
    nicNumber: '199267890123',
    citizenPhone: '0761234987',
    phone: '0761234987',
    service: 'Building Plan Approvals & Site Inspections',
    date: 'Oct 09, 2026',
    time: '11:30 AM - 12:00 PM',
    status: 'PENDING',
    statusMessage: 'Application received online. Waiting for officer queue allocation.',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face',
    documents: [
      { name: 'Land_Subdivision_Survey_Map.pdf', size: '1.9 MB' },
    ],
    remarks: [
      {
        id: 'rem-8',
        author: 'Citizen Gateway Portal',
        text: 'Consultation request logged into planning queue.',
        date: '2026-10-04',
        time: '04:50 PM',
        action: 'NOTE',
      },
    ],
  },
  {
    id: 9,
    refId: '#PS-FB-2026-0025',
    type: 'facility',
    facilityName: 'Water Bowser Rental (6000L)',
    location: 'Water Supply & Engineering Yard',
    eventTitle: 'Community Poson Poya Dansala Water Supply',
    eventType: 'Community Welfare Service',
    expectedAttendees: 600,
    rentalFee: 4500,
    securityDeposit: 0,
    totalTariff: 4500,
    paymentStatus: 'PAID',
    specialRequirements: '6000L clean potable drinking water delivery at 07:00 AM to Meegoda Temple grounds',
    citizenName: 'Ven. Dhammananda Thero',
    citizenNic: '196812345678',
    nicNumber: '196812345678',
    citizenPhone: '0712345678',
    phone: '0712345678',
    date: 'Oct 14, 2026',
    time: '07:00 AM - 09:00 AM',
    status: 'APPROVED',
    statusMessage: 'Water bowser dispatched schedule confirmed with municipal driver.',
    price: 'Rs. 4,500 Paid (Official Receipt Issued)',
    avatar: '🚚',
    documents: [
      { name: 'Temple_Committee_Request.pdf', size: '410 KB' },
    ],
    remarks: [
      {
        id: 'rem-9',
        author: 'Water Supply Superintendent',
        text: 'Vehicle #WP-NB-4512 assigned with driver K. Silva.',
        date: '2026-10-03',
        time: '11:00 AM',
        action: 'APPROVED',
      },
    ],
  },
  {
    id: 10,
    refId: '#PS-2026-0815',
    type: 'appointment',
    officialName: 'Mrs. Jayani Fernando',
    role: 'Chief Revenue Officer',
    office: 'Finance & Revenue Division',
    counter: 'Counter 02 - Revenue & Assessment Taxes',
    division: 'Homagama South',
    citizenName: 'Lalith Samarasinghe',
    citizenNic: '197023456789',
    nicNumber: '197023456789',
    citizenPhone: '0779988776',
    phone: '0779988776',
    service: 'Assessment Tax & Ownership Registration',
    date: 'Sep 20, 2026',
    time: '09:30 AM - 10:00 AM',
    status: 'NO-SHOW',
    statusMessage: 'Citizen did not appear for the scheduled assessment tax appeal session.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face',
    documents: [
      { name: 'Tax_Notice_2025_Appeal.pdf', size: '510 KB' },
    ],
    remarks: [
      {
        id: 'rem-10',
        author: 'Mrs. Jayani Fernando',
        text: 'Token called 3 times at Counter 02. No citizen response.',
        date: '2026-09-20',
        time: '10:15 AM',
        action: 'NOTE',
      },
    ],
  },
];

const departments = [
  { id: 'planning', name: 'Planning & Engineering' },
  { id: 'revenue', name: 'Finance & Revenue' },
  { id: 'health', name: 'Public Health & Sanitation' },
  { id: 'admin', name: 'Administration & Licensing' },
];

const officials = [
  {
    id: 'off-1',
    name: 'Eng. Priyantha Bandara',
    role: 'Chief Planning Engineer',
    counter: 'Counter 04 - Planning & Building Approvals',
    deptId: 'planning',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face',
    available: true,
  },
  {
    id: 'off-2',
    name: 'Mrs. Jayani Fernando',
    role: 'Chief Revenue Officer',
    counter: 'Counter 02 - Revenue & Assessment Taxes',
    deptId: 'revenue',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face',
    available: true,
  },
  {
    id: 'off-3',
    name: 'Dr. Rohan Wickramasinghe',
    role: 'Supervisory Public Health Inspector',
    counter: 'Counter 05 - Public Health & Sanitation',
    deptId: 'health',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
    available: true,
  },
  {
    id: 'off-4',
    name: 'Mr. K. Samarasinghe',
    role: 'Senior Administrative Officer',
    counter: 'Counter 03 - Business & Trade Licenses',
    deptId: 'admin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    available: true,
  },
];

const timeSlots = [
  { id: 'ts-1', time: '09:00 AM - 09:30 AM', period: 'Morning Session', available: true },
  { id: 'ts-2', time: '09:30 AM - 10:00 AM', period: 'Morning Session', available: true },
  { id: 'ts-3', time: '10:00 AM - 10:30 AM', period: 'Morning Session', available: false },
  { id: 'ts-4', time: '10:30 AM - 11:00 AM', period: 'Morning Session', available: true },
  { id: 'ts-5', time: '11:00 AM - 11:30 AM', period: 'Morning Session', available: true },
  { id: 'ts-6', time: '01:30 PM - 02:00 PM', period: 'Afternoon Session', available: true },
  { id: 'ts-7', time: '02:00 PM - 02:30 PM', period: 'Afternoon Session', available: true },
  { id: 'ts-8', time: '02:30 PM - 03:00 PM', period: 'Afternoon Session', available: false },
  { id: 'ts-9', time: '03:00 PM - 03:30 PM', period: 'Afternoon Session', available: true },
];

const facilities: MunicipalFacility[] = [
  {
    id: 'fac-1',
    title: 'Central Town Hall',
    category: 'Community Centers',
    subtitle: 'Main auditorium suitable for public meetings, conferences and receptions with full AV support.',
    pricing: 'Rs. 25,000 / Day',
    basePrice: 'Rs. 25,000',
    rentalFee: 25000,
    securityDeposit: 10000,
    capacity: 500,
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=500&h=300&fit=crop',
    amenities: ['Central Air Conditioning', 'State of the Art Audio/Visual', '500 Tiered Seats', 'VIP Lounges', 'Standby Generator'],
  },
  {
    id: 'fac-2',
    title: 'Homagama Public Sports Ground',
    category: 'Sports Grounds',
    subtitle: 'Standard cricket and athletic grounds with floodlights and pavilion.',
    pricing: 'Rs. 15,000 / Day',
    basePrice: 'Rs. 15,000',
    rentalFee: 15000,
    securityDeposit: 5000,
    capacity: 2000,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&h=300&fit=crop',
    amenities: ['Turf Pitch', 'Floodlighting', 'Pavilion Seating', 'Dressing Rooms'],
  },
  {
    id: 'fac-3',
    title: 'Homagama Crematorium',
    category: 'Crematoriums',
    subtitle: 'Modern LP Gas crematorium with chapel and ceremony hall.',
    pricing: 'Rs. 5,000 / Session',
    basePrice: 'Rs. 5,000',
    rentalFee: 5000,
    securityDeposit: 0,
    capacity: 150,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=500&h=300&fit=crop',
    amenities: ['Ceremony Hall', 'LP Gas Furnaces', 'Chairs & Sound Setup', 'Waiting Lounge'],
  },
  {
    id: 'fac-4',
    title: 'Water Bowser Rental (6000L)',
    category: 'Vehicles & Machinery',
    subtitle: 'Municipal potable water delivery service for community functions or domestic shortage.',
    pricing: 'Rs. 4,500 / Trip',
    basePrice: 'Rs. 4,500',
    rentalFee: 4500,
    securityDeposit: 0,
    capacity: 1,
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=500&h=300&fit=crop',
    amenities: ['6000L Potable Tank', 'High Pressure Pump Hose', 'Municipal Driver Included'],
  },
];

export const appointmentService = {
  getBookings: async (): Promise<BookingItem[]> => {
    return new Promise((resolve) => setTimeout(() => resolve([...bookings]), 250));
  },

  getDepartments: async (): Promise<any[]> => {
    return new Promise((resolve) => setTimeout(() => resolve([...departments]), 150));
  },

  getOfficials: async (): Promise<any[]> => {
    return new Promise((resolve) => setTimeout(() => resolve([...officials]), 150));
  },

  getFacilities: async (): Promise<MunicipalFacility[]> => {
    return new Promise((resolve) => setTimeout(() => resolve([...facilities]), 150));
  },

  getTimeSlots: async (): Promise<any[]> => {
    return new Promise((resolve) => setTimeout(() => resolve([...timeSlots]), 150));
  },

  createBooking: async (newBooking: Partial<BookingItem>): Promise<BookingItem> => {
    const isAppointment = newBooking.type === 'appointment';
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const generatedRef = isAppointment ? `#PS-2026-${randomNum}` : `#PS-FB-2026-${randomNum}`;

    const created: BookingItem = {
      id: Date.now(),
      refId: generatedRef,
      type: newBooking.type || 'appointment',
      officialName: newBooking.officialName || 'Assigned Officer',
      role: newBooking.role || 'Council Official',
      office: newBooking.office || 'Main Council Office',
      counter: newBooking.counter || 'Counter 01 - Citizen Reception & Helpdesk',
      division: newBooking.division || 'Homagama Town',
      citizenName: newBooking.citizenName || 'Citizen Applicant',
      citizenNic: newBooking.citizenNic || newBooking.nicNumber || '199012345678',
      nicNumber: newBooking.nicNumber || newBooking.citizenNic || '199012345678',
      citizenPhone: newBooking.citizenPhone || newBooking.phone || '0771234567',
      phone: newBooking.phone || newBooking.citizenPhone || '0771234567',
      citizenEmail: newBooking.citizenEmail || newBooking.email || '',
      email: newBooking.email || newBooking.citizenEmail || '',
      citizenAddress: newBooking.citizenAddress || 'Homagama Jurisdiction',
      service: newBooking.service || 'General Municipal Consultation',
      date: newBooking.date || 'Oct 05, 2026',
      time: newBooking.time || '09:30 AM - 10:00 AM',
      status: 'PENDING',
      statusMessage: 'Application submitted online. Officer review and counter allocation underway.',
      avatar: newBooking.avatar || (isAppointment ? '👤' : '🏛️'),
      documents: newBooking.documents || [],
      remarks: [
        {
          id: `rem-${Date.now()}`,
          author: 'Citizen Gateway Portal',
          text: 'Application and attached documents submitted online.',
          date: new Date().toISOString().split('T')[0],
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          action: 'NOTE',
        },
      ],
      facilityName: newBooking.facilityName,
      location: newBooking.location,
      eventTitle: newBooking.eventTitle,
      eventType: newBooking.eventType,
      expectedAttendees: newBooking.expectedAttendees,
      rentalFee: newBooking.rentalFee,
      securityDeposit: newBooking.securityDeposit,
      totalTariff: newBooking.totalTariff,
      paymentStatus: newBooking.paymentStatus || 'PAID',
      specialRequirements: newBooking.specialRequirements,
      price: newBooking.price,
      formDetails: newBooking.formDetails,
      attachment: newBooking.attachment,
    };

    bookings.unshift(created);
    return created;
  },

  cancelBooking: async (id: number | string): Promise<boolean> => {
    bookings = bookings.map((b) => (b.id === id ? { ...b, status: 'CANCELLED' as const } : b));
    return true;
  },
};
