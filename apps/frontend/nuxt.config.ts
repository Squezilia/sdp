import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  debug: false,

  experimental: {
    defaults: {
      nuxtLink: {
        trailingSlash: 'remove',
      },
    },
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/hints',
    '@nuxt/image',
    'shadcn-nuxt',
    '@nuxt/icon',
  ],

  typescript: {
    tsConfig: {
      compilerOptions: {
        strict: true,
        allowJs: true,
        isolatedModules: true,
        module: 'ESNext',
        moduleResolution: 'bundler',
        esModuleInterop: true,
        allowImportingTsExtensions: false,
        preserveSymlinks: false,
        verbatimModuleSyntax: true,
        outDir: 'dist',
        skipLibCheck: true,

        baseUrl: '.',
        rootDir: '../',
        paths: {
          '@sdp/frontend/*': ['./*'],

          '@sdp/backend/*': ['../../backend/src/*'],
          '@sdp/backend/lib/*': ['../../backend/dist/lib/*'],

          '@sdp/config/*': ['../../../packages/config/src/*'],

          '@sdp/database/*': ['../../../packages/database/src/*'],
          '@sdp/database/prismabox': [
            '../../../packages/database/src/generated/prismabox/barrel',
          ],
          '@sdp/database/prisma': [
            '../../../packages/database/src/generated/prisma/client',
          ],
        },
      },
    },
  },

  css: ['~/assets/css/tailwind.css'],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [
        '@vueuse/core',
        'lucide-vue-next',
        'vue-sonner',
        'clsx',
        'tailwind-merge',
        'better-auth/vue',
        'better-auth/client/plugins',
        'class-variance-authority',
        'vaul-vue',
        'reka-ui',
        'motion-v',
        'embla-carousel-vue',
        'zod',
        'vee-validate',
        '@vee-validate/zod',
      ],
    },
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

  icon: {
    mode: 'svg',
    serverBundle: {
      disabled: true,
    },
  },

  fonts: {
    provider: 'google',
    families: [
      {
        name: 'DM Sans',
        provider: 'google',
        fallbacks: [
          'BlinkMacSystemFont',
          'Segoe UI',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
        ],
        weights: ['300', '400', '500', '600', '700', '800', '900'],
      },
      {
        name: 'Geist',
        provider: 'google',
        fallbacks: [
          'BlinkMacSystemFont',
          'Segoe UI',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
        ],
        weights: ['300', '400', '500', '600', '700', '800', '900'],
      },
    ],
  },
});
