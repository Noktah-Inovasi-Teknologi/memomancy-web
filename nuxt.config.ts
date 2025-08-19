import {
  useMemomancyTheme,
  useMemomancyPassthrough,
} from "./app/composables/usePrimeVueTheme";

export default defineNuxtConfig({
  app: {},
  colorMode: {
    preference: "system",
    classSuffix: "",
    fallback: "light",
  },
  compatibilityDate: "2025-07-15",
  css: [
    "@/assets/css/tailwind.css",
    "@/assets/css/design-tokens.css",
    "@/assets/css/primevue-theme.css",
    "@/assets/css/components.css",
  ],
  devtools: { enabled: true },
  hub: {
    blob: true,
    database: true,
  },
  icon: {
    mode: "css",
    cssLayer: "base",
  },
  // @ts-ignore
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
        preset: useMemomancyTheme(),
      },
      pt: useMemomancyPassthrough(),
    },
  },
  // @ts-ignore
  routeRules: {
    "/**": {
      appMiddleware: ["auth-logged-in"],
      // @ts-ignore
      kinde: {
        redirectUrl: "/api/login",
        external: true,
      },
    },
    "/": {
      // @ts-ignore
      kinde: {
        public: true,
      },
    },
    "/calculator": {
      // @ts-ignore
      kinde: {
        public: true,
      },
    },
    "/dashboard": {
      // @ts-ignore
      kinde: {
        permissions: { dashboard: true },
        redirectUrl: "/api/login",
        external: true,
      },
    },
    "/gallery": {
      // @ts-ignore
      kinde: {
        public: true,
      },
    },
    "/reservation": {
      // @ts-ignore
      kinde: {
        public: true,
      },
    },
  },
  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
  },
  viewport: {
    breakpoints: {
      xs: 320,
      sm: 640,
      md: 768,
      mtl: 960,
      lg: 1024,
      xl: 1280,
      "2xl": 1536,
    },
  },
});

// import { defineNuxtConfig } from "nuxt/config"
// import { useMemomancyTheme, useMemomancyPassthrough } from "./app/composables/usePrimeVueTheme"

// // https://nuxt.com/docs/api/configuration/nuxt-config
// export default defineNuxtConfig({
//   colorMode: {
//     preference: "system",
//     classSuffix: "",
//     fallback: "light",
//   },
//   compatibilityDate: "2024-11-01",
//   css: [
//     "@/assets/css/tailwind.css",
//     "@/assets/css/design-tokens.css",
//     "@/assets/css/primevue-theme.css",
//     "@/assets/css/components.css",
//   ],
//   devtools: { enabled: true },
//   hub: {
//     blob: true,
//     database: true,
//   },
//   icon: {
//     mode: "css",
//     cssLayer: "base",
//   },
//   kinde: {
//     debug: true,
//     authDomain: process.env.NUXT_KINDE_AUTH_DOMAIN,
//     clientId: process.env.NUXT_KINDE_CLIENT_ID,
//     clientSecret: process.env.NUXT_KINDE_CLIENT_SECRET,
//     redirectURL: process.env.NUXT_KINDE_REDIRECT_URL,
//     logoutRedirectURL: process.env.NUXT_KINDE_LOGOUT_REDIRECT_URL,
//     postLoginRedirectURL: process.env.NUXT_KINDE_POST_LOGIN_REDIRECT_URL,
//     password: process.env.NUXT_KINDE_PASSWORD,
//   },
//   modules: [
//     "@nuxthub/core",
//     "@nuxt/icon",
//     "@nuxtjs/tailwindcss",
//     "@nuxtjs/color-mode",
//     "@nuxtjs/kinde",
//     "@primevue/nuxt-module",
//     "@pinia/nuxt",
//     "@nuxt/fonts",
//     "@nuxtjs/robots",
//     "nuxt-viewport",
//   ],
//   nitro: {
//     experimental: {
//       openAPI: true,
//     },
//   },
//   primevue: {
//     options: {
//       ripple: true,
//       theme: {
//         preset: useMemomancyTheme(),
//       },
//       pt: useMemomancyPassthrough(),
//     },
//   },
//   routeRules: {
//     "/**": {
//       appMiddleware: ["auth-logged-in"],
//       kinde: {
//         redirectUrl: "/api/login",
//         external: true,
//       },
//     },
//     "/": {
//       kinde: {
//         public: true,
//       },
//     },
//     "/calculator": {
//       kinde: {
//         public: true,
//       },
//     },
//     "/dashboard": {
//       kinde: {
//         permissions: { dashboard: true },
//         redirectUrl: "/api/login",
//         external: true,
//       },
//     },
//     "/gallery": {
//       kinde: {
//         public: true,
//       },
//     },
//     "/reservation": {
//       kinde: {
//         public: true,
//       },
//     },
//   },
//   runtimeConfig: {
//     public: {
//       siteName: "Memomancy",
//       siteUrl: "https://memomancy.com",
//       siteTitle: "Memomancy",
//     },
//     adminList: process.env.MEMOMANCY_ADMIN_LIST,
//   },
//   vite: {
//     assetsInclude: ["**/*.mp4", "**/*.webm", "**/*.ogg"],
//   },
//   tailwindcss: {
//     cssPath: "~/assets/css/tailwind.css",
//   },
//   viewport: {
//     breakpoints: {
//       xs: 320,
//       sm: 640,
//       md: 768,
//       mtl: 960,
//       lg: 1024,
//       xl: 1280,
//       "2xl": 1536,
//     },
//   },
// });
