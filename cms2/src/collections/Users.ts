import { User } from 'src/payload-types'
import { createRoleField } from '../access/roles'
import { isAdmin, isLoggedIn } from '../access/validation'
import type { CollectionBeforeChangeHook, CollectionConfig } from 'payload'

const setAdminRoleForFirstEverUserHook: CollectionBeforeChangeHook<User> = async ({
  req,
  data,
  operation,
}) => {
  if (operation !== 'create') {
    return data
  }

  const existingUsers = await req.payload.find({
    collection: Users.slug,
    limit: 1,
  })

  if (existingUsers.totalDocs > 0) {
    return data
  }

  if (!data.roles) {
    data.roles = ['admin']
  } else if (!data.roles.includes('admin')) {
    data.roles.push('admin')
  }

  return data
}

export const Users: CollectionConfig & { slug: 'users' } = {
  slug: 'users',
  auth: {
    // Auth is handled with Microsoft Entra ID (see src/oauth/entra-id.ts)
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
  hooks: {
    beforeChange: [setAdminRoleForFirstEverUserHook],
  },
  fields: [createRoleField()],
}
