import {createClient} from '@sanity/client'
import Knock from '@knocklabs/node'
import {documentEventHandler} from '@sanity/functions'
const knock = new Knock({apiKey: process.env.KNOCK_API_KEY})

export const handler = documentEventHandler(async ({context, event}) => {
  const client = createClient({
    ...context.clientOptions,
    apiVersion: 'vX',
  })
  const time = new Date().toLocaleTimeString()
  console.log(`👋 Your Sanity Function was called at ${time}`)
  console.log(JSON.stringify({context, event}, null, 2))
  const {mentions} = event.data
  console.log({mentions})

  let users: Record<string, any> = {}
  
  // get details of author
  const author = await client.request({
    uri: `projects/${context.clientOptions.projectId}/users/${event.data.authorId}`,
  })

  // get details of mentioned users
  for (const mention of mentions) {
    const {userId} = mention
    console.log({userId})
    const user = await client.request({
      uri: `projects/${context.clientOptions.projectId}/users/${userId}`,
    })
    console.log({user})
    users[userId] = user
  }

  // convert message to plain text for use in email
  const plainTextMessage = event.data.message
    .map((item) =>
      item.children.map((child) => child.text || users[child.userId]?.displayName).join(''),
    )
    .join('\n')

  //trigger knock workflow to send email notification - could be replaced by other email service
  const result = await knock.workflows.trigger('mention', {
    recipients: Object.values(users).map((user) => ({
      email: user.email,
      id: user.id,
      name: user.displayName,
    })),
    actor: {
      email: author.email,
      id: author.id,
      name: author.displayName,
    },
    data: {
      comment: plainTextMessage,
      commentId: event.data._id,
      commentUrl: event.data.context.notification.url,
      commentCreatedAt: event.data.createdAt,
      commentUpdatedAt: event.data.updatedAt,
      commentAuthor: author.displayName,
    },
  })

  console.log({result})
})
