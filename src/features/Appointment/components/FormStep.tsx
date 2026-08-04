import React from 'react';

interface FormStepProps {
  selectedFacility: any;
  chosenDateObj: any;
  chosenTimeSlot: any;
  setWizardStep: (step: string) => void;
  onReserve: (facility: any, payload: any) => void;

  applicantName: string;
  setApplicantName: (val: string) => void;
  applicantAddress: string;
  setApplicantAddress: (val: string) => void;
  applicantNic: string;
  setApplicantNic: (val: string) => void;
  applicantPhone: string;
  setApplicantPhone: (val: string) => void;
  applicantGrama: string;
  setApplicantGrama: (val: string) => void;

  deceasedName: string;
  setDeceasedName: (val: string) => void;
  deceasedAddress: string;
  setDeceasedAddress: (val: string) => void;
  deceasedGrama: string;
  setDeceasedGrama: (val: string) => void;
  deceasedNic: string;
  setDeceasedNic: (val: string) => void;
  relationship: string;
  setRelationship: (val: string) => void;
  deathCertificateNo: string;
  setDeathCertificateNo: (val: string) => void;
  registrarName: string;
  setRegistrarName: (val: string) => void;
  registrarAddress: string;
  setRegistrarAddress: (val: string) => void;
  causeOfDeath: string;
  setCauseOfDeath: (val: string) => void;
  inquestConducted: string;
  setInquestConducted: (val: string) => void;
  inquestDateTime: string;
  setInquestDateTime: (val: string) => void;
  inquestVerdict: string;
  setInquestVerdict: (val: string) => void;
  bodyHandedOver: string;
  setBodyHandedOver: (val: string) => void;
  prefPreference2: string;
  setPrefPreference2: (val: string) => void;
  prefPreference3: string;
  setPrefPreference3: (val: string) => void;

  bookingPurpose: string;
  setBookingPurpose: (val: string) => void;
  expectedAttendance: string;
  setExpectedAttendance: (val: string) => void;
  equipmentRequired: string;
  setEquipmentRequired: (val: string) => void;

  uploadedFileName: string;
  setUploadedFileName: (val: string) => void;
  uploadedFileSize: number;
  setUploadedFileSize: (val: number) => void;
  declaredCorrect: boolean;
  setDeclaredCorrect: (val: boolean) => void;

