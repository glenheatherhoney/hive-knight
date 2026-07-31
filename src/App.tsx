import { useState } from "react";
import { sampleApiaries, sampleHives } from "@/data";
import { ApiaryRow } from "@/components/ApiaryRow";
import { HiveRow } from "@/components/HiveRow";
import { Flower2, ChevronLeft } from "lucide-react";
import type { Apiary } from "@/types";

type View = "apiaries" | "hives";

function App() {
  const [view, setView] = useState<View>("apiaries");
  const [selectedApiary, setSelectedApiary] = useState<Apiary | null>(null);
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

  const goBack = () => {
    setView("apiaries");
    setSelectedApiary(null);
  };

  const hivesForApiary = selectedApiary
    ? sampleHives.filter((h) => h.apiaryId === selectedApiary.id)
    : [];

  return (
    <div className="min-h-screen bg-stone-100 pb-24">
      {/* ========== APIARY LIST (start page) ========== */}
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

      {/* ========== HIVE LIST (with fixed apiary header) ========== */}
      {view === "hives" && selectedApiary && (
        <>
          {/* Sticky apiary header */}
          <div className="sticky top-0 z-20 bg-stone-100/95 backdrop-blur pt-2 pb-1 px-3">
            <button
              onClick={goBack}
              className="mb-2 flex items-center gap-1 text-sm font-medium text-amber-800"
            >
              <ChevronLeft className="h-4 w-4" />
              All apiaries
            </button>

            <ApiaryRow apiary={selectedApiary} onClick={handleClick} />
          </div>

          {/* Hive rows */}
          <main className="mx-auto max-w-md space-y-3 px-3 py-4">
            {hivesForApiary.length === 0 ? (
              <p className="text-center text-stone-500 py-8">
                No hives recorded yet
              </p>
            ) : (
              hivesForApiary.map((hive) => (
                <HiveRow key={hive.id} hive={hive} onClick={handleClick} />
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