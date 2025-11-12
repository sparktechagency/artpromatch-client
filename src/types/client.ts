import { TAuth } from './auth';

export interface IClient {
  _id: string;
  image?: string;
  location: { type: 'Point'; coordinates: [number, number] };
  stringLocation: string;
  radius: number;
  lookingFor: ServiceType[];
  country: string;
  favoriteTattoos: FavoriteTattoo[];
  favoritePiercing: FavoritePiercing[];
  homeView: HomeView;
  preferredArtistType: ArtistType;
  language: string;
  dateFormat: DateFormat;
  auth: TAuth;
}

type ServiceType =
  | 'Tattoos'
  | 'Piercings'
  | 'Custom Designs'
  | 'Cover-ups'
  | 'Touch-ups'
  | 'Guest Spots';

export type FavoriteTattoo =
  (typeof favoriteTattoos)[keyof typeof favoriteTattoos];

export const favoriteTattoos = {
  //A
  AMERICAN_TRADITIONAL: 'American Traditional',
  ABSTRACT: 'Abstract',
  AFRICAN: 'African',
  ANIME: 'Anime',

  // B
  BLACK_AND_GREY: 'Black & Grey',
  BLACKWORK: 'Blackwork',
  BRUTAL_BLACKWORK: 'Brutal Blackwork',
  BLACKOUT: 'Blackout',
  BLACK_TRASH: 'Black Trash',
  BIOMECH: 'Biomech',
  BOTANICAL: 'Botanical',

  // C
  CALLIGRAPHY: 'Calligraphy',
  CHICANO: 'Chicano',
  COMIC: 'Comic',
  COVERUPS: 'Coverups',

  // D
  DOTWORK: 'Dotwork',

  // F
  FINE_LINE: 'Fine Line',
  FRECKLES: 'Freckles',

  // G
  GEOMETRIC: 'Geometric',
  GRAPHIC: 'Graphic',

  // H
  HEAVY_BLACKWORK: 'Heavy Blackwork',

  // I
  ILLUSTRATIVE: 'Illustrative',
  IGNORANT: 'Ignorant',
  IREZUMI: 'Irezumi',

  // J
  JAPANESE_STYLE: 'Japanese Style',

  // L
  LETTERING: 'Lettering',
  LINEART: 'Lineart',

  // M
  MAORI: 'Maori',
  MICROBLADING: 'Microblading',
  MICROREALISM: 'Microrealism',
  MINIMALIST: 'Minimalist',

  // N
  NATIVE_AMERICAN: 'Native American',
  NEO_TRADITIONAL: 'Neo Traditional',
  NEO_TRIBAL: 'Neo Tribal',
  NEW_SCHOOL: 'New School',

  // O
  OLD_SCHOOL: 'Old School',
  ORNAMENTAL: 'Ornamental',

  // P
  PACIFIC_ISLANDER: 'Pacific Islander / Polynesian',
  PORTRAIT: 'Portrait',

  // R
  REALISM: 'Realism',
  REALISTIC_COLOR: 'Realistic Color',
  REALISTIC_BLACK_AND_GREY: 'Realistic Black & Grey',

  // S
  SCAR_COVERUP: 'Scar Coverup',
  SCRIPT: 'Script',
  STICK_AND_POKE: 'Stick and Poke',

  // T
  TATAU: 'Tatau',
  TATTOO_REMOVAL: 'Tattoo Removal',
  TEBORI: 'Tebori',
  THAI: 'Thai',
  TOOTH_GEMS: 'Tooth Gems',
  TRADITIONAL: 'Traditional',
  TRASH_POLKA: 'Trash Polka',
  TRIBAL: 'Tribal',

  // W
  WATERCOLOR: 'Watercolor',
  WHITE_ON_BLACK: 'White on Black',
  WHITE_TATTOOS: 'White Tattoos',
} as const;

type FavoritePiercing =
  | 'Blackwork'
  | 'Ear Lobe'
  | 'Lip (Labret, Monroe)'
  | 'Triple Helix'
  | 'Industrial'
  | 'Septum'
  | 'Nose Nostril'
  | 'Tongue'
  | 'Nasallang'
  | 'Traguss'
  | 'Conch';

type HomeView = 'Grid View' | 'Map View' | 'Both';

type ArtistType = 'Tattoo Artist' | 'Both' | 'Piercer';

type DateFormat = 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY-MM-DD';
