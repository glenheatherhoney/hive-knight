export type BroodStatus = "e" | "l" | "c" | "d";

export type InspectionStatus = "URGENT" | "DUE" | "LEAVE" | "MONITOR";

export type HiveSection = "super" | "excluder" | "brood";

export type KitType = "wooden" | "maisemore" | "bs_poly";

export type HiveBox =
  | { section: "excluder"; count: number }
  | { section: "super" | "brood"; kitType: KitType; count: number };

// ——— Queen system ———
export type QueenMarkColour = "B" | "G" | "R" | "Y" | "W" | "P" | null;

export type QueenObservation =
  | "seen"
  | "not_seen"
  | "virgin_seen"
  | "virgin_presumed"
  | "queenless_presumed";

export interface QueenInfo {
  clipped: boolean;
  colour: QueenMarkColour;
  year?: number;
  lastObservation: QueenObservation;
}

/** Individual diseases that can be recorded on an inspection */
export type DiseaseCode =
  | "chalk"   // Chalkbrood
  | "sac"     // Sacbrood
  | "dwv"     // Deformed Wing Virus
  | "cbpv"    // Chronic Bee Paralysis Virus
  | "efb"     // European Foulbrood
  | "afb";    // American Foulbrood

/** Hive-level rollup status (derived from history) */
export type DiseaseStatus = "clean" | "disease" | "foul";

export interface Hive {
  id: string;
  apiaryId: string;
  hiveNumber: number;
  boxes: HiveBox[];
  queen: QueenInfo;
  temperament: string;
  diseaseStatus: DiseaseStatus;     // ← rollup only
  // later you will also store the actual history, e.g.:
  // diseaseHistory: { date: string; diseases: DiseaseCode[] }[];
  inspection: InspectionStatus;
  lastInspection: string;
  brood: BroodStatus[];
}

export type WeatherIcon = "sunny" | "partly" | "cloudy" | "rain" | "overcast";

export interface ApiaryWeather {
  highTemp: number;
  lowTemp: number;
  highWind: number;       // mph
  lowWind: number;
  windDirection?: number; // degrees (0 = north)
  icon: WeatherIcon;
}

export interface ApiaryCounts {
  total: number;
  hive: number;
  nuc: number;
  apidea: number;
}

export interface Apiary {
  id: string;
  name: string;
  location: string;
  photoUrl?: string;
  todos: string[];
  weather: ApiaryWeather;
  lastVisit: string;      // e.g. "8th May"
  isMixed: boolean;
  counts: ApiaryCounts;
}