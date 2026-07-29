import { useId } from "react";
import { Crown } from "lucide-react";
import type { QueenCode } from "@/types";

interface QueenBadgeProps {
  code: QueenCode;
}

const colorMap: Record<string, string> = {
  B: "#3B82F6",
  G: "#22A45A",
  R: "#EF4444",
  Y: "#EAB308",
  W: "#E5E7EB",
  P: "#A855F7",
};

export function QueenBadge({ code }: QueenBadgeProps) {
  const clipped = code[1] === "C";
  const colorLetter = code[2];
  const color = colorMap[colorLetter] ?? "#78716C";
  const clipId = useId();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-0.5">
      <Crown
        className="h-4 w-4"
        strokeWidth={2.25}
        style={{ color }}
      />
      <svg width="36" height="22" viewBox="0 0 36 22" aria-label="Queen wings">
        {clipped && (
  <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
    {/* Keep the inner half of the left wing (near the body), cut at the midpoint */}
    <polygon points="11,0 18,0 18,15 8,15" />
  </clipPath>
)}
        {/* Left wing */}
        <g clipPath={clipped ? `url(#${clipId})` : undefined}>
          <path
            d="M18 4 C 13 4, 7 7, 2 13 C 6 14, 12 14, 16 11 C 17 10, 18 8, 18 4 Z"
            fill={color}
            stroke="#00000033"
            strokeWidth="0.6"
            strokeLinejoin="round"
          />
          {/* Wing vein detail */}
          <path
            d="M17 5 C 13 6, 9 8, 4 12"
            fill="none"
            stroke="#000000"
            strokeWidth="0.4"
          />
        </g>
        {/* Right wing */}
        <g>
          <path
            d="M18 4 C 23 4, 29 7, 34 13 C 30 14, 24 14, 20 11 C 19 10, 18 8, 18 4 Z"
            fill={color}
            stroke="#00000033"
            strokeWidth="0.6"
            strokeLinejoin="round"
          />
          {/* Wing vein detail */}
          <path
            d="M19 5 C 23 6, 27 8, 32 12"
            fill="none"
            stroke="#ffffff55"
            strokeWidth="0.4"
          />
        </g>
      </svg>
    </div>
  );
}
