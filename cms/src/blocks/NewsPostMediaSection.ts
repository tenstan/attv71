import { Block } from 'payload/types';
import NewsPostMedia from '../collections/NewsPostMedia';

const NewsPostMediaSection: Block = {
  slug: 'news-post-media-section',
  fields: [
    {
      name: 'images',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: NewsPostMedia.slug,
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

export default NewsPostMediaSection;