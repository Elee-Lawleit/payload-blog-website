import { Block } from 'payload'

// honestly, I think the code block is fine as it is, we can later extend this to support multiple languages and the user would be able to select the language from a list of dropdown
export const CodeBlock: Block = {
  slug: 'code',
  interfaceName: 'CodeBlock',
  fields: [
    {
      name: 'code',
      label: 'Add Code Content',
      type: 'code',
      required: true,
    },
  ],
}
