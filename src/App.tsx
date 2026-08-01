import { useState } from "react";
import { sampleApiaries, sampleHives, sampleInspections } from "@/data";
import { ApiaryRow } from "@/components/ApiaryRow";
import { HiveRow } from "@/components/HiveRow";
import { InspectionRow } from "@/components/InspectionRow";
import { Flower2, ChevronLeft } from "lucide-react";
import type { Apiary, Hive } from "@/types";

type View = "apiaries" | "hives" | "history";

function App() {
  const [view, setView] = useState<View>("apiaries");
  const [selectedApiary, setSelectedApiary] = useState<Apiary | null>(null);
  const [selectedHive, setSelectedHive] = useState<Hive | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const handleClick = (label: string) => {
    setToast(label);
    window.clearTimeout((handleClick as any)._t);
    (handleClick as any)._t = window.setTimeout(() => setToast(null), 1500);
  };

  const openApiary = (apiary: Apiary) => {
    setSelectedApiary(apiary);
    setView("hives");
  };

  const openHistory = (hive: Hive) => {
    setSelectedHive(hive);
    setView("history");
  };

  const goBackToApiaries = () => {
    setView("apiaries");
    setSelectedApiary(null);
    setSelectedHive(null);
  };

  const goBackToHives = () => {
    setView("hives");
    setSelectedHive(null);
  };

  const hivesForApiary = selectedApiary
    ? sampleHives.filter((h) => h.apiaryId === selectedApiary.id)
    : [];

  const inspectionsForHive = selectedHive
    ? sampleInspections
        .filter((ins) => ins.hiveId === selectedHive.id)
        .sort((a, b) => b.date.localeCompare(a.date))
    : [];

  return (
    <div className="min-h-screen bg-stone-100 pb-24">
      {/* ========== APIARY LIST ========== */}
      {view === "apiaries" && (
        <>
          <header className="sticky top-0 z-10 border-b border-stone-200 bg-stone-50/90 backdrop-blur">
            <div className="mx-auto flex max-w-md items-center gap-2 px-4 py-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400 text-white shadow-sm">
                <Flower2 className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-lg font-bold leading-tight text-stone-800">
                  Hive Knight
                </h1>
                <p className="text-xs text-stone-500">Your apiaries</p>
              </div>
            </div>
          </header>

          <main className="mx-auto max-w-md space-y-3 px-3 py-4">
            {sampleApiaries.map((apiary) => (
              <div
                key={apiary.id}
                onClick={() => openApiary(apiary)}
                className="cursor-pointer active:scale-[0.99] transition"
              >
                <ApiaryRow apiary={apiary} onClick={handleClick} />
              </div>
            ))}
          </main>
        </>
      )}

      {/* ========== HIVE LIST ========== */}
      {view === "hives" && selectedApiary && (
        <>
          <div className="sticky top-0 z-20 bg-stone-100/95 backdrop-blur pt-2 pb-1 px-3">
            <button
              onClick={goBackToApiaries}
              className="mb-2 flex items-center gap-1 text-sm font-medium text-amber-800"
            >
              <ChevronLeft className="h-4 w-4" />
              All apiaries
            </button>
            <ApiaryRow apiary={selectedApiary} onClick={handleClick} />
          </div>

          <main className="mx-auto max-w-md space-y-3 px-3 py-4">
            {hivesForApiary.map((hive) => (
              <HiveRow
                key={hive.id}
                hive={hive}
                onClick={handleClick}
                onOpenHistory={openHistory}   // ← this is the key link
              />
            ))}
          </main>
        </>
      )}

      {/* ========== INSPECTION HISTORY ========== */}
      {view === "history" && selectedHive && selectedApiary && (
        <>
          <div className="sticky top-0 z-20 bg-stone-100/95 backdrop-blur px-3 pt-2 pb-2">
            <button
              onClick={goBackToHives}
              className="mb-2 flex items-center gap-1 text-sm font-medium text-amber-800"
            >
              <ChevronLeft className="h-4 w-4" />
              {selectedApiary.name}
            </button>
      
            <h2 className="text-lg font-bold text-stone-800">
              Hive {selectedHive.hiveNumber} Inspection History
            </h2>
          </div>
      
          <main className="mx-auto max-w-md space-y-2 px-3 py-3">
            {inspectionsForHive.length === 0 ? (
              <p className="py-8 text-center text-stone-500">
                No inspections recorded yet
              </p>
            ) : (
              inspectionsForHive.map((ins) => (
                <InspectionRow
                  key={ins.id}
                  inspection={ins}
                  onClick={handleClick}
                />
              ))
            )}
          </main>
        </>
      )}

      {/* Toast */}
      {toast && (
        <div className="pointer-events-none fixed inset-x-0 bottom-6 z-30 flex justify-center px-4">
          <div className="rounded-full bg-stone-900 px-4 py-2 text-sm font-medium text-white shadow-lg">
            {toast}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;