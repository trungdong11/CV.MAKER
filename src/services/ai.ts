import type { BaseResponse } from '@/types/api'
// import type { Quiz } from '@/types/question'
import { config } from '@/api/config'
import type { IEvaluate } from '@/types/ai'

interface Option {
  numberOfQuestion?: number
  theme: string
  quizTypes: Array<string>
}

export const createQuizUseAIApi = async (
  model: string,
  language: string,
  option: Option,
  quizzes: string[],
): Promise<BaseResponse<Quiz[]>> => {
  return $api('/quizzfly/quizzes/generate-by-ai', {
    method: 'POST',
    body: {
      model,
      language,
      option,
      quizzes,
    },
  })
}

export interface Model {
  name: string
  value: string
  logo: string
  premium: boolean
}

export const getModelList = async (): Promise<Model[]> => {
  return $api(`https://hinam.nuxt.dev/api/ai/models`, {
    method: 'GET',
  })
}

//AI model
export const evaluateCVApi = async (data: any): Promise<BaseResponse<IEvaluate>> => {
  return $api('/cv/score', {
    method: 'POST',
    body: data,
    baseURL: config.evaluateEndpoint,
  })
}

export const summaryAIApi = async (data: string): Promise<BaseResponse<any>> => {
  return $api('/gemini/summary', {
    method: 'POST',
    body: data,
  })
}

export const enhanceTextAIApi = async (data: string): Promise<BaseResponse<any>> => {
  return $api('/gemini/enhance-text', {
    method: 'POST',
    body: data,
  })
}

export const fixTextAIApi = async (data: string): Promise<BaseResponse<any>> => {
  return $api('/gemini/fix-text', {
    method: 'POST',
    body: data,
  })
}
