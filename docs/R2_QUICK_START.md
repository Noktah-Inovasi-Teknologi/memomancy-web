# R2 Quick Start Guide

## Current Setup ✅

Your R2 bucket is already configured and working! Here's what's in place:

### R2 Bucket: `memomancy`
```
✅ videos/Rizvi.mp4 (150.68 MB)
✅ videos/Tia.mp4 (30.85 MB)
✅ videos/video_thumbnail.mp4 (24.09 MB)
✅ images/image_thumbnail.jpg (3.06 MB)
```

### Current Configuration (.env)
```env
CLOUDFLARE_R2_S3=https://xxxxx.r2.cloudflarestorage.com
CLOUDFLARE_R2_ACCESS_KEY_ID=your_access_key_here
CLOUDFLARE_R2_SECRET_ACCESS_KEY=your_secret_access_key_here
CLOUDFLARE_R2_BUCKET_NAME=memomancy
```

## How It Works

### Development Mode (Default)
- Comment out R2 credentials in `.env`
- Media served from `/public/videos/` and `/public/images/`
- Fast, no network requests
- Perfect for local development

### Production Mode
- R2 credentials set in environment
- Media fetched from R2 via S3 API
- Streamed through `/api/media/*` endpoints
- Automatic caching headers

## Usage in Your Code

All pages use the `useMedia()` composable:

```vue
<script setup>
const { getVideoUrl } = useMedia();

// Automatically returns the right URL based on environment
const videoSrc = getVideoUrl('Tia.mp4');
// Returns: /api/media/videos/Tia.mp4
</script>

<template>
  <video :src="videoSrc" autoplay muted loop />
</template>
```

## To Deploy to Production

1. **Add environment variables** to Cloudflare Pages/Workers:
   ```
   CLOUDFLARE_R2_S3=https://xxxxx.r2.cloudflarestorage.com
   CLOUDFLARE_R2_ACCESS_KEY_ID=your_access_key_here
   CLOUDFLARE_R2_SECRET_ACCESS_KEY=your_secret_access_key_here
   CLOUDFLARE_R2_BUCKET_NAME=memomancy
   ```

2. **Deploy your app** - that's it!

## Testing R2 Locally

Want to test R2 integration before deploying?

1. Keep R2 credentials **uncommented** in `.env`
2. Run `pnpm dev`
3. Visit your app - media will load from R2!
4. Comment out credentials again to go back to local files

## API Endpoints

### Serve Media
```
GET /api/media/videos/Tia.mp4
GET /api/media/images/photo.jpg
GET /api/media/{folder}/{filename}
```

### Upload Media (for future use)
```
POST /api/media/upload
Content-Type: multipart/form-data
```

## Files Created

- ✅ [server/utils/r2.ts](../server/utils/r2.ts) - R2 utility functions
- ✅ [server/api/media/[...path].get.ts](../server/api/media/[...path].get.ts) - Media serving endpoint
- ✅ [server/api/media/upload.post.ts](../server/api/media/upload.post.ts) - Upload endpoint
- ✅ [app/composables/useMedia.ts](../app/composables/useMedia.ts) - Media URL composable
- ✅ [app/pages/index.vue](../app/pages/index.vue) - Updated to use composable

## What Changed

### Before
```typescript
const videoSrc = `/videos/Tia.mp4`; // Hardcoded path
```

### After
```typescript
const { getVideoUrl } = useMedia();
const videoSrc = getVideoUrl('Tia.mp4'); // Environment-aware
```

## Benefits

- 🚀 **Zero code changes** between dev and prod
- 💾 **No public bucket** needed (files served through your API)
- 🔒 **Secure** - R2 credentials never exposed to client
- ⚡ **Fast dev** - local files, no network
- 📦 **Scalable** - R2 handles any traffic
- 💰 **Free egress** - Cloudflare R2 has no bandwidth fees

## Need Help?

See [R2_SETUP.md](./R2_SETUP.md) for detailed documentation.
