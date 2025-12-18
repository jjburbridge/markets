import {createClient} from '@sanity/client'
import {documentEventHandler} from '@sanity/functions'

export const handler = documentEventHandler(async ({context, event}) => {
  const client = createClient({
    //create a client to get and edit linked docs
    ...context.clientOptions,
    apiVersion: '2025-05-08',
  })
  const {_id, before, after} = event.data

  const linksAfter = after?.links
  const linksBefore = before?.links

  //check to see if there are any changes to the links
  if (JSON.stringify(linksBefore) === JSON.stringify(linksAfter)) {
    console.log('No changes to links')
    return
  }

  const children = await client.fetch(
    // fetch ids of all collections that are children of this collection
    `*[_type == "collectionSync" && parentCollection._ref == $id]`,
    {
      id: _id,
    },
    {perspective: 'published'},
  )

  //find the links that have been added to the collection
  const addedLinks = linksAfter.filter(
    (link) =>
      !linksBefore.some((beforeLink) => {
        return beforeLink._key === link._key
      }),
  )
  //find the links that have been removed from the collection
  const removedLinks = linksBefore.filter(
    (link) => !linksAfter.some((afterLink) => afterLink._key === link._key),
  )

  console.log({addedLinks, removedLinks})
  //create a transaction to mutate multiple documents in one go
  const transaction = client.transaction()

  //iterate through each child and update the links
  children.forEach(async (child) => {
    const {links: childLinks} = child
    //create a new array of links that includes the added links and the links that are still in the child
    const newLinks = [
      ...addedLinks,
      ...childLinks.filter(
        (link) => !removedLinks.some((removedLink) => removedLink._key === link._key),
      ),
    ]
    console.log({newLinks})
    // add a patch to the transaction to update the links in the child
    transaction.patch(child._id, {
      set: {
        links: newLinks,
      },
    })
  })
  //commit the transaction
  await transaction
    .commit()
    .then((res) => {
      console.log(`Updated ${children.length} children successfully`)
    })
    .catch((err) => {
      console.error(`Error updating ${children.length} children: ${err}`)
    })
})
