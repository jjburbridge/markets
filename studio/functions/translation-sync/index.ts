import {createClient} from '@sanity/client'
import {documentEventHandler} from '@sanity/functions'

export const handler = documentEventHandler(async ({context, event}) => {
  const client = createClient({
    //create a client to get and edit linked docs
    ...context.clientOptions,
    apiVersion: '2025-05-08',
  })
  const {_id, before, after} = event.data // after is state of the document after the change
  const translationsIds = await client.fetch(
    // fetch ids of all translations that are linked to the document
    `*[_type == "translation.metadata" && references($id)].translations[value._ref != $id].value._ref`,
    {
      id: _id,
    },
  )
  console.log({translationsIds, before, after})
  const navigationAfter = after?.navigation
  const navigationBefore = before?.navigation

  if (JSON.stringify(navigationBefore) === JSON.stringify(navigationAfter)) {
    console.log('No changes to navigation')
    return
  }

  const navigationAfterKeys = navigationAfter.map((item, index) => ({key: item._key, index}))

  const translatedDocs = await client.fetch(
    `*[_id in $ids]{_id, navigation}`,
    {
      ids: translationsIds,
    },
    {perspective: 'drafts'},
  )
  console.log({translatedDocs})
  const patches = translatedDocs.map((translation) => {
    const {navigation: translatedNavigation} = translation
    // For each translation, get the navigation item and if the key exists in the translation doc set it at this index,
    // else add the new nav item from the original doc
    const newNavigation = navigationAfterKeys.map((item) => {
      const {key, index} = item
      const translatedItem =
        translatedNavigation.find((item) => item._key === key) || navigationAfter[index]
      return translatedItem
    })
    return {_id: translation._id, navigation: newNavigation}
  })
  console.log({patches})

  const result = await Promise.all(
    patches.map(
      (
        patch, //create a daft doc if it dose not exist that contains the new navigation
      ) =>
        client
          .action({
            actionType: 'sanity.action.document.edit',
            draftId: `drafts.${patch._id}`,
            publishedId: patch._id,
            patch: {
              set: {
                navigation: patch.navigation,
              },
            },
          })
          .then((res) => {
            console.log({res})
            return res
          })
          .catch((err) => {
            console.error({err})
            return err
          }),
    ),
  )
  console.log({result})
})
