import {defineField, defineType} from 'sanity'
import {MdLabel as icon} from 'react-icons/md'

export default defineType({
  name: 'tag',
  title: 'Tag',
  type: 'document',
  icon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'authorisedUsers',
      title: 'Authorised Users',
      type: 'object',
      fields: [
        defineField({
          name: 'admins',
          title: 'Admins',
          type: 'array',
          of: [{type: 'userSelect'}],
          description: 'Users with admin access to this tag',
        }),
        defineField({
          name: 'editors',
          title: 'Editors',
          type: 'array',
          of: [{type: 'userSelect'}],
          description: 'Users with editor access to this tag',
        }),
        defineField({
          name: 'viewers',
          title: 'Viewers',
          type: 'array',
          of: [{type: 'userSelect'}],
          description: 'Users with viewer access to this tag',
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'title'},
  },
})
