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
  <div class="bg-[#F5F2EB]">
    <div class="p-8">
      <Menubar
        class="flex justify-between items-center"
        :model="navbarMenu"
        pt:root:class="!px-6 !bg-[#F5F2EB] !dark:bg-[#1F1F1F] !border-[#1F1F1F] !rounded-full"
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
            class: '!bg-transparent !rounded-full',
          },
          rootList: {
            class: '!bg-[#F5F2EB] !border-[#1F1F1F] !rounded-3xl ',
          },
        }"
      >
        <template #start v-if="$viewport.isGreaterOrEquals('mtl')">
          <p class="font-bold text-[#1F1F1F]">Memomancy</p>
        </template>
        <template #item="{ item, props }">
          <NuxtLink
            v-ripple
            v-bind="props.action"
            :to="item.to"
            class="px-4 py-2 rounded-full transition-colors duration-200"
            :class="{
              'bg-[#E3FE01]': route.path === item.to,
              'hover:bg-[#D9D491]': route.path !== item.to,
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
              <template v-if="!$auth.loggedIn">
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
              <template v-else>
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
