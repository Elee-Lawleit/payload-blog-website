import { Block } from 'payload'

// so my first approach was a bit shortsighted, but also a bit correct, if there is a scenario where we are providing the ability for the user to arrange the layout of their blog page, then we can have a "ContentBlock" with the rich text editor inside it.
// the user would then be able to lets say add a call to action or some other block, then the content block and then some other layout block
// or create some other configs where the content block might be the first one, or the last one etc
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
