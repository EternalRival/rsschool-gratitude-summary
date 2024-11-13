import { apiResponseRawSchema } from '~/schemas/api-response-raw.schema'
import createStudentList from './create-student-list'

const BASE_URL = 'https://app.rs.school'
const GRATITUDE_ENDPOINT = '/api/feedback/gratitude'
const PAGE_SIZE = 1e6

async function getGratitudeListRaw() {
  const url = new URL(GRATITUDE_ENDPOINT, BASE_URL)
  url.searchParams.set('pageSize', PAGE_SIZE.toString())

  const response = await fetch(url)

  return apiResponseRawSchema.parse(await response.json())
}

export default async function getGratitudesSummary() {
  // const { data } = await getGratitudeListRaw()
  const { data } =
    import.meta.env.MODE === 'development'
      ? apiResponseRawSchema.parse((await import('./mock.json')).default)
      : await getGratitudeListRaw()

  return createStudentList({ rawGratitudes: data.content }).toJSON()
}

export type Student = Awaited<ReturnType<typeof getGratitudesSummary>>[number]

export type Contributor = Student['senders' | 'receivers']['list'][number]
