# Memomancy Web - Component & API Reference

## Components

### Layout Components

#### AppHeader
**Location**: `app/components/AppHeader.vue`

Fixed navigation header with mix-blend-difference for visibility over any background.

```vue
<AppHeader />
```

**Features**:
- Desktop horizontal navigation (md+)
- Mobile bottom drawer navigation (< md) using `UDrawer`
- Mix-blend-difference effect for universal visibility
- Navigation routes: Home, Gallery, Reservation, Pricing

---

#### AppFooter
**Location**: `app/components/AppFooter.vue`

Site footer with brand info, quick links, and contact details.

```vue
<AppFooter />
```

---

#### SectionLayout
**Location**: `app/components/SectionLayout.vue`

Standardized section wrapper with marker and identifier.

```vue
<SectionLayout marker="SECTION TITLE" identifier="01" id="section-id">
  <!-- Content -->
</SectionLayout>
```

**Props**:
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `marker` | `string` | Yes | Section header text (displayed uppercase with square symbol) |
| `identifier` | `string` | No | Section identifier (displayed as "M - ##") |
| `id` | `string` | No | HTML id attribute |

**Features**:
- Auto-applies `data-parallax` attribute
- Offwhite background
- Uniform padding and gap spacing

---

### UI Components

#### AnimatedButton
**Location**: `app/components/AnimatedButton.vue`

Text-based link with animated underline effect on hover.

```vue
<AnimatedButton to="/gallery" classes="text-gold font-lato text-normal-4">
  Explore Gallery
</AnimatedButton>
```

**Props**:
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `to` | `string` | Yes | Navigation target (NuxtLink destination) |
| `classes` | `string` | No | Additional CSS classes |

**Animation**: Border disappears from left-to-right then reappears from left on hover (0.6s duration).

---

### Gallery Components

#### GalleryProjectCard
**Location**: `app/components/Gallery/GalleryProjectCard.vue`

Project thumbnail card with title, location, and date.

```vue
<GalleryProjectCard
  :project="project"
  :thumbnail-url="getThumbnailUrl(project.thumbnail)"
  @click="openModal"
/>
```

**Props**:
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `project` | `Project` | Yes | Project data object |
| `thumbnailUrl` | `string` | Yes | URL for thumbnail media |

**Events**:
| Event | Payload | Description |
|-------|---------|-------------|
| `click` | `Project` | Emitted when card is clicked |

---

#### GalleryModal
**Location**: `app/components/Gallery/GalleryModal.vue`

Modal for displaying project media details.

```vue
<GalleryModal
  v-model:visible="modalVisible"
  :project="selectedProject"
/>
```

**Props**:
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `visible` | `boolean` | Yes | Controls modal visibility (v-model) |
| `project` | `Project \| null` | Yes | Project to display |

---

#### GalleryItem
**Location**: `app/components/Gallery/GalleryItem.vue`

Individual media item within gallery modal.

---

## Composables

### useMedia
**Location**: `app/composables/useMedia.ts`

Handles media URL generation for R2 (production) or local files (development).

```ts
const { getMediaUrl, getVideoUrl, getImageUrl, isProduction } = useMedia();

// Get URL for any media file
const url = getMediaUrl('filename.jpg', 'folder');

// Get URL for video (auto-prefixes with 'videos/')
const videoUrl = getVideoUrl('Tia.mp4');

// Get URL for image (auto-prefixes with 'images/')
const imageUrl = getImageUrl('photo.jpg');
```

**Returns**:
| Property | Type | Description |
|----------|------|-------------|
| `getMediaUrl` | `(filename: string, folder?: string) => string` | Get URL for any media file |
| `getVideoUrl` | `(filename: string) => string` | Get URL for video file |
| `getImageUrl` | `(filename: string) => string` | Get URL for image file |
| `isProduction` | `ComputedRef<boolean>` | Whether running in production |

---

### useGalleryProjects
**Location**: `app/composables/useGalleryProjects.ts`

Manages gallery project data with pagination.

```ts
const {
  projects,
  PROJECTS_PER_PAGE,
  totalPages,
  getProjectsForPage,
  getMediaUrl,
  getThumbnailUrl,
  formatDate,
} = useGalleryProjects();
```

**Returns**:
| Property | Type | Description |
|----------|------|-------------|
| `projects` | `Project[]` | All project data |
| `PROJECTS_PER_PAGE` | `number` | Items per page (5) |
| `totalPages` | `ComputedRef<number>` | Total number of pages |
| `getProjectsForPage` | `(page: number) => Project[]` | Get projects for specific page |
| `getMediaUrl` | `(media) => string` | Get URL for media item |
| `getThumbnailUrl` | `(thumbnail) => string` | Get URL for thumbnail |
| `formatDate` | `(project: Project) => string` | Format project date |

