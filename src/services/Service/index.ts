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

// updateUserRadius
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
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=en`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return data.display_name || 'Unknown location';

    // const address = data.address || {};
    // // priority: city > town > village
    // const city =
    //   address.city || address.town || address.village || address.county;
    // const country = address.country;

    // if (city && country) {
    //   return `${city}, ${country}`;
    // } else if (country) {
    //   return country;
    // } else {
    //   return data.display_name || 'Unknown location';
    // }
  } catch (error) {
    console.error('Error fetching location:', error);
    return 'Unable to get location';
  }
};
