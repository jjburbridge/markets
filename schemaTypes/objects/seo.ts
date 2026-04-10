import {defineArrayMember, defineField, defineType} from 'sanity'
import {MdSearch as icon} from 'react-icons/md'

export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  icon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Overrides the page title in search results and the browser tab if provided',
      validation: (Rule) =>
        Rule.max(70).warning('Long titles are often truncated in search results (~60 characters)'),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Summary for search snippets and social previews',
      validation: (Rule) =>
        Rule.max(320).warning(
          'Descriptions over ~160 characters may be truncated in search results',
        ),
    }),
    defineField({
      name: 'image',
      title: 'Social image',
      type: 'image',
      description: 'Open Graph / Twitter card image (1200×630 recommended)',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: 'Describe the image for accessibility and when the image does not load',
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
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      description: 'Optional; most search engines do not use meta keywords for ranking',
      of: [defineArrayMember({type: 'string'})],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from search engines',
      type: 'boolean',
      description: 'When enabled, tells crawlers not to index this page',
      initialValue: false,
    }),
    defineField({
      name: 'noFollow',
      title: 'No follow links',
      type: 'boolean',
      description: 'When enabled, suggests crawlers should not follow links on this page',
      initialValue: false,
    }),
  ],
})
