'use client';

import { useEffect } from 'react';
import { getToken, onMessage } from 'firebase/messaging';
import { messaging } from './firebase-messaging';
import { useUser } from '@/context/UserContext';
import { updateFcmTokenToServer } from '@/services/Auth';

const FCMTokenHandler = () => {
  const { user } = useUser();
  const userId = user?.id;

  useEffect(() => {
    if (!messaging || !userId) return;

    // Function: Get and update fcmToken
    const fetchAndUpdateFcmToken = async () => {
      if (!messaging) return;

      try {
        const fcmToken = await getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
        });
        if (userId && fcmToken) {
          await updateFcmTokenToServer({ userId, fcmToken });
        } else {
          console.warn('⚠️ No registration token available.');
        }
      } catch (error) {
        console.error('❌ Error fetching token:', error);
      }
    };

    // First time fetch
    fetchAndUpdateFcmToken();

    // Foreground message listener
    const unsubscribeOnMessage = onMessage(messaging, payload => {
      console.log('📩 Foreground Message received:', payload);
    });

    // Optional: re-fetch token when userId changes
    // or after service worker update
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('♻️ Service Worker updated, fetching new token...');
      fetchAndUpdateFcmToken();
    });

    return () => {
      unsubscribeOnMessage();
    };
  }, [userId]);

  return null;
};

export default FCMTokenHandler;
