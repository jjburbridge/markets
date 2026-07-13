import {createClient} from '@sanity/client'
import {documentEventHandler} from '@sanity/functions'
import {uniqueLanguages} from '../../lib/markets'

const MAX_KEYWORD_WAIT = 5 // How many times to retry (total attempts = MAX_KEYWORD_WAIT + 1)
const KEYWORD_WAIT_MS = 2500 // Wait 1.5 seconds between checks

async function waitForKeywords(
  fetchKeywords: (signal: AbortSignal) => Promise<string[] | undefined>,
): Promise<string[] | undefined> {
  for (let i = 0; i <= MAX_KEYWORD_WAIT; i++) {
    console.log('Waiting for keywords...', i)

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), KEYWORD_WAIT_MS)

    let keywords: string[] | undefined
    try {
      keywords = await fetchKeywords(controller.signal)
      console.log(i, 'Keywords found:', keywords)
    } catch (err) {
      if (controller.signal.aborted) {
        console.log(i, `Aborted previous fetch after ${KEYWORD_WAIT_MS}ms`)
      } else {
        console.error(i, 'Fetch failed:', err)
      }
    } finally {
      clearTimeout(timeoutId)
    }

    if (keywords && keywords.length > 0) {
      return keywords
    }
    if (i < MAX_KEYWORD_WAIT) {
      await new Promise((res) => setTimeout(res, KEYWORD_WAIT_MS))
    }
  }
  return undefined
}

export const handler = documentEventHandler(async ({context, event}) => {
  const mlId = context.eventResourceId
  const {_id, currentVersion, _type} = event.data
  const detailedAssetId = currentVersion?._ref

  if (!detailedAssetId) {
    console.log('No detailedAssetId found, skipping')
    return
  }

  console.log(context)
  const mlClient = createClient({
    apiVersion: 'vX',
    token: context.clientOptions.token,
    useCdn: false,
    resource: {
      type: 'media-library',
      id: mlId,
    },
  })

  // Query keywords from the Media Library asset
  const fetchKeywords = async (signal: AbortSignal) => {
    try {
      const response = await mlClient.fetch(
        `*[_id == '${detailedAssetId}'][0]{ "keywords": metadata.keywords }`,
        {},
        {signal},
      )
      console.log('Keywords query response:', JSON.stringify(response, null, 2))
      return response?.keywords ?? []
    } catch (err) {
      if (signal.aborted) throw err
      console.error('Failed fetching keywords from asset', err)
      return []
    }
  }

  const keywords = await waitForKeywords(fetchKeywords)
  console.log('Keywords found:', JSON.stringify(keywords, null, 2))

  if (!keywords || keywords.length === 0) {
    console.log('No keywords found after retries, skipping')
    return
  }

  // Generate alt text based on the keywords
  const agentClient = createClient({
    ...context.clientOptions,
    apiVersion: 'vX',
    dataset: 'production',
  })

  const locales: string[] = uniqueLanguages

  const altTextResponse = await agentClient.agent.action.prompt({
    instruction: `Given the following keywords: [${keywords.join(', ')}], generate a JSON array of short (max 100 chars) alt text objects for each of these languages: [${locales.join(', ')}]. Each object should have this format: {"lang": "<language code>", "value": "<alt text in that language>"}. The response must be a single valid JSON array containing one object per language. Output ONLY the JSON array, nothing else.`,
  })
  console.log('Alt text generated:', altTextResponse)

  // Strip markdown code fences if present
  const cleanedResponse = altTextResponse.replace(/^```json\s*|\s*```$/g, '').trim()
  console.log('Cleaned response:', cleanedResponse)

  const altTextItems = JSON.parse(cleanedResponse)
  console.log('Alt text items:', JSON.stringify(altTextItems, null, 2))
  // Convert the alt text items to an array of objects with the correct format
  const altTextItemsArray: {_key: string; _type: string; language: string; value: string}[] = []
  for (const altTextItem of altTextItems) {
    altTextItemsArray.push({
      _key: crypto.randomUUID(),
      _type: 'altTextItem',
      language: altTextItem.lang,
      value: altTextItem.value,
    })
  }
  console.log('Alt text items array:', JSON.stringify(altTextItemsArray, null, 2))

  const UpdatedAsset = await mlClient
    .patch(_id)
    .set({aspects: {altText: altTextItemsArray}})
    .commit()
  console.log('Updated asset:', UpdatedAsset)
})
