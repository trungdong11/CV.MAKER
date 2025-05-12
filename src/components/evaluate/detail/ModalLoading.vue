<script lang="ts" setup>
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
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
  </div>
</template>
