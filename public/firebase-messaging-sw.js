importScripts('https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/10.3.0/firebase-messaging.js');

firebase.initializeApp({

  messagingSenderId: "96397940659",
 
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message: ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/path/to/icon.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});