<script lang="ts" setup>
import InputValidation from '@/components/base/InputValidation.vue'
import Button from '@/components/ui/button/Button.vue'
import { useResumeStore } from '@/stores/resume/resume'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { useForm } from 'vee-validate'
import { cloneDeep } from 'lodash-es'
import { formatDateUs, cleanQuillContent } from '@/utils/format'
import * as yup from 'yup'
import { showToast } from '@/utils/toast'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const resumeStore = useResumeStore()

const localData = ref(cloneDeep(resumeStore.dataResume?.education))
const descriptions = ref<string[]>([])
const isPreview = computed(() => resumeStore.getShowPreview)
const isEditEducation = computed(() => resumeStore.isEditEducation)
const isLoading = ref(false)

const defaultEducation = {
  school: '',
  degree: '',
  gpa: '',
  start_date: null,
  end_date: null,
  description: '',
  school_link: '',
  city: '',
}

const schema = computed(() => {
  const shape: Record<string, yup.StringSchema> = {}

  localData.value.forEach((_, index) => {
    shape[`school-${index}`] = yup.string().trim().required('Name project is required')
    shape[`degree-${index}`] = yup.string().trim().required('Degree is required')
  })

  return yup.object().shape(shape)
})

const { handleSubmit } = useForm({
  validationSchema: schema,
})

const cancelEdit = () => {
  resumeStore.cancelEditEducation()
  localData.value = resumeStore.dataResume.education
}

const addEducation = () => {
  localData.value.push({ ...defaultEducation })
  descriptions.value.push('')
}

const deleteEducation = (index: number) => {
  if (localData.value.length > 1) {
    localData.value.splice(index, 1)
  }
}

const onSubmit = handleSubmit(async (value) => {
  try {
    localData.value = localData.value.map((item, index) => ({
      ...item,
      school: value[`school-${index}`],
      degree: value[`degree-${index}`],
      gpa: value[`gpa-${index}`],
      description: cleanQuillContent(descriptions.value[index]),
      start_date: item.start_date ? new Date(item.start_date).toISOString() : null,
      end_date: item.end_date ? new Date(item.end_date).toISOString() : null,
    }))

    resumeStore.updateEducation(localData.value)

    resumeStore.cancelEditEducation()
    showToast({
      description: 'Update Education success',
      variant: 'success',
    })
  } catch (error) {
    showToast({
      description: 'Update Education failed',
      variant: 'destructive',
    })
  } finally {
    isLoading.value = false
  }
})

onBeforeMount(() => {
  localData.value.forEach((item, index) => {
    descriptions.value[index] = item.description
  })
})

watch(
  () => resumeStore.dataResume,
  (newVal) => {
    if (newVal) {
      localData.value = cloneDeep(newVal.education)
    }
  },
  { immediate: true, deep: true },
)
</script>

