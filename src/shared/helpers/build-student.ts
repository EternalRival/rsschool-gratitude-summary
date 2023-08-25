import { arraySum, buildRecipients, buildSenders } from '.'
import type { Gratitude, Student } from '../interfaces'

export const buildStudent = (list: Gratitude[]) => {
  return (github: string): Student => {
    const senders = buildSenders(list)(github)
    const recipients = buildRecipients(list)(github)
    const inSum = arraySum(Array.from(senders.values()))
    const outSum = arraySum(Array.from(recipients.values()))
    return { github, inSum, outSum, senders, recipients }
  }
}
