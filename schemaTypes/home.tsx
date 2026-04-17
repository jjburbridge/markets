import {defineArrayMember, defineField, defineType} from 'sanity'
import {MdHome as icon} from 'react-icons/md'
import {ConditionalArray} from '../component/ConditionalArray'
import {ArrayItem} from '../component/ArrayItem'

export default defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  icon,
  groups: [
    {name: 'content', title: 'Content'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'image',
      type: 'image',
      group: 'content',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: 'Descriptions for screen readers and broken-image fallback',
          validation: (Rule) => [
            Rule.min(10).max(150).warning('Alt text should be 10-150 characters'),
            Rule.required().error('Alt text is required when an image is set'),
          ],
        }),
      ],
    }),
    defineField({
      name: 'navigation',
      type: 'array',
      description: 'Navigation items for the menu',
      group: 'content',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          console.log('value', value)
          if (
            context.currentUser?.roles?.some(
              (role: {name?: string}) => role.name === 'administrator',
            )
          ) {
            return true
          }
          return value?.length && value.length > 2 ? true : 'Navigation must have at least 3 items'
        }),
      components: {
        input: ConditionalArray,
      },
      of: [
        defineArrayMember({
          type: 'object',
          components: {
            item: ArrayItem,
          },
          fields: [
            defineField({
              name: 'internal',
              title: 'Internal reference',
              type: 'string',
              description: 'Target identifier or path used by the front end',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      description: (
        <>
          <strong>Optimize your search visibility.</strong>
          <br />
          Configure title, description, and social sharing image for richer results on Google,
          Facebook, Twitter, and more.
          <br />
          <em>Optional: Set meta tags and robot rules to control indexing and snippet previews.</em>
        </>
      ),
      group: 'seo',
    }),
    defineField({
      name: 'market',
      type: 'string',
      readOnly: true,
      group: 'content',
    }),
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      group: 'content',
    }),
    defineField({
      name: 'baseLanguage',
      type: 'string',
      readOnly: true,
      group: 'content',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      market: 'market',
      media: 'image',
    },
    prepare({title, market, media}) {
      return {
        title: title || 'Home',
        subtitle: market || undefined,
        media,
      }
    },
  },
})
