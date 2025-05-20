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
    showPreview: false,
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

    deleteSection(
      section:
        | 'education'
        | 'works'
        | 'projects'
        | 'certification'
        | 'award'
        | 'organization'
        | 'languages'
        | 'skills',
    ) {
      this.dataResume[section] = []
      // remove property from dataResume
      this.updateResume(this.dataResume.id, this.dataResume)
    },

    seedAward() {
      if (!this.dataResume.award) {
        this.dataResume.award = []
      }

      if (this.dataResume.award.length === 0) {
        this.dataResume.award.push({
          award_title: 'Best Paper Award',
          award_title_link: 'https://example.com/award',
          issued_by: '',
          issued_date: '2023-01-01T00:00:00.000Z',
          description: 'Awarded for outstanding research in computer science.',
        })
      }
      this.updateResume(this.dataResume.id, this.dataResume)
    },

    seedCertification() {
      if (!this.dataResume.certification) {
        this.dataResume.certification = []
      }

      if (this.dataResume.certification.length === 0) {
        this.dataResume.certification.push({
          certification_name: 'AWS Certified Developer',
          issuing_organization: 'Amazon Web Services',
          issued_date: '2023-01-01T00:00:00.000Z',
          certification_link: 'https://aws.amazon.com/certification',
          credential_id: 'AWS-123456',
        })
      }
      this.updateResume(this.dataResume.id, this.dataResume)
    },

    seedPublication() {
      if (!this.dataResume.publication) {
        this.dataResume.publication = []
      }

      if (this.dataResume.publication.length === 0) {
        this.dataResume.publication.push({
          title: 'Modern Web Development Practices',
          publisher: 'Tech Journal',
          url: 'https://techjournal.com/article',
          publication_date: '2023-01-01T00:00:00.000Z',
          description: 'Article about best practices in modern web development.',
        })
      }
      this.updateResume(this.dataResume.id, this.dataResume)
    },

    seedProject() {
      if (!this.dataResume.projects) {
        this.dataResume.projects = []
      }

      if (this.dataResume.projects.length === 0) {
        this.dataResume.projects.push({
          project_name: 'E-commerce Platform',
          project_link: 'https://github.com/johndoe/ecommerce',
          start_date: '2022-01-01T00:00:00.000Z',
          end_date: '2022-06-30T00:00:00.000Z',
          description: 'Built a full-stack e-commerce platform using React and Node.js',
          is_ongoing: false,
        })
      }
      this.updateResume(this.dataResume.id, this.dataResume)
    },

    seedOrganization() {
      if (!this.dataResume.organization) {
        this.dataResume.organization = []
      }

      if (this.dataResume.organization.length === 0) {
        this.dataResume.organization.push({
          name: 'Vietnam Developer Community',
          position: 'Technical Lead',
          address: 'Ho Chi Minh City, Vietnam',
          start_date: '2021-01-01T00:00:00.000Z',
          end_date: '2023-12-31T00:00:00.000Z',
          description: 'Leading technical workshops and mentoring junior developers',
        })
      }
      this.updateResume(this.dataResume.id, this.dataResume)
    },

    seedLanguage() {
      if (!this.dataResume.languages) {
        this.dataResume.languages = []
      }

      if (this.dataResume.languages.length === 0) {
        this.dataResume.languages.push({
          language: 'English',
          proficiency: 'Fluent',
        })
      }
      this.updateResume(this.dataResume.id, this.dataResume)
    },

    seedSkill() {
      if (!this.dataResume.skills) {
        this.dataResume.skills = []
      }

      if (this.dataResume.skills.length === 0) {
        this.dataResume.skills.push({
          skill_category: 'Programming Languages',
          list_of_skill: 'JavaScript, TypeScript, Python, Java',
        })
      }
      this.updateResume(this.dataResume.id, this.dataResume)
    },

    seedWork() {
      if (!this.dataResume.works) {
        this.dataResume.works = []
      }

      if (this.dataResume.works.length === 0) {
        this.dataResume.works.push({
          company_name: 'Tech Solutions Inc.',
          is_current_working: true,
          position: 'Senior Software Engineer',
          location: 'Ho Chi Minh City, Vietnam',
          start_date: '2020-01-01T00:00:00.000Z',
          end_date: '2023-12-31T00:00:00.000Z',
          description: 'Led development of enterprise applications using React and Node.js',
        })
      }
      this.updateResume(this.dataResume.id, this.dataResume)
    },

    seedEducation() {
      if (!this.dataResume.education) {
        this.dataResume.education = []
      }

      if (this.dataResume.education.length === 0) {
        this.dataResume.education.push({
          degree: 'Bachelor of Computer Science',
          school: 'University of Technology',
          start_date: '2013-09-01T00:00:00.000Z',
          end_date: '2017-06-30T00:00:00.000Z',
          school_link: 'https://university.edu',
          city: 'Ho Chi Minh City',
          gpa: 3.8,
          description: 'Major in Software Engineering',
        })
      }
      this.updateResume(this.dataResume.id, this.dataResume)
    },
    setShowPreview() {
      this.showPreview = true
    },
    setUnShowPreview() {
      this.showPreview = false
    },
  },
  getters: {
    getResumeInfo: (state) => state.dataResume,
    getShowPreview: (state) => state.showPreview,
  },
})
