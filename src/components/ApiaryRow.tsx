import {
  CloudSun,
  Cloud,
  Sun,
  CloudRain,
  CloudFog,
  Navigation,
} from "lucide-react";
import type { Apiary, WeatherIcon } from "@/types";

interface ApiaryRowProps {
  apiary: Apiary;
  onClick?: (label: string) => void;
}

const weatherIcons: Record<WeatherIcon, typeof Sun> = {
  sunny: Sun,
  partly: CloudSun,
  cloudy: Cloud,
  rain: CloudRain,
  overcast: CloudFog,
};

export function ApiaryRow({ apiary, onClick }: ApiaryRowProps) {
  const WeatherIcon = weatherIcons[apiary.weather.icon] ?? CloudSun;
  const windRotation = apiary.weather.windDirection ?? 0;

  return (
    <div className="overflow-hidden rounded-2xl border border-amber-200/60 bg-[#f5e6c8] shadow-sm">
      {/* Top section – reduced padding */}
      <div className="flex gap-2.5 px-2.5 pt-2.5 pb-1.5">
        {/* Left column: Photo + Weather */}
        <div className="flex w-[4.75rem] shrink-0 flex-col items-center gap-1">
          {/* Photo */}
          <button
            onClick={() => onClick?.(`Photo ${apiary.name}`)}
            className="h-[4.5rem] w-[4.5rem] overflow-hidden rounded-xl bg-stone-300 shadow-sm ring-1 ring-black/5"
          >
            {apiary.photoUrl ? (
              <img
                src={apiary.photoUrl}
                alt={apiary.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs text-stone-500">
                Photo
              </div>
            )}
          </button>

          {/* Weather under photo */}
          <div className="flex flex-col items-center gap-0.5 text-center">
            <WeatherIcon className="h-4.5 w-4.5 text-sky-600" strokeWidth={1.75} />
            <div className="text-[13px] font-semibold leading-none text-stone-800">
              {apiary.weather.highTemp}°{" "}
              <span className="font-normal text-stone-500">
                {apiary.weather.lowTemp}°
              </span>
            </div>
            <div className="flex items-center gap-0.5 text-[10px] text-stone-600">
              <Navigation
                className="h-2.5 w-2.5"
                style={{ transform: `rotate(${windRotation}deg)` }}
              />
              <span>
                {apiary.weather.lowWind}-{apiary.weather.highWind}mph
              </span>
            </div>
          </div>
        </div>

        {/* Right content */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Name + Date row */}
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h2 className="truncate text-[17px] font-bold leading-tight text-stone-900">
                {apiary.name}
              </h2>
              <p className="truncate text-[13px] text-stone-600">
                {apiary.location}
              </p>
            </div>

            <div className="shrink-0 text-right leading-tight">
              <div className="text-[13px] font-medium text-stone-800">
                {apiary.lastVisit}
              </div>
              {apiary.isMixed && (
                <div className="text-[11px] text-stone-500">Mixed</div>
              )}
            </div>
          </div>

          {/* Notes box – always present, fills remaining space */}
          <div className="mt-1.5 min-h-[3.25rem] flex-1 rounded-md border border-stone-400/60 bg-[#f5e6c8]/60 px-2 py-1">
            {apiary.todos.length > 0 ? (
              <ul className="space-y-0.5 text-[12.5px] leading-snug text-stone-800">
                {apiary.todos.map((todo, i) => (
                  <li key={i}>{todo}</li>
                ))}
              </ul>
            ) : (
              // Empty state – keeps the box height consistent
              <div className="h-full text-[12px] text-stone-400/80">
                {/* Will later show AI recommendations or placeholder */}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom counts bar – tighter */}
      <div className="border-t border-amber-200/50 bg-amber-50/50 px-3 py-1 text-center text-[12.5px] text-stone-700">
        <span className="font-semibold">{apiary.counts.total} colonies</span>
        <span className="mx-1.5 text-stone-400">·</span>
        {apiary.counts.hive} hive
        <span className="mx-1.5 text-stone-400">·</span>
        {apiary.counts.nuc} nuc
        <span className="mx-1.5 text-stone-400">·</span>
        {apiary.counts.apidea} apidea
      </div>
    </div>
  );
}