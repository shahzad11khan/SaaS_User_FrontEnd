// import { useEffect, useState } from "react";
// import { initializeApp } from "firebase/app";
// import { getMessaging, getToken, onMessage } from "firebase/messaging";
// import { useSelector } from "react-redux";
// import { jwtDecode } from "jwt-decode";
// import axios from "axios";
// import { BASE_URL } from "../components/apis/BaseUrl";

// // 🔥 Firebase Configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAKd6yeRAGpbmJ_kF4xCuAl165xdn5vz34",
//   authDomain: "backend-450304.firebaseapp.com",
//   projectId: "backend-450304",
//   storageBucket: "backend-450304.firebasestorage.app",
//   messagingSenderId: "530809007696",
//   appId: "1:530809007696:web:b3e9fc17321eed2705eb55",
// };

// // 🔥 Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const messaging = getMessaging(app);

// const FirebaseNotification = () => {
//   const { token: userToken } = useSelector((state) => state.auth);
//   const [subscribedTopic, setSubscribedTopic] = useState(localStorage.getItem("subscribedTopic") || null);

//   useEffect(() => {
//     registerServiceWorker();
//     requestPermission();

//     // 🎯 Handle Foreground Notifications
//     onMessage(messaging, (payload) => {
//       console.log("📩 Foreground Message received:", payload);
//     });
//   }, []);

//   async function registerServiceWorker() {
//     if ("serviceWorker" in navigator) {
//       try {
//         const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js", {
//           type: "module",
//         });
//         console.log("✅ Service Worker Registered:", registration);
//       } catch (error) {
//         console.error("❌ Service Worker Registration Failed:", error);
//       }
//     }
//   }

//   const getFCMToken = async () => {
//     try {
//       const token = await getToken(messaging, {
//         vapidKey: "BOXKKIurvZdRzxPnSik7saJXYY1q1vzpVrfQiW0g8FM2QwBula2y0WGNtsttbZ0Guv8lfoQeWZAu1InVIO5HbLw",
//         serviceWorkerRegistration: await navigator.serviceWorker.ready,
//       });
//       console.log("FCM Token:", token);
//       return token;
//     } catch (error) {
//       console.error("Error getting FCM token:", error);
//     }
//   };

//   async function requestPermission() {
//     try {
//       const permission = await Notification.requestPermission();
//       if (permission !== "granted") throw new Error("Permission not granted");

//       let token = await getFCMToken();
//       let { userId } = jwtDecode(userToken);

//       console.log("📲 FCM Token:", token);
//       await sendTokenToBackend(token, userId);
//     } catch (error) {
//       console.error("❌ Error getting FCM token:", error);
//     }
//   }

//   async function sendTokenToBackend(fcmToken, userId) {
//     try {
//       // const response = await axios.post(`${BASE_URL}/v1/api/notification/store-user-fcmToken-&-userId`, {
//       const response = await axios.post(`http://localhost:5000/v1/api/notification/store-user-fcmToken-&-userId`, {
//         fcmToken: fcmToken,
//         userId: userId,
//       });

//       console.log("✅ FCM Token stored successfully:", response.data);
//     } catch (error) {
//       console.error("❌ Error sending FCM token to backend:", error.response ? error.response.data : error.message);
//     }
//   }
  
//   const subscribeToTopic = async (topic) => {
//     try {
//       if (subscribedTopic) return; // Prevent re-subscribing

//       const token = await getFCMToken();
//       // let response = await axios.post(`${BASE_URL}/v1/api/notification/subscribe`, { token, topic });
//       let response = await axios.post(`http://localhost:5000/v1/api/notification/subscribe`, { token, topic });
      
//       console.log("✅ Subscribed to:", topic, response);
//       setSubscribedTopic(topic);
//       localStorage.setItem("subscribedTopic", topic);
//     } catch (error) {
//       console.log("❌ Subscription Error:", error);
//     }
//   };
//   console.log(subscribedTopic)

