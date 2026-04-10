import {defineArrayMember, defineField, defineType} from 'sanity'
import {MdHome as icon} from 'react-icons/md'
import {ConditionalArray} from '../component/ConditionalArray'
import {ArrayItem} from '../component/ArrayItem'

export default defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  icon,
  groups: [
    {name: 'content', title: 'Content'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'navigation',
      title: 'Navigation',
      type: 'array',
      group: 'content',
      components: {
        input: ConditionalArray,
      },
      of: [
        defineArrayMember({
          type: 'object',
          components: {
            item: ArrayItem,
          },
          fields: [
            defineField({
              name: 'internal',
              title: 'Internal reference',
              type: 'string',
              description: 'Target identifier or path used by the front end',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      readOnly: true,
      group: 'content',
    }),
    defineField({
      name: 'baseLanguage',
      title: 'Base language',
      type: 'string',
      readOnly: true,
      group: 'content',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      group: 'content',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'internationalizedArrayString',
          description: 'Per-locale descriptions for screen readers and broken-image fallback',
        }),
      ],
    }),
    defineField({
      name: 'market',
      title: 'Market',
      type: 'string',
      readOnly: true,
      group: 'content',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      market: 'market',
      media: 'image',
    },
    prepare({title, market, media}) {
      return {
        title: title || 'Home',
        subtitle: market || undefined,
        media,
      }
    },
  },
})
