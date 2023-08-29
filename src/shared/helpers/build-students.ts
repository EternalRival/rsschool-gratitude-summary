import { buildStudent, getRecipient, getSender } from '.'
import type { Gratitude, Student } from '../interfaces'

export const buildStudents = (list: Gratitude[]) => {
  const hashMap = list.reduce<Map<string, Student>>((acc, gratitude) => {
    const [recipient, sender] = [getRecipient(gratitude), getSender(gratitude)]
    if (!acc.has(recipient)) acc.set(recipient, buildStudent(list)(recipient))
    if (!acc.has(sender)) acc.set(sender, buildStudent(list)(sender))
    return acc
  }, new Map())
  return Array.from(hashMap.values())
}
