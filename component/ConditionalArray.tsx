import {ArrayOfObjectsInputProps, useFormValue} from 'sanity'

export const ConditionalArray = (props: ArrayOfObjectsInputProps) => {
  const baseLanguage = useFormValue(['baseLanguage'])
  const currentLanguage = useFormValue(['language'])
  const isBaseLanguage = !currentLanguage || !baseLanguage || baseLanguage === currentLanguage
  console.log('input', {isBaseLanguage, baseLanguage, currentLanguage})
  const newProps: ArrayOfObjectsInputProps = isBaseLanguage
    ? props
    : {
        ...props,
        arrayFunctions: () => null,
      }
  return <div>{props.renderDefault(newProps)}</div>
}
