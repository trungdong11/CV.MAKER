<script lang="ts" setup>
import Button from '@/components/ui/button/Button.vue'
import TextareaValidation from '@/components/base/TextareaValidation.vue'
// import { QuillEditor } from '@vueup/vue-quill'
// import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { useResumeStore } from '@/stores/resume/resume'
import { useForm } from 'vee-validate'
// import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue'

const resumeStore = useResumeStore()
const localData = ref(resumeStore.dataResume.summary)
const isPreview = computed(() => resumeStore.getShowPreview)

const isEdit = ref(false)
const openEdit = () => {
  isEdit.value = true
}

defineExpose({
  openEdit,
})

const cancelEdit = () => {
  isEdit.value = false
  localData.value = resumeStore.dataResume.summary
}

const { handleSubmit } = useForm()
const onSubmit = handleSubmit(async (value) => {
  resumeStore.updateSummary(value.summary)
  isEdit.value = false
})

const data = computed(() => {
  if (isEdit.value) {
    return localData.value
  }
  return resumeStore.dataResume.summary
})

const isLoading = ref(false)

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
    :class="isEdit ? 'bg-gray-50' : 'bg-white'"
    class="relative items-center group flex flex-col justify-center gap-3 w-full hover:bg-gray-50 rounded-lg p-5 py-2"
  >
    <!-- Edit button -->
    <div
      v-if="!isEdit && !isPreview"
      class="absolute hidden group-hover:flex -top-2 right-10 cursor-pointer border size-8 rounded-md items-center justify-center bg-white shadow-sm hover:shadow-md transition-all duration-200"
      @click="openEdit"
    >
      <span class="i-solar-pen-bold text-primary"></span>
    </div>
    <!-- End edit button -->

    <p class="ont-normal text-slate-800 text-sm">{{ data }}</p>

    <!-- Edit area -->
    <div
      v-if="isEdit"
      class="w-full rounded-lg p-5"
    >
      <form
        class="flex flex-col gap-2 w-full"
        @submit.prevent
      >
        <!-- <ScrollArea class="flex flex-col gap-8">
          <div class="form-description h-40 w-full bg-white rounded-lg">
            <QuillEditor
              ref="quillEditor"
              v-model:content="localData"
              :toolbar="['bold', 'italic', 'underline', 'link']"
              placeholder="Enter your post"
              content-type="html"
              theme="snow"
            />
          </div>
        </ScrollArea> -->
        <div class="form-data">
          <TextareaValidation
            id="summary"
            type="text"
            name="summary"
            placeholder="Enter summary..."
            :initial-value="data"
            class="h-28 mt-1 bg-white border-slate-200 outline-none"
          />
        </div>
        <div class="flex items-center justify-end gap-2">
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
            <span
              v-if="isLoading"
              class="i-svg-spinners-ring-resize"
            ></span>
            <p class="text-white">Save</p>
          </Button>
        </div>
      </form>
    </div>
  </div>
</template>
<style lang="scss" scoped>
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
    }
  }
}
</style>
