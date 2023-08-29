import { getRecipient, getSender } from '.'
import type { Gratitude } from '../interfaces'

export const buildRecipients = (list: Gratitude[]) => (user: string) => {
  const filtered = list.filter((gratitude) => user === getSender(gratitude))

  const counters = filtered.reduce<Record<string, number>>((acc, gratitude) => {
    const recipient = getRecipient(gratitude)
    acc[recipient] = 1 + (acc[recipient] ?? 0)
    return acc
  }, {})

  const sortedCounters = Object.entries(counters).sort(([nameA, counterA], [nameB, counterB]) => {
    return counterA === counterB ? nameA.localeCompare(nameB) : counterB - counterA
  })

  return sortedCounters
}