  errors: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

export const FormStep: React.FC<FormStepProps> = ({
  selectedFacility,
  chosenDateObj,
  chosenTimeSlot,
  setWizardStep,
  onReserve,
  applicantName,
  setApplicantName,
  applicantAddress,
  setApplicantAddress,
  applicantNic,
  setApplicantNic,
  applicantPhone,
  setApplicantPhone,
  applicantGrama,
  setApplicantGrama,
  deceasedName,
  setDeceasedName,
  deceasedAddress,
  setDeceasedAddress,
  deceasedGrama,
  setDeceasedGrama,
  deceasedNic,
  setDeceasedNic,
  relationship,
  setRelationship,
  deathCertificateNo,
  setDeathCertificateNo,
  registrarName,
  setRegistrarName,
  registrarAddress,
  setRegistrarAddress,
  causeOfDeath,
  setCauseOfDeath,
  inquestConducted,
  setInquestConducted,
  inquestDateTime,
  setInquestDateTime,
  inquestVerdict,
  setInquestVerdict,
  bodyHandedOver,
  setBodyHandedOver,
  prefPreference2,
  setPrefPreference2,
  prefPreference3,
  setPrefPreference3,
  bookingPurpose,
  setBookingPurpose,
  expectedAttendance,
  setExpectedAttendance,
  equipmentRequired,
  setEquipmentRequired,
  uploadedFileName,
  setUploadedFileName,
  uploadedFileSize,
  setUploadedFileSize,
  declaredCorrect,
  setDeclaredCorrect,
  errors,
  setErrors,
}) => {
  const isCremation = selectedFacility?.category === 'Crematoriums';

  const handleMockUpload = () => {
    const filename = isCremation ? 'death_certificate_signed.pdf' : 'permit_request_form.pdf';
    setUploadedFileName(filename);
    setUploadedFileSize(148500); // ~145 KB
  };

  const validateApplicantDetails = (newErrors: Record<string, string>) => {
    if (!applicantName.trim()) newErrors.applicantName = 'Applicant name is required';
    if (!applicantAddress.trim()) newErrors.applicantAddress = 'Address is required';
    if (!applicantNic.trim()) newErrors.applicantNic = 'NIC is required';
    if (!applicantPhone.trim()) newErrors.applicantPhone = 'Telephone is required';
    if (!applicantGrama.trim()) newErrors.applicantGrama = 'Grama Niladhari Division is required';
  };

  const validateCremationDetails = (newErrors: Record<string, string>) => {
    if (!deceasedName.trim()) newErrors.deceasedName = 'Deceased person name is required';
    if (!deceasedAddress.trim()) newErrors.deceasedAddress = 'Deceased address is required';
    if (!deceasedGrama.trim()) newErrors.deceasedGrama = 'Deceased Grama Division is required';
    if (!deathCertificateNo.trim()) newErrors.deathCertificateNo = 'Death Certificate details are required';
    if (!causeOfDeath.trim()) newErrors.causeOfDeath = 'Cause of death is required';
    if (inquestConducted === 'Yes' && !inquestVerdict.trim()) {
      newErrors.inquestVerdict = 'Inquest conclusion/verdict is required';
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    validateApplicantDetails(newErrors);

    if (isCremation) {
      validateCremationDetails(newErrors);
    } else if (!bookingPurpose.trim()) {
      newErrors.bookingPurpose = 'Purpose of booking is required';
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
    const formDetails = isCremation ? {
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
          type="button"
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
              <label 
                htmlFor="applicant-name"
                className="block text-xs font-bold text-gray-700 mb-1"
              >
                1. Applicant's Full Name (සම්පූර්ණ නම) <span className="text-red-800">*</span>
              </label>
              <input 
                id="applicant-name"
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
              <label 
                htmlFor="applicant-nic"
                className="block text-xs font-bold text-gray-700 mb-1"
              >
                2. NIC Number (ජාතික හැඳුනුම්පත් අංකය) <span className="text-red-800">*</span>
              </label>
              <input 
                id="applicant-nic"
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
              <label 
                htmlFor="applicant-address"
                className="block text-xs font-bold text-gray-700 mb-1"
              >
                3. Address of Applicant (ලිපිනය) <span className="text-red-800">*</span>
              </label>
              <input 
                id="applicant-address"
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
              <label 
                htmlFor="applicant-grama"
                className="block text-xs font-bold text-gray-700 mb-1"
              >
                4. Grama Niladhari Division (ග්‍රාම සේවා කොට්ඨාසය) <span className="text-red-800">*</span>
              </label>
              <input 
                id="applicant-grama"
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
              <label 
                htmlFor="applicant-phone"
                className="block text-xs font-bold text-gray-700 mb-1"
              >
                5. Telephone / Contact Number (දුරකථන අංකය) <span className="text-red-800">*</span>
              </label>
              <input 
                id="applicant-phone"
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
                  <label 
                    htmlFor="deceased-name"
                    className="block text-xs font-bold text-gray-700 mb-1"
                  >
                    6. Deceased Person's Full Name (මියගිය තැනැත්තාගේ නම) <span className="text-red-800">*</span>
                  </label>
                  <input 
                    id="deceased-name"
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
                  <label 
                    htmlFor="deceased-nic"
                    className="block text-xs font-bold text-gray-700 mb-1"
                  >
                    7. Deceased Person's NIC (ජාතික හැඳුනුම්පත් අංකය)
                  </label>
                  <input 
                    id="deceased-nic"
                    type="text"
                    value={deceasedNic}
                    onChange={(e) => setDeceasedNic(e.target.value)}
                    placeholder="NIC (if available)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-red-800 focus:border-red-800"
                  />
                </div>

                <div className="md:col-span-2">
                  <label 
                    htmlFor="deceased-address"
                    className="block text-xs font-bold text-gray-700 mb-1"
                  >
                    8. Address of Residence (පදිංචි වී සිටි ලිපිනය) <span className="text-red-800">*</span>
                  </label>
                  <input 
                    id="deceased-address"
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
                  <label 
                    htmlFor="deceased-grama"
                    className="block text-xs font-bold text-gray-700 mb-1"
                  >
                    9. Grama Niladhari Division (ග්‍රාමසේවා කොට්ඨාසය) <span className="text-red-855">*</span>
                  </label>
                  <input 
                    id="deceased-grama"
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
                  <label 
                    htmlFor="applicant-relationship"
                    className="block text-xs font-bold text-gray-700 mb-1"
                  >
                    10. Relationship of Applicant to Deceased (සම්බන්ධතාවය) <span className="text-red-855">*</span>
                  </label>
                  <select 
                    id="applicant-relationship"
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
                  <label 
                    htmlFor="death-certificate-no"
                    className="block text-xs font-bold text-gray-700 mb-1"
                  >
                    11. Death Certificate No. & Date (මරණ සහතිකයේ අංකය හා දිනය) <span className="text-red-855">*</span>
                  </label>
                  <input 
                    id="death-certificate-no"
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
                  <label 
                    htmlFor="cause-of-death"
                    className="block text-xs font-bold text-gray-700 mb-1"
                  >
                    12. Cause of Death (මරණයට හේතුව) <span className="text-red-855">*</span>
                  </label>
                  <input 
                    id="cause-of-death"
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
                  <label 
                    htmlFor="registrar-name"
                    className="block text-xs font-bold text-gray-700 mb-1"
                  >
                    13. Registrar's Full Name (මරණ ලියාපදිංචි කළ ලේකම්ගේ නම)
                  </label>
                  <input 
                    id="registrar-name"
                    type="text"
                    value={registrarName}
                    onChange={(e) => setRegistrarName(e.target.value)}
                    placeholder="Name of Death Registrar"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-red-800 focus:border-red-800"
                  />
                </div>

                <div>
                  <label 
                    htmlFor="registrar-address"
                    className="block text-xs font-bold text-gray-700 mb-1"
                  >
                    14. Registrar's Address / Office (ලේකම්ගේ ලිපිනය)
                  </label>
                  <input 
                    id="registrar-address"
                    type="text"
                    value={registrarAddress}
                    onChange={(e) => setRegistrarAddress(e.target.value)}
                    placeholder="Office address of Registrar"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-red-800 focus:border-red-800"
                  />
                </div>

                <div className="md:col-span-2 border-t border-gray-100 pt-3">
                  <span className="block text-xs font-bold text-gray-700 mb-2">
                    15. Was an inquest or post-mortem conducted? (මරණය සම්බන්ධයෙන් පරීක්ෂණයක් පවත්වන ලද්දේ ද?)
                  </span>
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
                        <label 
                          htmlFor="inquest-date-time"
                          className="block text-[11px] font-bold text-gray-700 mb-1"
                        >
                          Inquest Date and Time (පරීක්ෂණය පැවැත්වූ දිනය හා වේලාව)
                        </label>
                        <input 
                          id="inquest-date-time"
                          type="text"
                          value={inquestDateTime}
                          onChange={(e) => setInquestDateTime(e.target.value)}
                          placeholder="e.g. 2026-07-09, 10:30 AM"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs bg-white"
                        />
                      </div>
                      <div>
                        <label 
                          htmlFor="inquest-verdict"
                          className="block text-[11px] font-bold text-gray-700 mb-1"
                        >
                          Conclusion/Verdict of Inquest Officer (නිලධාරියාගේ නිගමනය) <span className="text-red-800">*</span>
                        </label>
                        <input 
                          id="inquest-verdict"
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
                  <span className="block text-xs font-bold text-gray-700 mb-2">
                    16. Handing over body for cremation? (මෘත ශරීරය ආදාහනය කිරීමට ලබා දෙන්නේ ද?)
                  </span>
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
                <label 
                  htmlFor="booking-purpose"
                  className="block text-xs font-bold text-gray-700 mb-1"
                >
                  6. Purpose of Booking / Description of Event <span className="text-red-800">*</span>
                </label>
                <textarea 
                  id="booking-purpose"
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
                  <label 
                    htmlFor="expected-attendance"
                    className="block text-xs font-bold text-gray-700 mb-1"
                  >
                    7. Expected Attendance (Persons)
                  </label>
                  <input 
                    id="expected-attendance"
                    type="number"
                    value={expectedAttendance}
                    onChange={(e) => setExpectedAttendance(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-1 focus:ring-red-800 focus:border-red-800"
                  />
                </div>

                <div>
                  <label 
                    htmlFor="equipment-required"
                    className="block text-xs font-bold text-gray-700 mb-1"
                  >
                    8. Special Equipment or Services Requested
                  </label>
                  <input 
                    id="equipment-required"
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
            <span className="block text-xs font-bold text-gray-700">
              {isCremation ? 'Attach Death Certificate / Disposal Permit (PDF/Image)' : 'Attach National Identity Card (NIC) / Supporting Permission Letter'} <span className="text-red-800">*</span>
            </span>

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
          type="button"
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
};
