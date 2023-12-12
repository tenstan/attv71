import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { buildConfig } from 'payload/config'
import Users from './collections/Users'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { cloudStorage } from '@payloadcms/plugin-cloud-storage'
import NewsPostMedia from './collections/NewsPostMedia'
import { azureBlobStorageAdapter } from '@payloadcms/plugin-cloud-storage/azure';
import NewsPosts from './collections/NewsPosts'

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  editor: lexicalEditor({}),
  collections: [Users, NewsPosts, NewsPostMedia],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
    connectOptions: {
      dbName: process.env.DATABASE_NAME
    }
  }),
  plugins: [
    cloudStorage({
      enabled: process.env.NODE_ENV === 'development',
      collections: {
        [NewsPostMedia.slug]: {
          adapter: azureBlobStorageAdapter({
            connectionString: process.env.AZURE_STORAGE_CONNECTION_STRING,
            containerName: process.env.AZURE_STORAGE_CONTAINER_NAME,
            allowContainerCreate: false,
            baseURL: process.env.AZURE_STORAGE_ACCOUNT_BASE_URL
          })
        }
      }
    })
  ]
})
