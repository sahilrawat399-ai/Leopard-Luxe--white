import { useAuthStore } from '../stores/authStore';
import { Navigate } from 'react-router-dom';

export function Dashboard() {
  const { dbUser, user } = useAuthStore();

  const isTargetAdmin = user?.email?.toLowerCase() === 'sahilrawat399@gmail.com' || dbUser?.role === 'admin';

  if (isTargetAdmin) {
    return <Navigate to="/admin" />;
  }

  return <Navigate to="/portal" />;
}
