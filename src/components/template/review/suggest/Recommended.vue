<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { useResumeStore } from '@/stores/resume/resume'
import { countWords, checkActionWork, containsNumber } from '@/utils/format'

const resumeStore = useResumeStore()
const { dataResume } = toRefs(resumeStore)

interface ImportantSectionState {
  isValueHasLinkin: boolean
  isValueHasGithub: boolean
  isValueDesEducation: boolean
  isContainNumberProject: boolean
  isActionProject: boolean
  isCheckNumSkill: boolean
  isValueExperience: boolean
  countImportant: number
}

const initialValueState: ImportantSectionState = {
  isValueHasLinkin: false,
  isValueHasGithub: false,
  isValueDesEducation: false,
  isActionProject: false,
  isContainNumberProject: false,
  isValueExperience: false,
  isCheckNumSkill: false,
  countImportant: 0,
}

const valueState = reactive({ ...initialValueState })

const handleCheckPersonal = () => {
  if (dataResume.value.socials) {
    dataResume.value?.socials.forEach((item) => {
      if (item.icon == 'linkedin') {
        if (item.link == '') {
          valueState.isValueHasLinkin = true
          valueState.countImportant++
        }
      }
      if (item.icon == 'github') {
        if (item.link == '') {
          valueState.isValueHasGithub = true
          valueState.countImportant++
        }
      }
    })
  }
}

const handleCheckEducation = () => {
  if (dataResume.value.education) {
    dataResume.value?.education.forEach((item) => {
      const description = item.description?.trim() || ''

      if (!description || countWords(description) === 0) {
        valueState.countImportant++
        valueState.isValueDesEducation = true
      }
    })
  }
}

const handleCheckProject = () => {
  if (dataResume.value.projects) {
    dataResume.value?.projects.forEach((item) => {
      const description = item.description?.trim() || ''

      if (!description || !checkActionWork(description)) {
        valueState.countImportant++
        valueState.isActionProject = true
      }
      if (!description || !containsNumber(description)) {
        valueState.countImportant++
        valueState.isContainNumberProject = true
      }
    })
  }
}

const handleImportantEvaluate = () => {
  handleCheckPersonal()
  handleCheckEducation()
  handleCheckProject()
  if (dataResume.value?.works?.length === 1) {
    valueState.isValueExperience = true
    valueState.countImportant++
  }
  if (dataResume.value?.skills?.length < 4) {
    valueState.isCheckNumSkill = true
    valueState.countImportant++
  }
}

type EditSection = 'Personal' | 'Education' | 'Project' | 'Work' | 'Skill'

