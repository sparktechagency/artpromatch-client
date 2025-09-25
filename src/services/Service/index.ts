'use server';

import {
  getValidAccessTokenForServerActions,
  getValidAccessTokenForServerHandlerGet,
} from '@/lib/getValidAccessToken';
import { FieldValues } from '@/types';
import { revalidateTag } from 'next/cache';

// getAllServices
export const getAllServices = async (
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
      `${process.env.NEXT_PUBLIC_BASE_API}/clients?limit=${limit}&page=${page}&${params}`,
      {
        method: 'GET',
        headers: {
          ...(accessToken ? { Authorization: accessToken } : {}),
        },
        next: {
          tags: ['SERVICES'],
        },
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// requestAServiceBooking
export const requestAServiceBooking = async (
  bookingData: FieldValues
): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerActions();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/bookings/create`,
      {
        method: 'POST',
        headers: {
          Authorization: accessToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      }
    );

    const result = await res.json();

    console.log({ result });

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// updateUserRadius
export const updateClientRadius = async (radius: string): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerActions();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/clients/radius`,
      {
        method: 'PATCH',
        headers: {
          Authorization: accessToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ radius }),
      }
    );

    revalidateTag('SERVICES');

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
