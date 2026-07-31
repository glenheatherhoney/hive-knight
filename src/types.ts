export type InspectionStatus = "URGENT" | "DUE" | "LEAVE" | "MONITOR";

export type HiveSection = "super" | "excluder" | "brood";

export type QueenCode = string; // e.g. "QCB" = Queen, Clipped, Blue

export type KitType = "wooden" | "maisemore" | "bs_poly";

export type HiveBox =
  | { section: "excluder"; count: number }
  | { section: "super" | "brood"; kitType: KitType; count: number };
 
export interface Hive {
  id: string;
  hiveNumber: number;
  apiaryId: string; 
  boxes: HiveBox[];
  queenCode: QueenCode;
  temperament: string;
  diseaseStatus: string;
  inspection: InspectionStatus;
  lastInspection: string;
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
