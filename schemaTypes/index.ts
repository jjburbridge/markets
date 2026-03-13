import person from './person'
import page from './page'
import home from './home'
import tag from './tag'
import seo from './objects/seo'
import {richText} from './objects/richText'

export const schemaTypes = [
  // Document types
  page,
  home,
  person,
  tag,
  // Object types
  seo,
  richText,
]
