// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.3.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.3.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyB_EHZIUQAGcHgeYPOrfInGsiKmJQJhzH4",
  authDomain: "buybot-a7c35.firebaseapp.com",
  projectId: "buybot-a7c35",
  messagingSenderId: "987316158607",
  appId: "1:987316158607:web:65432d8899163056dfb0fa",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: payload.notification.icon || '/logo.png'
  });
});
