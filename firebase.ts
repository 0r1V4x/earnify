// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhM8LtJKXnSI9nsJLWs1Dpj9WBpEr8B_I",
  authDomain: "coinflow-a5496.firebaseapp.com",
  projectId: "coinflow-a5496",
  storageBucket: "coinflow-a5496.firebasestorage.app",
  messagingSenderId: "654252221891",
  appId: "1:654252221891:web:1992c59199780625930976",
  measurementId: "G-6MHV1R3GPN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
