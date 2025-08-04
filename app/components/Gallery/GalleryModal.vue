<script lang="ts" setup>
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  collection: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(['update:visible']);

const currentMediaIndex = ref(0);

const collectionMedia = computed(() => {
  return props.collection?.media || [];
});

const currentMedia = computed(() => {
  return collectionMedia.value[currentMediaIndex.value] || null;
});

const canNavigatePrev = computed(() => currentMediaIndex.value > 0);
const canNavigateNext = computed(() => currentMediaIndex.value < collectionMedia.value.length - 1);

const closeModal = () => {
  emit('update:visible', false);
  currentMediaIndex.value = 0;
};

const navigatePrev = () => {
  if (canNavigatePrev.value) {
    currentMediaIndex.value--;
  }
};

const navigateNext = () => {
  if (canNavigateNext.value) {
    currentMediaIndex.value++;
  }
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'ArrowLeft') navigatePrev();
  if (event.key === 'ArrowRight') navigateNext();
  if (event.key === 'Escape') closeModal();
};

onMounted(() => {
  document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
});

watch(() => props.visible, (newVal) => {
  if (newVal) {
    currentMediaIndex.value = 0;
  }
});
</script>

<template>
  <Dialog
    :visible="visible"
    @update:visible="closeModal"
    modal
    :closable="true"
    :draggable="false"
    :resizable="false"
    class="gallery-modal"
    :style="{ width: '90vw', maxWidth: '1200px' }"
  >
    <template #header>
      <div class="flex justify-between items-center w-full">
        <h3 class="text-lg font-semibold">{{ collection?.title || 'Collection Viewer' }}</h3>
        <div class="flex gap-2" v-if="collectionMedia.length > 1">
          <Button
            @click="navigatePrev"
            severity="contrast"
            size="small"
            class="p-2"
            :disabled="!canNavigatePrev"
          >
            <Icon name="uil:angle-left" class="icon-size-4" />
          </Button>
          <Button
            @click="navigateNext"
            severity="contrast"
            size="small"
            class="p-2"
            :disabled="!canNavigateNext"
          >
            <Icon name="uil:angle-right" class="icon-size-4" />
          </Button>
        </div>
      </div>
    </template>

    <div v-if="currentMedia" class="flex justify-center items-center min-h-[60vh]">
      <img
        v-if="currentMedia.type === 'image'"
        :src="currentMedia.src"
        :alt="currentMedia.title"
        class="max-w-full max-h-[70vh] object-contain rounded-lg"
      />
      <video
        v-else-if="currentMedia.type === 'video'"
        :src="currentMedia.src"
        controls
        class="max-w-full max-h-[70vh] object-contain rounded-lg"
        preload="metadata"
      >
        Your browser does not support the video tag.
      </video>
    </div>

    <template #footer>
      <div class="flex justify-center items-center w-full">
        <span class="text-sm text-gray-600" v-if="collectionMedia.length > 1">
          {{ currentMediaIndex + 1 }} of {{ collectionMedia.length }}
        </span>
        <span class="text-sm text-gray-600" v-else>
          {{ collection?.title || 'Single item' }}
        </span>
      </div>
    </template>
  </Dialog>
</template>

<style scoped>
</style>
