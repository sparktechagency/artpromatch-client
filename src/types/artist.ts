import { TAuth } from './auth';
import { favoriteTattoos } from './client';

// IArtist
export interface IArtist {
  _id: string;
  auth: TAuth;
  business: string | null;
  isConnBusiness: boolean;
  type: TArtistType;
  expertise: ExpertiseType[];
  city: string;
  stripeAccountId: string;
  isStripeReady: boolean;

  mainLocation: { type: 'Point'; coordinates: [number, number] };
  stringLocation: string;
  currentLocation: {
    type: 'Point';
    coordinates: [number, number];
    currentLocationUntil: Date | null;
  };
  distance?: number;

  hourlyRate: number;
  idCardFront: string;
  idCardBack: string;
  selfieWithId: string;

  boost: TBoost;

  description: string;
  preferences?: string;

  totalCompletedService: number;
  totalReviewCount: number;
  avgRating: number;
}

// ARTIST_TYPE
export const ARTIST_TYPE = {
  TATTOO_ARTIST: 'Tattoo Artist',
  PIERCER: 'Piercer',
} as const;

export type ValueOf<T> = T[keyof T];
export type TArtistType = ValueOf<typeof ARTIST_TYPE>;

// expertiseTypes
export type ExpertiseType = (typeof favoriteTattoos)[keyof typeof favoriteTattoos];

// TBoost
export type TBoost = {
  lastBoostAt: Date | null;
  endTime: Date | null;
  isActive: boolean;
};
