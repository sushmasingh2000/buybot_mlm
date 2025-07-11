// src/firebase.js
import { initializeApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported,
} from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyB_EHZIUQAGcHgeYPOrfInGsiKmJQJhzH4",
  authDomain: "buybot-a7c35.firebaseapp.com",
  projectId: "buybot-a7c35",
  storageBucket: "buybot-a7c35.appspot.com",
  messagingSenderId: "987316158607",
  appId: "1:987316158607:web:65432d8899163056dfb0fa",
  measurementId: "G-TC2SPYT991",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase messaging
const messaging = getMessaging(app);

// Export everything needed
export { messaging, getToken, onMessage, isSupported };
