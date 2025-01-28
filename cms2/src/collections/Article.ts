import { isLoggedIn, isWriter } from '@/access/validation'
import { createGalleryBlock } from '@/lexical/blocks/GalleryBlock'
import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'

export const Articles: CollectionConfig = {
  slug: 'articles',
  labels: {
    singular: 'Article',
    plural: 'Articles',
  },
  access: {
    read: isLoggedIn,
    create: isWriter,
    update: isWriter,
    delete: isWriter,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'datePublished'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      maxLength: 40,
      required: true,
    },
    {
      name: 'datePublished',
      type: 'date',
      defaultValue: () => new Date(),
      required: true,
      admin: {
        date: {
          displayFormat: 'dd-MM-yyyy',
        },
      },
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          BlocksFeature({
            blocks: [createGalleryBlock('media')],
          }),
        ],
      }),
    },
  ],
}
