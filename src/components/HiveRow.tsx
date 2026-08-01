import type { Hive } from "@/types";
import { HeartPulse, Stethoscope, CalendarDays } from "lucide-react";
import { inspectionConfig, diseaseColor, temperamentColor, kitConfig } from "@/icons";
import { HiveDiagram } from "@/components/HiveDiagram";
import { QueenBadge } from "@/components/QueenBadge";
import { BroodBadge } from "@/components/BroodBadge";
import { diseaseConfig } from "@/icons";


interface HiveRowProps {
  hive: Hive;
  onClick: (label: string) => void;
  onOpenHistory?: (hive: Hive) => void;
}
 
const ICON_BTN =
  "flex h-12 w-12 shrink-0 flex-col items-center justify-center gap-0.5 rounded-xl bg-white/80 shadow-sm ring-1 ring-stone-200 transition hover:bg-white active:scale-95";

export function HiveRow({ hive, onClick, onOpenHistory }: HiveRowProps) {
  const insp = inspectionConfig[hive.inspection];
  const InspIcon = insp.icon;
  const disease = diseaseConfig[hive.diseaseStatus];

  const boxSummary = hive.boxes
    .map((b) =>
      b.section === "excluder"
        ? "excluder"
        : `${kitConfig[b.kitType].label} ${b.section}${b.count > 1 ? ` ×${b.count}` : ""}`,
    )
    .join(", ");

  return (
    <div
      className={`rounded-2xl border-2 px-3 py-3 shadow-sm transition active:scale-[0.99] ${insp.rowClass}`}
    >
      <div className="flex flex-wrap items-stretch gap-2">
        {/* Hive number */}
        <button
          onClick={() => onClick(`Hive ${hive.hiveNumber}`)}
          className={ICON_BTN}
          aria-label={`Hive number ${hive.hiveNumber}`}
        >
          <span className="text-base font-bold leading-none text-stone-800">
            {hive.hiveNumber}
          </span>
        </button>

        {/* Hive diagram */}
        <button
          onClick={() => onClick(boxSummary)}
          className={ICON_BTN}
          aria-label={`Hive boxes: ${boxSummary}`}
        >
          <div className="flex h-9 w-9 items-end justify-center">
            <HiveDiagram boxes={hive.boxes} />
          </div>
        </button>

        {/* Queen badge */}
        <button
          onClick={() => onClick(`Queen ${hive.queen.lastObservation}`)}
          className={ICON_BTN}
          aria-label={`Queen ${hive.queen.lastObservation}`}
        >
          <QueenBadge queen={hive.queen} />
        </button>

        {/* Brood status */}
        <button
          onClick={() => onClick(`Brood ${hive.brood?.join("") || "?"}`)}
          className={ICON_BTN}
          aria-label={`Brood status ${hive.brood?.join(", ") || "unknown"}`}
        >
          <BroodBadge brood={hive.brood ?? []} />
        </button>
        
        {/* Temperament */}
        <button
          onClick={() => onClick(`Temperament ${hive.temperament}`)}
          className={ICON_BTN}
          aria-label={`Temperament ${hive.temperament}`}
        >
          <HeartPulse className={`h-4 w-4 ${temperamentColor[hive.temperament] ?? "text-stone-700"}`} />
          <span className="text-[7px] font-semibold uppercase tracking-wide text-stone-500">
            {hive.temperament}
          </span>
        </button>

        {/* Disease */}
        <button
          onClick={() => onClick(`Disease ${hive.diseaseStatus}`)}
          className={ICON_BTN}
          aria-label={`Disease status ${hive.diseaseStatus}`}
        >
          <Stethoscope className={`h-4 w-4 ${disease.color}`} />
            <span className="text-[7px] font-semibold uppercase tracking-wide text-stone-500">
              {disease.label}
            </span>
        </button>

        {/* Inspection */}
        <button
          onClick={() => onClick(`Inspection ${hive.inspection}`)}
          className={ICON_BTN}
          aria-label={`Inspection ${hive.inspection}`}
        >
          <InspIcon className={`h-4 w-4 ${insp.iconColor}`} />
          <span className="text-[7px] font-semibold uppercase tracking-wide text-stone-500">
            {hive.inspection}
          </span>
        </button>

        {/* Last inspection date */}
        <button
            onClick={() => {
              if (onOpenHistory) {
                onOpenHistory(hive);
              } else {
                onClick(`Last inspection ${hive.lastInspection}`);
              }
            }}
            className={ICON_BTN}
            aria-label={`Last inspection ${hive.lastInspection}`}
          >
            <CalendarDays className="h-4 w-4 text-stone-500" />
            <span className="text-[7px] font-semibold uppercase tracking-wide text-stone-500">
              {hive.lastInspection}
            </span>
          </button>
      </div>
    </div>
  );
}
