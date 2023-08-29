import { getRecipient, getSender } from '.'
import type { Gratitude } from '../interfaces'

export const buildSenders = (list: Gratitude[]) => (user: string) => {
  const filtered = list.filter((gratitude) => user === getRecipient(gratitude))

  const counters = filtered.reduce<Record<string, number>>((acc, gratitude) => {
    const sender = getSender(gratitude)
    acc[sender] = 1 + (acc[sender] ?? 0)
    return acc
  }, {})

  const sortedCounters = Object.entries(counters).sort(([nameA, counterA], [nameB, counterB]) => {
    return counterA === counterB ? nameA.localeCompare(nameB) : counterB - counterA
  })

  return sortedCounters
}
