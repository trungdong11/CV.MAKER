<script setup lang="ts">
import { useResumeManageStore } from '@/stores/resume/resumeManage'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useConfirmDialog } from '@/stores/modal'
import { Skeleton } from '@/components/ui/skeleton'

const resumeManageStore = useResumeManageStore()
const confirmDialog = useConfirmDialog()

const resumes = computed(() => resumeManageStore.getResumes)

const handleConfirmDelete = async (resumeId: string) => {
  const { isConfirmed } = await confirmDialog.open({
    title: 'Delete Resume',
    question: 'Are you sure you want to delete this resume?',
    warning: true,
  })

  if (isConfirmed) {
    resumeManageStore.deleteResume(resumeId)
  }
}
</script>
<template>
  <div
    v-if="resumes.length === 0"
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
    class="grid grid-cols-2 max-md:grid-cols-1 gap-5"
  >
    <Card
      v-for="resume in resumes"
      :key="resume.id"
    >
      <div class="p-3 flex gap-2 w-full">
        <!-- left -->
        <div>
          <img
            v-image
            class="w-[80px] h-[80px] object-cover rounded-sm"
            src="/src/assets/svg/funnel-upload.svg"
            alt=""
          />
        </div>
        <div class="flex flex-col w-full justify-between">
          <div class="flex items-center justify-between">
            <div class="flex item-center gap-3">
              <h2 class="title text-base font-medium w-full">
                {{ resume?.personal_details?.full_name || 'Untitled' }}
              </h2>
            </div>
            <div class="flex items-center gap-2">
              <span
                class="i-material-symbols-light-delete-outline cursor-pointer text-xl"
                @click="handleConfirmDelete(resume?.id)"
              ></span>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <div class="text-sm text-gray-500">@{{ resume?.username }}</div>
            <div class="flex gap-5">
              <RouterLink
                target="_blank"
                :to="{ name: 'evaluate' }"
                ><Button class="flex items-center h-6 w-17 text-xs text-white"
                  ><span class="text-white">Evaluate</span></Button
                >
              </RouterLink>
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
  width: 100px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
