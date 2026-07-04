import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthPortal from '../pages/Auth/AuthPortal';
import CitizenLayout from '../layouts/CitizenLayout';
import Home from '../pages/Home/Home';
import Services from '../pages/Services/Services';
import Applications from '../pages/Applications/Applications';
import Appointment from '../features/Appointment/Appointment';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    return (
      <CitizenLayout>
        <AuthPortal />
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
          path="/applications" 
          element={
            <ProtectedRoute>
              <Applications />
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
          path="/reservations" 
          element={
            <ProtectedRoute>
              <Appointment />
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
