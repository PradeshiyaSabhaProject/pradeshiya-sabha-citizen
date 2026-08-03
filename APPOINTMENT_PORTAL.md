# Citizen Appointment & Facility Reservation Portal

Welcome to the documentation for the **Citizen Appointment & Facility Reservation** feature in the Pradeshiya Sabha Citizen Portal. This feature enables citizens to schedule direct appointments with local council officials and reserve community facilities, venues, or heavy machinery.

---

## 📋 Table of Contents
- [Feature Overview](#-feature-overview)
- [Functional Capabilities](#-functional-capabilities)
  - [1. Portal Overview (Dashboard)](#1-portal-overview-dashboard)
  - [2. Citizen Appointment Scheduling](#2-citizen-appointment-scheduling)
  - [3. Facility & Asset Reservation](#3-facility--asset-reservation)
  - [4. My Bookings & Timeline Tracking](#4-my-bookings--timeline-tracking)
- [Technical Architecture](#-technical-architecture)
  - [File Structure Map](#file-structure-map)
  - [State & Data Flow](#state--data-flow)
  - [Data Models](#data-models)
- [User Workflows](#-user-workflows)
  - [Workflow A: Scheduling an Appointment](#workflow-a-scheduling-an-appointment)
  - [Workflow B: Reserving a Facility (General vs. Special Crematorium Form)](#workflow-b-reserving-a-facility-general-vs-special-crematorium-form)
- [Future Enhancements](#-future-enhancements)

---

## 🌟 Feature Overview

The **Citizen Appointment & Facility Reservation Portal** bridges the gap between citizens and local government administrative structures (Pradeshiya Sabha). Historically, scheduling meetings with officials or renting public spaces required physical visits, paper applications, and lengthy waiting periods. This digital module consolidates those interactions into a streamlined, localized, and multi-lingual web interface.

Key high-level aspects:
- **Bi-functional Portal**: Supports scheduling human-to-human appointments (officials) and booking physical assets (facilities, machinery).
- **Multi-lingual Support**: Powered by a unified language context to support localized terms (e.g. English, Sinhala, Tamil).
- **Customized Forms**: Features specialized data capture forms depending on the facility type (e.g., Crematorium rentals capture death registry records, while Hall rentals capture capacity and equipment needs).
- **Visual Progress Timeline**: Demystifies administrative workflows by presenting a step-by-step progress checklist for every request.

---

## 🛠️ Functional Capabilities

### 1. Portal Overview (Dashboard)
The landing tab provides a high-level entry point:
* **Quick Access Cards**: Prominent call-to-actions to book an appointment, reserve a facility, or view existing bookings.
* **Upcoming Bookings Snapshot**: Quickly lists upcoming approved/reserved items (`CONFIRMED` or `RESERVED` statuses) so citizens can check their schedule at a glance.

### 2. Citizen Appointment Scheduling
An interactive, wizard-based scheduler:
* **Step 1: Department Selection**: Choose from various municipal departments (e.g., Planning, Health, General).
* **Step 2: Official Selection**: Once a department is selected, the list filters to display specific officers along with their titles and avatars.
* **Step 3: Date & Time Selection**:
  * An interactive monthly calendar showing availability.
  * A dropdown select menu populated with pre-configured time slots.
* **Step 4: Purpose & Documentation**: Citizens enter their meeting purpose and upload optional supporting document files (e.g., land deeds, building plans) to provide context beforehand.
* **Double-Confirmation**: A confirmation modal displays details before finalizing the submission to prevent accidental double-bookings.

### 3. Facility & Asset Reservation
Allows citizens to rent and reserve local council properties:
* **Smart Filtering & Searching**: Search by name or description, and filter by facility category (e.g., *Event Halls, Sports Grounds, Crematoriums, Vehicles & Machinery, Public Parks, Community Centers*).
* **Intelligent Calendar Helper**: Calendars render dynamic daily availability statuses:
  * **Available**: Full slot availability.
  * **Limited Slots**: Partial availability.
  * **Fully Booked**: No slots left (typically Sundays).
* **Targeted Application Forms**:
  * **General Reservation**: Captures basic details (Purpose of booking, expected attendance, required sound/AV equipment, declarations of validity).
  * **Cremation Reservation**: Captures vital death certificate statistics, registrar details, inquest details (if applicable), and fallback scheduling preferences (Preference 2 & 3), fulfilling legal documentation requirements.

### 4. My Bookings & Timeline Tracking
Provides citizens with full autonomy over their requests:
* **Status Flags**: Bookings are labeled with clear states: `PENDING`, `CONFIRMED`/`RESERVED`, or `CANCELLED`.
* **Instant Cancellation**: Users can cancel pending/confirmed bookings dynamically, triggering a status update and recording the cancellation date.
* **Detailed Progress Modal**: Shows booking details and a real-time progress timeline detailing the administrative steps (e.g., *Dispatched -> Document Verification -> Administrative Approval -> Final Confirmation*).
* **Slip Downloading**: An option to download a PDF receipt/booking slip for physical verification.

---

## 🏗️ Technical Architecture

### File Structure Map

All code files related to this feature are located under `src/features/Appointment`:

* [Appointment.tsx](file:///c:/Users/USER/Documents/GitHub/pradeshiya-sabha-citizen/src/features/Appointment/Appointment.tsx) - Main entry point and tab manager.
* [AppointmentOverview.tsx](file:///c:/Users/USER/Documents/GitHub/pradeshiya-sabha-citizen/src/features/Appointment/components/AppointmentOverview.tsx) - Overview dashboard view.
* [BookingDetailsModal.tsx](file:///c:/Users/USER/Documents/GitHub/pradeshiya-sabha-citizen/src/features/Appointment/components/BookingDetailsModal.tsx) - Detailed popup with processing timeline & details.
* [ConfirmModal.tsx](file:///c:/Users/USER/Documents/GitHub/pradeshiya-sabha-citizen/src/features/Appointment/components/ConfirmModal.tsx) - Modal for confirming appointment schedules.
* [MyBookings.tsx](file:///c:/Users/USER/Documents/GitHub/pradeshiya-sabha-citizen/src/features/Appointment/components/MyBookings.tsx) - UI listing all current citizen bookings.
* [ReserveFacility.tsx](file:///c:/Users/USER/Documents/GitHub/pradeshiya-sabha-citizen/src/features/Appointment/components/ReserveFacility.tsx) - Search/filter UI and specialized forms.
* [ScheduleAppointment.tsx](file:///c:/Users/USER/Documents/GitHub/pradeshiya-sabha-citizen/src/features/Appointment/components/ScheduleAppointment.tsx) - Appointment wizard forms.
* [useAppointments.ts](file:///c:/Users/USER/Documents/GitHub/pradeshiya-sabha-citizen/src/features/Appointment/hooks/useAppointments.ts) - State and validation hook.
* [appointmentService.ts](file:///c:/Users/USER/Documents/GitHub/pradeshiya-sabha-citizen/src/features/Appointment/services/appointmentService.ts) - Mock database/services layer.

### State & Data Flow

This feature leverages a modern React custom hook pattern to isolate business logic from presentation components. The state flow is structured as follows:

1. **`appointmentService.ts`**: Simulates server APIs. Manages local lists of bookings, departments, officials, facilities, and available times. Returns promises to mimic asynchronous network requests.
2. **`useAppointments.ts`**: The "brain" of the feature. Orchestrates states such as active tabs, scheduling wizard values, search parameters, category filters, and modal visibility toggle states. It exposes these properties and mutation callbacks.
3. **`Appointment.tsx`**: Renders the inner tab-based navigation bar, manages loading spinners, and routes the user to the correct component sub-view based on the selected tab or incoming query parameters.

### Data Models

#### 1. Department
* `id`: string (e.g. `'planning'`)
* `name`: string (e.g. `'Planning'`)
* `description`: string (e.g. `'Building plans and land use'`)

#### 2. Official
* `id`: string
* `name`: string
* `role`: string
* `departmentId`: string
* `avatar`: string (URL to image)

#### 3. Facility
* `id`: string
* `title`: string
* `category`: string (e.g., `'Crematoriums'`, `'Event Halls'`)
* `image`: string (Image URL)
* `capacity`: number
* `price`: string (Hourly/slot-based rate text)
* `basePrice`: string (Raw LKR amount display)
* `subtitle`: string (Summary text)
* `details`: string (Quick specs)
* `amenities`: string[] (e.g. `['AC', 'Electric Furnace']`)

#### 4. Booking Record
* `id`: number
* `type`: `'appointment' | 'facility'`
* `status`: `'PENDING' | 'CONFIRMED' | 'RESERVED' | 'CANCELLED'`
* `statusMessage`: string (Informative message from admin)
* `officialName`: string (if type is appointment)
* `role`: string (official's role, if type is appointment)
* `office`: string (office location, if type is appointment)
* `facilityName`: string (if type is facility)
* `location`: string (venue description, if type is facility)
* `price`: string (if type is facility)
* `date`: string (Date or date range)
* `time`: string (Selected slot or duration description)
* `avatar`: string (Emoji or avatar URL)
* `attachment`: object containing file metadata, or null
* `formDetails`: key-value map of form data (e.g. death certificate)

---

## 🔄 User Workflows

### Workflow A: Scheduling an Appointment
1. Citizen selects a **Department** from the step 1 list.
2. Citizen chooses an **Official** from the step 2 list.
3. Citizen selects a **Date** from the interactive calendar and selects an available **Time Slot** from the dropdown.
4. Citizen enters the **Purpose** of the meeting and uploads any optional attachment files.
5. Citizen submits the request, reviewing the appointment details in the **Confirm Modal**.
6. On confirmation, the system creates the booking in `PENDING` state and redirects the user to the **My Bookings** page.

### Workflow B: Reserving a Facility
1. Citizen selects the **Reserve Facility** tab and filters by category or search term.
2. Citizen initiates reservation, opening the date/time selector step.
3. Citizen picks an available day on the calendar and clicks a time slot.
4. In the final booking form step:
   * **General Facilities**: User submits the expected attendance, equipment needs, and reservation purpose.
   * **Crematoriums**: User submits legally required information including deceased information (Name, NIC, Address, Grama division), registrar details, inquest status/verdict, cause of death, preference slots, and death certificate file upload.
5. On form validation check, the booking is submitted to the system and is visible under the citizen's bookings.

---

## 🚀 Future Enhancements

To upgrade this module from a mock-based prototype to a production-ready application, the following enhancements are planned:
1. **Real-time Backend Integration**: Connect components to standard REST APIs or GraphQL endpoints linked to a centralized database (e.g., PostgreSQL).
2. **Calendar ICS Sync**: Allow citizens to export confirmed appointments to external calendar platforms (Google Calendar, Outlook, Apple Calendar).
3. **SMS & Email Notifications**: Automatically send updates to the citizen via SMS and Email when their booking status changes.
4. **Online Fee Payments**: Integrate a payment gateway (e.g., Payhere, Stripe) directly into the facility booking checkout flow so citizens can pay reservation fees instantly online.
5. **Staff Portal Sync**: Develop the administrator back-office view where council workers can approve or reject appointments, assign offices, and write status updates.
