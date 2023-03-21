// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlzrcXQlOvoL7HIU8k4lJRgQnR3qe6H7k",
  authDomain: "verify-c5efb.firebaseapp.com",
  projectId: "verify-c5efb",
  storageBucket: "verify-c5efb.appspot.com",
  messagingSenderId: "337216048761",
  appId: "1:337216048761:web:1aa1bfbfd3ef97d9eb4ea8",
  measurementId: "G-F2E1R164ME"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
