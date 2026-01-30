<script lang="ts" setup>
const isNavMenuOpen = ref(false);
const navigationRoutes = [
  { label: "Home", to: "/" },
  { label: "Gallery", to: "/gallery" },
  { label: "Reservation", to: "/reservation" },
  { label: "Pricing", to: "/calculator" },
];

const toggleNavMenu = () => {
  isNavMenuOpen.value = !isNavMenuOpen.value;
};

const closeNavMenu = () => {
  isNavMenuOpen.value = false;
};
</script>

<template>
  <div
    class="fixed top-0 left-0 right-0 flex p-uniform-3 font-playfair font-medium text-heading-3 justify-between items-center mix-blend-difference z-999"
    id="menubar"
  >
    <NuxtLink to="/" class="text-white mix-blend-difference">Memomancy</NuxtLink>
    <div class="flex gap-uniform-7 relative">
      <button
        aria-controls="navigation_menu"
        aria-haspopup="true"
        @click="toggleNavMenu"
        class="text-white p-uniform-7"
      >
        <Icon name="solar:hamburger-menu-linear" class="text-icon-size-5" />
      </button>

      <nav
        v-if="isNavMenuOpen"
        id="navigation_menu"
        class="absolute top-full right-0 mt-uniform-7 bg-offwhite rounded-none py-uniform-6 min-w-40"
        @click="closeNavMenu"
      >
        <NuxtLink
          v-for="route in navigationRoutes"
          :key="route.to"
          :to="route.to"
          class="block px-uniform-5 py-uniform-6 text-charcoal text-normal-3 hover:bg-taupe/20"
        >
          {{ route.label }}
        </NuxtLink>
      </nav>
    </div>
  </div>
</template>