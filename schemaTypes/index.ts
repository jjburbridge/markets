import person from './person'
import page from './page'
import home from './home'
import instagramMedia, {instagramCopyrightCheckInfo} from './instagramMedia'
import seo from './objects/seo'
import {richText} from './objects/richText'

export const schemaTypes = [
  // Document types
  page,
  home,
  person,
  instagramMedia,
  // Object types
  seo,
  richText,
  instagramCopyrightCheckInfo,
]
