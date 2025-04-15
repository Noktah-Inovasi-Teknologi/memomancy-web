import Aura from "@primeuix/themes/aura";
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
  icon: {
    mode: "css",
    cssLayer: "base",
  },
  kinde: {
    debug: true,
    authDomain: process.env.NUXT_KINDE_AUTH_DOMAIN,
    clientId: process.env.NUXT_KINDE_CLIENT_ID,
    clientSecret: process.env.NUXT_KINDE_CLIENT_SECRET,
    redirectURL: process.env.NUXT_KINDE_REDIRECT_URL,
    logoutRedirectURL: process.env.NUXT_KINDE_LOGOUT_REDIRECT_URL,
    postLoginRedirectURL: process.env.NUXT_KINDE_POST_LOGIN_REDIRECT_URL,
    password: process.env.NUXT_KINDE_PASSWORD,
  },
  modules: [
    "@nuxthub/core",
    "@nuxt/icon",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@nuxtjs/kinde",
    "@primevue/nuxt-module",
    "@pinia/nuxt",
    "@nuxt/fonts",
    "@nuxtjs/robots",
    "nuxt-viewport",
  ],
  nitro: {
    experimental: {
      openAPI: true,
    },
  },
  primevue: {
    options: {
      ripple: true,
      theme: {
        preset: Aura,
      },
    },
  },
  viewport: {
    breakpoints: {
      sm: 640,
      md: 768,
      mtl: 960,
      lg: 1024,
      xl: 1280,
      "2xl": 1536,
    },
  },
});
