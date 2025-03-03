import { CollectionConfig } from 'payload'
import { createRoleField } from 'src/access/roles'
import { isAdmin } from 'src/access/validation'

export const ApiKeys: CollectionConfig = {
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
  access: {
    read: isAdmin,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name'],
  },
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      maxLength: 50,
      required: true,
      unique: true,
      admin: {
        description: 'What is this API key for?',
      },
    },
    createRoleField(),
  ],
}
