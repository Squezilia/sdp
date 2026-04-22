<script setup lang="ts">
import type { RouteLocationAsString } from 'vue-router';
import { navigationMenuTriggerStyle } from '../ui/navigation-menu';
import { cn } from '~/lib/utils';
import type { HTMLAttributes } from 'vue';

interface Sub {
  path: RouteLocationAsString;
  icon: string;
  description: string;
  wide?: boolean;
  style?: HTMLAttributes['class'];
}

type Tabs = Record<RouteLocationAsString, string | Record<string, Sub>>;

const tabs: Tabs = {
  'Ana Sayfa': '/',
  Hizmetler: {
    VDS: {
      path: '/services/vds',
      icon: 'solar:laptop-minimalistic-bold',
      description: 'Performanslı size özel sanal sunucular.',
      style: 'from-violet-500/20 to-violet-500/0',
    },
    VPS: {
      path: '/services/vps',
      icon: 'solar:laptop-minimalistic-bold',
      description: 'Performanslı paylaşımlı sanal sunucular.',
      style: 'from-violet-500/20 to-violet-500/0',
    },
    Dedicated: {
      path: '/services/dedicated',
      icon: 'solar:server-square-bold',
      description: 'Sanallaştırma olmadan saf donanıma sahip sunucular.',
      wide: true,
      style: 'col-span-2 from-amber-500/20 to-amber-500/0',
    },
  },
  Yardım: {
    Dokumentasyon: {
      path: '/help/docs',
      icon: 'solar:book-2-bold',
      description: 'Sistemlerimiz hakkındaki el kitapçığı.',
      style: 'from-emerald-500/20 to-emerald-500/0',
    },
    İletişim: {
      path: '/help/contact',
      icon: 'solar:help-bold',
      description: 'Çözülemeyen sorunlarınız için yardım masamız.',
      style: 'from-emerald-500/20 to-emerald-500/0',
    },
  },
};
</script>

<template>
  <NavigationMenu :skip-delay-duration="0">
    <NavigationMenuList class="gap-2">
      <NavigationMenuItem
        v-for="[tab, content] of Object.entries(tabs)"
        :key="tab"
      >
        <NavigationMenuLink
          v-if="typeof content === 'string'"
          as-child
          :class="cn(navigationMenuTriggerStyle(), `bg-navigation`)"
        >
          <NuxtLink :to="content">{{ tab }}</NuxtLink>
        </NavigationMenuLink>

        <template v-else>
          <NavigationMenuTrigger class="bg-navigation">{{
            tab
          }}</NavigationMenuTrigger>
          <NavigationMenuContent
            class="bg-background rounded-xl overflow-hidden min-w-136 p-2"
          >
            <div class="grid grid-cols-2 gap-2">
              <NuxtLink
                v-for="[sub, subContent] of Object.entries(content)"
                :key="sub"
                :class="
                  cn(
                    subContent.wide ? 'col-span-2' : 'col-span-1',
                    `overflow-hidden relative w-full h-32 flex flex-col border rounded-xl p-2 px-2.5`
                  )
                "
                :to="subContent.path"
              >
                <div
                  :class="
                    cn(
                      subContent.style,
                      `absolute top-0 left-0 w-full h-full transition-all duration-200 bg-linear-to-tr to-60% hover:opacity-100 opacity-0`
                    )
                  "
                />
                <Icon
                  class="size-6 mt-auto mb-0.5 dark:text-neutral-200 text-neutral-800"
                  :name="subContent.icon"
                />
                <span
                  class="font-bold dark:text-neutral-200 text-neutral-800"
                  >{{ sub }}</span
                >
                <p class="text-muted-foreground text-xs">
                  {{ subContent.description }}
                </p>
              </NuxtLink>
            </div>
          </NavigationMenuContent>
        </template>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
