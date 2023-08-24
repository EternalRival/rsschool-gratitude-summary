import { baseUrl, endpoint } from '../constants/constants'
import type { Gratitude } from '../interfaces/gratitude.interface'

export const getGratitudes = async (): Promise<Gratitude[]> => {
  const query = { pageSize: '99999' }
  const url = new URL(endpoint, baseUrl)
  Object.entries(query).forEach((query) => url.searchParams.set(...query))

  return fetch(url)
    .then((res) => res.json())
    .then((json) => json.data.content)
}
