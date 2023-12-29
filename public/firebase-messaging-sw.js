importScripts(
    "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
    "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);
// // Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyBs9hbzdhmOhnxgD7nmJAWFf6kb_UIXiPc",
    authDomain: "sapomall-2f0f6.firebaseapp.com",
    projectId: "sapomall-2f0f6",
    storageBucket: "sapomall-2f0f6.appspot.com",
    messagingSenderId: "498864605085",
    appId: "1:498864605085:web:64a138ed53380b2c42d174",
    measurementId: "G-K4TVQWNXPP",
};

firebase?.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase?.messaging();

messaging.onBackgroundMessage(function (payload) {
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
