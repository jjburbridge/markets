import {ObjectItemProps, useFormValue} from 'sanity'

export const ArrayItem = (props: ObjectItemProps) => {
  const baseLanguage = useFormValue(['baseLanguage'])
  const currentLanguage = useFormValue(['language'])
  const isBaseLanguage = baseLanguage === currentLanguage
  console.log('item', {isBaseLanguage, baseLanguage, currentLanguage})
  // console.log(props)
  const newProps: ObjectItemProps = isBaseLanguage
    ? props
    : {
        ...props,
        parentSchemaType: {
          ...props.parentSchemaType,
          options: {
            ...props.parentSchemaType.options,
            sortable: false,
            disableActions: ['addAfter', 'addBefore', 'remove', 'add', 'duplicate', 'copy'],
          },
        },
      }
  return <div>{props.renderDefault(newProps)}</div>
}
