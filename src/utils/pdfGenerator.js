/**
 * Helper utility to generate and download a PDF booking, complaint, or letter slip for citizen portal.
 * Dynamically loads html2pdf.js from CDN.
 */
export const downloadSlip = (item) => {
  if (!item) return;

  const scriptId = 'html2pdf-cdn-script';
  let script = document.getElementById(scriptId);

  const generatePDF = () => {
    const element = document.createElement('div');

    // Layout and container styles
    element.style.padding = '36px';
    element.style.fontFamily = "'Inter', 'Helvetica Neue', Arial, sans-serif";
    element.style.color = '#1f2937';
    element.style.maxWidth = '680px';
    element.style.margin = 'auto';
    element.style.backgroundColor = '#ffffff';

    const isComplaint = item.type === 'complaint' || (item.id && item.id.startsWith('CMP-'));
    const isLetter = item.type === 'letter' || (item.refNo && item.refNo.startsWith('LTR-')) || (item.id && String(item.id).startsWith('LTR-'));
    const isAppointment = item.type === 'appointment';
    
    let docTitle = 'Official Consultation & Reservation Token Pass';
    if (isComplaint) {
      docTitle = 'Official Citizen Complaint & Redressal Tracking Slip';
    } else if (isLetter) {
      docTitle = 'Official Citizen Letter & Correspondence Pass';
    }

    const refToken = item.refNo || item.refId || (isAppointment ? `#PS-2026-${item.id}` : isComplaint ? item.id : isLetter ? item.refNo || item.id : `#PS-FB-2026-${item.id}`);
    const statusUpper = (item.status || 'PENDING').toUpperCase();
    const statusColor =
      statusUpper === 'APPROVED' || statusUpper === 'CONFIRMED' || statusUpper === 'RESERVED' || statusUpper === 'RESOLVED'
        ? '#047857'
        : statusUpper === 'RESCHEDULED' || statusUpper === 'IN PROGRESS' || statusUpper === 'IN TRANSIT'
        ? '#1d4ed8'
        : statusUpper === 'REJECTED' || statusUpper === 'RETURNED'
        ? '#b91c1c'
        : '#b45309';

    const citizenName = item.citizenName || item.name || item.fullName || 'Verified Citizen';
    const citizenNic = item.nicNumber || item.citizenNic || item.nic || '199012345678';
    const citizenPhone = item.phone || item.citizenPhone || item.contactNumber || '077 123 4567';

    element.innerHTML = `
      <div style="border: 2px solid #e5e7eb; border-radius: 16px; padding: 32px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
        
        <!-- Header -->
        <div style="text-align: center; border-bottom: 2px solid #e5e7eb; padding-bottom: 20px; margin-bottom: 24px;">
          <div style="font-size: 26px; font-weight: 800; color: #8C1538; letter-spacing: 0.5px;">HOMAGAMA PRADESHIYA SABHA</div>
          <div style="font-size: 13px; font-weight: 700; color: #374151; text-transform: uppercase; letter-spacing: 1px; margin-top: 4px;">${docTitle}</div>
          <div style="font-size: 11px; color: #6b7280; margin-top: 2px;">Democratic Socialist Republic of Sri Lanka</div>
        </div>

        <!-- Meta info columns -->
        <div style="display: flex; justify-content: space-between; margin-bottom: 24px; font-size: 13px; color: #374151;">
          <div>
            <div style="color: #6b7280; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Reference Token</div>
            <strong style="font-size: 18px; color: #8C1538; font-family: monospace;">${refToken}</strong>
            <div style="margin-top: 6px;">Status: <span style="color: ${statusColor}; font-weight: 800; font-size: 11px; text-transform: uppercase; background-color: ${statusColor}15; padding: 3px 8px; border-radius: 4px; border: 1px solid ${statusColor}40;">${item.status}</span></div>
          </div>
          <div style="text-align: right;">
            <div style="color: #6b7280; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Pass Issue Date</div>
            <strong style="font-size: 14px; color: #111827;">${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</strong>
            <div style="font-size: 11px; color: #6b7280; margin-top: 4px;">Authenticated Digital Pass</div>
          </div>
        </div>

        <!-- Citizen Profile Block -->
        <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px; margin-bottom: 20px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
            <tr>
              <td style="padding: 4px 0; color: #6b7280; width: 40%;">Citizen Name:</td>
              <td style="padding: 4px 0; font-weight: 700; color: #111827; text-align: right;">${citizenName}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; color: #6b7280;">National ID (NIC):</td>
              <td style="padding: 4px 0; font-weight: 700; color: #111827; text-align: right; font-family: monospace;">${citizenNic}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; color: #6b7280;">Mobile Contact:</td>
              <td style="padding: 4px 0; font-weight: 700; color: #111827; text-align: right;">${citizenPhone}</td>
            </tr>
            ${item.address ? `
            <tr>
              <td style="padding: 4px 0; color: #6b7280;">Location / Address:</td>
              <td style="padding: 4px 0; font-weight: 700; color: #111827; text-align: right;">${item.address}</td>
            </tr>` : ''}
          </table>
        </div>

        <!-- Details Grid -->
        <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
          <h3 style="margin: 0 0 12px 0; font-size: 13px; font-weight: 800; color: #111827; border-bottom: 1px solid #e5e7eb; padding-bottom: 6px; text-transform: uppercase;">
            ${isComplaint ? 'Complaint & Redressal Particulars' : isLetter ? 'Correspondence & Secretariat Routing' : isAppointment ? 'Consultation Allocation' : 'Venue & Event Specifications'}
          </h3>
          
          <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
            ${isComplaint ? `
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 8px 0; color: #6b7280;">Complaint Category</td>
                <td style="padding: 8px 0; text-align: right; font-weight: 700; color: #111827;">${item.category}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 8px 0; color: #6b7280;">Incident Date</td>
                <td style="padding: 8px 0; text-align: right; font-weight: 700; color: #111827;">${item.incidentDate || item.date}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 8px 0; color: #6b7280;">Complaint Summary</td>
                <td style="padding: 8px 0; text-align: right; font-weight: 700; color: #8C1538;">${item.title || item.desc}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">Full Description</td>
                <td style="padding: 8px 0; text-align: right; font-weight: 600; color: #374151;">${item.desc || item.description || 'N/A'}</td>
              </tr>
            ` : isLetter ? `
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 8px 0; color: #6b7280;">Target Division</td>
                <td style="padding: 8px 0; text-align: right; font-weight: 700; color: #111827;">${item.department || item.division || 'Main Secretariat'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 8px 0; color: #6b7280;">Letter Subject</td>
                <td style="padding: 8px 0; text-align: right; font-weight: 700; color: #8C1538;">${item.subject || item.title}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 8px 0; color: #6b7280;">Submission Date</td>
                <td style="padding: 8px 0; text-align: right; font-weight: 700; color: #111827;">${item.date || item.submissionDate}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">Description / Remarks</td>
                <td style="padding: 8px 0; text-align: right; font-weight: 600; color: #374151;">${item.description || item.desc || 'Formal correspondence logged in municipal ledger.'}</td>
              </tr>
            ` : isAppointment ? `
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 8px 0; color: #6b7280;">Allocated Date</td>
                <td style="padding: 8px 0; text-align: right; font-weight: 700; color: #111827;">${item.date}</td>
              </tr>
              ${item.time ? `
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 8px 0; color: #6b7280;">Time Slot</td>
                <td style="padding: 8px 0; text-align: right; font-weight: 700; color: #8C1538;">${item.time}</td>
              </tr>
              ` : ''}
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 8px 0; color: #6b7280;">Council Official</td>
                <td style="padding: 8px 0; text-align: right; font-weight: 700; color: #111827;">${item.officialName}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 8px 0; color: #6b7280;">Designated Counter / Room</td>
                <td style="padding: 8px 0; text-align: right; font-weight: 800; color: #1e3a8a;">${item.counter || item.office || 'Counter 01 - Helpdesk'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">Service Domain</td>
                <td style="padding: 8px 0; text-align: right; font-weight: 700; color: #111827;">${item.service || 'General Consultation'}</td>
              </tr>
            ` : `
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 8px 0; color: #6b7280;">Facility / Venue</td>
                <td style="padding: 8px 0; text-align: right; font-weight: 700; color: #111827;">${item.facilityName}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 8px 0; color: #6b7280;">Event Title / Nature</td>
                <td style="padding: 8px 0; text-align: right; font-weight: 700; color: #111827;">${item.eventTitle || 'Community Event'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">Settlement Amount</td>
                <td style="padding: 8px 0; text-align: right; font-weight: 700; color: #047857;">${item.price || 'Rs. 5,000 Paid'}</td>
              </tr>
            `}
          </table>
        </div>

        <!-- Security & Instructions Notice -->
        <div style="border-left: 4px solid #8C1538; padding: 12px 16px; background-color: #fff1f2; font-size: 11px; line-height: 1.5; color: #881337; margin-bottom: 24px; border-radius: 4px;">
          <strong>Official Notice for Citizens:</strong>
          <ul style="margin: 4px 0 0 0; padding-left: 16px;">
            <li>Keep this tracking slip for future follow-up and verification reference.</li>
            <li>For status inquiries and escalations, contact the council helpline: 011-2855222 quoting reference ${refToken}.</li>
            <li>Official council updates will be communicated via SMS and the Citizen Digital Gateway.</li>
          </ul>
        </div>

        <!-- Barcode and Verification Footer -->
        <div style="display: flex; justify-content: space-between; align-items: flex-end; border-top: 1px dashed #d1d5db; padding-top: 16px;">
          <div style="font-size: 11px; color: #9ca3af;">
            <div>Digitally authorized by Homagama Pradeshiya Sabha Administration</div>
            <div style="margin-top: 2px;">System generated • No physical signature required</div>
          </div>
          <div style="text-align: right;">
            <div style="font-family: monospace; font-size: 14px; font-weight: 900; letter-spacing: 2px; color: #111827;">
              ||| ||||| || |||| |||||| |||
            </div>
            <div style="font-size: 10px; color: #6b7280; font-family: monospace;">${refToken}</div>
          </div>
        </div>

      </div>
    `;

    const opt = {
      margin: 10,
      filename: `Pass_${String(refToken).replace('#', '')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    if (window.html2pdf) {
      window.html2pdf().from(element).set(opt).save();
    } else {
      window.print();
    }
  };

  if (!script) {
    script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
    script.onload = () => generatePDF();
    document.body.appendChild(script);
  } else {
    generatePDF();
  }
};
