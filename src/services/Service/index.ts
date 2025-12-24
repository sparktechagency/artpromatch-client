'use server';

import {
  getValidAccessTokenForServerActions,
  getValidAccessTokenForServerHandlerGet,
} from '@/lib/getValidAccessToken';
import { FieldValues } from '@/types';
import { revalidateTag } from 'next/cache';

// getAllNormalServices
export const getAllNormalServices = async (
  page: string = '1',
  limit: string = '12',
  query: { [key: string]: string | string[] | undefined } = {}
): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerHandlerGet();

  const normalize = (v?: string | string[]) => (Array.isArray(v) ? v[0] : v);

  // Extract values safely
  const artistType = normalize(query.artistType);
  const tattooCategory = normalize(query.tattooCategory);
  const searchTerm = normalize(query.searchTerm);

  // Build query string
  const params = new URLSearchParams();
  params.set('page', page);
  params.set('limit', limit);

  // Apply filters
  if (artistType && artistType !== 'All') {
    params.set('artistType', artistType);
  }

  if (tattooCategory && tattooCategory !== 'All') {
    params.set('tattooCategory', tattooCategory);
  }

  if (searchTerm && searchTerm !== 'All') {
    params.set('searchTerm', searchTerm);
  }

  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_API
      }/clients/normal-services?${params.toString()}`,
      {
        method: 'GET',
        headers: {
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
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

// getAllGuestServicesFromDB
export const getAllGuestServicesFromDB = async (
  page: string = '1',
  limit: string = '12',
  query: { [key: string]: string | string[] | undefined } = {}
): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerHandlerGet();

  const normalize = (v?: string | string[]) => (Array.isArray(v) ? v[0] : v);

  // Extract values safely
  const artistType = normalize(query.artistType);
  const tattooCategory = normalize(query.tattooCategory);
  const searchTerm = normalize(query.searchTerm);

  // Build query string
  const params = new URLSearchParams();
  params.set('page', page);
  params.set('limit', limit);

  // Apply filters
  if (artistType && artistType !== 'All') {
    params.set('artistType', artistType);
  }

  if (tattooCategory && tattooCategory !== 'All') {
    params.set('tattooCategory', tattooCategory);
  }

  if (searchTerm && searchTerm !== 'All') {
    params.set('searchTerm', searchTerm);
  }

  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_API
      }/clients/guest-services?${params.toString()}`,
      {
        method: 'GET',
        headers: {
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
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

// export const getReverseGeocode = async (coordinates: [number, number]) => {
//   const [latitude, longitude] = coordinates;

//   const GOOGLE_API_KEY = 'AIzaSyAszXC1be8aJ37eHuNcBm_-O1clWkPUwV4';

//   const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`;

//   try {
//     const response = await fetch(geocodeUrl);
//     const data = await response.json();

//     if (data.results && data.results.length > 0) {
//       const address = data.results[0].formatted_address;
//       return address;
//     } else {
//       return null;
//     }
//   } catch (error: any) {
//     return Error(error);
//   }
// };

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
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// updateUserRadius
export const updateClientRadius = async (radius: number): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerActions();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/clients/radius`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${accessToken}`,
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

// getArtistProfileByHisId
export const getArtistProfileByHisId = async (id: string): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerActions();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/artists/profile/${id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: 'no-store',
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// getLocationName
export const getLocationName = async (location: number[]) => {
  const [lat, lon] = location;
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    return 'Unknown location';
  }

  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${encodeURIComponent(
    lat
  )}&lon=${encodeURIComponent(lon)}&accept-language=en`;

  const fetchWithTimeout = async (timeoutMs: number, signal?: AbortSignal) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(url, {
        // Nominatim requires a valid and identifiable User-Agent
        headers: {
          'User-Agent':
            'ArtProMatchClient/1.0 (contact: support@artpromatch.example)',
          'Accept-Language': 'en',
        },
        signal: signal ?? controller.signal,
      } as RequestInit);
      return res;
    } finally {
      clearTimeout(timeout);
    }
  };

  // Retry once for transient network errors like ETIMEDOUT
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const response = await fetchWithTimeout(7000);
      if (!response.ok) {
        // Non-200 responses
        return 'Unable to get location';
      }
      const data = await response.json();
      return data.display_name || 'Unknown location';
    } catch (error: any) {
      // Only retry on first failure and for timeout/abort/socket errors
      const code = error?.code || error?.cause?.code;
      const isTimeout = code === 'ETIMEDOUT' || error?.name === 'AbortError';
      if (attempt === 2 || !isTimeout) {
        console.error('Error fetching location:', error);
        return 'Unable to get location';
      }
      // small backoff before retry
      await new Promise(r => setTimeout(r, 300));
    }
  }

  return 'Unable to get location';
};
