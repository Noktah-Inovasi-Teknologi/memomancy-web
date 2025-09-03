import {
  useMemomancyTheme,
  useMemomancyPassthrough,
} from "./app/composables/usePrimeVueTheme";
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  app: {},
  colorMode: {
    preference: "system",
    classSuffix: "",
    fallback: "light",
  },
  compatibilityDate: "2024-09-19",
  css: [
    "@/assets/css/main.css",
  ],
  devtools: { enabled: true },
  ...(process.env.NODE_ENV !== 'test' ? {
    hub: {
      blob: true,
      database: true,
    }
  } : {}),
  icon: {
    mode: "css",
    cssLayer: "base",
  },
  ...(process.env.NODE_ENV !== 'test' ? {
    kinde: {
      debug: true,
      authDomain: process.env.NUXT_KINDE_AUTH_DOMAIN,
      clientId: process.env.NUXT_KINDE_CLIENT_ID,
      clientSecret: process.env.NUXT_KINDE_CLIENT_SECRET,
      redirectURL: process.env.NUXT_KINDE_REDIRECT_URL,
      logoutRedirectURL: process.env.NUXT_KINDE_LOGOUT_REDIRECT_URL,
      postLoginRedirectURL: process.env.NUXT_KINDE_POST_LOGIN_REDIRECT_URL,
      password: process.env.NUXT_KINDE_PASSWORD,
    }
  } : {}),
  modules: [
    ...(process.env.NODE_ENV !== 'test' ? ["@nuxthub/core"] : []),
    "@nuxt/icon",
    "@nuxtjs/color-mode",
    ...(process.env.NODE_ENV !== 'test' ? ["@nuxtjs/kinde"] : []),
    "@primevue/nuxt-module",
    "@pinia/nuxt",
    "@nuxt/fonts",
    "@nuxtjs/robots",
    "@nuxt/test-utils/module",
    "nuxt-viewport",
  ],
  nitro: {
    experimental: {
      openAPI: true,
    },
    rollupConfig: {
      external: ['expo-secure-store'],
      plugins: process.env.NODE_ENV === 'test' ? [] : undefined
    },
    minify: process.env.NODE_ENV === 'test' ? false : undefined
  },
  vite: {
    plugins: [tailwindcss()],
    test: {
      environment: 'happy-dom',
      globals: true
    },
    build: {
      minify: process.env.NODE_ENV === 'test' ? false : 'terser',
      rollupOptions: {
        plugins: process.env.NODE_ENV === 'test' ? [] : undefined
      }
    }
  },
  primevue: {
    options: {
      ripple: true,
      theme: {
        options: {
          cssLayer: {
            name: 'primevue',
            order: 'theme, base, primevue'
          }
        },
        preset: "Aura",
      },
      pt: useMemomancyPassthrough(),
    },
  },
  routeRules: {
    "/": {
      kinde: {
        public: true,
      },
    },
    "/calculator": {
      appMiddleware: ['auth-logged-in'],
      kinde: {
        public: true,
      },
    },
    "/dashboard": {
      appMiddleware: ['auth-logged-in'],
      kinde: {
        permissions: { dashboard: true },
        redirectUrl: "/api/login",
      },
    },
    "/gallery": {
      appMiddleware: ['auth-logged-in'],
      kinde: {
        public: true,
      },
    },
    "/reservation": {
      appMiddleware: ['auth-logged-in'],
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