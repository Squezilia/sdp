<script setup lang="ts">
import type { Component } from 'vue';
import type { RouteLocationAsString } from 'vue-router';

type RouteGroup = Record<
  string,
  | { icon: Component | string; route: RouteLocationAsString }
  | RouteLocationAsString
>;
export type SidebarRoutes = Record<string, RouteGroup>;

const { sidebar } = useAppConfig();
</script>

<template>
  <Sidebar variant="floating" collapsible="icon">
    <DashboardSidebarHeader />
    <SidebarContent>
      <SidebarGroup
        v-for="[groupName, records] of Object.entries(sidebar)"
        :key="groupName"
      >
        <SidebarGroupLabel>{{ groupName }}</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem
              v-for="[recordName, record] of Object.entries(records)"
              :key="recordName"
            >
              <template v-if="typeof record !== 'string'">
                <SidebarMenuButton
                  :tooltip="recordName"
                  :data-active="$route.path === record.route"
                  as-child
                >
                  <NuxtLink :to="record.route">
                    <Icon
                      v-if="typeof record.icon === 'string'"
                      :name="record.icon"
                    />
                    <component :is="record.icon" v-else /> {{ recordName }}
                  </NuxtLink>
                </SidebarMenuButton>
              </template>
              <template v-else>
                <SidebarMenuButton
                  :data-active="$route.path === record"
                  :tooltip="recordName"
                  as-child
                >
                  <NuxtLink :to="record">
                    {{ recordName }}
                  </NuxtLink>
                </SidebarMenuButton>
              </template>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>
