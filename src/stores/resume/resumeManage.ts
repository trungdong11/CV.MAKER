import { getCVsApi, getDetailCVApi, deleteCVApi } from '@/services/resume'
import type { ITemplate } from '@/types/template'
import { showToast } from '@/utils/toast'
import { defineStore } from 'pinia'
import { useEvaluateStore } from '@/stores/evaluate'
const evaluateStore = useEvaluateStore()
const { evaluateCV } = evaluateStore
// import router from '@/routers/router'
// import { apiError } from '@/utils/exceptionHandler'
import type { IPaging } from '@/types'

export const useResumeManageStore = defineStore({
  id: 'resumeManage',
  state: () => ({
    resumeInfo: {} as ITemplate,
    isUpdating: false,
    isFetching: false,
    resumes: [] as ITemplate[],
    resumeMeta: null as IPaging | null,
  }),
  actions: {
    setIsUpdating(val: boolean) {
      this.isUpdating = val
    },
    setResumeInfo(val: ITemplate) {
      this.resumeInfo = val
    },
    async fetchResumes({ page = 1, keyword = '' }: { page?: number; keyword?: string } = {}) {
      try {
        this.isFetching = true
        const { data, meta } = await getCVsApi({ page, keyword })
        this.resumes = data
        this.resumeMeta = meta as IPaging
      } catch (error) {
        console.error(error)
        showToast({
          description: 'Fetch resumes failed',
          variant: 'destructive',
        })
        throw error
      } finally {
        this.isFetching = false
      }
    },
    async getResumeDetail(id: string) {
      try {
        const { data } = await getDetailCVApi(id)
        // this.setResumeInfo(data)
        this.resumeInfo = data
      } catch (error) {
        console.error(error)
        showToast({
          description: 'Fetch resume detail failed',
          variant: 'destructive',
        })
        throw error
      }
    },
    async deleteResume(id: string) {
      try {
        await deleteCVApi(id)
        this.resumes = this.resumes.filter((resume) => resume.id !== id)
        showToast({
          description: 'Delete resume successfully',
        })
      } catch (error) {
        console.error(error)
        showToast({
          description: 'Delete resume failed',
          variant: 'destructive',
        })
      }
    },
    async handleRawEvaluate(id: string) {
      await this.getResumeDetail(id)
      await evaluateCV(this.resumeInfo, 'local')
    },
  },
  getters: {
    getResumeInfo: (state) => state.resumeInfo,
    getIsUpdating: (state) => state.isUpdating,
    getResumes: (state) => state.resumes,
    getResumeMeta: (state) => state.resumeMeta,
    getIsFetching: (state) => state.isFetching,
  },
})
