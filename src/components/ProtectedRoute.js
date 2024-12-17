import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, isAuthorized } = useAuth();
  const location = useLocation();

  if (!user) {
    // Redirect to login page if not logged in
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Allow access to My Account page for all authenticated users
  if (location.pathname === '/my-account') {
    return children;
  }

  // For other protected routes (like admin), check authorization
  if (!isAuthorized()) {
    // Redirect to home page if not authorized
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
