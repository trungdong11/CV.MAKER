<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { useResumeStore } from '@/stores/resume/resume'
import { dataCreate } from '@/utils/resume'
const resumeStore = useResumeStore()
const { createResume } = resumeStore

const handleSubmitCreate = async () => {
  await createResume(dataCreate)
}
</script>
<template>
  <div class="p-10">
    <Button @click="handleSubmitCreate()">Create resume</Button>
  </div>
</template>
