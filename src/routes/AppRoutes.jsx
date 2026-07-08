import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import AuthPortal from '../pages/Auth/AuthPortal';
import CitizenLayout from '../layouts/CitizenLayout';
import LanguageSelectionPortal from '../components/LanguageSelection/LanguageSelectionPortal';
import Home from '../pages/Home/Home';
import Services from '../pages/Services/Services';
import Applications from '../pages/Applications/Applications';
import LetterRequests from '../features/LetterRequests/LetterRequests';
import Appointment from '../features/Appointment/Appointment';
import CitizenComplaint from '../features/citizen-complaint/CitizenComplaint';   

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const { hasSelectedLanguage } = useLanguage();
  if (!isLoggedIn) {
    return (
      <CitizenLayout>
        <AuthPortal />
      </CitizenLayout>
    );
  }
  if (!hasSelectedLanguage) {
    return (
      <CitizenLayout>
        <LanguageSelectionPortal />
      </CitizenLayout>
    );
  }
  return (
    <CitizenLayout>
      {children}
    </CitizenLayout>
  );
};

const AppRoutes = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={
            isLoggedIn ? (
              <Navigate to="/" replace />
            ) : (
              <CitizenLayout>
                <AuthPortal />
              </CitizenLayout>
            )
          } 
        />
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/services" 
          element={
            <ProtectedRoute>
              <Services />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/appointments" 
          element={
            <ProtectedRoute>
              <Appointment />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/applications" 
          element={
            <ProtectedRoute>
              <Applications />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/letters" 
          element={
            <ProtectedRoute>
              <LetterRequests />
          path="/appointments" 
          element={
            <ProtectedRoute>
              <Appointment />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/reservations" 
          element={
            <ProtectedRoute>
              <Appointment />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/complaints" 
          element={
            <ProtectedRoute>
              <CitizenComplaint />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="*" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
