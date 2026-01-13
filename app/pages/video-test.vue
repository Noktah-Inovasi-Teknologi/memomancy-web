<script setup lang="ts">
const { getVideoUrl } = useMedia();

// Video URLs
const tiaUrl = getVideoUrl("Tia.mp4");
const rizviUrl = getVideoUrl("Rizvi.mp4");

const videoError = ref<string | null>(null);
const videoLoaded = ref({
  tia: false,
  rizvi: false,
});

const handleVideoError = (videoName: string, error: Event) => {
  console.error(`Error loading ${videoName} video:`, error);
  videoError.value = `Failed to load ${videoName} video`;
};

const handleVideoLoaded = (videoName: "tia" | "rizvi") => {
  console.log(`${videoName} video loaded successfully`);
  videoLoaded.value[videoName] = true;
};
</script>

<template>
  <div class="container mx-auto p-uniform-3">
    <h1 class="font-serif text-heading-2 mb-uniform-3">Video Test - R2 Fetch</h1>

    <div v-if="videoError" class="p-uniform-4 bg-red-100 text-red-800 rounded mb-uniform-3">
      <p>{{ videoError }}</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-uniform-3 mb-uniform-4">
      <!-- Tia Video -->
      <div class="border border-gray-300 p-uniform-4 rounded">
        <h2 class="font-serif text-heading-4 mb-uniform-5">Tia.mp4</h2>
        <div class="mb-uniform-5">
          <p class="text-normal-5 mb-uniform-6">
            <strong>URL:</strong>
            <code class="text-xs">{{ tiaUrl }}</code>
          </p>
          <p class="text-normal-5">
            <strong>Status:</strong>
            <span v-if="videoLoaded.tia" class="text-green-600">✓ Loaded</span>
            <span v-else class="text-yellow-600">Loading...</span>
          </p>
        </div>
        <video
          :src="tiaUrl"
          controls
          class="w-full aspect-video bg-black"
          @loadeddata="handleVideoLoaded('tia')"
          @error="handleVideoError('Tia', $event)"
        />
      </div>

      <!-- Rizvi Video -->
      <div class="border border-gray-300 p-uniform-4 rounded">
        <h2 class="font-serif text-heading-4 mb-uniform-5">Rizvi.mp4</h2>
        <div class="mb-uniform-5">
          <p class="text-normal-5 mb-uniform-6">
            <strong>URL:</strong>
            <code class="text-xs">{{ rizviUrl }}</code>
          </p>
          <p class="text-normal-5">
            <strong>Status:</strong>
            <span v-if="videoLoaded.rizvi" class="text-green-600">✓ Loaded</span>
            <span v-else class="text-yellow-600">Loading...</span>
          </p>
        </div>
        <video
          :src="rizviUrl"
          controls
          class="w-full aspect-video bg-black"
          @loadeddata="handleVideoLoaded('rizvi')"
          @error="handleVideoError('Rizvi', $event)"
        />
      </div>
    </div>

    <div class="p-uniform-4 bg-gray-100 rounded">
      <h3 class="font-serif text-heading-5 mb-uniform-5">Testing Info</h3>
      <ul class="list-disc list-inside space-y-2 text-normal-5">
        <li>Videos should load from R2 via <code>/api/media/videos/...</code></li>
        <li>Check browser console for detailed logs</li>
        <li>Check server console for R2 fetch logs</li>
        <li>If videos don't load, ensure R2 binding is configured in wrangler.toml</li>
      </ul>
    </div>

    <div class="mt-uniform-3">
      <NuxtLink to="/r2-test" class="text-blue-600 hover:underline">
        ← Back to R2 List Test
      </NuxtLink>
    </div>
  </div>
</template>