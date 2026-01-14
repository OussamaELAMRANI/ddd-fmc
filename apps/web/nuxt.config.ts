export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxt/ui'],
  runtimeConfig: {
    public: {
      graphqlEndpoint: process.env.GRAPHQL_ENDPOINT || 'http://localhost:8080/graphql'
    }
  },
  typescript: {
    tsConfig: {
      extends: '@repo/typescript-config/nuxt.json',
    },
  },
  nitro: {
    devProxy: {
      '/api': {
        target: 'http://localhost:8080', // NestJS API URL
        changeOrigin: true,
      },
    },
  },
});
