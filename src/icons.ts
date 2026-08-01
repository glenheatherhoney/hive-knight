import type { HiveSection, InspectionStatus, KitType } from "@/types";
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  CalendarClock,
} from "lucide-react";

export const kitConfig: Record<KitType, { widthPct: number; fill: string; label: string }> = {
  wooden: { widthPct: 62, fill: "#8B5E34", label: "Wooden" },
  bs_poly: { widthPct: 82, fill: "#22A45A", label: "BS poly" },
  maisemore: { widthPct: 100, fill: "#EAB308", label: "Maisemore poly" },
};

export const sectionHeight: Record<"super" | "brood", string> = {
  super: "h-2.5",
  brood: "h-3.5",
};

export const inspectionConfig: Record<
  InspectionStatus,
  { rowClass: string; iconColor: string; icon: typeof ShieldCheck }
> = {
  URGENT: {
    rowClass: "bg-rose-50 border-rose-400",
    iconColor: "text-rose-500",
    icon: ShieldAlert,
  },
  DUE: {
    rowClass: "bg-amber-50 border-amber-400",
    iconColor: "text-amber-500",
    icon: AlertTriangle,
  },
  LEAVE: {
    rowClass: "bg-emerald-50 border-emerald-400",
    iconColor: "text-emerald-500",
    icon: ShieldCheck,
  },
  MONITOR: {
    rowClass: "bg-sky-50 border-sky-400",
    iconColor: "text-sky-500",
    icon: CalendarClock,
  },
};

export const diseaseConfig: Record<
  DiseaseStatus,
  { color: string; label: string }
> = {
  clean: {
    color: "text-emerald-600",   // green
    label: "CLEAN",
  },
  disease: {
    color: "text-amber-500",     // amber
    label: "DISEASE",
  },
  foul: {
    color: "text-rose-600",      // red
    label: "FOUL",
  },
};

export const temperamentColor: Record<string, string> = {
  CALM: "text-emerald-600",
  ACTIVE: "text-sky-600",
  DEFENSIVE: "text-rose-600",
  AGGRESSIVE: "text-rose-700",
};
