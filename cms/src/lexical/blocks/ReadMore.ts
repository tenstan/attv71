import { Block } from "payload/types";

// TODO: Make this a Lexical Feature for better control over how it could be used (e.g. only 1 instance should be present per editor)
const ReadMoreBlock: Block = {
  slug: 'lexical-read-more',
  labels: {
    singular: 'Read more',
    plural: 'Read more'
  },
  fields: []
}

export default ReadMoreBlock