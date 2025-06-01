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
  <div class="w-1/3 rounded-xl p-8 shadow flex flex-col justify-center items-center">
    <div class="flex flex-col gap-4 text-center items-center justify-center">
      <h2 class="text-3xl font-semibold">Your Score</h2>
      <!-- <div class="flex flex-col gap-1">
        <p class="text-2xl font-extrabold text-primary">
          {{ evaluateDetail?.total_final_score?.toFixed() }}/100
        </p>
        <p class="text-[14px] text-slate-600 font-normal">22 Issues</p>
      </div> -->
      <!-- <ve-progress
        progress="80"
        data="100"
        :angle="-90"
        color="blue"
        color-fill="#8ec5fc"
        empty-color="#8ec5fc"
        :size="300"
        :thickness="10"
        empty-thickness="10%"
        line-mode="in 10"
        line-position="out 10"
        empty-line-position="in"
        :hide-legend="false"
        :legend="180"
        legend-class="legend-custom-style"
        dash="60 0.9"
        animation="reverse 700 400"
        :no-data="false"
        :loading="false"
        :loader="{ color: 'green' }"
        font-color="white"
        :half="false"
        :gap="10"
        reverse
        font-size="5rem"
      >
        <template #legend>
          <span>/100</span>
        </template>
        <template #legend-caption>
          <p class="font-bold text-base">Your score</p>
        </template>
      </ve-progress> -->
      <ve-progress
        color="#ff6600"
        :progress="evaluateDetail?.total_final_score?.toFixed()"
        font-color="#ff6600"
        dot="10"
        font-size="16px"
        :hide-legend="false"
        legend-class="legend-custom-style"
        dash="60 0.9"
        animation="reverse 700 400"
        :size="250"
        :thickness="10"
        empty-thickness="10%"
        line-mode="in 10"
        line-position="out 10"
        empty-line-position="in"
      >
        <template #legend>
          <span class="text-primary">/100</span>
        </template>
        <template #legend-caption>
          <p class="font-bold text-base">OVERAL</p>
        </template>
      </ve-progress>
      <p
        class="mx-auto text-[14px] max-w-[120px] rounded-full px-4 py-2 text-[#ff576f] bg-[#ffeef1] font-medium"
      >
        {{ evaluateDetail?.total_grammar_errors }} Issues
      </p>
    </div>
    <div class="my-8 h-[1px] bg-slate-400 w-full"></div>
    <div class="flex gap-8 flex-col w-full">
      <!-- {{ evaluateDetail }} -->
      <div
        v-for="item in evaluateDetail?.sections?.slice(1)"
        :key="item.section"
        class="flex items-center justify-between gap-3"
      >
        <p class="font-medium text-slate-500 text-[15px]">{{ item?.section }}</p>
        <p
          class="text-xs font-medium px-3 py-0.5 rounded-xl"
          :class="getScoreColor(item?.final_score, item?.section)"
        >
          {{ handlePercent(item?.final_score, item?.section).toFixed() }}%
        </p>
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
