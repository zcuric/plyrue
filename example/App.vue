<template>
  <div class="flex-it">
    <div class="links">
      <router-link to="/">Default</router-link>
      |
      <router-link to="/audio">Audio</router-link>
      |
      <router-link to="/video">Video</router-link>
      |
      <router-link to="/video-slot">Video slot</router-link>
      |
      <router-link to="/vimeo">Vimeo</router-link>
      |
      <router-link to="/youtube">YouTube</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.flex-it {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.flex-it > div {
  flex: 1;
  width: 420px;
}
</style>
