export interface TherapyFull {
  id: number;
  profileTypeId: number;
  partnerId: number;
  acceptingEmails: boolean;
  endorsementsCount: number;
  isVerified: boolean;
  useCompanyName: boolean;
  onlineTherapy: boolean;
  free_consultation: boolean;
  uuid: string;
  title: string;
  firstName: string;
  middleName: string;
  listingName: string;
  contactName: string;
  pronouns: string;
  lastName: string;
  accepting_appointments: string;
  hasProtectedNumber: boolean;
  hasWebsite: boolean;
  companyName: string;
  phoneNumber: string;
  formattedPhoneNumber: string;
  phoneUrl: string;
  photoUrls: PhotoUrls;
  primaryLocation: PrimaryLocation;
  secondaryLocation: null;
  boardCertification: null;
  education: Education;
  officeFees: OfficeFees;
  onlineFees: Fees;
  fees: Fees;
  suffixes: Suffix[];
  credentials: Credential[];
  gallery: null;
  personalStatements: PersonalStatement[];
  quotes: Quote[];
  attributes: Attribute[];
  groups: null;
  endorsements: Endorsement[];
  healthRole: string;
  healthRoleWriteIn: string;
  lastUpdated: Date;
  introVideo: null;
  nearbyAreas: NearbyAreas;
  appointments: Appointments;
}

export interface Appointments {
  online: string;
  inPerson: string;
}

export interface Attribute {
  id: number;
  category_id: number;
  rank: number | null;
  title: string;
  category_name: CategoryName;
  hasDefinition: boolean;
  IsWriteIn: boolean;
}

export enum CategoryName {
  AcademicSuffixes = "academic-suffixes",
  AgeFocus = "age-focus",
  Issues = "issues",
  Modality = "modality",
  PaymentMethod = "payment-method",
  TreatmentOrientation = "treatment-orientation",
}

export interface Credential {
  isPrimary: boolean;
  hasAccreditation: boolean;
  uuid: string;
  type: string;
  issued: string;
  expiration: Date;
  organization: string;
  organizationAbbreviation: string;
  organizationIdentifier: string;
  accreditation: string;
  accreditationAbbreviation: string;
  accreditationTitle: string;
  accreditationDefinition: string;
  supervisorName: string;
  supervisorOrganization: string;
  supervisorIdentifier: string;
  supervisorExpiration: string;
  verificationStatus: string;
}

export interface Education {
  uuid: string;
  institution: string;
  yearEducationCompleted: number;
  yearPracticeStarted: number;
  yearsInPractice: number;
}

export interface Endorsement {
  fromProfileUuid: string;
  fromFullName: string;
  title: string;
  healthRole: string;
  healthRoleWriteIn: string;
  message: string;
  profilePath: string;
  suffixes: Suffix[];
  profilePhotos: ProfilePhotos;
  created: Date;
  status: string;
}

export interface ProfilePhotos {
  "120x150": string;
  "320x400": string;
  "80x100": string;
  edited: string;
  original: string;
}

export interface Suffix {
  hasDefinition: boolean;
  label: string;
  isWriteIn: boolean;
  type: string;
  uuid: null;
  id: number;
}

export interface Fees {
  couples_session_cost: number;
  individual_session_cost: number;
  sliding_scale: boolean;
}

export interface NearbyAreas {
  cities: City[];
  subregions: City[];
  postalCodes: City[];
  neighborhoods: City[];
  districts: null;
}

export interface City {
  url: string;
  name: string;
  parentRegion: string;
  parentRegionCode: string;
}

export interface OfficeFees {
  sliding_scale: boolean;
  min: number;
  max: number;
}

export interface PersonalStatement {
  languageCode: string;
  headline1: string;
  headline2: string;
  headline3: string;
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
}

export interface PhotoUrls {
  thumbnail: string;
  width: number;
  height: number;
  type: string;
}

export interface PrimaryLocation {
  uuid: string;
  phoneNumber: string;
  formattedPhoneNumber: string;
  phoneUrl: string;
  locationName: null;
  addressLine1: null;
  addressLine2: null;
  cityName: string;
  regionName: string;
  regionCode: string;
  postalCode: string;
  countryCode: string;
  lat: null;
  lon: null;
}

export interface Quote {
  type: string;
  languages: Language[];
}

export interface Language {
  languageCode: string;
  quote: string;
}
