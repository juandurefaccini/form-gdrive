// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUAEA50jO4Kxjf4ipkEIhxjhVebpRdUH8",
  authDomain: "form-gdrive.firebaseapp.com",
  projectId: "form-gdrive",
  storageBucket: "form-gdrive.appspot.com",
  messagingSenderId: "8994524904",
  appId: "1:8994524904:web:8b6502323e7d19155ac35d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
