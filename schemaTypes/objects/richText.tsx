import {FaRegBookmark, FaHourglass} from 'react-icons/fa'
import {defineField} from 'sanity'

export const richText = defineField({
  name: 'richText',
  title: 'Rich Text',
  type: 'array',
  of: [
    {
      type: 'block',
      of: [
        {
          type: 'object',
          name: 'todo',
          icon: FaRegBookmark,
          fields: [
            {name: 'comment', type: 'text'},
            {name: 'dueDate', type: 'date'},
          ],
          components: {
            annotation: (props) => {
              return (
                <>
                  {props.renderDefault(props.children)}
                  <FaRegBookmark />
                </>
              )
            },
            preview: () => (
              <>
                <FaRegBookmark />
              </>
            ),
          },
        },
      ],
      marks: {
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'link',
            fields: [
              {
                name: 'url',
                type: 'url',
              },
            ],
          },
          {
            type: 'object',
            name: 'todoHighlight',
            icon: FaHourglass,
            fields: [
              {name: 'comment', type: 'text'},
              {name: 'dueDate', type: 'date'},
            ],
            components: {
              annotation: (props) => {
                return (
                  <>
                    {props.renderDefault(props)}
                    <FaHourglass />
                  </>
                )
              },
            },
          },
        ],
      },
    },
  ],
})
