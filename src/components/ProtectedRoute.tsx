import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../state/auth';
import { UserRole } from '../../types';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string; // accepts both 'admin' and 'ADMIN'
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole) {
    // Normalise both sides to uppercase for comparison.
    // Backend returns 'ADMIN' / 'CLIENT' / 'FREELANCER'.
    // App.tsx passes 'admin' / 'client' / 'freelancer' (legacy lowercase).
    const userRole = user.role.toUpperCase();
    const required = requiredRole.toUpperCase();

    // ADMIN can access everything
    const isAdmin = userRole === 'ADMIN';
    const hasRole = userRole === required;

    if (!isAdmin && !hasRole) {
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
}
