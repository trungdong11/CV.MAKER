<script setup lang="ts">
import EditableText from '@/components/base/EditableText.vue'
import { Button } from '@/components/ui/button'
import { useQuizzflyStore } from '@/stores/quizzfly/quizzfly'
import QuizzflySettings from './QuizzflySettings.vue'
// import ThemeSetting from './ThemeSetting.vue'
import AICreateButton from './AICreateButton.vue'

const router = useRouter()
const route = useRoute()
const quizzflyStore = useQuizzflyStore()

const handleSaveTitle = (value: string, isModified?: boolean) => {
  if (!isModified) return
  quizzflyStore.updateQuizzflySettings(route.params.quizzflyId as string, { title: value })
}

const handleSaveSettings = () => {
  quizzflyStore.updateQuizzflySettings(
    route.params.quizzflyId as string,
    quizzflyStore.getQuizzflyInfo,
  )
}

const handleClickCancel = () => {
  router.push({ name: 'quizzfly' })
}
</script>
<template>
  <div class="flex justify-between items-center border-b py-2 px-5 h-[60px]">
    <div class="flex items-center gap-5">
      <RouterLink :to="{ name: 'quizzfly' }">
        <span class="i-solar-arrow-left-linear text-xl cursor-pointer"></span>
      </RouterLink>
      <div>
        <EditableText
          v-slot="{ data }"
          class="text-lg font-medium"
          :value="quizzflyStore.getQuizzflyInfo.title || 'Untitled'"
          @save="handleSaveTitle"
        >
          <div class="flex flex-col">
            <span class="border-transparent hover:border-slate-500 text-base">
              {{ data }}
            </span>
            <span class="text-xs text-gray-500"> Click to edit </span>
          </div>
        </EditableText>
      </div>

      <!-- settings -->
      <QuizzflySettings />

      <div
        v-if="quizzflyStore.getIsUpdating"
        class="flex items-center gap-2"
      >
        <span class="i-svg-spinners-tadpole"></span>
        <span>saving...</span>
      </div>
      <div
        v-else
        class="flex items-center"
      >
        <span class="i-material-symbols-light-check-rounded text-2xl"></span>
        <span>Saved</span>
      </div>
    </div>

    <div class="flex items-center gap-3">
      <AICreateButton />
      <!-- <ThemeSetting /> -->
      <!-- <Button
        variant="secondary"
        class="px-2"
      >
        <span class="i-solar-eye-linear text-xl"></span>
      </Button> -->
      <div class="h-6 border-r"></div>
      <Button
        variant="secondary"
        @click="handleClickCancel"
      >
        Cancel
      </Button>
      <Button @click="handleSaveSettings"> Save </Button>
    </div>
  </div>
</template>
