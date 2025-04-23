<script lang="ts" setup>
const props = defineProps({
  media: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div
    :class="[
      'overflow-hidden rounded-[2rem] w-full',
      media.type === 'image' && 'aspect-square',
      media.type === 'video' &&
        media.orientation === 'landscape' &&
        'aspect-[2/1]',
      media.type === 'video' &&
        media.orientation === 'portrait' &&
        'aspect-[1/2]',
      media.type === 'video' &&
        media.orientation === 'square' &&
        'aspect-square',
    ]"
  >
    <img
      v-if="media.type === 'image'"
      :src="media.src"
      :alt="media.title"
      class="w-full h-full object-cover block !m-0 !p-0"
    />
    <video
      autoplay
      muted
      loop
      playsinline
      v-else-if="media.type === 'video'"
      :src="media.src"
      :alt="media.title"
      class="w-full h-full object-cover block !m-0 !p-0"
      controls
      preload="metadata"
    />
    <!-- <component
      :is="media.type === 'image' ? 'img' : 'video'"
      :src="media.src"
      :alt="media.title"
      class="w-full h-full object-cover block !m-0 !p-0"
      :controls="media.type === 'video'"
      preload="metadata"
    /> -->
  </div>
</template>

<style scoped>
video,
img {
  display: block;
  margin: 0 !important;
  padding: 0 !important;
  border: 0;
  box-sizing: border-box;
}
</style>
