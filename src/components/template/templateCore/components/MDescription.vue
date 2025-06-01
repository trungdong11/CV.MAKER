<script lang="ts" setup>
import Button from '@/components/ui/button/Button.vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { useResumeStore } from '@/stores/resume/resume'
import { useForm } from 'vee-validate'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import MGenerateSummary from '../../modal/MGenerateSummary.vue'
import MSupportDescription from '../../modal/MSupportDescription.vue'
import { cleanQuillContent } from '@/utils/format'
import { showToast } from '@/utils/toast'

const resumeStore = useResumeStore()
const localData = ref(resumeStore.dataResume.summary)
const isPreview = computed(() => resumeStore.getShowPreview)
const isEditDescription = computed(() => resumeStore.isEditDescription)

const cancelEdit = () => {
  resumeStore.cancelEditDescription()
  localData.value = resumeStore.dataResume.summary
}

const description = ref('')
const { handleSubmit } = useForm()
const onSubmit = handleSubmit(async () => {
  try {
    isLoading.value = true
    resumeStore.updateSummary(cleanQuillContent(description.value))
    resumeStore.cancelEditDescription()
    showToast({
      description: 'Update Summary success',
      variant: 'success',
    })
  } catch (error) {
    showToast({
      description: 'Update Summary failed',
      variant: 'destructive',
    })
  }
  isLoading.value = false
})

const isLoading = ref(false)
const isShowGenerate = ref(false)
const isShowSupport = ref(false)
const type = ref('')

const unShowGenerate = () => {
  isShowGenerate.value = false
}

const unShowSupport = () => {
  isShowSupport.value = false
}

const showSupport = (item: string) => {
  isShowSupport.value = true
  type.value = item
}

const handleChangeSummary = (text: string) => {
  description.value = text
}

onBeforeMount(() => {
  description.value = localData.value
})

watch(
  () => resumeStore.dataResume,
  (newVal) => {
    if (newVal) {
      localData.value = newVal.summary
    }
  },
  { immediate: true, deep: true },
)
</script>

<template>
  <div
    id="description-info"
    :class="isEditDescription ? 'bg-gray-50' : 'bg-white'"
    class="relative items-center group flex flex-col justify-center gap-3 w-full hover:bg-gray-50 rounded-lg p-5 py-2"
  >
    <!-- Edit button -->
    <div
      v-if="!isEditDescription && !isPreview"
      class="absolute hidden group-hover:flex -top-2 right-10 cursor-pointer border size-8 rounded-md items-center justify-center bg-white shadow-sm hover:shadow-md transition-all duration-200"
      @click="resumeStore.editDescription"
    >
      <span class="i-solar-pen-bold text-primary"></span>
    </div>
    <!-- End edit button -->

    <p
      class="font-normal text-slate-800 text-sm"
      v-html="localData"
    ></p>

    <!-- Edit area -->
    <div
      v-if="isEditDescription"
      class="w-full rounded-lg p-5"
    >
      <form
        class="flex flex-col gap-2 w-full"
        @submit.prevent
      >
        <div class="flex flex-col gap-8">
          <div class="form-description relative h-40 w-full bg-white rounded-lg">
            <QuillEditor
              ref="quillEditor"
              v-model:content="description"
              :toolbar="['bold', 'italic', 'underline', 'link']"
              placeholder="Enter your post"
              content-type="html"
              theme="snow"
            />
            <div class="absolute top-2 left-40">
              <HoverCard>
                <HoverCardTrigger>
                  <Button
                    id="tour-item"
                    class="ai-glow flex items-center gap-2 px-4 h-9 gradient-from-primary text-white font-medium rounded-full shadow-lg hover:bg-indigo-300 transition"
                  >
                    ✨ <span class="text-white">Generate Summary</span>
                    <span
                      v-if="isLoading"
                      class="i-svg-spinners-90-ring-with-bg text-xl"
                    ></span>
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent class="w-80 z-[1]">
                  <div
                    class="flex flex-col gap-1 rounded-lg p-2 cursor-pointer w-full hover:bg-gray-100"
                    @click="isShowGenerate = true"
                  >
                    <div class="font-medium text-[14px]">Generate samples of great summary</div>
                    <div class="text-xs m-0">
                      Get a sense of what a great summary entails, choose a sample that aligns with
                      you.
                    </div>
                  </div>
                  <div
                    class="flex flex-col gap-1 rounded-lg p-2 cursor-pointer w-full hover:bg-gray-100"
                    @click="showSupport('enhance')"
                  >
                    <div class="font-medium text-[14px]">Enhance summary</div>
                    <div class="text-xs m-0">
                      Select a sentence or the entire summary that you want to improve, and let AI
                      take care of the rest!
                    </div>
                  </div>
                  <div
                    class="flex flex-col gap-1 rounded-lg p-2 cursor-pointer w-full hover:bg-gray-100"
                    @click="showSupport('grammar')"
                  >
                    <div class="font-medium text-[14px]">Fix spelling & grammar</div>
                    <div class="text-xs m-0">
                      Ensure your resume is polished and professional with perfect spelling &
                      grammar
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-end gap-2 mt-20">
          <Button
            variant="secondary"
            class="w-32 h-11 flex gap-2 items-center text-primary"
            @click="cancelEdit"
          >
            Cancel
          </Button>
          <Button
            :disabled="isLoading"
            class="w-32 h-11 bg-primary flex gap-2 items-center"
            @click="onSubmit"
          >
            <p class="text-white">Save</p>
            <span
              v-if="isLoading"
              class="i-svg-spinners-ring-resize text-white"
            ></span>
          </Button>
        </div>
      </form>
    </div>

    <MGenerateSummary
      v-if="isShowGenerate"
      @close="unShowGenerate()"
      @handle-change-summary="handleChangeSummary"
    />

    <MSupportDescription
      v-if="isShowSupport"
      :text="description"
      :type="type"
      @close="unShowSupport"
      @handle-change-description="handleChangeSummary"
    />
  </div>
</template>
<style lang="scss" scoped>
.ai-shine {
  background: linear-gradient(270deg, #6366f1, #8b5cf6, #6366f1);
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
    box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(99, 102, 241, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(99, 102, 241, 0);
  }
}

.ai-glow {
  animation: aiPulse 2s infinite;
}

.form-description {
  &:deep() {
    .ql-container.ql-snow {
      border: 1px solid #ff5c00;
      background-color: white;
      border-bottom-right-radius: 8px;
      border-bottom-left-radius: 8px;
    }

    .ql-toolbar.ql-snow {
      border: 1px solid #ff5c00;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      padding-top: 12px;
      padding-bottom: 12px;
    }
  }
}
</style>
