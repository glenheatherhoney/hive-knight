import type { Inspection } from "@/types";
import { QueenBadge } from "@/components/QueenBadge";
import { BroodBadge } from "@/components/BroodBadge";
import { Star, Check, ThumbsDown, Stethoscope } from "lucide-react";

interface Props {
  inspection: Inspection;
  onClick: (label: string) => void;
}

const BTN =
  "flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-lg bg-white/80 shadow-sm ring-1 ring-stone-200";

export function InspectionRow({ inspection, onClick }: Props) {
  const i = inspection;

  return (
    <div className="rounded-xl border border-stone-200 bg-stone-50 px-2 py-2">
      <div className="flex items-center gap-1.5 overflow-x-auto">
        {/* 1. Date */}
        <button className={BTN} onClick={() => onClick(`Date ${i.displayDate}`)}>
          <span className="text-xs font-bold text-stone-800">{i.displayDate}</span>
        </button>

        {/* 2. Queen */}
        {i.queen && (
          <button className={BTN} onClick={() => onClick(`Queen ${i.queen!.lastObservation}`)}>
            <div className="scale-90">
              <QueenBadge queen={i.queen} />
            </div>
          </button>
        )}

        {/* 3. Brood */}
        {i.brood && i.brood.length > 0 && (
          <button className={BTN} onClick={() => onClick(`Brood ${i.brood!.join(",")}`)}>
            <div className="h-8 w-8">
              <BroodBadge brood={i.brood} />
            </div>
          </button>
        )}

        {/* 4. Swarm – simple text badges for now */}
        {i.swarm && i.swarm.length > 0 && (
          <button className={BTN} onClick={() => onClick(`Swarm ${i.swarm!.join(",")}`)}>
            <span className="text-[10px] font-bold uppercase text-amber-700">
              {i.swarm.join(" ")}
            </span>
          </button>
        )}

        {/* 5. Quality */}
        {i.quality && (
          <button className={BTN} onClick={() => onClick(`Quality ${i.quality}`)}>
            {i.quality === "*" && <Star className="h-4 w-4 fill-amber-400 text-amber-400" />}
            {i.quality === "~" && <Check className="h-4 w-4 text-emerald-600" />}
            {i.quality === "¬" && <span className="text-xs font-bold text-amber-600">20</span>}
            {i.quality === "^" && <ThumbsDown className="h-4 w-4 text-rose-600" />}
          </button>
        )}

        {/* 6. Health / Diseases (specific diseases this visit) */}
        <button
          className={BTN}
          onClick={() =>
            onClick(
              i.diseases && i.diseases.length > 0
                ? `Diseases: ${i.diseases.join(", ")}`
                : "Clean"
            )
          }
        >
          <Stethoscope
            className={`h-4 w-4 ${
              i.diseases && i.diseases.length > 0 ? "text-amber-500" : "text-emerald-600"
            }`}
          />
          <span className="text-[8px] font-semibold uppercase text-stone-500">
            {i.diseases && i.diseases.length > 0 ? i.diseases.length : "OK"}
          </span>
        </button>

        {/* 7. Temperament */}
        {i.temperament && (
          <button className={BTN} onClick={() => onClick(`Temperament ${i.temperament}`)}>
            <span className="text-[9px] font-bold uppercase text-stone-700">
              {i.temperament.slice(0, 4)}
            </span>
          </button>
        )}

        {/* More fields can be added later in the same pattern */}
      </div>
    </div>
  );
}