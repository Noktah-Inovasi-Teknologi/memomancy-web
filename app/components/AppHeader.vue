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
    class="fixed top-0 left-0 right-0 flex p-uniform-3 font-playfair font-medium text-heading-2 justify-between items-center mix-blend-difference z-999"
    id="menubar"
  >
    <NuxtLink to="/" class="text-white mix-blend-difference">Memomancy</NuxtLink>
    <div class="flex gap-uniform-7 relative">
      <button
        aria-controls="navigation_menu"
        aria-haspopup="true"
        @click="toggleNavMenu"
        class="text-white p-2"
      >
        <Icon name="solar:hamburger-menu-linear" />
      </button>

      <nav
        v-if="isNavMenuOpen"
        id="navigation_menu"
        class="absolute top-full right-0 mt-2 bg-white rounded shadow-lg py-2 min-w-37.5"
        @click="closeNavMenu"
      >
        <NuxtLink
          v-for="route in navigationRoutes"
          :key="route.to"
          :to="route.to"
          class="block px-4 py-2 text-charcoal text-normal-4 hover:bg-gray-100"
        >
          {{ route.label }}
        </NuxtLink>
      </nav>
    </div>
  </div>
</template>