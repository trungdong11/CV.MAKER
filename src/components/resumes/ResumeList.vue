<script setup lang="ts">
import { useResumeManageStore } from '@/stores/resume/resumeManage'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useConfirmDialog } from '@/stores/modal'
import { Skeleton } from '@/components/ui/skeleton'

const resumeManageStore = useResumeManageStore()
const { handleRawEvaluate } = resumeManageStore
const confirmDialog = useConfirmDialog()
const router = useRouter()

const { isFetching, resumes } = toRefs(resumeManageStore)

const handleConfirmDelete = async (resumeId: string) => {
  const { isConfirmed } = await confirmDialog.open({
    title: 'Delete Resume',
    question: 'Are you sure want to delete this resume?',
    warning: true,
  })

  if (isConfirmed) {
    resumeManageStore.deleteResume(resumeId)
  }
}

const handleEvaluate = (id: string) => {
  handleRawEvaluate(id)
  router.push({ name: 'evaluate' })
}
</script>
<template>
  <div
    v-if="isFetching"
    class="flex flex-col items-center w-full"
  >
    <div class="flex gap-2 w-full items-center">
      <div class="flex w-full p-4 gap-3">
        <Skeleton class="w-10 h-10 rounded-full" />
        <Skeleton class="w-full h-20 rounded-md" />
      </div>
      <div class="flex p-4 gap-3 w-full">
        <Skeleton class="w-10 h-10 rounded-full" />
        <Skeleton class="w-full h-20 rounded-md" />
      </div>
      <div class="flex p-4 gap-3 w-full">
        <Skeleton class="w-10 h-10 rounded-full" />
        <Skeleton class="w-full h-20 rounded-md" />
      </div>
    </div>
    <div class="flex gap-2 w-full items-center">
      <div class="flex w-full p-4 gap-3">
        <Skeleton class="w-10 h-10 rounded-full" />
        <Skeleton class="w-full h-20 rounded-md" />
      </div>
      <div class="flex p-4 gap-3 w-full">
        <Skeleton class="w-10 h-10 rounded-full" />
        <Skeleton class="w-full h-20 rounded-md" />
      </div>
      <div class="flex p-4 gap-3 w-full">
        <Skeleton class="w-10 h-10 rounded-full" />
        <Skeleton class="w-full h-20 rounded-md" />
      </div>
    </div>
  </div>
  <div
    v-else
    class="grid grid-cols-4 max-md:grid-cols-1 gap-5"
  >
    <Card
      v-for="resume in resumes"
      :key="resume.id"
    >
      <div class="flex gap-2 w-full flex-col relative">
        <div class="flex items-center gap-2 absolute top-4 right-4">
          <span
            class="i-material-symbols-light-delete-outline text-primary cursor-pointer text-xl"
            @click="handleConfirmDelete(resume?.id)"
          ></span>
        </div>
        <div>
          <img
            src="@/assets/images/cv-template-1.avif"
            alt="resume-default"
            class="w-full h-[250px] object-cover"
          />
        </div>
        <div class="flex flex-col w-full justify-between p-5 gap-2">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3 justify-between w-full">
              <h2 class="title text-base font-medium w-full">
                {{ resume?.personal_details?.full_name || 'Untitled' }}
              </h2>
              <p class="text-xs text-slate-500">
                {{ new Date(resume?.created_at).toLocaleDateString() }}
              </p>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex gap-5 items-center justify-between w-full">
              <Button
                class="flex items-center h-6 w-17 text-xs text-white"
                @click="handleEvaluate(resume?.id)"
                ><span class="text-white">Evaluate</span></Button
              >
              <RouterLink
                :to="`/resumes/${resume?.id}`"
                class="flex items-center cursor-pointer hover:text-primary gap-2 hover:underline"
              >
                <span>Edit</span>
                <span class="i-material-symbols-light-arrow-right-alt text-2xl"></span>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>
<style scoped>
.title {
  width: 150px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
