<script setup lang="ts">
import FormEvaluate from '@/components/evaluate/FormEvaluate.vue'
import ListEvaluate from '@/components/evaluate/ListEvaluate.vue'
import { useEvaluateStore } from '@/stores/evaluate'

const evaluateStore = useEvaluateStore()
// const { isLoading } = toRefs(evaluateStore)
const evaluates = computed(() => evaluateStore.evaluates)

onMounted(() => {
  evaluateStore.fetchResumes()
  setInterval(() => {
    evaluateStore.fetchResumes()
  }, 30000)
})
</script>

<template>
  <div class="p-5 w-full h-full flex flex-col mt-16">
    <FormEvaluate />
    <ListEvaluate v-if="evaluates.length > 0" />
    <!-- <ModalLoading v-if="isLoading" /> -->
  </div>
</template>

<style scoped lang="scss"></style>
