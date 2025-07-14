import { useEffect } from "react";
import { apiConnectorPost } from "./utils/APIConnector";
import { endpoint } from "./utils/APIRoutes";
import { isSupported } from "firebase/messaging";

const PushNotification = ({ userId }) => {
  useEffect(() => {
    const setupMessaging = async () => {
      // 1. Check if FCM is supported
      if (!(await isSupported())) {
        console.warn(" Firebase messaging not supported in this browser");
        return;
      }

      // 2. Dynamically load messaging tools
      const { getMessaging, getToken, onMessage } = await import(
        "firebase/messaging"
      );
      const { initializeApp } = await import("firebase/app");

      // 3. Initialize Firebase app
      const firebaseConfig = {
        apiKey: "AIzaSyB_EHZIUQAGcHgeYPOrInGsiKmJQJhzH4",
        authDomain: "buybot-a7c35.firebaseapp.com",
        projectId: "buybot-a7c35",
        storageBucket: "buybot-a7c35.appspot.com",
        messagingSenderId: "987316158607",
        appId: "1:987316158607:web:65432d8899163056dfb0fa",
        measurementId: "G-TC2SPYT991",
      };
      const app = initializeApp(firebaseConfig);
      const messaging = getMessaging(app);

      // 4. Request permission
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        console.warn(" Notification permission not granted");
        return;
      }

      // 5. Get service worker registration here inside async function
      const registration = await navigator.serviceWorker.getRegistration();
      if (!registration) {
        console.warn(" Service worker registration not found");
        return;
      }

      // 6. Get FCM token with serviceWorkerRegistration option
      try {
        const token = await getToken(messaging, {
          vapidKey:
            "BPS4msBkVo_T7EfglXR0OnIGuQwNUJXxuqVEmZD8zgyPQLNTN7_2qpClrrc-974YqdXc7Qmqe_J0k4cU8GQT6Sk",
          serviceWorkerRegistration: registration,
        });

        if (token) {
          console.log(" FCM Token:", token);
          if (userId) {
            await apiConnectorPost(endpoint.save_token, { token, userId });
          }
        } else console.warn(" No FCM token available");
      } catch (err) {
        console.error(" FCM token error:", err);
      }

      // 7. Handle messages in foreground
      onMessage(messaging, (payload) => {
        console.log(" Message received:", payload);
        const { title = "", body = "", icon } = payload.notification || {};
        new Notification(title, { body, icon: icon || "/logo.png" });
      });
    };

    setupMessaging();
  }, [userId]);

  return null;
};

export default PushNotification;
