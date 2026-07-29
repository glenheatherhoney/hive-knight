import type { Hive } from "@/types";

export const sampleHives: Hive[] = [
  {
    id: "h1",
    hiveNumber: 1,
    boxes: [
      { section: "super", kitType: "wooden", count: 1 },
      { section: "excluder", count: 1 },
      { section: "brood", kitType: "wooden", count: 2 },
    ],
    queen: {
      clipped: true,
      colour: "B",
      year: 2025,
      lastObservation: "seen",          // Queen seen + clipped + blue
    },
    temperament: "CALM",
    diseaseStatus: "CLEAN",
    inspection: "LEAVE",
    lastInspection: "15-5",
  },
  {
    id: "h2",
    hiveNumber: 2,
    boxes: [
      { section: "super", kitType: "wooden", count: 1 },
      { section: "super", kitType: "maisemore", count: 1 },
      { section: "brood", kitType: "bs_poly", count: 1 },
    ],
    queen: {
      clipped: false,
      colour: "G",
      year: 2025,
      lastObservation: "not_seen",      // Queen not seen (unclipped green)
    },
    temperament: "ACTIVE",
    diseaseStatus: "CLEAN",
    inspection: "URGENT",
    lastInspection: "02-5",
  },
  {
    id: "h3",
    hiveNumber: 3,
    boxes: [
      { section: "excluder", count: 1 },
      { section: "brood", kitType: "bs_poly", count: 1 },
    ],
    queen: {
      clipped: true,
      colour: "Y",
      year: 2024,
      lastObservation: "virgin_seen",   // Virgin seen
    },
    temperament: "CALM",
    diseaseStatus: "CLEAN",
    inspection: "DUE",
    lastInspection: "10-5",
  },
  {
    id: "h4",
    hiveNumber: 4,
    boxes: [
      { section: "super", kitType: "wooden", count: 2 },
      { section: "excluder", count: 1 },
      { section: "brood", kitType: "wooden", count: 1 },
    ],
    queen: {
      clipped: true,
      colour: "R",
      year: 2025,
      lastObservation: "queenless_presumed", // Queenless (keeps previous colour/clipped)
    },
    temperament: "DEFENSIVE",
    diseaseStatus: "AFB",
    inspection: "URGENT",
    lastInspection: "28-4",
  },
  {
    id: "h5",
    hiveNumber: 5,
    boxes: [
      { section: "brood", kitType: "maisemore", count: 3 },
    ],
    queen: {
      clipped: false,
      colour: "P",
      year: 2025,
      lastObservation: "virgin_presumed", // Virgin presumed
    },
    temperament: "CALM",
    diseaseStatus: "CLEAN",
    inspection: "MONITOR",
    lastInspection: "18-5",
  },
];