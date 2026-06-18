import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

export function ProtectedRoute({ children, adminOnly = false }: { children: React.ReactNode, adminOnly?: boolean }) {
  const { user, dbUser, loading } = useAuthStore();

  if (loading) {
    return (
      <div className="min-h-screen bg-rich-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  const isTargetAdmin = user.email?.toLowerCase() === 'sahilrawat399@gmail.com';

  if (adminOnly && !isTargetAdmin) {
    return <Navigate to="/portal" />;
  }

  return <>{children}</>;
}
