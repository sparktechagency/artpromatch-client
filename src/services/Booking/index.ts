'use server';

import {
  getValidAccessTokenForServerActions,
  getValidAccessTokenForServerHandlerGet,
} from '@/lib/getValidAccessToken';
import { FieldValues } from '@/types';
import { revalidateTag } from 'next/cache';

// getSingleClientBookings
export const getSingleClientBookings = async (
  page = '1',
  limit?: string,
  query?: { [key: string]: string | string[] | undefined }
): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerHandlerGet();

  const params = new URLSearchParams();

  if (query?.searchTerm) {
    params.append('searchTerm', query?.searchTerm.toString());
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/bookings/list?limit=${limit}&page=${page}&${params}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        next: {
          tags: ['BOOKINGS'],
        },
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// confirmPaymentForClient
export const validatePaymentStatusForClient = async (
  session_id: string
): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerHandlerGet();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/bookings/confirm-payment?sessionId=${session_id}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    revalidateTag('BOOKINGS');

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// reviewAfterAServiceIsCompleted
export const reviewAfterAServiceIsCompleted = async (
  data: FieldValues
): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerActions();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/bookings/review`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );

    // revalidateTag('BOOKINGS');

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// getBookingsWithReviewThatHaveReviewForClientHomePage
export const getBookingsWithReviewThatHaveReviewForClientHomePage =
  async (): Promise<any> => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/bookings/bookings-with-review`,
        {
          method: 'GET',
        }
      );

      const result = await res.json();
      return result;
    } catch (error: any) {
      return Error(error);
    }
  };

// cancelBookingByClient
export const cancelBookingByClient = async (
  bookingId: string
): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerActions();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/bookings/cancel/${bookingId}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    revalidateTag('BOOKINGS');

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// export const getLocationName = async (location: number[]) => {
//   const [lon, lat] = location;
//   const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=en`;

//   try {
//     const response = await fetch(url);
//     const data = await response.json();

//     //   return data.display_name || 'Unknown location';

//     const address = data.address || {};
//     // priority: city > town > village
//     const city =
//       address.city || address.town || address.village || address.county;
//     const country = address.country;

//     if (city && country) {
//       return `${city}, ${country}`;
//     } else if (country) {
//       return country;
//     } else {
//       return data.display_name || 'Unknown location';
//     }
//   } catch (error) {
//     console.error('Error fetching location:', error);
//     return 'Unable to get location';
//   }
// };
