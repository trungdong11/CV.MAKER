<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { useResumeStore } from '@/stores/resume/resume'
import { checkActionWork, containsNumber } from '@/utils/format'

const resumeStore = useResumeStore()
const { dataResume } = toRefs(resumeStore)

interface ImportantSectionState {
  // isValueDescription: boolean
  isValueSkill: boolean
  isValueEducation: boolean
  isValueExperience: boolean
  isActionWork: boolean
  isContainNumber: boolean
  countImportant: number
}

const initialValueState: ImportantSectionState = {
  // isValueDescription: false,
  isValueSkill: false,
  isValueEducation: false,
  isValueExperience: false,
  isActionWork: false,
  isContainNumber: false,
  countImportant: 0,
}

const valueState = reactive({ ...initialValueState })

const handleImportantEvaluate = () => {
  // if (dataResume.value.summary === '') {
  //   valueState.isValueDescription = true
  //   valueState.countImportant++
  // }
  if (dataResume.value?.skills?.length === 0) {
    valueState.isValueSkill = true
    valueState.countImportant++
  }
  if (dataResume.value?.education?.length === 0) {
    valueState.isValueEducation = true
    valueState.countImportant++
  }
  if (dataResume.value?.works?.length === 0) {
    valueState.isValueExperience = true
    valueState.countImportant++
  }
  if (dataResume.value.works) {
    dataResume.value?.works?.forEach((item) => {
      const description = item.description?.trim() || ''

      if (!description || !checkActionWork(description)) {
        valueState.countImportant++
        valueState.isActionWork = true
      }
      if (!description || !containsNumber(description)) {
        valueState.countImportant++
        valueState.isContainNumber = true
      }
    })
  }
}

type EditSection = 'Work' | 'Skill' | 'Education'

const handleEdit = (section: EditSection) => {
  const editMethod = `edit${section}` as keyof typeof resumeStore
  ;(resumeStore[editMethod] as unknown as () => void)()
  const element = document.getElementById(`${section.toLowerCase()}-info`)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'center' })
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
            <span
              class="i-material-symbols-light-warning-outline-rounded text-[20px] text-primary"
            ></span>
            <div class="flex flex-col gap-1 items-start hover: no-underline">
              <div class="flex items-center gap-2">
                <h2 class="text-[16px] font-semibold">Important</h2>
                <div
                  v-if="valueState.countImportant > 0"
                  class="flex items-center justify-center rounded-xl text-xs bg-slate-300 w-5 h-5 text-primary font-semibold"
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
              <p class="text-xs text-slate-500 text-left">Items that must to be your resume</p>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent class="flex flex-col gap-2">
          <!-- <div
            v-if="valueState.isValueDescription"
            class="flex flex-col gap-1 border rounded-lg p-3 bg-white"
          >
            <div class="text-xs font-normal">
              <span class="font-semibold">Summary is too short.</span>
              <span> Increase it to be between 20 to 50 words. Right now you use 0 words.</span>
            </div>
            <div
              class="flex items-center gap-1 font-semibold cursor-pointer text-primary text-[13px]"
              @click="resumeStore.editDescription"
            >
              <span
                class="i-material-symbols-light-edit-square-outline text-primary text-[20px]"
              ></span>
              Edit
            </div>
          </div> -->
          <div
            v-if="valueState.isValueSkill"
            class="flex flex-col gap-1 border rounded-lg p-3 bg-white"
          >
            <div class="text-xs font-normal">
              <span class="font-semibold">Skills</span>
              <span> is still empty</span>
            </div>
            <!-- <div
              class="flex items-center gap-1 mt-2 cursor-pointer text-primary text-[13px] font-semibold"
            >
              <span class="i-material-symbols-light-add text-primary text-[20px]"></span>
              Add Now
            </div> -->
          </div>
          <div
            v-if="valueState.isValueEducation"
            class="flex flex-col gap-1 border rounded-lg p-3 bg-white"
          >
            <div class="text-xs font-normal">
              <span class="font-semibold">Education</span>
              <span> is still empty</span>
            </div>
            <!-- <div
              class="flex items-center gap-1 mt-2 cursor-pointer text-primary text-[13px] font-semibold"
            >
              <span class="i-material-symbols-light-add text-primary text-[20px]"></span>
              Add Now
            </div> -->
          </div>
          <div
            v-if="valueState.isValueExperience"
            class="flex flex-col gap-1 border rounded-lg p-3 bg-white"
          >
            <div class="text-xs font-normal">
              <span class="font-semibold">Work Experience</span>
              <span> is still empty</span>
            </div>
            <!-- <div
              class="flex items-center gap-1 mt-2 cursor-pointer text-primary text-[13px] font-semibold"
            >
              <span class="i-material-symbols-light-add text-primary text-[20px]"></span>
              Add Now
            </div> -->
          </div>
          <div
            v-if="valueState.isActionWork"
            class="flex flex-col gap-3"
          >
            <div
              v-for="(item, index) in dataResume.works"
              :key="index"
            >
              <div
                v-if="!checkActionWork(item.description)"
                class="flex flex-col gap-2 border rounded-lg p-3 bg-white"
              >
                <div class="text-xs font-normal">
                  <span class="font-semibold"
                    >Action words is missing in {{ item.company_name }} Work Experience.</span
                  >
                  <span> Add them to showcase the actions YOU performed.</span>
                </div>
                <div
                  class="flex items-center gap-1 cursor-pointer text-primary text-[13px] font-semibold"
                  @click="handleEdit('Work')"
                >
                  <span class="i-material-symbols-light-add text-primary text-[20px]"></span>
                  Add Now
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="valueState.isContainNumber"
            class="flex flex-col gap-3"
          >
            <div
              v-for="(item, index) in dataResume.works"
              :key="index"
            >
              <div
                v-if="!containsNumber(item.description)"
                class="flex flex-col gap-2 border rounded-lg p-3 bg-white"
              >
                <div class="text-xs font-normal">
                  <span class="font-semibold"
                    >Outcome is missing in {{ item.company_name }} Work Experience.</span
                  >
                  <span> Add measurable outcomes.</span>
                </div>
                <div
                  class="flex items-center gap-1 cursor-pointer text-primary text-[13px] font-semibold"
                  @click="handleEdit('Work')"
                >
                  <span class="i-material-symbols-light-add text-primary text-[20px]"></span>
                  Add Now
                </div>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
</template>

<style lang="scss" scoped></style>
