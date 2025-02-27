import { createRoleField } from '../access/roles'
import { isAdmin, isLoggedIn } from '../access/validation'
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    disableLocalStrategy: true,
  },
  access: {
    read: isLoggedIn,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  admin: {
    useAsTitle: 'email',
  },
  fields: [createRoleField()],
}
