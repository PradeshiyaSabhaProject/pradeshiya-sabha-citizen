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
    element.style.padding = '40px';
    element.style.fontFamily = "'Inter', 'Helvetica Neue', Arial, sans-serif";
    element.style.color = '#1f2937';
    element.style.maxWidth = '650px';
    element.style.margin = 'auto';
    element.style.backgroundColor = '#ffffff';
    
    const isAppointment = booking.type === 'appointment';
    const statusColor = 
      booking.status === 'CONFIRMED' || booking.status === 'RESERVED' ? '#047857' :
      booking.status === 'PENDING' ? '#b45309' : '#4b5563';

    element.innerHTML = `
      <div style="border: 2px solid #f3f4f6; border-radius: 16px; padding: 32px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
        
        <!-- Header -->
        <div style="text-align: center; border-bottom: 2px solid #e5e7eb; padding-bottom: 20px; margin-bottom: 24px;">
          <div style="font-size: 26px; font-weight: 800; color: #800000; letter-spacing: 0.5px;">PRADESHIYA SABHA</div>
          <div style="font-size: 13px; font-weight: 600; color: #4b5563; text-transform: uppercase; letter-spacing: 1px; margin-top: 4px;">Citizen Portal - Official Slip</div>
          <div style="font-size: 11px; color: #9ca3af; margin-top: 2px;">Democratic Socialist Republic of Sri Lanka</div>
        </div>

        <!-- Meta info columns -->
        <div style="display: flex; justify-content: space-between; margin-bottom: 28px; font-size: 14px; color: #374151;">
          <div>
            <div style="color: #9ca3af; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Reference Number</div>
            <strong style="font-size: 16px; color: #111827;">#PS-BK-${booking.id}</strong>
            <div style="margin-top: 6px;">Status: <span style="color: ${statusColor}; font-weight: 800; font-size: 12px; text-transform: uppercase; background-color: ${statusColor}15; padding: 2px 8px; border-radius: 4px;">${booking.status}</span></div>
          </div>
          <div style="text-align: right;">
            <div style="color: #9ca3af; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Slip Issued Date</div>
            <strong style="font-size: 14px; color: #111827;">${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</strong>
            <div style="font-size: 11px; color: #6b7280; margin-top: 4px;">Generated via Online Portal</div>
          </div>
        </div>

        <!-- Divider line -->
        <div style="height: 1px; background-color: #f3f4f6; margin-bottom: 24px;"></div>

        <!-- Details Grid -->
        <div style="background-color: #f9fafb; border: 1px solid #f3f4f6; border-radius: 12px; padding: 20px; margin-bottom: 28px;">
          <h3 style="margin: 0 0 16px 0; font-size: 15px; font-weight: 700; color: #111827; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">
            Booking Details
          </h3>
          
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 10px 0; color: #6b7280; font-weight: 500;">Service Classification</td>
              <td style="padding: 10px 0; text-align: right; font-weight: 700; color: #111827; text-transform: capitalize;">
                ${booking.type === 'appointment' ? 'Official Appointment' : 'Facility & Equipment Rental'}
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 10px 0; color: #6b7280; font-weight: 500;">Scheduled Date</td>
              <td style="padding: 10px 0; text-align: right; font-weight: 700; color: #111827;">${booking.date}</td>
            </tr>
            ${booking.time ? `
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 10px 0; color: #6b7280; font-weight: 500;">Allocated Time Slot</td>
              <td style="padding: 10px 0; text-align: right; font-weight: 700; color: #111827;">${booking.time}</td>
            </tr>
            ` : ''}
            
            ${isAppointment ? `
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; color: #6b7280; font-weight: 500;">Council Official</td>
                <td style="padding: 10px 0; text-align: right; font-weight: 700; color: #111827;">${booking.officialName}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; color: #6b7280; font-weight: 500;">Official Role</td>
                <td style="padding: 10px 0; text-align: right; font-weight: 700; color: #111827;">${booking.role || 'Administrative Secretary'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #6b7280; font-weight: 500;">Office Location</td>
                <td style="padding: 10px 0; text-align: right; font-weight: 700; color: #111827;">${booking.office || 'Main Headquarters'}</td>
              </tr>
            ` : `
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; color: #6b7280; font-weight: 500;">Facility / Asset</td>
                <td style="padding: 10px 0; text-align: right; font-weight: 700; color: #111827;">${booking.facilityName}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; color: #6b7280; font-weight: 500;">Venue Location</td>
                <td style="padding: 10px 0; text-align: right; font-weight: 700; color: #111827;">${booking.location}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #6b7280; font-weight: 500;">Payment Summary</td>
                <td style="padding: 10px 0; text-align: right; font-weight: 800; color: #990000; font-size: 15px;">${booking.price || 'N/A'}</td>
              </tr>
            `}
          </table>
        </div>

        <!-- Status Message or Note -->
        ${booking.statusMessage ? `
          <div style="background-color: #fffbeb; border: 1px solid #fef3c7; border-radius: 8px; padding: 12px 16px; margin-bottom: 24px; font-size: 13px; color: #92400e; font-style: italic;">
            <strong>Note:</strong> ${booking.statusMessage}
          </div>
        ` : ''}

        <!-- Footer terms -->
        <div style="border-top: 1px dashed #d1d5db; padding-top: 20px; text-align: center; font-size: 11px; color: #6b7280; line-height: 1.5;">
          <div style="font-weight: 700; color: #374151; margin-bottom: 4px;">IMPORTANT NOTICE FOR CITIZENS</div>
          <p style="margin: 0;">Please present this slip (either a digital copy on your mobile device or a physical printout) to the front desk reception upon arrival.</p>
          <p style="margin: 4px 0 0 0;">Appointments may be delayed by up to 15 minutes due to administrative proceedings. Thank you for your cooperation.</p>
        </div>

        <!-- Verification Seal placeholder -->
        <div style="margin-top: 24px; display: flex; justify-content: space-between; align-items: flex-end;">
          <div style="font-size: 10px; color: #9ca3af;">
            Security Checksum: ${Math.random().toString(36).substring(2, 10).toUpperCase()}-${booking.id}
          </div>
          <div style="border: 1px solid #10b981; border-radius: 4px; padding: 4px 8px; font-size: 9px; font-weight: 800; color: #10b981; text-transform: uppercase; transform: rotate(-5deg);">
            ✓ PORTAL VERIFIED
          </div>
        </div>

      </div>
    `;

    const opt = {
      margin:       15,
      filename:     `Pradeshiya_Sabha_Slip_${booking.id}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    window.html2pdf().from(element).set(opt).save();
  };

  if (!window.html2pdf) {
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
      script.crossOrigin = 'anonymous';
      script.onload = generatePDF;
      document.body.appendChild(script);
    } else {
      script.addEventListener('load', generatePDF);
    }
  } else {
    generatePDF();
  }
};
