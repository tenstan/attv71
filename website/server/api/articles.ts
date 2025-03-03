import { useRuntimeConfig } from '#imports'
import { defineEventHandler } from 'h3'
import { articlesApiResponseSchema, type ArticlesApiResponse } from '~/shared/models/api/articles'

export default defineEventHandler(async (): Promise<ArticlesApiResponse> => {
  const config = useRuntimeConfig()

  const response = await $fetch<unknown>(`${config.cmsBaseUrl}/api/articles?limit=10&depth=20`, {
    headers: {
      Authorization: `api-keys API-Key ${config.cmsApiKey}`,
    },
  })

  return articlesApiResponseSchema.parse(response)
})
