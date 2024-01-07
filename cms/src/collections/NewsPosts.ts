import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { CollectionConfig } from 'payload/types'
import NewsPostMediaSection from '../blocks/NewsPostMediaSection'
import { isCreator, isLoggedIn } from '../access/access-validation'

const NewsPosts: CollectionConfig = {
  slug: 'news-posts',
  labels: {
    singular: 'News posts',
    plural: 'News posts',
  },
  access: {
    read: isLoggedIn,
    create: isCreator,
    update: isCreator,
    delete: isCreator,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: [ 'title', 'datePublished' ]
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      maxLength: 36,
      required: true
    },
    {
      name: 'datePublished',
      type: 'date',
      defaultValue: () => new Date(),
      required: true,
      admin: {
        date: {
          displayFormat: 'dd-MM-yyyy'
        }
      }
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          BlocksFeature({
            blocks: [
              NewsPostMediaSection
            ]
          })
        ]
      }),
    },
  ]
}

export default NewsPosts
