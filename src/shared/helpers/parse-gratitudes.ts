import type { Gratitude } from '../interfaces/gratitude.interface'

export const parseGratitudes = async (response: Response): Promise<Gratitude[]> => {
  const json = await response.json()
  return json.data.content
}
