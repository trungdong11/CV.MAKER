import type { ITemplate } from '@/types/template'
import { createCVApi, updateCVApi, getDetailCVApi } from '@/services/resume'
import { defineStore } from 'pinia'
import { showToast } from '@/utils/toast'
import router from '@/routers/router'
import dayjs from 'dayjs'
import { cloneDeep } from 'lodash-es'
import { v4 as uuidv4 } from 'uuid'
export const useResumeStore = defineStore({
  id: 'resume',
  state: () => ({
    cvId: uuidv4(),
    dataResume: reactive({} as ITemplate),
    isLoading: true,
    showPreview: false,
    isEditPersonal: false,
    isEditDescription: false,
    isEditSkill: false,
    isEditWork: false,
    isEditEducation: false,
    isEditProject: false,
    isEditLanguage: false,
    isEditCertification: false,
    isEditOrganization: false,
    isEditAward: false,
  }),

  actions: {
    editPersonal() {
      this.isEditPersonal = true
    },
    cancelEditPersonal() {
      this.isEditPersonal = false
    },
    editDescription() {
      this.isEditDescription = true
    },
    cancelEditDescription() {
      this.isEditDescription = false
    },
    editSkill() {
      this.isEditSkill = true
    },
    cancelEditSkill() {
      this.isEditSkill = false
    },
    editEducation() {
      this.isEditEducation = true
    },
    cancelEditEducation() {
      this.isEditEducation = false
    },
    editWork() {
      this.isEditWork = true
    },
    cancelEditWork() {
      this.isEditWork = false
    },
    editProject() {
      this.isEditProject = true
    },
    cancelEditProject() {
      this.isEditProject = false
    },
    editLanguage() {
      this.isEditLanguage = true
    },
    cancelEditLanguage() {
      this.isEditLanguage = false
    },
    editCertification() {
      this.isEditCertification = true
    },
    cancelEditCertification() {
      this.isEditCertification = false
    },
    editOrganization() {
      this.isEditOrganization = true
    },
    cancelEditOrganization() {
      this.isEditOrganization = false
    },
    editAward() {
      this.isEditAward = true
    },
    cancelEditAward() {
      this.isEditAward = false
    },
    handleCancelEdit() {
      this.isEditPersonal = false
      this.isEditDescription = false
      this.isEditSkill = false
      this.isEditWork = false
      this.isEditEducation = false
      this.isEditProject = false
      this.isEditLanguage = false
      this.isEditCertification = false
      this.isEditOrganization = false
      this.isEditAward = false
    },
    async createResume(body: any) {
      try {
        this.isLoading = true
        const { data } = await createCVApi(body)
        this.setDataResume(data)
        if (this.dataResume) {
          router.push(`/resumes/${this.dataResume?.id}`)
        }
        // showToast({
        //   description: 'Create resumes success',
        //   variant: 'success',
        // })
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
    updatePersonalDetails(
      personalDetails: ITemplate['personal_details'],
      socials: ITemplate['socials'],
    ) {
      this.dataResume.personal_details = {
        ...this.dataResume.personal_details,
        ...personalDetails,
      }

      this.dataResume.socials = socials
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

    async deleteSection(
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
      await this.updateResume(this.dataResume.id, this.dataResume)
    },

    async seedAward() {
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
      await this.updateResume(this.dataResume.id, this.dataResume)
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
          project_name: 'Project Name',
          project_link: '',
          start_date: '2022-01-01T00:00:00.000Z',
          end_date: '2022-06-30T00:00:00.000Z',
          description:
            'State your tasks and accomplishments including name of the project and position of responsibility held.',
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

    async seedSkill() {
      if (!this.dataResume.skills) {
        this.dataResume.skills = []
      }

      if (this.dataResume.skills.length === 0) {
        this.dataResume.skills.push({
          skill_category: 'Skill Category',
          list_of_skill:
            'Skill Name 1, Skill Name 2, Skill Name 3, Skill Name 4, Skill Name 5, etc',
        })
      }
      await this.updateResume(this.dataResume.id, this.dataResume)
    },

    seedSummary() {
      if (!this.dataResume.summary) {
        this.dataResume.summary = ''
      }

      if (this.dataResume.summary === '') {
        this.dataResume.summary =
          'A summary includes short, concise and targeted statements to summarize your skills and experiences. Mostly people will start with why they are here. What is the reason why they do what they do. Followed by “how” they do it and close it with “what” is the thing that they currently doing right now with respect to the ‘why’ and the ‘how’.'
      }
      this.updateResume(this.dataResume.id, this.dataResume)
    },

    async seedWork() {
      if (!this.dataResume.works) {
        this.dataResume.works = []
      }

      if (this.dataResume.works.length === 0) {
        this.dataResume.works.push({
          company_name: 'Company Name',
          is_current_working: true,
          position: 'Position',
          location: 'City, State/Country',
          start_date: '2020-01-01T00:00:00.000Z',
          end_date: '2023-12-31T00:00:00.000Z',
          description:
            'State your tasks and accomplishments including name of the project and position of responsibility held.',
        })
      }
      await this.updateResume(this.dataResume.id, this.dataResume)
    },

    async seedEducation() {
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
          gpa: 4.0,
          description: 'E.g., info about scholarships, student activity, etc.',
        })
      }
      await this.updateResume(this.dataResume.id, this.dataResume)
    },

    setShowPreview() {
      this.showPreview = true
    },
    setUnShowPreview() {
      this.showPreview = false
    },
    setCvId(val: string) {
      this.cvId = val
    },
  },
  getters: {
    getResumeInfo: (state) => state.dataResume,
    getShowPreview: (state) => state.showPreview,
  },
})
