# Cloudflare R2 Integration Guide

This project uses Cloudflare R2 for media storage in production via the S3-compatible API, while using local `/public` folder files in development.

## How It Works

### Development Mode (R2 credentials not set)
- **Media URLs**: `/api/media/videos/Tia.mp4` → redirects to `/videos/Tia.mp4` (from `/public`)
- **No R2 connection**: All media served from local `/public` folder
- **Automatic**: Just place files in `/public` folder structure

### Production Mode (R2 credentials configured)
- **Media URLs**: `/api/media/videos/Tia.mp4` → fetches from R2 and streams to client
- **R2 connection**: Uses S3-compatible API to fetch files
- **No public bucket needed**: Files served through your API endpoint

## Environment Variables

### Development (.env)
```env
# Comment out or leave empty for development - uses local /public folder
# CLOUDFLARE_R2_S3=
# CLOUDFLARE_R2_ACCESS_KEY_ID=
# CLOUDFLARE_R2_SECRET_ACCESS_KEY=
CLOUDFLARE_R2_BUCKET_NAME=memomancy
```

### Production (.env.production or Cloudflare dashboard)
```env
# Set R2 credentials to enable S3 API access
CLOUDFLARE_R2_S3=https://xxxxx.r2.cloudflarestorage.com
CLOUDFLARE_R2_ACCESS_KEY_ID=your_access_key
CLOUDFLARE_R2_SECRET_ACCESS_KEY=your_secret_key
CLOUDFLARE_R2_BUCKET_NAME=memomancy
```

## Usage in Components

### Using the useMedia Composable

```vue
<script setup>
const { getVideoUrl, getImageUrl, getMediaUrl, isUsingR2 } = useMedia();

// Get video URL (assumes videos are in /videos folder)
const videoSrc = getVideoUrl('my-video.mp4');
// Returns: /api/media/videos/my-video.mp4
// Dev: API redirects to /videos/my-video.mp4 (from /public)
// Prod: API fetches from R2 and streams to client

// Get image URL (assumes images are in /images folder)
const imageSrc = getImageUrl('photo.jpg');
// Returns: /api/media/images/photo.jpg
// Dev: API redirects to /images/photo.jpg (from /public)
// Prod: API fetches from R2 and streams to client

// Get custom media URL with custom folder
const customSrc = getMediaUrl('file.pdf', 'documents');
// Returns: /api/media/documents/file.pdf

// Check if using R2
console.log('Using R2:', isUsingR2.value);
</script>

<template>
  <video :src="videoSrc" />
  <img :src="imageSrc" />
</template>
```

## Server-Side R2 Operations

### Uploading Files

```typescript
// In a server API route
import { uploadToR2 } from '~/server/utils/r2';

export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event);
  const file = formData[0];

  // Upload to R2
  const result = await uploadToR2(
    file.data,
    'videos/my-video.mp4',
    'video/mp4'
  );

  return { url: result.url };
});
```

### Listing Files

```typescript
import { listR2Files } from '~/server/utils/r2';

// List all files in videos folder
const videos = await listR2Files('videos/');
```

### Deleting Files

```typescript
import { deleteFromR2 } from '~/server/utils/r2';

await deleteFromR2('videos/old-video.mp4');
```

### Getting Files

```typescript
import { getFromR2 } from '~/server/utils/r2';

const file = await getFromR2('videos/my-video.mp4');
```

### Presigned URLs (for private files)

```typescript
import { getPresignedUrl } from '~/server/utils/r2';

// Generate a URL that expires in 1 hour
const url = await getPresignedUrl('private/video.mp4', 3600);
```

## File Structure

### Local Development
```
public/
├── videos/
│   ├── Tia.mp4
│   └── Rizvi.mp4
└── images/
    ├── photo1.jpg
    └── photo2.jpg
```

