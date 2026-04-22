<script setup lang="ts">
import MobileContext from './MobileContext.vue';
</script>

<template>
  <div class="hidden items-center gap-2.5 lg:flex">
    <NuxtLink to="/login">
      <Button variant="outline" class="group/arrow-parent">
        Oturum Aç <ArrowRight />
      </Button>
    </NuxtLink>
    <NuxtLink to="/register">
      <Button class="group/arrow-parent">
        Şimdi Başla
        <ArrowRight />
      </Button>
    </NuxtLink>
  </div>
  <div class="flex lg:hidden items-center">
    <MobileContext />
  </div>
</template>
