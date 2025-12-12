import person from './person'
import page from './page'
import home from './home'
import seo from './objects/seo'
import {richText} from './objects/richText'
import collection from './collection'
export const schemaTypes = [
  // Document types
  page,
  home,
  person,
  collection,

  // Object types
  seo,
  richText,
]
