<script setup lang="ts">
import MPersonal from './components/MPersonal.vue'
import MDescription from './components/MDescription.vue'
import MSkill from './components/MSkill.vue'
import MEducation from './components/MEducation.vue'
import MWorkExperient from './components/MWorkExperient.vue'
import MProject from './components/MProject.vue'
import MCertification from './components/MCertification.vue'
import MAward from './components/MAward.vue'
import MLanguage from './components/MLanguage.vue'
import MOrganizational from './components/MOrganizational.vue'
// import MPublication from './components/MPublication.vue'
import Card from '@/components/ui/card/Card.vue'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useResumeStore } from '@/stores/resume/resume'

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

const sectionNotAdded = computed(() => {
  return sections.filter((section) => {
    return !sectionInitialIndex.value.includes(sections.indexOf(section))
  })
})

const handleAddSection = (section: string) => {
  switch (section) {
    case 'award':
      resumeStore.seedAward()
      break
    case 'certification':
      resumeStore.seedCertification()
      break
    case 'education':
      resumeStore.seedEducation()
      break
    case 'languages':
      resumeStore.seedLanguage()
      break
    case 'organization':
      resumeStore.seedOrganization()
      break
    case 'projects':
      resumeStore.seedProject()
      break
    case 'works':
      resumeStore.seedWork()
      break
    case 'publication':
      resumeStore.seedPublication()
      break
    case 'skills':
      resumeStore.seedSkill()
      break
    case 'summary':
      resumeStore.seedSummary()
      break
    default:
      break
  }
}
</script>

<template>
  <Card class="flex flex-col flex-auto w-[952px] min-w-[952px] overflow-auto">
    <ScrollArea class="h-full flex flex-col gap-6 p-5">
      <component
        :is="sections[index].component"
        v-for="index in sectionInitialIndex"
        :key="index"
      />
    </ScrollArea>

    <div class="flex justify-center pb-5">
      <div class="max-w-[50%] flex flex-wrap justify-center gap-2">
        <div
          v-for="item in sectionNotAdded"
          :key="item.key"
          class="flex items-center gap-2 border px-3 py-2 rounded-full hover:bg-gray-100 cursor-pointer"
          @click="handleAddSection(item.key)"
        >
          <span class="i-material-symbols-light-add-2-rounded"></span>
          <div>
            {{ item.key }}
          </div>
        </div>
      </div>
    </div>
  </Card>
</template>

<style lang="scss" scoped>
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
    }
  }
}
</style>
