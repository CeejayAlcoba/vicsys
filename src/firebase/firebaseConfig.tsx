import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { getStorage } from "firebase/storage";
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
export const storage = getStorage(app);
export const messaging = getMessaging(app);

export const requestForToken = () => {
  return getToken(messaging, {
    vapidKey:
      "BLkKHqJqyq246VxcyKz702XVwupcBRlU3iNi_6eSESeogln571ROZXnQpyixERlnf9nyRviYeHNlNMp1uYHY-5o",
  })
    .then((currentToken) => {
      if (currentToken) {
        return currentToken;
      } else {
        alert(
          "No registration token available. Request permission to generate one."
        );
        return null;
      }
    })
    .catch((err) => {
      alert("An error occurred while retrieving token - " + err);
      return null;
    });
};

onMessage(messaging, ({ notification }) => {
  new Notification(notification?.title ?? "s", {
    body: notification?.body,
    icon: notification?.icon,
  });
});
