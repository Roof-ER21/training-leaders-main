/**
 * Firebase Configuration
 * Initialize Firebase app and export services
 */

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || '',
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.REACT_APP_FIREBASE_APP_ID || '',
};

// Check if Firebase is configured
const isFirebaseConfigured = Object.values(firebaseConfig).every(
  (value) => value !== ''
);

// Initialize Firebase
let app: any = null;
let auth: any = null;
let db: any = null;
let functions: any = null;

if (isFirebaseConfigured) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  functions = getFunctions(app);

  console.log('[Firebase] Initialized successfully');
} else {
  // Silent mode - app works perfectly in mock mode without Firebase
  // Uncomment below for debugging:
  // console.info('[Firebase] Running in mock mode (Firebase not configured)');
}

export { app, auth, db, functions, isFirebaseConfigured };
