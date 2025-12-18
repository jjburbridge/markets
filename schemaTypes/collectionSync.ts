import {defineField, defineType} from 'sanity'
import {CombinedLinks} from '../component/CombinedLinks'

export default defineType({
  name: 'collectionSync',
  title: 'Collection Sync',
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
      to: [{type: 'collectionSync'}],
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
