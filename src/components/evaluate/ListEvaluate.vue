<script setup lang="ts">
import { useEvaluateStore } from '@/stores/evaluate'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useConfirmDialog } from '@/stores/modal'
import { Skeleton } from '@/components/ui/skeleton'
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import ModalLoading from '@/components/evaluate/detail/ModalLoading.vue'
const evaluateStore = useEvaluateStore()

const confirmDialog = useConfirmDialog()

const { isLoading, evaluates } = toRefs(evaluateStore)

const handleConfirmDelete = async (evaluateId: string) => {
  const { isConfirmed } = await confirmDialog.open({
    title: 'Delete Evaluate',
    question: 'Are you sure you want to delete this evaluate?',
    warning: true,
  })

  if (isConfirmed) {
    evaluateStore.deleteEvaluate(evaluateId)
  }
}

const isShowLoading = ref<boolean>(false)
const showLoading = () => {
  isShowLoading.value = true
}

const closeLoading = () => {
  isShowLoading.value = false
}
</script>
<template>
  <div class="mt-8 p-8 flex flex-col gap-4">
    <h2 class="text-2xl font-medium mb-4">List evaluates</h2>
    <div
      v-if="evaluates.length === 0"
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
        v-for="evaluate in evaluates"
        :key="evaluate.id"
      >
        <div
          v-if="!evaluate.total_grammar_errors && isLoading"
          class="flex gap-2 w-full flex-col relative"
        >
          <div>
            <DotLottieVue
              style="height: 200px; width: 100%; object-fit: cover"
              autoplay
              loop
              src="https://lottie.host/0218e032-fa91-49db-9a9a-8bd0255651e9/HDltbqNx6A.lottie"
            />
          </div>
          <div class="flex flex-col w-full justify-between p-5 gap-2">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3 justify-between w-full">
                <h2 class="text-xs text-primary font-medium w-full">
                  The evaluate is processing...
                </h2>
              </div>
            </div>
            <div class="flex items-center justify-end">
              <Button
                class="flex items-center h-6 w-17 text-xs text-white"
                @click="showLoading()"
                ><span class="text-white">See detail</span></Button
              >
            </div>
          </div>
        </div>
        <div
          v-else
          class="flex gap-2 w-full flex-col relative"
        >
          <div class="flex items-center gap-2 absolute top-4 right-4">
            <span
              class="i-material-symbols-light-delete-outline text-primary cursor-pointer text-xl"
              @click="handleConfirmDelete(evaluate?.id)"
            ></span>
          </div>
          <img
            src="@/assets/images/Profile-Building.png"
            alt="resume-default"
            class="w-full h-[250px] object-cover"
          />
          <div class="flex flex-col w-full justify-between p-5 gap-2">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3 justify-between w-full">
                <h2 class="title text-base font-medium w-full">
                  {{ evaluate?.personal_details?.full_name || 'Untitled' }}
                </h2>
                <p class="text-xs text-slate-500">
                  {{ new Date(evaluate?.created_at).toLocaleString('vi-VN') }}
                </p>
              </div>
            </div>
            <div class="flex items-center justify-end">
              <RouterLink :to="`/evaluate/${evaluate?.id}`"
                ><Button class="flex items-center h-6 w-17 text-xs text-white"
                  ><span class="text-white">Detail</span></Button
                >
              </RouterLink>
            </div>
          </div>
        </div>
      </Card>
    </div>
    <ModalLoading
      v-if="isShowLoading"
      @close="closeLoading()"
    />
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
