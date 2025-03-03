import { z } from 'zod'
import { lexicalRichTextSchema } from './lexical-rich-text'
import { createPaginatedResponseSchema } from './paginated-response'

const contentBlockSchema = z.object({
  id: z.string(),
  blockType: z.literal('contentBlock'),
  columns: z.array(
    z.object({
      id: z.string(),
      size: z.enum(['full', 'half', 'oneThird', 'twoThirds']),
      richText: lexicalRichTextSchema,
    }),
  ),
})

const mediaBlockSchema = z.object({
  id: z.string(),
  blockType: z.literal('mediaBlock'),
  media: z.object({
    id: z.number(),
    alt: z.string(),
    url: z.string(),
    filename: z.string(),
    mimeType: z.string(),
    filesize: z.number(),
    width: z.number(),
    height: z.number(),
  }),
})

export const articleSchema = z.object({
  id: z.number(),
  title: z.string(),
  layout: z.array(z.discriminatedUnion('blockType', [contentBlockSchema, mediaBlockSchema])),
})

export const articlesApiResponseSchema = createPaginatedResponseSchema(articleSchema)

export type ArticlesApiResponse = z.infer<typeof articlesApiResponseSchema>
export type Article = z.infer<typeof articleSchema>
export type ContentBlock = z.infer<typeof contentBlockSchema>
export type MediaBlock = z.infer<typeof mediaBlockSchema>
