// Import Firebase App and Firestore SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";

// Firebase Configuration Object
const firebaseConfig = {
    apiKey: "AIzaSyAKnz340lNdcalibDS9sgO-ovUjQoWAFF4",
    authDomain: "myapp-84790.firebaseapp.com",
    projectId: "myapp-84790",
    storageBucket: "myapp-84790.firebasestorage.app",
    messagingSenderId: "361867806209",
    appId: "1:361867806209:web:16e287a7b7d174a9782200"
  };

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Export Firestore instance for use in other files
export { db };
