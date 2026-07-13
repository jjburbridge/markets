import {defineArrayMember, defineAssetAspect, defineField} from 'sanity'
import { uniqueLanguagesObjectValues } from '../lib/markets'

const locales = uniqueLanguagesObjectValues

export default defineAssetAspect({
  description:
    'Accessible alternative text for this asset, in one or more languages. Used for describing images to visually impaired users.',
  name: 'altText',
  of: [
    defineArrayMember({
      fields: [
        defineField({
          description: 'The language that the alt text is written in',
          name: 'language',
          options: {
            layout: 'radio',
            list: locales,
          },
          type: 'string',
        }),
        defineField({
          description: 'Short description of the image, for screen readers (max ~100 characters).',
          name: 'value',
          title: 'Alternative text',
          type: 'string',
        }),
      ],
      name: 'altTextItem',
      preview: {
        select: {
          subtitle: 'language',
          title: 'value',
        },
      },
      type: 'object',
    }),
  ],
  public: true,
  title: 'Alternative text',
  type: 'array',
})