import { baseUrl, endpoint } from '../constants/constants'

export const fetchGratitudes = async (): Promise<Response> => {
  const query = { pageSize: '99999' }
  const url = new URL(endpoint, baseUrl)
  Object.entries(query).forEach((query) => url.searchParams.set(...query))
  return fetch(url, { mode: 'no-cors' })
}
