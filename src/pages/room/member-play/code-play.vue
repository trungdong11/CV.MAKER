<script setup lang="ts">
import Lobby from '@/components/room/play/Lobby.vue'
</script>

<template>
  <div
    class="layout-full bg w-full h-full flex flex-col justify-center items-center bg-cover gap-8"
  >
    <div class="text-2xl text-white font-extrabold">Quizzfly</div>
    <Lobby />
  </div>
</template>
<style lang="scss" scoped>
.bg {
  background: url('@/assets/img/bg-image-5.jpg');
  background-size: cover;
}

.layout-full {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  max-height: -webkit-fill-available;
  overflow: hidden;
}
</style>
