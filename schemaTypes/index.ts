import person from './person'
import page from './page'
import home from './home'
import seo from './objects/seo'
import {richText} from './objects/richText'
import collection from './collection'
import collectionSync from './collectionSync'
import {migrations} from './migrations'
import {user} from './user'
import {post} from './post'
export const schemaTypes = [
  // Document types
  page,
  home,
  person,
  collection,
  collectionSync,
  migrations,
  user,
  post,

  // Object types
  seo,
  richText,
]
