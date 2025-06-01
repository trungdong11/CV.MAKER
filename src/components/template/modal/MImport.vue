<script lang="ts" setup>
import Card from '@/components/ui/card/Card.vue'
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import { useEvaluateStore } from '@/stores/evaluate'
import { showToast } from '@/utils/toast'

const evaluateStore = useEvaluateStore()

const { isLoading, isImportSuccess } = storeToRefs(evaluateStore)

const emit = defineEmits<{
  (e: 'close'): void
}>()

const handleClose = () => {
  if (!isLoading.value) {
    emit('close')
  }
}

const refInput = ref()
const fileUpload = ref()

const handleButtonClick = () => {
  refInput.value?.click()
}

const onChangeFile = async (e: Event) => {
  const element = e.currentTarget as HTMLInputElement
  const fileList: FileList | null = element.files
  if (!fileList) return
  const data = fileList[0] as any

  if (data) {
    fileUpload.value = data
    await getImportCV()
  }
}

const getImportCV = async () => {
  if (!fileUpload.value) {
    showToast({
      description: 'Please select a file first',
      variant: 'destructive',
    })
    return
  }

  const formData = new FormData()
  formData.append('file', fileUpload.value)

  await evaluateStore.handleImportFile(formData)
}

watch(
  isImportSuccess,
  (newVal) => {
    if (newVal === true) {
      handleClose()
      evaluateStore.resetIsImportSuccess()
    }
  },
  { immediate: true },
)
</script>

<template>
  <div
    class="fixed z-[999] bottom-0 top-0 left-0 right-0 bg-rgb"
    @click="handleClose()"
  >
    <div class="flex items-center justify-center p-20 h-full w-full">
      <Card
        class="flex flex-col gap-8 p-10 w-[650px] min-w-[650px] items-center"
        @click.stop
      >
        <h2 class="text-2xl font-bold">Let's import your CV</h2>
        <div
          v-if="!isLoading"
          class="flex cursor-pointer rounded-lg border-primary border-2 h-[300px] items-center justify-center w-full flex-col"
          @click="handleButtonClick"
        >
          <DotLottieVue
            style="height: 200px; width: 200px"
            autoplay
            loop
            src="https://lottie.host/3c50d677-305b-43a9-b20e-6037605e962b/KtG2nzuxY7.lottie"
          />
          <div class="flex flex-col gap-2 items-center justify-center">
            <p class="text-sm font-medium">Click here to upload your CV</p>
            <p class="text-sm">
              Upload your CV to get started. We support PDF, DOC, and DOCX files.
            </p>
          </div>
          <input
            ref="refInput"
            type="file"
            class="hidden"
            accept=".pdf,.doc,.docx"
            @change="onChangeFile"
          />
        </div>
        <div
          v-else
          class="flex cursor-pointer rounded-lg border-primary border-2 h-[300px] items-center justify-center w-full flex-col"
          @click="handleButtonClick"
        >
          <DotLottieVue
            style="height: 200px; width: 200px"
            autoplay
            loop
            src="https://lottie.host/1fa733f4-426d-4b35-8291-fc86d6f3b8e2/wNXLz5pT30.lottie"
          />
          <div class="flex flex-col gap-2 mt-3 items-center justify-center">
            <p class="text-sm text-primary">Uploading your CV...</p>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bg-rgb {
  background-color: rgba(0, 0, 0, 0.5);
}

.ai-shine {
  background: linear-gradient(270deg, #ff6600, #ff8533, #ff6600); // dùng tông cam
  background-size: 400% 400%;
  animation: shine 5s ease infinite;
}

@keyframes shine {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes aiPulse {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 102, 0, 0.7); // cam
  }
  70% {
    box-shadow: 0 0 0 10px rgba(255, 102, 0, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 102, 0, 0);
  }
}

.ai-glow {
  animation: aiPulse 2s infinite;
}
</style>
