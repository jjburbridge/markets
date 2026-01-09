import person from './person'
import page from './page'
import home from './home'
import seo from './objects/seo'
import {richText} from './objects/richText'
import collection from './collection'
import collectionSync from './collectionSync'
export const schemaTypes = [
  // Document types
  page,
  home,
  person,
  collection,
  collectionSync,

  // Object types
  seo,
  richText,
]