//   return (
//     !subscribedTopic && (
//       <div className="fixed flex flex-col items-center outfit font-semibold justify-between z-50 top-[37%] left-[37%] bg-white  w-[25%] py-10 px-8 rounded-2xl">
//         <i className="fa-solid fa-xmark absolute top-5 cursor-pointer right-5"></i>        
//         <h1 className="text-[24px] w-[60%] ">Subscribe for latest updates</h1>
//         <div className="flex justify-center gap-5 mt-2">
//           <button onClick={() => subscribeToTopic("flash-sale")} className="border border-black py-2 px-3 rounded-full">
//             Flash Sale
//           </button>
//           <button onClick={() => subscribeToTopic("new-product")} className="border border-black py-2 px-3 rounded-full">
//             New Product
//           </button>
//         </div>
//       </div>
//     )
//   );
// };

// export default FirebaseNotification;


import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { BASE_URL } from "../components/apis/BaseUrl";

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
  const { token: userToken } = useSelector((state) => state.auth);
  const [subscribedTopic, setSubscribedTopic] = useState(localStorage.getItem("subscribedTopic") || null);
  const [showPopup, setShowPopup] = useState(!subscribedTopic); // Only show popup if not subscribed

  useEffect(() => {
    registerServiceWorker();
    requestPermission();

    // 🎯 Handle Foreground Notifications
    onMessage(messaging, (payload) => {
      console.log("📩 Foreground Message received:", payload);
    });
  }, []);

  async function registerServiceWorker() {
    if ("serviceWorker" in navigator) {
      try {
        const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js", {
          type: "module",
        });
        console.log("✅ Service Worker Registered:", registration);
      } catch (error) {
        console.error("❌ Service Worker Registration Failed:", error);
      }
    }
  }

  const getFCMToken = async () => {
    try {
      const token = await getToken(messaging, {
        vapidKey: "BOXKKIurvZdRzxPnSik7saJXYY1q1vzpVrfQiW0g8FM2QwBula2y0WGNtsttbZ0Guv8lfoQeWZAu1InVIO5HbLw",
        serviceWorkerRegistration: await navigator.serviceWorker.ready,
      });
      console.log("FCM Token:", token);
      return token;
    } catch (error) {
      console.error("Error getting FCM token:", error);
    }
  };

  async function requestPermission() {
    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") throw new Error("Permission not granted");

      let token = await getFCMToken();
      let { userId } = jwtDecode(userToken);

      console.log("📲 FCM Token:", token);
      await sendTokenToBackend(token, userId);
    } catch (error) {
      console.error("❌ Error getting FCM token:", error);
    }
  }

  async function sendTokenToBackend(fcmToken, userId) {
    try {
      const response = await axios.post(`${BASE_URL}/v1/api/notification/store-user-fcmToken-&-userId`, {
        fcmToken: fcmToken,
        userId: userId,
      });

      console.log("✅ FCM Token stored successfully:", response.data);
    } catch (error) {
      console.error("❌ Error sending FCM token to backend:", error.response ? error.response.data : error.message);
    }
  }

  const subscribeToTopic = async (topic) => {
    try {
      if (subscribedTopic) return; // Prevent re-subscribing

      const token = await getFCMToken();
      let response = await axios.post(`${BASE_URL}/v1/api/notification/subscribe`, { token, topic });

      console.log("✅ Subscribed to:", topic, response);
      setSubscribedTopic(topic);
      localStorage.setItem("subscribedTopic", topic);
      setShowPopup(false); // Hide popup after subscribing
    } catch (error) {
      console.log("❌ Subscription Error:", error);
    }
  };

  return (
    showPopup && !subscribedTopic && ( // Only render if showPopup is true
      <div className="fixed flex flex-col items-center outfit font-semibold justify-between z-50 top-[37%] left-[37%] bg-white w-[25%] py-10 px-8 rounded-2xl shadow-lg">
        <i 
          className="fa-solid fa-xmark absolute top-3 cursor-pointer right-5 text-xl hover:text-red-500"
          onClick={() => setShowPopup(false)} // Hide popup on click
        ></i>
        <h1 className="text-[20px] ">Subscribe For Latest Updates</h1>
        <div className="flex justify-center gap-5 mt-4">
          <button onClick={() => subscribeToTopic("flash-sale")} className="bg-black text-white hover:bg-red-500 py-1 px-3 rounded-full">
            Flash Sale
          </button>
          <button onClick={() => subscribeToTopic("new-product")} className="bg-black text-white hover:bg-red-500 py-1 px-3 rounded-full">
            New Product
          </button>
        </div>
      </div>
    )
  );
};

export default FirebaseNotification;
