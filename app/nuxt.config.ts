import Aura from "@primeuix/themes/aura";
import { definePreset } from "@primevue/themes";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  colorMode: {
    preference: "system",
    classSuffix: "",
    fallback: "light",
  },
  compatibilityDate: "2024-11-01",
  css: ["@/assets/css/tailwind.css"],
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
        preset: definePreset(Aura, {
          semantic: {
            primary: {
              50: "#FCFFE5",
              100: "#F5FFB3",
              200: "#ECFF73",
              300: "#E6FF3A",
              400: "#E5FF0F",
              500: "#E3FE01", // your main base
              600: "#BADA01",
              700: "#91B501",
              800: "#6B8F00",
              900: "#4E6A00",
              950: "#2E4100",
            },
          },
        }),
      },
      pt: {
        button: {
          root: {
            class:
              "!border-0 !rounded-[3rem] hover:!border-0 hover:!bg-primary-600 !px-3 !py-[0.375rem] sm:!px-4 sm:!py-2 lg:!px-5 lg:!py-[0.625rem]",
          },
          label: {
            class: "!font-semibold",
          },
        },
      },
    },
  },
  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
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
