
export interface NewsPost {
  id: string;
  title: string;
  datePublished: string;
  content: {
    root: {
      type: 'root'
      children: (ParagraphNode | NewsPostMediaSectionNode | OrderedListNode | ReadMoreNode)[]
    }
  }
}

export interface ParagraphNode {
  type: 'paragraph'
  children: [
    {
      text: string
      type: 'text'
    }
  ]
}

export interface NewsPostMediaSectionNode {
  type: 'block'
  fields: {
    blockType: 'lexical-media-section'
    size: 'normal' | 'wide' | 'fullscreen'
    images: {
      id: string
      image: {
        filename: string;
        mimeType: string;
        width: number;
        height: number;
        createdAt: string;
        updatedAt: string;
        url: string;
      }
    }[]
  }
}

export interface ReadMoreNode {
  type: 'block'
  fields: {
    blockType: 'lexical-read-more'
  }
}

export interface OrderedListNode {
  type: 'list'
  listType: 'number'
  start: number; // Starting list number
  children: {
    text: string;
    type: 'text';
  }[]
}