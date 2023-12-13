import { CollectionConfig } from "payload/types";

const NewsPostMedia: CollectionConfig = {
  slug: 'news-post-media',
  fields: [],
  upload: {
    staticURL: '/news-post-media',
    staticDir: '../media',
    mimeTypes: [ 'image/*' ]
  }
}

export default NewsPostMedia;