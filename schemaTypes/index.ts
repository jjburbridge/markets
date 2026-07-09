import person from './person'
import page from './page'
import home from './home'
import seo from './objects/seo'
import {richText} from './objects/richText'
import {section} from './section'

export const schemaTypes = [
  // Document types
  page,
  home,
  person,
  section,
  // Object types
  seo,
  richText,
]
