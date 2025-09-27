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

type ArtistType = 'Tattoo Artist' | 'Both' | 'Piercers';

type DateFormat = 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY-MM-DD';
