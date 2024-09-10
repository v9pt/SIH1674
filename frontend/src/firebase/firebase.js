// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsz49rWgOFLu16gkqkSNY603JKjXlGwxw",
  authDomain: "sihden.firebaseapp.com",
  projectId: "sihden",
  storageBucket: "sihden.appspot.com",
  messagingSenderId: "50495297250",
  appId: "1:50495297250:web:9f8d4e42290e873ea630bb",
  measurementId: "G-WQE0QHHNB4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
const analytics = getAnalytics(app);
