import type { IEvaluate } from '@/types/ai'
import { showToast } from '@/utils/toast'
import { defineStore } from 'pinia'
import { evaluateCVApi, importCVApi } from '@/services/ai'
import type { ITemplate } from '@/types/template'
import { useResumeStore } from './resume/resume'

const resumeStore = useResumeStore()

export const useEvaluateStore = defineStore({
  id: 'evaluate',
  state: () => ({
    isLoading: false,
    evaluateDetail: {} as IEvaluate,
    isCheckUpload: false,
  }),
  actions: {
    async evaluateCV(val: any) {
      try {
        this.isLoading = true
        const data = await evaluateCVApi(val)
        this.setDetailEvaluate(data)
        this.isCheckUpload = true
        showToast({
          title: 'Evaluate CV success',
          description: 'Check detail evaluate and improve your CV',
          variant: 'default',
        })
      } catch (error) {
        console.error(error)
        showToast({
          description: 'Evaluate failed',
          variant: 'destructive',
        })
      }
      this.isLoading = false
    },
    setDetailEvaluate(val: IEvaluate) {
      this.evaluateDetail = val
    },
    setResultImport(val: any) {
      resumeStore.setDataResume(val)
      console.log(val, 'check val data resume')
      console.log(resumeStore.dataResume, 'check data resume')
    },
    resetIsCheckUpload() {
      this.isCheckUpload = false
    },
    async handleImportFile(body: any) {
      this.isLoading = true
      try {
        const data = await importCVApi(body)
        this.setResultImport(data)
        showToast({
          title: 'Import CV success',
          description: 'Check your CV to improve',
          variant: 'default',
        })
      } catch (error) {
        console.error(error)
        showToast({
          description: 'Import failed',
          variant: 'destructive',
        })
        throw error
      } finally {
        this.isLoading = false
      }
    },
  },
  getters: {
    getEvaluateInfo: (state) => state.evaluateDetail,
  },
})
