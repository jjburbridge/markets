import {createClient} from '@sanity/client'
import {scheduledEventHandler} from '@sanity/functions'
import Knock from '@knocklabs/node'
const knock = new Knock({apiKey: process.env.KNOCK_API_KEY})

const EXPIRY_WINDOW_MS = 3 * 7 * 24 * 60 * 60 * 1000 // 3 weeks

interface ExpiringAsset {
  _id: string
  title?: string
  originalFilename?: string
  expiresAt: string
  license?: string
}

const recipient = {
  email: 'jonathan.burbridge@sanity.io',
  name: 'Jon Burbridge',
  id: 'user_123',
  collection: 'users',
}

export const handler = scheduledEventHandler(async ({context}) => {
  const mediaLibraryId = process.env.SANITY_MEDIA_LIBRARY_ID
  if (!mediaLibraryId) {
    throw new Error('SANITY_MEDIA_LIBRARY_ID env var is not set')
  }

  const token = context.clientOptions?.token
  if (!token) {
    throw new Error(
      'Missing robot token. Scheduled functions require an explicit robotToken with Media Library access.',
    )
  }

  const client = createClient({
    apiVersion: 'vX',
    token,
    useCdn: false,
    resource: {
      type: 'media-library',
      id: mediaLibraryId,
    },
  })

  // The aspect field is a `date` (YYYY-MM-DD), so compare with a date-only string.
  const threshold = new Date(Date.now() + EXPIRY_WINDOW_MS).toISOString().slice(0, 10)
  console.log(`Checking for image licenses expiring on or before ${threshold}`)
  console.log(client.config())

  const expiring: ExpiringAsset[] = await client.fetch(
    `*[_type == 'sanity.asset' && defined(aspects.imageLicense) && defined(aspects.imageLicense.licenseExpirationDate) && aspects.imageLicense.licenseExpirationDate <= $threshold] {_id, title, originalFilename, "expiresAt": aspects.imageLicense.licenseExpirationDate, "license": aspects.imageLicense} | order(aspects.imageLicense.licenseExpirationDate asc)`,
    {threshold},
  )

  if (!expiring || expiring.length === 0) {
    console.log('No image licenses expiring within 3 weeks.')
    return
  }
  console.log(expiring)
  const message = [`Found ${expiring.length} image(s) with licenses expiring within 3 weeks:`]
  console.log(`Found ${expiring.length} image(s) with licenses expiring within 3 weeks:`)
  for (const asset of expiring) {
    const label = asset.title || asset.originalFilename || asset._id
    message.push(
      `  - ${label} (expires ${asset.expiresAt}, license: ${asset.license ? JSON.stringify(asset.license) : 'n/a'}, id: ${asset._id})`,
    )
    console.log(
      `  - ${label} (expires ${asset.expiresAt}, license: ${asset.license ? JSON.stringify(asset.license) : 'n/a'}, id: ${asset._id})`,
    )
  }

  const result = await knock.workflows.trigger('licence-expiry', {
    recipients: [recipient],
    data: {
      message: message.join('\n'),
    },
  })

  console.log({result})
})
