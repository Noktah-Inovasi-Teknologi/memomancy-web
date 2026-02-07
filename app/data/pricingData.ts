import type {
  CoreService,
  EditingService,
  AddOnService,
  PricingPackage,
  PricingAddOn,
  PackageIncludedItem,
} from "~/types";

// =============================================================================
// CORE SERVICES (Single Source of Truth)
// =============================================================================

export const coreServices: CoreService[] = [
  {
    id: "photography_only",
    type: "photography_only",
    name: "Photography Only",
    price: 150000,
  },
  {
    id: "videography_only",
    type: "videography_only",
    name: "Videography Only",
    price: 250000,
  },
  {
    id: "photo_videography",
    type: "photo_videography",
    name: "Photo & Videography",
    price: 350000,
  },
];

// =============================================================================
// EDITING SERVICES (Single Source of Truth)
// =============================================================================

export const photoEditingServices: EditingService[] = [
  {
    id: "color_grading",
    type: "color_grading",
    mediaType: "photo",
    name: "Color Grading",
    price: 150000,
    unit: "per 15 photos",
  },
];

export const videoEditingServices: EditingService[] = [
  {
    id: "same_day_cut",
    type: "same_day_cut",
    mediaType: "video",
    name: "Same-Day Cut",
    price: 400000,
  },
  {
    id: "express_cut",
    type: "express_cut",
    mediaType: "video",
    name: "Express Cut",
    price: 350000,
  },
  {
    id: "standard_cut",
    type: "standard_cut",
    mediaType: "video",
    name: "Standard Cut",
    price: 300000,
  },
  {
    id: "digital_content_cut",
    type: "digital_content_cut",
    mediaType: "video",
    name: "Digital Content Cut",
    price: 1250000,
  },
  {
    id: "editorial_cut",
    type: "editorial_cut",
    mediaType: "video",
    name: "Editorial Cut",
    price: 2000000,
  },
];

export const editingServices: EditingService[] = [
  ...photoEditingServices,
  ...videoEditingServices,
];

// =============================================================================
// ADD-ON SERVICES (Single Source of Truth)
// =============================================================================

export const gearAddOns: AddOnService[] = [
  {
    id: "drone_coverage",
    category: "gear",
    name: "Drone Coverage",
    price: 500000,
  },
  {
    id: "360_camera",
    category: "gear",
    name: "360° Camera Capture",
    price: 200000,
  },
  {
    id: "microphone_audio",
    category: "gear",
    name: "Microphone / Audio Capture",
    price: 100000,
  },
];

export const crewAddOns: AddOnService[] = [
  {
    id: "additional_photo_videographer",
    category: "crew",
    name: "Additional Photo-Videographer",
    price: 200000,
  },
  {
    id: "production_assistant",
    category: "crew",
    name: "Production Assistant",
    price: 400000,
  },
];

export const scaleComplexityAddOns: AddOnService[] = [
  {
    id: "large_group",
    category: "scale_complexity",
    name: "Large Group (6–12)",
    price: 10,
    isPercentage: true,
  },
  {
    id: "extra_large_group",
    category: "scale_complexity",
    name: "Extra Large Group (>12)",
    price: 20,
    isPercentage: true,
  },
  {
    id: "multi_location",
    category: "scale_complexity",
    name: "Multi-Location Coverage",
    price: 15,
    isPercentage: true,
  },
  {
    id: "low_light_night",
    category: "scale_complexity",
    name: "Low-Light / Night Setup",
    price: 10,
    isPercentage: true,
  },
];

export const timeBoundAddOns: AddOnService[] = [
  {
    id: "additional_hour",
    category: "time_bound",
    name: "Additional Hour",
    price: 300000,
  },
  {
    id: "rush_edit_upgrade",
    category: "time_bound",
    name: "Rush Edit Upgrade",
    price: 20,
    isPercentage: true,
  },
];

export const allAddOnServices: AddOnService[] = [
  ...gearAddOns,
  ...crewAddOns,
  ...scaleComplexityAddOns,
  ...timeBoundAddOns,
];

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "decimal",
    minimumFractionDigits: 0,
  }).format(price);
};

