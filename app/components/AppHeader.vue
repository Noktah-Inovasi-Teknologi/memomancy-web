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
    <div class="p-8">
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
            class: '!bg-transparent font-semibold',
            style: 'border-radius: var(--memomancy-border-radius-lg)',
          },
          rootList: {
            style:
              'background: var(--memomancy-light); var(--memomancy-dark); border-radius: var(--memomancy-border-radius-lg)',
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
            style="border-radius: var(--memomancy-border-radius)"
            :style="{
              background:
                route.path === item.to
                  ? 'var(--memomancy-primary)'
                  : 'transparent',
              color:
                route.path === item.to ? 'var(--memomancy-dark)' : 'inherit',
            }"
            @mouseover="
              $event.target.style.background =
                route.path !== item.to
                  ? 'var(--memomancy-primary-hover)'
                  : 'var(--memomancy-primary-hover)'
            "
            @mouseleave="
              $event.target.style.background =
                route.path === item.to
                  ? 'var(--memomancy-primary)'
                  : 'transparent'
            "
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
                  class="nuxtlink-btn nuxtlink-btn-primary"
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
