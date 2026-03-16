import {createClient} from '@sanity/client'
import {defineMigration, createOrReplace} from 'sanity/migrate'

/**
 * this migration will create 10 documents of type `collection`
 */
export default defineMigration({
  title: 'import',

  async *migrate() {
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
    const docs = []
    // get data from external source instead of this loop
    for (let i = 0; i < 999; i++) {
      docs.push({
        _id: `versions.${release.releaseId}.doc-${i}`,
        _type: 'collection',
        title: `Document ${i}`,
      })
    }
    yield docs.map((doc) => createOrReplace(doc))
  },
})
