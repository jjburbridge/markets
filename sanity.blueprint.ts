import {defineBlueprint, defineDocumentFunction} from '@sanity/blueprints'

export default defineBlueprint({
  resources: [
    defineDocumentFunction({
      name: 'translation-sync',
      event: {
        on: ['update'],
        filter: '_type == "home"',
        projection: '{_id, _type, "before": before(), "after": after()}',
      },
    }),
    defineDocumentFunction({name: 'scrape', event: {on: ['create']}}),
  ],
})
