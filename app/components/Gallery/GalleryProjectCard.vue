<script lang="ts" setup>
import type { Project } from "~/types";

interface Props {
  project: Project;
  thumbnailUrl: string;
  isAnyHovered?: boolean;
  isHovered?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isAnyHovered: false,
  isHovered: false,
});
const emit = defineEmits<{
  click: [project: Project];
  hover: [projectId: string | null];
}>();

const { formatDate } = useGalleryProjects();
const loaded = ref(false);

watch(() => props.thumbnailUrl, () => {
  loaded.value = false;
});

const handleClick = () => {
  emit("click", props.project);
};

const shouldDarken = computed(() => props.isAnyHovered && !props.isHovered);
</script>

<template>
  <div
    @click="handleClick"
    @mouseenter="emit('hover', project.id)"
    @mouseleave="emit('hover', null)"
    class="flex flex-col gap-uniform-7 sm:gap-uniform-6 md:gap-uniform-5 lg:gap-uniform-4 xl:gap-uniform-4 cursor-pointer group"
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
      <div
        class="absolute inset-0 bg-charcoal transition-opacity duration-300 pointer-events-none"
        :style="{ opacity: shouldDarken ? 0.5 : 0 }"
      />
    </div>
    <div class="flex flex-col gap-uniform-7 sm:gap-uniform-6 md:gap-uniform-5 lg:gap-uniform-4 xl:gap-uniform-4">
      <h3 class="font-playfair text-heading-5 sm:text-heading-4 md:text-heading-4 lg:text-heading-5 xl:text-heading-5 text-charcoal line-clamp-2">
        {{ project.title }}
      </h3>
      <div class="flex flex-col gap-uniform-7 md:gap-uniform-6 lg:gap-uniform-5 xl:gap-uniform-5 font-lato text-normal-4 sm:text-normal-3 md:text-normal-3 lg:text-normal-4 xl:text-normal-4 text-charcoal/70">
        <p class="truncate">{{ project.location }}</p>
        <p>{{ formatDate(project) }}</p>
      </div>
    </div>
  </div>
</template>
