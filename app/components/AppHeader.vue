<script lang="ts" setup>
const { $viewport } = useNuxtApp();
const route = useRoute();
const navbarMenu = [
  { label: "Beranda", to: "/" },
  { label: "Galeri", to: "/gallery" },
  { label: "Reservasi", to: "/reservation" },
];
</script>

<template>
  <div class="bg-color-alternating sticky top-0 z-50">
    <div style="padding: var(--padding-container)">
      <Menubar
        class="flex justify-between items-center"
        :model="navbarMenu"
        :pt="{
          end: {
            class: [
              'flex !ml-0',
              {
                'w-full': $viewport.isLessThan('mtl'),
              },
            ],
          },
          itemContent: {
            class: 'font-semibold',
          },
        }"
      >
        <template #start v-if="$viewport.isGreaterOrEquals('mtl')">
          <p class="font-bold memomancy-brand-text">Memomancy</p>
        </template>
        <template #item="{ item, props }">
          <NuxtLink
            v-ripple
            v-bind="props.action"
            :to="item.to"
            class="px-4 py-2 transition-colors duration-200"
            style="border-radius: var(--radius-memomancy)"
            :class="{
              'memomancy-nav-item-active': route.path === item.to,
              'memomancy-nav-item': route.path !== item.to,
            }"
          >
            {{ item.label }}
          </NuxtLink>
        </template>
        <template #end>
          <div
            :class="[
              'flex justify-between items-center gap-4',
              { 'w-full': $viewport.isLessThan('mtl') },
            ]"
          >
            <p
              v-if="$viewport.isLessThan('mtl')"
              class="font-bold memomancy-brand-text"
            >
              Memomancy
            </p>
            <div class="flex gap-2 items-center">
              <template v-if="!$auth.loggedIn && $viewport.isGreaterThan('xs')">
                <NuxtLink
                  v-ripple
                  to="/api/login"
                  external
                  class="nuxtlink-btn nuxtlink-btn-contrast"
                >
                  Masuk
                </NuxtLink>
                <NuxtLink
                  v-ripple
                  to="/api/login"
                  external
                  class="nuxtlink-btn nuxtlink-btn-secondary"
                >
                  Daftar
                </NuxtLink>
              </template>
              <template v-if="$auth.loggedIn">
                <p v-if="$viewport.isGreaterThan('sm')">Halo,</p>
                <p class="font-bold">{{ $auth.user.given_name }}</p>
              </template>
            </div>
          </div>
        </template>
      </Menubar>
    </div>
  </div>
</template>
