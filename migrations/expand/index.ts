import {createClient} from '@sanity/client'
import {getPublishedId} from 'sanity'
import {at, createOrReplace, defineMigration, patch, set} from 'sanity/migrate'

export default defineMigration({
  title: 'expand',
  documentTypes: ['collection'],

  async *migrate(documents) {
    const client = createClient({
      projectId: process.env.SANITY_STUDIO_SANITY_PROJECT_ID,
      dataset: process.env.SANITY_STUDIO_SANITY_DATASET,
      useCdn: false, // set to `false` to bypass the edge cache
      apiVersion: '2025-02-19', // use current date (YYYY-MM-DD) to target the latest API version. Note: this should always be hard coded. Setting API version based on a dynamic value (e.g. new Date()) may break your application at a random point in the future.
      token: process.env.SANITY_AUTH_TOKEN, // Needed for creating a release
    })

    const release = await client.releases.create({
      metadata: {
        title: 'Product SEO Descriptions Update',
        releaseType: 'undecided',
        description: 'Bulk update of SEO descriptions based on product slugs',
      },
    })
    const patches = []

    for await (const document of documents()) {
      const releaseDocumentId = `versions.${release.releaseId}.${getPublishedId(document._id)}`
      const newDoc = {
        ...document,
        _id: releaseDocumentId,
        title: `${document.title} ${document.title}`,
        market: 'US',
        // other new, updated, or fields you want to carry over
      }
      patches.push(createOrReplace(newDoc))
    }
    yield patches
  },
})
