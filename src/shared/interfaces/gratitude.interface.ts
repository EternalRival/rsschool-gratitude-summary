import type { GratitudeFrom } from './gratitude-from.interface'

export interface Gratitude {
  id: number
  comment: string
  badgeId: string
  date: string
  user_id: number
  githubId: string
  firstName: string
  lastName: string
  countryName: string
  cityName: string
  activist: boolean
  from: GratitudeFrom
}
