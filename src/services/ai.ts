import type { BaseResponse } from '@/types/api'
import type { Quiz } from '@/types/question'
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

export const evaluateCVApi = async (data: any): Promise<BaseResponse<IEvaluate>> => {
  return $api('/upload_cv', {
    method: 'POST',
    body: data,
    baseURL: config.evaluateEndpoint,
  })
}
