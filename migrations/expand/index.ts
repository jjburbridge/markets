import {at, defineMigration, set} from 'sanity/migrate'

export default defineMigration({
  title: 'expand',
  documentTypes: ['collection'],

  migrate: {
    document(doc, context) {
      // this will be called for every document of the matching type
      // any patch returned will be applied to the document
      // you can also return mutations that touches other documents
      const {title: currentTitle} = doc
      return at('title', set(`${currentTitle} ${currentTitle}`))
    },
  },
})
