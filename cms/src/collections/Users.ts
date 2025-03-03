import { User } from 'src/payload-types'
import { createRoleField } from '../access/roles'
import { isAdmin, isLoggedIn } from '../access/validation'
import {
  generateExpiredPayloadCookie,
  type CollectionAfterLogoutHook,
  type CollectionBeforeChangeHook,
  type CollectionConfig,
} from 'payload'

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

// This hook is a hack to make logout from the Admin UI work when this application is deployed to Azure Static Web Apps.
//
// Payload normally makes logout work by expiring the `payload-token` cookie with a Set-Cookie response header.
// The cookie immediately expires when the browser receives the header, because it has an expiry date of Date.now() - 1000.
//
// Unfortunately, Azure Static Web Apps won't return Set-Cookie response headers with an expiration date before Date.now(),
// presumably due to a bug (see: https://github.com/Azure/static-web-apps/issues/1214).
// As mentioned in the link, a cookie can instead use Max-Age=0 to immediately expire the cookie,
// which is what this handler applies to the `payload-token` cookie.
const expirePayloadCookieHook: CollectionAfterLogoutHook = ({ req, collection }) => {
  let expiredCookie = generateExpiredPayloadCookie({
    collectionAuthConfig: collection.auth,
    config: req.payload.config,
    cookiePrefix: req.payload.config.cookiePrefix,
  })

  expiredCookie = expiredCookie.replace(/Expires=[^;]+/i, 'Max-Age=0')

  req.responseHeaders = req.responseHeaders ?? new Headers()
  req.responseHeaders.set('Set-Cookie', expiredCookie)

  return req
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
    afterLogout: [expirePayloadCookieHook],
  },
  fields: [createRoleField()],
}
