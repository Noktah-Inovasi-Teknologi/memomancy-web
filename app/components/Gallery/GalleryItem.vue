<script lang="ts" setup>
const props = defineProps({
  media: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['click']);

const handleClick = () => {
  emit('click', props.media);
};
</script>

<template>
  <div
    @click="handleClick"
    :class="[
      'overflow-hidden rounded-4xl w-full cursor-pointer transition-transform hover:scale-105',
      media.type === 'photo' && 'aspect-square',
      media.type === 'video' &&
        media.orientation === 'landscape' &&
        'aspect-2/1',
      media.type === 'video' &&
        media.orientation === 'portrait' &&
        'aspect-1/2',
      media.type === 'video' &&
        media.orientation === 'square' &&
        'aspect-square',
    ]"
  >
    <img
      v-if="media.type === 'photo'"
      :src="media.src"
      :alt="media.title"
      class="w-full h-full object-cover block m-0! p-0!"
    />
    <video
      v-else-if="media.type === 'video'"
      :src="media.src"
      :alt="media.title"
      class="w-full h-full object-cover block m-0! p-0!"
      preload="metadata"
      muted
    />
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
