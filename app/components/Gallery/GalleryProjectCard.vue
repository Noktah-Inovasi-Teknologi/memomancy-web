<script lang="ts" setup>
import type { Project } from "~/types";

interface Props {
  project: Project;
  thumbnailUrl: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  click: [project: Project];
}>();

const { formatDate } = useGalleryProjects();
const loaded = ref(false);

watch(() => props.thumbnailUrl, () => {
  loaded.value = false;
});

const handleClick = () => {
  emit("click", props.project);
};
</script>

<template>
  <div
    @click="handleClick"
    class="flex flex-col gap-uniform-6 cursor-pointer group"
  >
    <div class="relative overflow-hidden rounded-none aspect-3/4">
      <USkeleton v-if="!loaded" class="absolute inset-0 w-full h-full rounded-none" />
      <video
        v-if="project.thumbnail.type === 'video'"
        :src="thumbnailUrl"
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        autoplay
        muted
        loop
        playsinline
        preload="metadata"
        @loadeddata="loaded = true"
      />
      <img
        v-else
        :src="thumbnailUrl"
        :alt="project.title"
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
        @load="loaded = true"
      />
    </div>
    <div class="flex flex-col gap-uniform-6">
      <h3 class="font-playfair text-heading-4 text-charcoal">
        {{ project.title }}
      </h3>
      <div class="flex flex-col gap-uniform-7 font-lato text-normal-3 text-charcoal/70">
        <p>{{ project.location }}</p>
        <p>{{ formatDate(project) }}</p>
      </div>
    </div>
  </div>
</template>
