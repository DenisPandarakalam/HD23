import { PersonalStatement } from "./types_full";

export type CustomType = {
  full_name: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  accepting_new_patients: boolean;
  appointments: {
    online: boolean;
    in_person: boolean;
  };
  phone: string | null;
  pronouns: string | null;
  location: {
    line1: string | null;
    line2: string | null;
    city: string | null;
    region: string | null;
    region_code: string | null;
    postal_code: string | null;
    country_code: string | null;
    lat: number | null;
    lng: number | null;
  };
  education: {
    school: string | null;
    graduation_year: number | null;
    years_in_practice: number | null;
  };
  fees: {
    individual: number | null;
    couple: number | null;
  };
  paragraph_descriptions: string[];
  age_focus: string[];
  issues: string[];
  modailities: string[];
  payment_methods: string[];
  treatment_orientation: string[];
};
