// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/reset.css', '~/assets/css/base.css'],
  app: {
    head: {
      title: "ATTV'71",
    },
  },
  nitro: {
    azure: {
      config: {
        platform: {
          // v20 is the highest supported version of Azure, even though v22 is LTS
          apiRuntime: 'node:20',
        },
      },
    },
  },
  imports: {
    autoImport: false,
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/fonts'],
  typescript: {
    typeCheck: true,
  },
})
