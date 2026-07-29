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

export interface Hive {
  id: string;
  hiveNumber: number;
  boxes: HiveBox[];
  queen: QueenInfo;                 // ← replaced queenCode
  temperament: string;
  diseaseStatus: string;
  inspection: InspectionStatus;
  lastInspection: string;
}