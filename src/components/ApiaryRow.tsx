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
      {/* Top section */}
      <div className="flex gap-3 p-3 pb-2">
        {/* Left column: Photo + Weather */}
        <div className="flex w-24 shrink-0 flex-col items-center gap-1.5">
          {/* Photo */}
          <button
            onClick={() => onClick?.(`Photo ${apiary.name}`)}
            className="h-20 w-20 overflow-hidden rounded-xl bg-stone-300 shadow-sm ring-1 ring-black/5"
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
            <WeatherIcon className="h-5 w-5 text-sky-600" strokeWidth={1.75} />
            <div className="text-sm font-semibold leading-none text-stone-800">
              {apiary.weather.highTemp}°{" "}
              <span className="font-normal text-stone-500">
                {apiary.weather.lowTemp}°
              </span>
            </div>
            <div className="flex items-center gap-0.5 text-[11px] text-stone-600">
              <Navigation
                className="h-3 w-3"
                style={{ transform: `rotate(${windRotation}deg)` }}
              />
              <span>
                {apiary.weather.lowWind}-{apiary.weather.highWind}mph
              </span>
            </div>
          </div>
        </div>

        {/* Right content */}
        <div className="min-w-0 flex-1">
          {/* Name + Date row */}
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h2 className="truncate text-lg font-bold leading-tight text-stone-900">
                {apiary.name}
              </h2>
              <p className="truncate text-sm text-stone-600">
                {apiary.location}
              </p>
            </div>

            <div className="shrink-0 text-right">
              <div className="text-sm font-medium text-stone-800">
                {apiary.lastVisit}
              </div>
              {apiary.isMixed && (
                <div className="text-xs text-stone-500">Mixed</div>
              )}
            </div>
          </div>

          {/* Notes box – now wider */}
          {apiary.todos.length > 0 && (
            <div className="mt-2 rounded-md border border-stone-400/60 bg-[#f5e6c8]/60 px-2.5 py-1.5">
              <ul className="space-y-0.5 text-[13px] leading-snug text-stone-800">
                {apiary.todos.map((todo, i) => (
                  <li key={i}>{todo}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Bottom counts bar */}
      <div className="border-t border-amber-200/50 bg-amber-50/50 px-3 py-1.5 text-center text-[13px] text-stone-700">
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