import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'Title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'Description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'Image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'Keywords',
      title: 'Keywords',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'noIndex',
      title: 'No Index',
      type: 'boolean',
    }),
    defineField({
      name: 'noFollow',
      title: 'No Follow',
      type: 'boolean',
    }),
  ],
})
