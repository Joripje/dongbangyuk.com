// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// firestore
import {getFirestore} from 'firebase/firestore'

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// console.log(process.env.REACT_APP_CONFIG_APIKEY)
const firebaseConfig = {
  apiKey: REACT_APP_CONFIG_APIKEY,
  authDomain: "h-337b5.firebaseapp.com",
  databaseURL:
    "https://h-337b5-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "h-337b5",
  storageBucket: "h-337b5.appspot.com",
  messagingSenderId: "429281066716",
  appId: REACT_APP_CONFIG_APPID,
  measurementId: "G-B7HRGPWR1G",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { firebaseApp, auth, db };
