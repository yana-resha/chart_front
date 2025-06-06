import { GetLocalitiesRequest, GetLocalitiesResponse } from '../types'
import { SERVER_PATH } from '@/shared/constants/host'
import { IBasicResponse } from '@/shared/types/api'

export const getLocalities = async ({
  value,
  language,
}: GetLocalitiesRequest): Promise<IBasicResponse<GetLocalitiesResponse>> => {
  const logTitle = '[locality api call]'
  const response = await fetch(
    `${SERVER_PATH}/locality?value=${value}` + `${language ? `&language=${language}` : ''}`,
  )
  console.log(`${logTitle} http status: ${response.status}`)
  const data = await response.json()

  return data
}
