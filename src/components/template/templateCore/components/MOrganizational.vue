<script lang="ts" setup>
import InputValidation from '@/components/base/InputValidation.vue'
import Button from '@/components/ui/button/Button.vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { useResumeStore } from '@/stores/resume/resume'
import { useForm } from 'vee-validate'
import { cloneDeep } from 'lodash-es'
import { formatDateUs, cleanQuillContent } from '@/utils/format'
import * as yup from 'yup'
import { showToast } from '@/utils/toast'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useConfirmDialog } from '@/stores/modal'

const confirmDialog = useConfirmDialog()
const resumeStore = useResumeStore()
const isLoading = ref(false)

const localData = ref(cloneDeep(resumeStore.dataResume?.organization))
const isPreview = computed(() => resumeStore.getShowPreview)
const isEditOrganization = computed(() => resumeStore.isEditOrganization)

const schema = computed(() => {
  const shape: Record<string, yup.StringSchema> = {}

  localData.value.forEach((_, index) => {
    shape[`name-${index}`] = yup.string().trim().required('Name award is required')
    shape[`position-${index}`] = yup.string().trim().required('Position is required')
    shape[`address-${index}`] = yup.string().trim().required('City/Country is required')
  })

  return yup.object().shape(shape)
})

const { handleSubmit } = useForm({
  validationSchema: schema,
})

const handleConfirmDelete = async () => {
  const { isConfirmed } = await confirmDialog.open({
    title: 'Delete Organization',
    question: 'Are you sure you want to delete organization section?',
    warning: true,
  })

  if (isConfirmed) {
    resumeStore.deleteSection('organization')
  }
}

const cancelEdit = () => {
  resumeStore.cancelEditOrganization()
  localData.value = resumeStore.dataResume.organization
}

const addOrganization = () => {
  localData.value.push({} as any)
  descriptions.value.push('')
}

const deleteOrganization = (index: number) => {
  if (localData.value.length > 1) {
    localData.value.splice(index, 1)
  }
}

const descriptions = ref<string[]>([])

const onSubmit = handleSubmit(async (value) => {
  try {
    isLoading.value = true
    localData.value = localData.value.map((item, index) => ({
      ...item,
      name: value[`name-${index}`],
      position: value[`position-${index}`],
      address: value[`address-${index}`],
      description: cleanQuillContent(descriptions.value[index]),
      start_date: item.start_date ? new Date(item.start_date).toISOString() : null,
      end_date: item.end_date ? new Date(item.end_date).toISOString() : null,
    }))

    resumeStore.updateOrganization(localData.value)
    resumeStore.cancelEditOrganization()
    showToast({
      description: 'Update organization success',
      variant: 'success',
    })
  } catch (error) {
    showToast({
      description: 'Update organization failed',
      variant: 'destructive',
    })
  }
  isLoading.value = false
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
      localData.value = cloneDeep(newVal.organization)
    }
  },
  { immediate: true, deep: true },
)
</script>

