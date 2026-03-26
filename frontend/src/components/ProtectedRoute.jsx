import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Wraps routes that require authentication.
 * Redirects to "/" and optionally triggers the login modal if no token exists.
 */
export default function ProtectedRoute({ children, onLoginClick }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background-light dark:bg-background-dark">
        <span className="material-icons-outlined animate-spin text-4xl text-primary">hourglass_empty</span>
      </div>
    );
  }

  if (!user) {
    // Trigger login modal if handler is available
    if (onLoginClick) setTimeout(onLoginClick, 100);
    return <Navigate to="/" replace />;
  }

  return children;
}
