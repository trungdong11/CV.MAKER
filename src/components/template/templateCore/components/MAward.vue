<script lang="ts" setup>
import InputValidation from '@/components/base/InputValidation.vue'
import Button from '@/components/ui/button/Button.vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { useResumeStore } from '@/stores/resume/resume'
import { useForm } from 'vee-validate'
import { cloneDeep } from 'lodash-es'
import { formatDateUs } from '@/utils/format'

const resumeStore = useResumeStore()
const { handleSubmit } = useForm()

const localData = ref(cloneDeep(resumeStore.dataResume?.award))

const openEdit = () => {
  isEdit.value = true
}

const cancelEdit = () => {
  isEdit.value = false
  localData.value = resumeStore.dataResume.award
}

const deleteAward = (index: number) => {
  if (localData.value.length > 1) {
    localData.value.splice(index, 1)
  }
}

const isEdit = ref(false)
const descriptions = ref<string[]>([])

const onSubmit = handleSubmit(async (value) => {
  localData.value = localData.value.map((item, index) => ({
    ...item,
    award_title: value[`title-${index}`],
    issuer: value[`issuer-${index}`],
    description: descriptions.value[index],
    issued_date: item.issued_date ? new Date(item.issued_date).toISOString() : null,
  }))

  console.log(localData.value, 'check data before')

  resumeStore.updateAwards(localData.value)

  isEdit.value = false
})

const isLoading = ref(false)

onBeforeMount(() => {
  if (!localData.value) {
    localData.value = []
  }

  if (localData.value.length === 0) {
    localData.value.push({
      award_title: 'Best Paper Award',
      award_title_link: 'https://example.com/award',
      issued_by: '',
      issued_date: '2023-01-01T00:00:00.000Z',
      description: 'Awarded for outstanding research in computer science.',
    })

    resumeStore.updateAwards(localData.value)
  }

  localData.value.forEach((item, index) => {
    descriptions.value[index] = item.description
  })
})

watch(
  () => resumeStore.dataResume,
  (newVal) => {
    if (newVal) {
      localData.value = cloneDeep(newVal.award)
    }
  },
  { immediate: true, deep: true },
)
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
    <h2 class="font-semibold text-base pb-1 border-b border-slate-950 w-full">AWARDS</h2>
    <template v-if="!isEdit">
      <div
        v-for="(item, index) in resumeStore.dataResume?.award"
        :key="index"
        class="flex flex-col gap-0 mt-1 w-full px-3"
      >
        <div class="flex justify-between w-full items-center">
          <a
            :href="item?.award_title_link"
            class="cursor-pointer"
          >
            <span class="font-semibold text-base">{{ item?.award_title }}</span>
          </a>
          <p class="font-semibold text-base">{{ formatDateUs(item?.issued_date) }}</p>
        </div>
        <p class="font-normal text-base">{{ item?.issuer }}</p>
        <p
          class="text-sm font-normal mt-1"
          v-html="item?.description"
        ></p>
      </div>
    </template>
    <div
      v-if="isEdit"
      class="w-full bg-gray-50 rounded-lg p-5"
    >
      <form
        class="flex gap-2 w-full flex-col"
        @submit.prevent="onSubmit"
      >
        <div
          v-for="(item, index) in localData"
          :key="index"
          class="flex items-start gap-x-4 w-full flex-col justify-center relative"
        >
          <div class="form-data flex flex-col gap-1 w-1/2">
            <label for="title">Title</label>
            <InputValidation
              :id="`title-${index}`"
              placeholder="e.g., Best Technical Paper Award, Bug Bounty Recognition etc."
              type="text"
              :name="`title-${index}`"
              :initial-value="item.award_title"
              class="h-11 mt-1 bg-white border-slate-200 outline-none"
            />
          </div>
          <div class="flex gap-x-3 w-1/2">
            <div class="form-data flex flex-col gap-2 max-w-full flex-1">
              <label for="issuer">Issuer</label>
              <InputValidation
                :id="`issuer-${index}`"
                placeholder="e.g., National University of VietNam"
                type="text"
                :name="`issuer-${index}`"
                :initial-value="item.issuer"
                class="h-11 mt-1 bg-white border-slate-200 outline-none"
              />
            </div>
            <div class="form-data flex flex-col gap-1 w-[150px]">
              <label for="issuedDate">Issued Date</label>
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
                  :name="`endDate-${index}`"
                />
              </a-config-provider>
            </div>
          </div>
          <div class="flex flex-col gap-1 w-full mb-12">
            <label for="description">Descriptions</label>
            <div class="form-description h-40 w-full bg-white rounded-lg">
              <QuillEditor
                v-model:content="descriptions[index]"
                :toolbar="['bold', 'italic', 'underline', 'link']"
                placeholder="e.g. Awarded for writing and presenting an outstanding technical paper at a conference"
                content-type="html"
                theme="snow"
              />
            </div>
          </div>
          <div
            class="border-b border-slate-950 mb-5 w-full mt-5"
            @click.stop.prevent="deleteAward(index)"
          >
            <div
              class="absolute -top-2 right-0 rounded-lg cursor-pointer p-1 bg-slate-200 flex items-center justify-center"
            >
              <span class="i-solar-trash-bin-trash-broken w-4 h-4 text-red-500"></span>
            </div>
          </div>
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
            class="w-32 h-11 flex gap-2 items-center"
            @click="cancelEdit"
          >
            Cancel
          </Button>
          <Button
            :disabled="isLoading"
            class="w-32 h-11 bg-primary flex gap-2 items-center"
            type="submit"
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
