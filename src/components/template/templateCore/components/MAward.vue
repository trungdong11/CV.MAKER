<script lang="ts" setup>
import { ref, watch, defineExpose } from 'vue'
import InputValidation from '@/components/base/InputValidation.vue'
import Button from '@/components/ui/button/Button.vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

interface Props {
  data: Record<string, any>[]
  isLoading: boolean
}
const prop = withDefaults(defineProps<Props>(), {
  data: () => [], // Mặc định là mảng rỗng
  isLoading: false,
})

// Tạo bản sao dữ liệu để chỉnh sửa
const localData = ref(JSON.parse(JSON.stringify(prop.data)))

// Đồng bộ localData khi prop.data thay đổi
watch(
  () => prop.data,
  (newData) => {
    localData.value = JSON.parse(JSON.stringify(newData))
  },
  // { deep: true },
)

onBeforeMount(() => {
  localData.value = JSON.parse(JSON.stringify(prop.data))
})

// Trạng thái chỉnh sửa
const isEdit = ref(false)
const openEdit = () => {
  isEdit.value = true
}

// Expose openEdit cho Index.vue
defineExpose({ openEdit })

// Hủy chỉnh sửa
const cancelEdit = () => {
  isEdit.value = false
  localData.value = JSON.parse(JSON.stringify(prop.data))
}

// Gửi dữ liệu khi submit
const emit = defineEmits<{
  (e: 'update:data', value: Record<string, any>[]): void
}>()
const onSubmit = () => {
  emit('update:data', localData.value)
  isEdit.value = false
}
</script>

<template>
  <div class="w-full">
    <h2 class="font-semibold text-base pb-1 border-b border-slate-950 w-full">AWARDS</h2>
    <div
      v-for="(item, index) in prop.data"
      :key="index"
      class="flex flex-col gap-0 mt-1 w-full px-3"
    >
      <div class="flex justify-between w-full items-center">
        <a
          :href="item?.awardTitleLink"
          class="cursor-pointer"
        >
          <span class="font-semibold text-base">{{ item?.awardTitle }}</span>
        </a>
        <p class="font-semibold text-base">{{ item?.issuedDate }}</p>
      </div>
      <p class="font-normal text-base">{{ item?.issuer }}</p>
    </div>
    <div
      v-if="isEdit"
      class="w-full bg-[#f9f1ee] rounded-lg p-5 mt-5"
    >
      <form
        class="flex gap-2 w-full flex-col"
        @submit.prevent="onSubmit"
      >
        <div
          v-for="(item, index) in localData"
          :key="index"
          class="flex items-start gap-x-4 w-full flex-col justify-center relative"
        >
          <div class="form-data flex flex-col gap-1 w-1/2">
            <label for="title">Title</label>
            <InputValidation
              id="title"
              v-model:value="item.awardTitle"
              placeholder="e.g., Best Technical Paper Award, Bug Bounty Recognition etc."
              type="text"
              name="title"
              class="h-11 mt-1 bg-slate-50 border-slate-200 outline-none"
            />
          </div>
          <div class="flex items-center gap-x-3 w-1/2">
            <div class="form-data flex flex-col gap-2 max-w-full flex-1">
              <label for="issuer">Issuer</label>
              <InputValidation
                id="issuer"
                v-model:value="item.issuer"
                placeholder="e.g., National University of VietNam"
                type="text"
                name="issuer"
                class="h-11 mt-1 bg-slate-50 border-slate-200 outline-none"
              />
            </div>
            <div class="form-data flex flex-col gap-1 w-[150px]">
              <label for="issuedDate">Issued Date</label>
              <InputValidation
                id="issuedDate"
                v-model="item.issuedDate"
                placeholder="e.g., Jan 2023"
                type="text"
                name="issuedDate"
                class="h-11 mt-1 bg-slate-50 border-slate-200 outline-none"
              />
            </div>
          </div>
          <div class="flex flex-col gap-1 w-full mb-12">
            <label for="description">Descriptions</label>
            <div class="form-description h-40 w-full bg-white rounded-lg">
              <QuillEditor
                v-model:value="item.description"
                :toolbar="['bold', 'italic', 'underline', 'link']"
                placeholder="e.g. Awarded for writing and presenting an outstanding technical paper at a conference"
                content-type="html"
                theme="snow"
              />
            </div>
          </div>
          <div
            v-if="index + 1 < localData.length"
            class="border-b border-slate-950 mb-5 w-full mt-5"
          ></div>
        </div>
        <div class="flex items-center justify-end gap-2">
          <Button
            variant="secondary"
            class="w-32 h-11 flex gap-2 items-center"
            @click="cancelEdit"
          >
            Cancel
          </Button>
          <Button
            :disabled="isLoading"
            class="w-32 h-11 bg-primary flex gap-2 items-center"
            type="submit"
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
