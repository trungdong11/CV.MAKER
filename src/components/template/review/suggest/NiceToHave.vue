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
  isValueCertification: boolean
  isValueLanguage: boolean
  isValueAward: boolean
  isValueOrganization: boolean
  isActionOrganization: boolean
  isContainNumberOrganization: boolean
  countImportant: number
}

const initialValueState: ImportantSectionState = {
  isValueCertification: false,
  isValueLanguage: false,
  isValueAward: false,
  isContainNumberOrganization: false,
  isActionOrganization: false,
  isValueOrganization: false,
  countImportant: 0,
}

const valueState = reactive({ ...initialValueState })

const handleCheckOrganization = () => {
  if (dataResume.value.organization) {
    dataResume.value?.organization?.forEach((item) => {
      const description = item.description?.trim() || ''

      if (!description || !checkActionWork(description)) {
        valueState.countImportant++
        valueState.isActionOrganization = true
      }
      if (!description || !containsNumber(description)) {
        valueState.countImportant++
        valueState.isContainNumberOrganization = true
      }
    })
  }
}

const handleImportantEvaluate = () => {
  handleCheckOrganization()
  if (dataResume.value?.certification?.length === 0) {
    valueState.isValueCertification = true
    valueState.countImportant++
  }
  if (dataResume.value?.languages?.length === 0) {
    valueState.isValueLanguage = true
    valueState.countImportant++
  }
  if (dataResume.value?.award?.length === 0) {
    valueState.isValueAward = true
    valueState.countImportant++
  }
  if (dataResume.value?.organization?.length === 0) {
    valueState.isValueOrganization = true
    valueState.countImportant++
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
              class="i-material-symbols-light-approval-delegation-outline text-[20px] text-primary"
            ></span>
            <div class="flex flex-col gap-1 items-start hover: no-underline">
              <div class="flex items-center gap-2">
                <h2 class="text-[16px] font-semibold">Nice To Have</h2>
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
                Items that make your resume more unique
              </p>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent class="flex flex-col gap-2">
          <div
            v-if="valueState.isValueCertification"
            class="flex flex-col gap-1 border rounded-lg p-3 bg-white"
          >
            <div class="text-xs font-normal">
              <span class="font-semibold">Certification is still empty.</span>
              <span> Consider adding it to increase chance to pass the screening.</span>
            </div>
            <!-- <div
              class="flex items-center gap-1 cursor-pointer text-primary text-[13px] font-semibold"
            >
              <span class="i-material-symbols-light-add text-primary text-[20px]"></span>
              Add Now
            </div> -->
          </div>
          <div
            v-if="valueState.isValueAward"
            class="flex flex-col gap-1 border rounded-lg p-3 bg-white"
          >
            <div class="text-xs font-normal">
              <span class="font-semibold">Award is still empty.</span>
              <span> Consider adding it to increase chance to pass the screening.</span>
            </div>
            <!-- <div
              class="flex items-center gap-1 cursor-pointer text-primary text-[13px] font-semibold"
            >
              <span class="i-material-symbols-light-add text-primary text-[20px]"></span>
              Add Now
            </div> -->
          </div>
          <div
            v-if="valueState.isValueLanguage"
            class="flex flex-col gap-1 border rounded-lg p-3 bg-white"
          >
            <div class="text-xs font-normal">
              <span class="font-semibold">Language is still empty.</span>
              <span> Consider adding it to increase chance to pass the screening.</span>
            </div>
            <!-- <div
              class="flex items-center gap-1 cursor-pointer text-primary text-[13px] font-semibold"
            >
              <span class="i-material-symbols-light-add text-primary text-[20px]"></span>
              Add Now
            </div> -->
          </div>
          <div
            v-if="valueState.isValueOrganization"
            class="flex flex-col gap-1 border rounded-lg p-3 bg-white"
          >
            <div class="text-xs font-normal">
              <span class="font-semibold">Organization is still empty.</span>
              <span> Consider adding it to increase chance to pass the screening.</span>
            </div>
            <!-- <div
              class="flex items-center gap-1 cursor-pointer text-primary text-[13px] font-semibold"
            >
              <span class="i-material-symbols-light-add text-primary text-[20px]"></span>
              Add Now
            </div> -->
          </div>
          <div
            v-if="valueState.isActionOrganization"
            class="flex flex-col gap-3"
          >
            <div
              v-for="(item, index) in dataResume.organization"
              :key="index"
            >
              <div
                v-if="!checkActionWork(item.description)"
                class="flex flex-col gap-2 border rounded-lg p-3 bg-white"
              >
                <div class="text-xs font-normal">
                  <span class="font-semibold"
                    >Action words is missing in {{ item?.name }} Organizational & Volunteering
                    Experience.</span
                  >
                  <span> Add them to showcase the actions YOU performed.</span>
                </div>
                <div
                  class="flex items-center gap-1 cursor-pointer text-primary text-[13px] font-semibold"
                  @click="resumeStore.editOrganization"
                >
                  <span class="i-material-symbols-light-add text-primary text-[20px]"></span>
                  Add Now
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="valueState.isContainNumberOrganization"
            class="flex flex-col gap-3"
          >
            <div
              v-for="(item, index) in dataResume.organization"
              :key="index"
            >
              <div
                v-if="!containsNumber(item.description)"
                class="flex flex-col gap-2 border rounded-lg p-3 bg-white"
              >
                <div class="text-xs font-normal">
                  <span class="font-semibold"
                    >Outcome is missing in {{ item?.name }} Organizational & Volunteering
                    Experience.</span
                  >
                  <span> Add measurable outcomes.</span>
                </div>
                <div
                  class="flex items-center gap-1 cursor-pointer text-primary text-[13px] font-semibold"
                  @click="resumeStore.editOrganization"
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
