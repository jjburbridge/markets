import {createClient} from '@sanity/client'
import {scheduledEventHandler} from '@sanity/functions'
import {convert} from 'html-to-text'
import Parser from 'rss-parser'

export const handler = scheduledEventHandler(async ({context}) => {
  const time = new Date().toLocaleTimeString()
  console.log(`Your scheduled Sanity Function was called at ${time}`, context)
  try {
    const parser = new Parser()

    const RSS_URL = `https://feeds.bbci.co.uk/news/rss.xml`

    const data = await parser.parseURL(RSS_URL)
    // console.log(data)
    const client = createClient({
      ...context.clientOptions,
      apiHost: 'https://api.sanity.io/',
      dataset: process.env.SANITY_STUDIO_SANITY_DATASET as string,
      projectId: process.env.SANITY_STUDIO_SANITY_PROJECT_ID as string,
      apiVersion: 'vX',
      perspective: 'drafts', // use drafts perspective to get unpublished content to avoid duplicates
    })

    let filteredItems: any[] = []
    // get the last published page by pubDate
    const lastPubDate = await client.fetch(
      '*[_type == "page" && defined(pubDate)]{_id, pubDate} | order(pubDate desc)[0]',
    )
    if (lastPubDate) {
      const lastPubDateDate = new Date(lastPubDate.pubDate)
      // filter the items to only include items that are newer than the last published page
      filteredItems = data.items.filter((item) => {
        return item.pubDate && new Date(item.pubDate) > lastPubDateDate
      })
      console.log(`running on ${filteredItems.length} items`)
    }

    // Process items in batches to throttle requests
    const batchSize = 3
    const maxCount = 15
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

    const results = []

    for (let i = 0; i < filteredItems.length && i < maxCount; i += batchSize) {
      const batch = filteredItems.slice(i, i + batchSize)

      const batchPromises = batch.map(async (item) => {
        if (!item.link) return

        // get the id of the document from the link - a deterministic value to ensure that we don't create duplicate documents
        const id = new URL(item.link).pathname.split('/').pop() as string
        // check if the document already exists
        const document = await client.getDocument(id, {includeAllVersions: true})
        if (document.length > 0) {
          console.log('Document already exists')
          return
        }
        //get the content of the article
        const article = await fetch(item.link)
        const articleText = await article.text()

        // convert the html from the main setction to text with html-to-text
        const options = {baseElements: {selectors: ['main']}}
        const convertedText = convert(articleText, options)

        /**
         * use sanity agent actions to take the content from the article and create a new page document in the style of a pirate.
         * Ensure that the document is created with the correct pubDate and _id is deterministic to avoid duplicates.
         * */

        const result = await client.agent.action.generate({
          schemaId: '_.schemas.US',
          targetDocument: {
            operation: 'createIfNotExists',
            _type: 'page',
            _id: id,
            initialValues: {
              pubDate: new Date(item.pubDate as string),
            },
          },
          instruction: 'summarize in the style of a pirate $article',
          instructionParams: {
            article: convertedText,
          },
        })
        // console.log(result)
        return result
      })

      const batchResults = await Promise.all(batchPromises)
      results.push(...batchResults)

      // Add delay between batches (except for the last batch)
      if (i + batchSize < filteredItems.length) {
        await delay(3000) // 3 second delay between batches
      }
    }
  } catch (error) {
    console.error(error)
  }
})
