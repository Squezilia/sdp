<script setup lang="ts">
import { authClient } from '~/lib/auth';
import shortenName from '~/lib/shortenName';

const session = authClient.useSession();
</script>

<template>
  <Avatar class="h-8 w-8">
    <ClientOnly>
      <template v-if="session.data">
        <AvatarImage
          :src="session.data.user.image || ''"
          :alt="session.data.user.name"
        />
        <AvatarFallback class="rounded-lg">
          {{ shortenName(session.data.user.name) }}
        </AvatarFallback>
      </template>
    </ClientOnly>
  </Avatar>
</template>