### R2 Production Bucket
```
memomancy/ (bucket)
├── videos/
│   ├── Tia.mp4
│   └── Rizvi.mp4
└── images/
    ├── photo1.jpg
    └── photo2.jpg
```

## Setting Up R2 Bucket

### 1. Create R2 Bucket
1. Go to Cloudflare Dashboard
2. Navigate to R2
3. Create a new bucket named `memomancy`
4. **No need to make it public** - files are served through your API

### 2. Create API Token
1. Go to R2 → Manage R2 API Tokens
2. Create a new token with read/write permissions
3. Copy the credentials:
   - Access Key ID
   - Secret Access Key
   - Endpoint URL (S3-compatible endpoint)

### 3. Upload Existing Media
Upload your existing media files from `/public/videos/` and `/public/images/` to the R2 bucket:
- Maintain the same folder structure (`videos/`, `images/`)
- Use Cloudflare dashboard, Wrangler CLI, or S3-compatible tools

Example structure in R2:
```
memomancy/
├── videos/
│   ├── Rizvi.mp4
│   ├── Tia.mp4
│   └── video_thumbnail.mp4
└── images/
    └── image_thumbnail.jpg
```

### 4. Set Environment Variables
In Cloudflare Pages/Workers dashboard or your production environment:
```
CLOUDFLARE_R2_S3=https://xxxxx.r2.cloudflarestorage.com
CLOUDFLARE_R2_ACCESS_KEY_ID=your_key
CLOUDFLARE_R2_SECRET_ACCESS_KEY=your_secret
CLOUDFLARE_R2_BUCKET_NAME=memomancy
```

## Testing

### Test in Development
```bash
# Should use local files
pnpm dev
# Visit http://localhost:3000
# Videos should load from /public/videos/
```

### Test Production Mode Locally
```bash
# Set R2 credentials in .env (uncomment the lines)
CLOUDFLARE_R2_S3=https://xxxxx.r2.cloudflarestorage.com
CLOUDFLARE_R2_ACCESS_KEY_ID=your_key
CLOUDFLARE_R2_SECRET_ACCESS_KEY=your_secret

pnpm dev
# Videos should now load from R2 via API
```

### Test Upload API
```bash
# Upload a file
curl -X POST http://localhost:3000/api/media/upload \
  -F "file=@video.mp4"
```

## Troubleshooting

### Videos not loading in development
- Check that files exist in `/public/videos/`
- Verify file names match exactly (case-sensitive)

### Videos not loading in production
- Check that R2 credentials are set in environment variables
- Verify credentials are correct
- Check that files exist in R2 bucket with correct paths
- Verify folder structure matches (`videos/`, `images/`)
- Check server logs for R2 connection errors

### Upload errors
- Check R2 credentials are correct
- Verify bucket name matches
- Ensure API token has read/write permissions
- Check S3 endpoint URL is correct

### API endpoint errors
- Verify `/api/media/[...path].get.ts` is deployed
- Check server logs for specific error messages
- Test R2 connection using AWS SDK directly

## Migration Checklist

- [x] Create R2 bucket (memomancy) ✅
- [x] Upload media files to R2 with correct structure ✅
  - videos/Rizvi.mp4
  - videos/Tia.mp4
  - videos/video_thumbnail.mp4
  - images/image_thumbnail.jpg
- [x] Create API token with read/write permissions ✅
- [ ] Set environment variables in production (Cloudflare Pages/Workers)
- [ ] Test media loading in production
- [ ] Update deployment configuration if needed
- [ ] Optional: Keep local files as backup in `/public`

## Benefits

✅ **Automatic environment switching**: Just set/unset environment variables
✅ **Fast development**: Use local files without network requests or R2 setup
✅ **No public bucket needed**: Files served securely through your API
✅ **Production-ready**: Scalable storage with S3-compatible API
✅ **Cost-effective**: Cloudflare R2 has no egress fees
✅ **Type-safe**: Full TypeScript support
✅ **Easy testing**: Test R2 integration locally by setting credentials
