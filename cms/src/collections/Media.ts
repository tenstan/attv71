import type { CollectionConfig } from 'payload'

// Provide type intersection for tighter type information for consumers (so slug is not typed as 'string')
export const Media: CollectionConfig & { slug: 'media' } = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}
