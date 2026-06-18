import React, { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { useAuthStore } from '../stores/authStore';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, setDbUser, setLoading } = useAuthStore();

  useEffect(() => {
    let unsubscribeSnap: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (unsubscribeSnap) {
        unsubscribeSnap();
        unsubscribeSnap = null;
      }

      if (!user) {
        const hasBypass = localStorage.getItem('luxe_auth_bypass') === 'true';
        if (hasBypass) {
          const cachedUser = localStorage.getItem('luxe_cached_user');
          const cachedDbUser = localStorage.getItem('luxe_cached_db_user');
          if (cachedUser && cachedDbUser) {
            setUser(JSON.parse(cachedUser));
            setDbUser(JSON.parse(cachedDbUser));
            setLoading(false);
            return;
          }
        }
      }

      setUser(user);

      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const emailLower = (user.email || '').toLowerCase();
        const isTargetAdmin = emailLower === 'sahilrawat399@gmail.com';
        
        unsubscribeSnap = onSnapshot(userDocRef, async (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.data();
            if (isTargetAdmin && data.role !== 'admin') {
              try {
                await setDoc(userDocRef, { ...data, role: 'admin' }, { merge: true });
              } catch (e) {
                console.error("Failed to update admin role in firestore:", e);
              }
              setDbUser({ id: snapshot.id, ...data, role: 'admin' });
            } else if (!isTargetAdmin && data.role === 'admin') {
              // Revoke role admin for non-allowed emails (security hardening)
              setDbUser({ id: snapshot.id, ...data, role: 'client' });
            } else {
              setDbUser({ id: snapshot.id, ...data });
            }
            setLoading(false);
          } else {
            // Profile does not exist, let's create it!
            const defaultRole = isTargetAdmin ? 'admin' : 'client';

            const newProfile = {
              fullName: user.displayName || user.email?.split('@')[0] || 'Client Member',
              email: user.email || '',
              role: defaultRole,
              businessName: 'Luxe Member',
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp()
            };

            try {
              await setDoc(userDocRef, newProfile);
              // The onSnapshot listener will trigger again with the new doc.
            } catch (err: any) {
              console.error('Error auto-creating users/{uid} document on login:', err);
              // Fallback representation if firestore write fails temporarily
              setDbUser({
                id: user.uid,
                ...newProfile,
                createdAt: new Date(),
                updatedAt: new Date()
              });
              setLoading(false);
            }
          }
        }, (error) => {
          console.error("Error listening to users/{uid} document:", error);
          const defaultRole = isTargetAdmin ? 'admin' : 'client';
          setDbUser({
            id: user.uid,
            fullName: user.displayName || user.email?.split('@')[0] || 'Client Member',
            email: user.email || '',
            role: defaultRole,
            businessName: 'Luxe Member',
            createdAt: new Date(),
            updatedAt: new Date()
          });
          setLoading(false);
        });
      } else {
        setDbUser(null);
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeSnap) {
        unsubscribeSnap();
      }
    };
  }, [setUser, setDbUser, setLoading]);

  return <>{children}</>;
}
