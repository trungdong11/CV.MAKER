<script setup lang="ts">
import { useQuestionsStore } from '@/stores/quizzfly/question'
import QuizEditor from './quiz/QuizEditor.vue'
import QuizSettings from './quiz/QuizSettings.vue'
import type { Quiz } from '@/types/question'
const questionsStore = useQuestionsStore()

const currentQuestion = computed(() => questionsStore.getCurrentQuestion as Quiz)
const isHightLightMain = ref(false)
</script>
<template>
  <div class="flex w-full gap-4">
    <div class="flex-auto flex flex-col overflow-hidden">
      <div
        class="h-full border-2 rounded-xl bg-white theme-bg"
        :class="{ 'border-primary': isHightLightMain }"
        :style="{ backgroundImage: `url(${currentQuestion.background_url})` }"
        @click="isHightLightMain = true"
      >
        <QuizEditor />
      </div>
      <!-- <div class="h-[20%]"></div> -->
    </div>

    <!-- settings -->
    <QuizSettings
      class="border-2"
      :class="{ 'border-primary': !isHightLightMain }"
      @click="isHightLightMain = false"
    />
  </div>
</template>
<style scoped>
.theme-bg {
  background-size: cover;
}
</style>
