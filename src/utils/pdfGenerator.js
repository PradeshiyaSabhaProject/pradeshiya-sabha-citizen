/**
 * Helper utility to generate and download a PDF booking slip for citizen portal.
 * Dynamically loads html2pdf.js from CDN.
 */
export const downloadSlip = (booking) => {
  if (!booking) return;

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

    const isAppointment = booking.type === 'appointment';
    const refToken = booking.refId || (isAppointment ? `#PS-2026-${booking.id}` : `#PS-FB-2026-${booking.id}`);
    const statusColor =
      booking.status === 'APPROVED' || booking.status === 'CONFIRMED' || booking.status === 'RESERVED'
        ? '#047857'
        : booking.status === 'RESCHEDULED'
        ? '#1d4ed8'
        : booking.status === 'REJECTED'
        ? '#b91c1c'
        : '#b45309';

    element.innerHTML = `
      <div style="border: 2px solid #e5e7eb; border-radius: 16px; padding: 32px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
        
        <!-- Header -->
        <div style="text-align: center; border-bottom: 2px solid #e5e7eb; padding-bottom: 20px; margin-bottom: 24px;">
          <div style="font-size: 26px; font-weight: 800; color: #8C1538; letter-spacing: 0.5px;">HOMAGAMA PRADESHIYA SABHA</div>
          <div style="font-size: 13px; font-weight: 700; color: #374151; text-transform: uppercase; letter-spacing: 1px; margin-top: 4px;">Official Consultation & Reservation Token Pass</div>
          <div style="font-size: 11px; color: #6b7280; margin-top: 2px;">Democratic Socialist Republic of Sri Lanka</div>
        </div>

        <!-- Meta info columns -->
        <div style="display: flex; justify-content: space-between; margin-bottom: 24px; font-size: 13px; color: #374151;">
          <div>
            <div style="color: #6b7280; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Reference Token</div>
            <strong style="font-size: 18px; color: #8C1538; font-family: monospace;">${refToken}</strong>
            <div style="margin-top: 6px;">Status: <span style="color: ${statusColor}; font-weight: 800; font-size: 11px; text-transform: uppercase; background-color: ${statusColor}15; padding: 3px 8px; border-radius: 4px; border: 1px solid ${statusColor}40;">${booking.status}</span></div>
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
              <td style="padding: 4px 0; font-weight: 700; color: #111827; text-align: right;">${booking.citizenName || 'Sunil Jayaratne'}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; color: #6b7280;">National ID (NIC):</td>
              <td style="padding: 4px 0; font-weight: 700; color: #111827; text-align: right; font-family: monospace;">${booking.nicNumber || booking.citizenNic || '198421456789'}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; color: #6b7280;">Mobile Contact:</td>
              <td style="padding: 4px 0; font-weight: 700; color: #111827; text-align: right;">${booking.phone || booking.citizenPhone || '077 123 4567'}</td>
            </tr>
            ${booking.division ? `
            <tr>
              <td style="padding: 4px 0; color: #6b7280;">GN Division:</td>
              <td style="padding: 4px 0; font-weight: 700; color: #111827; text-align: right;">${booking.division}</td>
            </tr>` : ''}
          </table>
        </div>

        <!-- Details Grid -->
        <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
          <h3 style="margin: 0 0 12px 0; font-size: 13px; font-weight: 800; color: #111827; border-bottom: 1px solid #e5e7eb; padding-bottom: 6px; text-transform: uppercase;">
            ${isAppointment ? 'Consultation Allocation' : 'Venue & Event Specifications'}
          </h3>
          
          <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 8px 0; color: #6b7280;">Allocated Date</td>
              <td style="padding: 8px 0; text-align: right; font-weight: 700; color: #111827;">${booking.date}</td>
            </tr>
            ${booking.time ? `
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 8px 0; color: #6b7280;">Time Slot</td>
              <td style="padding: 8px 0; text-align: right; font-weight: 700; color: #8C1538;">${booking.time}</td>
            </tr>
            ` : ''}
            
            ${isAppointment ? `
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 8px 0; color: #6b7280;">Council Official</td>
                <td style="padding: 8px 0; text-align: right; font-weight: 700; color: #111827;">${booking.officialName}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 8px 0; color: #6b7280;">Designated Counter / Room</td>
                <td style="padding: 8px 0; text-align: right; font-weight: 800; color: #1e3a8a;">${booking.counter || booking.office || 'Counter 01 - Helpdesk'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">Service Domain</td>
                <td style="padding: 8px 0; text-align: right; font-weight: 700; color: #111827;">${booking.service || 'General Consultation'}</td>
              </tr>
            ` : `
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 8px 0; color: #6b7280;">Facility / Venue</td>
                <td style="padding: 8px 0; text-align: right; font-weight: 700; color: #111827;">${booking.facilityName}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 8px 0; color: #6b7280;">Event Title / Nature</td>
                <td style="padding: 8px 0; text-align: right; font-weight: 700; color: #111827;">${booking.eventTitle || 'Community Event'}</td>
              </tr>
              ${booking.rentalFee !== undefined ? `
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 8px 0; color: #6b7280;">Rental Tariff</td>
                <td style="padding: 8px 0; text-align: right; font-weight: 700; color: #111827;">Rs. ${booking.rentalFee.toLocaleString()}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 8px 0; color: #6b7280;">Refundable Security Deposit</td>
                <td style="padding: 8px 0; text-align: right; font-weight: 700; color: #b45309;">Rs. ${(booking.securityDeposit || 0).toLocaleString()}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">Total Settlement</td>
                <td style="padding: 8px 0; text-align: right; font-weight: 800; color: #047857;">Rs. ${(booking.rentalFee + (booking.securityDeposit || 0)).toLocaleString()} (${booking.paymentStatus || 'PAID'})</td>
              </tr>
              ` : `
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">Settlement Amount</td>
                <td style="padding: 8px 0; text-align: right; font-weight: 700; color: #047857;">${booking.price || 'Rs. 5,000 Paid'}</td>
              </tr>
              `}
            `}
          </table>
        </div>

        <!-- Security & Instructions Notice -->
        <div style="border-left: 4px solid #8C1538; padding: 12px 16px; background-color: #fff1f2; font-size: 11px; line-height: 1.5; color: #881337; margin-bottom: 24px; border-radius: 4px;">
          <strong>Official Notice for Visitors:</strong>
          <ul style="margin: 4px 0 0 0; padding-left: 16px;">
            <li>Please present this slip along with your original National Identity Card (NIC) at the security reception.</li>
            <li>Arrive at the designated counter 10 minutes prior to your allocated consultation slot.</li>
            <li>In case of rescheduling inquiries, contact the council helpline: 011-2855222 quoting reference ${refToken}.</li>
          </ul>
        </div>

        <!-- Barcode and Verification Footer -->
        <div style="display: flex; justify-content: space-between; align-items: flex-end; border-top: 1px dashed #d1d5db; padding-top: 16px;">
          <div style="font-size: 11px; color: #9ca3af;">
            <div>Digitally authorized by Pradeshiya Sabha Administration</div>
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
      filename: `Pass_${refToken.replace('#', '')}.pdf`,
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
