<script lang="ts" setup>
import InputValidation from '@/components/base/InputValidation.vue'
import Button from '@/components/ui/button/Button.vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { useForm } from 'vee-validate'
import { cloneDeep } from 'lodash-es'
import { useResumeStore } from '@/stores/resume/resume'
import { formatDateUs } from '@/utils/format'
import { ScrollArea } from '@/components/ui/scroll-area'

const resumeStore = useResumeStore()
const { handleSubmit } = useForm()

const localData = ref(cloneDeep(resumeStore.dataResume?.works))
const isPreview = computed(() => resumeStore.getShowPreview)

const isLoading = ref(false)
const isEdit = ref(false)

const defaultWorkExperience = {
  company_name: '',
  is_current_working: false,
  position: '',
  location: '',
  start_date: '',
  end_date: '',
  description: '',
}

const openEdit = () => {
  isEdit.value = true
}

const cancelEdit = () => {
  isEdit.value = false
  localData.value = resumeStore.dataResume?.works
}

const addWorkExperience = () => {
  localData.value.push({ ...defaultWorkExperience })
}

const deleteWorkExperience = (index: number) => {
  if (localData.value.length > 1) {
    localData.value.splice(index, 1)
  }
}

const descriptions = ref<string[]>([])
onBeforeMount(() => {
  localData.value.forEach((item, index) => {
    descriptions.value[index] = item.description
  })
})

const onSubmit = handleSubmit(async (value) => {
  console.log(value, 'check data before', descriptions.value)

  localData.value = localData.value.map((item, index) => ({
    ...item,
    position: value[`position-${index}`],
    company_name: value[`company_name-${index}`],
    location: value[`city-${index}`],
    description: descriptions.value[index],
    start_date: item.start_date ? new Date(item.start_date).toISOString() : null,
    end_date: item.end_date ? new Date(item.end_date).toISOString() : null,
  }))

  console.log(localData.value, 'check data after')
  resumeStore.updateWorkExperience(localData.value)

  isEdit.value = false
})

watch(
  () => resumeStore.dataResume,
  (newVal) => {
    if (newVal) {
      localData.value = cloneDeep(newVal.works)
    }
  },
  { immediate: true, deep: true },
)
</script>

<template>
  <div
    class="relative group rounded-lg p-5 py-2 w-full hover:bg-gray-50"
    :class="isEdit ? 'bg-gray-50' : 'bg-white'"
  >
    <!-- Edit button -->
    <div
      v-if="!isEdit && !isPreview"
      class="absolute hidden group-hover:flex -top-2 p-1 gap-1 right-10 cursor-pointer border rounded-md items-center justify-center bg-white shadow-sm hover:shadow-md transition-all duration-200"
    >
      <div
        class="size-6 flex justify-center items-center hover:bg-slate-50 rounded-md"
        @click="openEdit"
      >
        <span class="i-solar-pen-bold text-primary"></span>
      </div>
      <div
        class="size-6 flex justify-center items-center hover:bg-slate-50 rounded-md"
        @click="resumeStore.deleteSection('works')"
      >
        <span class="i-solar-trash-bin-minimalistic-2-bold text-primary"></span>
      </div>
    </div>
    <!-- End edit button -->
    <h2 class="font-semibold text-base pb-1 border-b border-slate-950 w-full">WORK EXPERIENCED</h2>
    <div
      v-for="(item, index) in localData"
      :key="index"
      class="flex flex-col gap-0 mt-1 w-full px-3"
    >
      <div class="flex justify-between w-full items-center">
        <p class="font-semibold text-base">{{ item?.position }}</p>
        <div class="flex items-center gap-3">
          <p class="font-semibold text-base">{{ formatDateUs(item?.start_date) }}</p>
          <p class="font-semibold text-base">{{ formatDateUs(item?.end_date) }}</p>
        </div>
      </div>
      <div class="flex justify-between w-full items-center">
        <p class="font-semibold text-base">{{ item?.company_name }}</p>
        <p class="font-semibold text-base">{{ item?.location }}</p>
      </div>
      <p
        class="text-sm font-normal mt-1"
        v-html="item?.description"
      ></p>
    </div>
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
        <div class="flex items-center gap-3">
          <div class="form-data flex flex-col gap-1 w-[300px]">
            <label for="name">Company Name</label>
            <InputValidation
              id="company_name"
              placeholder="e.g., Youtube, Ecomdy, etc"
              type="text"
              :name="`company_name-${index}`"
              :initial-value="item?.company_name"
              class="h-11 mt-1 bg-white border-slate-200 outline-none"
            />
          </div>
          <div class="form-data flex flex-col gap-1 w-[300px]">
            <label for="position">Position</label>
            <InputValidation
              id="position"
              :initial-value="item?.position"
              placeholder="e.g., Frontend, Backend, etc"
              type="text"
              :name="`position-${index}`"
              class="h-11 mt-1 bg-white border-slate-200 outline-none"
            />
          </div>
        </div>
        <div class="flex gap-x-3 flex-wrap">
          <div class="form-data flex flex-col gap-1 w-[200px]">
            <label for="city">City, Country</label>
            <InputValidation
              id="city"
              :initial-value="item?.location"
              placeholder="VietNam, UK, etc"
              type="text"
              :name="`city-${index}`"
              class="h-11 mt-1 bg-white border-slate-200 outline-none"
            />
          </div>
          <div class="form-data flex flex-col gap-1 w-[200px]">
            <label for="start">Start Date</label>
            <a-config-provider
              :theme="{
                token: {
                  colorPrimary: '#FF5C00',
                },
              }"
            >
              <a-date-picker
                v-model:value="localData[index].start_date"
                class="h-11 mt-1 bg-white border-slate-200 outline-none"
                picker="month"
                :name="`startDate-${index}`"
              />
            </a-config-provider>
          </div>
          <div class="form-data flex flex-col gap-1 w-[200px]">
            <label for="end">End Date</label>
            <a-config-provider
              :theme="{
                token: {
                  colorPrimary: '#FF5C00',
                },
              }"
            >
              <a-date-picker
                v-model:value="localData[index].end_date"
                class="h-11 mt-1 bg-white border-slate-200 outline-none"
                picker="month"
                :name="`endDate-${index}`"
              />
            </a-config-provider>
          </div>
        </div>
        <ScrollArea class="flex flex-col gap-1 w-full mb-12">
          <label for="end">Job Descriptions</label>
          <div class="form-description h-40 w-full bg-white rounded-lg">
            <QuillEditor
              ref="quillEditor"
              v-model:content="descriptions[index]"
              :toolbar="['bold', 'italic', 'underline', 'link']"
              placeholder="Enter your post"
              content-type="html"
              theme="snow"
            />
          </div>
        </ScrollArea>
        <div
          class="border-b border-slate-950 mb-5 w-full mt-5"
          @click.stop.prevent="deleteWorkExperience(index)"
        >
          <div
            class="absolute -top-2 right-0 rounded-lg cursor-pointer p-1 bg-slate-200 flex items-center justify-center"
          >
            <span class="i-solar-trash-bin-trash-broken w-4 h-4 text-red-500"></span>
          </div>
        </div>
      </div>
      <Button
        variant="outline"
        class="w-32 h-11 flex gap-2 items-center border-primary text-primary"
        @click.stop.prevent="addWorkExperience()"
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
          <span class="text-white">Save</span>
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
