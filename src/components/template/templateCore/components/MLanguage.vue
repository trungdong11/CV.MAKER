<script lang="ts" setup>
import InputValidation from '@/components/base/InputValidation.vue'
import Button from '@/components/ui/button/Button.vue'
import TextareaValidation from '@/components/base/TextareaValidation.vue'
import { cloneDeep } from 'lodash-es'
import { useForm } from 'vee-validate'
import { useResumeStore } from '@/stores/resume/resume'
import * as yup from 'yup'
import { showToast } from '@/utils/toast'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useConfirmDialog } from '@/stores/modal'

const confirmDialog = useConfirmDialog()
const resumeStore = useResumeStore()

const localData = ref(cloneDeep(resumeStore.dataResume?.languages))
const isPreview = computed(() => resumeStore.getShowPreview)
const isEditLanguage = computed(() => resumeStore.isEditLanguage)
const isLoading = ref(false)

const cancelEdit = () => {
  resumeStore.cancelEditLanguage()
  localData.value = resumeStore.dataResume.languages
}

const schema = computed(() => {
  const shape: Record<string, yup.StringSchema> = {}

  localData.value.forEach((_, index) => {
    shape[`language_name-${index}`] = yup.string().trim().required('Language name is required')
  })

  return yup.object().shape(shape)
})

const { handleSubmit } = useForm({
  validationSchema: schema,
})

const handleConfirmDelete = async () => {
  const { isConfirmed } = await confirmDialog.open({
    title: 'Delete Language',
    question: 'Are you sure you want to delete language section?',
    warning: true,
  })

  if (isConfirmed) {
    resumeStore.deleteSection('languages')
  }
}

const onSubmit = handleSubmit(async (value) => {
  try {
    isLoading.value = true
    localData.value = localData.value.map((item, index) => ({
      language: value[`language_name-${index}`],
      proficiency: value[`proficiency-${index}`],
    }))

    resumeStore.updateLanguages(localData.value)
    resumeStore.cancelEditLanguage()

    showToast({
      description: 'Update language success',
      variant: 'success',
    })
  } catch (error) {
    showToast({
      description: 'Update language failed',
      variant: 'destructive',
    })
  }
  isLoading.value = false
})
</script>

<template>
  <div
    id="language-info"
    class="relative group rounded-lg p-5 py-2 w-full"
    :class="[
      isEditLanguage ? 'bg-gray-50' : 'bg-white',
      !isPreview ? 'hover:bg-gray-50' : ''
    ]"
  >
    <!-- Edit button -->
    <div
      v-if="!isEditLanguage && !isPreview"
      class="absolute hidden group-hover:flex -top-2 p-1 gap-1 right-10 cursor-pointer border rounded-md items-center justify-center bg-white shadow-sm hover:shadow-md transition-all duration-200"
    >
      <div
        class="size-6 flex justify-center items-center hover:bg-slate-50 rounded-md"
        @click="resumeStore.editLanguage"
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
    <h2 class="font-semibold text-base pb-1 border-b border-slate-950 w-full">LANGUAGES</h2>
    <div
      v-if="!isEditLanguage"
      class="px-3 flex gap-2 items-center mt-1"
    >
      <div
        v-for="(item, index) in resumeStore.dataResume?.languages"
        :key="index"
        class="flex gap-1 items-center"
      >
        <span class="text-base font-semibold">{{ item?.language }}</span>
        ( <span class="font-normal text-sm">{{ item?.proficiency }}</span> )
        <div
          v-if="index + 1 < resumeStore.dataResume?.languages.length"
          class="font-semibold text-lg -mt-2 flex justify-center items-center text-white0"
        >
          .
        </div>
      </div>
    </div>
  </div>
  <div
    v-if="isEditLanguage"
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
        <div class="form-data flex flex-col gap-1 w-1/2">
          <label for="language">Language <span class="text-red-600 text-e">*</span></label>
          <InputValidation
            :id="`language-${index}`"
            placeholder="e.g., English, Vietnamese etc."
            type="text"
            :name="`language_name-${index}`"
            :initial-value="item.language"
            class="h-11 mt-1 bg-white border-slate-200 outline-none"
          />
        </div>
        <div class="form-data flex flex-col gap-1 w-full">
          <label for="Proficiency">Proficiency</label>
          <TextareaValidation
            :id="`proficiency-${index}`"
            v-model="item.proficiency"
            type="text"
            :name="`proficiency-${index}`"
            :initial-value="item.proficiency"
            placeholder="Fluent, basic communication, etc"
            class="h-18 mt-1 bg-white border-slate-200 outline-none"
          />
        </div>
        <div
          class="mb-5 w-full mt-5"
          :class="{ 'border-b': index + 1 < localData.length }"
        ></div>
        <div
          v-if="index !== 0"
          class="absolute -top-2 right-0 rounded-lg cursor-pointer p-1 bg-slate-200 flex items-center justify-center"
          @click="localData.splice(index, 1)"
        >
          <span class="i-solar-trash-bin-trash-broken w-4 h-4 text-red-500"></span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        class="w-32 h-11 flex gap-2 items-center border-primary text-primary"
        @click="localData.push({ language: '', proficiency: '' })"
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
