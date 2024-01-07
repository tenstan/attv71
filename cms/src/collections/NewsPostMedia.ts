import { CollectionConfig } from "payload/types";
import { isCreator, isLoggedIn } from "../access/access-validation";

const NewsPostMedia: CollectionConfig = {
  slug: 'news-post-media',
  labels: {
    singular: 'News post media',
    plural: 'News post media'
  },
  access: {
    read: isLoggedIn,
    create: isCreator,
    update: isCreator,
    delete: isCreator, 
  },
  fields: [],
  upload: {
    staticURL: '/news-post-media',
    staticDir: '../media',
    mimeTypes: [ 'image/*' ]
  }
}

export default NewsPostMedia;