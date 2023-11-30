import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { slateEditor } from '@payloadcms/richtext-slate'
import { buildConfig } from 'payload/config'

import Users from './collections/Users'

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  editor: slateEditor({}),
  collections: [Users],
  db: mongooseAdapter({
    url: process.env.MONGODB_CONNECTION_STRING,
    connectOptions: {
      dbName: process.env.MONGODB_DATABASE_NAME
    }
  }),
})
