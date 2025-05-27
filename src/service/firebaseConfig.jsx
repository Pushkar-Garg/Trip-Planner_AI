// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDsJSGJctKZzBu22amnyWs3a3fH8izVAo",
  authDomain: "aitripplanner-3a5a3.firebaseapp.com",
  projectId: "aitripplanner-3a5a3",
  storageBucket: "aitripplanner-3a5a3.firebasestorage.app",
  messagingSenderId: "576739865632",
  appId: "1:576739865632:web:e683170717d4406e82f845",
  measurementId: "G-CNW8PH64NY"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);