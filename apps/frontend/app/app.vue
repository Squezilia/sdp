<script setup lang="ts">
import { useColorMode } from '@vueuse/core';
import { Toaster } from './components/ui/sonner';

useColorMode().value = 'auto';
</script>

<template>
  <NuxtLayout>
    <Toaster />
    <NuxtPage />
  </NuxtLayout>
</template>
