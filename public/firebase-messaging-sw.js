importScripts(
  'https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.22.2/firebase-messaging-compat.js'
);

firebase.initializeApp({
  apiKey: 'AIzaSyCwzBndnqUpB_UQwDipTCK5IF7PVdxrB5Y',
  authDomain: 'glamspot-khaled.firebaseapp.com',
  projectId: 'glamspot-khaled',
  storageBucket: 'glamspot-khaled.appspot.com',
  messagingSenderId: '664001792395',
  appId: '1:664001792395:web:f3113aa29acde10d05c78e',
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  console.log('Received background message ', payload);

  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: '/logo.png',
  });
});
