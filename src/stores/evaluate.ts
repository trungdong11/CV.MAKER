import type { IEvaluate } from '@/types/evaluate'
import {
  getEvaluatesApi,
  getDetailEvaluateApi,
  createEvaluateApi,
  updateEvaluateApi,
  deleteEvaluateApi,
} from '@/services/evaluate'
import { showToast } from '@/utils/toast'
import { defineStore } from 'pinia'
import { evaluateCVApi, importCVApi } from '@/services/ai'
import { useResumeStore } from './resume/resume'
import { v4 as uuidv4 } from 'uuid'
import type { IPaging } from '@/types'
import { sampleEvaluate } from '@/const'

const resumeStore = useResumeStore()

export const useEvaluateStore = defineStore({
  id: 'evaluate',
  state: () => ({
    isLoading: false,
    evaluateDetail: {} as IEvaluate,
    evaluatedLocal: {} as IEvaluate,
    isCheckUpload: false,
    isImportSuccess: false,
    evaluates: [] as IEvaluate[],
    evaluateMeta: null as IPaging | null,
    isFetching: false,
  }),
  actions: {
    async evaluateCV(val: any) {
      try {
        this.isLoading = true
        await this.createEvaluate(sampleEvaluate)
        const data = await evaluateCVApi(val)
        console.log(this.evaluatedLocal, 'evaluatedLocal')
        if (data && this.evaluatedLocal.id) {
          this.updateEvaluate(data)
        }
      } catch (error) {
        console.error(error)
        showToast({
          description: 'Evaluate failed',
          variant: 'destructive',
        })
      }
      this.isLoading = false
    },
    async createEvaluate(val: any) {
      try {
        const { data } = await createEvaluateApi(val)
        this.setEvaluatedLocal(data)
      } catch (error) {
        console.error(error)
        showToast({
          description: 'Create evaluate failed',
          variant: 'destructive',
        })
      }
    },
    async updateEvaluate(val: any) {
      try {
        await updateEvaluateApi(this.evaluatedLocal.id, val)
        showToast({
          title: 'Evaluate CV success',
          description: 'Check detail evaluate and improve your CV',
          variant: 'success',
        })
      } catch (error) {
        console.error(error)
        showToast({
          description: 'Update evaluate failed',
          variant: 'destructive',
        })
      }
    },
    async fetchResumes({ page = 1, keyword = '' }: { page?: number; keyword?: string } = {}) {
      try {
        this.isFetching = true
        const { data, meta } = await getEvaluatesApi({ page, keyword })
        this.evaluates = data
        this.evaluateMeta = meta as IPaging
      } catch (error) {
        console.error(error)
        showToast({
          description: 'Fetch evaluates failed',
          variant: 'destructive',
        })
        throw error
      } finally {
        this.isFetching = false
      }
    },
    async getDetailEvaluate(id: string) {
      try {
        const { data } = await getDetailEvaluateApi(id)
        this.setDetailEvaluate(data)
      } catch (error) {
        console.error(error)
        showToast({
          description: 'Get detail evaluate failed',
          variant: 'destructive',
        })
      }
    },
    async deleteEvaluate(id: string) {
      try {
        await deleteEvaluateApi(id)
        showToast({
          description: 'Delete evaluate success',
          variant: 'success',
        })
      } catch (error) {
        console.error(error)
        showToast({
          description: 'Delete evaluate failed',
          variant: 'destructive',
        })
      }
    },
    setDetailEvaluate(val: any) {
      this.evaluateDetail = val
    },
    setEvaluatedLocal(val: any) {
      this.evaluatedLocal = val
    },
    setResultImport(val: any) {
      resumeStore.setDataResume(val)
      resumeStore.setCvId(uuidv4())
    },
    resetIsCheckUpload() {
      this.isCheckUpload = false
    },
    resetIsImportSuccess() {
      this.isImportSuccess = false
    },
    handleAddSampleEvaluate() {
      this.evaluates.push(sampleEvaluate as IEvaluate)
    },
    async handleImportFile(body: any) {
      this.isLoading = true
      try {
        const data = await importCVApi(body)
        this.setResultImport(data)
        showToast({
          title: 'Import CV success',
          description: 'Check your CV to improve',
          variant: 'success',
        })
        this.isImportSuccess = true
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
