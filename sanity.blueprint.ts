import {defineBlueprint, defineDocumentFunction} from '@sanity/blueprints'

export default defineBlueprint({
  resources: [
    // defineDocumentFunction({
    //   name: 'translation-sync',
    //   event: {
    //     on: ['update'],
    //     filter: '_type == "home"',
    //     projection: '{_id, _type, "before": before(), "after": after()}',
    //   },
    // }),
    // defineDocumentFunction({name: 'scrape', event: {on: ['create']}}),
    defineDocumentFunction({
      name: 'comments-notification',
      event: {
        on: ['create', 'update'],
        resource: {
          type: 'dataset',
          id: `${process.env.SANITY_STUDIO_SANITY_PROJECT_ID}.${process.env.SANITY_STUDIO_SANITY_DATASET}-comments`,
        },
        filter: '_type == "comment" && count(message[].children[_type == "mention"]) > 0',
        projection: '{..., "mentions":message[].children[_type == "mention"]}',
      },
      env: {
        KNOCK_API_KEY: process.env.KNOCK_API_KEY as string,
      },
    }),
  ],
})
