import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import {  CollectionAfterReadHook, CollectionConfig } from 'payload/types'
import { isCreator, isLoggedIn } from '../access/validation'
import { createMediaSectionBlock } from '../lexical/blocks/MediaSection'
import ReadMoreBlock from '../lexical/blocks/ReadMore'
import { NewsPost } from 'payload/generated-types'
import payload from 'payload'

const transformNewsPostWithReadMoreBlockHook: CollectionAfterReadHook<NewsPost> = ({ req, doc }) => {
  if (!doc.content) {
    return doc;
  }

  const readMoreBlockIndex = doc.content?.root.children.findIndex(node => node.type === 'block' && (node.fields as any).blockType === 'lexical-read-more');

  if (readMoreBlockIndex === undefined) {
    return doc;
  }

  if (req.query.preview === 'true') {
    doc.content.root.children = doc.content.root.children.slice(0, readMoreBlockIndex + 1);
  }
  else {
    doc.content.root.children.splice(readMoreBlockIndex, 1);
  }

  return doc;
}

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
  hooks: {
    afterRead: [
      transformNewsPostWithReadMoreBlockHook
    ]
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
              createMediaSectionBlock('news-post-media'),
              ReadMoreBlock
            ]
          })
        ]
      }),
    },
  ]
}

export default NewsPosts
