<template>
  <div class="min-h-screen bg-slate-50 text-slate-900">
    <nav class="flex flex-wrap justify-center gap-1 bg-slate-900 p-2">
      <RouterLink
        v-for="route in routes"
        :key="route.path"
        :to="route.path"
        class="rounded px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
        active-class="bg-slate-700 text-white"
      >
        {{ route.name }}
      </RouterLink>
    </nav>
    <main class="flex flex-col items-center gap-6 px-4 py-10">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router';

const routes = useRouter().options.routes;
</script>
