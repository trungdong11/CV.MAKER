<script lang="ts" setup>
import BaseItemTemplate from '@/components/base/BaseItemTemplate.vue'
import InputValidation from '@/components/base/InputValidation.vue'
import Button from '@/components/ui/button/Button.vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
interface Props {
  data: Record<string, any>
  isLoading: boolean
}
const prop = withDefaults(defineProps<Props>(), {
  data: () => reactive({}),
  isLoading: false,
})

const content = ref('')

onMounted(() => {
  content.value = prop.data?.description
})

const isEdit = ref(false)
const openEdit = () => {
  isEdit.value = true
}

const onSubmit = () => {}
</script>

<template>
  <BaseItemTemplate
    :name="'education'"
    class="items-start"
    @edit="openEdit"
  >
    <div class="w-full">
      <h2 class="font-semibold text-base pb-1 border-b border-slate-950 w-full">EDUCATION</h2>
      <div
        v-for="(item, index) in prop.data"
        :key="index"
        class="flex flex-col gap-0 mt-1 w-full px-3"
      >
        <div class="flex justify-between w-full items-center">
          <p class="font-bold text-base">{{ item?.degree }}</p>
          <div class="flex items-center gap-3">
            <p class="font-semibold text-base">{{ item?.startDate }}</p>
            <p class="font-semibold text-base">{{ item?.endDate }}</p>
          </div>
        </div>
        <div class="">
          <div class="flex justify-between w-full items-center">
            <h4 class="text-base font-normal">{{ item?.school }}</h4>
            <p class="font-semibold text-base">GPA: {{ item?.GPA }}</p>
          </div>
          <p class="text-sm font-normal">{{ item?.description }}</p>
        </div>
      </div>
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
          v-for="(item, index) in prop.data"
          :key="index"
          class="flex items-start gap-x-4 w-full flex-col justify-center relative"
        >
          <div class="form-data flex flex-col gap-1 w-[300px]">
            <label for="name">Educational Institution Name</label>
            <InputValidation
              id="name"
              placeholder="University of CVMaker"
              type="text"
              name="name"
              class="h-11 mt-1 bg-slate-50 border-slate-200 outline-none"
            />
          </div>
          <div class="flex items-center gap-x-3 flex-wrap">
            <div class="form-data flex flex-col gap-1 w-[300px]">
              <label for="name">Degree</label>
              <InputValidation
                id="name"
                placeholder="Bachelor of IT ..."
                type="text"
                name="name"
                class="h-11 mt-1 bg-slate-50 border-slate-200 outline-none"
              />
            </div>
            <div class="form-data flex flex-col gap-1 w-[150px]">
              <label for="name">GPA</label>
              <InputValidation
                id="name"
                placeholder="3.4 of 4.0"
                type="text"
                name="name"
                class="h-11 mt-1 bg-slate-50 border-slate-200 outline-none"
              />
            </div>
            <div class="form-data flex flex-col gap-1 w-[200px]">
              <label for="name">Start Date</label>
              <InputValidation
                id="name"
                placeholder="Start Date"
                type="text"
                name="name"
                class="h-11 mt-1 bg-slate-50 border-slate-200 outline-none"
              />
            </div>
            <div class="form-data flex flex-col gap-1 w-[200px]">
              <label for="name">Graduation Date</label>
              <InputValidation
                id="name"
                placeholder="Graduation Date"
                type="text"
                name="name"
                class="h-11 mt-1 bg-slate-50 border-slate-200 outline-none"
              />
            </div>
          </div>
          <ScrollArea class="flex flex-col gap-8 w-full mb-12">
            <div class="form-description h-40 w-full bg-white rounded-lg">
              <QuillEditor
                ref="quillEditor"
                v-model:content="content"
                :toolbar="['bold', 'italic', 'underline', 'link']"
                placeholder="Enter your post"
                content-type="html"
                theme="snow"
              />
            </div>
          </ScrollArea>
          <div
            v-if="index + 1 < prop.data.length"
            class="border-b border-slate-950 mb-5"
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
            @click="isEdit = false"
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
  </BaseItemTemplate>
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
