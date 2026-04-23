<template>
  <SidebarProvider>
    <DashboardSidebar class="peer" />
    <SidebarInset
      class="peer-data-[state=collapsed]:pl-4 transition duration-200 ease-initial pl-0"
    >
      <slot />
    </SidebarInset>
  </SidebarProvider>
</template>
