interface TextNode extends Node<'text'> {
  text: string;
}

interface ParagraphNode extends Node<'paragraph'> {
  children: (TextNode)[]
}

interface MediaBlockNode extends BlockNode<'media-block'> {
  fields: {
    data: {
      blockType: 'media-block';
      images: Image[];
    }
  }
}

interface Image {
  image: {
    filename: string;
    mimeType: string;
    filesize: number;
    width: number;
    height: number;
    url: string;
  }
}

export interface Node<TType extends NodeType> {
  type: TType;
}

export interface BlockNode<TBlockNodeType extends BlockNodeType> extends Node<'block'> {
  fields: {
    data: {
      blockType: TBlockNodeType;
    }
  }
}

export interface BlogPost {
  id: string;
  title: string;
  datePublished: string;
  content: {
    root: {
      type: 'root',
      children: (MediaBlockNode | ParagraphNode)[]
    }
  }
}


type BlockNodeType = 'media-block';
type NodeType = 'paragraph' | 'block' | 'text';

const isMediaBlockNode = (node: BlockNode<BlockNodeType> ): node is MediaBlockNode => {
  if (node.type === 'block' && node.fields.data.blockType === 'media-block') {
    return true;
  }

  return false;
}