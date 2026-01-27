// Common interfaces used across the application

export interface EventReality {
  id?: number | null;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  eventType: string;
  outdoor: string;
  media: JSON | null;
  thumbnail: string | null;
  capacity: number;
  region: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Media {
  id?: number | null;
  name: string;
  description: string | null;
  type: string;
  blobPath: string;
  eventId: number;
  liked: number;
  createdAt: Date;
  updatedAt: Date;
}

// East Java Region interface
export interface EastJavaRegion {
  id: string;
  name: string;
  type: "kabupaten" | "kota";
  patches: number[];
  status: "covered" | "coming_soon" | "not_covered";
  photographers?: string;
  response?: string;
  popular?: boolean;
  svgPath?: string;
  labelPosition?: { x: number; y: number };
}

// Gallery interfaces
export interface GalleryImage {
  src: string;
  alt: string;
  title: string;
  location?: string;
  serviceType?: string;
  date?: string;
}

export interface ProjectMedia {
  id: number;
  type: "photo" | "video";
  src: string;
  title?: string;
}

export interface ProjectThumbnail {
  type: "photo" | "video";
  src: string;
}

export interface Project {
  id: string;
  title: string;
  location: string;
  day: number;
  month: number;
  year: number;
  thumbnail: ProjectThumbnail;
  media: ProjectMedia[];
}

// Contact interfaces
export interface ContactMethod {
  icon: string;
  title: string;
  subtitle: string;
  contact: string;
  buttonText: string;
  href: string;
}

// Reservation interfaces
export interface ReservationStep {
  title: string;
  description: string;
  number: number;
  icon: string;
  details?: string[];
  celebration?: boolean;
}

// General UI interfaces
export interface WhyUsItem {
  title: string;
  description: string;
  icons: string[];
}
