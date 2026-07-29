import { useId } from "react";
import { Crown } from "lucide-react";
import type { QueenInfo, QueenMarkColour } from "@/types";

interface QueenBadgeProps {
  queen: QueenInfo;
}

const colorMap: Record<NonNullable<QueenMarkColour>, string> = {
  B: "#3B82F6",
  G: "#22A45A",
  R: "#EF4444",
  Y: "#EAB308",
  W: "#E5E7EB",
  P: "#A855F7",
};

export function QueenBadge({ queen }: QueenBadgeProps) {
  const { clipped, colour, lastObservation } = queen;
  const fill = colour ? colorMap[colour] : "#78716C";
  const clipId = useId();

  const isVirgin =
    lastObservation === "virgin_seen" || lastObservation === "virgin_presumed";
  const isQueenless = lastObservation === "queenless_presumed";
  const isSeen =
    lastObservation === "seen" || lastObservation === "virgin_seen";
  const isPresumed =
    lastObservation === "virgin_presumed" || lastObservation === "queenless_presumed";

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-0.5">
      {/* Crown */}
      <Crown className="h-4 w-4" strokeWidth={2.25} style={{ color: fill }} />

      <svg width="36" height="22" viewBox="0 0 36 22" aria-label="Queen status">
        {/* Eyes */}
{(isSeen || isPresumed) && (
  <g>
    {/* Left eye */}
    <circle
      cx="14"
      cy="1.6"
      r="2.7"
      fill={isPresumed ? "none" : "#1c1917"}
      stroke="#1c1917"
      strokeWidth="0.7"
    />
    {/* Right eye */}
    <circle
      cx="22"
      cy="1.6"
      r="2.7"
      fill={isPresumed ? "none" : "#1c1917"}
      stroke="#1c1917"
      strokeWidth="0.7"
    />
    {/* Question marks for presumed */}
    {isPresumed && (
      <>
        <text
          x="14"
          y="4.5"
          textAnchor="middle"
          fontSize="5"
          fontWeight="700"
          fill="#1c1917"
        >
          ?
        </text>
        <text
          x="22"
          y="4.5"
          textAnchor="middle"
          fontSize="5"
          fontWeight="700"
          fill="#1c1917"
        >
          ?
        </text>
      </>
    )}
  </g>
)}

        {/* Virgin → big V */}
        {isVirgin && (
          <text
            x="18"
            y="16"
            textAnchor="middle"
            fontSize="13"
            fontWeight="800"
            fill={fill}
            stroke="#00000033"
            strokeWidth="0.4"
          >
            V
          </text>
        )}

        {/* Queenless → X over everything */}
        {isQueenless && (
          <g stroke="#b91c1c" strokeWidth="1.8" strokeLinecap="round">
            <line x1="8" y1="5" x2="28" y2="17" />
            <line x1="28" y1="5" x2="8" y2="17" />
          </g>
        )}

        {/* Normal / clipped wings (only when not virgin and not queenless) */}
        {!isVirgin && !isQueenless && (
          <>
            {clipped && (
              <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
                {/* Natural angled clip at roughly the midpoint */}
                <polygon points="11,0 18,0 18,15 8,15" />
              </clipPath>
            )}

            {/* Left wing */}
            <g clipPath={clipped ? `url(#${clipId})` : undefined}>
              <path
                d="M18 4 C 13 4, 7 7, 2 13 C 6 14, 12 14, 16 11 C 17 10, 18 8, 18 4 Z"
                fill={fill}
                stroke="#00000033"
                strokeWidth="0.6"
                strokeLinejoin="round"
              />
              <path
                d="M17 5 C 13 6, 9 8, 4 12"
                fill="none"
                stroke="#ffffff55"
                strokeWidth="0.4"
              />
            </g>

            {/* Right wing */}
            <g>
              <path
                d="M18 4 C 23 4, 29 7, 34 13 C 30 14, 24 14, 20 11 C 19 10, 18 8, 18 4 Z"
                fill={fill}
                stroke="#00000033"
                strokeWidth="0.6"
                strokeLinejoin="round"
              />
              <path
                d="M19 5 C 23 6, 27 8, 32 12"
                fill="none"
                stroke="#ffffff55"
                strokeWidth="0.4"
              />
            </g>
          </>
        )}
      </svg>
    </div>
  );
}