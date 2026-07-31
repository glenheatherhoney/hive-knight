import { useState } from "react";
import { sampleHives } from "@/data";
import { HiveRow } from "@/components/HiveRow";
import { Flower2 } from "lucide-react";

function App() {
  const [toast, setToast] = useState<string | null>(null);

  const handleClick = (label: string) => {
    setToast(label);
    window.clearTimeout((handleClick as unknown as { _t?: number })._t);
    (handleClick as unknown as { _t?: number })._t = window.setTimeout(
      () => setToast(null),
      1500,
    );
  };

  return (
    <div className="min-h-screen bg-stone-100 pb-24">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-stone-200 bg-stone-50/90 backdrop-blur">
        <div className="mx-auto flex max-w-md items-center gap-2 px-4 py-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400 text-white shadow-sm">
            <Flower2 className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold leading-tight text-stone-800">Apiary Hives</h1>
            <p className="text-xs text-stone-500">Tap any field for details</p>
          </div>
        </div>
      </header>

      {/* Rows */}
      <main className="mx-auto max-w-md space-y-3 px-3 py-4">
        {sampleHives.map((h) => (
          <HiveRow key={h.id} hive={h} onClick={handleClick} />
        ))}
      </main>

      {/* Toast */}
      {toast && (
        <div className="pointer-events-none fixed inset-x-0 bottom-6 z-20 flex justify-center px-4">
          <div className="rounded-full bg-stone-900 px-4 py-2 text-sm font-medium text-white shadow-lg">
            {toast}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
