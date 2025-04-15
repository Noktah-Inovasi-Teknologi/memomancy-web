// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  colorMode: {
    preference: "system",
    classSuffix: "",
    fallback: "light",
  },
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  hub: {
    blob: true,
    database: true,
  },
  kinde: {
    debug: true,
  },
  modules: [
    "@nuxthub/core",
    "@nuxt/icon",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@nuxtjs/kinde",
  ],
  nitro: {
    experimental: {
      openAPI: true,
    },
  },
});
