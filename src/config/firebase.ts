import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDmUxA8soHSoKcta6HEGoHK4TfHa3r1TiI",
  authDomain: "pegma-f9f17.firebaseapp.com",
  projectId: "pegma-f9f17",
  storageBucket: "pegma-f9f17.firebasestorage.app",
  messagingSenderId: "234382292507",
  appId: "1:234382292507:web:a5f2c3a2f1ef465d43eabe",
  measurementId: "G-T4FVRN9M7N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services with error handling
export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize Analytics only if supported (prevents SSR issues)
export const analytics = async () => {
  if (await isSupported()) {
    return getAnalytics(app);
  }
  return null;
};

export default app;