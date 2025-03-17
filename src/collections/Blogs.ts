import { BannerBlock } from '@/blocks/BannerBlock'
import { CodeBlock } from '@/blocks/CodeBlock'
import { ContentBlock } from '@/blocks/ContentBlocks'
import { ImageBlock } from '@/blocks/ImageBlock'
import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
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
    // this is how you can add "tabs" in the admin panle UI for multiple inputs
    {
      type: 'tabs',
      // define the actual content that's going to be inside the "tabs"
      tabs: [
        {
          // the label that will be displayed for the first tab
          label: 'Content',
          fields: [
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Hero Image',
            },
            {
              name: 'content',
              // it would be better to simply have all the controls inside the rich text editor, rather than having to add layout blocks everywhere
              // layout blocks and fully featured rich text editor can be used on conjunction, for example, in the helix8 project, we would need the fully featured richText section, but then for adding something like "related posts" or "list of suppliers" and sections like that, we could utilize the layout blocks feature
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({
                      // we can remove/add more, if we don't want any customization, we can not include this, duh
                      enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'],
                    }),
                    // separates tables are not created for blocks inside the richText editor btw,
                    // they are directly stored in the jsonb, the "content" field
                    BlocksFeature({ blocks: [BannerBlock, CodeBlock, ImageBlock] }),
                    // self explanatory
                    FixedToolbarFeature(),
                    // I understand what this is, but inline toolbar appears by default, so why add this here?
                    // InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                  ]
                },
              }),
              label: false,
              required: true,
            },
          ],
        },
        {
          label: 'Meta',
          fields: [
            {
              name: 'relatedBlogs',
              type: 'relationship',
              filterOptions({ id }) {
                return {
                  id: {
                    not_in: [id],
                  },
                }
              },
              hasMany: true,
              // relation to itself
              relationTo: 'blogs',
            },
            {
              name: 'categories',
              type: 'relationship',
              hasMany: true,
              relationTo: 'categories',
            },
          ],
        },
        // there should be a third tab for SEO here, we can use the SEO plugin that payload offers, but we'll worry about that later
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      defaultValue: new Date(),
    },

    // I am adding this here for the moment, but I am a little confused about the "users/admins" in applications built with payload cms (think about building something like reddit to get an idea of what I'm saying, this is for future me)
    {
      name: 'authors',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
      required: false,
    },
    // this would ideally be not a simple text input, but rather an input field filled automatically based on the title, but this is fine for now
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      required: true,
    },
    // we could still keep the layout input if we're doing both things
    // {
    //   name: 'layout',
    //   type: 'blocks',
    //   required: true,
    //   // whenever we add a block, it's automaitcally related the the container/parent
    //   // so we don't have to define a relationship field inside the block itself
    //   blocks: [ImageBlock, ContentBlock, CodeBlock],
    // },
  ],
}
