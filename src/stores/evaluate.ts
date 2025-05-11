// import { getDetailRoomApi, createRoomApi, settingRoomApi } from '@/services/room'
import type { IEvaluate } from '@/types/ai'
import { showToast } from '@/utils/toast'
import { defineStore } from 'pinia'
import { apiError } from '@/utils/exceptionHandler'
import router from '@/routers/router'
import { evaluateCVApi } from '@/services/ai'

export const useEvaluateStore = defineStore({
  id: 'evaluate',
  state: () => ({
    isLoading: false,
    evaluateDetail: {} as IEvaluate,
  }),
  actions: {
    async evaluateCV(val: any) {
      try {
        this.isLoading = true
        const { data } = await evaluateCVApi(val)
        this.setDetailEvaluate(data)
      } catch (error) {
        console.error(error)
        showToast({
          description: apiError(error).message,
          variant: 'destructive',
        })
        router.push(`/evaluate/${this.evaluateDetail?.cv_id}`)
      }
    },
    setDetailEvaluate(val: IEvaluate) {
      // Object.assign(this.evaluateDetail, val)
      this.evaluateDetail = val
    },
    // async getevaluateDetail(id: string) {
    //   try {
    //     const { data } = await getDetailRoomApi(id)
    //     this.setDetailEvaluate(data)
    //   } catch (error) {
    //     console.error(error)
    //     showToast({
    //       description: 'Fetch room detail failed',
    //       variant: 'destructive',
    //     })
    //     throw error
    //   }
    // },
    // setCurrentSetting(data: any) {
    //   this.currentSetting = data
    // },
  },
  getters: {
    getEvaluateInfo: (state) => state.evaluateDetail,
  },
})
