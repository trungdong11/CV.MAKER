<script lang="ts" setup>
import InputValidation from '@/components/base/InputValidation.vue'
import Button from '@/components/ui/button/Button.vue'
import TextareaValidation from '@/components/base/TextareaValidation.vue'
import { useResumeStore } from '@/stores/resume/resume'
import { useForm, type GenericObject } from 'vee-validate'
import { cloneDeep } from 'lodash-es'

const resumeStore = useResumeStore()
const localData = ref(cloneDeep(resumeStore.data.skills))
const { handleSubmit } = useForm()

const isEdit = ref(false)
const isLoading = ref(false)

const openEdit = () => {
  isEdit.value = true
}

defineExpose({
  openEdit,
})

const cancelEdit = () => {
  isEdit.value = false
  localData.value = resumeStore.data.skills
}

const addMore = () => {
  localData.value.push({
    skillCategory: '',
    listOfSkill: '',
  })
}

const deleteSkill = (index: number) => {
  localData.value.splice(index, 1)
}

const handleUpdateSkills = (value: GenericObject) => {
  localData.value = localData.value
    .map((item, index) => {
      const skillCategory = value[`skillCategory-${index}`]
      const listOfSkill = value[`listOfSkill-${index}`]
      return {
        skillCategory: skillCategory,
        listOfSkill: listOfSkill,
      }
    })
    .filter((item) => {
      return item.skillCategory !== '' && item.listOfSkill !== ''
    })

  return localData.value
}

const onSubmit = handleSubmit(async (value) => {
  try {
    isLoading.value = true
    const newSkills = handleUpdateSkills(value)
    resumeStore.updateSkills(newSkills)
    console.log(localData.value, 'check localData', newSkills)

    isEdit.value = false
  } catch (error) {
    console.error('Error updating skills:', error)
  } finally {
    isLoading.value = false
  }
})

const data = computed(() => {
  if (isEdit.value) {
    return localData.value
  }
  return resumeStore.data.skills
})
</script>

<template>
  <div
    :class="isEdit ? 'bg-gray-50' : 'bg-white'"
    class="relative items-center group flex flex-col justify-start gap-3 w-full hover:bg-gray-50 rounded-lg p-5 py-2"
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

    <h2 class="font-bold text-base pb-2 border-b border-slate-950 w-full mb-1">SKILLS</h2>
    <div class="flex flex-col w-full">
      <div
        v-for="(item, index) in data"
        :key="index"
        class="flex items-center justify-start w-full gap-2 px-3"
      >
        <p
          v-if="item.skillCategory"
          class="font-semibold text-base"
        >
          {{ item.skillCategory }}:
        </p>
        <p
          v-if="item.listOfSkill"
          class="font-normal text-sm"
        >
          {{ item.listOfSkill }}
        </p>
      </div>
    </div>

    <div
      v-if="isEdit"
      class="w-full rounded-lg p-5"
    >
      <form
        class="flex gap-2 w-full flex-col"
        @submit.prevent
      >
        <div class="flex items-center w-full flex-col justify-center">
          <div
            v-for="(item, index) in localData"
            :key="index"
            class="w-full relative border-b border-slate-950 mb-5"
          >
            <div class="flex items-center justify-between w-full">
              <div class="form-data flex flex-col gap-1 w-full">
                <label for="name">Skill Category</label>
              </div>
              <div
                class="rounded-lg mb-2 cursor-pointer p-2 border bg-white flex items-center justify-center"
                @click="deleteSkill(index)"
              >
                <span class="i-solar-trash-bin-trash-broken w-4 h-4 text-red-500"></span>
              </div>
            </div>
            <InputValidation
              :id="`skillCategory-${index}`"
              :initial-value="localData[index].skillCategory"
              placeholder="Enter your skill..."
              type="text"
              :name="`skillCategory-${index}`"
              class="h-11 bg-white border-slate-200 outline-none"
            />
            <div class="form-data flex flex-col gap-1 w-full">
              <label for="listOfSkill">List of skills</label>
              <TextareaValidation
                :id="`listOfSkill-${index}`"
                :initial-value="localData[index].listOfSkill"
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
          class="w-32 h-11 flex gap-2 items-center border-primary text-primary"
          @click="addMore"
        >
          <span class="i-solar-add-circle-broken w-4 h-4 text-primary"></span>
          <span class="text-primary">Add more</span>
        </Button>
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
