export interface Therapytypes {
  profileId: number;
  profileUuid: string;
  profileCanonical: string;
  url: string;
  canonicalUrl: string;
  isVerified: boolean;
  endorsementsCount: number;
  name: string;
  type: string;
  suffix: string[];
  photo: Photo;
  offersTeletherapy: boolean;
  hasIntroVideo: boolean;
  phone: string;
  phoneUrl: string;
  acceptingAppointments: AcceptingAppointments;
  statementSegments: StatementSegments;
  groupUuid: null;
  location: Location;
  fees: Fees;
  buttons: Button[];
  tags: any[];
}

export enum AcceptingAppointments {
  No = "NO",
  Waitlist = "WAITLIST",
  Yes = "YES",
}

export interface Button {
  type?: Type;
  title: null | string;
  text: null | string;
  url: null | string;
}

export enum Type {
  Email = "Email",
  Profile = "Profile",
}

export interface Fees {
  individual: Couples;
  couples: Couples;
  slidingScale: boolean;
}

export interface Couples {
  formatted: null;
  concise: null;
  fee: null;
}

export interface Location {
  neighborhoodName: Button;
  districtName: Button;
  cityName: Button;
  postalCode: Button;
  regionName: Button;
  regionCode: Button;
  coordinates: Coordinates | null;
  subheading: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Photo {
  url: string;
  alt: string;
}

export interface StatementSegments {
  language: Language;
  direction: Direction;
  quote: any[];
  statement: Statement[];
}

export enum Direction {
  LTR = "ltr",
}

export enum Language {
  En = "en",
}

export interface Statement {
  match: boolean;
  value: string;
}
