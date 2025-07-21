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
