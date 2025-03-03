import { z } from 'zod'

export const createPaginatedResponseSchema = <T extends z.ZodType>(entity: T) => {
  return z.object({
    docs: z.array(entity),
    hasNextPage: z.boolean(),
    hasPrevPage: z.boolean(),
    limit: z.number(),
    page: z.number(),
    totalDocs: z.number(),
    totalPages: z.number(),
  })
}
