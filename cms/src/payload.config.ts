import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import Navigation from './globals/Navigation'
import { entraIdOAuthPlugin } from './oauth/entra-id'
import { ApiKeys, Articles, Media, Users } from './collections'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      afterLogin: ['src/oauth/components/EntraIdLoginButton#EntraIdLoginButton'],
    },
  },
  globals: [Navigation],
  collections: [Users, Media, Articles, ApiKeys],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  serverURL: process.env.NEXT_PUBLIC_URL || 'http://localhost:3010',
  cors: [process.env.NEXT_PUBLIC_URL || 'http://localhost:3010'],
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  onInit: async (payload) => {
    if (process.env.NODE_ENV === 'development') {
      // @ts-expect-error: This module only exists in development with a Webpack alias.
      // I haven't found a good way to make Typescript aware of this module.
      const { seedDevData } = await import('database-seed')
      await seedDevData(payload)
    }
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_CONNECTION_STRING || '',
    },
  }),
  sharp,
  plugins: [entraIdOAuthPlugin],
})
