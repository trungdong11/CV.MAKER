<script setup lang="ts">
import { useResumeManageStore } from '@/stores/resume/resumeManage'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useConfirmDialog } from '@/stores/modal'
// import Chip from '@/components/base/Chip.vue'

const resumeManageStore = useResumeManageStore()
const confirmDialog = useConfirmDialog()

const resumes = computed(() => resumeManageStore.getResumes)

const handleConfirmDelete = async (resumeId: string) => {
  const { isConfirmed } = await confirmDialog.open({
    title: 'Delete Quizzfly',
    question: 'Are you sure you want to delete this quizzfly?',
    warning: true,
  })

  if (isConfirmed) {
    resumeManageStore.deleteResume(resumeId)
  }
}
</script>
<template>
  <div class="grid grid-cols-2 max-md:grid-cols-1 gap-5">
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
            src=""
            alt=""
          />
        </div>
        <div class="flex flex-col w-full justify-between">
          <div class="flex items-center justify-between">
            <div class="flex item-center gap-3">
              <h2 class="title text-base font-medium">{{ resume?.title || 'Untitled' }}</h2>
              <!-- <Chip
                :name="quizzfly.quizzfly_status"
                color="#df223a"
              /> -->
            </div>
            <div class="flex items-center gap-2">
              <span
                class="i-material-symbols-light-delete-outline cursor-pointer text-2xl"
                @click="handleConfirmDelete(resume?.id)"
              ></span>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <div class="text-sm text-gray-500">@{{ resume?.username }}</div>
            <div class="flex gap-5">
              <RouterLink
                target="_blank"
                :to="{ name: 'host-live', params: { resumeId: resume.id } }"
                ><Button class="flex items-center h-6 w-17 text-xs"> Host live</Button>
              </RouterLink>
              <RouterLink
                :to="{ name: 'resume-create', params: { resumeId: resume.id } }"
                class="flex items-center cursor-pointer hover:text-[#0061ff] gap-2 hover:underline"
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
