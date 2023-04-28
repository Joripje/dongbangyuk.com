// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHxDUzN2biYkuSKL8_HbSItWHEBq9SEig",
  authDomain: "h-337b5.firebaseapp.com",
  databaseURL:
    "https://h-337b5-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "h-337b5",
  storageBucket: "h-337b5.appspot.com",
  messagingSenderId: "429281066716",
  appId: "1:429281066716:web:fe55ad5c0cfda8f3a27e19",
  measurementId: "G-B7HRGPWR1G",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = getAuth();

export { firebaseApp, auth };
