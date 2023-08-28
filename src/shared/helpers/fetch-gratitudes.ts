import { baseUrl, endpoint } from '../constants/constants'

export const fetchGratitudes = async () => {
  const limit = 30000
  const flows = 6
  const pageSize = `${Math.floor(limit / flows)}`
  const promises = Array.from({ length: flows }, (_, i) => {
    const url = new URL(endpoint, baseUrl)
    url.searchParams.set('current', `${i + 1}`)
    url.searchParams.set('pageSize', pageSize)
    return fetch(url, { mode: 'no-cors' })
  })
  return Promise.all(promises)
}
