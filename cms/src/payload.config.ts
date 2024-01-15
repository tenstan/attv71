import path from 'path'

import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { buildConfig } from 'payload/config'
import Users from './collections/Users'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { cloudStorage } from '@payloadcms/plugin-cloud-storage'
import NewsPostMedia from './collections/NewsPostMedia'
import { azureBlobStorageAdapter } from '@payloadcms/plugin-cloud-storage/azure';
import NewsPosts from './collections/NewsPosts'
import { getConfiguration } from './lib/configuration'
import ApiKeys from './collections/ApiKeys'

const configuration = getConfiguration();
const isDevelopmentEnvironment = configuration.NODE_ENV === 'development';

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  editor: lexicalEditor(),
  indexSortableFields: true,
  collections: [Users, NewsPosts, NewsPostMedia, ApiKeys],
  db: mongooseAdapter({
    url: configuration.DATABASE_URI || '',
    connectOptions: {
      dbName: configuration.DATABASE_NAME
    }
  }),
  plugins: [
    cloudStorage({
      enabled: !isDevelopmentEnvironment,
      collections: {
        [NewsPostMedia.slug]: {
          adapter: azureBlobStorageAdapter({
            connectionString: configuration.AZURE_STORAGE_CONNECTION_STRING || '',
            containerName: configuration.AZURE_STORAGE_CONTAINER_NAME || '',
            allowContainerCreate: false,
            baseURL: configuration.AZURE_STORAGE_ACCOUNT_BASE_URL || '',
          }),
          disableLocalStorage: true,
        }
      }
    })
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
})
