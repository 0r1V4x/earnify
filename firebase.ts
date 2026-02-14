// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRtu3m76E_iMzt4qxT_ZA6ePwDZr6PVPM",
  authDomain: "earnify-0.firebaseapp.com",
  projectId: "earnify-0",
  storageBucket: "earnify-0.firebasestorage.app",
  messagingSenderId: "939562179015",
  appId: "1:939562179015:web:50af680cc0b2a52041e1e2",
  measurementId: "G-2K89P4XX6F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
