// Import the functions you need from the SDKs you need

import { initializeApp, getApp, getApps } from "firebase/app";
import  {getAuth} from "firebase-admin/auth";
import  {getFirestore} from "firebase-admin/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA6gZLK5kIPaFNWhrWKn0a5HcwWngwEHsE",
    authDomain: "interview-practice-app-a5d24.firebaseapp.com",
    projectId: "interview-practice-app-a5d24",
    storageBucket: "interview-practice-app-a5d24.firebasestorage.app",
    messagingSenderId: "888187969823",
    appId: "1:888187969823:web:a9120bbb8a98497d1a502a",
    measurementId: "G-KV7F5WRM2C"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
export const auth:  = getAuth(app);
export const db = getFirestore(app);