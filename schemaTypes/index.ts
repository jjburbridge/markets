import person from './person'
import page from './page'
import home from './home'
import seo from './objects/seo'
import {richText} from './objects/richText'

export const schemaTypes = [
  // Document types
  page,
  home,
  person,
  // Object types
  seo,
  richText,
]
