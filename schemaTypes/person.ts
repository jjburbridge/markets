import {defineField, defineType} from 'sanity'
import {MdPerson as icon} from 'react-icons/md'
import {isSlugUniqueAcross} from './validators/isSlugUniqueAcross'

export default defineType({
  name: 'person',
  title: 'Person',
  type: 'document',
  icon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Use “Firstname Lastname” format',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      hidden: (context) => {
        if (context.document?.name) {
          return false
        }
        return true
      },
      options: {
        source: 'name',
        maxLength: 100,
      },
      validation: (Rule) =>
        Rule.required().custom(async (slug, context) => {
          if (!slug?.current) return true
          if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug.current)) {
            return 'Use lowercase letters, numbers, and single hyphens only'
          }
          return await isSlugUniqueAcross('person')(slug, context)
        }),
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
          title: 'Alt text',
          type: 'string',
          description: 'Describe the photo for accessibility',
          validation: (Rule) =>
            Rule.custom((alt, context) => {
              const image = context.parent as {asset?: unknown} | undefined
              if (image?.asset && !alt?.trim()) {
                return 'Alt text is required when an image is set'
              }
              return true
            }),
        }),
      ],
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      description: 'The role of the person in the organization',
      options: {
        list: [
          {title: 'CEO', value: 'ceo'},
          {title: 'CTO', value: 'cto'},
          {title: 'CFO', value: 'cfo'},
          {title: 'COO', value: 'coo'},
          {title: 'Founder', value: 'founder'},
          {title: 'Other', value: 'other'},
        ],
        layout: 'radio',
      },
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
    select: {
      title: 'name',
      subtitle: 'market',
      media: 'image',
    },
  },
})
