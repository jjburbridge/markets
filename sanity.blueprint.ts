import {defineBlueprint, defineDocumentFunction} from '@sanity/blueprints'

export default defineBlueprint({
  resources: [
    defineDocumentFunction({
      name: 'translation-sync',
      filter: '_type == "home"',
      projection: '_id, _type, "before": before(), "after": after()',
    }),
  ],
})
