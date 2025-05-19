<script lang="ts" setup>
import Button from '@/components/ui/button/Button.vue'
import { useResumeStore } from '@/stores/resume/resume'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { cloneDeep } from 'lodash-es'
import { useForm } from 'vee-validate'

const resumeStore = useResumeStore()
const { handleSubmit } = useForm()

const isEdit = ref(false)
const localData = ref(cloneDeep(resumeStore.dataResume?.publication))

const openEdit = () => {
  isEdit.value = true
}

// Hủy chỉnh sửa
const cancelEdit = () => {
  isEdit.value = false
  localData.value = resumeStore.dataResume.certification
}

const onSubmit = () => {
  isEdit.value = false
}

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
    <h2 class="font-semibold text-base pb-1 border-b border-slate-950 w-full">PUBLICATIONS</h2>
    <template v-if="!isEdit">
      <div
        v-for="(item, index) in resumeStore.dataResume?.publication"
        :key="index"
        class="flex flex-col gap-0 mt-1 w-full px-3"
      >
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center gap-1">
            <a
              :href="item?.url"
              class="text-base font-semibold hover:text-primary"
              >{{ item?.title }}</a
            >
            <p>
              on <span class="text-base font-semibold">{{ item?.publisher }}</span>
            </p>
          </div>
          <p class="text-base font-semibold">{{ item?.publication_date }}</p>
        </div>
        <p clas="text-xm font-normal">{{ item?.description }}</p>
      </div>
    </template>
  </div>
  <div
    v-if="isEdit"
    class="w-full bg-[#f9f1ee] rounded-lg p-5 mt-5"
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
        <div class="flex items-center gap-x-3 w-1/2">
          <div class="form-data flex flex-col gap-2 w-1/2 flex-1">
            <label for="issuer">Title</label>
            <InputValidation
              id="issuer"
              placeholder="e.g., Artifical intelligence"
              type="text"
              name="issuer"
              class="h-11 mt-1 bg-slate-50 border-slate-200 outline-none"
            />
          </div>
          <div class="form-data flex flex-col gap-1 w-1/2">
            <label for="city">Publication/Publisher</label>
            <InputValidation
              id="city"
              placeholder="e.g., National Library of medicine"
              type="text"
              name="city"
              class="h-11 mt-1 bg-slate-50 border-slate-200 outline-none"
            />
          </div>
        </div>
        <div class="flex items-center gap-x-3 w-1/2">
          <div class="form-data flex flex-col gap-2 w-1/2 flex-1">
            <label for="issuer">Publication URL</label>
            <InputValidation
              id="issuer"
              placeholder="http://cv.maker.come"
              type="text"
              name="issuer"
              class="h-11 mt-1 bg-slate-50 border-slate-200 outline-none"
            />
          </div>
          <div class="form-data flex flex-col gap-1 w-1/2">
            <label for="city">Publication Date</label>
            <InputValidation
              id="city"
              placeholder="VietNam, UK, etc"
              type="text"
              name="city"
              class="h-11 mt-1 bg-slate-50 border-slate-200 outline-none"
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
              placeholder="e.g. This paper presents the first study that attempts to synthesize research on AI in e-commerce"
              content-type="html"
              theme="snow"
            />
          </div>
        </ScrollArea>
        <div
          v-if="index + 1 < localData.length"
          class="border-b border-slate-950 mb-5 w-full mt-5"
        ></div>
        <div
          class="absolute -top-2 right-0 rounded-lg cursor-pointer p-1 bg-slate-200 flex items-center justify-center"
        >
          <span class="i-solar-trash-bin-trash-broken w-4 h-4 text-red-500"></span>
        </div>
      </div>
      <Button
        variant="outline"
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
