import { Routes, Route, Navigate } from "react-router-dom";
import PaymentPage from "../pages/Payment/PaymentPage";
import MiscellaneousPage from "../pages/Miscellaneous/MiscellaneousPage";
import ServiceForm from "../pages/Service/ServiceForm";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Redirect root to /payments */}
      <Route path="/" element={<Navigate to="/payments" replace />} />

      {/* Payment categories */}
      <Route path="/payments" element={<PaymentPage />} />

      {/* Miscellaneous services listing */}
      <Route path="/payments/miscellaneous" element={<MiscellaneousPage />} />

      {/* Individual service form */}
      <Route
        path="/payments/miscellaneous/:service"
        element={<ServiceForm />}
      />

      {/* Catch-all – redirect unknown paths to /payments */}
      <Route path="*" element={<Navigate to="/payments" replace />} />
    </Routes>
  );
};

export default AppRoutes;