export const getCoreServiceById = (id: string): CoreService | undefined => {
  return coreServices.find((service) => service.id === id);
};

export const getEditingServiceById = (id: string): EditingService | undefined => {
  return editingServices.find((service) => service.id === id);
};

export const getAddOnServiceById = (id: string): AddOnService | undefined => {
  return allAddOnServices.find((service) => service.id === id);
};

// Get price by service ID from any category
const getServicePrice = (serviceId: string): number => {
  const core = getCoreServiceById(serviceId);
  if (core) return core.price;

  const editing = getEditingServiceById(serviceId);
  if (editing) return editing.price;

  const addOn = getAddOnServiceById(serviceId);
  if (addOn) return addOn.price;

  return 0;
};

// Get service name by ID
const getServiceName = (serviceId: string): string => {
  const core = getCoreServiceById(serviceId);
  if (core) return core.name;

  const editing = getEditingServiceById(serviceId);
  if (editing) return editing.name;

  const addOn = getAddOnServiceById(serviceId);
  if (addOn) return addOn.name;

  return serviceId;
};

// =============================================================================
// PACKAGE ITEM BUILDERS (References source services)
// =============================================================================

interface PackageItemConfig {
  category: string;
  serviceId: string;
  displayName?: string;
  multiplier?: number; // For color grading multiples (e.g., 2 for 30 photos, 3 for 45 photos)
}

const buildPackageItem = (config: PackageItemConfig): PackageIncludedItem => {
  const basePrice = getServicePrice(config.serviceId);
  const multiplier = config.multiplier || 1;
  const price = basePrice * multiplier;
  const serviceName = config.displayName || getServiceName(config.serviceId);

  return {
    category: config.category,
    service: serviceName,
    price,
  };
};

// Build percentage-based item (calculated from subtotal)
const buildPercentageItem = (
  category: string,
  serviceId: string,
  subtotal: number
): PackageIncludedItem => {
  const service = getAddOnServiceById(serviceId);
  if (!service || !service.isPercentage) {
    return { category, service: serviceId, price: 0 };
  }

  const percentageAmount = Math.round(subtotal * (service.price / 100));

  return {
    category,
    service: `${service.name} – ${service.price}%`,
    price: percentageAmount,
  };
};

// =============================================================================
// PACKAGE DEFINITIONS (Using service references)
// =============================================================================

// Package discount percentage (applied to all packages)
export const PACKAGE_DISCOUNT_PERCENTAGE = 15;

// Helper to build package with auto-calculated total and discount
const buildPackage = (
  id: string,
  name: string,
  description: string,
  items: PackageItemConfig[],
  percentageItems: Array<{ category: string; serviceId: string }> = [],
  popular = false
): PricingPackage => {
  // Build base items
  const includedItems: PackageIncludedItem[] = items.map(buildPackageItem);

  // Calculate subtotal for percentage calculations
  const subtotal = includedItems.reduce((sum, item) => sum + item.price, 0);

  // Build percentage items
  const percentageIncludedItems = percentageItems.map((pi) =>
    buildPercentageItem(pi.category, pi.serviceId, subtotal)
  );

  // Combine all items
  const allItems = [...includedItems, ...percentageIncludedItems];

  // Calculate original total (before discount)
  const originalPrice = allItems.reduce((sum, item) => sum + item.price, 0);

  // Calculate discounted price
  const discountedPrice = Math.round(originalPrice * (1 - PACKAGE_DISCOUNT_PERCENTAGE / 100));

  return {
    id,
    name,
    description,
    originalPrice,
    discountPercentage: PACKAGE_DISCOUNT_PERCENTAGE,
    discountedPrice,
    includedItems: allItems,
    popular,
  };
};

