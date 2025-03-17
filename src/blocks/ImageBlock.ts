import { Block } from 'payload'

export const ImageBlock: Block = {
  slug: 'image',
  interfaceName: 'ImageBlock',
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      // forgot to add this previously
      required: true,
    },
  ],
}
