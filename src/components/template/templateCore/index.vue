<script setup lang="ts">
import { ref, computed } from 'vue'
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
import MPublication from './components/MPublication.vue'
import Card from '@/components/ui/card/Card.vue'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useResumeStore } from '@/stores/resume/resume'

// Định nghĩa tất cả các phần của CV
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
  {
    key: 'publication',
    component: MPublication,
  },
]

const sectionInitialIndex = ref([0, 1, 2, 3, 4])

const sectionNotAdded = computed(() => {
  return sections.filter((section) => {
    return !sectionInitialIndex.value.includes(sections.indexOf(section))
  })
})

onBeforeMount(() => {
  const data = resumeStore.dataResume
  if (data) {
    sectionInitialIndex.value = sections
      .map((section, index) => {
        return data[section.key] ? index : null
      })
      .filter((index) => index !== null)
  }
})
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
          @click="sectionInitialIndex.push(sections.indexOf(item))"
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
