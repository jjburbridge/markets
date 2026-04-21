import {
  defineRobotToken,
  defineBlueprint,
  defineDocumentFunction,
  defineScheduledFunction,
} from '@sanity/blueprints'

export default defineBlueprint({
  resources: [
    // defineDocumentFunction({
    //   name: 'translation-sync',
    //   event: {
    //     on: ['create', 'update', 'delete'],
    //     filter: '_type == "home"',
    //     projection: '{_id, _type, "before": before(), "after": after()}',
    //   },
    // }),
    // defineDocumentFunction({
    //   name: 'hierarchy-sync',
    //   event: {
    //     on: ['create', 'update', 'delete'],
    //     filter: '_type == "collectionSync"',
    //     projection: '{_id, _type, "before": before(), "after": after()}',
    //   },
    // }),
    // defineDocumentFunction({name: 'scrape', timeout: 900, event: {on: ['create']}}),
    // defineScheduledFunction({
    //   name: 'rss',
    //   timeout: 900,
    //   event: {expression: '*/5 * * * *'},
    //   env: {
    //     SANITY_STUDIO_SANITY_DATASET: process.env.SANITY_STUDIO_SANITY_DATASET as string,
    //     SANITY_STUDIO_SANITY_PROJECT_ID: process.env.SANITY_STUDIO_SANITY_PROJECT_ID as string,
    //   },
    //   robotToken: '$.resources.my-robot.token',
    // }),
    // defineRobotToken({
    //   name: 'my-robot',
    //   label: 'My Robot',
    //   memberships: [
    //     {
    //       resourceType: 'project',
    //       resourceId: process.env.SANITY_STUDIO_SANITY_PROJECT_ID as string, // your project id
    //       roleNames: ['editor'],
    //     },
    //   ],
    // }),
  ],
})
