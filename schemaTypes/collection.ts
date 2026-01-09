import {defineField, defineType} from 'sanity'
import {CombinedLinks} from '../component/CombinedLinks'

export default defineType({
  name: 'collection',
  title: 'Collection',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      components: {
        field: CombinedLinks,
      },
      of: [
        {
          type: 'reference',
          name: 'link',
          to: [{type: 'page'}],
        },
      ],
    }),
    defineField({
      name: 'removedLinks',
      title: 'Removed Links',
      type: 'array',
      of: [
        {
          type: 'reference',
          name: 'link',
          to: [{type: 'page'}],
        },
      ],
    }),
    defineField({
      name: 'parentCollection',
      title: 'Parent Collection',
      type: 'reference',
      to: [{type: 'collection'}],
    }),
    defineField({
      name: 'market',
      title: 'Market',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'baseLanguage',
      title: 'Base Language',
      type: 'string',
      readOnly: true,
    }),
  ],
})
