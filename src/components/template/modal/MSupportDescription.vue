<script lang="ts" setup>
import Card from '@/components/ui/card/Card.vue'
import { useGenerateStore } from '@/stores/resume/generate'
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import Button from '@/components/ui/button/Button.vue'

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'handleChangeDescription', text: string): void
}>()

const prop = defineProps<{
  text: string
  type: string
}>()

const { text, type } = toRefs(prop)

const generateStore = useGenerateStore()

const { fixingDescription, enhancingDescription, fixText, enhanceText } = storeToRefs(generateStore)

const handleDescription = () => {
  type.value === 'enhance'
    ? generateStore.enhanceDescription({ text: text.value })
    : generateStore.fixDescription({ text: text.value })
}

const handleAddDescription = () => {
  emit('handleChangeDescription', type.value === 'enhance' ? enhanceText.value : fixText.value)
  emit('close')
}

onBeforeMount(() => {
  if (type.value) {
    handleDescription()
  }
})
</script>

<template>
  <div class="fixed z-50 bottom-0 top-0 left-0 right-0 bg-rgb">
    <div class="flex items-center justify-center p-20 h-full w-full">
      <Card class="flex flex-col gap-4 p-6 w-[650px] min-w-[650px] items-center">
        <div class="flex items-start justify-between w-full">
          <h2 class="text-lg font-semibold">
            {{ type === 'enhance' ? 'Enhance' : 'Fix spelling & grammar' }} Description Using AI
          </h2>
          <span
            class="i-material-symbols-light-close text-2xl font-semibold cursor-pointer"
            @click="emit('close')"
          ></span>
        </div>
        <div
          v-if="fixingDescription || enhancingDescription"
          class="flex items-center justify-center"
        >
          <DotLottieVue
            style="height: 100px; width: 100px"
            class="my-20"
            autoplay
            loop
            src="https://lottie.host/1fa733f4-426d-4b35-8291-fc86d6f3b8e2/wNXLz5pT30.lottie"
          />
        </div>
        <div
          v-else
          class="flex flex-col gap-10 w-full max-h-[400px] overflow-y-auto mb-2"
        >
          <div class="flex flex-col gap-3 rounded-lg p-3 border-[#E5E7EB] border bg-[#F9FAFB]">
            <h2 class="font-semibold text-base">Before</h2>
            <p
              class="font-nomal text-xs"
              v-html="text"
            ></p>
          </div>
          <div class="flex flex-col gap-3 rounded-lg p-3 border-[#1fc76a] border bg-[#EEFFF5]">
            <h2 class="font-semibold text-base">After</h2>
            <p
              class="text-xs font-normal"
              v-html="type === 'enhance' ? enhanceText : fixText"
            ></p>
          </div>
        </div>
        <Button
          id="tour-item"
          data-tour="1"
          class="ai-glow ai-shine mt-4 flex items-center gap-2 px-4 h-9 text-white font-medium rounded-full shadow-lg hover:bg-[#ff8533] transition w-[200px] mx-auto"
          @click="handleAddDescription"
        >
          ✨ <span class="text-white">Use this description</span>
        </Button>
      </Card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bg-rgb {
  background-color: rgba(0, 0, 0, 0.5);
}

.ai-shine {
  background: linear-gradient(270deg, #ff6600, #ff8533, #ff6600); // dùng tông cam
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
    box-shadow: 0 0 0 0 rgba(255, 102, 0, 0.7); // cam
  }
  70% {
    box-shadow: 0 0 0 10px rgba(255, 102, 0, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 102, 0, 0);
  }
}

.ai-glow {
  animation: aiPulse 2s infinite;
}
</style>
