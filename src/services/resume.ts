import type { BaseResponse } from '@/types/api'
import type { ITemplate } from '@/types/template'

export const getCVsApi = async ({ page = 1, keyword = '' }): Promise<BaseResponse<ITemplate[]>> => {
  return $api('/cv', {
    method: 'GET',
    params: {
      page,
      keyword,
    },
  })
}

export const getDetailCVApi = async (id: string): Promise<BaseResponse<ITemplate>> => {
  return $api(`/cv/${id}`, {
    method: 'GET',
  })
}

export const deleteCVApi = async (id: string): Promise<BaseResponse<null>> => {
  return $api(`/cv/${id}`, {
    method: 'DELETE',
  })
}

export const createCVApi = async (data: ITemplate): Promise<BaseResponse<ITemplate>> => {
  return $api('/cv', {
    method: 'POST',
    body: data,
  })
}

export const updateCVApi = async (
  id: string,
  data: Partial<ITemplate>,
): Promise<BaseResponse<ITemplate>> => {
  return $api(`/cv/${id}`, {
    method: 'PUT',
    body: data,
  })
}
