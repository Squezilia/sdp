import type { SidebarRoutes } from '~/components/dashboard/Sidebar.vue';
import type { Tabs } from '~/components/header/Navigation.vue';

declare module 'nuxt/schema' {
  interface AppConfig {
    navigation: Tabs;
    sidebar: SidebarRoutes;
    emailRegex: RegExp;
    passwordRegex: RegExp;
    nameRegex: RegExp;
  }

  interface AppConfigInput {
    navigation: Tabs;
    sidebar: SidebarRoutes;
    emailRegex: RegExp;
    passwordRegex: RegExp;
    nameRegex: RegExp;
  }
}
