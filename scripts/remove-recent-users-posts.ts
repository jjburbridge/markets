import {getCliClient} from 'sanity/cli'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const isDryRun = process.argv.includes('--dry-run')

/**
 * Removes all users and posts created after yesterday (i.e. created today).
 *
 * Run with: npx sanity exec scripts/remove-recent-users-posts.ts --with-user-token
 * Dry run:  npx sanity exec scripts/remove-recent-users-posts.ts -- --dry-run
 */
async function removeRecentUsersAndPosts() {
  const client = getCliClient()

  console.log(client.config())

  // Cutoff: start of today (documents created "after yesterday")
  const cutoff = new Date()
  cutoff.setHours(0, 0, 0, 0)
  const cutoffISO = cutoff.toISOString()

  const docsToDelete = await client.fetch<
    Array<{_id: string; _type: string; _createdAt: string; title?: string; name?: string}>
  >(
    `*[_type in ["user", "post"] && dateTime(_createdAt) >= dateTime($cutoff)]{_id, _type, _createdAt, title, name}`,
    {cutoff: cutoffISO},
  )

  const users = docsToDelete.filter((d) => d._type === 'user')
  const posts = docsToDelete.filter((d) => d._type === 'post')

  if (isDryRun) {
    console.log('DRY RUN – no changes will be made\n')
    console.log(`Cutoff: ${cutoffISO} (documents created on or after this time)\n`)
    console.log('Documents to delete:')
    console.log('─'.repeat(60))
    for (const doc of docsToDelete) {
      const label = doc._type === 'user' ? doc.name : doc.title
      console.log(`  delete  ${doc._id}  (${doc._type})  "${label}"  created ${doc._createdAt}`)
    }
    console.log('─'.repeat(60))
    console.log(`Summary: ${users.length} users, ${posts.length} posts would be deleted`)
    return
  }

  if (docsToDelete.length === 0) {
    console.log('No users or posts found created after yesterday')
    return
  }

  const BATCH_SIZE = 25
  const BATCH_DELAY_MS = 500

  for (let i = 0; i < docsToDelete.length; i += BATCH_SIZE) {
    const batch = docsToDelete.slice(i, i + BATCH_SIZE)
    const transaction = client.transaction()
    for (const doc of batch) {
      transaction.delete(doc._id)
    }
    await transaction.commit()
    console.log(
      `Deleted batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(docsToDelete.length / BATCH_SIZE)}`,
    )
    if (i + BATCH_SIZE < docsToDelete.length) {
      await sleep(BATCH_DELAY_MS)
    }
  }

  console.log(`Deleted ${users.length} users and ${posts.length} posts`)
}

removeRecentUsersAndPosts().catch((err) => {
  console.error(err)
  process.exit(1)
})
