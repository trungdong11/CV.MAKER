<script lang="ts" setup>
import InputValidation from '@/components/base/InputValidation.vue'
import Button from '@/components/ui/button/Button.vue'
import { useResumeStore } from '@/stores/resume/resume'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { cloneDeep } from 'lodash-es'
import { useForm } from 'vee-validate'
import { formatDateUs } from '@/utils/format'

const resumeStore = useResumeStore()
const { handleSubmit } = useForm()

const localData = ref(cloneDeep(resumeStore.dataResume?.projects))

// Trạng thái chỉnh sửa
const isEdit = ref(false)
const openEdit = () => {
  isEdit.value = true
}

// Hủy chỉnh sửa
const cancelEdit = () => {
  isEdit.value = false
  localData.value = resumeStore.dataResume?.projects
}

onBeforeMount(() => {
  if (!localData.value) {
    localData.value = []
  }

  if (localData.value.length === 0) {
    localData.value.push({
      project_name: 'E-commerce Platform',
      project_link: 'https://github.com/johndoe/ecommerce',
      start_date: '2022-01-01T00:00:00.000Z',
      end_date: '2022-06-30T00:00:00.000Z',
      description: 'Built a full-stack e-commerce platform using React and Node.js',
    })

    resumeStore.updateProjects(localData.value)
  }
})

const onSubmit = handleSubmit(async (values) => {
  const transformedData = localData.value.map((item, index) => ({
    ...item,
    project_link: values[`project_link-${index}`],
    project_name: values[`project_name-${index}`],
  }))

  console.log(transformedData, 'check data before')

  resumeStore.updateProjects(transformedData)

  isEdit.value = false
})

const isLoading = ref(false)
</script>

<template>
  <div
    class="relative group rounded-lg p-5 py-2 w-full hover:bg-gray-50"
    :class="isEdit ? 'bg-gray-50' : 'bg-white'"
  >
    <!-- Edit button -->
    <div
      v-if="!isEdit"
      class="absolute hidden group-hover:flex -top-2 right-10 cursor-pointer border size-8 rounded-md items-center justify-center bg-white shadow-sm hover:shadow-md transition-all duration-200"
      @click="openEdit"
    >
      <span class="i-solar-pen-bold text-primary"></span>
    </div>
    <!-- End edit button -->
    <h2 class="font-semibold text-base pb-1 border-b border-slate-950 w-full">PROJECTS</h2>
    <template v-if="!isEdit">
      <div
        v-for="(item, index) in resumeStore.dataResume?.projects"
        :key="index"
        class="flex flex-col gap-0 mt-1 w-full px-3"
      >
        <div class="flex justify-between w-full items-center">
          <a
            :href="item?.project_link"
            class="font-bold text-base"
            >{{ item?.project_name }}</a
          >
          <div class="flex items-center gap-3">
            <p class="font-semibold text-base">
              {{ formatDateUs(item?.start_date) }}
            </p>
            <p class="font-semibold text-base">
              {{ formatDateUs(item?.end_date) }}
            </p>
          </div>
        </div>
        <div
          class="text-sm font-normal"
          v-html="item?.description"
        ></div>
      </div>
    </template>
  </div>
  <div
    v-if="isEdit"
    class="w-full bg-gray-50 p-5"
  >
    <form
      class="flex gap-2 w-full flex-col"
      @submit="onSubmit"
    >
      <div
        v-for="(item, index) in localData"
        :key="index"
        class="flex items-start gap-x-4 w-full flex-col justify-center relative"
      >
        <div class="form-data flex flex-col gap-1 w-[300px]">
          <label for="name">Project Name</label>
          <InputValidation
            :id="`project_name-${index}`"
            placeholder="e.g., Youtube, Ecomdy, etc"
            type="text"
            :name="`project_name-${index}`"
            :initial-value="item.project_name"
            class="h-11 mt-1 bg-white border-slate-200 outline-none"
          />
        </div>
        <div class="flex items-center gap-x-3 flex-wrap">
          <div class="form-data flex flex-col gap-1 w-[300px]">
            <label for="position">Project Link</label>
            <InputValidation
              :id="`project_link-${index}`"
              placeholder="e.g., Frontend, Backend, etc"
              type="text"
              :name="`project_link-${index}`"
              :initial-value="item.project_link"
              class="h-11 mt-1 bg-white border-slate-200 outline-none"
            />
          </div>
          <div class="form-data flex flex-col gap-1 w-[200px]">
            <label for="city">Start Date</label>
            <InputValidation
              id="start_date"
              placeholder="start day"
              type="text"
              name="start_date"
              :initial-value="item.start_date"
              class="h-11 mt-1 bg-white border-slate-200 outline-none"
            />
          </div>
          <div class="form-data flex flex-col gap-1 w-[200px]">
            <label for="end">End Date</label>
            <InputValidation
              :id="`end_date-${index}`"
              placeholder="End Date"
              type="text"
              :name="`end_date-${index}`"
              class="h-11 mt-1 bg-white border-slate-200 outline-none"
            />
          </div>
        </div>
        <ScrollArea class="flex flex-col gap-1 w-full mb-12">
          <label for="end">Descriptions</label>
          <div class="form-description h-40 w-full bg-white rounded-lg">
            <QuillEditor
              ref="quillEditor"
              v-model:content="localData[index].description"
              :toolbar="['bold', 'italic', 'underline', 'link']"
              placeholder="Enter your post"
              content-type="html"
              theme="snow"
            />
          </div>
        </ScrollArea>
      </div>
      <Button
        variant="outline"
        type="button"
        @click="localData.push({})"
        class="w-32 h-11 flex gap-2 items-center border-primary text-primary"
      >
        <span class="i-solar-add-circle-broken w-4 h-4 text-primary"></span>
        <span class="text-primary">Add more</span>
      </Button>
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
