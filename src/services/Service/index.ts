'use server';

import {
  getValidAccessTokenForActions,
  getValidAccessTokenForServerBasedGet,
} from '@/lib/getValidAccessToken';

// getAllServices
export const getAllServices = async (
  page = '1',
  limit?: string,
  query?: { [key: string]: string | string[] | undefined }
): Promise<any> => {
  let token: string | null = null;
  try {
    token = await getValidAccessTokenForServerBasedGet();
  } catch (error) {
    token = null;
  }

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
          ...(token ? { Authorization: token } : {}),
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