const handleEdit = (section: EditSection) => {
  const editMethod = `edit${section}` as keyof typeof resumeStore
  ;(resumeStore[editMethod] as unknown as () => void)()
  const element = document.getElementById(`${section.toLowerCase()}-info`)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

onBeforeMount(() => {
  Object.assign(valueState, initialValueState)
  handleImportantEvaluate()
})

watch(dataResume.value, (newVal) => {
  if (newVal) {
    Object.assign(valueState, initialValueState)
    handleImportantEvaluate()
  }
})
</script>

<template>
  <div class="">
    <Accordion
      type="single"
      collapsible
      class="px-3 rounded-lg border border-slate-300 bg-[##f9fafb ]"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger class="hover:no-underline">
          <div class="flex items-start gap-2">
            <span class="i-solar-lightbulb-bolt-linear text-[20px] text-primary"></span>
            <div class="flex flex-col gap-1 items-start hover: no-underline">
              <div class="flex items-center gap-2">
                <h2 class="text-[16px] font-semibold">Recommended</h2>
                <div
                  v-if="valueState.countImportant > 0"
                  class="flex items-center justify-center text-xs rounded-xl bg-slate-300 w-5 h-5 text-primary font-semibold"
                >
                  {{ valueState.countImportant }}
                </div>
                <div
                  v-else
                  class="rounded-lg bg-[#DDF7E9] text-[#0e6d39] px-2 py-1 text-xs font-normal"
                >
                  All good!
                </div>
              </div>
              <p class="text-xs text-slate-500 text-left">
                Items that we suggest to be in your resume
              </p>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent class="flex flex-col gap-2">
          <div
            v-if="valueState.isValueHasLinkin"
            class="flex flex-col gap-2 border rounded-lg p-3 bg-white"
          >
            <div class="text-xs font-normal">
              <span class="font-semibold">LinkedIn in General Info</span>
              <span> is still empty</span>
            </div>
            <div
              class="flex items-center gap-1 cursor-pointer text-primary text-[13px] font-semibold"
              @click="handleEdit('Personal')"
            >
              <span class="i-material-symbols-light-add text-primary text-[20px]"></span>
              Add Now
            </div>
          </div>
          <div
            v-if="valueState.isValueHasGithub"
            class="flex flex-col gap-2 border rounded-lg p-3 bg-white"
          >
            <div class="text-xs font-normal">
              <span class="font-semibold">Github in General Info</span>
              <span> is still empty</span>
            </div>
            <div
              class="flex items-center gap-1 cursor-pointer text-primary text-[13px] font-semibold"
              @click="handleEdit('Personal')"
            >
              <span class="i-material-symbols-light-add text-primary text-[20px]"></span>
              Add Now
            </div>
          </div>
          <div
            v-if="valueState.isValueExperience"
            class="flex flex-col gap-2 border rounded-lg p-3 bg-white"
          >
            <div class="text-xs font-normal">
              <span class="font-semibold">Only 1 experience(s) added.</span>
              <span> Add at least 1 more to improve competitiveness.</span>
            </div>
            <div
              class="flex items-center gap-1 cursor-pointer text-primary text-[13px] font-semibold"
              @click="handleEdit('Work')"
            >
              <span class="i-material-symbols-light-add text-primary text-[20px]"></span>
              Add Now
            </div>
          </div>
          <div
            v-if="valueState.isValueDesEducation"
            class="flex flex-col gap-3"
          >
            <div
              v-for="(item, index) in dataResume.education"
              :key="index"
            >
              <div
                v-if="countWords(item.description) === 0 || !item.description"
                class="flex flex-col gap-2 border rounded-lg p-3 bg-white"
              >
                <div class="text-xs font-normal">
                  <span class="font-semibold"
                    >Education description in {{ item?.school }} is still empty.</span
                  >
                  <span> Add them to showcase your achievements in school.</span>
                </div>
                <div
                  class="flex items-center gap-1 cursor-pointer text-primary text-[13px] font-semibold"
                  @click="handleEdit('Education')"
                >
                  <span class="i-material-symbols-light-add text-primary text-[20px]"></span>
                  Add Now
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="valueState.isActionProject"
            class="flex flex-col gap-3"
          >
            <div
              v-for="(item, index) in dataResume.projects"
              :key="index"
            >
              <div
                v-if="!checkActionWork(item.description)"
                class="flex flex-col gap-2 border rounded-lg p-3 bg-white"
              >
                <div class="text-xs font-normal">
                  <span class="font-semibold"
                    >Action projects is missing in {{ item.project_name }} Project.</span
                  >
                  <span> Add them to showcase the actions YOU performed.</span>
                </div>
                <div
                  class="flex items-center gap-1 cursor-pointer text-primary text-[13px] font-semibold"
                  @click="handleEdit('Project')"
                >
                  <span class="i-material-symbols-light-add text-primary text-[20px]"></span>
                  Add Now
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="valueState.isContainNumberProject"
            class="flex flex-col gap-3"
          >
            <div
              v-for="(item, index) in dataResume.projects"
              :key="index"
            >
              <div
                v-if="!containsNumber(item.description)"
                class="flex flex-col gap-2 border rounded-lg p-3 bg-white"
              >
                <div class="text-xs font-normal">
                  <span class="font-semibold"
                    >Outcome is missing in {{ item.project_name }} Project.</span
                  >
                  <span> Add measurable outcomes.</span>
                </div>
                <div
                  class="flex items-center gap-1 cursor-pointer text-primary text-[13px] font-semibold"
                  @click="handleEdit('Project')"
                >
                  <span class="i-material-symbols-light-add text-primary text-[20px]"></span>
                  Add Now
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="valueState.isCheckNumSkill"
            class="flex flex-col gap-2 border rounded-lg p-3 bg-white"
          >
            <div class="text-xs font-normal">
              <span class="font-semibold">Too little skills found</span>
              <span>
                List {{ 4 - dataResume?.skills.length }} more to improve your competitiveness</span
              >
            </div>
            <div
              class="flex items-center gap-1 cursor-pointer text-primary text-[13px] font-semibold"
              @click="handleEdit('Skill')"
            >
              <span class="i-material-symbols-light-add text-primary text-[20px]"></span>
              Add Now
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
</template>

<style lang="scss" scoped></style>
