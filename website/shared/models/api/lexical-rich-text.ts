import { z } from 'zod'

const textNodeSchema = z.object({
  type: z.literal('text'),
  text: z.string(),
})

const paragraphNodeSchema = z.object({
  type: z.literal('paragraph'),
  children: z.array(textNodeSchema),
})

const listItemNodeSchema = z.object({
  type: z.literal('listitem'),
  value: z.number(),
  children: z.array(textNodeSchema),
})

const listNodeSchema = z.object({
  type: z.literal('list'),
  start: z.number(),
  tag: z.enum(['ol', 'ul']),
  children: z.array(listItemNodeSchema),
})

export const lexicalRichTextSchema = z.object({
  root: z.object({
    type: z.literal('root'),
    children: z.array(z.discriminatedUnion('type', [paragraphNodeSchema, listNodeSchema])),
  }),
})

export type RichText = z.infer<typeof lexicalRichTextSchema>
export type ParagraphNode = z.infer<typeof paragraphNodeSchema>
export type TextNode = z.infer<typeof textNodeSchema>
export type ListNode = z.infer<typeof listNodeSchema>
export type ListItemNode = z.infer<typeof listItemNodeSchema>
