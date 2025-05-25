<script lang="ts" setup>
import Card from '@/components/ui/card/Card.vue'
import { useGenerateStore } from '@/stores/resume/generate'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Button from '@/components/ui/button/Button.vue'
import { listJobs, seniorities } from '@/const'

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'handleChangeSummary', text: string): void
}>()

const generateStore = useGenerateStore()

const { generatingSummary, summaryInfo } = storeToRefs(generateStore)

const job = ref('')
const seniority = ref('')
const selectedSummaryIndex = ref<number | null>(null)

const handleGenerateSummary = () => {
  generateStore.handleGenerateSummary({
    jobTitle: job.value,
    seniority: seniority.value,
  })
}

const handleAddSummary = (text: string, index: number) => {
  selectedSummaryIndex.value = index
  emit('handleChangeSummary', text)
}
</script>

<template>
  <div class="fixed z-[999] bottom-0 top-0 left-0 right-0 bg-rgb">
    <div class="flex items-center justify-center p-20 h-full w-full">
      <Card class="flex flex-col gap-4 p-6 w-[650px] min-w-[650px]">
        <div class="flex items-start justify-between">
          <h2 class="text-lg font-semibold">Generate Great Summary Samples</h2>
          <span
            class="i-material-symbols-light-close text-2xl font-semibold cursor-pointer"
            @click="emit('close')"
          ></span>
        </div>
        <div class="flex flex-col gap-10 w-full">
          <div class="flex flex-col gap-1">
            <p class="font-medium text-base">
              Input your Job Title and Seniority and then click Generate
            </p>
            <p class="text-[13px]">
              Different people with different Job Title will have different summary
            </p>
          </div>
          <div class="flex gap-3 w-full items-end">
            <div class="flex flex-col gap-1 w-full">
              <p class="mt-5 mb-1 font-medium">Job title <span class="text-red-500">*</span></p>
              <Select v-model="job">
                <SelectTrigger>
                  <SelectValue placeholder="Time limit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      v-for="(item, index) in listJobs"
                      :key="index"
                      :value="item"
                    >
                      {{ item }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div class="flex flex-col gap-1 w-full">
              <p class="mt-5 mb-1 font-medium">Seniority<span class="text-red-500">*</span></p>
              <Select v-model="seniority">
                <SelectTrigger>
                  <SelectValue placeholder="Time limit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      v-for="(item, index) in seniorities"
                      :key="index"
                      :value="item"
                    >
                      {{ item }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Button
              :disabled="generatingSummary"
              @click="handleGenerateSummary"
            >
              <span class="text-white">Generate</span>
              <span
                v-if="generatingSummary"
                class="i-svg-spinners-ring-resize text-white ml-2"
              ></span>
            </Button>
          </div>
        </div>
        <div v-if="summaryInfo['0']">
          <div class="w-full h-[1px] bg-[#E5E7EB] my-4"></div>
          <p class="font-medium text-base">Choose from the generated results below here</p>
          <div class="flex flex-col mt-4 gap-3 max-h-[300px] overflow-y-auto">
            <div
              v-for="(item, index) in summaryInfo"
              :key="index"
              class="border rounded-lg p-3 border-slate-300 flex items-center gap-2"
            >
              <p class="font-medium text-[13px]">{{ item }}</p>
              <Button
                class="border-primary text-primary min-w-[96px]"
                variant="outline"
                :disabled="selectedSummaryIndex === index"
                @click="handleAddSummary(item, index)"
              >
                <span class="text-primary">
                  {{ selectedSummaryIndex === index ? 'Added' : 'Add this' }}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bg-rgb {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
