import {documentEventHandler} from '@sanity/functions'
import Parser from 'rss-parser'
import {createClient} from '@sanity/client'
import {convert} from 'html-to-text'

export const handler = documentEventHandler(async ({context}) => {
  try {
    const parser = new Parser()
    const time = new Date().toLocaleTimeString()
    console.log(`👋 Your Sanity Function was called at ${time}`)

    const RSS_URL = `https://feeds.bbci.co.uk/news/rss.xml`

    const data = await parser.parseURL(RSS_URL)
    // console.log(data)
    const client = createClient({
      ...context.clientOptions,
      apiVersion: 'vX',
      perspective: 'drafts',
    })

    let filteredItems: any[] = []
    const lastPubDate = await client.fetch('*[_type == "page" && defined(pubDate)]{_id, pubDate} | order(pubDate desc)[0]')
    if (lastPubDate) {
      const lastPubDateDate = new Date(lastPubDate.pubDate)
      filteredItems = data.items.filter((item) => {
        return (item.pubDate && new Date(item.pubDate) > lastPubDateDate)
      })
    }

    // Process items in batches to throttle requests
    const batchSize = 3
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
    
    const results = []
    
    for (let i = 0; i < filteredItems.length; i += batchSize) {
      const batch = filteredItems.slice(i, i + batchSize)
      
      const batchPromises = batch.map(async (item) => {
        if (!item.link) return;

        const id = new URL(item.link).pathname.split('/').pop() as string
        const document = await client.getDocument(id,{includeAllVersions:true})
        if (document.length > 0) {  
          console.log('Document already exists')
          return
        }
        const article = await fetch(item.link)
        const articleText = await article.text()
      
        const options = {baseElements: {selectors: ['main']}}
        const convertedText = convert(articleText, options)
        // console.log(convertedText)
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
          instruction: 'summarize $article',
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
