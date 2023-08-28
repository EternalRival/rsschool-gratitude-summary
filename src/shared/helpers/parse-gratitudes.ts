import { baseUrl, endpoint } from '../constants/constants'
import type { Gratitude } from '../interfaces/gratitude.interface'

export const parseGratitudes = async (response: Response): Promise<Gratitude[]> => {
  const json = await response.json()
  const { content } = json.data
  return content
}
