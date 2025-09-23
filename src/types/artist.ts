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

// ARTIST_TYPE
export const ARTIST_TYPE = {
  TATTOO_ARTIST: 'Tattoo Artist',
  PIERCER: 'Piercer',
} as const;

export type ValueOf<T> = T[keyof T];
export type TArtistType = ValueOf<typeof ARTIST_TYPE>;

// expertiseTypes
export const expertiseTypes = {
  //A
  AMERICAN_TRADITIONAL: 'American Traditional',
  ABSTRACT: 'Abstract',
  AFRICAN: 'African',
  ANIME: 'Anime',
  //B
  BLACK_AND_GREY: 'Black & Grey',
  BLACKWORK: 'Blackwork',
  BRUTAL_BLACKWORK: 'Brutal Blackwork',
  BLACKOUT: 'Blackout',
  BLACK_TRASH: 'Black Trash',
  BIOMECH: 'Biomech',
  BOTANICAL: 'Botanical',
  //C
  CHICANO: 'Chicano',
  COVERUPS: 'Coverups',
  COMIC: 'Comic',
  CALLIGRAPHY: 'Calligraphy',
  //D
  DOTWORK: 'Dotwork',
  //F
  FINE_LINE: 'Fine Line',
  FRECKLES: 'Freckles',
  //G
  GEOMETRIC: 'Geometric',
  GRAPHIC: 'Graphic',
  //H
  HEAVY_BLACKWORK: 'Heavy Blackwork',
  //I
  ILLUSTRATIVE: 'Illustrative',
  IREZUMI: 'Irezumi',
  IGNORANT: 'Ignorant',
  //J
  JAPANESE_STYLE: 'Japanese Style',
  //L
  LETTERING: 'Lettering',
  LINEART: 'Lineart',
  //M
  MINIMALIST: 'Minimalist',
  MICROBLADING: 'Microblading',
  MICROREALISM: 'Microrealism',
  MAORI: 'Maori',
  //N
  NEO_TRADITIONAL: 'Neo Traditional',
  NEW_SCHOOL: 'New School',
  NATIVE_AMERICAN: 'Native American',
  NEO_TRIBAL: 'Neo Tribal',
  //0
  ORNAMENTAL: 'Ornamental',
  OLD_SCHOOL: 'Old School',
  //P
  PACIFIC_ISLANDER: 'Pacific Islander/Polynesian',
  PORTRAIT: 'Portrait',
  //R
  REALISM: 'Realism',
  REALISTIC_COLOR: 'Realistic Color',
  REALISTIC_BLACK_AND_GREY: 'Black & Grey',
  //S
  STICK_AND_POKE: 'Stick and Poke',
  SCAR_COVERUP: 'Scar Coverup',
  SCRIPT: 'Script',
  //T
  TRIBAL: 'Tribal',
  TRADITIONAL: 'Traditional',
  TATAU: 'Tatau',
  THAI: 'Thai',
  TATTOO_REMOVAL: 'Tattoo Removal',
  TOOTH_GEMS: 'Tooth Gems',
  TEBORI: 'Tebori',
  TRASH_POLKA: 'Trash Polka',
  //W
  WHITE_ON_BLACK: 'White On Black',
  WHITE_TATTOOS: 'White Tattoos',
  WATERCOLOR: 'Watercolor',
};

export type ExpertiseType =
  (typeof expertiseTypes)[keyof typeof expertiseTypes];

// TBoost
export type TBoost = {
  lastBoostAt: Date | null;
  endTime: Date | null;
  isActive: boolean;
};
