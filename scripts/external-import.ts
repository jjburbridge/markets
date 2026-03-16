import {getCliClient} from 'sanity/cli'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const isDryRun = process.argv.includes('--dry-run')

/**
 * Exec script that imports users and posts from JSONPlaceholder API into Sanity.
 * Equivalent to the external-import migration.
 *
 * Run with: npx sanity exec scripts/external-import.ts --with-user-token
 * Dry run:  npx sanity exec scripts/external-import.ts -- --dry-run
 */
async function externalImport() {
  if (isDryRun) {
    console.log('DRY RUN – no changes will be made\n')
  }

  const client = isDryRun ? null : getCliClient()

  const users = await fetch('https://jsonplaceholder.typicode.com/users')
  const usersData = await users.json()
  await sleep(500) // Avoid rate limiting between external API calls

  const posts = await fetch('https://jsonplaceholder.typicode.com/posts')
  const postsData = await posts.json()

  const docs: Array<Record<string, unknown>> = []

  for (const user of usersData) {
    docs.push({
      _id: `user-${user.id}`,
      _type: 'user',
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: {
        street: user.address.street,
        suite: user.address.suite,
        city: user.address.city,
        zipcode: user.address.zipcode,
        geo: {
          _type: 'geopoint',
          lat: parseFloat(user.address.geo.lat),
          lng: parseFloat(user.address.geo.lng),
        },
      },
      website: user.website,
      company: {
        name: user.company.name,
        catchPhrase: user.company.catchPhrase,
        bs: user.company.bs,
      },
    })
  }

  for (const post of postsData) {
    docs.push({
      _id: `post-${post.id}`,
      _type: 'post',
      title: post.title,
      body: post.body,
      user: {
        _type: 'reference',
        _ref: `user-${post.userId}`,
      },
    })
  }

  const BATCH_SIZE = 25
  const BATCH_DELAY_MS = 500
  const totalBatches = Math.ceil(docs.length / BATCH_SIZE)

  if (isDryRun) {
    console.log('Planned actions:')
    console.log('─'.repeat(60))
    for (let i = 0; i < docs.length; i += BATCH_SIZE) {
      const batch = docs.slice(i, i + BATCH_SIZE)
      const batchNum = Math.floor(i / BATCH_SIZE) + 1
      console.log(`\nBatch ${batchNum}/${totalBatches} (${batch.length} documents):`)
      for (const doc of batch) {
        const id = doc._id as string
        const type = doc._type as string
        const title = type === 'user' ? (doc.name as string) : (doc.title as string)
        console.log(`  createOrReplace  ${id}  (${type})  "${title}"`)
      }
    }
    console.log('\n' + '─'.repeat(60))
    console.log(`Summary: ${usersData.length} users, ${postsData.length} posts would be imported`)
    return
  }

  for (let i = 0; i < docs.length; i += BATCH_SIZE) {
    const batch = docs.slice(i, i + BATCH_SIZE)
    const transaction = client!.transaction()
    for (const doc of batch) {
      transaction.createOrReplace(doc as Parameters<typeof transaction.createOrReplace>[0])
    }
    await transaction.commit()
    console.log(`Imported batch ${Math.floor(i / BATCH_SIZE) + 1}/${totalBatches}`)
    if (i + BATCH_SIZE < docs.length) {
      await sleep(BATCH_DELAY_MS)
    }
  }

  console.log(`Imported ${usersData.length} users and ${postsData.length} posts`)
}

externalImport().catch((err) => {
  console.error(err)
  process.exit(1)
})
