import type { ITemplate } from '@/types/template'
import { createCVApi, updateCVApi, getDetailCVApi } from '@/services/resume'
import { defineStore } from 'pinia'
import { showToast } from '@/utils/toast'
import router from '@/routers/router'
import dayjs from 'dayjs'
import { cloneDeep } from 'lodash-es'

export const useResumeStore = defineStore({
  id: 'resume',
  state: () => ({
    // data: {
    //   created_at: '2024-03-07T13:39:44.967Z',
    //   updated_at: '2024-03-07T13:39:44.967Z',
    //   summary: 'Experienced software developer with 5 years of expertise in full-stack development',
    //   personal_details: {
    //     full_name: 'John Doe',
    //     phone_number: '+84 123 456 789',
    //     address: '123 Main Street, Ho Chi Minh City, Vietnam',
    //     birthday: '1995-05-15T00:00:00.000Z',
    //     email: 'john.doe@example.com',
    //     avatar: 'https://example.com/avatar.jpg',
    //     job_title: 'Senior Software Engineer',
    //   },
    //   socials: [
    //     {
    //       icon: 'linkedin',
    //       link: 'https://linkedin.com/in/johndoe',
    //     },
    //     {
    //       icon: 'github',
    //       link: 'https://github.com/johndoe',
    //     },
    //   ],
    //   education: [
    //     {
    //       degree: 'Bachelor of Computer Science',
    //       school: 'University of Technology',
    //       start_date: '2013-09-01T00:00:00.000Z',
    //       end_date: '2017-06-30T00:00:00.000Z',
    //       school_link: 'https://university.edu',
    //       city: 'Ho Chi Minh City',
    //       gpa: 3.8,
    //       description: 'Major in Software Engineering',
    //     },
    //   ],
    //   award: [
    //     {
    //       awardTitle: 'Best Developer Award',
    //       awardTitleLink: 'https://example.com/award',
    //       issuer: 'Tech Community Vietnam',
    //       issuedDate: '2022-12-15T00:00:00.000Z',
    //       description: 'Awarded for outstanding contribution to open source projects',
    //     },
    //   ],
    //   languages: [
    //     {
    //       language: 'English',
    //       proficiency: 'Fluent',
    //     },
    //     {
    //       language: 'Vietnamese',
    //       proficiency: 'Native',
    //     },
    //   ],
    //   skills: [
    //     {
    //       skill_category: 'Programming Languages',
    //       list_of_skill: 'JavaScript, TypeScript, Python, Java',
    //     },
    //     {
    //       skill_category: 'Frameworks',
    //       list_of_skill: 'React, Node.js, Express, NestJS',
    //     },
    //   ],
    //   works: [
    //     {
    //       company_name: 'Tech Solutions Inc.',
    //       is_current_working: true,
    //       position: 'Senior Software Engineer',
    //       location: 'Ho Chi Minh City, Vietnam',
    //       start_date: '2020-01-01T00:00:00.000Z',
    //       end_date: '2023-12-31T00:00:00.000Z',
    //       description: 'Led development of enterprise applications using React and Node.js',
    //     },
    //     {
    //       company_name: 'StartUp Co.',
    //       is_current_working: false,
    //       position: 'Software Developer',
    //       location: 'Hanoi, Vietnam',
    //       start_date: '2017-07-01T00:00:00.000Z',
    //       end_date: '2019-12-31T00:00:00.000Z',
    //       description: 'Developed and maintained web applications',
    //     },
    //   ],
    //   projects: [
    //     {
    //       projectName: 'E-commerce Platform',
    //       projectLink: 'https://github.com/johndoe/ecommerce',
    //       startDate: '2022-01-01T00:00:00.000Z',
    //       endDate: '2022-06-30T00:00:00.000Z',
    //       description: 'Built a full-stack e-commerce platform using React and Node.js',
    //     },
    //   ],
    //   certification: [
    //     {
    //       certificationName: 'AWS Certified Developer',
    //       issuingOrganization: 'Amazon Web Services',
    //       issuedDate: '2022-03-15T00:00:00.000Z',
    //       certificationLink: 'https://aws.amazon.com/certification',
    //       credentialId: 'AWS-123456',
    //     },
    //   ],
    //   publication: [
    //     {
    //       title: 'Modern Web Development Practices',
    //       publisher: 'Tech Journal',
    //       url: 'https://techjournal.com/article',
    //       publicationDate: '2022-09-01T00:00:00.000Z',
    //       description: 'Article about best practices in modern web development',
    //     },
    //   ],
    //   organization: [
    //     {
    //       name: 'Vietnam Developer Community',
    //       position: 'Technical Lead',
    //       address: 'Ho Chi Minh City, Vietnam',
    //       startDate: '2021-01-01T00:00:00.000Z',
    //       endDate: '2023-12-31T00:00:00.000Z',
    //       description: 'Leading technical workshops and mentoring junior developers',
    //     },
    //   ],
    // },
    dataResume: {
      summary: '',
    } as ITemplate,
    isLoading: true,
  }),

  actions: {
    async createResume(body: any) {
      try {
        this.isLoading = true
        const { data } = await createCVApi(body)
        this.setDataResume(data)
        if (this.dataResume) {
          router.push(`/resumes/${this.dataResume?.id}`)
        }
        showToast({
          description: 'Create resumes success',
          variant: 'success',
        })
      } catch (error) {
        console.error(error)
        showToast({
          description: 'Create resumes failed',
          variant: 'destructive',
        })
        throw error
      } finally {
        this.isLoading = false
      }
    },
    async getResumeDetail(id: string) {
      try {
        const { data } = await getDetailCVApi(id)
        this.setDataResume(data)
      } catch (error) {
        console.error(error)
        showToast({
          description: 'Fetch resume detail failed',
          variant: 'destructive',
        })
        throw error
      }
    },

    async updateResume(id: string, body: ITemplate) {
      try {
        this.isLoading = true
        const { data } = await updateCVApi(id, body)
        this.setDataResume(data)
      } catch (error) {
        console.error(error)
        showToast({
          description: 'Update resumes failed',
          variant: 'destructive',
        })
        throw error
      } finally {
        this.isLoading = false
      }
    },
    updatePersonalDetails(personalDetails: ITemplate['personal_details']) {
      this.dataResume.personal_details = {
        ...this.dataResume.personal_details,
        ...personalDetails,
      }

      this.updateResume(this.dataResume.id, this.dataResume)
    },

    setDataResume(data: any) {
      const newData = { ...data }

      if (Array.isArray(newData.education)) {
        newData.education = newData.education.map((item: any) => ({
          ...item,
          start_date: item.start_date ? dayjs(item.start_date) : null,
          end_date: item.end_date ? dayjs(item.end_date) : null,
        }))
      }

      if (Array.isArray(newData.works)) {
        newData.works = newData.works.map((item: any) => ({
          ...item,
          start_date: item.start_date ? dayjs(item.start_date) : null,
          end_date: item.end_date ? dayjs(item.end_date) : null,
        }))
      }

      if (Array.isArray(newData.projects)) {
        newData.projects = newData.projects.map((item: any) => ({
          ...item,
          start_date: item.start_date ? dayjs(item.start_date) : null,
          end_date: item.end_date ? dayjs(item.end_date) : null,
        }))
      }

      if (Array.isArray(newData.certification)) {
        newData.certification = newData.certification.map((item: any) => ({
          ...item,
          issued_date: item.issued_date ? dayjs(item.issued_date) : null,
        }))
      }

      if (Array.isArray(newData.award)) {
        newData.award = newData.award.map((item: any) => ({
          ...item,
          issued_date: item.issued_date ? dayjs(item.issued_date) : null,
        }))
      }

      if (Array.isArray(newData.organization)) {
        newData.organization = newData.organization.map((item: any) => ({
          ...item,
          start_date: item.start_date ? dayjs(item.start_date) : null,
          end_date: item.end_date ? dayjs(item.end_date) : null,
        }))
      }

      this.dataResume = {
        ...this.dataResume,
        ...newData,
      }
    },

    updateSocials(socials: ITemplate['socials']) {
      this.dataResume.socials = socials
      this.updateResume(this.dataResume.id, this.dataResume)
    },

    updateSummary(summary: string) {
      this.dataResume.summary = summary
      this.updateResume(this.dataResume.id, this.dataResume)
    },

    updateSkills(skills: ITemplate['skills']) {
      this.dataResume.skills = skills
      this.updateResume(this.dataResume.id, this.dataResume)
    },

    updateWorkExperience(works: ITemplate['works']) {
      this.dataResume.works = cloneDeep(works)

      this.updateResume(this.dataResume.id, this.dataResume)
    },

    updateEducation(educations: ITemplate['education']) {
      this.dataResume.education = educations
      this.updateResume(this.dataResume.id, this.dataResume)
    },

    updateProjects(projects: ITemplate['projects']) {
      this.dataResume.projects = cloneDeep(projects)
      this.updateResume(this.dataResume.id, this.dataResume)
    },

    updateCertifications(certifications: ITemplate['certification']) {
      this.dataResume.certification = cloneDeep(certifications)
      this.updateResume(this.dataResume.id, this.dataResume)
    },

    updateLanguages(languages: ITemplate['languages']) {
      this.dataResume.languages = cloneDeep(languages)
      this.updateResume(this.dataResume.id, this.dataResume)
    },

    updateAwards(awards: ITemplate['award']) {
      this.dataResume.award = cloneDeep(awards)
      this.updateResume(this.dataResume.id, this.dataResume)
    },
    updateOrganization(organization: ITemplate['organization']) {
      this.dataResume.organization = cloneDeep(organization)
      this.updateResume(this.dataResume.id, this.dataResume)
    },
  },
  getters: {
    getResumeInfo: (state) => state.dataResume,
  },
})