<template>
  <div
    id="organization-info"
    class="relative group rounded-lg p-5 py-2 w-full hover:bg-gray-50"
    :class="isEditOrganization ? 'bg-gray-50' : 'bg-white'"
  >
    <!-- Edit button -->
    <div
      v-if="!isEditOrganization && !isPreview"
      class="absolute hidden group-hover:flex -top-2 p-1 gap-1 right-10 cursor-pointer border rounded-md items-center justify-center bg-white shadow-sm hover:shadow-md transition-all duration-200"
    >
      <div
        class="size-6 flex justify-center items-center hover:bg-slate-50 rounded-md"
        @click="resumeStore.editOrganization"
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
        @click="handleConfirmDelete"
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <span class="i-solar-trash-bin-minimalistic-2-bold text-primary"></span>
            </TooltipTrigger>
            <TooltipContent class="mb-1"> Edit </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
    <!-- End edit button -->
    <h2 class="font-semibold text-base pb-1 border-b border-slate-950 w-full">
      ORGANIZATIONAL & VOLUNTEERING EXPERIENCE
    </h2>
    <template v-if="!isEditOrganization">
      <div
        v-for="(item, index) in localData"
        :key="index"
        class="flex flex-col gap-0 mt-1 w-full px-3"
      >
        <div class="flex items-center justify-between w-full">
          <div class="flex flex-col gap-0 items-start">
            <p class="font-semibold text-base">{{ item?.position }}</p>
            <p class="font-semibold text-base">{{ item?.name }}</p>
          </div>
          <div class="flex flex-col gap-0 items-end">
            <div class="flex items-center font-semibold text-base">
              <p class="font-semibold text-base">{{ formatDateUs(item?.start_date) }}</p>
              <span> - </span>
              <p class="font-semibold text-base">
                {{ item.end_date ? formatDateUs(item?.end_date) : 'Present' }}
              </p>
            </div>
            <p class="font-semibold text-base">{{ item?.address }}</p>
          </div>
        </div>
        <p
          class="font-nomal text-sm"
          v-html="item?.description"
        ></p>
      </div>
    </template>
    <div
      v-if="isEditOrganization"
      class="w-full bg-gray-50 rounded-lg p-5"
    >
      <form
        class="flex w-full flex-col"
        @submit.prevent="onSubmit"
      >
        <div
          v-for="(item, index) in localData"
          :key="index"
          class="flex items-start gap-x-4 w-full flex-col justify-center relative"
        >
          <div class="form-data flex flex-col gap-1 w-1/2">
            <label for="title">Company Name <span class="text-red-600 text-e">*</span></label>
            <InputValidation
              :id="`name-${index}`"
              placeholder="e.g., Best Technical Paper Award, Bug Bounty Recognition etc."
              type="text"
              :name="`name-${index}`"
              :initial-value="item?.name"
              class="h-11 mt-1 bg-white border-slate-200 outline-none"
            />
          </div>
          <div class="flex items-start gap-x-3 flex-wrap">
            <div class="form-data flex flex-col gap-1 w-[300px]">
              <label for="position">Position <span class="text-red-600 text-e">*</span></label>
              <InputValidation
                :id="`position-${index}`"
                placeholder="e.g., Best Technical Paper Award, Bug Bounty Recognition etc."
                type="text"
                :name="`position-${index}`"
                :initial-value="item?.position"
                class="h-11 mt-1 bg-white border-slate-200 outline-none"
              />
            </div>
            <div class="form-data flex flex-col gap-1 w-[200px]">
              <label for="city">City, Country <span class="text-red-600 text-e">*</span></label>
              <InputValidation
                :id="`address-${index}`"
                placeholder="e.g., Best Technical Paper Award, Bug Bounty Recognition etc."
                type="text"
                :name="`address-${index}`"
                :initial-value="item?.address"
                class="h-11 mt-1 bg-white border-slate-200 outline-none"
              />
            </div>
            <div class="form-data flex flex-col gap-1 w-[200px]">
              <label for="start">Start Date <span class="text-red-600 text-e">*</span></label>
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
                />
              </a-config-provider>
            </div>
          </div>
          <div class="flex flex-col gap-2 w-full mb-12 mt-6">
            <label for="description">Descriptions</label>
            <div class="form-description h-40 w-full bg-white rounded-lg">
              <QuillEditor
                v-model:content="descriptions[index]"
                :toolbar="['bold', 'italic', 'underline', 'link']"
                placeholder="e.g. Awarded for writing and  presenting an outstading technical paper at a conference"
                content-type="html"
                theme="snow"
              />
            </div>
          </div>
          <div
            v-if="index !== 0"
            @click.stop.prevent="deleteOrganization(index)"
          >
            <div
              class="absolute -top-2 right-0 rounded-lg cursor-pointer p-1 bg-slate-200 flex items-center justify-center"
            >
              <span class="i-solar-trash-bin-trash-broken w-4 h-4 text-red-500"></span>
            </div>
          </div>
          <div
            class="mb-5 w-full mt-5"
            :class="{ 'border-b': index + 1 < localData.length }"
          ></div>
        </div>
        <Button
          variant="outline"
          type="button"
          class="w-32 h-11 flex gap-2 items-center border-primary text-primary"
          @click="addOrganization()"
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
            :disabled="isLoading"
            class="w-28 h-10 bg-primary flex gap-2 items-center"
            type="submit"
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
