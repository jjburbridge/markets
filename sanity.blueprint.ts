import {defineBlueprint, defineDocumentFunction} from '@sanity/blueprints'

export default defineBlueprint({
  resources: [
    defineDocumentFunction({
      name: 'translation-sync',
      event: {
        on: ['create', 'update', 'delete'],
        filter: '_type == "home"',
        projection: '{_id, _type, "before": before(), "after": after()}',
      },
    }),
    defineDocumentFunction({
      name: 'hierarchy-sync',
      event: {
        on: ['create', 'update', 'delete'],
        filter: '_type == "collectionSync"',
        projection: '{_id, _type, "before": before(), "after": after()}',
      },
    }),
  ],
})
