import {defineField, defineType} from 'sanity'
import {ConditionalArray} from '../component/ConditionalArray'
import {ArrayItem} from '../component/ArrayItem'

export default defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  groups: [
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'navigation',
      title: 'Navigation',
      type: 'array',
      components: {
        input: ConditionalArray,
      },
      of: [
        {
          type: 'object',
          components: {
            item: ArrayItem,
          },
          fields: [{type: 'string', name: 'internal'}],
        },
      ],
      group: 'content',
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
      title: 'Base Language',
      type: 'string',
      readOnly: true,
      group: 'content',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt',
          type: 'internationalizedArrayString',
        }),
      ],
      group: 'content',
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
    select: {title: 'title', subtitle: 'market'},
  },
})
