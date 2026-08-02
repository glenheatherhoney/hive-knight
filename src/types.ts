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

export type DiseaseSeverity = "low" | "high";

export interface InspectionDisease {
  code: DiseaseCode;
  severity: DiseaseSeverity;   // "low" | "high"
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

// inspection history and form types 

export type SwarmStatus = "ec" | "lc" | "sc" | "tc" | "oc" | "ca" | "pa";
export type Quality = "*" | "~" | "¬" | "^";
export type Temperament = "hindo" | "calm" | "skitty" | "shitty" | "bastards";
export type HoneyStores = "light" | "decent" | "bound";
export type PollenStores = "poor" | "ok" | "great";
export type ExcluderAction = "x+" | "x-" | "dx" | "dm" | "rdm";
export type VarroaStatus = "vrs" | "vrns" | number;
export type InspectionType = "nch" | "qch" | "fch";

export interface BoxChange {
  section: "super" | "brood";
  kitType?: KitType;
  count: number; // + added, - removed
}

export interface Inspection {
  id: string;
  hiveId: string;
  date: string;          // ISO
  displayDate: string;   // "15-5"

  queen?: QueenInfo;
  brood?: BroodStatus[];
  swarm?: SwarmStatus[];
  quality?: Quality;
  diseases?: InspectionDisease[];   // ← multiple diseases possible on one visit
  temperament?: Temperament;

  boxChanges?: BoxChange[];
  excluder?: ExcluderAction;

  honeyStores?: HoneyStores;
  pollenStores?: PollenStores;

  varroa?: VarroaStatus;
  varroaTreatment?: "+vr" | "-vr";
  spray?: "sp";
  essentialOil?: "sh";
  pollenPatty?: boolean;
  vitaminPatty?: boolean;

  inspectionType?: InspectionType;
  harvest?: string;
  cellActions?: string[];

  notes?: string;
}