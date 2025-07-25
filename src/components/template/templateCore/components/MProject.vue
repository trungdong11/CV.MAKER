<script lang="ts" setup>
import InputValidation from '@/components/base/InputValidation.vue'
import Button from '@/components/ui/button/Button.vue'
import { useResumeStore } from '@/stores/resume/resume'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { cloneDeep } from 'lodash-es'
import { useForm } from 'vee-validate'
import { formatDateUs, cleanQuillContent } from '@/utils/format'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import MSupportDescription from '../../modal/MSupportDescription.vue'
import * as yup from 'yup'
import { showToast } from '@/utils/toast'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useConfirmDialog } from '@/stores/modal'

const confirmDialog = useConfirmDialog()
const resumeStore = useResumeStore()

const localData = ref(cloneDeep(resumeStore.dataResume?.projects))
const descriptions = ref<string[]>([])
const isPreview = computed(() => resumeStore.getShowPreview)
const isEditProject = computed(() => resumeStore.isEditProject)

const defaultProject = {
  project_name: '',
  project_link: '',
  start_date: null,
  end_date: null,
  description: '',
}

const isShowSupport = ref(false)
const type = ref('')
const indexCurrent = ref()
const isLoading = ref(false)

const schema = computed(() => {
  const shape: Record<string, yup.StringSchema> = {}

  localData.value.forEach((_, index) => {
    shape[`project_name-${index}`] = yup.string().trim().required('Name project is required')
  })

  return yup.object().shape(shape)
})

const handleConfirmDelete = async () => {
  const { isConfirmed } = await confirmDialog.open({
    title: 'Delete Project',
    question: 'Are you sure you want to delete project section?',
    warning: true,
  })

  if (isConfirmed) {
    resumeStore.deleteSection('projects')
  }
}

const { handleSubmit } = useForm({
  validationSchema: schema,
})

const showSupport = (item: string, index: number) => {
  isShowSupport.value = true
  type.value = item
  indexCurrent.value = index
}

const unShowSupport = () => {
  isShowSupport.value = false
}

const handleChangeDiscription = (text: string) => {
  descriptions.value[indexCurrent.value] = text
}

const cancelEdit = () => {
  resumeStore.cancelEditProject()
  localData.value = resumeStore.dataResume?.projects
}

const addProject = () => {
  localData.value.push({ ...defaultProject })
  descriptions.value.push('')
}

const deleteProject = (index: number) => {
  if (localData.value.length > 1) {
    localData.value.splice(index, 1)
  }
}

onBeforeMount(() => {
  localData.value.forEach((item, index) => {
    descriptions.value[index] = item.description
  })
})

const onSubmit = handleSubmit(async (value) => {
  try {
    isLoading.value = true
    localData.value = localData.value.map((item, index) => ({
      ...item,
      project_link: value[`project_link-${index}`],
      project_name: value[`project_name-${index}`],
      description: cleanQuillContent(descriptions.value[index]),
      start_date: item.start_date ? new Date(item.start_date).toISOString() : null,
      end_date: item.end_date ? new Date(item.end_date).toISOString() : null,
    }))

    resumeStore.updateProjects(localData.value)
    resumeStore.cancelEditProject()
    showToast({
      description: 'Update project success',
      variant: 'success',
    })
  } catch (error) {
    showToast({
      description: 'Update project failed',
      variant: 'destructive',
    })
  }
  isLoading.value = false
})

watch(
  () => resumeStore.dataResume,
  (newVal) => {
    if (newVal) {
      localData.value = cloneDeep(newVal.projects)
    }
  },
  { immediate: true, deep: true },
)
</script>

