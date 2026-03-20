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
        // block: (props) => {
        //   console.log('props', props)
        //   return (
        //     <div>
        //       <FaRegBookmark />
        //       {props.renderInlineBlock(props)}
        //     </div>
        //   )
        // },
        block: (props) => {
          console.log('block props', props)
          return <>{props.renderDefault(props)}</>
        },
        inlineBlock: (props) => {
          console.log('inlineBlock props', props)
          return <>{props.renderDefault(props)}</>
        },
        input: (props) => {
          console.log('input props', props)
          return <>{props.renderDefault(props)}</>
        },
        item: (props) => {
          console.log('item props', props)
          return <>{props.renderDefault(props)}</>
        },
        field: (props) => {
          console.log('field props', props)
          return <>{props.renderDefault(props)}</>
        },
        annotation: (props) => {
          console.log('annotation props', props)
          return <>{props.renderDefault(props)}</>
        },
        preview: (props) => {
          console.log('preview props', props)
          return (
            <>
              {props.actions}
              <button onClick={() => (props.actions.props.isOpen = true)}>
                <FaRegBookmark />
              </button>
              {props.renderDefault(props)}
            </>
          )
        },
      },
    },
  ],
})