<template>
  <div
    id="education-info"
    class="relative group rounded-lg p-5 py-2 w-full hover:bg-gray-50"
    :class="isEditEducation ? 'bg-gray-50' : 'bg-white'"
  >
    <!-- Edit button -->
    <div
      v-if="!isEditEducation && !isPreview"
      class="absolute hidden group-hover:flex -top-2 p-1 gap-1 right-10 cursor-pointer border rounded-md items-center justify-center bg-white shadow-sm hover:shadow-md transition-all duration-200"
    >
      <div
        class="size-6 flex justify-center items-center hover:bg-slate-50 rounded-md"
        @click="resumeStore.editEducation"
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <span class="i-solar-pen-bold text-primary"></span>
            </TooltipTrigger>
            <TooltipContent class="mb-1"> Edit </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div
        class="size-6 flex justify-center items-center hover:bg-slate-50 rounded-md"
        @click="resumeStore.deleteSection('education')"
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <span class="i-solar-trash-bin-minimalistic-2-bold text-primary"></span>
            </TooltipTrigger>
            <TooltipContent class="mb-1"> Delete </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
    <!-- End edit button -->

    <h2 class="font-semibold text-base pb-1 border-b border-slate-950 w-full">EDUCATION</h2>
    <template v-if="!isEditEducation">
      <div
        v-for="(item, index) in localData"
        :key="index"
        class="flex flex-col gap-0 mt-1 w-full px-3"
      >
        <div class="flex justify-between w-full items-center">
          <p class="font-semibold text-base">{{ item?.degree }}</p>
          <div class="flex items-center gap-3">
            <p class="font-semibold text-base">
              {{ formatDateUs(item?.start_date) }}
            </p>
            <p class="font-semibold text-base">
              {{ item.end_date ? formatDateUs(item?.end_date) : 'Present' }}
            </p>
          </div>
        </div>
        <div class="">
          <div class="flex justify-between w-full items-center">
            <h4 class="text-base font-normal">{{ item?.school }}</h4>
            <p class="font-semibold text-base">GPA: {{ item?.gpa }}</p>
          </div>
          <p
            class="text-sm font-normal"
            v-html="item.description"
          ></p>
        </div>
      </div>
    </template>
  </div>
  <div
    v-if="isEditEducation"
    class="w-full bg-gray-50 p-5"
  >
    <form
      class="flex w-full flex-col"
      @submit="onSubmit"
    >
      <div
        v-for="(education, index) in localData"
        :key="index"
        class="flex items-start gap-x-4 w-full flex-col justify-center relative"
      >
        <div class="flex justify-between items-start w-full">
          <div class="form-data flex flex-col gap-2 w-[300px]">
            <label for="name"
              >Educational Institution Name <span class="text-red-600 text-e">*</span></label
            >
            <InputValidation
              id="school"
              placeholder="University of CVMaker"
              type="text"
              :name="`school-${index}`"
              :initial-value="education.school"
              class="h-11 mt-1 bg-white border-slate-200 outline-none"
            />
          </div>
          <div
            v-if="index !== 0"
            class="rounded-lg cursor-pointer p-2 border bg-white flex items-center justify-center"
            @click="deleteEducation(index)"
          >
            <span class="i-solar-trash-bin-trash-broken w-4 h-4 text-red-500"></span>
          </div>
        </div>
        <div class="flex gap-x-3 flex-wrap">
          <div class="form-data flex flex-col gap-1 w-[300px]">
            <label for="name">Degree <span class="text-red-600 text-e">*</span></label>
            <InputValidation
              id="degree"
              placeholder="Bachelor of IT ..."
              type="text"
              :name="`degree-${index}`"
              :initial-value="education.degree"
              class="h-11 mt-1 bg-white border-slate-200 outline-none"
            />
          </div>
          <div class="form-data flex flex-col gap-1 w-[90px]">
            <label for="name">GPA</label>
            <InputValidation
              id="GPA"
              placeholder="3.4 of 4.0"
              type="text"
              :name="`gpa-${index}`"
              :initial-value="education?.gpa?.toString()"
              class="h-11 mt-1 bg-white border-slate-200 outline-none"
            />
          </div>
          <div class="form-data flex flex-col gap-1 w-[200px]">
            <label for="name">Start Date <span class="text-red-600 text-e">*</span></label>
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
            <label for="name">Graduation Date</label>
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
        <div class="flex flex-col gap-8 w-full mb-12 mt-3">
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
        </div>
        <div
          class="mb-5 w-full mt-5"
          :class="{ 'border-b': index + 1 < localData.length }"
        ></div>
      </div>
      <Button
        variant="outline"
        class="w-32 h-11 flex gap-2 items-center border-primary text-primary"
        @click.stop.prevent="addEducation()"
      >
        <span class="i-solar-add-circle-broken w-4 h-4 text-primary"></span>
        <span class="text-primary">Add more</span>
      </Button>
      <div class="flex items-center justify-end gap-2">
        <Button
          variant="secondary"
          class="w-28 h-10 flex gap-2 items-center"
          @click="cancelEdit"
        >
          Cancel
        </Button>
        <Button
          class="w-28 h-10 bg-primary flex gap-2 items-center"
          :disabled="isLoading"
          @click="onSubmit"
        >
          <span class="text-white">Save</span>
          <span
            v-if="isLoading"
            class="i-svg-spinners-ring-resize text-white"
          ></span>
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
