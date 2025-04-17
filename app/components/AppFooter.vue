<script lang="ts" setup>
// const { $viewport } = useNuxtApp();
const footerMenu1 = [
  { label: "Galeri", to: "/gallery" },
  { label: "Reservasi", to: "/reservation" },
  { label: "Kontak", href: "https://wa.me/6281234567890" },
];
const footerMenu2 = [
  { label: "Instagram", href: "https://www.instagram.com/memomancy" },
  { label: "Facebook", href: "https://www.facebook.com/memomancy" },
  { label: "Tiktok", href: "https://www.tiktok.com/@memomancy" },
  { label: "X", href: "https://x.com/memomancy" },
];
</script>

<template>
  <div class="bg-color-alternating">
    <div class="px-8 pt-8">
      <div
        class="p-6 border-t border-x border-color-alternating-inverted rounded-t-3xl"
      >
        <div
          class="flex flex-col md:flex-row justify-between gap-8 text-color-alternating"
        >
          <div class="flex flex-col gap-16">
            <div class="flex flex-col gap-2">
              <div class="flex">
                <p
                  class="px-6 py-2 bg-[#E3FE01] heading-4 rounded-t-full rounded-r-full"
                >
                  Memomancy
                </p>
              </div>
              <p class="text-lg">
                Layanan Fotografi & Videografi Profesional Anti Ribet
              </p>
              <p class="text-sm">
                Tangkap momenmu pake Memomancy, panggil kenangannya lagi lewat
                foto & video ✨🧙‍♂️
              </p>
            </div>

            <p class="text-xs">
              Bukit Menganti Regency, Boteng, Menganti, Gresik, Jawa Timur -
              61174
            </p>
          </div>
          <div class="flex flex-col gap-2">
            <div
              v-for="item in footerMenu1"
              :key="item.label"
              class="flex items-center"
            >
              <NuxtLink
                v-ripple
                :to="item.to"
                :href="item.href"
                class="px-4 py-2 rounded-full transition-colors duration-200"
                :class="{
                  'hover:bg-[#D9D491] hover:dark:text-[#1F1F1F]': true,
                }"
              >
                {{ item.label }}
              </NuxtLink>
            </div>
          </div>
          <div class="lg:mr-[15vw] flex flex-col gap-2">
            <div
              v-for="item in footerMenu2"
              :key="item.label"
              class="flex items-center"
            >
              <a
                v-ripple
                :href="item.href"
                target="_blank"
                rel="noopener noreferrer"
                class="px-4 py-2 rounded-full transition-colors duration-200 hover:bg-[#D9D491] hover:dark:text-[#1F1F1F]"
              >
                {{ item.label }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
