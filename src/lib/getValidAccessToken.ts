'use server';

import { getNewAccessToken } from '@/services/Auth';
import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';

// isTokenExpired
export const isTokenExpired = async (token: string): Promise<boolean> => {
  if (!token) return true;

  try {
    const decoded: { exp: number } = jwtDecode(token);

    return decoded.exp * 1000 < Date.now();
  } catch (err: any) {
    console.error(err);
    return true;
  }
};

// getValidAccessTokenForActions
export const getValidAccessTokenForActions = async (): Promise<string> => {
  const cookieStore = await cookies();

  let accessToken = cookieStore.get('accessToken')!.value;

  if (!accessToken || (await isTokenExpired(accessToken))) {
    const refreshToken = cookieStore.get('refreshToken')!.value;

    const { data } = await getNewAccessToken(refreshToken);

    accessToken = data?.accessToken;

    (await cookies()).set('accessToken', accessToken);
  }

  return accessToken;
};

// getValidAccessTokenForServerBasedGet

let cachedAccessToken: string | null = null; // for not getting new token again and again
let tokenExpiry: number | null = null; // for not getting new token again and again
export const getValidAccessTokenForServerBasedGet =
  async (): Promise<string> => {
    const now = Date.now();

    if (cachedAccessToken && tokenExpiry && now < tokenExpiry) {
      return cachedAccessToken;
    }

    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (!refreshToken) {
      throw new Error('No refresh token found');
    }

    const { data } = await getNewAccessToken(refreshToken);
    cachedAccessToken = data?.accessToken;

    if (!cachedAccessToken) {
      throw new Error('No cached access token found');
    }

    const payload: { exp: number } = jwtDecode(cachedAccessToken);

    tokenExpiry = payload.exp * 1000;

    return cachedAccessToken;
  };
