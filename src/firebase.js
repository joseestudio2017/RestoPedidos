
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  "apiKey": "AIzaSyC7e74ursDijMT3zPON8RdJWx78vfIjF-E",
  "authDomain": "restopedidos-app.firebaseapp.com",
  "projectId": "restopedidos-app",
  "storageBucket": "restopedidos-app.appspot.com",
  "messagingSenderId": "106931320668",
  "appId": "1:106931320668:web:6b90290000506ad95af399"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db };
