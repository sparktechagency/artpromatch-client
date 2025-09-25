'use client';

import UserProvider from '@/context/UserContext';
import FCMTokenHandler from '@/lib/FCMTokenHandler';
import { GoogleOAuthProvider } from '@react-oauth/google';

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      <UserProvider>
        <FCMTokenHandler />

        {children}
      </UserProvider>
    </GoogleOAuthProvider>
  );
};
