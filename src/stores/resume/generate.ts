import { summaryAIApi, enhanceTextAIApi, fixTextAIApi } from '@/services/ai'
import { showToast } from '@/utils/toast'
import { defineStore } from 'pinia'

export const useGenerateStore = defineStore({
  id: 'generate',
  state: () => ({
    summaryInfo: [] as any,
    enhanceText: '' as string,
    fixText: '' as string,
    fixingDescription: false,
    generatingSummary: false,
    enhancingDescription: false,
  }),
  actions: {
    setSummaryInfo(val: any) {
      this.summaryInfo = { ...this.summaryInfo, ...val }
    },
    setEnhanceText(val: string) {
      this.enhanceText = val
    },
    setFixText(val: string) {
      this.fixText = val
    },
    async handleGenerateSummary(body: any) {
      try {
        this.generatingSummary = true
        const { data } = await summaryAIApi(body)
        this.setSummaryInfo(data.content)
        this.fixText = ''
        this.enhanceText = ''
      } catch (error) {
        console.error(error)
        showToast({
          description: 'Generate summary failed',
          variant: 'destructive',
        })
        throw error
      } finally {
        this.generatingSummary = false
      }
    },
    async enhanceDescription(body: any) {
      try {
        this.enhancingDescription = true
        const { data } = await enhanceTextAIApi(body)
        this.setEnhanceText(data?.enhanced_text)
        this.fixText = ''
      } catch (error) {
        console.error(error)
        showToast({
          description: 'Enhance description failed',
          variant: 'destructive',
        })
        throw error
      } finally {
        this.enhancingDescription = false
      }
    },
    async fixDescription(body: any) {
      try {
        this.fixingDescription = true
        const { data } = await fixTextAIApi(body)
        this.setFixText(data?.fixed_text)
        this.enhanceText = ''
      } catch (error) {
        console.error(error)
        showToast({
          description: 'Fix description failed',
          variant: 'destructive',
        })
        throw error
      } finally {
        this.fixingDescription = false
      }
    },
  },
  getters: {
    getSummaryInfo: (state) => state.summaryInfo,
    getEnhanceText: (state) => state.enhanceText,
    getFixText: (state) => state.fixText,
    getGeneratingSummary: (state) => state.generatingSummary,
    getEnhancingDescription: (state) => state.enhancingDescription,
    getFixingDescription: (state) => state.fixingDescription,
  },
})
