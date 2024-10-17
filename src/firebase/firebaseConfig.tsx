import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAcEKTyd4_4ztNnAJhm-qhJK4A8IB0Up0",
  authDomain: "vicsys-a6039.firebaseapp.com",
  projectId: "vicsys-a6039",
  storageBucket: "vicsys-a6039.appspot.com",
  messagingSenderId: "96397940659",
  appId: "1:96397940659:web:e922846d71a8eb93d4ddc6",
  measurementId: "G-6Q9R8JMF0H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
