'use client';

import { getMessaging, getToken } from 'firebase/messaging';
import { app } from './firebase';

let messaging: ReturnType<typeof getMessaging> | null = null;

// will run only in browser
if (
  typeof window !== 'undefined' &&
  'Notification' in window &&
  'serviceWorker' in navigator
) {
  try {
    messaging = getMessaging(app);
  } catch (err) {
    console.error('Messaging init failed:', err);
  }
}

// getFcmToken
export const getFcmToken = async (): Promise<string | null> => {
  if (!messaging) {
    console.warn('Messaging not supported in this environment');
    return null;
  }

  try {
    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    });

    return token;
  } catch (error) {
    console.error('Error getting FCM token', error);
    return null;
  }
};
