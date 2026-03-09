import {createClient} from '@sanity/client'
import {documentEventHandler} from '@sanity/functions'
import {getPublishedId} from 'sanity'

export const handler = documentEventHandler(async ({context, event}) => {
  const client = createClient({
    ...context.clientOptions,
    apiVersion: '2025-05-08',
    perspective: 'raw',
  })

  const {_id, before, after} = event.data
  const authorisedUsersBefore = before?.authorisedUsers
  const authorisedUsersAfter = after?.authorisedUsers

  if (JSON.stringify(authorisedUsersBefore) === JSON.stringify(authorisedUsersAfter)) {
    return
  }

  const tagId = _id.startsWith('drafts.') ? _id.slice(7) : _id

  const pageIds = await client.fetch<string[]>(`*[_type == "page" && references($tagId)]._id`, {
    tagId,
  })

  if (pageIds.length === 0) {
    return
  }

  await Promise.all(
    pageIds.map((pageId) =>
      client
        .patch(pageId)
        .set({
          authorisedUsers: authorisedUsersAfter,
        })
        .commit()
        .catch((err) => {
          console.error(`Failed to sync authorisedUsers to page ${pageId}:`, err)
          throw err
        }),
    ),
  )
})
