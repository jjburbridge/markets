import {defineField, defineType} from 'sanity'
import {WhereElse} from '../component/WhereElse'

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  components: {
    input: WhereElse,
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 100,
        isUnique: () => true, // create your own uniqueness validator here - this just ignores the check.
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'richText',
    }),
    defineField({
      name: 'tag',
      title: 'Tag',
      type: 'reference',
      to: [{type: 'tag'}],
      hidden: ({currentUser}) => !currentUser?.roles?.some((r) => r.name === 'administrator'),
    }),
    defineField({
      name: 'authorisedUsers',
      title: 'Authorised Users',
      type: 'object',
      readOnly: true,
      hidden: ({currentUser}) => !currentUser?.roles?.some((r) => r.name === 'administrator'),
      fields: [
        defineField({
          name: 'admins',
          title: 'Admins',
          type: 'array',
          of: [{type: 'userSelect'}],
        }),
        defineField({
          name: 'editors',
          title: 'Editors',
          type: 'array',
          of: [{type: 'userSelect'}],
        }),
        defineField({
          name: 'viewers',
          title: 'Viewers',
          type: 'array',
          of: [{type: 'userSelect'}],
        }),
      ],
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'pdf',
      type: 'file',
    }),
    defineField({
      name: 'baseLanguage',
      title: 'Base Language',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'market',
      title: 'Market',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
})
