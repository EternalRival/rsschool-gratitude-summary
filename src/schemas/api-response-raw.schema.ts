import { z } from 'zod'

export const apiResponseRawSchema = z.object({
  data: z.object({
    content: z.array(
      z.object({
        githubId: z.string(),
        from: z.object({
          githubId: z.string(),
        }),
      })
    ),
    count: z.string(),
  }),
})

export type ApiResponseRaw = z.infer<typeof apiResponseRawSchema>
