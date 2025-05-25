<script lang="ts" setup>
import MPersonal from '../templateCore/components/MPersonal.vue'
import MDescription from '../templateCore/components/MDescription.vue'
import MSkill from '../templateCore/components/MSkill.vue'
import MEducation from '../templateCore/components/MEducation.vue'
import MWorkExperient from '../templateCore/components/MWorkExperient.vue'
import MProject from '../templateCore/components/MProject.vue'
import MCertification from '../templateCore/components/MCertification.vue'
import MAward from '../templateCore/components/MAward.vue'
import MLanguage from '../templateCore/components/MLanguage.vue'
import MOrganizational from '../templateCore/components/MOrganizational.vue'
// import MPublication from './components/MPublication.vue'
import Card from '@/components/ui/card/Card.vue'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useResumeStore } from '@/stores/resume/resume'

const emit = defineEmits<{
  (e: 'close'): void
}>()

const resumeStore = useResumeStore()
const sections = [
  {
    key: 'personal_details',
    component: MPersonal,
  },
  {
    key: 'summary',
    component: MDescription,
  },
  {
    key: 'skills',
    component: MSkill,
  },
  {
    key: 'education',
    component: MEducation,
  },
  {
    key: 'works',
    component: MWorkExperient,
  },
  {
    key: 'projects',
    component: MProject,
  },
  {
    key: 'certification',
    component: MCertification,
  },
  {
    key: 'award',
    component: MAward,
  },
  {
    key: 'languages',
    component: MLanguage,
  },
  {
    key: 'organization',
    component: MOrganizational,
  },
  // {
  //   key: 'publication',
  //   component: MPublication,
  // },
]

const sectionInitialIndex = computed(() => {
  return sections
    .map((section, index) => {
      if (section.key === 'personal_details') {
        return resumeStore.dataResume[section.key] !== null ? index : null
      } else {
        return resumeStore.dataResume[section.key]?.length > 0 ? index : null
      }
    })
    .filter((index) => index !== null)
})
</script>

<template>
  <div
    class="fixed z-99 bottom-0 top-0 left-0 right-0 bg-rgb"
    @click="emit('close')"
  >
    <div class="flex items-center justify-center py-11 px-20 h-full w-full">
      <Card
        class="flex flex-col w-[952px] min-w-[952px] h-full"
        @click.stop
      >
        <ScrollArea class="flex-1 overflow-y-auto flex flex-col gap-6 p-5">
          <component
            :is="sections[index].component"
            v-for="index in sectionInitialIndex"
            :key="index"
          />
        </ScrollArea>
      </Card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bg-rgb {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
