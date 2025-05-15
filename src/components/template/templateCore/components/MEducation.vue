<script lang="ts" setup>
import InputValidation from '@/components/base/InputValidation.vue'
import Button from '@/components/ui/button/Button.vue'
import { useResumeStore } from '@/stores/resume/resume'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { useForm } from 'vee-validate'
import { cloneDeep } from 'lodash-es'

const resumeStore = useResumeStore()
const { handleSubmit } = useForm()

const localData = ref(cloneDeep(resumeStore.data.education))

const isEdit = ref(false)
const openEdit = () => {
  isEdit.value = true
}

const cancelEdit = () => {
  isEdit.value = false
  localData.value = resumeStore.data.education
}

const onSubmit = handleSubmit(async (value) => {
  console.log('value', value)
  localData.value[0] = {
    ...localData.value[0],
    ...value,
  }
  // resumeStore.updateEducation(value)
  isEdit.value = false
})
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

    <h2 class="font-semibold text-base pb-1 border-b border-slate-950 w-full">EDUCATION</h2>
    <div
      v-for="(item, index) in localData"
      :key="index"
      class="flex flex-col gap-0 mt-1 w-full px-3"
    >
      <div class="flex justify-between w-full items-center">
        <p class="font-semibold text-base">{{ item?.degree }}</p>
        <div class="flex items-center gap-3">
          <p class="font-semibold text-base">
            {{ new Date(item?.startDate).toLocaleDateString() }}
          </p>
          <p class="font-semibold text-base">
            {{ new Date(item?.endDate).toLocaleDateString() }}
          </p>
        </div>
      </div>
      <div class="">
        <div class="flex justify-between w-full items-center">
          <h4 class="text-base font-normal">{{ item?.school }}</h4>
          <p class="font-semibold text-base">GPA: {{ item?.GPA }}</p>
        </div>
        <p
          class="text-sm font-normal"
          v-html="item.description"
        ></p>
      </div>
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
        v-for="(education, index) in localData"
        :key="index"
        class="flex items-start gap-x-4 w-full flex-col justify-center relative"
      >
        <div class="form-data flex flex-col gap-1 w-[300px]">
          <label for="name">Educational Institution Name</label>
          <InputValidation
            id="school"
            placeholder="University of CVMaker"
            type="text"
            name="school"
            :initial-value="education.school"
            class="h-11 mt-1 bg-white border-slate-200 outline-none"
          />
        </div>
        <div class="flex items-center gap-x-3 flex-wrap">
          <div class="form-data flex flex-col gap-1 w-[300px]">
            <label for="name">Degree</label>
            <InputValidation
              id="degree"
              placeholder="Bachelor of IT ..."
              type="text"
              name="degree"
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
              name="GPA"
              :initial-value="education.GPA.toString()"
              class="h-11 mt-1 bg-white border-slate-200 outline-none"
            />
          </div>
          <div class="form-data flex flex-col gap-1 w-[200px]">
            <label for="name">Start Date</label>
            <InputValidation
              id="startDate"
              placeholder="Start Date"
              type="text"
              name="startDate"
              :initial-value="new Date(education.startDate).toLocaleDateString()"
              class="h-11 mt-1 bg-white border-slate-200 outline-none"
            />
          </div>
          <div class="form-data flex flex-col gap-1 w-[200px]">
            <label for="name">Graduation Date</label>
            <InputValidation
              id="endDate"
              placeholder="Graduation Date"
              type="text"
              name="endDate"
              :initial-value="new Date(education.endDate).toLocaleDateString()"
              class="h-11 mt-1 bg-white border-slate-200 outline-none"
            />
          </div>
        </div>
        <ScrollArea class="flex flex-col gap-8 w-full mb-12">
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
      <!-- <Button
        variant="outline"
        class="w-32 h-11 flex gap-2 items-center border-primary text-primary"
      >
        <span class="i-solar-add-circle-broken w-4 h-4 text-primary"></span>
        <span class="text-primary">Add more</span>
      </Button> -->
      <div class="flex items-center justify-end gap-2">
        <Button
          variant="secondary"
          class="w-32 h-11 flex gap-2 items-center"
          @click="cancelEdit"
        >
          Cancel
        </Button>
        <Button
          class="w-32 h-11 bg-primary flex gap-2 items-center"
          @click="onSubmit"
        >
          <!-- <span
            class="i-svg-spinners-ring-resize"
          ></span> -->
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
