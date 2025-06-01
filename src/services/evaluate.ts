import type { BaseResponse } from '@/types/api'
import type { IEvaluate } from '@/types/evaluate'

export const getEvaluatesApi = async ({
  page = 1,
  keyword = '',
}): Promise<BaseResponse<IEvaluate[]>> => {
  return $api('/evaluate', {
    method: 'GET',
    params: {
      page,
      keyword,
    },
  })
}

export const getDetailEvaluateApi = async (id: string): Promise<BaseResponse<IEvaluate>> => {
  return $api(`/evaluate/${id}`, {
    method: 'GET',
  })
}

export const deleteEvaluateApi = async (id: string): Promise<BaseResponse<null>> => {
  return $api(`/evaluate/${id}`, {
    method: 'DELETE',
  })
}

export const createEvaluateApi = async (data: IEvaluate): Promise<BaseResponse<IEvaluate>> => {
  return $api('/evaluate', {
    method: 'POST',
    body: data,
  })
}

export const updateEvaluateApi = async (
  id: string,
  data: Partial<IEvaluate>,
): Promise<BaseResponse<IEvaluate>> => {
  return $api(`/evaluate/${id}`, {
    method: 'PUT',
    body: data,
  })
}
