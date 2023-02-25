// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTQW0vNOI-TMwQRNyH2w4CycoCtHgS0S4",
  authDomain: "tododb-1d0e3.firebaseapp.com",
  projectId: "tododb-1d0e3",
  storageBucket: "tododb-1d0e3.appspot.com",
  messagingSenderId: "996328366221",
  appId: "1:996328366221:web:1b2b8477289394615982c4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();