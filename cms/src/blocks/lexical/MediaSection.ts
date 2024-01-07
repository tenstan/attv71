import { Block } from "payload/types"
import NewsPostMedia from "../../collections/NewsPostMedia"

type MediaCollectionSlug = typeof NewsPostMedia.slug;

export const createMediaSectionBlock = (mediaCollectionSlug: MediaCollectionSlug): Block => {
  return {
    slug: `${mediaCollectionSlug}-media-section`,
    fields: [
      {
        name: 'images',
        fields: [
          {
            name: 'image',
            type: 'upload',
            relationTo: mediaCollectionSlug,
          }
        ],
        type: 'array',
        minRows: 1,
        maxRows: 3,
      },
      {
        name: 'size',
        type: 'radio',
        options: [
          {
            label: 'Normal',
            value: 'normal'
          },
          {
            label: 'Wide',
            value: 'wide'
          },
          {
            label: 'Fullscreen',
            value: 'fullscreen'
          },
        ],
        defaultValue: 'normal',
        admin: {
          layout: 'horizontal'
        },
      }
    ]
  }
}