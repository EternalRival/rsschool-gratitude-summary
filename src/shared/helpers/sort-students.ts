import type { Student } from '../interfaces'

export const sortStudents = (list: Student[], prop: 'inSum' | 'outSum') => {
  return [...list].sort((a, b) => {
    return a[prop] === b[prop] ? a.github.localeCompare(b.github) : b[prop] - a[prop]
  })
}
