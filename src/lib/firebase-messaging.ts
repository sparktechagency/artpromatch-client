'use client';

import { getMessaging, getToken } from 'firebase/messaging';
import { app } from './firebase';

export const messaging: ReturnType<typeof getMessaging> | null =
  typeof window !== 'undefined' &&
  'Notification' in window &&
  'serviceWorker' in navigator
    ? getMessaging(app)
    : null;

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
