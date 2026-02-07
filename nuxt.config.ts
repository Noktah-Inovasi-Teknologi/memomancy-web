export default defineNuxtConfig({
  app: {},
  colorMode: {
    preference: "light",
    classSuffix: "",
    fallback: "light",
  },
  ui: {
    colorMode: false,
  },
  compatibilityDate: "2024-09-19",
  css: ["@/assets/css/main.css"],
  devtools: { enabled: true },
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
    "@nuxt/ui",
    "@nuxt/icon",
    "@nuxtjs/color-mode",
    "@nuxtjs/kinde",
    "@pinia/nuxt",
    "@nuxt/fonts",
    "@nuxtjs/robots",
    "nuxt-viewport",
    "nitro-cloudflare-dev",
  ],
  nitro: {
    experimental: {
      openAPI: true,
    },
    preset: "cloudflare-module",
    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
    },
    externals: {
      inline: ["@kinde/js-utils"],
    },
    rollupConfig: {
      external: ["expo-secure-store"],
      output: {
        globals: {
          "expo-secure-store": "{}",
        },
      },
    },
    alias: {
      "expo-secure-store": "unenv/runtime/mock/empty",
    },
  },
  routeRules: {
    "/": {
      kinde: {
        public: true,
      },
    },
    "/calculator": {
      kinde: {
        public: true,
      },
    },
    "/gallery": {
      kinde: {
        public: true,
      },
    },
    "/reservation": {
      appMiddleware: ["auth-logged-in"],
      kinde: {
        public: true,
      },
    },
  },
  runtimeConfig: {
    public: {
      siteName: "Memomancy",
      siteUrl: "https://memomancy.com",
      siteTitle: "Memomancy",
    },
    adminList: process.env.MEMOMANCY_ADMIN_LIST,
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
