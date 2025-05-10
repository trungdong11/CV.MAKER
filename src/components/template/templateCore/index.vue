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

const data = reactive<ITemplate>({
  id: '1',
  lngCode: 'en',
  isPremium: false,
  createdAt: '2024-01-01T12:00:00Z',
  updatedAt: '2024-03-10T15:30:00Z',
  status: 'active',
  summary:
    'Experienced software engineer with a strong background in web development and cloud computing. Experienced software engineer with a strong background in web development and cloud computing. Experienced software engineer with a strong background in web development and cloud computing. Experienced software engineer with a strong background in web development and cloud computing. Experienced software engineer with a strong background in web development and cloud computing. Experienced software engineer with a strong background in web development and cloud computing.',
  personalDetails: {
    fullname: 'John Doe',
    phoneNumber: '123-456-7890',
    address: '123 Main Street, New York, USA',
    birthday: '1990-05-15',
    email: 'johndoe@example.com',
    avatar: 'https://example.com/avatar.jpg',
    jobTitle: 'Senior Software Engineer',
    socials: [
      { icon: 'linkedin', link: 'JohnDoeLinkedIn' },
      { icon: 'github', link: 'JohnDoeGitHub' },
    ],
  },
  content: {
    education: [
      {
        degree: 'Bachelor of Science in Computer Science',
        school: 'MIT',
        startDate: '2008-09-01',
        endDate: '2012-06-01',
        schoolLink: 'https://mit.edu',
        city: 'Cambridge, MA',
        GPA: 3.9,
        description: 'Focused on software engineering and AI development.',
      },
    ],
    award: [
      {
        awardTitle: 'Best Developer Award',
        awardTitleLink: 'https://example.com/award',
        issuer: 'Tech Community',
        issuedDate: 'Jan 25',
      },
    ],
    languages: [
      { language: 'English', proficiency: 'Fluent' },
      { language: 'Spanish', proficiency: 'Intermediate' },
    ],
    skills: [
      { skillCategory: 'Programming Languages', ListOfSkill: 'JavaScript, TypeScript, Python' },
      { skillCategory: 'Framework', ListOfSkill: 'VueJs, NuxtJs' },
      { skillCategory: 'Others', ListOfSkill: 'JavaScript, TypeScript, Python' },
      {
        skillCategory: 'Project Management Software and Methodologies',
        ListOfSkill: 'JavaScript, TypeScript, Python',
      },
    ],
    works: [
      {
        companyName: 'Tech Corp',
        iscurrentWorking: true,
        position: 'Senior Software Engineer',
        location: 'San Francisco, CA',
        startDate: '2018-07-01',
        endDate: '2018-07-01',
        description:
          'Leading a team to develop scalable web applications. Leading a team to develop scalable web applications. Leading a team to develop scalable web applications. Leading a team to develop scalable web applications. Leading a team to develop scalable web applications. Leading a team to develop scalable web applications. Leading a team to develop scalable web applications. Leading a team to develop scalable web applications. ',
      },
      {
        companyName: 'Tech Corp',
        iscurrentWorking: true,
        position: 'Senior Software Engineer',
        location: 'San Francisco, CA',
        startDate: '2018-07-01',
        endDate: '2018-07-01',
        description:
          'Leading a team to develop scalable web applications. Leading a team to develop scalable web applications. Leading a team to develop scalable web applications. Leading a team to develop scalable web applications. Leading a team to develop scalable web applications. Leading a team to develop scalable web applications. Leading a team to develop scalable web applications. Leading a team to develop scalable web applications. ',
      },
    ],
    projects: [
      {
        projectName: 'Open Source Contribution',
        projectLink: 'https://github.com/johndoe',
        startDate: '2020-01-01',
        endDate: 'Present',
        description:
          'Contributed to multiple open-source projects related to web development. Contributed to multiple open-source projects related to web development. Contributed to multiple open-source projects related to web development. Contributed to multiple open-source projects related to web development. Contributed to multiple open-source projects related to web development. Contributed to multiple open-source projects related to web development. Contributed to multiple open-source projects related to web development.',
      },
      {
        projectName: 'Open Source Contribution',
        projectLink: 'https://github.com/johndoe',
        startDate: '2020-01-01',
        endDate: 'Present',
        description:
          'Contributed to multiple open-source projects related to web development. Contributed to multiple open-source projects related to web development. Contributed to multiple open-source projects related to web development. Contributed to multiple open-source projects related to web development. Contributed to multiple open-source projects related to web development. Contributed to multiple open-source projects related to web development. Contributed to multiple open-source projects related to web development.',
      },
    ],
    certification: [
      {
        certificationName: 'AWS Certified Solutions Architect',
        issuingOrganization: 'Amazon Web Services',
        issuedDate: '2023-05-10',
        certificationLink: 'https://aws.amazon.com/certification/',
        credentialId: 'AWS-12345',
      },
    ],
    publication: [
      {
        title: 'Artificial',
        publisher: 'National Library of Medicine',
        url: 'http://trungdong.com',
        publicationDate: 'Jan, 2034',
        description: '',
      },
    ],
    organization: [
      {
        name: 'Artificial',
        position: 'National Library of Medicine',
        address: 'http://trungdong.com',
        startDate: 'Jan, 2034',
        endDate: 'Present',
        description: '',
      },
    ],
  },
})

