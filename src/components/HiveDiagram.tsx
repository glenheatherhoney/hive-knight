import type { HiveBox } from "@/types";
import { kitConfig, sectionHeight } from "@/icons";

interface HiveDiagramProps {
  boxes: HiveBox[];
}

export function HiveDiagram({ boxes }: HiveDiagramProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-end gap-px">
      {boxes.map((box, i) => {
        if (box.section === "excluder") {
          return (
            <div
              key={`ex-${i}`}
              className="w-full border-t-2 border-dashed border-rose-600"
              aria-label="Queen excluder"
            />
          );
        }
        const kit = kitConfig[box.kitType];
        const height = sectionHeight[box.section];
        return (
          <div
            key={`box-${i}`}
            className={`relative ${height} flex items-center justify-center rounded-sm shadow-sm ring-1 ring-black/10`}
            style={{ width: `${kit.widthPct}%`, backgroundColor: kit.fill }}
            aria-label={`${kit.label} ${box.section}${box.count > 1 ? ` ×${box.count}` : ""}`}
          >
            {box.count > 1 && (
              <span className="text-[7px] font-bold leading-none text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
                {box.count}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
