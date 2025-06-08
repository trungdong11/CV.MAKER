<script setup lang="ts">
import { useEvaluateStore } from '@/stores/evaluate'
const evaluateStore = useEvaluateStore()
const { evaluateDetail } = toRefs(evaluateStore)

const getScoreColor = computed(() => {
  return (score: number, section: string) => {
    const percent = handlePercent(score, section)
    if (percent > 0 && percent < 75) {
      return 'text-[#d89745] bg-[#ffe0b9]'
    } else if (percent >= 75 && percent <= 100) {
      return 'bg-[#cdf0e4] text-[#249a71]'
    }
    return 'text-[#ff576f] bg-[#ffeef1]'
  }
})

const handlePercent = (num: number, section: string) => {
  let total = 0

  switch (section) {
    case 'Personal Info':
      total = 10
      break
    case 'Summary':
      total = 10
      break
    case 'Skills':
      total = 15
      break
    case 'Work Experience':
      total = 20
      break
    case 'Education':
      total = 10
      break
    case 'Projects':
      total = 15
      break
    case 'Certifications':
      total = 5
      break
    case 'Languages':
      total = 5
      break
    case 'Organizational & Volunteering':
      total = 5
      break
    case 'Awards':
      total = 5
      break
    default:
      break
  }

  return (num / total) * 100
}
</script>
<template>
  <div class="flex flex-col gap-8 w-full h-[100vh] overflow-auto">
    <div
      v-for="item in evaluateDetail?.sections?.slice(1)"
      :key="item.section"
      class="w-full rounded-xl p-5 shadow flex flex-col gap-4"
    >
      <div class="flex items-center w-full">
        <div class="flex items-center gap-2 w-[400px]">
          <span
            class="i-material-symbols-light-person-apron-outline text-[20px] text-primary"
          ></span>
          <h2 class="text-base font-medium">{{ item?.section }}</h2>
        </div>
        <div class="flex items-center gap-4">
          <p
            class="text-xs font-medium px-3 py-0.5 rounded-xl"
            :class="getScoreColor(item?.final_score, item?.section)"
          >
            {{ item?.quality }}
          </p>
          <p
            class="text-xs font-medium px-3 py-0.5 rounded-xl"
            :class="getScoreColor(item?.final_score, item?.section)"
          >
            {{ handlePercent(item?.final_score, item?.section).toFixed() }}%
          </p>
        </div>
      </div>
      <div
        v-if="item.grammar_errors_detailed.length > 0"
        class="flex flex-col w-full"
      >
        <div class="flex flex-col gap-1 w-full rounded-lg text-[#1f2937] bg-[#F9FAFB] p-5">
          <h2 class="text-base font-medium">Grammars Error</h2>
          <div class="flex flex-col gap-4">
            <div
              v-for="(grammarItem, index) in item.grammar_errors_detailed"
              :key="grammarItem.type"
              class="flex flex-col gap-1"
            >
              <p class="font-xs">Location: {{ grammarItem?.location }}</p>
              <p class="font-xs">Description: {{ grammarItem?.description }}</p>
              <div
                class="border-[#1fc76a] flex flex-col gap-1 border font-xs p-3 rounded-lg bg-[#EEFFF5] text-[#1f2937]"
              >
                <p class="font-medium">Suggestions</p>
                <p>{{ grammarItem?.suggestion }}</p>
              </div>
              <div
                v-if="item.grammar_errors_detailed.length !== index + 1"
                class="w-full bg-slate-200 h-[1px] mt-4"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.shadow {
  box-shadow:
    rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
}
</style>
