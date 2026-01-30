<template>
  <NuxtLink
    :to="to"
    :class="['relative border-line-animate', classes]"
  >
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
interface Props {
  to: string;
  classes?: string;
}

defineProps<Props>();
</script>

<style scoped>
.border-line-animate::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: currentColor;
  transition: width var(--transition-normal) ease-out;
}

.border-line-animate:hover::after {
  animation: borderDisappearReappear 0.6s ease-in-out;
}

@keyframes borderDisappearReappear {
  0% {
    transform: scaleX(1);
    transform-origin: left;
  }
  50% {
    transform: scaleX(0);
    transform-origin: right;
  }
  51% {
    transform: scaleX(0);
    transform-origin: left;
  }
  100% {
    transform: scaleX(1);
    transform-origin: left;
  }
}
</style>