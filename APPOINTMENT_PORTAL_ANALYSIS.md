# Citizen Appointment & Facility Reservation - (Citizen Area)
**PRADESHIYA SABHA PROJECT**

**Created By:**  
K.D.H.Vinudi Lakmanthee  

**SLT ID:** 3799  

---

## 1. INTRODUCTION

The **Citizen Appointment & Facility Reservation Portal** is designed to digitize and streamline administrative interactions between local citizens and the council officials of the Pradeshiya Sabha. Historically, scheduling appointments with local government authorities or reserving community properties (such as event halls, grounds, and municipal equipment) involved manual record-keeping, physical visits, and complex paperwork. This digital portal consolidates these processes into a centralized, modern, and localized interface.

The main objectives of this system are:
- **Direct Citizen Engagement:** Provide citizens with immediate digital channels to schedule direct consultations with council officers.
- **Efficient Public Resource Sharing:** Allow seamless discovery, availability checks, and booking requests for community assets.
- **Administrative Transparency:** Demystify the backend processing steps for applications, showing live, step-by-step progress tracking for every request.
- **Digital Integrity:** Implement automated validation for critical submissions, ensuring documents and legal details (e.g. death registries for crematoriums) are verified before booking.

The system is structured into four main components:
1. **Portal Overview Dashboard:** The user's launchpad containing quick-access actions and a snapshot of active upcoming bookings.
2. **Citizen Appointment Scheduler:** An interactive, wizard-based scheduler for reserving face-to-face slots with council officials.
3. **Facility & Asset Reservation System:** A localized filtering and reservation system equipped with customized data-entry forms (e.g., standard rentals vs. crematorium registration details).
4. **My Bookings & Progress Tracker:** A personal console listing historical and pending reservations, detailed status tracking logs, and booking receipt download links.

---

## 2. TECHNOLOGIES USED

A combination of modern, lightweight web technologies has been selected for the development of the Citizen Portal, ensuring high responsiveness, performance, and future expandability:

- **React:** The core frontend library used to build a component-based, reactive user interface, facilitating instant state transitions across form wizards and status tables.
- **TypeScript:** The primary programming language used to enforce compile-time type-safety, minimize execution errors, and provide autocompletion for booking structures.
- **Tailwind CSS (v4):** A utility-first CSS framework used to build customized responsive layouts, interactive modal backdrops, and modern status indicator badges.
- **Vite:** A fast, modern frontend build tool that optimizes asset compilation and hot-module reloading during development.
- **React Router:** Handles routing within the portal, allowing seamless page updates and tab switching via URL query parameters.
- **Context API (LanguageContext):** Powers multi-lingual localization (English, Sinhala, Tamil), adapting official terms and form labels dynamically.
- **PDF Generator Utility (`pdfGenerator`):** Simulates client-side generation and downloading of official PDF booking slips.

---

## 3. SYSTEM FEATURES

The table below outlines the core system features, their associated source code files, and their technical roles within the Citizen Portal:

