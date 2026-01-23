<script lang="ts" setup>
const { $viewport } = useNuxtApp();
const route = useRoute();

const navbarMenu = computed(() => {
  const baseMenu = [
    { label: "Beranda", to: "/" },
    { label: "Galeri", to: "/gallery" },
    { label: "Reservasi", to: "/reservation" },
  ];

  return baseMenu;
});

const isMobileMenuOpen = ref(false);
const isUserMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value;
};

const closeUserMenu = () => {
  isUserMenuOpen.value = false;
};

const logout = () => {
  navigateTo("/api/logout", { external: true });
};
</script>

<template>
  <div class="bg-color-alternating sticky top-0 z-50">
    <div style="padding: var(--padding-container)">
      <nav class="flex justify-between items-center">
        <!-- Logo - visible on desktop -->
        <p v-if="$viewport.isGreaterOrEquals('md')" class="heading-4 han-downed">Mem✦mancy</p>

        <!-- Mobile menu button -->
        <button
          v-if="$viewport.isLessThan('md')"
          @click="toggleMobileMenu"
          class="p-2"
        >
          <Icon name="solar:hamburger-menu-linear" class="icon-size-5" />
        </button>

        <!-- Desktop navigation -->
        <div v-if="$viewport.isGreaterOrEquals('md')" class="flex items-center gap-4">
          <NuxtLink
            v-for="item in navbarMenu"
            :key="item.to"
            :to="item.to"
            class="transition-colors duration-200 text-normal-3 font-semibold"
            :class="{
              'memomancy-nav-item-active': route.path === item.to,
              'memomancy-nav-item': route.path !== item.to,
            }"
            :style="{
              padding: 'var(--spacing-uniform-6) var(--spacing-uniform-5)',
              borderRadius: 'var(--radius-memomancy)',
            }"
          >
            {{ item.label }}
          </NuxtLink>
        </div>

        <!-- User section -->
        <div class="flex items-center gap-4">
          <!-- Logo on mobile -->
          <p v-if="$viewport.isLessThan('md')" class="heading-4 han-downed">Mem✦mancy</p>

          <div class="flex gap-2 items-center text-normal-3">
            <template v-if="!$auth.loggedIn && $viewport.isGreaterThan('xs')">
              <NuxtLink
                to="/api/login"
                external
                class="nuxtlink-btn nuxtlink-btn-contrast"
              >
                Masuk
              </NuxtLink>
              <NuxtLink
                to="/api/login"
                external
                class="nuxtlink-btn nuxtlink-btn-secondary"
              >
                Daftar
              </NuxtLink>
            </template>
            <template v-if="$auth.loggedIn">
              <div class="flex gap-uniform-4 items-center">
                <div class="flex gap-uniform-6">
                  <p v-if="$viewport.isGreaterThan('sm')">Halo,</p>
                  <p class="font-bold">{{ $auth.user.given_name }}</p>
                </div>
                <div class="relative">
                  <button
                    type="button"
                    class="p-2"
                    @click="toggleUserMenu"
                    aria-haspopup="true"
                    aria-controls="menu-navbar"
                  >
                    <Icon name="uil:ellipsis-v" class="icon-size-5" />
                  </button>
                  <div
                    v-if="isUserMenuOpen"
                    id="menu-navbar"
                    class="absolute right-0 top-full mt-2 bg-white rounded shadow-lg py-2 min-w-30 z-50"
                    @click="closeUserMenu"
                  >
                    <button
                      @click="logout"
                      class="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
                    >
                      <Icon name="uil:sign-out-alt" class="icon-size-6" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </nav>

      <!-- Mobile navigation dropdown -->
      <div
        v-if="$viewport.isLessThan('md') && isMobileMenuOpen"
        class="mt-4 flex flex-col gap-2"
      >
        <NuxtLink
          v-for="item in navbarMenu"
          :key="item.to"
          :to="item.to"
          @click="isMobileMenuOpen = false"
          class="transition-colors duration-200 text-normal-3 font-semibold block"
          :class="{
            'memomancy-nav-item-active': route.path === item.to,
            'memomancy-nav-item': route.path !== item.to,
          }"
          :style="{
            padding: 'var(--spacing-uniform-6) var(--spacing-uniform-5)',
            borderRadius: 'var(--radius-memomancy)',
          }"
        >
          {{ item.label }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
