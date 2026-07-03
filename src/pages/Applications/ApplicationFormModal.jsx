import React, { useState } from 'react';

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const SparklesIcon = () => (
  <svg className="w-4 h-4 text-amber-300" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 8.134a1 1 0 010 1.932l-3.354.935-1.18 4.455a1 1 0 01-1.933 0L9.854 11l-3.354-.935a1 1 0 010-1.932l3.354-.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg className="w-16 h-16 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ApplicationFormModal = ({ isOpen, onClose, applicationTitle }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceNo, setReferenceNo] = useState('');
  const [formData, setFormData] = useState({
    // 1-3. Applicant Info
    applicantNameAddress: '',
    applicantNic: '',
    applicantPhone: '',

    // 4-7. Property Owner Info
    ownerFullName: '',
    ownerNic: '',
    ownerAddress: '',
    relationshipToOwner: '',

    // 8-9. Reason & Institution
    reasonForCertificate: '',
    presentingInstitution: '',

    // 10-15. Property Location & Taxes
    adjacentRoadName: '',
    paysVaripanam: 'no',
    paysAcreageTax: 'no',
    hasPendingCourtCases: 'no',
    includesGovLand: 'no',
    gnDivisionAndNumber: '',

    // 16. Deed Details
    deedNumber: '',
    notaryName: '',
    deedDate: '',

    // 17. Survey Plan Details
    surveyPlanNumber: '',
    lotNumbers: '',
    surveyorName: '',
    registrationDate: '',

    // Declaration & Signatures
    agreedToDeclaration: false,
    ownerSignature: '',
    applicantSignature: '',
    submissionDate: new Date().toISOString().split('T')[0]
  });

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAutoFill = () => {
    setFormData({
      applicantNameAddress: 'Chaminda Perera, No. 45, Temple Road, Homagama',
      applicantNic: '881234567V',
      applicantPhone: '071 285 5230',
      ownerFullName: 'K. A. Don Sunanda Perera',
      ownerNic: '621456789V',
      ownerAddress: 'No. 45, Temple Road, Homagama',
      relationshipToOwner: 'Son (පුතා)',
      reasonForCertificate: applicationTitle || 'Street Line & Non-Vesting Certificate',
      presentingInstitution: 'Bank of Ceylon, Homagama Branch',
      adjacentRoadName: 'High Level Road (4th Cross Lane)',
      paysVaripanam: 'yes',
      paysAcreageTax: 'no',
      hasPendingCourtCases: 'no',
      includesGovLand: 'no',
      gnDivisionAndNumber: '485/A - Homagama North (උතුරු හෝමාගම)',
      deedNumber: '1452',
      notaryName: 'A. M. Dissanayake (Attorney-at-Law & Notary Public)',
      deedDate: '2015-06-18',
      surveyPlanNumber: 'SP-8894',
      lotNumbers: 'Lot 02 A',
      surveyorName: 'P. L. Karunaratne (Licensed Surveyor)',
      registrationDate: '2015-07-02',
      agreedToDeclaration: true,
      ownerSignature: 'K.A.D.S. Perera',
      applicantSignature: 'C. Perera',
      submissionDate: new Date().toISOString().split('T')[0]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agreedToDeclaration) {
      alert('කරුණාකර ප්‍රකාශයට එකඟ බව තහවුරු කරන්න / Please agree to the declaration before submitting.');
      return;
    }
    const randomRef = 'HMG-SL-' + Math.floor(100000 + Math.random() * 900000);
    setReferenceNo(randomRef);
    setIsSubmitted(true);
  };

  const resetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-fadeIn select-none font-sans">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-hidden shadow-2xl border border-gray-200 flex flex-col my-auto text-left">

        {/* Modal Header Banner */}
        <div className="bg-[#8C1538] text-white px-6 py-5 flex items-start justify-between relative shadow-md shrink-0">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full text-amber-200">
              Page 01 Digitalized Form • හෝමාගම ප්‍රාදේශීය සභාව
            </span>
            <h2 className="text-lg md:text-xl font-bold mt-1.5 leading-snug">
              වීථි රේඛා හා නොපවරා ගැනීමේ සහතිකය සඳහා වන අයදුම්පත
            </h2>
            <p className="text-xs md:text-sm text-white/80 mt-0.5">
              Application for Street Line & Non-Vesting Certificate {applicationTitle ? `• ${applicationTitle}` : ''}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {!isSubmitted && (
              <button
                type="button"
                onClick={handleAutoFill}
                className="bg-white/15 hover:bg-white/25 text-white text-xs font-medium px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all duration-200 cursor-pointer border border-white/20 shadow-xs"
                title="Fill sample Sri Lankan citizen data"
              >

                <span className="hidden sm:inline">Auto-Fill Sample</span>
              </button>
            )}
            <button
              type="button"
              onClick={resetAndClose}
              className="text-white/80 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            >
              <CloseIcon />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-8 flex-grow text-gray-800">
          {isSubmitted ? (
            /* Success Confirmation Screen */
            <div className="py-12 px-4 text-center space-y-6 animate-fadeIn">
              <CheckCircleIcon />
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-gray-900">
                  අයදුම්පත සාර්ථකව ඉදිරිපත් කරන ලදී!
                </h3>
                <p className="text-base font-semibold text-gray-700">
                  Application Successfully Submitted!
                </p>
                <p className="text-sm text-gray-500 max-w-md mx-auto">
                  Your application has been received by the Homagama Pradeshiya Sabha online portal. SMS and email notifications will be sent to your registered contact number.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 max-w-md mx-auto text-left space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-xs text-gray-500 uppercase font-bold">Reference Number</span>
                  <span className="font-mono font-bold text-lg text-[#8C1538] bg-red-50 px-3 py-1 rounded-md border border-red-100">
                    {referenceNo}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Applicant:</span>
                  <span className="font-semibold text-gray-900 truncate max-w-[200px]">{formData.applicantNameAddress.split(',')[0] || 'Citizen'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Purpose:</span>
                  <span className="font-semibold text-gray-900 truncate max-w-[200px]">{formData.reasonForCertificate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-semibold text-gray-900">{formData.submissionDate}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => alert(`Downloading acknowledgment receipt for ${referenceNo}...`)}
                  className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all cursor-pointer shadow-xs"
                >
                  📄 Download Receipt (PDF)
                </button>
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="bg-[#8C1538] hover:bg-[#73102d] text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-all cursor-pointer shadow-sm hover:shadow"
                >
                  Done & Return to Applications
                </button>
              </div>
            </div>
          ) : (
            /* Digital Form Fields (Page 1 of PDF) */
            <form id="application-form" onSubmit={handleSubmit} className="space-y-8">

              {/* Note Banner */}


              {/* Section 1: Applicant Info (Fields 1 - 3) */}
              <div className="bg-gray-50/70 border border-gray-200 rounded-2xl p-5 md:p-6 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#8C1538] flex items-center gap-2 border-b border-gray-200 pb-3">
                  <span className="bg-[#8C1538] text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">01</span>
                  අයදුම්කරුගේ තොරතුරු / Applicant Information (Fields 1 - 3)
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      1. අයදුම්කරුගේ නම සහ ලිපිනය / Applicant's Name and Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="applicantNameAddress"
                      required
                      value={formData.applicantNameAddress}
                      onChange={handleInputChange}
                      placeholder="e.g. Chaminda Perera, No. 45, Temple Road, Homagama"
                      className="w-full bg-white border border-gray-300 focus:border-[#8C1538] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      2. අයදුම්කරුගේ හැඳුනුම්පත් අංකය / Applicant's NIC No <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="applicantNic"
                      required
                      value={formData.applicantNic}
                      onChange={handleInputChange}
                      placeholder="e.g. 881234567V or 198812345678"
                      className="w-full bg-white border border-gray-300 focus:border-[#8C1538] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none transition-colors font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      3. අයදුම්කරුගේ දුරකතන අංකය / Telephone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="applicantPhone"
                      required
                      value={formData.applicantPhone}
                      onChange={handleInputChange}
                      placeholder="e.g. 071 285 5230"
                      className="w-full bg-white border border-gray-300 focus:border-[#8C1538] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none transition-colors font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Property Owner Info (Fields 4 - 7) */}
              <div className="bg-gray-50/70 border border-gray-200 rounded-2xl p-5 md:p-6 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#8C1538] flex items-center gap-2 border-b border-gray-200 pb-3">
                  <span className="bg-[#8C1538] text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">02</span>
                  දේපළ අයිතිකරුගේ තොරතුරු / Property Owner Information (Fields 4 - 7)
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      4. දේපළ අයිතිකරුගේ සම්පූර්ණ නම / Property Owner's Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="ownerFullName"
                      required
                      value={formData.ownerFullName}
                      onChange={handleInputChange}
                      placeholder="e.g. K. A. Don Sunanda Perera"
                      className="w-full bg-white border border-gray-300 focus:border-[#8C1538] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      5. දේපළ අයිතිකරුගේ හැඳුනුම්පත් අංකය / Owner's NIC No <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="ownerNic"
                      required
                      value={formData.ownerNic}
                      onChange={handleInputChange}
                      placeholder="e.g. 621456789V"
                      className="w-full bg-white border border-gray-300 focus:border-[#8C1538] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none transition-colors font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      7. අයිතිකරු හා අයදුම්කරු අතර සම්බන්ධතාව / Relationship to Owner <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="relationshipToOwner"
                      required
                      value={formData.relationshipToOwner}
                      onChange={handleInputChange}
                      placeholder="e.g. Self (අයිතිකරු) / Son (පුතා) / Tenant"
                      className="w-full bg-white border border-gray-300 focus:border-[#8C1538] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      6. දේපළ අයිතිකරුගේ ස්ථිර ලිපිනය / Owner's Permanent Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="ownerAddress"
                      required
                      value={formData.ownerAddress}
                      onChange={handleInputChange}
                      placeholder="e.g. No. 45, Temple Road, Homagama"
                      className="w-full bg-white border border-gray-300 focus:border-[#8C1538] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Certificate Purpose & Institution (Fields 8 - 9) */}
              <div className="bg-gray-50/70 border border-gray-200 rounded-2xl p-5 md:p-6 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#8C1538] flex items-center gap-2 border-b border-gray-200 pb-3">
                  <span className="bg-[#8C1538] text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">03</span>
                  සහතිකයේ අරමුණ / Purpose & Presenting Institution (Fields 8 - 9)
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      8. සහතිකය ඉල්ලා සිටීමට හේතුව / Reason for Requesting Certificate <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="reasonForCertificate"
                      required
                      value={formData.reasonForCertificate}
                      onChange={handleInputChange}
                      placeholder="e.g. Cutting Down Hazardous Trees / Street Line Verification for Building"
                      className="w-full bg-white border border-gray-300 focus:border-[#8C1538] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none transition-colors font-medium text-[#8C1538]"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      9. සහතිකය ඉදිරිපත් කරන ආයතනයේ නම සහ ලිපිනය / Institution Name & Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="presentingInstitution"
                      required
                      value={formData.presentingInstitution}
                      onChange={handleInputChange}
                      placeholder="e.g. Bank of Ceylon, Homagama Branch / Pradeshiya Sabha Engineer"
                      className="w-full bg-white border border-gray-300 focus:border-[#8C1538] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Section 4: Property Location & Tax Details (Fields 10 - 15) */}
              <div className="bg-gray-50/70 border border-gray-200 rounded-2xl p-5 md:p-6 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#8C1538] flex items-center gap-2 border-b border-gray-200 pb-3">
                  <span className="bg-[#8C1538] text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">04</span>
                  දේපළ පිහිටීම සහ බදු තොරතුරු / Property Location & Taxes (Fields 10 - 15)
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      10. දේපළට යාබදව පිහිටි මාර්ගයේ නම / Adjacent Road Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="adjacentRoadName"
                      required
                      value={formData.adjacentRoadName}
                      onChange={handleInputChange}
                      placeholder="e.g. High Level Road (4th Cross Lane)"
                      className="w-full bg-white border border-gray-300 focus:border-[#8C1538] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Field 11: Varipanam Tax */}
                  <div className="bg-white p-3.5 rounded-xl border border-gray-200">
                    <label className="block text-xs font-bold text-gray-700 mb-2">
                      11. දේපළට වරිපනම් බදු ගෙවනවාද / Pay Varipanam Tax?
                    </label>
                    <div className="flex items-center gap-6 text-sm font-medium">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="paysVaripanam"
                          value="yes"
                          checked={formData.paysVaripanam === 'yes'}
                          onChange={handleInputChange}
                          className="text-[#8C1538] focus:ring-[#8C1538]"
                        />
                        <span>ඔව් / Yes</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="paysVaripanam"
                          value="no"
                          checked={formData.paysVaripanam === 'no'}
                          onChange={handleInputChange}
                          className="text-[#8C1538] focus:ring-[#8C1538]"
                        />
                        <span>නැත / No</span>
                      </label>
                    </div>
                  </div>

                  {/* Field 12: Acreage Tax */}
                  <div className="bg-white p-3.5 rounded-xl border border-gray-200">
                    <label className="block text-xs font-bold text-gray-700 mb-2">
                      12. දේපළට අක්කර බදු ගෙවනවාද / Pay Acreage Tax?
                    </label>
                    <div className="flex items-center gap-6 text-sm font-medium">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="paysAcreageTax"
                          value="yes"
                          checked={formData.paysAcreageTax === 'yes'}
                          onChange={handleInputChange}
                          className="text-[#8C1538]"
                        />
                        <span>ඔව් / Yes</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="paysAcreageTax"
                          value="no"
                          checked={formData.paysAcreageTax === 'no'}
                          onChange={handleInputChange}
                          className="text-[#8C1538]"
                        />
                        <span>නැත / No</span>
                      </label>
                    </div>
                  </div>

                  {/* Field 13: Court Cases */}
                  <div className="bg-white p-3.5 rounded-xl border border-gray-200">
                    <label className="block text-xs font-bold text-gray-700 mb-2">
                      13. දේපළට නඩු පවරා තිබේද / Pending Court Cases?
                    </label>
                    <div className="flex items-center gap-6 text-sm font-medium">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="hasPendingCourtCases"
                          value="yes"
                          checked={formData.hasPendingCourtCases === 'yes'}
                          onChange={handleInputChange}
                          className="text-[#8C1538]"
                        />
                        <span>ඔව් / Yes</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="hasPendingCourtCases"
                          value="no"
                          checked={formData.hasPendingCourtCases === 'no'}
                          onChange={handleInputChange}
                          className="text-[#8C1538]"
                        />
                        <span>නැත / No</span>
                      </label>
                    </div>
                  </div>

                  {/* Field 14: Govt / Local Auth Land */}
                  <div className="bg-white p-3.5 rounded-xl border border-gray-200">
                    <label className="block text-xs font-bold text-gray-700 mb-2">
                      14. රජයේ / පළාත් පාලන ඉඩම් කොටසක් ඇතුළත්ව තිබේද / Gov Land Included?
                    </label>
                    <div className="flex items-center gap-6 text-sm font-medium">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="includesGovLand"
                          value="yes"
                          checked={formData.includesGovLand === 'yes'}
                          onChange={handleInputChange}
                          className="text-[#8C1538]"
                        />
                        <span>ඔව් / Yes</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="includesGovLand"
                          value="no"
                          checked={formData.includesGovLand === 'no'}
                          onChange={handleInputChange}
                          className="text-[#8C1538]"
                        />
                        <span>නැත / No</span>
                      </label>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      15. දේපළ පිහිටි ග්‍රාම නිලධාරී වසම සහ අංකය / Grama Niladhari Division & No <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="gnDivisionAndNumber"
                      required
                      value={formData.gnDivisionAndNumber}
                      onChange={handleInputChange}
                      placeholder="e.g. 485/A - Homagama North (උතුරු හෝමාගම)"
                      className="w-full bg-white border border-gray-300 focus:border-[#8C1538] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Section 5: Deed Details (Field 16) */}
              <div className="bg-gray-50/70 border border-gray-200 rounded-2xl p-5 md:p-6 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#8C1538] flex items-center gap-2 border-b border-gray-200 pb-3">
                  <span className="bg-[#8C1538] text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">05</span>
                  16. දේපළට අයත් ඔප්පු තොරතුරු / Deed Details (Field 16)
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      ඔප්පු අංකය / Deed Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="deedNumber"
                      required
                      value={formData.deedNumber}
                      onChange={handleInputChange}
                      placeholder="e.g. 1452"
                      className="w-full bg-white border border-gray-300 focus:border-[#8C1538] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none transition-colors font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      සහතික කළ නොතාරිස් තැනගේ නම / Attesting Notary Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="notaryName"
                      required
                      value={formData.notaryName}
                      onChange={handleInputChange}
                      placeholder="e.g. A. M. Dissanayake"
                      className="w-full bg-white border border-gray-300 focus:border-[#8C1538] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      සහතික කළ දිනය / Date of Attestation <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="deedDate"
                      required
                      value={formData.deedDate}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-gray-300 focus:border-[#8C1538] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Section 6: Survey Plan Details (Field 17) */}
              <div className="bg-gray-50/70 border border-gray-200 rounded-2xl p-5 md:p-6 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#8C1538] flex items-center gap-2 border-b border-gray-200 pb-3">
                  <span className="bg-[#8C1538] text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">06</span>
                  17. දේපළට අයත් සැලසුම් තොරතුරු / Survey Plan Details (Field 17)
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      සැලසුම් අංකය / Survey Plan No <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="surveyPlanNumber"
                      required
                      value={formData.surveyPlanNumber}
                      onChange={handleInputChange}
                      placeholder="e.g. SP-8894"
                      className="w-full bg-white border border-gray-300 focus:border-[#8C1538] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none transition-colors font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      කැබලි අංක / Lot Number(s) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="lotNumbers"
                      required
                      value={formData.lotNumbers}
                      onChange={handleInputChange}
                      placeholder="e.g. Lot 02 A"
                      className="w-full bg-white border border-gray-300 focus:border-[#8C1538] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none transition-colors font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      මිනින්දෝරු තැනගේ නම / Surveyor Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="surveyorName"
                      required
                      value={formData.surveyorName}
                      onChange={handleInputChange}
                      placeholder="e.g. P. L. Karunaratne"
                      className="w-full bg-white border border-gray-300 focus:border-[#8C1538] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      ලියාපදිංචි කළ දිනය / Reg. Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="registrationDate"
                      required
                      value={formData.registrationDate}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-gray-300 focus:border-[#8C1538] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Section 7: Declaration & Signatures */}
              <div className="bg-red-50/50 border-2 border-dashed border-red-200 rounded-2xl p-5 md:p-6 space-y-5">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#8C1538] flex items-center gap-2">
                  <span className="bg-[#8C1538] text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">07</span>
                  ප්‍රකාශය සහ සහතිකය / Applicant & Owner Declaration
                </h3>

                <div className="bg-white p-4 rounded-xl border border-red-100 text-xs sm:text-sm text-gray-700 leading-relaxed space-y-2 select-text">
                  <p className="font-medium text-gray-900">
                    මෙම දේපළ සඳහා රජයේ / පළාත් පාලන හෝ වෙනත් ආයතනයක, වෙනත් පෞද්ගලික ඉඩමක කොටස් ඇතුළත් වී නොමැති නිරවුල් ඉඩමක් බවත්, දැනට නඩු, ආරවුලක් නොපවතින බවත්, රජයේ පළාත් පාලන හෝ වෙනත් ආයතනයකට, පුද්ගලයෙකුට අවහිර වන සිවිල් අයිතිවාසිකම් හෝ රජයේ පළාත් පාලන පාරිසරික නීති රීතිවලට පටහැනි කටයුත්තක් සඳහා යොදා නොගන්නා බවත්, එසේ නීතියට පටහැනි වෙනත් කටයුත්තකට යොදා ගැනීම සම්බන්ධ වරදක් සිදු වුවහොත් එහි සම්පූර්ණ වගකීම මට භාර ගැනීමට සිදුවන බවටත් හා ඉහත සපයා ඇති තොරතුරු සත්‍ය බවත් නිවැරදි බවත් මෙයින් සහතික කරමින් පුරුදු අත්සන තබා ඉදිරිපත් කරමි / කරමු.
                  </p>
                  <p className="text-gray-500 text-xs italic">
                    (I/We certify that the property is clear of disputes, government or private encroachments, and is not involved in any illegal activities or violations of municipal environmental regulations. I/We assume full legal responsibility for the accuracy of the information provided herein.)
                  </p>
                </div>

                <label className="flex items-start gap-3 cursor-pointer select-none bg-white p-3.5 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
                  <input
                    type="checkbox"
                    name="agreedToDeclaration"
                    checked={formData.agreedToDeclaration}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 text-[#8C1538] rounded border-gray-300 focus:ring-[#8C1538]"
                  />
                  <span className="text-xs sm:text-sm font-bold text-gray-800">
                    මම ඉහත ප්‍රකාශයට සහ නීතිමය කොන්දේසිවලට එකඟ වෙමි / I agree to the above legal declaration and confirm all details are accurate. <span className="text-red-500">*</span>
                  </span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      දේපළ අයිතිකරුගේ අත්සන (Digital Signature)
                    </label>
                    <input
                      type="text"
                      name="ownerSignature"
                      required
                      value={formData.ownerSignature}
                      onChange={handleInputChange}
                      placeholder="Type Owner's Full Name"
                      className="w-full bg-white border border-gray-300 focus:border-[#8C1538] rounded-xl px-3.5 py-2.5 text-sm font-serif italic focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      අයදුම්කරුගේ අත්සන (Applicant Signature) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="applicantSignature"
                      required
                      value={formData.applicantSignature}
                      onChange={handleInputChange}
                      placeholder="Type Applicant's Full Name"
                      className="w-full bg-white border border-gray-300 focus:border-[#8C1538] rounded-xl px-3.5 py-2.5 text-sm font-serif italic focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      දිනය / Date of Submission
                    </label>
                    <input
                      type="date"
                      name="submissionDate"
                      readOnly
                      value={formData.submissionDate}
                      className="w-full bg-gray-100 border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm text-gray-600 focus:outline-none cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>

            </form>
          )}
        </div>

        {/* Modal Footer (Sticky Bottom) */}
        {!isSubmitted && (
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
            <div className="text-xs text-gray-500">
              <span className="text-red-500 font-bold">*</span> අනිවාර්ය ක්ෂේත්‍ර / Required fields
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={resetAndClose}
                className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all cursor-pointer shadow-2xs"
              >
                අවලංගු කරන්න / Cancel
              </button>
              <button
                type="submit"
                form="application-form"
                className="bg-[#8C1538] hover:bg-[#73102d] text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-all cursor-pointer shadow-sm hover:shadow-md flex items-center gap-2"
              >
                <span>අයදුම්පත ඉදිරිපත් කරන්න / Submit Application</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ApplicationFormModal;
