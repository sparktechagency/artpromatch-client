'use server';

import { getValidAccessTokenForServerHandlerGet } from '@/lib/getValidAccessToken';

// getAllPaymentsForClientAndArtist
export const getAllPaymentsForClientAndArtist = async (): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerHandlerGet();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/payment-history/client-artist`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};



