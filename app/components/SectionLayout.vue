<script lang="ts" setup>
interface Props {
  marker: string;
  id?: string;
}

defineProps<Props>();
</script>

<template>
  <section
    :id="id"
    class="flex flex-col p-uniform-3 gap-uniform-3 bg-offwhite"
    data-parallax
  >
    <header class="font-playfair text-charcoal text-heading-5 tracking-wider uppercase">
      ■ {{ marker }}
    </header>
    <div class="flex-1">
      <slot />
    </div>
  </section>
</template>
