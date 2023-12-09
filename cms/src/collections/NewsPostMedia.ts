import { CollectionConfig } from "payload/types";

const isDevelopment = process.env.NODE_ENV === 'development'

const NewsPostMedia: CollectionConfig = {
  slug: 'news-post-media',
  fields: [],
  upload: {
    staticURL: '/news-post-media',
    staticDir: '../media',
    disableLocalStorage: !isDevelopment,
    mimeTypes: [ 'image/*' ]
  }
}

export default NewsPostMedia;