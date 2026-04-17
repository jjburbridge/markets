import {defineArrayMember, defineField, defineType} from 'sanity'
import {MdDescription as icon} from 'react-icons/md'
import {WhereElse} from '../component/WhereElse'
import {isSlugUniqueAcross} from './validators/isSlugUniqueAcross'

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon,
  components: {
    input: WhereElse,
  },
  groups: [
    {name: 'content', title: 'Content'},
    {name: 'meta', title: 'Locale'},
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
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      hidden: (context) => {
        if (context.document?.title) {
          return false
        }
        return true
      },
      options: {
        source: 'title',
        maxLength: 100,
      },
      validation: (Rule) =>
        Rule.required().custom(async (slug, context) => {
          if (!slug?.current) return true
          if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug.current)) {
            return 'Use lowercase letters, numbers, and single hyphens only'
          }
          return await isSlugUniqueAcross('page')(slug, context)
        }),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'richText',
      group: 'content',
    }),
    defineField({
      name: 'pdf',
      title: 'PDF',
      type: 'file',
      description: 'Optional file attachment for this page',
      group: 'content',
      options: {
        accept: 'application/pdf',
      },
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      readOnly: true,
      group: 'meta',
    }),
    defineField({
      name: 'baseLanguage',
      title: 'Base language',
      type: 'string',
      readOnly: true,
      group: 'meta',
    }),
    defineField({
      name: 'market',
      title: 'Market',
      type: 'string',
      readOnly: true,
      group: 'meta',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
    defineField({
      name: 'relatedPages',
      title: 'Related pages',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          name: 'relatedPage',
          type: 'reference',
          to: [{type: 'page'}],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      market: 'market',
    },
    prepare({title, slug, market}) {
      const parts = [slug ? `/${slug}` : undefined, market].filter(Boolean)
      return {
        title: title || 'Untitled page',
        subtitle: parts.length ? parts.join(' · ') : undefined,
      }
    },
  },
})
