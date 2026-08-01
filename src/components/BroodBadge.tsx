import type { BroodStatus } from "@/types";

interface BroodBadgeProps {
  brood: BroodStatus[];
}

/** Simple SVGs – designed to read clearly at ~20×20 px */
const icons: Record<BroodStatus, React.ReactNode> = {
  e: (
    // Egg – soft oval
    <svg viewBox="0 0 24 24" className="h-full w-full">
      <ellipse cx="12" cy="13" rx="7.5" ry="9" fill="#F5E6B8" stroke="#D4B96A" strokeWidth="1.2" />
      <ellipse cx="10" cy="10" rx="2.2" ry="3.5" fill="#FFF8E0" opacity="0.7" />
    </svg>
  ),
  l: (
    // Curled larva
    <svg viewBox="0 0 24 24" className="h-full w-full">
      <path
        d="M7 16c0-1.5 1-3 2.5-4.2C11 10.5 12.5 9 14 8.5c1.8-.6 3.2.2 3.5 1.8.3 1.4-.6 2.8-2 3.6-1.5.9-3.2 1.3-4.8 1.1-1.4-.2-2.7-1-3.2-2.3z"
        fill="#F0EDE6"
        stroke="#A89F8F"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <circle cx="8.5" cy="15.5" r="1.1" fill="#5C5346" />
    </svg>
  ),
  c: (
    // Flat / old-man cap
    <svg viewBox="0 0 24 24" className="h-full w-full">
      <path
        d="M4 14.5c0-1.5 1.8-3.2 5-4.2 1.5-.5 3.2-.7 5-.5 3.2.4 5.5 2.2 5.5 4.2v1.2H4v-1.2z"
        fill="#8B7355"
        stroke="#5C4A32"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <path
        d="M5 15.5h14c.6 0 1 .4 1 1v.8c0 .3-.2.5-.5.5H4.5c-.3 0-.5-.2-.5-.5v-.8c0-.6.4-1 1-1z"
        fill="#6B5340"
      />
      <ellipse cx="12" cy="11.2" rx="1.3" ry="0.7" fill="#5C4A32" />
    </svg>
  ),
  d: (
    // X-style mechanical drone
    <svg viewBox="0 0 24 24" className="h-full w-full">
      <rect x="9" y="9" width="6" height="6" rx="1.2" fill="#3D4450" />
      <path d="M5 5l4.2 4.2M19 5l-4.2 4.2M5 19l4.2-4.2M19 19l-4.2-4.2" stroke="#3D4450" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="5" cy="5" r="1.6" fill="#3D4450" />
      <circle cx="19" cy="5" r="1.6" fill="#3D4450" />
      <circle cx="5" cy="19" r="1.6" fill="#3D4450" />
      <circle cx="19" cy="19" r="1.6" fill="#3D4450" />
    </svg>
  ),
};

const ORDER: BroodStatus[] = ["e", "l", "c", "d"];

export function BroodBadge({ brood }: BroodBadgeProps) {
  // No record
  if (!brood || brood.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <span className="text-lg font-bold text-stone-400">?</span>
      </div>
    );
  }

  const present = new Set(brood);

  return (
    <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-0.5 p-0.5">
      {ORDER.map((key) => (
        <div key={key} className="flex items-center justify-center">
          {present.has(key) ? (
            <div className="h-[18px] w-[18px]">{icons[key]}</div>
          ) : (
            // empty cell – keeps grid stable
            <div className="h-[18px] w-[18px]" />
          )}
        </div>
      ))}
    </div>
  );
}