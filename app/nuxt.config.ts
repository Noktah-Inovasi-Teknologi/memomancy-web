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
  ],
  nitro: {
    experimental: {
      openAPI: true,
    },
  },
});
