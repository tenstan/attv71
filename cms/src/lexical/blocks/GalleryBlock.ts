import type { Block } from 'payload'
import { Media } from '../../collections/Media'

type MediaCollectionSlug = typeof Media.slug

export const createGalleryBlock = (slug: MediaCollectionSlug): Block => {
  return {
    slug: `lexical-gallery-${slug}`,
    labels: {
      singular: 'Gallery',
      plural: 'Galeries',
    },
    fields: [
      {
        name: 'images',
        label: 'Images',
        type: 'array',
        minRows: 1,
        maxRows: 3,
        fields: [
          {
            name: 'image',
            type: 'upload',
            relationTo: slug,
          },
        ],
      },
      {
        name: 'containerWidth',
        type: 'radio',
        label: 'Container width',
        defaultValue: 'normal',
        admin: {
          layout: 'horizontal',
        },
        options: [
          {
            label: 'Normal',
            value: 'normal',
          },
          {
            label: 'Wide',
            value: 'wide',
          },
          {
            label: 'Full width',
            value: 'fullWidth',
          },
        ],
      },
    ],
  }
}