| System Feature | Associated File | Technical Description |
| :--- | :--- | :--- |
| **Main Portal Entry** | [Appointment.tsx](file:///c:/Users/USER/Documents/GitHub/pradeshiya-sabha-citizen/src/features/Appointment/Appointment.tsx) | Renders the primary navigation tab bar, resolves URL-based active tabs, and coordinates loading overlays and confirmation modals. |
| **Dashboard Overview** | [AppointmentOverview.tsx](file:///c:/Users/USER/Documents/GitHub/pradeshiya-sabha-citizen/src/features/Appointment/components/AppointmentOverview.tsx) | Displays user welcome banners, three quick-access navigation cards, and a grid view of all upcoming confirmed/reserved bookings. |
| **Appointment Wizard** | [ScheduleAppointment.tsx](file:///c:/Users/USER/Documents/GitHub/pradeshiya-sabha-citizen/src/features/Appointment/components/ScheduleAppointment.tsx) | Handles the step-by-step scheduler flow (Department -> Official -> Date & Time Slot -> Purpose & File Upload). Includes an interactive calendar grid. |
| **Facility Directory** | [ReserveFacility.tsx](file:///c:/Users/USER/Documents/GitHub/pradeshiya-sabha-citizen/src/features/Appointment/components/ReserveFacility.tsx) | Implements smart filtering for venues/machinery. Displays customized forms for standard event rentals and complex crematorium registrations. |
| **My Bookings Console** | [MyBookings.tsx](file:///c:/Users/USER/Documents/GitHub/pradeshiya-sabha-citizen/src/features/Appointment/components/MyBookings.tsx) | Provides segmented list views of active appointments and reservations. Displays status badges, and triggers cancellations or details modals. |
| **Confirmation Dialogue** | [ConfirmModal.tsx](file:///c:/Users/USER/Documents/GitHub/pradeshiya-sabha-citizen/src/features/Appointment/components/ConfirmModal.tsx) | Renders a popup modal confirming appointment submission, validating file attachment sizes before sending. |
| **Application Tracker** | [BookingDetailsModal.tsx](file:///c:/Users/USER/Documents/GitHub/pradeshiya-sabha-citizen/src/features/Appointment/components/BookingDetailsModal.tsx) | Tracks administrative status steps (Dispatched -> Verifying -> Status Pending -> Confirmed/Cancelled) on a visual vertical timeline. |
| **Unified Portal Hooks** | [useAppointments.ts](file:///c:/Users/USER/Documents/GitHub/pradeshiya-sabha-citizen/src/features/Appointment/hooks/useAppointments.ts) | Custom hook encapsulating shared state including filters, wizard fields, selected bookings, category toggles, and async loading states. |
| **Database Mock API** | [appointmentService.ts](file:///c:/Users/USER/Documents/GitHub/pradeshiya-sabha-citizen/src/features/Appointment/services/appointmentService.ts) | Manages local collections of bookings, departments, officials, and facilities. Simulates asynchronous API communication via Promise resolution. |

---

## 4. CODE IMPLEMENTATION & LOGIC ANALYSIS

This section details the critical functions, state dependencies, and architectural logic applied across the Citizen Portal's codebase.

---

### ❖ [useAppointments.ts](file:///c:/Users/USER/Documents/GitHub/pradeshiya-sabha-citizen/src/features/Appointment/hooks/useAppointments.ts)
This custom hook serves as the core state-controller, maintaining the reactive data states and exposing mutation callbacks to presentation components.

#### Functions & Logical Triggers:

- `loadData` (called inside `useEffect`)
  - **Description:** Runs on component mount. Asynchronously gathers bookings, departments, officials, facilities, and slot data.
  - **Reason:** Ensures that mock databases are initialized before the UI attempts to map lists, preventing "undefined" property errors during render.

- `filteredOfficials` (Derived State)
  - **Description:** Filters the list of officials dynamically based on `selectedDept.id`.
  - **Reason:** Guarantees that citizens can only book appointments with officers assigned to the selected municipal department.

- `filteredFacilities` (Derived State)
  - **Description:** Computes matching facilities using case-insensitive search queries (matching title/subtitle) and checking membership within `selectedCategories`.
  - **Reason:** Supports real-time filtering, enabling users to locate venues (e.g. Event Halls) or machinery quickly.

- `handleCategoryToggle(category)`
  - **Description:** Toggles the selection state of a category string in the active filters list.
  - **Reason:** Enables multi-category search selections (e.g. searching both sports grounds and public parks simultaneously).

- `handleClearFilters()`
  - **Description:** Resets the search text, empty category arrays, sets default capacity values, and empties date strings.
  - **Reason:** Restores the facility list view to its complete, unfiltered state in a single click.

- `startNewBooking()`
  - **Description:** Resets the appointment scheduler wizard to step 1 and clears inputs (purpose, dates, officials). Then directs the user to the `schedule` tab.
  - **Reason:** Ensures a clean user interface when initiating a new booking, avoiding remnants from previous forms.

- `handleRequestAppointmentSubmit()`
  - **Description:** Checks if `selectedDept`, `selectedOfficial`, `selectedTimeSlot`, and `purpose` are defined. Shows validation alerts or opens the confirmation modal.
  - **Reason:** Prevents submission of incomplete appointment requests, maintaining database formatting.

- `confirmNewBooking()`
  - **Description:** Wraps active scheduler wizard details into a booking structure, calls the backend creator service, prepends the new record to `bookingsList`, and updates the tab to `bookings`.
  - **Reason:** Finalizes the appointment creation lifecycle, moving the request from a working state to a permanent record.

- `handleCancelBooking(id)`
  - **Description:** Invokes a native browser confirmation dialogue, then triggers the cancellation service callback to modify the target record's status.
  - **Reason:** Allows citizens to retract pending requests, liberating scheduled time slots or facility capacities for other users.

- `openBookingDetails(booking)`
  - **Description:** Sets `selectedBookingDetails` and toggles the visibility state of the detail modal.
  - **Reason:** Launches the timeline tracking view for a specific historical record.

---

### ❖ [Appointment.tsx](file:///c:/Users/USER/Documents/GitHub/pradeshiya-sabha-citizen/src/features/Appointment/Appointment.tsx)
The orchestrator component that handles routing, loading overlays, tab layouts, and mounts specific views based on tab navigation.

#### Functions & Logical Triggers:

- `useEffect` (Route Synchronization)
  - **Description:** Intercepts URL path configurations and searches for `tab` query parameters (`?tab=overview`). Updates `activeTab` accordingly.
  - **Reason:** Synchronizes browser navigation history and external redirects (e.g. `/reservations` links) with the internal react tab state.

- `handleFacilityReserve(facility)`
  - **Description:** Prompts a direct reservation check window and posts a direct mock facility booking containing default mock durations and amenities.
  - **Reason:** Provides a quick shortcut route for simple testing or direct bookings from general layouts without complex wizards.

---

### ❖ [ReserveFacility.tsx](file:///c:/Users/USER/Documents/GitHub/pradeshiya-sabha-citizen/src/features/Appointment/components/ReserveFacility.tsx)
A comprehensive component managing facility browsing, calendar-based slot booking, and detailed data forms for public reservations.

#### Functions & Logical Triggers:

- `getAvailabilityForDay(year, month, day)`
  - **Description:** Evaluates the day of the week to return slot statuses (`unavailable` on Sundays, `partially` on Mon/Wed/Fri, and `fully` on Tue/Thu/Sat).
  - **Reason:** Simulates live facility scheduling constraints realistically, ensuring citizens only select days with operational capacity.

- `handleStartBooking(facility)`
  - **Description:** Associates a facility with `selectedFacility`, defaults date configurations, and transitions `wizardStep` to `datetime`.
  - **Reason:** Transitions the interface from a search catalog into a structured booking application.

- `handleNextStep()`
  - **Description:** Validates that a date and time slot have been selected before allowing page transitions to the registration form.
  - **Reason:** Prevents moving to forms without first securing an available slot.

- `handleMockUpload()`
  - **Description:** Simulates file attachments (e.g. death registries, event layouts), setting mock file metadata into the local state.
  - **Reason:** Mimics document uploads to verify the document processing logic.

- `handleSubmitBooking()`
  - **Description:** Conducts front-end validation (applicant fields, relationship checks, cause of death details, inquest verdicts, or declaration toggles) and appends errors. If valid, triggers `onReserve` and clears state variables.
  - **Reason:** Enforces correctness of legally required details (such as death certificates for crematoriums) before sending data to the server.

- `handlePrevMonth()` / `handleNextMonth()`
  - **Description:** Increments or decrements calendar navigation months.
  - **Reason:** Enables multi-month calendar navigation.

---

### ❖ [AppointmentOverview.tsx](file:///c:/Users/USER/Documents/GitHub/pradeshiya-sabha-citizen/src/features/Appointment/components/AppointmentOverview.tsx)
Displays the portal landing panel, showing quick actions and booking status snapshots.

#### Functions & Logical Triggers:

- `upcomingBookings` (Derived State)
  - **Description:** Extracts bookings categorized as `CONFIRMED` or `RESERVED` from the main list.
  - **Reason:** Prevents cluttering the overview card with pending or cancelled requests, showing only active schedules.

---

### ❖ [BookingDetailsModal.tsx](file:///c:/Users/USER/Documents/GitHub/pradeshiya-sabha-citizen/src/features/Appointment/components/BookingDetailsModal.tsx)
Shows the details of a booking and maps its progress state on an interactive timeline.

#### Functions & Logical Triggers:

- `steps` (Timeline Constructor)
  - **Description:** Assembles a 4-step vertical progress timeline showing Dispatch, Verification, Review, and Approval/Cancellation status.
  - **Reason:** Gives citizens complete visibility into administrative review processes.

- `downloadSlip` (Imported click trigger)
  - **Description:** Invokes the PDF slip printing routine using metadata from the selected booking.
  - **Reason:** Provides the citizen with physical/digital proof of their booking.

---

### ❖ [appointmentService.ts](file:///c:/Users/USER/Documents/GitHub/pradeshiya-sabha-citizen/src/features/Appointment/services/appointmentService.ts)
A mock database service managing records in local memory.

#### Functions & Logical Triggers:

- `getBookings()`, `getDepartments()`, `getOfficials()`, `getFacilities()`, `getTimeSlots()`
  - **Description:** Wraps database query operations inside promise resolution wrappers.
  - **Reason:** Simulates network latencies to ensure visual loading indicators function correctly.

- `createBooking(newBooking)`
  - **Description:** Appends default attributes (Unique ID, Status = `PENDING`), pushes the object to the database list, and returns the created record.
  - **Reason:** Updates the mock database in-memory store.

- `cancelBooking(id)`
  - **Description:** Identifies the target record, updates the status value to `CANCELLED`, and logs the cancellation date.
  - **Reason:** Records request cancellation logs securely inside the dataset.

---

## 5. CONCLUSION

The **Citizen Appointment & Facility Reservation Portal** represents a vital upgrade in digitizing the citizen-facing services of the Pradeshiya Sabha. By transitioning from offline, paper-based workflows to a structured web application, the portal establishes:
1. **Reduced Overhead:** Citizens secure appointments and reserve facilities instantly, eliminating travel and queue wait times.
2. **Enhanced Administrative Workflow:** Council coordinators receive structured booking forms, including digitized copies of verification documents (deeds, death certificates), allowing for faster processing.
3. **Accountability:** Visual progress timelines and downloadable booking slips reassure citizens that their applications are being processed fairly.

The modern software design guarantees that this system is robust, easy to navigate, and ready for integration with production backend APIs.
