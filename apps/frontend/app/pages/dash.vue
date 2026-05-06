<script setup lang="ts">
import { authClient } from '~/lib/auth';

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth'],
});

const organization = authClient.useActiveOrganization();
const organizations = authClient.useListOrganizations();

const obj = computed(() => ({
  organizations: organizations.value.isPending,
  organization: organization.value.isPending,
}));

async function checkOrganizations() {
  if (obj.value.organizations) return;
  if (!organizations.value.data || organizations.value.data.length === 0) {
    await useRouter().isReady();
    navigateTo('/create', { replace: true });
    return;
  }
  if (obj.value.organization) return;
  if (!organization.value.data)
    authClient.organization.setActive({
      organizationId: organizations.value.data[0]?.id,
    });
}

checkOrganizations();

watch(
  obj,
  async () => {
    checkOrganizations();
  },
  { deep: true, immediate: true }
);
</script>

<template>
  <NuxtPage />
</template>
