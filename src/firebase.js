import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported,
} from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBs9hbzdhmOhnxgD7nmJAWFf6kb_UIXiPc",
  authDomain: "sapomall-2f0f6.firebaseapp.com",
  projectId: "sapomall-2f0f6",
  storageBucket: "sapomall-2f0f6.appspot.com",
  messagingSenderId: "498864605085",
  appId: "1:498864605085:web:64a138ed53380b2c42d174",
  measurementId: "G-K4TVQWNXPP",
};
const firebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();
const messaging = (async () => {
  try {
    const isSupportedBrowser = await isSupported();
    if (isSupportedBrowser) {
      return getMessaging(firebaseApp);
    }
    return null;
  } catch (err) {
    return null;
  }
})();

export const fetchToken = async (setTokenFound, setFcmToken) => {
  return getToken(await messaging, {
    vapidKey:
      "BOJwfvQsStgPvLALV75kS71mLqTNqpPMU7PjvVui3mf7EJKO4sO-_1V9uXijaIcaV3iajb88SC8I1KA5lLd9nmg",
  })
    .then((currentToken) => {
      if (currentToken) {
        setTokenFound(true);
        setFcmToken(currentToken);

        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        setTokenFound(false);
        setFcmToken();
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.error(err);
      // catch error while creating client token
    });
};

export const onMessageListener = async () =>
  new Promise((resolve) =>
    (async () => {
      const messagingResolve = await messaging;
      onMessage(messagingResolve, (payload) => {
        resolve(payload);
      });
    })()
  );
