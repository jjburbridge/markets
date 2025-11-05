import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'navigation',
      title: 'Navigation',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'page'}]}],
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'market',
      title: 'Market',
      type: 'string',
      readOnly: true,
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'market'},
  },
})
