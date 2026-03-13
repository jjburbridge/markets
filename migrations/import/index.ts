import {defineMigration, createOrReplace} from 'sanity/migrate'

/**
 * this migration will create 10 documents of type `collection`
 */
export default defineMigration({
  title: 'import',

  async *migrate() {
    const docs = []
    // get data from external source instead of this loop
    for (let i = 0; i < 10; i++) {
      docs.push({
        _id: `doc-${i}`,
        _type: 'collection',
        title: `Document ${i}`,
      })
    }
    yield docs.map((doc) => createOrReplace(doc))
  },
})