// Trạng thái loading
const isLoading = ref(false)

// Định nghĩa tất cả các phần của CV
const allSections = [
  {
    key: 'personal',
    component: MPersonal,
    data: () => data?.personalDetails || {},
    props: { isLoading },
  },
  {
    key: 'description',
    component: MDescription,
    data: () => data?.summary || '',
    props: { isLoading, summary: data?.summary },
  },
  {
    key: 'skills',
    component: MSkill,
    data: () => data.content.skills || [],
    props: { isLoading },
  },
  {
    key: 'education',
    component: MEducation,
    data: () => data.content.education || [],
    props: { isLoading },
  },
  {
    key: 'work',
    component: MWorkExperient,
    data: () => data.content.works || [],
    props: { isLoading },
  },
  {
    key: 'projects',
    component: MProject,
    data: () => data.content.projects || [],
    props: { isLoading },
  },
  {
    key: 'certifications',
    component: MCertification,
    data: () => data.content.certification || [],
    props: { isLoading },
  },
  {
    key: 'awards',
    component: MAward,
    data: () => data.content.award || [],
    props: { isLoading },
  },
  {
    key: 'languages',
    component: MLanguage,
    data: () => data.content.languages || [],
    props: { isLoading },
  },
  {
    key: 'organizations',
    component: MOrganizational,
    data: () => data.content.organization || [],
    props: { isLoading },
  },
  {
    key: 'publications',
    component: MPublication,
    data: () => data.content.publication || [],
    props: { isLoading },
  },
]

// Trạng thái phản ứng cho các phần hiển thị và chưa hiển thị
const visibleSections = ref(allSections.slice(0, 3))
const availableSections = ref(allSections.slice(3))

// Lưu trữ ref cho các component phần
const sectionRefs = ref<Record<string, any>>({})

// Thêm một phần vào visibleSections
const addSection = (section: (typeof allSections)[0]) => {
  visibleSections.value.push(section)
  availableSections.value = availableSections.value.filter((s) => s.key !== section.key)
}

// Xóa một phần khỏi visibleSections
const removeSection = (sectionKey: string) => {
  const section = visibleSections.value.find((s) => s.key === sectionKey)
  if (!section) return
  visibleSections.value = visibleSections.value.filter((s) => s.key !== sectionKey)
  const originalIndex = allSections.findIndex((s) => s.key === section.key)
  const insertIndex = availableSections.value.findIndex((s) => {
    const sIndex = allSections.findIndex((as) => as.key === s.key)
    return sIndex > originalIndex
  })
  if (insertIndex === -1) {
    availableSections.value.push(section)
  } else {
    availableSections.value.splice(insertIndex, 0, section)
  }
  // Xóa ref của section
  delete sectionRefs.value[sectionKey]
}

