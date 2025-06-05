import type { BaseResponse } from '@/types/api'
import { config } from '@/api/config'
import type { IEvaluate } from '@/types/evaluate'

//AI model
export const evaluateCVApi = async (data: any): Promise<BaseResponse<IEvaluate>> => {
  return $api('/cv/score', {
    method: 'POST',
    body: data,
    baseURL: config.evaluateEndpoint,
  })
}

export const evaluateLocalCVApi = async (data: any): Promise<BaseResponse<IEvaluate>> => {
  return $api('/cv/score-local', {
    method: 'POST',
    body: data,
    baseURL: config.evaluateEndpoint,
  })
}

export const importCVApi = async (data: any): Promise<BaseResponse<any>> => {
  return $api('/document/process', {
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
