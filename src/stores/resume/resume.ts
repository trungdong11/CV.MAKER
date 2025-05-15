import type { ITemplate } from '@/types/template'
import { defineStore } from 'pinia'

export const useResumeStore = defineStore({
  id: 'resume',
  state: () => ({
    data: {
      createdAt: '2024-03-07T13:39:44.967Z',
      updatedAt: '2024-03-07T13:39:44.967Z',
      summary: 'Experienced software developer with 5 years of expertise in full-stack development',
      personalDetails: {
        fullname: 'John Doe',
        phoneNumber: '+84 123 456 789',
        address: '123 Main Street, Ho Chi Minh City, Vietnam',
        birthday: '1995-05-15T00:00:00.000Z',
        email: 'john.doe@example.com',
        avatar: 'https://example.com/avatar.jpg',
        jobTitle: 'Senior Software Engineer',
      },
      socials: [
        {
          icon: 'linkedin',
          link: 'https://linkedin.com/in/johndoe',
        },
        {
          icon: 'github',
          link: 'https://github.com/johndoe',
        },
      ],
      education: [
        {
          degree: 'Bachelor of Computer Science',
          school: 'University of Technology',
          startDate: '2013-09-01T00:00:00.000Z',
          endDate: '2017-06-30T00:00:00.000Z',
          schoolLink: 'https://university.edu',
          city: 'Ho Chi Minh City',
          GPA: 3.8,
          description: 'Major in Software Engineering',
        },
      ],
      award: [
        {
          awardTitle: 'Best Developer Award',
          awardTitleLink: 'https://example.com/award',
          issuer: 'Tech Community Vietnam',
          issuedDate: '2022-12-15T00:00:00.000Z',
          description: 'Awarded for outstanding contribution to open source projects',
        },
      ],
      languages: [
        {
          language: 'English',
          proficiency: 'Fluent',
        },
        {
          language: 'Vietnamese',
          proficiency: 'Native',
        },
      ],
      skills: [
        {
          skillCategory: 'Programming Languages',
          listOfSkill: 'JavaScript, TypeScript, Python, Java',
        },
        {
          skillCategory: 'Frameworks',
          listOfSkill: 'React, Node.js, Express, NestJS',
        },
      ],
      works: [
        {
          companyName: 'Tech Solutions Inc.',
          isCurrentWorking: true,
          position: 'Senior Software Engineer',
          location: 'Ho Chi Minh City, Vietnam',
          startDate: '2020-01-01T00:00:00.000Z',
          endDate: '2023-12-31T00:00:00.000Z',
          description: 'Led development of enterprise applications using React and Node.js',
        },
        {
          companyName: 'StartUp Co.',
          isCurrentWorking: false,
          position: 'Software Developer',
          location: 'Hanoi, Vietnam',
          startDate: '2017-07-01T00:00:00.000Z',
          endDate: '2019-12-31T00:00:00.000Z',
          description: 'Developed and maintained web applications',
        },
      ],
      projects: [
        {
          projectName: 'E-commerce Platform',
          projectLink: 'https://github.com/johndoe/ecommerce',
          startDate: '2022-01-01T00:00:00.000Z',
          endDate: '2022-06-30T00:00:00.000Z',
          description: 'Built a full-stack e-commerce platform using React and Node.js',
        },
      ],
      certification: [
        {
          certificationName: 'AWS Certified Developer',
          issuingOrganization: 'Amazon Web Services',
          issuedDate: '2022-03-15T00:00:00.000Z',
          certificationLink: 'https://aws.amazon.com/certification',
          credentialId: 'AWS-123456',
        },
      ],
      publication: [
        {
          title: 'Modern Web Development Practices',
          publisher: 'Tech Journal',
          url: 'https://techjournal.com/article',
          publicationDate: '2022-09-01T00:00:00.000Z',
          description: 'Article about best practices in modern web development',
        },
      ],
      organization: [
        {
          name: 'Vietnam Developer Community',
          position: 'Technical Lead',
          address: 'Ho Chi Minh City, Vietnam',
          startDate: '2021-01-01T00:00:00.000Z',
          endDate: '2023-12-31T00:00:00.000Z',
          description: 'Leading technical workshops and mentoring junior developers',
        },
      ],
    },
  }),

  actions: {
    updatePersonalDetails(personalDetails: ITemplate['personalDetails']) {
      this.data.personalDetails = {
        ...this.data.personalDetails,
        ...personalDetails,
      }
    },

    updateSocials(socials: ITemplate['socials']) {
      this.data.socials = socials
    },

    updateSummary(summary: string) {
      this.data.summary = summary
    },

    updateSkills(skills: ITemplate['skills']) {
      this.data.skills = skills
    },

    updateWorkExperience(works: ITemplate['works']) {
      this.data.works = {
        ...this.data.works,
        ...works,
      }
    },

    updateEducation(education: ITemplate['education']) {
      this.data.education = {
        ...this.data.education,
        ...education,
      }
    },
  },
})
