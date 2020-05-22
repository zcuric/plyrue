<template>
  <plyrue type="audio" :sources="audio" />
</template>

<script>
export default {
  data() {
    return {
      audio: [
        {
          src: 'http://www.hochmuth.com/mp3/Haydn_Cello_Concerto_D-1.mp3',
          type: 'audio/mp3'
        }
      ]
    };
  }
};
</script>
