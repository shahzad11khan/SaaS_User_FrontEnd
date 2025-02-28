// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getMessaging, onBackgroundMessage } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-messaging-sw.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
// import { getMessaging, onBackgroundMessage } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-messaging.js";

const firebaseConfig = {
  apiKey: "AIzaSyAKd6yeRAGpbmJ_kF4xCuAl165xdn5vz34",
  authDomain: "backend-450304.firebaseapp.com",
  projectId: "backend-450304",
  storageBucket: "backend-450304.firebasestorage.app",
  messagingSenderId: "530809007696",
  appId: "1:530809007696:web:b3e9fc17321eed2705eb55"
};
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// 🔔 Handle Background Messages
onBackgroundMessage(messaging, (payload) => {
  console.log("📩 Background Message Received: ", payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/firebase-logo.png", // Change to your logo
  });
});
