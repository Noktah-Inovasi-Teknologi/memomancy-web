<script lang="ts" setup>
import type { Project } from "~/types";

interface Props {
  visible: boolean;
  project: Project | null;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  "update:visible": [value: boolean];
}>();

const { getMediaUrl, formatDate } = useGalleryProjects();

const currentMediaIndex = ref(0);
const scrollContainer = ref<HTMLElement | null>(null);
const loadedMedia = reactive<Record<number, boolean>>({});

const close = () => {
  emit("update:visible", false);
  currentMediaIndex.value = 0;
};

const nextMedia = () => {
  if (props.project && currentMediaIndex.value < props.project.media.length - 1) {
    currentMediaIndex.value++;
    scrollToMedia(currentMediaIndex.value);
  }
};

const prevMedia = () => {
  if (currentMediaIndex.value > 0) {
    currentMediaIndex.value--;
    scrollToMedia(currentMediaIndex.value);
  }
};

const goToMedia = (index: number) => {
  currentMediaIndex.value = index;
  scrollToMedia(index);
};

const scrollToMedia = (index: number) => {
  if (scrollContainer.value) {
    const children = scrollContainer.value.children;
    if (children[index]) {
      children[index].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }
};

const handleScroll = () => {
  if (scrollContainer.value && props.project) {
    const container = scrollContainer.value;
    const scrollLeft = container.scrollLeft;
    const itemWidth = container.scrollWidth / props.project.media.length;
    const newIndex = Math.round(scrollLeft / itemWidth);
    if (newIndex !== currentMediaIndex.value && newIndex >= 0 && newIndex < props.project.media.length) {
      currentMediaIndex.value = newIndex;
    }
  }
};

const handleKeydown = (e: KeyboardEvent) => {
  if (!props.visible) return;
  if (e.key === "Escape") close();
  if (e.key === "ArrowRight") nextMedia();
  if (e.key === "ArrowLeft") prevMedia();
};

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});

watch(
  () => props.visible,
  (visible) => {
    if (visible) {
      currentMediaIndex.value = 0;
      Object.keys(loadedMedia).forEach((key) => delete loadedMedia[Number(key)]);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }
);
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="visible && project"
        class="fixed inset-0 z-1000 flex items-center justify-center"
        @click.self="close"
      >
        <div class="absolute inset-0 bg-charcoal/95" @click="close" />

        <div class="relative w-full h-full flex flex-col p-uniform-4 md:p-uniform-3">
          <div class="flex justify-between items-center mb-uniform-4">
            <div class="flex flex-col gap-uniform-6">
              <h2 class="font-playfair text-heading-3 text-offwhite">
                {{ project.title }}
              </h2>
              <p class="font-lato text-normal-4 text-offwhite/70">
                {{ project.location }} &middot; {{ formatDate(project) }}
              </p>
            </div>
            <button
              @click="close"
              class="text-offwhite hover:text-gold transition-colors p-uniform-6"
              aria-label="Close modal"
            >
              <Icon name="solar:close-circle-linear" class="text-icon-size-5" />
            </button>
          </div>

          <div class="flex-1 relative flex items-center overflow-hidden">
            <button
              v-if="currentMediaIndex > 0"
              @click="prevMedia"
              class="absolute left-0 z-10 text-offwhite hover:text-gold transition-colors p-uniform-6 md:p-uniform-5"
              aria-label="Previous media"
            >
              <Icon name="solar:arrow-left-linear" class="text-icon-size-4" />
            </button>

            <div
              ref="scrollContainer"
              class="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-uniform-4 w-full h-full items-center"
              @scroll="handleScroll"
            >
              <div
                v-for="(media, index) in project.media"
                :key="media.id"
                class="shrink-0 snap-center w-full h-full flex items-center justify-center relative"
              >
                <USkeleton v-if="!loadedMedia[media.id]" class="absolute inset-0 w-full h-full rounded-none" />
                <video
                  v-if="media.type === 'video'"
                  :src="getMediaUrl(media)"
                  class="max-w-full max-h-full object-contain rounded-none"
                  controls
                  :autoplay="index === currentMediaIndex"
                  playsinline
                  preload="metadata"
                  @loadeddata="loadedMedia[media.id] = true"
                />
                <img
                  v-else
                  :src="getMediaUrl(media)"
                  :alt="media.title || project.title"
                  class="max-w-full max-h-full object-contain rounded-none"
                  loading="lazy"
                  @load="loadedMedia[media.id] = true"
                />
              </div>
            </div>

            <button
              v-if="currentMediaIndex < project.media.length - 1"
              @click="nextMedia"
              class="absolute right-0 z-10 text-offwhite hover:text-gold transition-colors p-uniform-6 md:p-uniform-5"
              aria-label="Next media"
            >
              <Icon name="solar:arrow-right-linear" class="text-icon-size-4" />
            </button>
          </div>

          <div class="flex justify-center items-center gap-uniform-5 mt-uniform-4">
            <div class="flex gap-uniform-6">
              <button
                v-for="(_, index) in project.media"
                :key="index"
                @click="goToMedia(index)"
                :class="[
                  'w-uniform-6 h-uniform-6 border border-offwhite transition-colors',
                  currentMediaIndex === index
                    ? 'bg-gold border-gold'
                    : 'bg-transparent hover:bg-offwhite/30',
                ]"
                :aria-label="`Go to media ${index + 1}`"
              />
            </div>
            <p class="font-lato text-normal-4 text-offwhite/70">
              {{ currentMediaIndex + 1 }} / {{ project.media.length }}
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity var(--transition-normal) ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
