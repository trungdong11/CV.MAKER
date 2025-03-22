<script setup lang="ts">
import BaseTemplate from '@/components/base/BaseTemplate.vue'
import { type ITemplate } from '@/types/template'
import MPersonal from './components/MPersonal.vue'
import MDescription from './components/MDescription.vue'
import MSkill from './components/MSkill.vue'
import MEducation from './components/MEducation.vue'
import MWorkExperient from './components/MWorkExperient.vue'
import MProject from './components/MProject.vue'
import MCertification from './components/MCertification.vue'
import MAward from './components/MAward.vue'

const data: ITemplate = {
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
      {
        icon: 'linkedin',
        link: 'JohnDoeLinkedIn',
      },
      {
        icon: 'github',
        link: 'JohnDoeGitHub',
      },
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
      {
        language: 'English',
        proficiency: 'Fluent',
      },
      {
        language: 'Spanish',
        proficiency: 'Intermediate',
      },
    ],
    skills: [
      {
        skillCategory: 'Programming Languages',
        ListOfSkill: 'JavaScript, TypeScript, Python',
      },
      {
        skillCategory: 'Framework',
        ListOfSkill: 'VueJs, NuxtJs',
      },
      {
        skillCategory: 'Others',
        ListOfSkill: 'JavaScript, TypeScript, Python',
      },
      {
        skillCategory: 'Project Management Software and Methodologies',
        ListOfSkill: 'JavaScript, TypeScript, Python',
      },
    ],
    Tools: [
      {
        ToolCategory: 'Frameworks',
        ListOfTool: 'React, Next.js, Node.js',
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
  },
}

const isLoading = ref(false)
</script>

<template>
  <BaseTemplate>
    <div class="flex flex-col w-full">
      <MPersonal
        :data="data?.personalDetails"
        :is-loading="isLoading"
      />

      <MDescription
        :is-loading="isLoading"
        :summary="data?.summary"
      />

      <MSkill
        :data="data.content.skills"
        :is-loading="isLoading"
      />

      <MEducation
        :data="data.content.education"
        :is-loading="isLoading"
      />

      <MWorkExperient
        :data="data.content.works"
        :is-loading="isLoading"
      />

      <MProject
        :data="data.content.projects"
        :is-loading="isLoading"
      />

      <MCertification
        :data="data.content.certification"
        :is-loading="isLoading"
      />

      <MAward
        :data="data.content.award"
        :is-loading="isLoading"
      />
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
