import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

import axios from "axios";

// 🔥 Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKd6yeRAGpbmJ_kF4xCuAl165xdn5vz34",
  authDomain: "backend-450304.firebaseapp.com",
  projectId: "backend-450304",
  storageBucket: "backend-450304.firebasestorage.app",
  messagingSenderId: "530809007696",
  appId: "1:530809007696:web:b3e9fc17321eed2705eb55",
};

// 🔥 Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

const FirebaseNotification = () => {
  const [fcmToken, setFcmToken] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    registerServiceWorker();
    requestPermission();

    // 🎯 Handle Foreground Notifications
    onMessage(messaging, (payload) => {
      console.log("📩 Foreground Message received:", payload);
      setNotification({
        title: payload.notification?.title || "Notification",
        body: payload.notification?.body || "You have a new message.",
      });
    });
  }, []);

  async function registerServiceWorker() {
    if ("serviceWorker" in navigator) {
      try {
        const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js", {
          type: "module", // ✅ Ensure correct script type
        });
        console.log("✅ Service Worker Registered:", registration);
      } catch (error) {
        console.error("❌ Service Worker Registration Failed:", error);
      }
    }
  }

  async function requestPermission() {
    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") throw new Error("Permission not granted");

      const token = await getToken(messaging, {
        vapidKey: "BOXKKIurvZdRzxPnSik7saJXYY1q1vzpVrfQiW0g8FM2QwBula2y0WGNtsttbZ0Guv8lfoQeWZAu1InVIO5HbLw",
        serviceWorkerRegistration: await navigator.serviceWorker.ready, // Ensure Service Worker is Ready
      });

      console.log("📲 FCM Token:", token);
      setFcmToken(token);
       // 🔥 Send FCM Token to Backend API
      //  await sendTokenToBackend(token);
    } catch (error) {
      console.error("❌ Error getting FCM token:", error);
    }
  }

  // async function sendTokenToBackend() {
  //   try {
  //     const response = await axios.post("http://localhost:5000/v1/api/notification/send-notification", {
  //       fcmToken: fcmToken,
  //       title: "Order Accepted",
  //       body: "Your order has been accepted!",
  //     });
  
  //     console.log("✅ FCM Token stored successfully:", response.data);
  //   } catch (error) {
  //     console.error("❌ Error sending FCM token to backend:", error.response ? error.response.data : error.message);
  //   }
  // }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Firebase Cloud Messaging</h1>
      <button
        onClick={requestPermission}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow-md transition"
      >
        Get FCM Token
      </button>
      <button
        onClick={sendTokenToBackend}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow-md transition"
      >
        Send token to backend
      </button>

      {/* 🔥 Display FCM Token */}
      {fcmToken && (
        <p className="mt-4 p-3 bg-white shadow-md rounded-md text-gray-700 text-sm max-w-md break-all">
          <strong>FCM Token:</strong> {fcmToken}
        </p>
      )}

      {/* 🔥 Popup Notification */}
      {notification && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
            <h2 className="text-lg font-semibold text-gray-900">{notification.title}</h2>
            <p className="text-gray-700 mt-2">{notification.body}</p>
            <button
              onClick={() => setNotification(null)}
              className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded shadow-md transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FirebaseNotification;
