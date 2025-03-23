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
    :name="'award'"
    class="items-start"
    @edit="openEdit"
  >
    <div class="w-full">
      <h2 class="font-semibold text-base pb-1 border-b border-slate-950 w-full">PUBLICATIONS</h2>
      <div
        v-for="(item, index) in prop.data"
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
          <p class="text-base font-semibold">{{ item?.publicationDate }}</p>
        </div>
        <p clas="text-xm font-normal">{{ item?.description }}</p>
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
                v-model:content="content"
                :toolbar="['bold', 'italic', 'underline', 'link']"
                placeholder="e.g. This paper presents the first study that attempts to synthesize research on AI in e-commerce"
                content-type="html"
                theme="snow"
              />
            </div>
          </ScrollArea>
          <div
            v-if="index + 1 < prop.data.length"
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
