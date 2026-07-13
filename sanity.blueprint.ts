import {
  defineBlueprint,
  defineDocumentFunction,
  defineMediaLibraryAssetFunction,
  defineRobotToken,
  defineScheduledFunction,
} from '@sanity/blueprints'

const MEDIA_LIBRARY_ID = 'mlxWjOAlTnS6'
// Replace with your Sanity organization ID (find it in https://www.sanity.io/manage).
// The robot token below is org-scoped because Media Libraries live at the organization level.
const ORGANIZATION_ID = 'odu4V93Dz'

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
    defineMediaLibraryAssetFunction({
      name: 'ml-cerate-alt-text',
      event: {
        on: ['create', 'update'],
        filter: 'assetType == "sanity.imageAsset" && !defined(aspects.altText)',
        resource: {
          type: 'media-library',
          id: MEDIA_LIBRARY_ID,
        },
      },
      timeout: 60,
    }),
    defineRobotToken({
      name: 'ml-reader',
      label: 'Media Library Reader',
      memberships: [
        {
          resourceType: 'organization',
          resourceId: ORGANIZATION_ID,
          roleNames: ['administrator'],
        },
      ],
    }),
    defineScheduledFunction({
      name: 'ml-license-expiry-check',
      event: {
        minute: '*/15',
        hour: '*',
        dayOfMonth: '*',
        month: '*',
        dayOfWeek: '*',
      },
      robotToken: '$.resources.ml-reader.token',
      env: {
        SANITY_MEDIA_LIBRARY_ID: MEDIA_LIBRARY_ID,
        KNOCK_API_KEY: process.env.KNOCK_API_KEY as string,
      },
    }),
  ],
})
