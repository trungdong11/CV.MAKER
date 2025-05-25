<script lang="ts" setup>
import InputValidation from '@/components/base/InputValidation.vue'
import Button from '@/components/ui/button/Button.vue'
import TextareaValidation from '@/components/base/TextareaValidation.vue'
import { useResumeStore } from '@/stores/resume/resume'
import { useForm, type GenericObject } from 'vee-validate'
import { cloneDeep } from 'lodash-es'
import * as yup from 'yup'
import { showToast } from '@/utils/toast'

const resumeStore = useResumeStore()
const localData = ref(cloneDeep(resumeStore.dataResume?.skills))
const isPreview = computed(() => resumeStore.getShowPreview)
const isEditSkill = computed(() => resumeStore.isEditSkill)

const isLoading = ref(false)

const cancelEdit = () => {
  resumeStore.cancelEditSkill()
  localData.value = resumeStore.dataResume.skills
}

const addMore = () => {
  localData.value.push({
    skill_category: '',
    list_of_skill: '',
  })
}

const deleteSkill = (index: number) => {
  localData.value.splice(index, 1)
}

const clean = (v?: unknown) => (typeof v === 'string' ? v.trim() : '')

const handleUpdateSkills = (values: GenericObject) => {
  localData.value = localData.value
    .map((_, idx) => ({
      skill_category: clean(values[`skillCategory-${idx}`]),
      list_of_skill: clean(values[`listOfSkill-${idx}`]),
    }))
    .filter((item) => item.skill_category && item.list_of_skill)

  return localData.value
}

const schema = computed(() => {
  const shape: Record<string, yup.StringSchema> = {}

  localData.value.forEach((_, index) => {
    shape[`skillCategory-${index}`] = yup.string().trim().required('Skill category is required')
    shape[`listOfSkill-${index}`] = yup.string().trim().required('List of skills is required')
  })

  return yup.object().shape(shape)
})

const { handleSubmit } = useForm({
  validationSchema: schema,
})

const onSubmit = handleSubmit(async (value) => {
  try {
    isLoading.value = true
    const newSkills = handleUpdateSkills(value)
    resumeStore.updateSkills(newSkills)

    resumeStore.cancelEditSkill()
    showToast({
      description: 'Update skills success',
      variant: 'success',
    })
  } catch (error) {
    showToast({
      description: 'Update skills failed',
      variant: 'destructive',
    })
  } finally {
    isLoading.value = false
  }
})

const data = computed(() => {
  if (isEditSkill.value) {
    return localData.value
  }
  return resumeStore.dataResume.skills
})

watch(
  () => resumeStore.dataResume,
  (newVal) => {
    if (newVal) {
      localData.value = cloneDeep(newVal.skills)
    }
  },
  { immediate: true, deep: true },
)
</script>

<template>
  <div
    :class="isEditSkill ? 'bg-gray-50' : 'bg-white'"
    class="relative items-center group flex flex-col justify-start gap-1 w-full hover:bg-gray-50 rounded-lg p-5 py-2"
  >
    <!-- Edit button -->
    <div
      v-if="!isEditSkill && !isPreview"
      class="absolute hidden group-hover:flex -top-2 p-1 gap-1 right-10 cursor-pointer border rounded-md items-center justify-center bg-white shadow-sm hover:shadow-md transition-all duration-200"
    >
      <div
        class="size-6 flex justify-center items-center hover:bg-slate-50 rounded-md"
        @click="resumeStore.editSkill"
      >
        <span class="i-solar-pen-bold text-primary"></span>
      </div>
      <div
        class="size-6 flex justify-center items-center hover:bg-slate-50 rounded-md"
        @click="resumeStore.deleteSection('skills')"
      >
        <span class="i-solar-trash-bin-minimalistic-2-bold text-primary"></span>
      </div>
    </div>
    <!-- End edit button -->

    <h2 class="font-bold text-base pb-2 border-b border-slate-950 w-full mb-1">SKILLS</h2>
    <template v-if="!isEditSkill">
      <div class="flex flex-col w-full">
        <div
          v-for="(item, index) in data"
          :key="index"
          class="flex items-center justify-start w-full gap-2 px-3"
        >
          <p
            v-if="item.skill_category"
            class="font-semibold text-base"
          >
            {{ item.skill_category }}:
          </p>
          <p
            v-if="item.list_of_skill"
            class="font-normal text-sm"
          >
            {{ item.list_of_skill }}
          </p>
        </div>
      </div>
    </template>

    <div
      v-if="isEditSkill"
      class="w-full rounded-lg p-5"
    >
      <form
        class="flex w-full flex-col"
        @submit.prevent
      >
        <div class="flex items-center w-full flex-col justify-center">
          <div
            v-for="(item, index) in localData"
            :key="index"
            class="w-full relative mb-5 flex flex-col gap-1"
            :class="{ 'border-b': index + 1 < localData.length }"
          >
            <div class="flex items-end justify-between w-full">
              <div class="form-data flex flex-col gap-1 w-full">
                <label for="name">Skill Category <span class="text-red-600 text-e">*</span></label>
              </div>
              <div
                v-if="index !== 0"
                class="rounded-lg cursor-pointer p-2 border bg-white flex items-center justify-center"
                @click="deleteSkill(index)"
              >
                <span class="i-solar-trash-bin-trash-broken w-4 h-4 text-red-500"></span>
              </div>
            </div>
            <InputValidation
              :id="`skillCategory-${index}`"
              :initial-value="localData[index].skill_category"
              placeholder="Enter your skill..."
              type="text"
              :name="`skillCategory-${index}`"
              class="h-11 bg-white border-slate-200 outline-none"
            />
            <div class="form-data flex flex-col gap-1 w-full">
              <label for="listOfSkill"
                >List of skills <span class="text-red-600 text-e">*</span></label
              >
              <TextareaValidation
                :id="`listOfSkill-${index}`"
                :initial-value="localData[index].list_of_skill"
                type="text"
                :name="`listOfSkill-${index}`"
                placeholder="Enter list of skill..."
                class="h-18 mt-1 bg-white border-slate-200 outline-none"
              />
            </div>
          </div>
        </div>
        <Button
          variant="outline"
          class="w-32 h-10 flex gap-2 -mb-2 items-center border-primary text-primary"
          @click="addMore"
        >
          <span class="i-solar-add-circle-broken w-4 h-4 text-primary"></span>
          <span class="text-primary">Add more</span>
        </Button>
        <div class="flex items-center justify-end gap-2">
          <Button
            variant="secondary"
            class="w-28 h-10 flex gap-2 items-center text-primary"
            @click="cancelEdit"
          >
            Cancel
          </Button>
          <Button
            :disabled="isLoading"
            class="w-28 h-10 bg-primary flex gap-2 items-center"
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
  </div>
</template>
