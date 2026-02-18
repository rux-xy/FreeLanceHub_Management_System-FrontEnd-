import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
}
export function ProtectedRoute({
  children,
  requiredRole
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a1a]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
      </div>);

  }
  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{
          from: location
        }}
        replace />);


  }
  if (requiredRole && user.role !== requiredRole) {
    // Redirect to appropriate dashboard based on actual role
    if (user.role === 'admin') return <Navigate to="/admin" replace />;
    if (user.role === 'client')
    return <Navigate to="/client-dashboard" replace />;
    if (user.role === 'freelancer')
    return <Navigate to="/freelancer-dashboard" replace />;
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}