// Di chuyển một phần lên trên
const moveSectionUp = (sectionKey: string) => {
  const index = visibleSections.value.findIndex((s) => s.key === sectionKey)
  if (index > 0) {
    const [section] = visibleSections.value.splice(index, 1)
    visibleSections.value.splice(index - 1, 0, section)
  }
}

// Di chuyển một phần xuống dưới
const moveSectionDown = (sectionKey: string) => {
  const index = visibleSections.value.findIndex((s) => s.key === sectionKey)
  if (index < visibleSections.value.length - 1) {
    const [section] = visibleSections.value.splice(index, 1)
    visibleSections.value.splice(index + 1, 0, section)
  }
}

// Xử lý sự kiện chỉnh sửa
const handleEdit = (sectionKey: string) => {
  const sectionRef = sectionRefs.value[sectionKey]
  if (sectionRef && typeof sectionRef.openEdit === 'function') {
    sectionRef.openEdit()
  } else {
    console.warn(`Component for section ${sectionKey} does not have an openEdit method`)
  }
}

// Xử lý cập nhật dữ liệu từ component phần
const updateSectionData = (sectionKey: string, newData: any) => {
  if (sectionKey === 'awards') {
    data.content.award = newData
  } else if (sectionKey === 'organizations') {
    data.content.organization = newData
  } else if (sectionKey === 'skills') {
    data.content.skills = newData
  } else if (sectionKey === 'education') {
    data.content.education = newData
  } else if (sectionKey === 'works') {
    data.content.works = newData
  } else if (sectionKey === 'projects') {
    data.content.projects = newData
  } else if (sectionKey === 'certifications') {
    data.content.certification = newData
  } else if (sectionKey === 'languages') {
    data.content.languages = newData
  } else if (sectionKey === 'publications') {
    data.content.publication = newData
  } else if (sectionKey === 'personal') {
    data.personalDetails = newData
  } else if (sectionKey === 'description') {
    data.summary = newData
  }
}

// Tiêu đề cho danh sách các phần chưa hiển thị
const sectionTitles = computed(() => {
  return availableSections.value.map((section) => ({
    key: section.key,
    title: section.key.charAt(0).toUpperCase() + section.key.slice(1),
  }))
})
</script>

<template>
  <BaseTemplate>
    <div class="flex flex-col w-full">
      <!-- Hiển thị các phần hiện tại -->
      <div
        v-for="section in visibleSections"
        :key="section.key"
      >
        <BaseItemTemplate
          :name="section.key"
          @edit="handleEdit"
          @delete="removeSection"
          @move-up="moveSectionUp"
          @move-down="moveSectionDown"
        >
          <component
            :is="section.component"
            v-bind="{
              data: section.data(),
              ...section.props,
            }"
            :ref="
              (el) => {
                if (el) sectionRefs[section.key] = el
              }
            "
            @update:data="updateSectionData(section.key, $event)"
          />
        </BaseItemTemplate>
      </div>

      <!-- Danh sách các phần chưa hiển thị -->
      <div class="mt-4">
        <ul class="list-disc pl-5 flex items-center justify-center gap-3">
          <li
            v-for="section in sectionTitles"
            :key="section.key"
            class="cursor-pointer border rounded-full py-2 px-3 flex items-center justify-center gap-1 hover:border-primary"
            @click="addSection(allSections.find((s) => s.key === section.key)!)"
          >
            <span class="i-material-symbols-light-add text-base"></span>
            <p class="text-xs font-medium">{{ section.title }}</p>
          </li>
        </ul>
      </div>
    </div>
  </BaseTemplate>
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
