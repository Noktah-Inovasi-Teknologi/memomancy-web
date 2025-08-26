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
        class="border-t-2 border-x-2 border-color-alternating-inverted rounded-t-[3rem]"
        style="padding: var(--padding-section)"
      >
        <div
          class="grid max-md:grid-cols-1 md:grid-cols-4 gap-8 text-inverse"
        >
          <div class="flex flex-col gap-uniform-6">
            <div class="flex">
              <p
                class="px-6 py-2 bg-[var(--color-contrast)] rounded-t-full rounded-r-full heading-4 text-color-consistent-charcoal"              >
                Memomancy
              </p>
            </div>
            <p class="heading-7 text-inverse">
              Layanan Fotografi & Videografi Profesional Anti Ribet
            </p>
            <p class="text-sm">
              Tangkap momenmu pake Memomancy, panggil kenangannya lagi lewat
              foto & video ✨🧙‍♂️
            </p>
          </div>
          <div class="flex flex-col gap-3 mt-6">
            <h3 class="heading-6 mb-2 text-inverse">Kontak</h3>
            <div class="flex items-center gap-2">
              <Icon name="uil:map-marker" class="text-lg flex-shrink-0" />
              <p class="paragraph-4">
                {{ address }}
              </p>
            </div>
            <div class="flex items-center gap-2">
              <Icon name="uil:phone" class="text-lg flex-shrink-0" />
              <p class="paragraph-4">{{ phoneNumber }}</p>
            </div>
            <div class="flex items-center gap-2">
              <Icon name="uil:envelope" class="text-lg flex-shrink-0" />
              <p class="paragraph-4">{{ emailAddress }}</p>
            </div>
          </div>
          <div class="flex flex-col gap-2 mt-6">
            <h3 class="heading-6 mb-2 text-inverse">Menu</h3>
            <div
              v-for="item in footerMenu1"
              :key="item.label"
              class="flex items-center"
            >
              <NuxtLink
                v-ripple
                :to="item.to"
                :href="item.href"
                class="px-4 py-2 rounded-full transition-colors duration-200 hover:bg-[var(--color-secondary-hover)] hover:text-[var(--color-text-secondary)]"
              >
                {{ item.label }}
              </NuxtLink>
            </div>
          </div>
          <div class="lg:mr-[15vw] flex flex-col gap-2 mt-6">
            <h3 class="heading-6 mb-2 text-nowrap text-inverse">Sosial Media</h3>
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
                class="px-4 py-2 rounded-full transition-colors duration-200 hover:bg-[var(--color-secondary-hover)] hover:text-[var(--color-text-secondary)]"
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
