    importScripts('https://www.gstatic.com/firebasejs/10.4.0/firebase-app-compat.js');
    importScripts('https://www.gstatic.com/firebasejs/10.4.0/firebase-messaging-compat.js');

    firebase.initializeApp({
    apiKey: "AIzaSyAjmyY026RaQtlzV_PTzDuBfvhetTbuS6s",
    authDomain: "firstapp-6f209.firebaseapp.com",
    projectId: "firstapp-6f209",
    storageBucket: "firstapp-6f209.firebasestorage.app",
    messagingSenderId: "616128201590",
    appId: "1:616128201590:web:856a850ee76b20c6d27057"
    });

    const messaging = firebase.messaging();

    // Manejar notificaciones en segundo plano
    messaging.onBackgroundMessage((payload) => {
    console.log('🔔 Notificación en segundo plano:', payload);
    self.registration.showNotification(payload.notification.title, {
        body: payload.notification.body,
        icon: '/assets/icon.png'
    });
    });
