import type { Apiary } from "@/types";
import drumsPhoto from "@/images/drums.jpg"

export const sampleApiaries: Apiary[] = [
  {
    id: "a1",
    name: "Drums",
    location: "Langbank, Renfrewshire",
    photoUrl: drumsPhoto,
    todos: [
      "Bring 4 brood boxes with drawn comb",
      "Bring 1 super",
      "Hive 4 queenless",
    ],
    weather: {
      highTemp: 18,
      lowTemp: 10,
      highWind: 8,
      lowWind: 3,
      windDirection: 225, // SW-ish
      icon: "partly",
    },
    lastVisit: "8th May",
    isMixed: true,
    counts: {
      total: 12,
      hive: 8,
      nuc: 3,
      apidea: 1,
    },
  },
];

import type { Hive } from "@/types";

export const sampleHives: Hive[] = [
  {
    id: "h1",
    apiaryId: "a1",
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
      lastObservation: "seen",
    },
    temperament: "CALM",
    diseaseStatus: "clean",
    inspection: "LEAVE",
    lastInspection: "15-5",
    brood: ["e", "l", "c", "d"],   // All four
  },
  {
    id: "h2",
    apiaryId: "a1",
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
      lastObservation: "not_seen",
    },
    temperament: "ACTIVE",
    diseaseStatus: "disease",
    inspection: "URGENT",
    lastInspection: "02-5",
    brood: ["e", "l", "c"],        // Eggs + larvae + capped
  },
  {
    id: "h3",
    apiaryId: "a1",
    hiveNumber: 3,
    boxes: [
      { section: "excluder", count: 1 },
      { section: "brood", kitType: "bs_poly", count: 1 },
    ],
    queen: {
      clipped: true,
      colour: "Y",
      year: 2024,
      lastObservation: "virgin_seen",
    },
    temperament: "CALM",
    diseaseStatus: "clean",
    inspection: "DUE",
    lastInspection: "10-5",
    brood: ["e", "l"],             // Eggs + larvae only
  },
  {
    id: "h4",
    apiaryId: "a1",
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
      lastObservation: "queenless_presumed",
    },
    temperament: "DEFENSIVE",
    diseaseStatus: "foul",
    inspection: "URGENT",
    lastInspection: "28-4",
    brood: [],                     // No record → shows ?
  },
  {
    id: "h5",
    apiaryId: "a1",
    hiveNumber: 5,
    boxes: [
      { section: "brood", kitType: "maisemore", count: 3 },
    ],
    queen: {
      clipped: false,
      colour: "P",
      year: 2025,
      lastObservation: "virgin_presumed",
    },
    temperament: "CALM",
    diseaseStatus: "disease",
    inspection: "MONITOR",
    lastInspection: "18-5",
    brood: ["c", "d"],             // Capped + drones only
  },
];


//inspection data

// src/data.ts (or inspections.ts)

export const sampleInspections: Inspection[] = [
  {
    id: "i1",
    hiveId: "h1",
    date: "2025-05-15",
    displayDate: "15-5",
    queen: {
      clipped: true,
      colour: "B",
      year: 2025,
      lastObservation: "seen",
    },
    brood: ["e", "l", "c"],
    swarm: ["sc"],
    quality: "*",
    diseases: [],                    // clean this visit
    temperament: "calm",
    honeyStores: "decent",
    pollenStores: "great",
    boxChanges: [{ section: "super", kitType: "wooden", count: 1 }],
    inspectionType: "fch",
    notes: "Strong build-up",
  },
  {
    id: "i2",
    hiveId: "h1",
    date: "2025-05-02",
    displayDate: "02-5",
    queen: {
      clipped: true,
      colour: "B",
      year: 2025,
      lastObservation: "not_seen",
    },
    brood: ["e", "l"],
    quality: "~",
    diseases: ["chalk", "sac"],      // two diseases recorded
    temperament: "calm",
    honeyStores: "light",
    pollenStores: "ok",
    varroa: "vrns",
    inspectionType: "qch",
  },
  {
    id: "i3",
    hiveId: "h1",
    date: "2025-04-18",
    displayDate: "18-4",
    queen: {
      clipped: true,
      colour: "B",
      year: 2025,
      lastObservation: "seen",
    },
    brood: ["c", "d"],
    swarm: ["ec", "lc"],
    quality: "¬",
    diseases: [],
    temperament: "skitty",
    boxChanges: [
      { section: "brood", kitType: "wooden", count: -1 },
      { section: "brood", kitType: "wooden", count: 1 },
    ],
    excluder: "dx",
    varroa: 3,
    varroaTreatment: "+vr",
    inspectionType: "fch",
    cellActions: ["cut21"],
  },
];