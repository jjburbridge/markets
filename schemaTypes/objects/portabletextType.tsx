import {BlockStyleProps, defineArrayMember, defineField} from 'sanity'

// used just to hightlight the Lead style in the portable text editor
const LeadStyle = (props: BlockStyleProps) => {
  return <span style={{fontSize: '1.25rem', fontWeight: 600}}>${props.children}</span>
}

//reusabelt type to be used in document schemas
export const portableTextType = defineField({
  name: 'portableText',
  type: 'array',
  of: [
    defineArrayMember({
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Numbered', value: 'number'},
      ],
      marks: {
        annotations: [
          {
            name: 'linkBlog',
            type: 'object',
            title: 'Blog link',
            fields: [
              {
                title: 'Reference',
                name: 'reference',
                type: 'reference',
                to: [
                  {type: 'blogPost'},
                  // other types you may want to link to
                ],
              },
            ],
          },
          {
            name: 'linkHero',
            type: 'object',
            title: 'Hero link',
            fields: [
              {
                title: 'Reference',
                name: 'reference',
                type: 'reference',
                to: [
                  {type: 'heroCharacter'},
                  // other types you may want to link to
                ],
              },
            ],
          },
          {
            title: 'External link',
            name: 'linkExternal',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
              {
                title: 'Open in new window',
                name: 'blank',
                type: 'boolean',
              },
            ],
          },
        ],
      },
      type: 'block',
      styles: [
        {title: 'Lead', value: 'lead', component: LeadStyle},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'P', value: 'p'},
        {title: 'Quote', value: 'blockquote'},
      ],
    }),
    defineArrayMember({
      type: 'image',
      name: 'inlineImage',
      title: 'Inline Image', //an inline image object that has an additional field to store which variant of image should be used
      fields: [
        defineField({
          name: 'variant',
          type: 'string',
          options: {list: ['left', 'right']},
          initialValue: 'left',
        }),
        defineField({
          name: 'alt',
          title: 'Alt',
          type: 'string',
        }),
        defineField({
          name: 'caption',
          title: 'Caption',
          type: 'string',
        }),
        defineField({
          name: 'attribution',
          title: 'Attribution',
          type: 'string',
        }),
      ],
    }),
    defineArrayMember({
      type: 'image',
      name: 'heroImage',
      title: 'Hero Image', //an inline image object that has an additional field to store which variant of image should be used
      fields: [
        defineField({
          name: 'variant',
          type: 'string',
          options: {list: ['square', 'pop-out', 'full-width']},
          initialValue: 'square',
        }),
        defineField({
          name: 'alt',
          title: 'Alt',
          type: 'string',
        }),
        defineField({
          name: 'caption',
          title: 'Caption',
          type: 'string',
        }),
        defineField({
          name: 'attribution',
          title: 'Attribution',
          type: 'string',
        }),
      ],
    }),
  ],
})
