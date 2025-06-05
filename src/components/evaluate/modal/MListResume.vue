<script lang="ts" setup>
import Card from '@/components/ui/card/Card.vue'
import { useResumeManageStore } from '@/stores/resume/resumeManage'
import Button from '@/components/ui/button/Button.vue'
import Skeleton from '@/components/ui/skeleton/Skeleton.vue'

const resumeManageStore = useResumeManageStore()
const { isFetching, resumes } = toRefs(resumeManageStore)
const { handleRawEvaluate } = resumeManageStore

interface Emits {
  (e: 'close'): void
}

const emit = defineEmits<Emits>()

const handleEvaluate = (id: string) => {
  handleRawEvaluate(id)
  emit('close')
}

onMounted(() => {
  resumeManageStore.fetchResumes()
})
</script>

<template>
  <div
    class="fixed z-[9999] bottom-0 top-0 left-0 right-0 bg-rgb flex items-center justify-center"
    @click="emit('close')"
  >
    <div
      class="flex flex-col gap-6 items-center justify-center p-12 rounded-xl bg-white w-[650px]"
      @click.stop
    >
      <h2 class="text-3xl font-bold">Select a resume</h2>
      <div
        class="flex flex-col gap-3 p-4 border border-gray-200 rounded-lg overflow-y-auto max-h-[400px] min-h-[200px] w-full"
      >
        <div
          v-if="isFetching"
          class="flex flex-col gap-2 w-full items-center"
        >
          <div class="flex w-full p-4 gap-3">
            <Skeleton class="w-full h-20 rounded-md" />
          </div>
          <div class="flex p-4 gap-3 w-full">
            <Skeleton class="w-full h-20 rounded-md" />
          </div>
          <div class="flex p-4 gap-3 w-full">
            <Skeleton class="w-full h-20 rounded-md" />
          </div>
        </div>
        <div
          v-else
          class="flex flex-col gap-3"
        >
          <Card
            v-for="resume in resumes"
            :key="resume.id"
            class="flex gap-3 cursor-pointer rounded-lg"
          >
            <img
              src="@/assets/images/cv-template-1.avif"
              alt="resume-default"
              class="w-[100px] h-[100px] object-cover rounded-tl-lg rounded-bl-lg"
            />
            <div class="flex items-center justify-between gap-2 p-4 w-full">
              <div class="flex flex-col gap-3">
                <h2 class="title text-base font-medium w-full">
                  {{ resume?.personal_details?.full_name || 'Untitled' }}
                </h2>
                <p class="text-xs text-slate-500">
                  {{ new Date(resume?.created_at).toLocaleDateString() }}
                </p>
              </div>
              <Button
                class="flex items-center h-6 w-17 text-xs text-white"
                @click="handleEvaluate(resume.id)"
                ><span class="text-white">Evaluate</span>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bg-rgb {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
