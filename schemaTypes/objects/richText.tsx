import {FaRegBookmark} from 'react-icons/fa'
import {defineField} from 'sanity'

export const richText = defineField({
  name: 'richText',
  title: 'Rich Text',
  type: 'array',
  of: [
    {type: 'block'},
    {
      type: 'object',
      name: 'todo',
      fields: [
        {name: 'comment', type: 'text'},
        {name: 'dueDate', type: 'date'},
      ],
      components: {
        block: (props) => {
          console.log('props', props)
          return (
            <button onClick={props.default}>
              <FaRegBookmark />
            </button>
          )
        },
      },
    },
  ],
})
