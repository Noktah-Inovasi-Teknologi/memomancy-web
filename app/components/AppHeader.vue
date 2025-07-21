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
        pt:root:class="!px-6 !bg-[#F5F2EB] dark:!bg-[#1F1F1F] !border-[#1F1F1F] dark:!border-[#F5F2EB] !rounded-[1.5rem]"
        pt:end:class="flex !ml-0"
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
            class: '!bg-transparent !rounded-[1.5rem]',
          },
          rootList: {
            class:
              '!bg-[#F5F2EB] dark:!bg-[#1F1F1F] !border-[#1F1F1F] !rounded-[1.5rem]',
          },
        }"
      >
        <template #start v-if="$viewport.isGreaterOrEquals('mtl')">
          <p class="font-bold text-[#1F1F1F] dark:text-[#F5F2EB]">Memomancy</p>
        </template>
        <template #item="{ item, props }">
          <NuxtLink
            v-ripple
            v-bind="props.action"
            :to="item.to"
            class="px-4 py-2 rounded-full transition-colors duration-200"
            :class="{
              'bg-[#E3FE01] hover:bg-[#DFE559] dark:text-[#1F1F1F]':
                route.path === item.to,
              'hover:bg-[#EDEEBB] hover:dark:text-[#1F1F1F]':
                route.path !== item.to,
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
            <p v-if="$viewport.isLessThan('mtl')" class="font-bold">
              Memomancy
            </p>
            <div class="flex gap-2 items-center">
              <template v-if="!$auth.loggedIn && $viewport.isGreaterThan('xs')">
                <NuxtLink
                  v-ripple
                  to="/api/login"
                  external
                  class="px-4 py-2 bg-[#E3FE01] text-[#1F1F1F] rounded-full border-0"
                >
                  Masuk
                </NuxtLink>
                <NuxtLink
                  v-ripple
                  to="/api/login"
                  external
                  class="px-4 py-2 bg-[#1F1F1F] text-[#E3FE01] rounded-full border-0"
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