// Package definitions
export const packages: PricingPackage[] = [
  buildPackage(
    "tourism",
    "Tourism",
    "Capture your travel memories with professional photo and video coverage",
    [
      { category: "Core Service", serviceId: "photo_videography" },
      { category: "Editing", serviceId: "standard_cut", displayName: "Video – Standard Cut" },
      { category: "Editing", serviceId: "color_grading", displayName: "Photo Color Grading (15 photos)", multiplier: 1 },
      { category: "Editing", serviceId: "same_day_cut", displayName: "Video – Same-Day Cut" },
    ]
  ),

  buildPackage(
    "family_intimate",
    "Family / Intimate Activities",
    "Perfect for family gatherings and intimate celebrations",
    [
      { category: "Core Service", serviceId: "photo_videography" },
      { category: "Editing", serviceId: "express_cut", displayName: "Video – Express Cut" },
      { category: "Editing", serviceId: "color_grading", displayName: "Photo Color Grading (30 photos)", multiplier: 2 },
    ]
  ),

  buildPackage(
    "club_community",
    "Club / Community Activities",
    "Ideal for club events, community gatherings, and group activities",
    [
      { category: "Core Service", serviceId: "photo_videography" },
      { category: "Editing", serviceId: "standard_cut", displayName: "Video – Standard Cut" },
      { category: "Editing", serviceId: "color_grading", displayName: "Photo Color Grading (30 photos)", multiplier: 2 },
    ],
    [{ category: "Scale & Complexity", serviceId: "large_group" }]
  ),

  buildPackage(
    "sport_adventure",
    "Sport / Adventure",
    "Dynamic coverage for sports events and adventure activities",
    [
      { category: "Core Service", serviceId: "photo_videography" },
      { category: "Editing", serviceId: "express_cut", displayName: "Video – Express Cut" },
      { category: "Gear", serviceId: "drone_coverage" },
      { category: "Editing", serviceId: "color_grading", displayName: "Photo Color Grading (30 photos)", multiplier: 2 },
    ],
    [{ category: "Scale & Complexity", serviceId: "large_group" }],
    true // popular
  ),

  buildPackage(
    "corporate_event",
    "Corporate Event",
    "Professional coverage for corporate events with full production support",
    [
      { category: "Core Service", serviceId: "photo_videography" },
      { category: "Editing", serviceId: "digital_content_cut", displayName: "Video – Digital Content Cut" },
      { category: "Editing", serviceId: "color_grading", displayName: "Photo Color Grading (45 photos)", multiplier: 3 },
      { category: "Crew", serviceId: "production_assistant" },
      { category: "Gear", serviceId: "microphone_audio" },
    ],
    [{ category: "Scale & Complexity", serviceId: "large_group" }]
  ),
];

// =============================================================================
// ADD-ONS FOR CALCULATOR (Derived from source services)
// =============================================================================

// Add-on descriptions
const addOnDescriptions: Record<string, string> = {
  drone_coverage: "Aerial shots for stunning perspectives",
  "360_camera": "Immersive 360-degree video capture",
  microphone_audio: "Professional audio recording",
  additional_photo_videographer: "Extra crew for more coverage angles",
  production_assistant: "On-site production support",
  additional_hour: "Extend your coverage time",
  large_group: "10% surcharge for larger groups",
  extra_large_group: "20% surcharge for extra large groups",
  multi_location: "15% surcharge for multiple locations",
  low_light_night: "10% surcharge for night shooting",
  rush_edit_upgrade: "20% surcharge for expedited editing",
};

// Build add-ons from source services
export const addOns: PricingAddOn[] = allAddOnServices.map((service) => ({
  id: service.id,
  name: service.name,
  description: addOnDescriptions[service.id] || service.name,
  price: service.price,
  category: service.category,
  isPercentage: service.isPercentage,
  unit: service.unit,
}));

// =============================================================================
// ADDITIONAL EXPORTS
// =============================================================================

export const getPackageById = (id: string): PricingPackage | undefined => {
  return packages.find((pkg) => pkg.id === id);
};

// Category labels for display
export const categoryLabels: Record<string, string> = {
  gear: "Gear",
  crew: "Crew",
  scale_complexity: "Scale & Complexity",
  time_bound: "Time-Bound",
};

// Group items by category for display
export const groupItemsByCategory = (
  items: Array<{ category: string; [key: string]: unknown }>
): Record<string, Array<{ category: string; [key: string]: unknown }>> => {
  return items.reduce(
    (acc, item) => {
      const category = item.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    },
    {} as Record<string, Array<{ category: string; [key: string]: unknown }>>
  );
};
