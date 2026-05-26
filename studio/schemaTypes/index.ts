import person from './person'
import page from './page'
import home from './home'
import resource from './resources'
import seo from './objects/seo'
import {richText} from './objects/richText'

export const schemaTypes = [
  // Document types
  page,
  home,
  person,
  resource,
  // Object types
  seo,
  richText,
]
