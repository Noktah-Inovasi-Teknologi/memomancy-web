<script lang="ts" setup>
import {
  phoneNumber,
  phoneLink,
  whatsappLink,
  emailAddress,
  emailLink,
  instagramLink,
  tiktokLink,
  facebookLink,
  youtubeLink,
  address
} from "~/data/commonInformations";

const footerMenu1 = [
  { label: "Galeri", to: "/gallery" },
  { label: "Reservasi", to: "/reservation" },
  { label: "Kontak", href: whatsappLink },
];
const footerMenu2 = [
  { label: "Instagram", href: instagramLink },
  { label: "Facebook", href: facebookLink },
  { label: "Tiktok", href: tiktokLink },
  { label: "YouTube", href: youtubeLink },
];
</script>

<template>
  <div class="bg-color-alternating">
    <div style="padding-left: var(--padding-container); padding-right: var(--padding-container); padding-top: var(--padding-container)">
      <div
        class="p-uniform-2 border-t-2 border-x-2 border-color-alternating-inverted rounded-t-[3rem]"
      >
        <div
          class="grid max-md:grid-cols-1 md:grid-cols-4 gap-8 text-inverse"
        >
          <div class="flex flex-col gap-3">
            <div class="flex">
              <p
                class="px-uniform-4 py-uniform-7 bg-contrast rounded-t-full rounded-r-full heading-3 text-color-consistent-charcoal"              >
                Memomancy
              </p>
            </div>
            <p class="heading-5 text-inverse">
              Layanan Fotografi & Videografi Profesional Anti Ribet
            </p>
            <p class="text-normal-5">
              Tangkap momenmu pake Memomancy, panggil kenangannya lagi lewat
              foto & video ✨🧙‍♂️
            </p>
          </div>
          <div class="flex flex-col gap-3 mt-6">
            <h3 class="heading-4 mb-2 text-inverse">Kontak</h3>
            <div class="flex items-center gap-2">
              <Icon name="uil:map-marker" class="icon-size-4 flex-shrink-0" />
              <p class="text-normal-3">
                {{ address }}
              </p>
            </div>
            <div class="flex items-center gap-2">
              <Icon name="uil:phone" class="icon-size-4 flex-shrink-0" />
              <p class="text-normal-3">{{ phoneNumber }}</p>
            </div>
            <div class="flex items-center gap-2">
              <Icon name="uil:envelope" class="icon-size-4 flex-shrink-0" />
              <p class="text-normal-3">{{ emailAddress }}</p>
            </div>
          </div>
          <div class="flex flex-col gap-2 mt-6">
            <h3 class="heading-4 mb-uniform-4 text-inverse">Menu</h3>
            <div
              v-for="item in footerMenu1"
              :key="item.label"
              class="flex items-center"
            >
              <NuxtLink
                v-ripple
                :to="item.to"
                :href="item.href"
                class="px-uniform-4 py-uniform-6 rounded-full transition-colors duration-200 hover:bg-[var(--color-secondary-hover)] hover:text-[var(--color-text-secondary)]"
              >
                {{ item.label }}
              </NuxtLink>
            </div>
          </div>
          <div class="lg:mr-[15vw] flex flex-col gap-2 mt-6">
            <h3 class="heading-4 mb-uniform-4 text-nowrap text-inverse">Sosial Media</h3>
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
                class="px-uniform-4 py-uniform-6 rounded-full transition-colors duration-200 hover:bg-[var(--color-secondary-hover)] hover:text-[var(--color-text-secondary)]"
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
