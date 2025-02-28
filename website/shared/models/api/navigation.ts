import { z } from 'zod'

export const navigationApiResponseSchema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      href: z.string(),
      children: z.array(
        z.object({
          id: z.string(),
          name: z.string(),
          href: z.string(),
        }),
      ),
    }),
  ),
})

export type NavigationApiResponse = z.infer<typeof navigationApiResponseSchema>
