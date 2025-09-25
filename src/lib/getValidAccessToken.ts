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

// getValidAccessTokenForServerActions
export const getValidAccessTokenForServerActions =
  async (): Promise<string> => {
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

// getValidAccessTokenForServerHandlerGet
let cachedAccessToken: string | null = null; // for not getting new token again and again
let tokenExpiry: number | null = null; // for not getting new token again and again
export const getValidAccessTokenForServerHandlerGet = async (): Promise<
  string | null
> => {
  const now = Date.now();

  // if token is valid in cache
  if (cachedAccessToken && tokenExpiry && now < tokenExpiry) {
    return cachedAccessToken;
  }

  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;

  // 🚫 if user is not logged in null, will return null instead throwing error
  if (!refreshToken) {
    return null;
  }

  const { data } = await getNewAccessToken(refreshToken);

  if (!data?.accessToken) {
    return null;
  }

  cachedAccessToken = data.accessToken;

  const payload: { exp: number } = jwtDecode(cachedAccessToken!);
  tokenExpiry = payload.exp * 1000;

  return cachedAccessToken;
};
