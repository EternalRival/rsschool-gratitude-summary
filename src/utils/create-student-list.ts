import createStudent from './create-student'

import type { ApiResponseRaw } from '~/schemas/api-response-raw.schema'

type GratitudeRaw = ApiResponseRaw['data']['content'][number]

type Student = ReturnType<typeof createStudent>

class StudentList {
  private readonly students = new Map<string, Student>()

  constructor({ rawGratitudes }: { rawGratitudes: GratitudeRaw[] }) {
    rawGratitudes.forEach((rawGratitude) => {
      const receiverGithub = rawGratitude.githubId
      const senderGithub = rawGratitude.from.githubId

      this.addGratitude({
        type: 'senders',
        studentGithub: receiverGithub,
        contributorGithub: senderGithub,
      })
      this.addGratitude({
        type: 'receivers',
        studentGithub: senderGithub,
        contributorGithub: receiverGithub,
      })
    })
  }

  public toJSON() {
    return Array.from(this.students.values(), (value) => value.toJSON())
  }

  private addGratitude({
    type,
    studentGithub,
    contributorGithub,
  }: {
    type: 'receivers' | 'senders'
    studentGithub: string
    contributorGithub: string
  }) {
    const student = this.students.get(studentGithub) ?? createStudent({ github: studentGithub })
    student.addGratitude({ type, github: contributorGithub })
    this.students.set(studentGithub, student)
  }
}

export default function createStudentList({ rawGratitudes }: { rawGratitudes: GratitudeRaw[] }) {
  return new StudentList({ rawGratitudes })
}
