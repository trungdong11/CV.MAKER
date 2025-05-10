<script lang="ts" setup>
import Button from '@/components/ui/button/Button.vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
// import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue'

interface Props {
  summary: string
  isLoading: boolean
}
const prop = withDefaults(defineProps<Props>(), {
  summary: '',
  isLoading: false,
})

const localData = ref(prop.summary)

watch(
  () => prop.summary,
  (newData) => {
    localData.value = newData
  },
  { deep: true },
)

const isEdit = ref(false)
const openEdit = () => {
  isEdit.value = true
}

defineExpose({
  openEdit,
})

const cancelEdit = () => {
  isEdit.value = false
  localData.value = prop.summary
}

const emit = defineEmits<{
  (e: 'update:data', value: Record<string, any>[]): void
}>()
const onSubmit = () => {
  emit('update:data', localData.value)
  isEdit.value = false
}
</script>

<template>
  <div class="flex">
    <p class="ont-normal text-slate-600 text-sm">{{ prop.summary }}</p>
  </div>
  <div
    v-if="isEdit"
    class="w-full bg-[#f9f1ee] rounded-lg p-5 mt-5"
  >
    <form
      class="flex flex-col gap-2 w-full"
      @submit="onSubmit"
    >
      <ScrollArea class="flex flex-col gap-8">
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
      </ScrollArea>
      <div class="flex items-center justify-end gap-2 mt-16">
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
          Save
        </Button>
      </div>
    </form>
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
