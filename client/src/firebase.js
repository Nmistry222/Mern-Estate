// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,

  authDomain: "mern-estate-5f424.firebaseapp.com",

  projectId: "mern-estate-5f424",

  storageBucket: "mern-estate-5f424.appspot.com",

  messagingSenderId: "1034983111181",

  appId: "1:1034983111181:web:1e66726bbf2110d18c3344",

  measurementId: "G-CCVNXBYKJC"

};


// Initialize Firebase

export const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);