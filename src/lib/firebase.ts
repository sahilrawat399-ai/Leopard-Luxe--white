import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBomgHyZyLtHVShU8fD28Vkfj0BcmF_J9A",
  authDomain: "leopard-luxe-data-base.firebaseapp.com",
  projectId: "leopard-luxe-data-base",
  storageBucket: "leopard-luxe-data-base.firebasestorage.app",
  messagingSenderId: "550283557139",
  appId: "1:550283557139:web:8c36aa335d83ff488242e6",
  measurementId: "G-L211FBE6RT"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Enable Firestore multi-tab client-side offline persistence
try {
  enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition') {
      console.warn('Firestore persistence failed-precondition: multiple tabs open');
    } else if (err.code === 'unimplemented') {
      console.warn('Firestore persistence unimplemented in browser');
    }
  });
} catch (e) {
  console.warn('Could not initialize offline persistence:', e);
}

export const auth = getAuth(app);
export const storage = getStorage(app);
