<script setup lang="ts">
import FormEvaluate from '@/components/evaluate/FormEvaluate.vue'
import ListEvaluate from '@/components/evaluate/ListEvaluate.vue'
import { useEvaluateStore } from '@/stores/evaluate'
import { useAuthStore } from '@/stores/auth'

const evaluateStore = useEvaluateStore()
const authStore = useAuthStore()
const evaluates = computed(() => evaluateStore.evaluates)

const intervalId = ref()

const startFetching = () => {
  if (!intervalId.value) {
    intervalId.value = setInterval(() => {
      evaluateStore.fetchResumes()
    }, 30000)
  }
}

const stopFetching = () => {
  if (intervalId.value) {
    clearInterval(intervalId.value)
    intervalId.value = null
  }
}

onMounted(() => {
  evaluateStore.fetchResumes()

  if (authStore.getIsLoggedIn) {
    startFetching()
  }
})

watch(
  () => authStore.getIsLoggedIn,
  (isLoggedIn) => {
    if (isLoggedIn) {
      startFetching()
    } else {
      stopFetching()
    }
  },
)
</script>

<template>
  <div class="p-5 w-full h-full flex flex-col mt-16">
    <FormEvaluate />
    <ListEvaluate v-if="evaluates.length > 0" />
    <!-- <ModalLoading v-if="isLoading" /> -->
  </div>
</template>

<style scoped lang="scss"></style>
