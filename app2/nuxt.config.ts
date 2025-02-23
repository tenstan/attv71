// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint'],
})

