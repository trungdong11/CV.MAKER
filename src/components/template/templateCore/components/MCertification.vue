<script lang="ts" setup>
import InputValidation from '@/components/base/InputValidation.vue'
import Button from '@/components/ui/button/Button.vue'
import { useResumeStore } from '@/stores/resume/resume'
import { cloneDeep } from 'lodash-es'
import { useForm } from 'vee-validate'
import { formatDateUs } from '@/utils/format'
import { showToast } from '@/utils/toast'
import * as yup from 'yup'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useConfirmDialog } from '@/stores/modal'

const confirmDialog = useConfirmDialog()
const resumeStore = useResumeStore()

const localData = ref(cloneDeep(resumeStore.dataResume?.certification))
const isPreview = computed(() => resumeStore.getShowPreview)
const isEditCertification = computed(() => resumeStore.isEditCertification)
const isLoading = ref(false)

const handleConfirmDelete = async () => {
  const { isConfirmed } = await confirmDialog.open({
    title: 'Delete Certification',
    question: 'Are you sure you want to delete certification section?',
    warning: true,
  })

  if (isConfirmed) {
    resumeStore.deleteSection('certification')
  }
}

const cancelEdit = () => {
  resumeStore.cancelEditCertification()
  localData.value = resumeStore.dataResume.certification
}

const schema = computed(() => {
  const shape: Record<string, yup.StringSchema> = {}

  localData.value.forEach((_, index) => {
    shape[`certification_name-${index}`] = yup
      .string()
      .trim()
      .required('Name certification is required')
  })

  return yup.object().shape(shape)
})

const { handleSubmit } = useForm({
  validationSchema: schema,
})

const onSubmit = handleSubmit(async (value) => {
  try {
    isLoading.value = true
    localData.value = localData.value.map((item, index) => ({
      ...item,
      certification_name: value[`certification_name-${index}`],
      issuing_organization: value[`issuing_organization-${index}`],
      issued_date: item.issued_date ? new Date(item.issued_date).toISOString() : null,
      credential_id: value[`credential_id-${index}`],
      certification_link: value[`certification_link-${index}`],
    }))

    resumeStore.updateCertifications(localData.value)
    resumeStore.cancelEditCertification()
    showToast({
      description: 'Update certification success',
      variant: 'success',
    })
  } catch (error) {
    showToast({
      description: 'Update certification failed',
      variant: 'destructive',
    })
  }
  isLoading.value = false
})

const deleteCertification = (index: number) => {
  if (localData.value.length > 1) {
    localData.value.splice(index, 1)
  }
}

watch(
  () => resumeStore.dataResume,
  (newVal) => {
    if (newVal) {
      localData.value = cloneDeep(newVal.certification)
    }
  },
  { immediate: true, deep: true },
)
</script>

<template>
  <div
    id="certification-info"
    class="relative group rounded-lg p-5 py-2 w-full"
    :class="[
      isEditCertification ? 'bg-gray-50' : 'bg-white',
      !isPreview ? 'hover:bg-gray-50' : ''
    ]"
  >
    <!-- Edit button -->
    <div
      v-if="!isEditCertification && !isPreview"
      class="absolute hidden group-hover:flex -top-2 p-1 gap-1 right-10 cursor-pointer border rounded-md items-center justify-center bg-white shadow-sm hover:shadow-md transition-all duration-200"
    >
      <div
        class="size-6 flex justify-center items-center hover:bg-slate-50 rounded-md"
        @click="resumeStore.editCertification"
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
            <TooltipContent class="mb-1"> Delete </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
    <!-- End edit button -->
    <h2 class="font-semibold text-base pb-1 border-b border-slate-950 w-full">CERTIFICATION</h2>
    <template v-if="!isEditCertification">
      <div
        v-for="(item, index) in localData"
        :key="index"
        class="flex flex-col gap-0 mt-1 w-full px-3"
      >
        <div class="flex justify-between w-full items-center">
          <a
            :href="item?.certification_link"
            class="cursor-pointer"
          >
            <span class="font-semibold text-base">{{ item?.certification_name }}</span> by
            <span class="font-normal text-sm">{{ item?.issuing_organization }}</span>
          </a>
          <p class="font-semibold text-base">
            {{ formatDateUs(item?.issued_date) }}
          </p>
        </div>
        <div class="flex justify-between w-full items-center">
          <p class="font-semibold text-base">
            Credential Id:
            <span class="font-normal text-sm"> {{ item?.credential_id }}</span>
          </p>
        </div>
      </div>
    </template>
  </div>
  <div
    v-if="isEditCertification"
    class="w-full bg-gray-50 rounded-lg p-5"
  >
    <form
      class="flex w-full flex-col"
      @submit="onSubmit"
    >
      <div
        v-for="(item, index) in localData"
        :key="index"
        class="flex items-start gap-x-4 w-full flex-col justify-center relative"
      >
        <div class="form-data flex flex-col gap-1 w-[300px]">
          <label for="name">Certification Name <span class="text-red-600 text-e">*</span></label>
          <InputValidation
            :id="`certification_name-${index}`"
            placeholder="e.g. AWS Certified Cloud Practitioner"
            type="text"
            :name="`certification_name-${index}`"
            :initial-value="item?.certification_name"
            class="h-11 mt-1 bg-white border-slate-200 outline-none"
          />
        </div>
        <div class="flex items-start gap-x-3 flex-wrap">
          <div class="form-data flex flex-col gap-1 w-[300px]">
            <label for="position">Issuing Organization</label>
            <InputValidation
              :id="`issuing_organization-${index}`"
              placeholder="e.g., Frontend, Backend, etc"
              type="text"
              :name="`issuing_organization-${index}`"
              :initial-value="item?.issuing_organization"
              class="h-11 mt-1 bg-white border-slate-200 outline-none"
            />
          </div>
          <div class="form-data flex flex-col gap-1 w-[300px]">
            <label for="city">Issued Date</label>
            <a-config-provider
              :theme="{
                token: {
                  colorPrimary: '#FF5C00',
                },
              }"
            >
              <a-date-picker
                v-model:value="localData[index].issued_date"
                class="h-11 mt-1 bg-white border-slate-200 outline-none"
                picker="month"
                :name="`issued_date-${index}`"
              />
            </a-config-provider>
          </div>
        </div>
        <div class="flex items-center gap-x-3 flex-wrap">
          <div class="form-data flex flex-col gap-1 w-[300px]">
            <label for="city">Certification Link</label>
            <InputValidation
              :id="`certification_link-${index}`"
              placeholder="link-to-your-certification.com"
              type="text"
              :name="`certification_link-${index}`"
              class="h-11 mt-1 bg-white border-slate-200 outline-none"
            />
          </div>
          <div class="form-data flex flex-col gap-1 w-[300px]">
            <label for="end">Credential ID</label>
            <InputValidation
              :id="`credential_id-${index}`"
              placeholder="Credential ID"
              type="text"
              :name="`credential_id-${index}`"
              :initial-value="item?.credential_id"
              class="h-11 mt-1 bg-white border-slate-200 outline-none"
            />
          </div>
        </div>
        <div
          v-if="index !== 0"
          class="absolute -top-2 right-0 rounded-lg cursor-pointer p-1 bg-slate-200 flex items-center justify-center"
          @click="deleteCertification(index)"
        >
          <span class="i-solar-trash-bin-trash-broken w-4 h-4 text-red-500"></span>
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
        @click="localData.push({} as any)"
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
