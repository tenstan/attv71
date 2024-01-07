import { CollectionConfig } from 'payload/types'
import { createRoleField } from '../access/roles'
import { isAdmin, isLoggedIn } from '../access/access-validation'

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  access: {
    read: isLoggedIn,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    createRoleField(),
  ],
}

export default Users
