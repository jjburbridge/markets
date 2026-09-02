import {defineBlueprint, defineDocumentFunction, defineScheduledFunction} from '@sanity/blueprints'

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
    defineScheduledFunction({
      name: 'todo-due-check',
      event: {expression: 'every day at 9am'},
      timezone: 'Europe/London',
      // A schedule has no triggering document, so the function cannot infer the target dataset
      env: {
        SANITY_STUDIO_SANITY_PROJECT_ID: process.env.SANITY_STUDIO_SANITY_PROJECT_ID as string,
        SANITY_STUDIO_SANITY_DATASET: process.env.SANITY_STUDIO_SANITY_DATASET as string,
      },
    }),
  ],
})
