<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { Card } from '@/components/ui/card'
import { useResumeStore } from '@/stores/resume/resume'
import { dataCreate } from '@/utils/resume'
const resumeStore = useResumeStore()
const { createResume } = resumeStore

const handleSubmitCreate = async () => {
  await createResume(dataCreate)
}
</script>
<template>
  <div class="w-full p-8 flex flex-col gap-6 overflow-hidden h-full">
    <Card class="h-[350px] w-[300px] relative group">
      <div class="rounded-lg">
        <img
          src="/src/assets/images/cv_template.png"
          alt=""
          class="w-full h-[350px] rounded-lg object-cotain"
        />
        <div
          class="absolute invisible group-hover:visible bottom-3 flex items-center justify-center w-full"
        >
          <Button @click="handleSubmitCreate()"
            ><span class="text-white">Create resume</span></Button
          >
        </div>
      </div>
    </Card>
  </div>
</template>
