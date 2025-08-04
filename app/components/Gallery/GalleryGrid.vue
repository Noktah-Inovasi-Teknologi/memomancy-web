<script lang="ts" setup>
const collections = [
  {
    id: 1,
    title: "Nature Collection",
    coverImage: {
      title: "Nature Collection",
      type: "image",
      src: "images/x2.png",
    },
    media: [
      {
        id: 1,
        title: "Forest View",
        type: "image",
        src: "images/x2.png",
      },
      {
        id: 2,
        title: "Mountain Landscape",
        type: "video",
        orientation: "landscape",
        src: "videos/v1.mp4",
      },
    ],
  },
  {
    id: 2,
    title: "Urban Scenes",
    coverImage: {
      title: "Urban Scenes",
      type: "image",
      src: "images/x8.png",
    },
    media: [
      {
        id: 3,
        title: "City Streets",
        type: "image",
        src: "images/x8.png",
      },
      {
        id: 4,
        title: "Urban Portrait",
        type: "video",
        orientation: "portrait",
        src: "videos/v2.mp4",
      },
      {
        id: 5,
        title: "Building Architecture",
        type: "image",
        src: "images/x9.png",
      },
    ],
  },
  {
    id: 3,
    title: "Abstract Art",
    coverImage: {
      title: "Abstract Art",
      type: "image",
      src: "images/x13.png",
    },
    media: [
      {
        id: 6,
        title: "Abstract Patterns",
        type: "image",
        src: "images/x13.png",
      },
    ],
  },
  {
    id: 4,
    title: "Digital Art",
    coverImage: {
      title: "Digital Art",
      type: "image",
      src: "images/x12.png",
    },
    media: [
      {
        id: 7,
        title: "Digital Creation",
        type: "image",
        src: "images/x12.png",
      },
      {
        id: 8,
        title: "Animated Graphics",
        type: "video",
        orientation: "square",
        src: "videos/v1.mp4",
      },
    ],
  },
  {
    id: 5,
    title: "Mixed Media",
    coverImage: {
      title: "Mixed Media",
      type: "image",
      src: "images/x10.png",
    },
    media: [
      {
        id: 9,
        title: "Mixed Content",
        type: "image",
        src: "images/x10.png",
      },
    ],
  },
];

const modalVisible = ref(false);
const selectedCollection = ref<any>(null);

const openModal = (collection: any) => {
  selectedCollection.value = collection;
  modalVisible.value = true;
};

const closeModal = () => {
  modalVisible.value = false;
  selectedCollection.value = null;
};
</script>

<template>
  <div
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-uniform-4"
  >
    <GalleryItem
      v-for="collection in collections"
      :key="collection.id"
      :media="collection.coverImage"
      @click="openModal(collection)"
      class="w-full h-full"
      :class="{
        'col-span-2':
          collection.coverImage.type === 'video' &&
          (collection.coverImage as any).orientation === 'landscape' &&
          $viewport.isGreaterOrEquals('md'),
        'col-span-1 row-span-2':
          collection.coverImage.type === 'video' &&
          (collection.coverImage as any).orientation === 'portrait' &&
          $viewport.isGreaterOrEquals('md'),
      }"
    />

    <GalleryModal
      v-model:visible="modalVisible"
      :collection="selectedCollection"
    />
  </div>
</template>
