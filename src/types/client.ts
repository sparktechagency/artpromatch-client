import {
  artistTypesList,
  expertisePiercingsServicesList,
  expertiseTattooServicesList,
  lookingForServicesList,
} from '@/constants';
import { TAuth } from './auth';

export interface IClient {
  _id: string;
  image?: string;
  location: { type: 'Point'; coordinates: [number, number] };
  stringLocation: string;
  radius: number;
  lookingFor: LookingForServiceType[];
  country: string;
  favoriteTattoos: FavoriteTattoo[];
  favoritePiercing: FavoritePiercing[];
  homeView: HomeView;
  preferredArtistType: ArtistType;
  language: string;
  dateFormat: DateFormat;
  auth: TAuth;
}

type LookingForServiceType = (typeof lookingForServicesList)[number];

type FavoriteTattoo = (typeof expertiseTattooServicesList)[number];

type FavoritePiercing = (typeof expertisePiercingsServicesList)[number];

type HomeView = 'Grid View' | 'Map View' | 'Both';

type ArtistType = (typeof artistTypesList)[number];

type DateFormat = 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY-MM-DD';
