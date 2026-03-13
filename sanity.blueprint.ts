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
    defineDocumentFunction({
      name: 'authorised-users-sync',
      event: {
        on: ['create', 'update'],
        filter:
          '_type == "tag" && (delta::changedAny(authorisedUsers) || (delta::operation() == "create") && defined(authorisedUsers))',
        projection: '{_id, _type, "before": before(), "after": after()}',
      },
    }),
    // defineDocumentFunction({name: 'scrape', event: {on: ['create']}}),
  ],
})
