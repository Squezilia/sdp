<script setup lang="ts">
import { ChevronDown, GalleryVerticalEnd } from 'lucide-vue-next';
import { motion } from 'motion-v';
import { useSidebar } from '~/components/ui/sidebar';
import { authClient } from '~/lib/auth';

const sidebar = useSidebar();

const organization = authClient.useActiveOrganization();
const organizations = authClient.useListOrganizations();
</script>

<template>
  <SidebarHeader>
    <div class="flex w-full items-center relative">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <ClientOnly>
            <SidebarMenuButton
              v-if="organization.data"
              class="h-8.5 max-w-[90%] relative group-data-[state=collapsed]:w-10! group-data-[state=collapsed]:justify-center transition-[padding_0s] group-data-[state=collapsed]:max-w-10! px-1"
            >
              <Avatar class="rounded-lg size-7">
                <AvatarImage class="rounded-lg" src="" />
                <AvatarFallback
                  class="rounded-lg bg-emerald-400 text-neutral-900"
                >
                  <GalleryVerticalEnd />
                </AvatarFallback>
              </Avatar>
              <motion.span
                v-if="sidebar.state.value === 'expanded'"
                :initial="{ width: '100%', opacity: 100 }"
                :exit="{ width: 0, opacity: 0 }"
                :animate="{ width: '100%', opacity: 100 }"
                :transition="{ duration: 0.2 }"
                class="truncate"
                >{{ organization.data.name }}</motion.span
              >
              <motion.div
                v-if="sidebar.state.value === 'expanded'"
                :initial="{ width: '1rem', opacity: 100 }"
                :exit="{ width: 0, opacity: 0 }"
                :animate="{ width: '1rem', opacity: 100 }"
                :transition="{ duration: 0.2 }"
              >
                <ChevronDown />
              </motion.div>
            </SidebarMenuButton>
          </ClientOnly>
        </DropdownMenuTrigger>
        <ClientOnly>
          <DropdownMenuContent v-if="organizations.data" class="min-w-56">
            <LazyDropdownMenuGroup>
              <DropdownMenuLabel>Organizasyonlar</DropdownMenuLabel>
              <DropdownMenuItem
                v-for="org of organizations.data"
                :key="org.id"
                @click="
                  authClient.organization.setActive({ organizationId: org.id })
                "
              >
                <Avatar class="rounded-md size-6">
                  <AvatarImage class="rounded-md" src="" />
                  <AvatarFallback
                    class="rounded-md bg-emerald-400 text-neutral-900"
                  >
                    <GalleryVerticalEnd class="size-3.5" />
                  </AvatarFallback>
                </Avatar>
                <span>{{ org.name }}</span>
              </DropdownMenuItem>
            </LazyDropdownMenuGroup>
          </DropdownMenuContent>
        </ClientOnly>
      </DropdownMenu>
      <SidebarTrigger
        class="bg-sidebar! hover:bg-primary! opacity-100 hover:border-primary border-sidebar-border"
      />
    </div>
  </SidebarHeader>
</template>