<template>
  <div
    id="project-info"
    class="relative group rounded-lg p-5 py-2 w-full"
    :class="[isEditProject ? 'bg-gray-50' : 'bg-white', !isPreview ? 'hover:bg-gray-50' : '']"
  >
    <!-- Edit button -->
    <div
      v-if="!isEditProject && !isPreview"
      class="absolute hidden group-hover:flex -top-2 p-1 gap-1 right-10 cursor-pointer border rounded-md items-center justify-center bg-white shadow-sm hover:shadow-md transition-all duration-200"
    >
      <div
        class="size-6 flex justify-center items-center hover:bg-slate-50 rounded-md"
        @click="resumeStore.editProject"
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
    <h2 class="font-semibold text-base pb-1 border-b border-slate-950 w-full">PROJECTS</h2>
    <template v-if="!isEditProject">
      <div
        v-for="(item, index) in resumeStore.dataResume?.projects"
        :key="index"
        class="flex flex-col gap-0 mt-1 w-full px-3"
      >
        <div class="flex justify-between w-full items-center">
          <a
            :href="item?.project_link"
            class="font-medium text-base"
            >{{ item?.project_name }}</a
          >
          <div class="flex items-center">
            <p class="font-medium text-base">
              {{ formatDateUs(item?.start_date) }}
            </p>
            <span class="mx-1">-</span>
            <p class="font-medium text-base">
              {{ item.end_date ? formatDateUs(item?.end_date) : 'Present' }}
            </p>
          </div>
        </div>
        <div
          class="text-sm font-normal"
          v-html="item?.description"
        ></div>
      </div>
    </template>
  </div>
  <div
    v-if="isEditProject"
    class="w-full bg-gray-50 p-5"
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
          <label for="name">Project Name <span class="text-red-600 text-e">*</span></label>
          <InputValidation
            :id="`project_name-${index}`"
            placeholder="e.g., Youtube, Ecomdy, etc"
            type="text"
            :name="`project_name-${index}`"
            :initial-value="item.project_name"
            class="h-11 mt-1 bg-white border-slate-200 outline-none"
          />
        </div>
        <div class="flex items-start gap-x-3 flex-wrap">
          <div class="form-data flex flex-col gap-1 w-[300px]">
            <label for="position">Project Link</label>
            <InputValidation
              :id="`project_link-${index}`"
              placeholder="e.g., Frontend, Backend, etc"
              type="text"
              :name="`project_link-${index}`"
              :initial-value="item.project_link"
              class="h-11 mt-1 bg-white border-slate-200 outline-none"
            />
          </div>
          <div class="form-data flex flex-col gap-1 w-[200px]">
            <label for="city">Start Date</label>
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
                :name="`startDate-${index}`"
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
                :name="`endDate-${index}`"
              />
            </a-config-provider>
          </div>
        </div>
        <div class="flex flex-col gap-1 w-full mb-12">
          <label for="end">Descriptions</label>
          <div class="form-description h-40 w-full bg-white rounded-lg relative">
            <QuillEditor
              ref="quillEditor"
              v-model:content="descriptions[index]"
              :toolbar="['bold', 'italic', 'underline', 'link']"
              placeholder="Enter your post"
              content-type="html"
              theme="snow"
            />
            <div class="absolute top-2 left-40">
              <HoverCard>
                <HoverCardTrigger>
                  <Button
                    id="tour-item"
                    class="ai-glow flex items-center gap-2 px-4 h-9 gradient-from-primary text-white font-medium rounded-full shadow-lg hover:bg-indigo-300 transition"
                  >
                    ✨ <span class="text-white">Generate Description</span>
                    <span
                      v-if="isLoading"
                      class="i-svg-spinners-90-ring-with-bg text-xl"
                    ></span>
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent class="w-80">
                  <div
                    class="flex flex-col gap-1 rounded-lg p-2 cursor-pointer w-full hover:bg-gray-100"
                    @click="showSupport('grammar', index)"
                  >
                    <div class="font-medium text-[14px]">Fix spelling & grammar</div>
                    <div class="text-xs m-0">
                      Ensure your resume is polished and professional with perfect spelling &
                      grammar
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>
        </div>
        <div
          v-if="index !== 0"
          @click.stop.prevent="deleteProject(index)"
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
        @click="addProject()"
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

    <MSupportDescription
      v-if="isShowSupport"
      :text="descriptions[indexCurrent]"
      :type="type"
      @close="unShowSupport"
      @handle-change-description="handleChangeDiscription"
    />
  </div>
</template>
<style lang="scss" scoped>
.ai-shine {
  background: linear-gradient(270deg, #6366f1, #8b5cf6, #6366f1);
  background-size: 400% 400%;
  animation: shine 5s ease infinite;
}

@keyframes shine {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes aiPulse {
  0% {
    box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(99, 102, 241, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(99, 102, 241, 0);
  }
}

.ai-glow {
  animation: aiPulse 2s infinite;
}

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
      padding-top: 12px;
      padding-bottom: 12px;
    }
  }
}
</style>
