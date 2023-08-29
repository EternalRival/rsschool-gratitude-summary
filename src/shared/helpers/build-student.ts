import { buildRecipients, buildSenders } from '.'
import type { Gratitude, Student } from '../interfaces'

export const buildStudent = (list: Gratitude[]) => {
  return (github: string): Student => {
    const senders = buildSenders(list)(github)
    const recipients = buildRecipients(list)(github)
    const inSum = senders.reduce((acc, [, counter]) => acc + counter, 0)
    const outSum = recipients.reduce((acc, [, counter]) => acc + counter, 0)
    return { github, inSum, outSum, senders, recipients }
  }
}
