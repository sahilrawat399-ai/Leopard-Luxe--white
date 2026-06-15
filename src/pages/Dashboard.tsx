import { useAuthStore } from '../stores/authStore';
import { Navigate } from 'react-router-dom';

export function Dashboard() {
  const { dbUser } = useAuthStore();

  if (dbUser?.role === 'admin') {
    return <Navigate to="/admin" />;
  }

  return <Navigate to="/portal" />;
}
