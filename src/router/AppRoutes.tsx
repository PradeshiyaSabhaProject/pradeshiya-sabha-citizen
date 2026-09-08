import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Services from "../pages/Services/Services";
import Applications from "../pages/Applications/Applications";
import Payments from "../features/Payments/Payments";
import PaymentPage from "../pages/Payment/PaymentPage";
import MiscellaneousPage from "../pages/Miscellaneous/MiscellaneousPage";
import ServiceForm from "../pages/Service/ServiceForm";
import Appointment from "../features/Appointment/Appointment";
import CitizenComplaint from "../features/citizen-complaint/CitizenComplaint";
import LetterRequests from "../features/LetterRequests/LetterRequests";
import FacilityBooking from "../features/FacilityBooking/FacilityBooking";
import Profile from "../pages/Profile/Profile";
import AuthPortal from "../pages/Auth/AuthPortal";
import About from "../pages/About/About";
import NotFound from "../pages/NotFound/NotFound";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Home / Dashboard */}
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Home />} />
      <Route path="/home" element={<Home />} />

      {/* Services */}
      <Route path="/services" element={<Services />} />

      {/* Applications */}
      <Route path="/applications" element={<Applications />} />

      {/* Citizen Payments */}
      <Route path="/payments" element={<Payments />} />
      <Route path="/payments/portal" element={<PaymentPage />} />
      <Route path="/payments/miscellaneous" element={<MiscellaneousPage />} />
      <Route path="/payments/miscellaneous/:service" element={<ServiceForm />} />

      {/* Appointments & Reservations */}
      <Route path="/appointments" element={<Appointment />} />

      {/* Citizen Complaints */}
      <Route path="/complaints" element={<CitizenComplaint />} />

      {/* Official Letters */}
      <Route path="/letters" element={<LetterRequests />} />

      {/* Facility Bookings */}
      <Route path="/facility-booking" element={<FacilityBooking />} />
      <Route path="/facilities" element={<FacilityBooking />} />

      {/* User Profile */}
      <Route path="/profile" element={<Profile />} />

      {/* Auth */}
      <Route path="/auth" element={<AuthPortal />} />
      <Route path="/login" element={<AuthPortal />} />
      <Route path="/register" element={<AuthPortal />} />

      {/* About */}
      <Route path="/about" element={<About />} />

      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;