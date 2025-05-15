<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import BaseTemplate from '@/components/base/BaseTemplate.vue'
import BaseItemTemplate from '@/components/base/BaseItemTemplate.vue'
import { type ITemplate } from '@/types/template'
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

// Định nghĩa tất cả các phần của CV
const sections = [
  {
    key: 'personal',
    component: MPersonal,
  },
  {
    key: 'description',
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
    key: 'work',
    component: MWorkExperient,
  },
  {
    key: 'projects',
    component: MProject,
  },
  {
    key: 'certifications',
    component: MCertification,
  },
  {
    key: 'awards',
    component: MAward,
  },
  {
    key: 'languages',
    component: MLanguage,
  },
  {
    key: 'organizations',
    component: MOrganizational,
  },
  {
    key: 'publications',
    component: MPublication,
  },
]

const sectionInitial = shallowRef([sections[2]])
</script>

<template>
  <Card class="flex flex-col flex-auto w-[952px] min-w-[952px] overflow-auto">
    <ScrollArea class="h-full flex flex-col gap-6 p-5">
      <component
        :is="section.component"
        v-for="section in sectionInitial"
        :key="section.key"
      />
    </ScrollArea>
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
