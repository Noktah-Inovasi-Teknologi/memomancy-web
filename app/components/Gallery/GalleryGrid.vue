<script lang="ts" setup>
const mediaList = [
  {
    id: 1,
    title: "Media 1",
    type: "image",
    src: "images/x2.png",
  },
  {
    id: 2,
    title: "Media 2",
    type: "video",
    orientation: "landscape",
    src: "videos/v1.mp4",
  },
  {
    id: 3,
    title: "Media 3",
    type: "video",
    orientation: "portrait",
    src: "videos/v2.mp4",
  },
  {
    id: 4,
    title: "Media 4",
    type: "image",
    src: "images/x8.png",
  },
  {
    id: 5,
    title: "Media 5",
    type: "video",
    orientation: "portrait",
    src: "images/x9.png",
  },
  {
    id: 6,
    title: "Media 6",
    type: "image",
    src: "images/x13.png",
  },
  {
    id: 7,
    title: "Media 7",
    type: "image",
    src: "images/x12.png",
  },
  {
    id: 8,
    title: "Media 8",
    type: "video",
    orientation: "square",
    src: "images/x10.png",
  },
  {
    id: 9,
    title: "Media 9",
    type: "video",
    orientation: "square",
    src: "videos/v1.mp4",
  },
];
</script>

<template>
  <div
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-uniform-4"
  >
    <GalleryItem
      v-for="media in mediaList"
      :key="media.id"
      :media="media"
      class="w-full h-full"
      :class="{
        'col-span-2':
          media.type === 'video' &&
          media.orientation === 'landscape' &&
          $viewport.isGreaterOrEquals('md'),
        'col-span-1 row-span-2':
          media.type === 'video' &&
          media.orientation === 'portrait' &&
          $viewport.isGreaterOrEquals('md'),
      }"
    />
  </div>
</template>
