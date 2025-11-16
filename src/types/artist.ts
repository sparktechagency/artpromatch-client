import { artistTypesList, expertiseTattooServicesList } from '@/constants';
import { TAuth } from './auth';

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

export type TArtistType = (typeof artistTypesList)[number];

export type ExpertiseType = (typeof expertiseTattooServicesList)[number];

// TBoost
export type TBoost = {
  lastBoostAt: Date | null;
  endTime: Date | null;
  isActive: boolean;
};
