// Work Experience
export type WorkExperience = {
  icon: string;
  position: string;
  location: string;
  period: {
    start: string;
    end: string;
  };
  details: {
    employerNationality: string;
    sizeOfHome: string;
    district: string;
    householdSize: number;
    languageSpoken: string;
    reasonForLeaving: string;
  };
  mainDuties: {
    icon: string;
    name: string;
    year?: string;
  }[];
};

// Caregiving Data
export type CaregivingCategory = {
  category: string;
  hasCaredFor: string[];
  experiencedIn: string[];
};

// Expectations
export type Expectation = {
  label: string;
  status: "check" | "cross";
};

// Info Cards
export type Infocard = {
  icon: string;
  title: string;
  subtitle?: string;
};
