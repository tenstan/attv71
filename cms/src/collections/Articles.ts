import { ContentBlock } from 'src/blocks/ContentBlock'
import { isLoggedIn, isAuthor } from '../access/validation'
import type { CollectionConfig } from 'payload'
import { MediaBlock } from 'src/blocks/MediaBlock'

export const Articles: CollectionConfig<'articles'> = {
  slug: 'articles',
  labels: {
    singular: 'Article',
    plural: 'Articles',
  },
  access: {
    read: isLoggedIn,
    create: isAuthor,
    update: isAuthor,
    delete: isAuthor,
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
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [ContentBlock, MediaBlock],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'Content',
        },
      ],
    },
    {
      name: 'datePublished',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
