import { create } from 'zustand';
import { User } from 'firebase/auth';

// Safely parse cached auth session from localStorage
const getCachedUser = (): any => {
  try {
    const cached = localStorage.getItem('luxe_cached_user');
    return cached ? JSON.parse(cached) : null;
  } catch {
    return null;
  }
};

const getCachedDbUser = (): any => {
  try {
    const cached = localStorage.getItem('luxe_cached_db_user');
    return cached ? JSON.parse(cached) : null;
  } catch {
    return null;
  }
};

interface AuthState {
  user: User | null;
  dbUser: any | null; // From firestore
  loading: boolean;
  setUser: (user: User | null) => void;
  setDbUser: (dbUser: any | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => {
  const cachedUser = getCachedUser();
  const cachedDbUser = getCachedDbUser();

  return {
    user: cachedUser,
    dbUser: cachedDbUser,
    // Hydrate instantly if user context is saved, bypassing full blocking spin loader
    loading: cachedUser ? false : true,
    setUser: (user) => {
      try {
        if (user) {
          const serializedUser = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          };
          localStorage.setItem('luxe_cached_user', JSON.stringify(serializedUser));
        } else {
          localStorage.removeItem('luxe_cached_user');
        }
      } catch (err) {
        console.warn('Error archiving auth session to localStorage:', err);
      }
      set({ user });
    },
    setDbUser: (dbUser) => {
      try {
        if (dbUser) {
          localStorage.setItem('luxe_cached_db_user', JSON.stringify(dbUser));
        } else {
          localStorage.removeItem('luxe_cached_db_user');
        }
      } catch (err) {
        console.warn('Error archiving custom profile to localStorage:', err);
      }
      set({ dbUser });
    },
    setLoading: (loading) => set({ loading }),
  };
});