---

### useParallax
**Location**: `app/composables/useParallax.ts`

Enables parallax scrolling effects on sections.

```ts
// Basic usage - call in component setup
useParallax();

// With custom options
useParallax({
  contentSelector: '[data-parallax]',
  mediaSelector: '[data-parallax-media]',
  contentSpeed: 0.25,
  mediaSpeed: 0.3
});
```

**Usage in templates**:
```vue
<!-- Content parallax (text/divs move slower) -->
<section data-parallax>
  Content here
</section>

<!-- Media parallax (images/videos create depth effect) -->
<div data-parallax-media>
  <video src="..." />
</div>
```

**Options**:
| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `contentSelector` | `string` | `'[data-parallax]'` | Selector for content sections |
| `mediaSelector` | `string` | `'[data-parallax-media]'` | Selector for media sections |
| `contentSpeed` | `number` | `0.25` | Parallax speed for content |
| `mediaSpeed` | `number` | `0.3` | Parallax speed for media |

---

### useR2
**Location**: `app/composables/useR2.ts`

R2 bucket operations.

```ts
const { listObjects } = useR2();

const objects = await listObjects();
```

---

## TypeScript Interfaces

**Location**: `app/types/index.ts`

### Project
```ts
interface Project {
  id: string;
  title: string;
  location: string;
  day: number;
  month: number;
  year: number;
  thumbnail: ProjectThumbnail;
  media: ProjectMedia[];
}
```

### ProjectMedia
```ts
interface ProjectMedia {
  id: number;
  type: "photo" | "video";
  src: string;
  title?: string;
}
```

### ProjectThumbnail
```ts
interface ProjectThumbnail {
  type: "photo" | "video";
  src: string;
}
```

### EventReality (Database)
```ts
interface EventReality {
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
```

### Media (Database)
```ts
interface Media {
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
```

### EastJavaRegion
```ts
interface EastJavaRegion {
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
```

---

## API Routes

### Media Routes

#### GET `/api/media/[...path]`
Fetch media file from R2 (production) or public folder (development).

#### GET `/api/media/[id]`
Get media by ID from database.

#### PUT `/api/media/[id]`
Update media record.

#### DELETE `/api/media/[id]`
Delete media record.

---

### Events Routes

#### GET `/api/events`
List all events.

#### POST `/api/events`
Create new event.

---

### R2 Routes

#### GET `/api/r2/health`
Check R2 bucket health/connectivity.

---

## Nuxt UI Components Used

The project uses **Nuxt UI 4.3.0** components:

| Component | Usage |
|-----------|-------|
| `UDrawer` | Mobile navigation drawer |
| `USeparator` | Section dividers |
| `USkeleton` | Loading placeholders |
| `UAccordion` | Expandable content (philosophy section) |

**UI Configuration** (in `nuxt.config.ts`):
```ts
ui: {
  colorMode: false, // Color mode disabled
}
```

---

## Data Files

### commonInformations.ts
**Location**: `app/data/commonInformations.ts`

Contact and social media information:
- `phoneNumber`, `phoneLink`
- `whatsappLink`
- `emailAddress`, `emailLink`
- `instagramName`, `instagramLink`
- `tiktokName`, `tiktokLink`
- `facebookName`, `facebookLink`
- `youtubeName`, `youtubeLink`
- `address`
- `socialMediaStats`

### eastJavaRegions.ts
**Location**: `app/data/eastJavaRegions.ts`

Regional coverage data for East Java service areas.

---

## Database Schema

**Location**: `server/database/schema.ts`

### events table
```sql
CREATE TABLE events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  start_date INTEGER NOT NULL,
  end_date INTEGER NOT NULL,
  location TEXT NOT NULL,
  event_type TEXT NOT NULL,
  outdoor TEXT NOT NULL,
  media TEXT,
  thumbnail TEXT,
  capacity INTEGER NOT NULL,
  region TEXT NOT NULL,
  created_at INTEGER DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at INTEGER DEFAULT CURRENT_TIMESTAMP NOT NULL
);
```

### medias table
```sql
CREATE TABLE medias (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL,
  blob_path TEXT NOT NULL,
  event_id INTEGER REFERENCES events(id),
  liked INTEGER DEFAULT 0,
  created_at INTEGER DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at INTEGER DEFAULT CURRENT_TIMESTAMP NOT NULL
);
```