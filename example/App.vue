<template>
  <div class="flex flex-col items-center justify-center">
    <div class="bg-blue-400 flex justify-center links mb-10 shadow text-white w-full">
      <router-link class="px-3 py-3 hover:bg-blue-500" to="/">Default</router-link>
      <router-link class="px-3 py-3 hover:bg-blue-500" to="/audio">Audio</router-link>
      <router-link class="px-3 py-3 hover:bg-blue-500" to="/video">Video</router-link>
      <router-link class="px-3 py-3 hover:bg-blue-500" to="/video-slot">Video slot</router-link>
      <router-link class="px-3 py-3 hover:bg-blue-500" to="/vimeo">Vimeo</router-link>
      <router-link class="px-3 py-3 hover:bg-blue-500" to="/youtube">YouTube</router-link>
    </div>
    <router-view/>
    <div></div>
  </div>
</template>

<script>
export default {};
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

.plyrue {
  @apply w-1/3;
}
</style>
