import { useRuntimeConfig } from '#imports'
import { defineEventHandler } from 'h3'
import { type NavigationApiResponse, navigationApiResponseSchema } from '~/shared/models/api/navigation'

export default defineEventHandler(async (): Promise<NavigationApiResponse> => {
  const config = useRuntimeConfig()

  const response = await $fetch<unknown>(`${config.cmsBaseUrl}/api/globals/navigation`, {
    headers: {
      Authorization: `api-keys API-Key ${config.cmsApiKey}`,
    },
  })

  return navigationApiResponseSchema.parse(response)
})
