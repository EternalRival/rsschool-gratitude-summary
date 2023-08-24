import type { Gratitude } from '../interfaces'

export const getSender = ({ from: { githubId } }: Gratitude) => githubId
