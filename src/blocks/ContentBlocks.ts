import { Block } from 'payload'

export const ContentBlock: Block = {
  slug: 'content',
  fields: [
    {
      name: 'richText',
      label: 'Rich Text Content',
      required: true,
      type: 'richText',
    },
  ],
}
