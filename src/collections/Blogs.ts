import { CodeBlock } from '@/blocks/CodeBlock'
import { ContentBlock } from '@/blocks/ContentBlocks'
import { ImageBlock } from '@/blocks/ImageBlock'
import type { CollectionConfig } from 'payload'

export const Blogs: CollectionConfig = {
  slug: 'blogs',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      defaultValue: new Date(),
    },
    {
      name: 'cardImage',
      type: 'upload',
      label: 'Card Image',
      required: true,
      relationTo: 'media',
      admin: {
        description:
          'A thumbnail image (320x180) that appears when blogs are being shown in a list with other blogs.',
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      required: true,
      // whenever we add a block, it's automaitcally related the the container/parent
      // so we don't have to define a relationship field inside the block itself
      blocks: [ImageBlock, ContentBlock, CodeBlock],
    },
  ],
}
