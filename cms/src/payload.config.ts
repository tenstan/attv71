import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { buildConfig } from 'payload/config'
import Users from './collections/Users'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { cloudStorage } from '@payloadcms/plugin-cloud-storage'
import NewsPostMedia from './collections/NewsPostMedia'
import { azureBlobStorageAdapter } from '@payloadcms/plugin-cloud-storage/azure';
import NewsPosts from './collections/NewsPosts'
import { throwExpression } from './lib/utils'
import { getConfiguration } from './lib/configuration'

const isDevelopmentEnvironment = getConfiguration('NODE_ENV').NODE_ENV === 'development';

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  editor: lexicalEditor(),
  indexSortableFields: true,
  collections: [Users, NewsPosts, NewsPostMedia],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI ?? throwExpression('DATABASE_URI was not defined.'),
    connectOptions: {
      dbName: process.env.DATABASE_NAME
    }
  }),
  plugins: [
    cloudStorage({
      enabled: !isDevelopmentEnvironment,
      collections: {
        [NewsPostMedia.slug]: {
          adapter: azureBlobStorageAdapter({
            connectionString: isDevelopmentEnvironment ? '' : getConfiguration('AZURE_STORAGE_CONNECTION_STRING').AZURE_STORAGE_CONNECTION_STRING,
            containerName: isDevelopmentEnvironment ? '' : getConfiguration('AZURE_STORAGE_CONTAINER_NAME').AZURE_STORAGE_CONTAINER_NAME,
            allowContainerCreate: false,
            baseURL: isDevelopmentEnvironment ? '' : getConfiguration('AZURE_STORAGE_ACCOUNT_BASE_URL').AZURE_STORAGE_ACCOUNT_BASE_URL,
          }),
          disableLocalStorage: true,
        }
      }
    })
  ]
})
