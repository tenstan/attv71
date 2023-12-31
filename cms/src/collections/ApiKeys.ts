import { CollectionConfig } from 'payload/types'

const ApiKeys: CollectionConfig = {
  slug: 'api-keys',
  auth: {
    disableLocalStrategy: true,
    useAPIKey: true,
    verify: false,
  },
  labels: {
    singular: 'API key',
    plural: 'API keys',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name']
  },
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      maxLength: 50,
      required: true,
      admin: {
        description: 'What is this API key for?',
      }
    },
  ],
}

export default ApiKeys
