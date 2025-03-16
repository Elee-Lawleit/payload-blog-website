import { Block } from 'payload'

export const CodeBlock: Block = {
  slug: 'code',
  fields: [
    {
      name: 'code',
      label: 'Add Code Content',
      type: 'code',
      required: true,
    },
  ],
}
