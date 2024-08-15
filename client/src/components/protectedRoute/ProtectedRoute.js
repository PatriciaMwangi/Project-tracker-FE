import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser, selectIsAdmin } from '../../features/auth/AuthSlice';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const user = useSelector(selectCurrentUser);
  const isAdmin = useSelector(selectIsAdmin);

  if (!user) {
    return <Navigate to="/signin" replace />; // Redirect to login if not authenticated
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/home" replace />; // Redirect to home if not admin
  }

  return children; // Render the route if authenticated (and admin if required)
};

export default ProtectedRoute;
