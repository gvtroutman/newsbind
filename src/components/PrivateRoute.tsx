import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
  guestAllowed?: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, guestAllowed = false }) => {
  const { currentUser, isGuest } = useAuth();

  if (currentUser || (guestAllowed && isGuest)) {
    return <>{children}</>;
  }

  return <Navigate to="/login" />;
};

export default PrivateRoute;