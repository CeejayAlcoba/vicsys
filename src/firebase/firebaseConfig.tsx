import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPNnlC5Dew1-HlCTSG8-lBegiX-aCpOms",
  authDomain: "vite-project-50340.firebaseapp.com",
  projectId: "vite-project-50340",
  storageBucket: "vite-project-50340.appspot.com",
  messagingSenderId: "1025837715431",
  appId: "1:1025837715431:web:028383b0055b5ac3fa7742",
  measurementId: "G-GT3KGXT88T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
