import React, { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { useAuthStore } from '../stores/authStore';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, setDbUser, setLoading } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        // Fetch or create user document
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);
        
        if (userDoc.exists()) {
          setDbUser(userDoc.data());
        } else {
            // New user signed up mostly via Google if not going through custom signup.
            // But we will handle custom signup where we create the doc before/after.
            // Lets just do generic if missing
            const newUser = {
                fullName: user.displayName || 'New User',
                email: user.email || 'user@example.com',
                role: 'client',
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            };
            try {
                await setDoc(userRef, newUser);
                setDbUser(newUser);
            } catch(e) {
                console.error("Failed to create user doc", e);
            }
        }
      } else {
        setDbUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setDbUser, setLoading]);

  return <>{children}</>;
}
