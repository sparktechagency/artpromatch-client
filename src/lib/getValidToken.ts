'use server';

import { getNewToken } from '@/services/AuthService';
import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';

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

export const getValidToken = async (): Promise<string> => {
  const cookieStore = await cookies();

  let token = cookieStore.get('accessToken')!.value;
  const refreshToken = cookieStore.get('refreshToken')!.value;

  if (!token || (await isTokenExpired(token))) {
    const { data } = await getNewToken(refreshToken);
    token = data?.accessToken;
    (await cookies()).set('accessToken', token);
  }

  return token;
};
