<script lang="ts" setup>
const isNavMenuOpen = ref(false);
const navigationRoutes = [
  { label: "Home", to: "/" },
  { label: "Gallery", to: "/gallery" },
  { label: "Reservation", to: "/reservation" },
  { label: "Pricing", to: "/calculator" },
];

const closeNavMenu = () => {
  isNavMenuOpen.value = false;
};
</script>

<template>
  <div
    class="fixed top-0 left-0 right-0 flex p-uniform-5 sm:p-uniform-4 md:p-uniform-3 font-playfair font-medium text-heading-4 sm:text-heading-3 md:text-heading-4 lg:text-heading-5 justify-between items-center mix-blend-difference z-999"
    id="menubar"
  >
    <NuxtLink to="/" class="text-white mix-blend-difference">Memomancy</NuxtLink>

    <!-- Desktop horizontal navigation (md+) -->
    <nav class="hidden md:flex items-center gap-uniform-4 lg:gap-uniform-3">
      <NuxtLink
        v-for="route in navigationRoutes"
        :key="route.to"
        :to="route.to"
        class="text-white mix-blend-difference font-playfair text-normal-3 lg:text-normal-4 hover:text-gold/80 transition-colors relative nav-link"
      >
        {{ route.label }}
      </NuxtLink>
    </nav>

    <!-- Mobile drawer navigation (< md) -->
    <UDrawer
      v-model:open="isNavMenuOpen"
      direction="bottom"
      :handle="true"
      :ui="{
        overlay: 'bg-charcoal/80',
        content: 'bg-offwhite rounded-none',
        handle: 'bg-charcoal/30',
        body: 'p-0'
      }"
      class="md:hidden"
    >
      <button
        aria-label="Open navigation menu"
        class="text-white min-w-11 min-h-11 flex items-center justify-center"
      >
        <Icon name="solar:hamburger-menu-linear" class="text-icon-size-4 sm:text-icon-size-5" />
      </button>

      <template #body>
        <nav class="flex flex-col py-uniform-5">
          <NuxtLink
            v-for="route in navigationRoutes"
            :key="route.to"
            :to="route.to"
            class="flex items-center px-uniform-4 py-uniform-5 text-charcoal font-playfair text-heading-4 hover:bg-taupe/20 active:bg-taupe/30 border-b border-charcoal/10 last:border-b-0"
            @click="closeNavMenu"
          >
            {{ route.label }}
          </NuxtLink>
        </nav>
      </template>
    </UDrawer>
  </div>
</template>

<style scoped>
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background-color: currentColor;
  transition: width var(--transition-normal) ease-out;
}

.nav-link:hover::after {
  width: 100%;
}
</style>
