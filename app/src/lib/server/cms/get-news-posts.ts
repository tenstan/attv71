
import { getServerConfiguration } from '../configuration';
import type { NewsPost as CmsNewsPost } from './types/news-posts';

export const getNewsPosts = async (skFetch: typeof fetch): Promise<NewsPost[]> => {
  const configuration = getServerConfiguration();

  const res = await skFetch(`${configuration.CMS_BASE_URL}api/news-posts?depth=5`, {
    headers: {
      'Authorization': `api-keys API-Key ${configuration.CMS_API_KEY}`
    }
  })

  const responseContent = await res.json() as GetResponse<CmsNewsPost>;
  
  return responseContent.docs.map(doc => {

    return {
      title: doc.title,
      datePublished: new Date(doc.datePublished),
      nodes: doc.content.root.children.map(node => {
        if (node.type === 'paragraph') {
          return { text: node.children[0]?.text, type: 'paragraph' } satisfies Paragraph
        }
        else if (node.type === 'block') {
          if (node.fields.blockType === 'lexical-media-section') {
            return { 
              size: node.fields.size,
              type: 'image-section',
              images: node.fields.images.map(image => ({
                source: image.image.url,
                alt: image.image.filename
              }))
            } satisfies ImageSection
          }
        }
        else if (node.type === 'list') {
          return {
            type: 'ordered-list',
            items: node.children.map(item => ({
              text: item.text
            }))
          } satisfies OrderedList
        }
  
        throw new Error('Could not recognize node type.')
      })
    }
  })
}

export interface NewsPost {
  title: string;
  datePublished: Date;
  nodes: (Paragraph | ImageSection | OrderedList)[]
}

interface Paragraph {
  type: 'paragraph';
  text: string;
}

interface ImageSection {
  type: 'image-section'
  size: 'normal' | 'wide' | 'fullscreen'
  images: {
    alt: string;
    source: string;
  }[]
}

interface OrderedList {
  type: 'ordered-list'
  items: {
    text: string;
  }[]
}