// Mock service for Letter Requests
let letterRequests = [
  {
    id: 1,
    refNo: 'LTR-2267',
    subject: 'Building Permit approval Letter',
    category: 'Building and planning',
    dateSubmitted: '2026-06-01',
    timeSubmitted: '10.30 AM',
    status: 'In review',
    description: 'Request for official approval on the building plan submitted for residential construction at Homagama.',
    remarks: 'Awaiting site inspection from the planning department officer.',
    timeline: [
      { date: '2026-06-01 10:30 AM', status: 'Submitted', description: 'Letter request submitted by citizen.' },
      { date: '2026-06-02 09:15 AM', status: 'In review', description: 'Document assigned to Planning Officer for verification.' }
    ]
  },
  {
    id: 2,
    refNo: 'LTR-2260',
    subject: 'Water connection inquiry response',
    category: 'Water and utilities',
    dateSubmitted: '2026-05-23',
    timeSubmitted: '11.00 AM',
    status: 'Resolved',
    description: 'Inquiry response regarding standard domestic water supply connection approval.',
    remarks: 'Approved. The certificate has been issued and is available for download.',
    timeline: [
      { date: '2026-05-23 11:00 AM', status: 'Submitted', description: 'Letter request submitted by citizen.' },
      { date: '2026-05-24 02:30 PM', status: 'In review', description: 'Under evaluation by Water & Sanitation Board.' },
      { date: '2026-05-26 10:00 AM', status: 'Resolved', description: 'Water connection certificate issued.' }
    ]
  },
  {
    id: 3,
    refNo: 'LTR-2249',
    subject: 'Land ownership confirmation',
    category: 'Land and property',
    dateSubmitted: '2026-05-15',
    timeSubmitted: '02.45 PM',
    status: 'In transit',
    description: 'Request for land ownership confirmation certificate for validation of inheritance registry.',
    remarks: 'Documents verified. Hard copy has been dispatched to applicant address.',
    timeline: [
      { date: '2026-05-15 02:45 PM', status: 'Submitted', description: 'Letter request submitted by citizen.' },
      { date: '2026-05-16 11:30 AM', status: 'In review', description: 'Title deed verification in progress.' },
      { date: '2026-05-18 04:00 PM', status: 'In transit', description: 'Certificate printed and dispatched via registered post.' }
    ]
  },
  {
    id: 4,
    refNo: 'LTR-2230',
    subject: 'Tax exemption request',
    category: 'Tax and finance',
    dateSubmitted: '2026-05-05',
    timeSubmitted: '08.30 AM',
    status: 'Returned',
    description: 'Application requesting tax exemption due to low income family status.',
    remarks: 'Returned: Please attach a valid income declaration statement certified by your Grama Niladhari.',
    timeline: [
      { date: '2026-05-05 08:30 AM', status: 'Submitted', description: 'Letter request submitted by citizen.' },
      { date: '2026-05-06 10:15 AM', status: 'In review', description: 'Financial verification process.' },
      { date: '2026-05-08 03:20 PM', status: 'Returned', description: 'Returned due to insufficient documentation.' }
    ]
  },
  {
    id: 5,
    refNo: 'LTR-2229',
    subject: 'Property valuation notice',
    category: 'Land and property',
    dateSubmitted: '2026-04-16',
    timeSubmitted: '09.55 AM',
    status: 'In review',
    description: 'Request for property assessment and updated official valuation statement.',
    remarks: 'Awaiting valuer visit to local property area.',
    timeline: [
      { date: '2026-04-16 09:55 AM', status: 'Submitted', description: 'Letter request submitted by citizen.' }
    ]
  }
];

export const letterService = {
  getLetters: () => {
    return Promise.resolve([...letterRequests]);
  },
  createLetterRequest: (newLetter) => {
    const nextId = letterRequests.length > 0 ? Math.max(...letterRequests.map(l => l.id)) + 1 : 1;
    const randomArray = new Uint32Array(1);
    window.crypto.getRandomValues(randomArray);
    const randRef = `LTR-${2000 + (randomArray[0] % 800)}`;
    const now = new Date();
    
    // Formatting date and time
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const dateStr = `${yyyy}-${mm}-${dd}`;
    
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours || 12; // the hour '0' should be '12'
    const timeStr = `${String(hours).padStart(2, '0')}.${minutes} ${ampm}`;

    const request = {
      id: nextId,
      refNo: randRef,
      status: 'In review',
      dateSubmitted: dateStr,
      timeSubmitted: timeStr,
      timeline: [
        { date: `${dateStr} ${timeStr}`, status: 'Submitted', description: 'Letter request submitted by citizen.' }
      ],
      remarks: 'Awaiting document verification.',
      ...newLetter
    };
    
    letterRequests = [request, ...letterRequests];
    return Promise.resolve(request);
  },
  cancelLetterRequest: (id) => {
    letterRequests = letterRequests.filter(l => l.id !== id);
    return Promise.resolve(true);
  }
};
