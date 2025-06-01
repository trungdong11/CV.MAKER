<script lang="ts" setup>
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
const emit = defineEmits(['close'])
</script>

<template>
  <div
    class="w-full flex flex-col justify-center items-center z-50 h-full top-0 left-0 bottom-0 right-0 fixed bg-white"
  >
    <DotLottieVue
      class="-mt-20"
      style="height: 200px; width: 200px"
      autoplay
      loop
      src="https://lottie.host/1a215eb6-549c-4fe5-8cd1-ac6df872153f/oeKLnidwZH.lottie"
    />
    <div class="text-center">
      <h3 class="text-2xl text-primary font-semibold mb-2">Analyzing Your CV</h3>
      <p class="text-base text-primary">
        We are currently evaluating your resume. This process may take a few moments.
      </p>
    </div>
    <div class="absolute -bottom-32 left-0">
      <DotLottieVue
        class=""
        style="height: 600px; width: 800px"
        autoplay
        loop
        src="https://lottie.host/b1ad3a5a-5b9c-4d1d-bdd2-dfecdf5a5300/JvdNPJDWS8.lottie"
      />
    </div>
    <div class="absolute top-6 right-6">
      <span
        class="i-material-symbols-light-close-rounded text-primary cursor-pointer text-3xl"
        @click="emit('close')"
      ></span>
    </div>
  </div>
</template>
