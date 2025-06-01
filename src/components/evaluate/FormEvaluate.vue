<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { showToast } from '@/utils/toast'

import { useEvaluateStore } from '@/stores/evaluate'
const router = useRouter()

const evaluateStore = useEvaluateStore()

const { evaluateCV } = evaluateStore
const { isLoading } = toRefs(evaluateStore)

const refInput = ref()
const fileUpload = ref()

const onChangeFile = async (e: Event) => {
  const element = e.currentTarget as HTMLInputElement
  const fileList: FileList | null = element.files
  if (!fileList) return
  const data = fileList[0] as any

  if (data) {
    fileUpload.value = data
    await onSubmit()
  }
}

const onSubmit = async () => {
  if (!fileUpload.value) {
    showToast({
      description: 'Please select a file first',
      variant: 'destructive',
    })
    return
  }

  const formData = new FormData()
  formData.append('file', fileUpload.value)
  evaluateStore.handleAddSampleEvaluate()
  await evaluateCV(formData)
}

const handleButtonClick = () => {
  refInput.value?.click()
}
</script>

<template>
  <div class="flex w-full flex-col gap-4 justify-center items-center">
    <h1 class="text-3xl font-medium">Upload Existing Resume</h1>
    <div
      class="w-3/4 py-12 px-8 my-4 rounded-md shadow flex flex-col items-center justify-center text-center gap-8 max-lg:w-full bg-white"
    >
      <img
        src="@/assets/svg/funnel-upload.svg"
        alt="resume upload"
        class="mx-auto"
      />
      <div class="flex flex-col gap-2 mx-auto mb-5">
        <h2 class="text-xl font-medium">Drag and drop your resume here</h2>
        <p>
          You can upload your resume in PDF, DOC, DOCX
          <span class="text-primary text-[14px] font-medium cursor-pointer hover:underline"
            >choose your resume</span
          >
        </p>
      </div>
      <Button
        :disabled="isLoading"
        class="w-1/2 h-11"
        @click="handleButtonClick"
      >
        <span
          v-if="!isLoading"
          class="i-material-symbols-light-upload-rounded text-white text-[20px] font-semibold"
        ></span>
        <span
          v-else
          class="i-svg-spinners-ring-resize text-white text-[20px] font-semibold"
        ></span>
        <span
          v-if="!isLoading"
          class="text-white ml-2"
          >Upload Resume</span
        >
        <span
          v-else
          class="text-white ml-2"
          >The evaluate is processing...</span
        >
        <input
          ref="refInput"
          type="file"
          class="hidden"
          accept=".pdf,.doc,.docx"
          @change="onChangeFile"
        />
      </Button>
    </div>
    <div class="">
      <p class="text-[14px]">
        Or you can always
        <span
          class="text-primary font-medium cursor-pointer hover:underline"
          @click="router.push('/templates')"
          >build a new resume</span
        >
        from scratch
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.shadow {
  box-shadow:
    rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
}
</style>
