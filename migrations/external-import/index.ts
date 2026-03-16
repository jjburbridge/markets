import {defineMigration, createOrReplace} from 'sanity/migrate'

/**
 * this migration will set `Default title` on all documents that are missing a title
 * and make `true` the default value for the `enabled` field
 */
export default defineMigration({
  title: 'external-import',

  async *migrate(documents, context) {
    console.log({documents, context})

    const users = await fetch('https://jsonplaceholder.typicode.com/users')
    const usersData = await users.json()

    const posts = await fetch('https://jsonplaceholder.typicode.com/posts')
    const postsData = await posts.json()

    // example user data{
    //   "id": 1,
    //   "name": "Leanne Graham",
    //   "username": "Bret",
    //   "email": "Sincere@april.biz",
    //   "address": {
    //     "street": "Kulas Light",
    //     "suite": "Apt. 556",
    //     "city": "Gwenborough",
    //     "zipcode": "92998-3874",
    //     "geo": {
    //       "lat": "-37.3159",
    //       "lng": "81.1496"
    //     }
    //   },
    //   "phone": "1-770-736-8031 x56442",
    //   "website": "hildegard.org",
    //   "company": {
    //     "name": "Romaguera-Crona",
    //     "catchPhrase": "Multi-layered client-server neural-net",
    //     "bs": "harness real-time e-markets"
    //   }
    // }

    // example post data{
    //   userId: 1,
    //   id: 1,
    //   title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    //   body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    // }
    const docs = []
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
          _ref: `user-${post.userId}`,
          _type: 'reference',
        },
      })
    }
    yield docs.map((doc) => createOrReplace(doc))
  },
})
