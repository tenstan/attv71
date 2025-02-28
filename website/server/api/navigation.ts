import { useRuntimeConfig } from '#imports'
import { defineEventHandler } from 'h3'
import { navigationApiResponseSchema } from '~/shared/models/api/navigation'

export default defineEventHandler(() => {
  const config = useRuntimeConfig()

  const baseUrl = config.cmsBaseUrl
  return $fetch(`${baseUrl}/api/globals/navigation`, {
    headers: {
      Authorization: `api-keys API-Key ${config.cmsApiKey}`,
    },
    transform: (data: unknown) => navigationApiResponseSchema.parse(data),
  })
})
