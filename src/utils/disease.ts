import type { DiseaseCode, DiseaseStatus } from "@/types";

/**
 * Derives the hive-level diseaseStatus from a list of
 * all diseases ever recorded on that hive.
 *
 * Priority:
 * 1. afb or efb → "foul"
 * 2. chalk / sac / dwv / cbpv → "disease"
 * 3. nothing → "clean"
 */
export function calculateDiseaseStatus(
  history: DiseaseCode[]
): DiseaseStatus {
  if (!history || history.length === 0) {
    return "clean";
  }

  if (history.includes("afb") || history.includes("efb")) {
    return "foul";
  }

  // Any of the remaining diseases
  return "disease";
}