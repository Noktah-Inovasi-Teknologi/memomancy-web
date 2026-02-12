import { type EastJavaRegion } from "~/types";

// Service coverage regions
export const EAST_JAVA_REGIONS: EastJavaRegion[] = [
  // Covered Regions (Service Areas)
  {
    id: "yogyakarta",
    name: "Yogyakarta",
    type: "kota",
    patches: [],
    status: "covered",
    photographers: "2+ Fotografer",
    response: "< 30 menit",
    popular: true,
  },
  {
    id: "klaten",
    name: "Klaten",
    type: "kabupaten",
    patches: [],
    status: "covered",
    photographers: "2+ Fotografer",
    response: "< 1 jam",
    popular: false,
  },
  {
    id: "surakarta",
    name: "Surakarta (Solo)",
    type: "kota",
    patches: [],
    status: "covered",
    photographers: "2+ Fotografer",
    response: "< 1 jam",
    popular: true,
  },
  {
    id: "sumenep",
    name: "Sumenep",
    type: "kabupaten",
    patches: [],
    status: "covered",
    photographers: "2+ Fotografer",
    response: "< 2 jam",
    popular: false,
  },
];

// Helper functions
export const getCoveredRegions = () =>
  EAST_JAVA_REGIONS.filter((region) => region.status === "covered");
export const getComingSoonRegions = () =>
  EAST_JAVA_REGIONS.filter((region) => region.status === "coming_soon");
export const getRegionById = (id: string) =>
  EAST_JAVA_REGIONS.find((region) => region.id === id);
export const getRegionsByPatch = (patchNumber: number) =>
  EAST_JAVA_REGIONS.filter((region) => region.patches.includes(patchNumber));
