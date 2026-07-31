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
  boxes: HiveBox[];
  queenCode: QueenCode;
  temperament: string;
  diseaseStatus: string;
  inspection: InspectionStatus;
  lastInspection: string;
}
