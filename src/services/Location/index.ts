'use server';

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

const ensureApiKey = () => {
  if (!GOOGLE_API_KEY) {
    throw new Error('Google Maps API key is not configured.');
  }
  return GOOGLE_API_KEY;
};

const fetchFromGoogle = async <T>(url: string): Promise<T> => {
  ensureApiKey();
  const res = await fetch(url, { cache: 'no-store' });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data?.error_message ||
        data?.status ||
        `Google API request failed with status ${res.status}`
    );
  }

  return data;
};

interface PlacesAutocompleteResponse {
  status: string;
  predictions: { description: string; place_id: string }[];
}

interface PlaceDetailsResponse {
  status: string;
  result?: {
    formatted_address?: string;
    geometry?: {
      location?: {
        lat: number;
        lng: number;
      };
    };
    name?: string;
  };
}

interface GeocodeResponse {
  status: string;
  results?: Array<{
    formatted_address?: string;
  }>;
}

export const getPlacesAutocomplete = async (
  input: string
): Promise<PlacesAutocompleteResponse> => {
  if (!input?.trim()) {
    return { status: 'ZERO_RESULTS', predictions: [] };
  }

  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
    input
  )}&key=${ensureApiKey()}`;

  return fetchFromGoogle(url);
};

export const getPlaceDetailsById = async (
  placeId: string
): Promise<PlaceDetailsResponse> => {
  if (!placeId) {
    throw new Error('placeId is required');
  }

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(
    placeId
  )}&key=${ensureApiKey()}`;

  return fetchFromGoogle(url);
};

export const reverseGeocodeLatLng = async (
  lat: number,
  lng: number
): Promise<GeocodeResponse> => {
  if (typeof lat !== 'number' || typeof lng !== 'number') {
    throw new Error('Latitude and longitude must be numbers');
  }

  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${ensureApiKey()}`;

  return fetchFromGoogle(url);
};
