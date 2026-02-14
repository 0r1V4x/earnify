// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDR6FmulLTxxVUvZEcSDGeutHst-H__duY",
  authDomain: "earnify-money.firebaseapp.com",
  projectId: "earnify-money",
  storageBucket: "earnify-money.firebasestorage.app",
  messagingSenderId: "656847837190",
  appId: "1:656847837190:web:519a109fef9ef402e14b87",
  measurementId: "G-5BBJL7679Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
