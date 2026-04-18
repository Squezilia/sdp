import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/hints',
    '@nuxt/image',
    'shadcn-nuxt',
  ],

  typescript: {
    tsConfig: {
      extends: '../../../packages/config/tsconfig.base.json',
      compilerOptions: {
        baseUrl: '../',
        paths: {
          '@sdp/frontend/*': ['./*'],
          '@sdp/backend/*': ['../backend/src/*'],
          '@sdp/database/*': ['../../packages/database/src/*'],
          '@sdp/config/*': ['../../packages/config/src/*'],

          '#app': ['./.nuxt/app'],
          '#imports': ['./.nuxt/imports'],
          '#build': ['./.nuxt/build'],
          '#components': ['./.nuxt/components'],
          '#layouts': ['./.nuxt/layouts'],
          '#pages': ['./.nuxt/pages'],
          '#server': ['./.nuxt/server'],
          '#ui': ['./.nuxt/ui'],
          '#assets': ['./assets'],
          '#public': ['./public'],
        },
      },
    },
  },

  css: ['~/assets/css/tailwind.css'],
  vite: {
    plugins: [tailwindcss()],
  },

  shadcn: {
    /**
     * Prefix for all the imported component.
     * @default "Ui"
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * Will respect the Nuxt aliases.
     * @link https://nuxt.com/docs/api/nuxt-config#alias
     * @default "@/components/ui"
     */
    componentDir: '@/components/ui',
  },
});
