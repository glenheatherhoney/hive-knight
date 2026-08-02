// src/components/InspectionRow.tsx

import type { Inspection, DiseaseCode } from "@/types";
import { QueenBadge } from "@/components/QueenBadge";
import { BroodBadge } from "@/components/BroodBadge";
import { HiveDiagram } from "@/components/HiveDiagram";
import {
  Star,
  Check,
  ThumbsDown,
  Stethoscope,
  HeartPulse,
  Droplets,
  Flower2,
  Shield,
  Syringe,
  Scissors,
  ClipboardCheck,
} from "lucide-react";

interface Props {
  inspection: Inspection;
  onClick: (label: string) => void;
}

const BTN =
  "flex h-10 min-w-[2.5rem] shrink-0 flex-col items-center justify-center gap-0.5 rounded-lg bg-white/80 px-1 shadow-sm ring-1 ring-stone-200";

export function InspectionRow({ inspection, onClick }: Props) {
  const i = inspection;

  return (
    <div className="rounded-xl border border-stone-200 bg-stone-50 px-2 py-2">
      <div className="flex flex-wrap items-center gap-1.5">
        {/* 1. Date */}
        <button className={BTN} onClick={() => onClick(`Date ${i.displayDate}`)}>
          <span className="text-xs font-bold leading-none text-stone-800">
            {i.displayDate}
          </span>
        </button>

        {/* 2. Queen */}
        {i.queen && (
          <button
            className={BTN}
            onClick={() => onClick(`Queen ${i.queen!.lastObservation}`)}
          >
            <div className="scale-90">
              <QueenBadge queen={i.queen} />
            </div>
          </button>
        )}

        {/* 3. Brood */}
        {i.brood && i.brood.length > 0 && (
          <button
            className={BTN}
            onClick={() => onClick(`Brood ${i.brood!.join(",")}`)}
          >
            <div className="h-8 w-8">
              <BroodBadge brood={i.brood} />
            </div>
          </button>
        )}

        {/* 4. Swarm */}
        {i.swarm && i.swarm.length > 0 && (
          <button
            className={BTN}
            onClick={() => onClick(`Swarm ${i.swarm!.join(", ")}`)}
          >
            <span className="text-[9px] font-bold uppercase leading-tight text-amber-700">
              {i.swarm.join(" ")}
            </span>
          </button>
        )}

        {/* 5. Quality */}
        {i.quality && (
          <button
            className={BTN}
            onClick={() => onClick(`Quality ${i.quality}`)}
          >
            {i.quality === "*" && (
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            )}
            {i.quality === "~" && (
              <Check className="h-4 w-4 text-emerald-600" />
            )}
            {i.quality === "¬" && (
              <span className="text-[11px] font-bold text-amber-600">20</span>
            )}
            {i.quality === "^" && (
              <ThumbsDown className="h-4 w-4 text-rose-600" />
            )}
          </button>
        )}

        {/* 6. Diseases – one icon per disease, thicker/bolder when high */}
        {i.diseases &&
          i.diseases.length > 0 &&
          i.diseases.map((d) => (
            <button
              key={d.code}
              className={BTN}
              onClick={() => onClick(`Disease: ${d.code} (${d.severity})`)}
            >
              <Stethoscope
                className={`h-4 w-4 text-amber-500 ${
                  d.severity === "high" ? "stroke-[2.5]" : "stroke-[1.5]"
                }`}
              />
              <span
                className={`text-[8px] uppercase text-stone-500 ${
                  d.severity === "high" ? "font-bold" : "font-semibold"
                }`}
              >
                {d.code}
              </span>
            </button>
          ))}

        {/* 7. Box changes */}
        {i.boxChanges && i.boxChanges.length > 0 && (
          <button
            className={BTN}
            onClick={() =>
              onClick(
                i.boxChanges!
                  .map(
                    (b) =>
                      `${b.count > 0 ? "+" : ""}${b.count} ${b.section}`
                  )
                  .join(", ")
              )
            }
          >
            <div className="flex h-8 w-8 items-end justify-center">
              <HiveDiagram
                boxes={i.boxChanges.map((b) =>
                  b.section === "super" || b.section === "brood"
                    ? {
                        section: b.section,
                        kitType: b.kitType ?? "wooden",
                        count: Math.abs(b.count),
                      }
                    : { section: "excluder", count: 1 }
                )}
              />
            </div>
          </button>
        )}

        {/* 8. Excluder */}
        {i.excluder && (
          <button
            className={BTN}
            onClick={() => onClick(`Excluder ${i.excluder}`)}
          >
            <span className="text-[10px] font-bold text-rose-700">
              {i.excluder}
            </span>
          </button>
        )}

        {/* 9. Varroa */}
        {i.varroa !== undefined && (
          <button
            className={BTN}
            onClick={() => onClick(`Varroa ${i.varroa}`)}
          >
            <span className="text-[10px] font-bold text-stone-700">
              {typeof i.varroa === "number" ? `V${i.varroa}` : i.varroa}
            </span>
          </button>
        )}

        {/* 10. Temperament */}
        {i.temperament && (
          <button
            className={BTN}
            onClick={() => onClick(`Temperament ${i.temperament}`)}
          >
            <HeartPulse className="h-3.5 w-3.5 text-stone-600" />
            <span className="text-[8px] font-semibold uppercase text-stone-500">
              {i.temperament.slice(0, 4)}
            </span>
          </button>
        )}

        {/* 11. Honey stores */}
        {i.honeyStores && (
          <button
            className={BTN}
            onClick={() => onClick(`Honey ${i.honeyStores}`)}
          >
            <Droplets className="h-3.5 w-3.5 text-amber-600" />
            <span className="text-[8px] font-semibold uppercase text-stone-500">
              {i.honeyStores.slice(0, 3)}
            </span>
          </button>
        )}

        {/* 12. Pollen stores */}
        {i.pollenStores && (
          <button
            className={BTN}
            onClick={() => onClick(`Pollen ${i.pollenStores}`)}
          >
            <Flower2 className="h-3.5 w-3.5 text-yellow-600" />
            <span className="text-[8px] font-semibold uppercase text-stone-500">
              {i.pollenStores}
            </span>
          </button>
        )}

        {/* 13. Varroa treatment */}
        {i.varroaTreatment && (
          <button
            className={BTN}
            onClick={() => onClick(`Varroa treatment ${i.varroaTreatment}`)}
          >
            <Shield className="h-3.5 w-3.5 text-sky-600" />
            <span className="text-[8px] font-bold text-stone-600">
              {i.varroaTreatment}
            </span>
          </button>
        )}

        {/* 14. Spray */}
        {i.spray && (
          <button className={BTN} onClick={() => onClick("Sprayed")}>
            <Syringe className="h-3.5 w-3.5 text-sky-700" />
            <span className="text-[8px] font-bold text-stone-600">SP</span>
          </button>
        )}

        {/* 15. Essential oil */}
        {i.essentialOil && (
          <button
            className={BTN}
            onClick={() => onClick("Essential oil sheet")}
          >
            <span className="text-[10px] font-bold text-emerald-700">SH</span>
          </button>
        )}

        {/* 16 & 17. Patties */}
        {(i.pollenPatty || i.vitaminPatty) && (
          <button
            className={BTN}
            onClick={() =>
              onClick(
                [
                  i.pollenPatty ? "Pollen patty" : null,
                  i.vitaminPatty ? "Vitamin patty" : null,
                ]
                  .filter(Boolean)
                  .join(" + ")
              )
            }
          >
            <span className="text-[9px] font-bold text-amber-800">
              {i.pollenPatty && i.vitaminPatty
                ? "PP+VP"
                : i.pollenPatty
                ? "PP"
                : "VP"}
            </span>
          </button>
        )}

        {/* 18. Inspection type */}
        {i.inspectionType && (
          <button
            className={BTN}
            onClick={() => onClick(`Check type ${i.inspectionType}`)}
          >
            <ClipboardCheck className="h-3.5 w-3.5 text-stone-600" />
            <span className="text-[8px] font-bold uppercase text-stone-500">
              {i.inspectionType}
            </span>
          </button>
        )}

        {/* 19. Harvest */}
        {i.harvest && (
          <button
            className={BTN}
            onClick={() => onClick(`Harvest ${i.harvest}`)}
          >
            <span className="text-[9px] font-bold text-amber-700">
              {i.harvest}
            </span>
          </button>
        )}

        {/* 20. Cell actions */}
        {i.cellActions && i.cellActions.length > 0 && (
          <button
            className={BTN}
            onClick={() => onClick(`Cells ${i.cellActions!.join(", ")}`)}
          >
            <Scissors className="h-3.5 w-3.5 text-stone-600" />
            <span className="text-[8px] font-bold text-stone-500">
              {i.cellActions.length}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}